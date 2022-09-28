import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    surname: "",
    email: "",
    password: "",
    kontakti: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:63717/api/Account/Register", {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.password,
      });
      history.push("/");
    } catch (err) {
      alert("Invalid register info");
    }

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
