import Navbar from "../Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./AddSale.css";
import axios from "axios";

function AddSale() {
  const [sale, setSale] = useState({
    name: "",
    contact: "",
    address: "",
    email: "",
  });

  // const [sale, setSale] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }

  useEffect(() => {
      axios.get("http://localhost:63717/api/Sale/", config)
      .then((response) => {
        setSale(response.data);

      })
  }, []);

  console.log(sale)

  const history = useHistory();

  const addSale = () => {
     axios.post("http://localhost:63717/api/Sale/", {
        ...sale,
      }, config);

      history.push("/sales");
    
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
                value={sale.invoiceId}
                onChange={handleChange}
                name="invoiceId"
                type="text"
                placeholder="ID e fatures"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>ID e perdoruesit</Form.Label>
              <Form.Control
                value={sale.userId}
                onChange={handleChange}
                name="userId"
                type="text"
                placeholder="ID e Perdoruesit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Sasia</Form.Label>
              <Form.Control
                value={sale.quantity}
                onChange={handleChange}
                name="quantity"
                type="number"
                placeholder="Sasia"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Qmimi per Njesi</Form.Label>
              <Form.Control
                value={sale.unitPrice}
                onChange={handleChange}
                name="unitPrice"
                type="number"
                placeholder="Qmimi per Njesi"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Zbritja</Form.Label>
              <Form.Control
                value={sale.discount}
                onChange={handleChange}
                name="discount"
                type="number"
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
