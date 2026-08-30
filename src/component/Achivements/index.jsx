import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { UserContext } from "../../Context";
// import { PATH } from "../Router/routeConstants";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
const Index = () => {
  const Navigate = useNavigate();
  const [achievements, setAchievements] = useState([]);
  const { Endpoint } = useContext(UserContext);
  const email = localStorage.getItem("userMail");
  // const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // Define the payload (data to be sent)
    const payload = {
      userId: email,

    };

    try {
      // Send the POST request using Axios
      const response = await axiosInstance.post(
        `get/U_viewAchievements.php`,
        payload
      );

      // Check if the response is successful
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }
        const data = response.data;
        if (Array.isArray(data)) {
          setAchievements(data);
        } else {
          console.error("Error: API response is not an array", data);
        }

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const mainContainerStyle = {
    backgroundColor: "#f3e9dc",
    padding: "30px"
  };

  const scrollContainerStyle = {
    overflowX: "auto",
    padding: "10px 0",
    display: "flex",
    minWidth: "100%"

  };

  return (
    <div>
      <Typography variant="h5" style={{ textAlign: "center", backgroundColor: "#f3e9dc", marginTop: "20px", paddingTop: "20px", fontWeight: "bold" }}>
        OUR AWARDS &amp; <span style={{ color: "#c08552" }}>ACHIEVEMENTS</span>
      </Typography>
      <Container fluid style={mainContainerStyle}>
        <Row style={scrollContainerStyle}>
          {achievements.map((achievement, index) => (
            <Col key={index} xs={12} sm={12} md={6} lg={2} xl={2} style={{ marginBottom: "15px" }}>
              <div className="d-flex flex-column p-3  service-div shadow h-100" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={`http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/${achievement.img}`}
                    alt="Awards"
                    height="100px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ paddingTop: '20px' }}>
                  <Typography style={{ fontWeight: 500, textAlign: 'justify' }}>
                    {achievement.content}
                  </Typography>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Index;
