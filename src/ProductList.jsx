import React from 'react';
import Product from './Product';

function ProductList({ products }) {
  return (
    <div className="flex flex-wrap">
      {products.map((item, index) => (
        <Product 
          key={index}
          data={item}
        />
      ))}
    </div>
  );
}

export default ProductList;
