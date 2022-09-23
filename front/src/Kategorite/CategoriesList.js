import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Table, Button, Modal, ButtonToolbar } from "react-bootstrap";
import { Route } from "react-router-dom";

import axios from "axios";
import "./CategoriesList.css";

import EditCategory from "../Kategorite/EditCategory" 


function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  useEffect(() => {
    axios
      .get("http://localhost:63717/api/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sms_token")}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }


  const deleteCategory = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("http://localhost:63717/api/category/" + id, config)
        .then(() => window.location.reload());
    }
  };

  const handleDeleteDialog = (id) => {
    handleShow();
    setCategoryToDeleteId(id);
  };


  return (
    <>
      <Navbar />

      {categories && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "lightblue",
            borderColor: "black",
          }}
        >
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Emri Kategorise</th>
                <th>
                  <div class="bttn1">
                    <Link to="/AddCategories">
                      <Button class=" btn btn-primary ">
                        Shto Kategorine
                      </Button>
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr>
                  <td>{category.name}</td>

                  <td>
                    <ButtonToolbar>
                      <EditCategory ajdi={category.id} />

                      <Button
                        className="ml-2"
                        variant="danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default CategoriesList;
