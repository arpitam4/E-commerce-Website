import axios from 'axios';

export function getProductData(id) {
  console.log("getProductData");
  return axios.get(`https://dummyjson.com/products/${id}`);
}

export function getProductList(skip = 0, limit = 10, query = '', sortBy = '', order = '') {
  console.log("getProductList");
  let url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;

  if (query) {
    url = `https://dummyjson.com/products/search?q=${query}&skip=${skip}&limit=${limit}`;
  } else if (sortBy) {
    url = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&skip=${skip}&limit=${limit}`;
  }

  return axios.get(url);
}
