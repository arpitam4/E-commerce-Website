import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function Loading(){
  return (
    <p className = "flex-grow text-black text-4xl flex items-center justify-center bg-white">
    <AiOutlineLoading3Quarters 
      className = "animate-spin text-3xl"
      />
    </p>
  );
}

export default Loading;