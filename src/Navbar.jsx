import React from 'react';
import { SlBasket } from "react-icons/sl";
import { IoPersonCircle } from "react-icons/io5";
import { Routes, Route, Link } from 'react-router-dom';

function Navbar({ productCount }) {
  return (
    <div className="block bg-white p-5 pr-5 pl-5 flex justify-between">
      <Link to="/Products">
        <img
          className="w-1/12"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon logo"
        />
      </Link>
      <div className="flex gap-3">
        <Link to= "/Login"><
                IoPersonCircle 
            className="text-red-500 text-4xl"/>
        </Link>
        
      <Link to="/Cart">
        <div className="relative flex flex-col items-center">
          <SlBasket className="text-red-500 lg:text-4xl md:text-2xl sm:text-2xl" />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
            {productCount}
          </span>
        </div>
      </Link>
    </div>
    </div>
  );
}

export default Navbar;
