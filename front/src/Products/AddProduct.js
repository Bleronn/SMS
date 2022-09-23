import Navbar from "../Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./AddProduct.css";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    categoryId: 0,
    unitsInStock: "",
    price: "",
    discount: "",
  });
  const [categories, setCategories] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sms_token")}`
    }
  }

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get("http://localhost:63717/api/Category", config);
      setCategories(response.data);
      console.log(response.data);
    }
    try {
      getProduct();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const history = useHistory();

  const addProduct = async () => {
    try {
      const response = await axios.post("http://localhost:63717/api/Product", {
        ...product,
      }, config);

      history.push("/products");
    } catch (err) {
      alert("Something went wrong while trying to add this product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <>
      <>
        <Navbar />
        <div class="forma1">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Emri i Produktit</Form.Label>
              <Form.Control
                value={product.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Emri Produktit"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Kategoria</Form.Label>
              <Form.Control
                as="select"
                value={product.categoryId}
                onChange={handleChange}
                name="categoryId"
              >
                <option value={0}>Zgjedhni kategorine</option>
                {categories &&
                  categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Njesi ne Stock</Form.Label>
              <Form.Control
                value={product.unitsInStock}
                onChange={handleChange}
                name="unitsInStock"
                type="number"
                placeholder="Njesi"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Qmimi</Form.Label>
              <Form.Control
                type="number"
                placeholder="Euro"
                value={product.price}
                onChange={handleChange}
                name="price"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Zbritje</Form.Label>
              <Form.Control
                type="number"
                placeholder="Zbritje %"
                value={product.discount}
                onChange={handleChange}
                name="discount"
              />
            </Form.Group>
            <Button variant="primary" onClick={addProduct}>
              Shto Produktin
            </Button>
          </Form>
        </div>
      </>
    </>
  );
}

export default AddProduct;
