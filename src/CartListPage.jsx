// CartListPage.jsx
import React, { useEffect, useState } from 'react';
import { getProductData } from './api';
import Loading from './Loading';
import CartList from './CartList';
import CartTotals from './CartTotals';

function CartListPage({ cart, updateCart }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const productIds = Object.keys(cart);
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = productIds.map(id => getProductData(id));
      const responses = await Promise.all(productPromises);
      setProducts(responses.map(response => response.data));
      setLoading(false);
    };
    fetchProducts();
  }, [cart]);

  if (loading) {
    return <Loading />;
  }

  const handleRemove = event => {
    const productId = event.currentTarget.getAttribute("data-productid");
    const newCart = { ...cart };
    delete newCart[productId];
    updateCart(newCart);
  };

  const handleChange = event => {
    const newValue = +event.target.value;
    const productId = event.target.getAttribute("data-productid");
    const newLocalCart = { ...localCart, [productId]: newValue };
    setLocalCart(newLocalCart);
  };

  const handleUpdateCart = () => {
    updateCart(localCart);
  };

  console.log("Local Cart : ", localCart);

  
  return (
    <div className="container mx-auto p-4">
      <CartList
        products={products}
        cart={localCart}
        handleRemove={handleRemove}
        handleChange={handleChange}
      />
      <div className="flex justify-end mt-4 justify-between">

        <div class= "flex">
          <input 
            type="text"
            className = "border-2 border-gray-200 p-2 text-center"
            placeholder = "Coupon code"
            />
          <button
            className= "border-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-400">
            APPLY COUPON
          </button>
        </div>
        <button
          className="border-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-400"
          onClick={handleUpdateCart}
        >
          Update Cart
        </button>
      </div>
      <CartTotals cart={localCart} />
    </div>
  );
}

export default CartListPage;