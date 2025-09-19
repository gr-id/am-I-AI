import React from 'react';
import { Folder } from '../types';
import './FolderFilter.css';

interface FolderFilterProps {
  folders: Folder[];
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
}

const FolderFilter: React.FC<FolderFilterProps> = ({
  folders,
  selectedFolder,
  onFolderChange
}) => {
  const handleFolderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFolderChange(e.target.value);
  };

  return (
    <div className="folder-filter">
      <label htmlFor="folder-select" className="filter-label">
        폴더 필터:
      </label>
      <select
        id="folder-select"
        value={selectedFolder}
        onChange={handleFolderSelect}
        className="folder-select"
      >
        <option value="">전체 이미지</option>
        {folders.map((folder) => (
          <option key={folder.path} value={folder.path}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FolderFilter;
