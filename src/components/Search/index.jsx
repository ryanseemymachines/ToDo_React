import React from "react";
import styles from "./index.module.css";

function Search(props) {
  return (
    <div className={styles.searchBar}>
      <i className={`fas fa-search ${styles.searchIcon}`}></i>
      <input
        className={styles.searchInput}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Search;
