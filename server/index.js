const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const config = require('./config');

// Cloudinary 설정
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 이미지 목록 조회 API
app.get('/api/images', async (req, res) => {
  try {
    const { folder, next_cursor, max_results = 20 } = req.query;
    
    console.log('API Request - folder:', folder, 'next_cursor:', next_cursor);
    
    const options = {
      max_results: parseInt(max_results),
      sort_by: [{ created_at: 'desc' }],
      resource_type: 'image'
    };

    if (folder) {
      options.expression = `folder:${folder} AND resource_type:image`;
    } else {
      options.expression = 'resource_type:image';
    }

    if (next_cursor) {
      options.next_cursor = next_cursor;
    }

    console.log('Search options:', options);
    const result = await cloudinary.search.expression(options.expression).with_field('context').execute(options);
    
    // 이미지 데이터 가공
    const images = result.resources.map(resource => ({
      id: resource.public_id,
      url: resource.secure_url,
      thumbnail: cloudinary.url(resource.public_id, {
        width: 300,
        height: 300,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto'
      }),
      width: resource.width,
      height: resource.height,
      format: resource.format,
      created_at: resource.created_at,
      folder: resource.folder || 'root'
    }));

    res.json({
      images,
      next_cursor: result.next_cursor,
      total_count: result.total_count
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// 폴더 목록 조회 API
app.get('/api/folders', async (req, res) => {
  try {
    const result = await cloudinary.api.sub_folders('', {
      max_results: 100
    });
    
    const folders = result.folders.map(folder => ({
      name: folder.name,
      path: folder.path
    }));

    res.json({ folders });
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

// 이미지 상세 정보 조회 API
app.get('/api/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cloudinary.api.resource(id);
    
    const image = {
      id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      created_at: result.created_at,
      folder: result.folder || 'root',
      bytes: result.bytes
    };

    res.json({ image });
  } catch (error) {
    console.error('Error fetching image details:', error);
    res.status(500).json({ error: 'Failed to fetch image details' });
  }
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
