import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { UserContext } from "../../Context";
import { axiosInstance } from "../Api/instance";
import Crown from "../../asserts/crown.png";
import "./style.css";

const MyComponent = () => {
  const [Cardstyle, setCardstyle] = React.useState(true);
  const { Endpoint } = useContext(UserContext);
  const [category, setCategory] = useState([]);
  const email = localStorage.getItem("userMail");
  const Navigate = useNavigate();
  const plan = localStorage.getItem("category");

  useEffect(() => {
    fetchData1();
  }, []);

  const fetchData1 = async () => {
    try {
      const response = await axiosInstance.post("get/U_ViewProfile.php", {
        email: email,
      });
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const CardClick = () => {
    setCardstyle(false);
  };

  const isPremium = category.length > 0 && plan === "premium";

  const cardStyle = {
    backgroundColor: "#f3e9dc",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
  };

  const crownStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "20px",
    height: "20px",
    visibility: "visible",
  };

  const profileNameStyle = {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  };

  // const handleCardClick = (link, categoryKey) => {
  //   const categoryValue = localStorage.getItem(categoryKey);
  
  //   if (categoryValue === categoryKey) {
  //     Navigate(link);
  //   } else {
  //     alert("This category is available for Premium users only.");
  //   }
  // };
  const handleCardClick = (link, categoryKey) => {
    if (
      categoryKey === null || // Free content
      localStorage.getItem(categoryKey) === categoryKey // Premium check
    ) {
      const subjectKey = categoryKey === null ? "FREE" : categoryKey;
      localStorage.setItem("selectedSubject", subjectKey); // Always set selectedSubject
      Navigate(link); // Navigate to the specific subject/test list page
    } else {
      alert("This category is available for Premium users only.");
    }
  };

  return (
    <>
      <Container fluid style={{ backgroundColor: "white", paddingTop: 20 }}>
        <Row className="text-center justify-content-center text-row">
          <div>
            <h4 className="tittle">SUBJECTS</h4>
          </div>
        </Row>
        {/* <Row className="d-flex justify-content-center lg-p-5">
          {[{ name: "Free Mock Test", link: "/year", showCrown: false, isPremiumCategory: false }].map((card, index) => (
            <Col key={index} xl={3} lg={3} md={6} sm={12} xs={12} className="align-items-center p-3">
              <div
                className="box"
                style={cardStyle}
                onClick={() => handleCardClick(card.link, card.isPremiumCategory)}
              >
                {card.showCrown && <img src={Crown} alt="Crown" style={crownStyle} />}
                <Typography style={profileNameStyle}>{card.name}</Typography>
              </div>
            </Col>
          ))}
        </Row> */}
      </Container>

      <Container style={{ backgroundColor: "white", paddingTop: 10 }}>
        <Row className="d-flex justify-content-center lg-p-5">
          {[
            {
              name: "Free Mock Test",
              link: "/year",
              showCrown: false,
              categoryKey: null,
            },
            {
              name: "PG-TRB",
              link: "/subject",
              showCrown: true,
              categoryKey: "PG",
            },
            {
              name: "UG-TRB",
              link: "/non_nursing",
              showCrown: true,
              categoryKey: "UG",
            },
            {
              name: "PG-TRB TEST BATCH",
              link: "/model",
              showCrown: true,
              categoryKey: "TNSET",
            },
            {
              name: "TNTET",
              link: "/prelims",
              showCrown: true,
              categoryKey: "TNTET",
            },
            {
              name: "கட்டாயத் தமிழ் தகுதி தேர்வு",
              link: "/mains",
              showCrown: true,
              categoryKey: "KT",
            },
          ].map((card, index) => (
            <Col
              key={index}
              xl={4}
              lg={4}
              md={6}
              sm={12}
              xs={12}
              className="align-items-center p-3"
            >
              <div
                className="box"
                style={cardStyle}
                onClick={() => handleCardClick(card.link, card.categoryKey)}
              >
                {card.showCrown && (
                  <img src={Crown} alt="Crown" style={crownStyle} />
                )}
                <Typography style={profileNameStyle}>{card.name}</Typography>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MyComponent;
