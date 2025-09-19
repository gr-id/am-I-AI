import React, { useState } from 'react';
import UnderConstructionModal from './UnderConstructionModal';
import './SearchSection.css';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [context, setContext] = useState('Context');
  const [showConstructionModal, setShowConstructionModal] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleConstructionClick = () => {
    setShowConstructionModal(true);
  };

  const handleCloseModal = () => {
    setShowConstructionModal(false);
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="main-title">
          <h1 className="title">AM I AI?</h1>
          <p className="subtitle">
            Enter the world of Pixels and journey through the space of AI art beyond your imagination.
          </p>
        </div>

        <div className="search-box">
          <div className="search-input-container">
            <select 
              className="context-select"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            >
              <option value="Context">Context</option>
              <option value="Style">Style</option>
              <option value="Mood">Mood</option>
              <option value="Color">Color</option>
            </select>
            
            <input
              type="text"
              className="search-input"
              placeholder="birthday"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            
            <div className="search-actions">
              {searchQuery && (
                <button 
                  className="clear-button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
              <button 
                className="search-button"
                onClick={handleSearch}
                aria-label="Search"
              >
                🔍
              </button>
              <button 
                className="settings-button"
                aria-label="Settings"
                onClick={handleConstructionClick}
              >
                ⚙️
              </button>
            </div>
          </div>
          
          <div className="search-example">
            ex) A detailed anime illustration of a mansion in Ghibli style.
          </div>
          
          <button className="community-button" onClick={handleConstructionClick}>
            <span className="discord-icon">💬</span>
            Join Community
          </button>
        </div>
      </div>

      <UnderConstructionModal
        isOpen={showConstructionModal}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default SearchSection;
