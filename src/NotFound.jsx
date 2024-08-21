import React from 'react';
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className = "w-4/12"
        src = "https://media.istockphoto.com/id/171302206/photo/error-404.jpg?s=1024x1024&w=is&k=20&c=bQKcKUBA7nxl4O4RxJe7KweKzg2fIcSHBLCauke5NV4= " />
      <p className="text-3xl font-bold">Page Not Found</p>
      <Link to="/">
        <button className="bg-blue-800 text-white font-bold px-4 py-2 m-5 rounded-lg hover:bg-blue-900 transition duration-300">
          HOME PAGE
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
