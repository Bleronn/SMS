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
import "./AddCategories.css";
import axios from "axios";

function EditCategory(props) {

  const [ajdi] = useState(props.ajdi);

  const [category, setCategory] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
      const response = await axios.get(
        `http://localhost:63717/api/category/${ajdi}`, config
      );
      setCategory(response.data);
  }, []);

  console.log(category.name);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const editCategory = async () => {
    try {
      const response = await axios.put(
        `http://localhost:63717/api/category/${ajdi}`,
        {
          ...category,
        }, config
      );
      history.push("/categories");
    } catch (err) {
      alert("Something went wrong while trying to edit this Category");
    }
  };

  return (
    <>
      
      {category && (
        <>
          <Button variant="primary" onClick={handleShow}>
            Edit
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row onSubmit={editCategory}> 
                <Col>
                  <Form>
                  <Form.Group controlId="CategoryId">
                      <Form.Label>Category Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Category Id"
                    />
                    </Form.Group>
                    <Form.Group controlId="CategoryName">
                      <Form.Label>Category Name</Form.Label>
                      <Form.Control
                        value={category.name}
                        // onChange={(e) => setCategory(e.target.value)}
                        onChange={handleChange}
                        name="name"
                        type="text"
                        placeholder="Category Name"
                    />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Category
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default EditCategory;
