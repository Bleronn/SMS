import Navbar from "../Navbar/Navbar";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "../Suppliers/AddSupplier.css";
import axios from "axios";

function AddSupplier() {
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    address: "",
    email: "",
  });

  const history = useHistory();

  const addSupplier = async () => {
    try {
      const response = await axios.post("http://localhost:63717/api/supplier", {
        ...supplier,
      });

      history.push("/furnitoret");
    } catch (err) {
      alert("Something went wrong while trying to add this supplier");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  return (
    <>
      <>
        <Navbar />
        <div class="forma1">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Emri i Furnizuesit</Form.Label>
              <Form.Control
                value={supplier.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Emri i Furnizuesit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Nr i telefonit te Furnizuesit</Form.Label>
              <Form.Control
                value={supplier.contact}
                onChange={handleChange}
                name="contact"
                type="text"
                placeholder="Nr i telefonit te Furnizuesit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Adresa e Furnizuesit</Form.Label>
              <Form.Control
                value={supplier.address}
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Adresa e Furnizuesit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email i Furnizuesit</Form.Label>
              <Form.Control
                value={supplier.email}
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Email i Furnizuesit"
              />
            </Form.Group>
            <Button variant="primary" onClick={addSupplier}>
              Shto Furnizuesin
            </Button>
          </Form>
        </div>
      </>
    </>
  );
}

export default AddSupplier;
