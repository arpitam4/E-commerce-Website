import React from 'react';
import { Link } from 'react-router-dom';

function Product(props) {
  const { data } = props;

  return (
    <div className="bg-white flex flex-col items-center mx-auto p-2 m-2 w-64 rounded-lg shadow-md">
      <img src={data.thumbnail} className="w-30 h-20" alt={data.name} />
      <h3 className="text-gray-500 text-sm">{data.category}</h3>
      <h1 className="font-bold">{data.title}</h1>
      <img src="stars.png" alt="stars" />
      <h2 className="font-bold text-sm">$ {data.price}</h2>
      <Link
        className="text-sm border-2 border-gray-200 rounded-md p-1"
        to={`/ProductDetails/${data.id}`}
      >
        View Details
      </Link>
    </div>
  );
}

export default Product;
