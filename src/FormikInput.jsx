import { useField} from "formik";
import { Input } from "postcss";
import React from "react";

function FormikInput({ name, ...rest }){
  const field = useField(name);
  const [data, meta] = field;
  const {value, onBlur, onChange} = data;
  const { error, touched} = meta;

  let borderClass = "border-gray-300 focus:border-indigo-300";
  if (error && touched){
    borderClass  = "border-red-300 focus:border-red-500";
  }

  return(
    <Input
      value = {value}
      onBlur = {onBlur}
      onChange = {onChange}
      error = {error}
      touched = {touched}
      name= {name}
      {...rest}
      />
  );
}

export default FormikInput;