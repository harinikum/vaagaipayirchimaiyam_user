import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Customer from "../../asserts/form.png";
import WhatsApp from "../../asserts/whatsapp.png";
import Instagram from "../../asserts/gmail.png";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";
export default function Non_Nursing() {
  const [data, setData] = useState([]);
  const { Endpoint } = useContext(UserContext);
  const email = localStorage.getItem("userMail");
  const Navigate=useNavigate();
  useEffect(() => {
    Institution();
  }, []);

  const Institution = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewStaticInfo.php`,
        {
          userId: email
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin'); 
        } 
          setData(response.data);
       
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const MainContainer = {
    backgroundColor: "#f3e9dc",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    paddingBottom: "20px",
  };

  const box = {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
    textAlign: "center",
    // width:"500px"

  };

  return (
    <div
      style={{
        background: "linear-gradient(45deg, #dee7fa,#ECE9FA, #f0f3fc,#e3f6fa), #FFFFFF 50%",
        minHeight: "100vh",
      }}
    >
      {data.map((r) => (
        <div key={r.id}>
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: 600,
              textAlign: "center",
              paddingTop: "20px",
              paddingBottom: "20px"
            }}
          >
            <NavLink to="/home" style={{ color: "black" }}>
              <WestIcon />
            </NavLink>
            &nbsp;Company Discussion Forum
          </Typography>
          <Container fluid style={MainContainer}>
            <Row>
              <Col xs={12} style={{ marginTop:"30px" }}>
                <Typography style={{ fontWeight: 600 }}>
                  Welcome! How Can I Help You?
                </Typography>
              </Col>
              <Col xs={12}>
                <img
                  src={Customer}
                  height="200px"
                  alt="Customer Support"
                  className="img-fluid"
                />
              </Col>
              <Col xs={12} md={6} style={{ paddingTop: 20 }}>
                <img
                  src={WhatsApp}
                  height="50px"
                  alt="WhatsApp"
                  className="img-fluid"
                />
                <Typography style={{ paddingTop: "20px" }}>
                  Ask questions through WhatsApp by clicking the link below
                </Typography>
                <div style={box}>
                  <a
                    href={r.whatsapplink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordWrap: "break-word" }}
                  >
                    {r.whatsapplink}
                  </a>
                </div>
              </Col>
              <Col xs={12} md={6} style={{ paddingTop: 15 }}>
                <img
                  src={Instagram}
                  height="50px"
                  alt="Gmail"
                  className="img-fluid"
                />
                <Typography style={{ paddingTop: "20px" }}>
                  Ask questions through Gmail by clicking the link below
                </Typography>
                <div style={box}>
                  <a
                    href={`mailto:${r.gmaillink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ wordWrap: "break-word" }}
                  >
                    {r.gmaillink}
                  </a>
                </div>
              </Col>
              <Col xs={12} style={{ paddingTop: 30 }}>
                <Typography>
                  If there are any queries or questions about anything, please
                  click the link below and interact with the administrator.
                </Typography>
              </Col>
              <Col xs={12} style={{ paddingTop: 30 }}>
                <Typography style={{ color: "gray" }}>
                  Can't find what you are looking for? &nbsp;
                  <NavLink to="/contact">
                    <Button
                      style={{ backgroundColor: "#5e3023", border: "none" }}
                    >
                      Contact us
                    </Button>
                  </NavLink>
                </Typography>
              </Col>
            </Row>
          </Container>
        </div>
      ))}
    </div>
  );
}
