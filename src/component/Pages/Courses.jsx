import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import WestIcon from "@mui/icons-material/West";
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [data, setData] = useState([]);
  const { Endpoint } = useContext(UserContext);
  const email = localStorage.getItem("userMail");
  const Navigate = useNavigate();
  useEffect(() => {
    Institution();
  }, []);

  const Institution = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewCourseName.php`,
        {
          userId: email
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const MainContainer = {
    marginTop: "10px",
    // backgroundColor: "#f3e9dc",
    borderRadius: "20px",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  };
  const MainDiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "200px",
    width: "250px",
    borderRadius: "30px",
    flexDirection: "column",
    backgroundColor: "white",
  };
  const MainCol = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        backgroundColor: "#f3e9dc",
        height: "100vh"
      }}
    >
      <Typography
        variant="h5"
        style={{ fontWeight: 500, textAlign: "center", paddingTop: "20px" }}
      >
        <NavLink to="/home" style={{ color: "black" }}>
          <WestIcon />
        </NavLink>
        Our Courses
      </Typography>
      <Container fluid style={MainContainer}>
        <Row>
          {Array.isArray(data) && data.length === 0 ? (
            <Col style={{ textAlign: "center" }}>
              No courses have been added yet.
            </Col>
          ) : (
            data.map((val) => (
              <Col key={val.sno} xs={12} sm={12} md={6} lg={3} xl={3} style={MainCol}>
                <NavLink
                  to={`/content/${val.sno}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <div style={MainDiv}>
                    <div>
                      <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${val.img}`} height="100px" alt="Book" />
                    </div>
                    <div style={{ paddingTop: "20px" }}>{val.course_name}</div>
                  </div>
                </NavLink>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
