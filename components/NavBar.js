"use client"
import React, { useState, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { useTheme } from 'next-themes';
import ModeToggle from './Toggle';
import SearchInput from './SearchInput';
import axios from 'axios';

export default function NavBar() {
  const { resolvedTheme } = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);


  const performSearch=async(searchValue) =>{
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchValue}&origin=*&format=json`)
    .then(response => {
      setLoadingStatus(false);
      setSearchResults(response.data?.query?.search);
    }).catch(error => {
      setLoadingStatus(false);
      console.log("err", error);
      setErrorMessage('Unable to load Wikipedia search results at this time.');
    });
  }

  return (
    <div
      className={`flex justify-between items-center h-[50px] w-full fixed ${resolvedTheme === 'dark'
          ? 'bg-black text-white shadow-md shadow-blue-100'
          : 'bg-white text-black'
        } z-10 font-sans`}
    >
      {/* Left Side */}
      <div className="ml-4">
        {/* Your logo or other content goes here */}
        Logo
      </div>

      {/* Search Box and Dropdown */}
       <SearchInput {...{performSearch, searchResults, setSearchResults}}/>
      {/* Theme Toggle */}
      <div className="mr-4">
        <ModeToggle />
      </div>
    </div>
  );
}

