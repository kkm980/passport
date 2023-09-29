"use client"
import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { useTheme } from 'next-themes';
import { Input } from "./ui/input"
import DialogueBox from './DialogueBox';

export default function SearchInput({performSearch, searchResults, setSearchResults}) {
    const { resolvedTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);



    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        performSearch(query);
    };

    // Close the dropdown when the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
          // Check if the clicked element is not inside the dropdown box or the trigger element
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            triggerRef.current &&
            !triggerRef.current.contains(event.target)
          ) {
            setShowDropdown(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
      
      
  
    useEffect(()=>{
      searchResults?.length>0 && setShowDropdown(true);
    },[searchResults])

    return (

        <div className="relative mx-4">
            <div className="relative" ref={dropdownRef}>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search Wikipedia"
                    className="px-2 py-1 rounded-full border border-gray-300 transition-all duration-300 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500 hover:border-blue-500 pr-8"
                />
                {searchTerm && (
                    <button
                        onClick={() => { setSearchTerm(''); setShowDropdown(false) }}
                        className="absolute top-1 right-0 mt-1 mr-2 text-gray-500 hover:text-blue-500 cursor-pointer"
                    >
                        &#x2715; {/* Unicode character for a multiplication sign (×) */}
                    </button>
                )}
            </div>

            {showDropdown && (
                <div className={`absolute z-10 mt-2 py-1 border rounded-md shadow-lg w-64 max-h-[80vh] overflow-y-auto`}
                ref={triggerRef} // Assign the trigger element reference
                // onClick={() => setShowDropdown(!showDropdown)}
                >
                     <ul className={`${resolvedTheme === 'dark' ? 'bg-black text-white border-gray-300 rounded-md' : 'bg-white text-black border-gray-300 rounded-md'}`}
                      ref={dropdownRef}
                     >
                   
                    {searchResults?.map((result) => (
                        <li
                            key={result.title}
                            className={`px-3 py-2 ${resolvedTheme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-blue-600'} cursor-pointer`}
                        >
                            <DialogueBox tag={result.title}/>
                        </li>
                    ))}
                </ul>
                </div>
               
            )}
        </div>
    )
}