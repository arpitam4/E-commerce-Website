import React from 'react';
import { useFormik } from 'formik';
import { BiCartDownload } from "react-icons/bi";
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import WithAlert from './WithAlert';

function SignUp({ setAlert }) {

  const schema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    username: Yup.string().required("Username is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      confirmPassword: ""
    },
    onSubmit: (values) => {
      callSignUpAPI(values);
    },
    validationSchema: schema,
    validateOnMount: true
  });

  function callSignUpAPI(values) {
    // Assuming you have a signup API endpoint
    axios.post("https://myeasykart.codeyogi.io/signup", values)
      .then((response) => {
        setAlert({ message: "Sign up successful! Please log in.", type: "success" });
      })
      .catch((error) => {
        console.error("Error from API", error);
        setAlert({ message: "Sign up failed. Please try again.", type: "error" });
      });
  }

  const { errors, touched, handleChange, handleSubmit, handleBlur, isValid } = formik;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-700 text-white">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <BiCartDownload className="m-5 text-6xl" />
          <label htmlFor="fullname" className="sr-only">Fullname</label>
          <input
            id="fullname"
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.fullname}
            className="border-2 border-white rounded bg-blue-700 p-2 m-2"
          />
          {touched.fullname && errors.fullname && (
            <div className="text-red-500">{errors.fullname}</div>
          )}
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
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.username}
            className="border-2 border-white rounded bg-blue-700 p-2 m-2"
          />
          {touched.username && errors.username && (
            <div className="text-red-500">{errors.username}</div>
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
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formik.values.confirmPassword}
            className="border-2 border-white rounded bg-blue-700 p-2 m-2"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword}</div>
          )}
          <button
            type="submit"
            className="border-2 border-white rounded bg-white p-2 py-1 m-2 text-blue-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
            disabled={!isValid}
          >
            Sign Up
          </button>
          <p>Already have an account? <Link to="/Login" className="underline underline-offset-2 hover:opacity-25">Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default WithAlert(SignUp);
