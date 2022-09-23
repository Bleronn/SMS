import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../Suppliers/SupplierList.css";

function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [supplierToDeleteId, setSupplierToDeleteId] = useState(null);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  useEffect(async () => {
    const getSuppliers = async () => {
      const response = await axios.get("http://localhost:63717/api/supplier");
      setSuppliers(response.data);
    };

    await getSuppliers();
  }, []);

  const deleteSupplier = async () => {
    if (supplierToDeleteId) {
      try {
        await axios.delete(
          `http://localhost:63717/api/supplier/${supplierToDeleteId}`
        );

        setSuppliers(suppliers.filter((p) => p.id !== supplierToDeleteId));
        handleClose();
      } catch (err) {
        alert("Something went wrong while trying to delete this supplier");
      }
    }
  };

  const handleDeleteDialog = (id) => {
    handleShow();
    setSupplierToDeleteId(id);
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
                    <Link to="/furnitoret/regjistro">
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
                      <Link to={`/furnitoret/ndrysho/${supplier.id}`}>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="primary"
                        >
                          Ndrysho
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteDialog(supplier.id)}
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
