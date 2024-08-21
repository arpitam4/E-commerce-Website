import React, { useState, useMemo, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from './ProductListPage';
import ProductDetails from './ProductDetails';
import Navbar from './Navbar';
import Footer from './Footer';
import { getProductData } from './api';
import Login from './Login';
import SignUp from './SignUp';
import ForgetPassword from './ForgetPassword';
import CartListPage from './CartListPage';
import Dashboard from './Dashboard';
import Loading from './Loading';
import axios from 'axios';
import Alert from './Alert';

export const UserContext = createContext();
export const AlertContext = createContext();

function App() {
  const savedDataString = localStorage.getItem('my-cart') || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [alert, setAlert] = useState({});

  console.log("cart is ", cart);
  console.log("logged in user is ", user);

  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          authorization: token
        }
      })
      .then((response) => {
        setUser(response.data);
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoadingUser(false);
      });
    } else {
      setLoadingUser(false);
    }
  }, [token]);

  useEffect(() => {
    const promises = Object.keys(cart).map((productId) => getProductData(productId));

    Promise.all(promises).then((responses) => {
      const products = responses.map((response) => response.data);
      console.log("products are ", products);
    });
  }, [cart]);

  function handleAddToCart(productId, count) {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    updateCart(newCart);
  }

  function updateCart(newCart) {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("my-cart", cartString);
  }

  const totalCount = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => previous + cart[current], 0);
  }, [cart]);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <UserContext.Provider value={{ user, setUser }}>
        <AlertContext.Provider value={{ alert, setAlert }}>
          <Navbar productCount={totalCount} />
          <Alert /> {/* Ensure Alert component is placed here */}
          <div className="flex flex-grow items-center justify-center">
            <Routes>
              <Route path="/Products" element={<ProductListPage />} />
              <Route path="/ProductDetails/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
              <Route path="/Login" element={<Login user={user} setUser={setUser} setAlert={setAlert} />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ForgetPassword" element={<ForgetPassword />} />
              <Route path="/Cart" element={<CartListPage cart={cart} updateCart={updateCart} />} />
              <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
            </Routes>
          </div>
          <Footer />
        </AlertContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
