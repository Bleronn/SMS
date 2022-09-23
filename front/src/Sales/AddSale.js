import Navbar from "../Navbar/Navbar";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "../Sales/AddSale.css";
import axios from "axios";

function AddSale() {
  const [sale, setSale] = useState({
    name: "",
    contact: "",
    address: "",
    email: "",
  });

  const history = useHistory();

  const addSale = async () => {
    try {
      const response = await axios.post("http://localhost:63717/api/sale", {
        ...sale,
      });

      history.push("/shitjet");
    } catch (err) {
      alert("Something went wrong while trying to add this sale");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };

  return (
    <>
      <>
        <Navbar />
        <div class="forma1">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>ID e fatures</Form.Label>
              <Form.Control
                value={sale.InvoiceId}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="ID e fatures"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>ID e perdoruesit</Form.Label>
              <Form.Control
                value={sale.UserId}
                onChange={handleChange}
                name="contact"
                type="text"
                placeholder="ID e Perdoruesit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Sasia</Form.Label>
              <Form.Control
                value={sale.Quantity}
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Sasia"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Qmimi per Njesi</Form.Label>
              <Form.Control
                value={sale.UnitPrice}
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Qmimi per Njesi"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Zbritja</Form.Label>
              <Form.Control
                value={sale.Discount}
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Zbritja"
              />
            </Form.Group>
            <Button variant="primary" onClick={addSale}>
              Shto Shitje
            </Button>
          </Form>
        </div>
      </>
    </>
  );
}

export default AddSale;
