import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Header />
      <SearchSection onSearch={handleSearch} />
      <Gallery searchQuery={searchQuery} />
    </div>
  );
}

export default App;