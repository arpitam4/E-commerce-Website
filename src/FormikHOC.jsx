import React from 'react';
import {useField } from 'formik';

function formikHOC(InputComponent){
  function OutputComponent({name, ...rest}){
    const field = useField(name);
    console.log("field is ", field, name);
    const [data, meta] = field;
    const {value, onBlur, onChange} = data;
    const { error, touched} = meta;

    let borderClass = "border-gray-300 focus:border-indigo-300";
    if (error && touched){
      borderClass  = "border-red-300 focus:border-red-500";
    }

    return(
      <InputComponent
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
  return OuputComponent;
}

export default formikHOC;