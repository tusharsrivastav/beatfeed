import React, { useState } from "react";
import Header from "./components/header";
import CardList from "./components/cardList";
import Footer from "./components/footer";
import FilterList from "./components/filterList";

const App = () => {
  const[filter, setFilter] = useState('upcoming');
  const[searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filterFromChild) => {
    setFilter(filterFromChild);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  return (
    <>
      <Header query={searchQuery} sendQueryToParent={handleSearch} />
      <FilterList filter={filter} sendFilterToParent={handleFilterChange} />
      <CardList query={searchQuery} filter={filter} />
      <Footer />
    </>
  );
};

export default App;
