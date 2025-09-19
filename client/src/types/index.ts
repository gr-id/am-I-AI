export interface Image {
  id: string;
  url: string;
  thumbnail: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  folder: string;
}

export interface Folder {
  name: string;
  path: string;
}

export interface ApiResponse {
  images: Image[];
  next_cursor?: string;
  total_count: number;
}

export interface FoldersResponse {
  folders: Folder[];
}
