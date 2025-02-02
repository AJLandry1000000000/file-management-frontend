import React, { useState } from 'react';

type Props = {
  onSearch: (keyword: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search by name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;