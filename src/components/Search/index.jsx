import React from 'react';
import './index.css';

function Search(props) {
  return (
    <div className="search-bar">
        <i className="fas fa-search search-icon"></i>
        <input
          className="search-input"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
  )
}

export default Search;