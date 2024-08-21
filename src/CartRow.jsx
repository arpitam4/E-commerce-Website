// CartRow.jsx
import React from 'react';
import { ImCancelCircle } from "react-icons/im";

function CartRow({ product, quantity, onRemove, onChange }) {
  const roundToTwoDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };

  return (
    <tr className="border-b text-center">
      <td className="p-4">
        <button data-productid={product.id} onClick={onRemove}>
          <ImCancelCircle />
        </button>
      </td>
      <td className="p-4">
        <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover" />
      </td>
      <td className="p-4">{product.title}</td>
      <td className="p-4">${roundToTwoDecimals(product.price)}</td>
      <td className="p-4">
        <input
          data-productid={product.id}
          type="number"
          className="w-12 p-2 border-2 border-gray-500 rounded-md"
          value={quantity}
          onChange={onChange}
        />
      </td>
      <td className="p-4">${roundToTwoDecimals(product.price * quantity)}</td>
    </tr>
  );
}

export default CartRow;