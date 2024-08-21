import React from 'react';
import { useFormik } from 'formik';
import { useParams, Link } from 'react-router-dom';
import { BiCartDownload } from "react-icons/bi";
import * as Yup from 'yup';

function ForgetPassword(){

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required")
  })

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      callLoginAPI(values);
    },
    validationSchema: schema,
    validateOnMount: true
  });

  function callLoginAPI(values) {
    console.log("calling api login");
    console.log("sending data", values.email);
  }

  const { errors, touched, handleChange, handleSubmit, values, handleBlur, isValid } = formik;
  
  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-700 text-white">
      <form onSubmit={formik.handleSubmit} >
        <div className="flex flex-col items-center">
          <BiCartDownload className="m-5 text-6xl" />

          <label
            htmlFor = "email"
            className = "sr-only">
          email</label>
          <input
            id = "email"
            type="email"
            name="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border-2 border-white rounded bg-blue-700 p-2 m-2"
          />
              {touched.email && errors.email && (
          <div className = "text-red-500">{errors.email}</div>
              )}

          <button
            type="submit"
            className="border-2 border-white rounded bg-white p-2 py-1 m-2 text-blue-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
            disabled={!isValid}
          >
            Reset Password
          </button>

          <Link
            to = "/Login"
            >Back to  
            <span
              className = "underline underline-offset-2 hover:opacity-25"> login Page!</span></Link>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;