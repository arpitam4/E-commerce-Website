import React from "react";

function Input({name, label, id, className, touched, error, ...rest}){
  let borderClass = "border-gray-300 focus:border-indigo-300"
  return (
    <div>
      <label htmlfor = {id} className = "sr-only">
        {label}</label>
      <input
        id = {id}
        name = {name}
        className = {"focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border" + borderClass + className}
        {...rest}
        >
        {touched && error && <div className = "text-red-600">{error}</div>}
      </input>
    </div>
  )
}
export const FormikInput = FormikHOC(Input);

export default Input;