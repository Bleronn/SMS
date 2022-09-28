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
      `http://localhost:63717/api/sale/${params.id}`, config
    );
    setSale(response.data);
}, []);

console.log(sale.userId);

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
      `http://localhost:63717/api/sale/${params.id}`,
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
                value={sale.invoiceId}
                onChange={handleChange}
                name="invoiceId"
                type="text"
                placeholder="ID e fatures"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
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
            <Form.Group controlId="exampleForm.ControlInput1">
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
