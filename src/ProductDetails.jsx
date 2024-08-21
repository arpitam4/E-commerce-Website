import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { DataFromAPI } from './DataFromAPI';
import { getProductData , getProductList} from './api';
import Loading from './Loading';
import NotFound from './NotFound';


function ProductDetails({ onAddToCart }) {
  const p = window.location.pathname;
  console.log(p);
  const id = +(useParams().id);
  
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(function(){
    const tok = getProductData(id);
    setCount(1);
    setLoading(true);
    tok.then(function(response){
      setProduct(response.data);
      setLoading(false);
    }).catch(function (error){
      setLoading(false);
      console.log("API error: ",error);
    });
  },[id]);

  function handleCountChange(e){
    setCount(+e.target.value);
  }

  function handleButtonClick(){
    onAddToCart(id, count);
  }

  if(loading){
    return (
      <Loading />
    );
  }

  if (!product) {
    return (
      <NotFound />
    );
  }




  return (
    <>
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {id > 1 && <Link className ="flex items-center p-2" to ={"/ProductDetails/" + (id-1)}>
        <HiArrowNarrowLeft className= "text-3xl" /> PREV
      </Link> }
      <div className="bg-white p-8 rounded-lg shadow-lg flex max-w-full w-full">
        <Link className ="flex justify-center" to ="/">
          <HiArrowNarrowLeft className= "text-3xl" /> BACK
        </Link>
       
        <img src={product.thumbnail} className="rounded-lg w-2/5" alt={product.title} />
        <div className="ml-8 flex flex-col justify-center w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-xl text-gray-600 mt-2 font-bold">${product.price}</p>
          <p className="text-gray-600 mt-4">
            {product.description}
          </p>
          <div className="flex items-center mt-6">
            <input 
              type="number" 
              value={count}  
              onChange = {handleCountChange}
              className="w-16 p-2 border border-gray-300 rounded-lg text-center" />
            <button 
              onClick = {handleButtonClick}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300 transition duration-300">
              ADD TO CART
            </button>
          </div>
        </div>

      </div>
      <Link className ="p-2 flex items-center" to ={"/ProductDetails/" + (id+1)}>
        <HiArrowNarrowRight className= "text-3xl" /> NEXT
      </Link>
    </div>
      
    </> )
}

export default ProductDetails;
