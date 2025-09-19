import React from 'react';
import { Folder } from '../types';
import './FolderTabs.css';

interface FolderTabsProps {
  folders: Folder[];
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
}

const FolderTabs: React.FC<FolderTabsProps> = ({
  folders,
  selectedFolder,
  onFolderChange
}) => {
  return (
    <div className="folder-tabs">
      <div className="tabs-container">
        <button
          className={`tab ${selectedFolder === '' ? 'active' : ''}`}
          onClick={() => onFolderChange('')}
        >
          All
        </button>
        {folders.map((folder) => (
          <button
            key={folder.path}
            className={`tab ${selectedFolder === folder.path ? 'active' : ''}`}
            onClick={() => onFolderChange(folder.path)}
          >
            {folder.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FolderTabs;
