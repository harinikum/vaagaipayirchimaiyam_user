import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context";
import { axiosInstance } from "../Api/instance";
import { useNavigate } from "react-router-dom";
export default function ModelTest() {
  const Div = {
    // backgroundColor:"white",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "white",
  };
  const container = {
    backgroundColor: "#f3e9dc",
    padding: 20,
    height: "100vh",
  };
  const [data, setData] = useState([]);
  const { Endpoint } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userMail");
  const Navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `get/U_ViewModelMockInstitution.php`,
        {
          userId: email,
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate("/signin");
        }
        const obj = response.data.map((data) => ({
          img: `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${data.img}`,
          name: data.institution_name,
          path: `/modelinstruction/${data.sno}`,
          sno: data.sno,
        }));
        setData(obj);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (path, name, sno) => {
    localStorage.setItem("selectedItemPath", path);
    localStorage.setItem("selectedItemName", name);
    localStorage.setItem("selectedSno", sno);
    Navigate("/card");
  };

  return (
    <div>
      <Container fluid style={container}>
        <Row style={{ marginTop: "50px", justifyContent: "center" }}>
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: 600,
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            <NavLink to="/home" style={{ color: "black" }}>
              <WestIcon />
            </NavLink>
            &nbsp;PG-TRB TEST BATCH
          </Typography>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Spinner animation="border" variant="primary" />
              <p>Loading subjects, please wait...</p>
            </div>
          ) : data.length === 0 ? (
            <Typography style={{ textAlign: "center", marginTop: "50px" }}>
              No subjects found.
            </Typography>
          ) : (
            data.map((d, index) => (
              <Col
                key={index}
                xs={12}
                sm={12}
                md={6}
                lg={3}
                xl={3}
                style={{ justifyContent: "center", marginBottom: "20px" }}
              >
                <div
                  onClick={() => handleItemClick(d.path, d.name, d.sno)}
                  style={{ color: "black", textDecoration: "none", cursor: "pointer" }}
                >
                  <div style={Div}>
                    <div>
                      <img src={d.img} height="65px" />
                    </div>
                    <div style={{ paddingTop: "20px" }}>
                      <Typography style={{ fontWeight: 600 }}>
                        {d.name}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
