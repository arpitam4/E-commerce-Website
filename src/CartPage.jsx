import React, { useEffect, useState } from 'react';
import { getProductData } from './api';
import { ImCancelCircle } from "react-icons/im";
import Loading from './Loading';

function CartPage({ cart , updateCart }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const productIds = Object.keys(cart);
  const [localCart, setLocalCart] = useState(cart);

  console.log("productIds are ", productIds, cart);

  useEffect(
    function(){
      setLocalCart(cart);
    }, [cart]
  )

  useEffect(() => {
    const myProductPromises = productIds.map(id => getProductData(id));

    Promise.all(myProductPromises).then((responses) => {
      const products = responses.map(response => response.data);
      setProducts(products);
      setLoading(false);
    });
  }, [cart]);

  if (products.length === 0) {
    return <Loading />;
  }

  if(loading) {
    return (<Loading />);
  }

  function handleRemove(event) {
    const productId = event.currentTarget.getAttribute("data-productid");
    console.log("remove", productId);
    const newCart = { ...cart };
    delete newCart[productId];
    updateCart(newCart);
  }

  function handleChange(event){
    const newValue = +event.target.value;
    const productId = event.target.getAttribute("data-productid");
    console.log("handleChange",newValue, productId);
    const newLocalCart = { ...localCart, [productId]: newValue };
    setLocalCart(newLocalCart);
  }

  function updateMyCart(){
    updateCart(localCart);
  }

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}
           className = "m-5">
          {p.title}{" "}
          <input
            data-productid={p.id}
            type="number"
            className="w-12 p-2 border-2 border-gray-500 rounded-md"
            value={localCart[p.id]}
            onChange = {handleChange}
          />
          <button
            data-productid={p.id}
            onClick={handleRemove}
          >
            <ImCancelCircle />
          </button>
        </div>
      ))}
      <button 
        className= "border-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-400"
        onClick = {updateMyCart}
        >Update Cart</button>
    </div>
  );
}

export default CartPage;
