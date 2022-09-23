import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./AddProduct.css";


function ProductsList() {
  const [products, setProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  useEffect(() => {
    axios
      .get("http://localhost:63717/api/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sms_token")}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }


  const deleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:63717/api/Product/" + id, config)
        .then(() => window.location.reload());
    }
  };

  return (
    <>
      <Navbar />
      {products && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "lightblue",
            borderColor: "black",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>

                <th>Stock</th>
                <th>Price</th>
                <th>Date</th>
                <th>
                  <Link to="/produktet/regjistro">
                    <Button class=" btn btn-primary " type="submit">
                      Shto Produktin
                    </Button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#56BAC7" }}>
              {products.map((product) => (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>

                  <td>{product.unitsInStock}</td>
                  <td>{product.price}</td>
                  <td>{product.insertedAt}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <Link to={`/produktet/ndrysho/${product.id}`}>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="primary"
                        >
                          Ndrysho
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteProduct(product.id)}
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
          <Modal.Title>Fshij produktin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A je i sigurt qe deshiron te fshish kete produkt?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Mbyll
          </Button>
          <Button onClick={deleteProduct} variant="danger">
            Fshij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductsList;
