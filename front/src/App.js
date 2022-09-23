import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from "./Register/Form";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";

import ProductsList from "./Products/ProductsList";
import ProductDetails from "./Products/ProductDetails";
import AddProduct from "./Products/AddProduct";
import EditProduct from "./Products/EditProduct";
import SuppliersList from "./Suppliers/SupplierList";
import AddSupplier from "./Suppliers/AddSupplier";
import SupplierDetails from "./Suppliers/SupplierDetails";
import EditSupplier from "./Suppliers/EditSupplier";

import CategoriesList from "./Kategorite/CategoriesList";
import CategoriesDetails from "./Kategorite/CategoriesDetails";
import AddCategories from "./Kategorite/AddCategories";
import EditCategory from "./Kategorite/EditCategory";

import CustomerList from "./Customer/CustomerList";
import CustomerDetails from "./Customer/CustomerDetails";
import AddCustomer from "./Customer/AddCustomer";
import EditCustomer from "./Customer/EditCustomer";

import SaleList from "./Sales/SaleList";
import SaleDetails from "./Sales/SaleDetails";
import AddSale from "./Sales/AddSale";
import EditSale from "./Sales/EditSale";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {

    let u = localStorage.getItem("sms_token");
    if (u) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log(isLoggedIn);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <>

          <Switch>
            {!isLoggedIn ?
              (
                <Route path="/" component={Login} exact />
              ) : (isLoggedIn &&
                <>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/register" component={Register} />

                  <Route path="/products" component={ProductsList} />
                  <Route path="/produktet/regjistro" component={AddProduct} />
                  <Route path="/produktet/:id" component={ProductDetails} />
                  <Route path="/produktet/ndrysho/:id" component={EditProduct} />

                  <Route path="/furnitoret" component={SuppliersList} />
                  <Route path="/furnitoret/regjistro" component={AddSupplier} />
                  <Route path="/furnitoret/:id" component={SupplierDetails} />
                  <Route path="/furnitoret/ndrysho/:id" component={EditSupplier} />

                  <Route path="/customers" component={CustomerList} />
                  <Route path="/customers/regjistro" component={AddCustomer} />
                  <Route path="/customers/:id" component={CustomerDetails} />
                  <Route path="/customers/ndrysho/:id" component={EditCustomer} />

                  <Route path="/sales" component={SaleList} />
                  <Route path="/sales/regjistro" component={AddSale} />
                  <Route path="/sales/:id" component={SaleDetails} />
                  <Route path="/sales/ndrysho/:id" component={EditSale} />

                  <Route path="/kategorite" component={CategoriesList} />
                  <Route path="/addcategories" component={AddCategories}
                  />
                  <Route path="/kategorite/ndrysho/:id" component={EditCategory} />

                </>
              )}
            <Route path="*" component={() => <h1>Not Found</h1>} />
          </Switch>
        </>

      </BrowserRouter>
    </div>
  );
}

export default App;
