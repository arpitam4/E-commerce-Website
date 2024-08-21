import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SideBar(){
  return (
    <div className= "w-96 min-h-screen bg-gray-400 flex flex-col gap-3 py-3 items-center text-white">
      <Link to= "/ProductListPage">Products Page</Link>
      <Link to= "/ProductDetails">Product Details</Link>
    </div>
  );
}

export default SideBar;