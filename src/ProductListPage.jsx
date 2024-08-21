import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './ProductList';
import { getProductList } from './api';
import Loading from './Loading';
import _ from 'lodash';

function ProductListPage() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchProducts();
  }, [sort, order, page]);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProductList((page - 1) * limit, limit, query, sort, order)
      .then((response) => {
        setData(response.data.products);
        setTotal(response.data.total);
        setNoResults(response.data.products.length === 0);
        setLoading(false);
      });
  }, [page, query, sort, order]);

  const debouncedFetchProducts = useCallback(
    _.debounce(() => {
      fetchProducts();
    }, 500),
    [fetchProducts]
  );

  const handleChange = (event) => {
    setQuery(event.target.value);
    setPage(1);
    debouncedFetchProducts();
  };

  const handleSortChange = (event) => {
    const [sortBy, sortOrder] = event.target.value.split('|');
    setSort(sortBy);
    setOrder(sortOrder);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col flex-wrap">
      <span className="pl-12 ml-5 pt-2">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="border border-gray-700 rounded-md m-2"
        />

        <select
          onChange={handleSortChange}
          value={`${sort}|${order}`}
          className="border border-gray-700 rounded-md m-2"
        >
          <option value="|">Default sort</option>
          <option value="title|asc">Sort by title: A-Z</option>
          <option value="title|desc">Sort by title: Z-A</option>
          <option value="price|asc">Sort by price: low to high</option>
          <option value="price|desc">Sort by price: high to low</option>
        </select>
      </span>

      <div className="bg-white flex flex-wrap px-20 mx-20 my-5 py-5">
        {noResults ? (
          <div className="w-full text-center text-gray-700 font-bold">
            No matching items found.
          </div>
        ) : (
          <ProductList products={data} />
        )}
      </div>

      <div className="flex justify-center my-5">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-2 py-1 border ${page === index + 1 ? 'bg-gray-300' : 'bg-white'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
