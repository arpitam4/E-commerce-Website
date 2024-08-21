import React from 'react';
import { Link, Navigate } from 'react-router-dom';

function Dashboard({user , setUser}){
  if (!user){
    return <Navigate to="/Login" />
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(undefined);
  }

  console.log(user);
  return (
    <div className="bg-red-400 text-white h-screen w-screen content-center p-5 text-2xl">
      <h1
        className= "font-bold  text-5xl my-5">Dashboard</h1>
      <p>Welcome, {user.full_name}</p>
      <p> View Products,  
        <Link to = "/Products"
          className= "underline hover:text-black"> here</Link></p>

      <button 
        className="border-2 border-white rounded bg-white p-2 py-1 m-2 my-5 text-red-500 hover:bg-red-500 hover:text-white"
        onClick = {handleLogout}>
        Logout</button>
    </div>
  );
}

export default Dashboard; 