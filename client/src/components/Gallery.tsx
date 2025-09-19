import React, { useState, useEffect, useCallback } from 'react';
import { Image, Folder } from '../types';
import { apiService } from '../services/api';
import ImageCard from './ImageCard';
import FolderTabs from './FolderTabs';
import LoadingSpinner from './LoadingSpinner';
import GallerySettings from './GallerySettings';
import './Gallery.css';

interface GalleryProps {
  searchQuery?: string;
}

const Gallery: React.FC<GalleryProps> = ({ searchQuery }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState<number>(5);

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  // 폴더 변경 시 이미지 다시 로드
  useEffect(() => {
    if (folders.length > 0) {
      loadImages(true);
    }
  }, [selectedFolder]);

  // 검색 쿼리 변경 시 이미지 다시 로드
  useEffect(() => {
    if (searchQuery) {
      loadImages(true);
    }
  }, [searchQuery]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 폴더 목록과 이미지 목록을 병렬로 로드
      const [foldersResponse] = await Promise.all([
        apiService.getFolders(),
        loadImages(true)
      ]);
      
      setFolders(foldersResponse.folders);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadImages = useCallback(async (reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true);
        setImages([]);
        setNextCursor(undefined);
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }

      const response = await apiService.getImages(
        selectedFolder || undefined,
        reset ? undefined : nextCursor,
        20
      );

      if (reset) {
        setImages(response.images);
      } else {
        setImages(prev => [...prev, ...response.images]);
      }

      setNextCursor(response.next_cursor);
      setHasMore(!!response.next_cursor);
    } catch (err) {
      setError('이미지를 불러오는 중 오류가 발생했습니다.');
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedFolder, nextCursor]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      loadImages(false);
    }
  }, [loadingMore, hasMore, loadImages]);

  const handleFolderChange = (folder: string) => {
    console.log('Folder changed to:', folder);
    setSelectedFolder(folder);
  };

  const handleColumnsChange = (newColumns: number) => {
    setColumns(newColumns);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>오류가 발생했습니다</h2>
        <p>{error}</p>
        <button onClick={loadInitialData} className="retry-button">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <GallerySettings
        columns={columns}
        onColumnsChange={handleColumnsChange}
      />
      
      <FolderTabs
        folders={folders}
        selectedFolder={selectedFolder}
        onFolderChange={handleFolderChange}
      />

      <div 
        className="gallery-grid"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`
        }}
      >
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>

      {loadingMore && (
        <div className="loading-more">
          <LoadingSpinner />
        </div>
      )}

      {hasMore && !loadingMore && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            더 보기
          </button>
        </div>
      )}

      {!hasMore && images.length > 0 && (
        <div className="no-more-images">
          <p>모든 이미지를 불러왔습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
