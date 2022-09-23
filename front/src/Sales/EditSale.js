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
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function EditSale(props) {

  const [ajdi] = useState(props.ajdi);

  const [sale, setSale] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:63717/api/sale/${ajdi}`, config
    );
    setSale(response.data);
}, []);

console.log(sale.name);

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("sms_token")}`
  }
}

const handleChange = (e) => {
  const { name, value } = e.target;
  setSale({ ...sale, [name]: value });
};

const editSale = async () => {
  try {
    const response = await axios.put(
      `http://localhost:63717/api/sale/${ajdi}`,
      {
        ...sale,
      }, config
    );
    history.push("/sales");
  } catch (err) {
    alert("Something went wrong while trying to edit this Sale");
  }
};

return (
    <>
      <Navbar />
      {sale && (
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
            <Button variant="primary" onClick={editSale}>
              Ndrysho Shitjen
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

export default EditSale;
