import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./Form.css";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm(e) {}

  return (
    <>
      

        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
     
    </>
  );
};

export default Form;
