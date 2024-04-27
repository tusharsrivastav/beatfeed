import React from "react";
import "./searchBar.css";

const SearchBar = ({ query, sendQueryToParent }) => {
  return (
    <input
      type="text"
      value={query}
      placeholder="Search by artist, genre or album name"
      className="search-bar poppins-regular"
      onChange={(e) => {
        sendQueryToParent(e.target.value);
      }}
    />
  );
};

export default SearchBar;
