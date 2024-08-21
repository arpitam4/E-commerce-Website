import React from 'react';
import { useFormik } from 'formik';
import { BiCartDownload } from "react-icons/bi";
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import WithAlert from './WithAlert';

function Login({ user, setUser, setAlert }) {
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      callLoginAPI(values);
    },
    validationSchema: schema,
    validateOnMount: true
  });

  function callLoginAPI(values) {
    console.log("Attempting login with values:", values);
    axios.post("https://myeasykart.codeyogi.io/login", { email: values.email, password: values.password })
      .then((response) => {
        const { user, token } = response.data;
        console.log("Login successful, user:", user, "token:", token);
        localStorage.setItem("token", token);
        setUser(user);
        setAlert({ message: "Login successful!", type: "success" });
      })
      .catch((error) => {
        console.error("Error from API", error);
        setAlert({ message: "Invalid email or password.", type: "error" });
      });
  }

  const { errors, touched, handleChange, handleSubmit, handleBlur, isValid } = formik;

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-700 text-white">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center">
          <BiCartDownload className="m-5 text-6xl" />
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.email}
            className="border-2 border-white rounded bg-blue-700 p-2 m-2"
          />
          {touched.email && errors.email && (
            <div className="text-red-500">{errors.email}</div>
          )}
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.password}
            className="border-2 border-white rounded bg-blue-700 p-2 m-2"
          />
          {touched.password && errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
          <button
            type="submit"
            className="border-2 border-white rounded bg-white p-2 py-1 m-2 text-blue-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
            disabled={!isValid}
          >
            Login
          </button>
          <Link to="/ForgetPassword">Forgot Password?</Link>
          <p>Don't have an account? <Link to="/SignUp" className="underline underline-offset-2 hover:opacity-25">Sign up!</Link></p>
        </div>
      </form>
    </div>
  );
}

export default WithAlert(Login);
