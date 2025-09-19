import React from 'react';
import './GallerySettings.css';

interface GallerySettingsProps {
  columns: number;
  onColumnsChange: (columns: number) => void;
}

const GallerySettings: React.FC<GallerySettingsProps> = ({ columns, onColumnsChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColumnsChange(parseInt(e.target.value));
  };

  return (
    <div className="gallery-settings">
      <div className="columns-setting">
        <span className="setting-label">Columns:</span>
        <span className="columns-value">{columns}</span>
        <input
          type="range"
          min="3"
          max="8"
          value={columns}
          onChange={handleSliderChange}
          className="columns-slider"
        />
      </div>
    </div>
  );
};

export default GallerySettings;
