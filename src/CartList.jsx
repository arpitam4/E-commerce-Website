// CartList.jsx
import React from 'react';
import CartRow from './CartRow';

function CartList({ products, cart, handleRemove, handleChange }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="p-4 text-center">Remove</th>
          <th className="p-4 text-center">Image</th>
          <th className="p-4 text-center">Product</th>
          <th className="p-4 text-center">Price</th>
          <th className="p-4 text-center">Quantity</th>
          <th className="p-4 text-center">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <CartRow
            key={product.id}
            product={product}
            quantity={cart[product.id]}
            onRemove={handleRemove}
            onChange={handleChange}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CartList;