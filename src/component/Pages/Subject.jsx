import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";

export default function Subject() {
  const [subdata, setSubdata] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loading state
  const email = localStorage.getItem("userMail");
  const { Endpoint } = useContext(UserContext);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axiosInstance.post(
        `get/U_ViewSubWiseSubject.php`,
        { userId: email }
      );

      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate("/signin");
        } else {
          const subobj = response.data.map((datas) => ({
            img: `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${datas.img}`,
            name: datas.subject_name,
            path: `/subinstruction/${datas.sno}`,
            sno: datas.sno,
          }));
          setSubdata(subobj);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleItemClick = (path, name, sno) => {
    localStorage.setItem("selectedItemPath", path);
    localStorage.setItem("selectedItemName", name);
    localStorage.setItem("selectedSno", sno);
    Navigate("/card");
  };

  const Div = {
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
    minHeight: "100vh",
  };

  return (
    <div>
      <Container fluid style={container}>
        <Row style={{ marginTop: "60px", justifyContent: "center" }}>
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
            &nbsp;PG-TRB
          </Typography>

          {loading ? (
            // 🌀 Loader when data is fetching
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Spinner animation="border" variant="primary" />
              <p>Loading subjects, please wait...</p>
            </div>
          ) : subdata.length === 0 ? (
            // ⚠️ If no data
            <Typography style={{ textAlign: "center", marginTop: "50px" }}>
              No subjects found.
            </Typography>
          ) : (
            // ✅ Render subject cards
            subdata.map((d, index) => (
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
                      <img src={d.img} alt={d.name} height="60px" />
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
