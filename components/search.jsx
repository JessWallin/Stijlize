import React from 'react';

const SearchBar = props => {
  return (
    <div className="search">
      <input
        type="text"
        name="keyword"
        onChange={event => props.handleChange(event)}
        value={props.keyword}
      />
      <button type="submit" onClick={event => props.handleSubmit(event)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
