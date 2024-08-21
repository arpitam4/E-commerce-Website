import React, { useEffect, useState } from 'react';
import { getProductData } from './api';
import Loading from './Loading';

function CartTotals({ cart }) {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 50, // example shipping cost
    total: 0,
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const productPromises = Object.keys(cart).map(id => getProductData(id));
      const responses = await Promise.all(productPromises);
      const products = responses.map(response => response.data);

      const detailedCartItems = products.map(product => ({
        ...product,
        quantity: cart[product.id],
      }));

      setCartItems(detailedCartItems);

      const subtotal = detailedCartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      setTotals({
        subtotal,
        shipping: 50,
        total: subtotal + 50,
      });

      setLoading(false);
    };

    fetchCartItems();
  }, [cart]);

  const roundToTwoDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-center" colSpan="2">Cart Totals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 text-center">Subtotal</td>
            <td className="py-2 px-4 text-center">${roundToTwoDecimals(totals.subtotal)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-center">Shipping</td>
            <td className="py-2 px-4 text-center">${roundToTwoDecimals(totals.shipping)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-center">Total</td>
            <td className="py-2 px-4 text-center">${roundToTwoDecimals(totals.total)}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center">
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartTotals;
