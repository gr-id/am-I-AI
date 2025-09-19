import React, { useState } from 'react';
import UnderConstructionModal from './UnderConstructionModal';
import './Header.css';

const Header: React.FC = () => {
  const [showConstructionModal, setShowConstructionModal] = useState(false);

  const handleConstructionClick = () => {
    setShowConstructionModal(true);
  };

  const handleCloseModal = () => {
    setShowConstructionModal(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">
              <span className="logo-text">AM I AI?</span>
            </div>
            <nav className="nav-menu">
              <a href="#" className="nav-link" onClick={handleConstructionClick}>Explore</a>
            </nav>
          </div>
          
          <div className="header-right">
            <button className="login-button" onClick={handleConstructionClick}>Log in</button>
            <button className="generate-button" onClick={handleConstructionClick}>Generate image</button>
          </div>
        </div>
      </header>

      <UnderConstructionModal
        isOpen={showConstructionModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Header;
