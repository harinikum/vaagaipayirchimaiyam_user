// Home.jsx
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container,Row,Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./style";
import { Typography, styled } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { NavLink } from "react-router-dom";

const ButtonContainer = () => (
  
  <Container  style={styles.buttonContainer}>
   <NavLink to='/signup'>
   <Button
      variant="contained"
      style={{ ...styles.button, ...styles.startButton }}
    >
      Create your Account  <ArrowRightAltIcon />
    </Button>
   </NavLink>
    
  </Container>
);

const CreateAccount = () => {


   const WrappElement = styled('div')(() => ({
   '.tt':{
    fontSize:"30px",
    color:'#5e3023',
'@media (max-width:600px)': {
       fontSize:"20px"
    },
   },
  }));
  return (
    <WrappElement>
    <Box style={styles.container}>   
      
      <CssBaseline />
      <Container fluid style={styles.contentContainer}>
       <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <div>
          <Typography  className='tt'>"எங்கள் வாழ்வும் எங்கள் வளமும்
          மங்காத தமிழென்று சங்கே முழங்கு! "
        </Typography>
        <Typography  className='tt' style={{textAlign:"right",fontSize:'20px'}}>- பாரதிதாசன்.</Typography>
        <ButtonContainer />
          </div>
        </Col>
       </Row>
      </Container>
     
    </Box>
    </WrappElement>
  );
};

export default CreateAccount;
