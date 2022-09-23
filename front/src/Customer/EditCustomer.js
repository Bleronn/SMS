import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { Button, Form } from "react-bootstrap";
import "./AddCustomer.css";
import axios from "axios";

function EditCustomer() {
  const [customer, setCustomer] = useState({});

  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://localhost:63717/api/Customer/${params.id}`
      );
      setCustomer(response.data);
    } catch (err) {
      history.push("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const editCustomer = async () => {
    try {
      const response = await axios.put(
        `http://localhost:63717/api/Customer/${params.id}`,
        {
          ...customer,
        }
      );
      history.push("/customers");
    } catch (err) {
      alert("Something went wrong while trying to edit this customer");
    }
  };

  return (
    <>
      <Navbar />
      {customer && (
        <div class="forma1">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Emri i Konsumatorit</Form.Label>
              <Form.Control
                value={customer.firstName}
                onChange={handleChange}
                name="firstName"
                type="text"
                placeholder="Emri Konsumtaorit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Mbiemri i Konsumatorit</Form.Label>
              <Form.Control
                value={customer.lastName}
                onChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Mbiemri Konsumtaorit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Kontakti</Form.Label>
              <Form.Control
                value={customer.contact}
                onChange={handleChange}
                name="contact"
                type="text"
                placeholder="Kontakti Konsumatorit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Kontakti</Form.Label>
              <Form.Control
                value={customer.address}
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Adresa Konsumatorit"
              />
            </Form.Group>
            <Button variant="primary" onClick={editCustomer}>
              Ndrysho Produktin
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

export default EditCustomer;
