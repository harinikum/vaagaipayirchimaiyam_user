import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { Typography, Card } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { NavLink } from "react-router-dom";
import './style.css'
import Tick from '../../asserts/49827_check_done_icon.png'
import { useState,useEffect } from "react";
import axios from "axios";

const styles = {
  mainContainer: {
    display:"flex"
  },
  card: {
    padding: "20px",
    textAlign: "center",
    color: "#333",
    backgroundColor: "#f3e9dc", 
  },
  centerText: {
    textAlign: "center",
    color: "#5e3023",
    marginTop:"100px"
  },
  icon: {
    marginRight: "8px",
  },
  button: {
    marginTop: "0px",
    backgroundColor: "#5e3023",
    borderColor: "#5e3023",
    color: "#fff",
    width: "100px",
    marginBottom:"20px"
  },
  cardItem: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius:"10px"
  },
  innerContent: {
    padding: "10px",
    backgroundColor: "#5e3023",
    width: "150px",
    color:"white"
  },
};

const PricingPlan = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/_Nursing_final/controllers/api/User/get/U_ViewPlans.php",
          
        );
        const obj = response.data.map((data) => ({
          title: data.title,
          amount: data.amount,
          duration:data.duration,
          description:data.description
          // path: "/instruction",
        }));
        setData(obj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  return (
    <>
    <Typography variant="h5" gutterBottom style={styles.centerText}>
       <NavLink to="/plan" style={{color:"black"}}>
       <WestIcon style={styles.icon} />
        </NavLink> Our Pricing Plans  </Typography>
    <Container fluid  style={styles.mainContainer}>
        <Card className="p-4 mx-auto" style={styles.card}>
          <Row>
            {data.map((plan, index) => (
              <Col  xs={12} sm={12} md={6} lg={3} xl={3} key={index}>
                <div  className="item1">
                  <div style={styles.innerContent}>
                    <Typography>{plan.amount}</Typography>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <Typography>{plan.duration}</Typography>
                    {/* <Typography variant="h4"> */}
                      <ul style={{listStyleType:"none"}}>
                        <li><img src={Tick}/>{plan.description}</li>
                      </ul>
                     
                      {/* </Typography> */}
                  </div>
                 
                  <Button variant="primary" style={styles.button}>
                    Buy Now
                  </Button>
                 
                </div>
              </Col>
            ))}
          </Row>
        </Card>
    </Container>
    </>
  );
};

export default PricingPlan;
