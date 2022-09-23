import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [customerToDeleteId, setCustomerToDeleteId] = useState(null);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  useEffect(async () => {
    const getCustomers = async () => {
      const response = await axios.get("http://localhost:63717/api/Customer");
      setCustomers(response.data);
    };

    try {
      await getCustomers();
    } catch (err) {
      alert("Something went wrong while trying to add this customer");
    }
  }, []);

  const deleteCustomer = async () => {
    if (customerToDeleteId) {
      try {
        await axios.delete(
          `http://localhost:63717/api/Customer/${customerToDeleteId}`
        );

        setCustomers(customers.filter((p) => p.id !== customerToDeleteId));
        handleClose();
      } catch (err) {
        alert("Something went wrong while trying to delete this customer");
      }
    }
  };

  const handleDeleteDialog = (id) => {
    handleShow();
    setCustomerToDeleteId(id);
  };

  return (
    <>
      <Navbar />
      <Link to="/customers/regjistro">
        <Button class="bttn1" variant="secondary" type="submit">
          Shto Konsumatorin
        </Button>
      </Link>
      {customers && (
        <div style={{ padding: "50px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.address}</td>

                  <td>
                    <div style={{ display: "flex" }}>
                      <Link to={`/customers/ndrysho/${customer.id}`}>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="primary"
                        >
                          Ndrysho
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteDialog(customer.id)}
                        variant="danger"
                      >
                        Fshij
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fshij konsumatorin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A je i sigurt qe deshiron te fshish kete konsumator?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Mbyll
          </Button>
          <Button onClick={deleteCustomer} variant="danger">
            Fshij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomersList;
