import React from 'react';

function SearchBar({ setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '1rem auto',
      padding: '1rem',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#333',
      }}>Search Employee by ID</h2>
      <input
        type="text"
        placeholder="Search by ID"
        onChange={handleSearch}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          outline: 'none',
        }}
      />
    </div>
  );
}

export default SearchBar;
