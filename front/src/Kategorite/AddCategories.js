import Navbar from "../Navbar/Navbar";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./AddCategories.css";
import axios from "axios";

function AddCategories(props) {

  const [category, setCategory] = useState({
    name: "",
  });

  const history = useHistory();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }

  const addCategory = async () => {
    try {
      const response = await axios.post(
        `http://localhost:63717/api/Category/`,
        {
          ...category,
        }, config
      );
      history.push("/kategorite");
    } catch (err) {
      alert("Something went wrong while trying to edit this Category");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  return (
    <>
      <>
        <Navbar />
        <div class="forma1">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Emri i Kategories</Form.Label>
              <Form.Control
                value={category.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Emri Kategories"
              />
            </Form.Group>

            <Button variant="primary" onClick={addCategory}>
              Shto Kategorine
            </Button>
          </Form>
        </div>
      </>
    </>
  );
}

export default AddCategories;
