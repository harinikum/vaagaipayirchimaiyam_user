import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { Typography, Card } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import Crown from '../../asserts/crown.png';
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";

const styles = {
  card: {
    textAlign: "center",
    color: "#333",
    backgroundColor: "#f3e9dc",
    padding: "20px",
    margin: "10px",
    borderRadius: "10px",
  },
  icon: {
    marginRight: "8px",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#5e3023",
    borderColor: "#5e3023",
    color: "#fff",
    width: "100px",
  },
};

const Plan = () => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { Endpoint } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState();
  const emailId = localStorage.getItem("userMail");
  const plan = localStorage.getItem("category");
  const [category,setCategory]=useState([]);
  const navigate = useNavigate();

  const handleClickOpen = (amount, title) => {
    setOpen(true);
    setAmount(amount);
    setTitle(title);
  };

  const handlePay = () => {
    Payment();
  };

  const handleClose = () => {
    navigate("/home");
  };

  useEffect(() => {
    fetchData();
    fetchProfile();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewPlans.php`, {
        userId: emailId,
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        setPlans(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewProfile.php`, {
        email: emailId,
      });

      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        setCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Payment = async () => {
    try {
      const payload = {
        user_id: emailId,
        amount: amount,
        account_type: plan,
        duration: selectedPlan.duration,
        plan_name: selectedPlan.title,
      };

      const response = await axiosInstance.post(`post/payment.php`, payload);
      window.location.href = response.data.pay_url;
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const linkdata = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewStaticInfo.php`, {
        userId: emailId,
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching static info:", error);
    }
  };

  useEffect(() => {
    linkdata();
  }, []);

  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
  };

  


  useEffect(() => {
    console.log("Updated profile data:",category); // Log whenever `profileData` changes
  }, [category]);

  // Mapping through profileData array to get current_plan_id
  const currentPlanId = category.map((profile) => profile.current_plan_id)[0]; // Assuming you want the first current_plan_id

  console.log("Current Plan ID:", currentPlanId); 

  return (
    <>
      <Container fluid className="mt-3">
        <Typography variant="h5" gutterBottom style={{ marginBottom: "20px", textAlign: "center" }}>
          <NavLink to="/home" style={{ color: "black" }} onClick={() => console.log("Back arrow clicked")}>
            <WestIcon style={styles.icon} />
          </NavLink> Premium Plans &nbsp;<img src={Crown} height="25px" alt="crown" />
        </Typography>
        <Row>
          {Array.isArray(plans) && plans.map((plan, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Card style={styles.card}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h6" style={{ marginBottom: "10px", backgroundColor: "#5e3023", width: "150px", color: "white", padding: "10px" }}>{plan.title}</Typography>
                </div>
                <Typography variant="body1" style={{ marginBottom: "10px" }}>{plan.duration}&nbsp;Months</Typography>
                <Typography variant="h5" style={{ marginBottom: "20px" }}>${plan.amount}</Typography>
                <Button variant="primary" style={styles.button} onClick={() => handleViewPlan(plan)}>View</Button>
                {selectedPlan === plan && plan.description && (
                  <div>
                    <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                      {plan.description.split(',').map((word, index) => (
                        word.trim() && (
                          <li key={index} style={{ display: 'flex', alignItems: 'left', lineHeight: '1.5', paddingLeft: "20px", paddingTop: "15px" }}>
                            <span style={{ color: 'green' }}>&#10003;</span>
                            {word.trim()}
                          </li>
                        )
                      ))}
                    </ul>
                    {currentPlanId !== plan.title && (
                      <Button variant="contained" color="primary" style={styles.button} onClick={() => handleClickOpen(plan.amount, plan.title)}>Buy Now</Button>
                    )}
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <p>Are you sure to purchase the plan?</p>
          <p>Amount : {amount}</p>
        </DialogContent>
        <DialogActions>
          <Button autoFocus style={{ backgroundColor: "green", border: "none" }} onClick={handlePay}>
            Pay
          </Button>
          <Button autoFocus style={{ backgroundColor: "red", border: "none" }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Plan;
