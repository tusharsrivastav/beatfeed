import React from 'react'
import SearchBar from './searchBar';
import './header.css';

const Header = ({ query, sendQueryToParent }) => {
  return (
    <div className='header-wrapper'>
        <div className='logo poppins-bold'>BeatFeed</div>
        <SearchBar query={query} sendQueryToParent={sendQueryToParent} />
    </div>
  )
}

export default Header;