import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../Suppliers/SupplierList.css";

function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }

  useEffect(async () => {
    axios.get("http://localhost:63717/api/Supplier/", config)
    .then((response) => {
      setSuppliers(response.data);
    })
  }, []);

  console.log(suppliers);

  const deleteSupplier = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:63717/api/supplier/" + id, config)
        .then(() => window.location.reload());
    }
  };

 

  return (
    <>
      <Navbar />
      {suppliers && (
        <div style={{ padding: "50px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Email</th>
                <th> <div class="bttn1">
                    <Link to="/furnitore/regjistro">
                      <Button class=" btn btn-primary " type="submit">
                        Shto Furnizuesin
                      </Button>
                    </Link>
                  </div></th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <Link to={`/furnitore/ndrysho/${supplier.id}`}>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="primary"
                        >
                          Ndrysho
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteSupplier(supplier.id)}
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
          <Modal.Title>Fshij furnitorin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A je i sigurt qe deshiron te fshish kete furnitor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Mbyll
          </Button>
          <Button onClick={deleteSupplier} variant="danger">
            Fshij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuppliersList;
