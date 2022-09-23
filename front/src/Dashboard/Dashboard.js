import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BiBuildingHouse } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { GrDropbox } from "react-icons/gr";
import { RiFileList3Line } from "react-icons/ri";
import axios from "axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:63717/api/dashboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sms_token")}`,
        },
      })
      .then((response) => {
        setDashboard(response.data);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div class="dashboardBoxes">
          <Row>
            <Col>
              <Link to="/kategorite" style={{ textDecoration: "none" }}>
                <div class="box1">
                  <GoListUnordered className="icons" />
                  <div class="boxNr">{dashboard.categoriesCount}</div>
                  <div class="boxText">Kategori te listuara</div>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/furnitoret" style={{ textDecoration: "none" }}>
                <div class="box1">
                  <BiBuildingHouse className="icons" />
                  <div class="boxNr">{dashboard.suppliersCount}</div>
                  <div class="boxText">Furnitor te listuar</div>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <div class="box1">
                  <GrDropbox className="icons" />
                  <div class="boxNr">{dashboard.productsCount}</div>
                  <div class="boxText">Produkte te regjistuara</div>
                </div>
              </Link>
            </Col>
          </Row>

          <div class="secondRowDashboard">
            <Row>
              <Col>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <div class="box1">
                    <RiFileList3Line className="icons" />
                    <div class="boxNr">{dashboard.totalSales}</div>
                    <div class="boxText">Shitje Totale</div>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <div class="box1">
                    <RiFileList3Line className="icons" />
                    <div class="boxNr">{dashboard.todaySales}</div>
                    <div class="boxText">Shitje Ditore</div>
                  </div>
                </Link>
              </Col>

              <Col>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <div class="box1">
                    <RiFileList3Line className="icons" />
                    <div class="boxNr">{dashboard.weeklySales}</div>
                    <div class="boxText">Shitje Javore</div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
