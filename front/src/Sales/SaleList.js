import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./AddSale.css";


function SalesList() {
  const [sales, setSales] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  useEffect(() => {
    axios
      .get("http://localhost:63717/api/sale/", config)
      .then((response) => {
        setSales(response.data);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }


  const deleteSale = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:63717/api/sale/" + id, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navbar />
      {sales && (
        <div style={{ padding: "50px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID e fatures</th>
                <th>Perdoruesi</th>
                <th>Sasia</th>
                <th>Qmimi Njesi</th>
                <th>Zbritja</th>
                <th>
                <Link to="/sale/regjistro">
                  <Button class=" btn btn-primary " type="submit">
                    Shto Shitje
                  </Button>
                </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr>
                  <td>{sale.invoiceId}</td>
                  <td>{sale.user.userName}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.unitPrice}</td>
                  <td>{sale.discount}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <Link to={`/sale/ndrysho/${sale.id}`}>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="primary"
                        >
                          Ndrysho
                        </Button>
                      </Link>
                      <Button
                       onClick={() => deleteSale(sale.id)}
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
          <Button onClick={deleteSale} variant="danger">
            Fshij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SalesList;
