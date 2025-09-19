import { ApiResponse, FoldersResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // 이미지 목록 조회
  async getImages(folder?: string, nextCursor?: string, maxResults: number = 20): Promise<ApiResponse> {
    const params = new URLSearchParams({
      max_results: maxResults.toString(),
    });

    if (folder) {
      params.append('folder', folder);
    }

    if (nextCursor) {
      params.append('next_cursor', nextCursor);
    }

    const response = await fetch(`${API_BASE_URL}/images?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  },

  // 폴더 목록 조회
  async getFolders(): Promise<FoldersResponse> {
    const response = await fetch(`${API_BASE_URL}/folders`);
    if (!response.ok) {
      throw new Error('Failed to fetch folders');
    }
    return response.json();
  },

  // 이미지 상세 정보 조회
  async getImageDetails(id: string) {
    const response = await fetch(`${API_BASE_URL}/images/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image details');
    }
    return response.json();
  }
};




