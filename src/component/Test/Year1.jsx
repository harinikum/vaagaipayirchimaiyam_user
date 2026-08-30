import { Typography } from "@mui/material";
import React from "react";
import {Container,Row,Col, Button} from 'react-bootstrap'
import Arrow from '../../asserts/system-regular-161-trending-flat.gif'
import { NavLink } from "react-router-dom";
function Year1() {
  const MainContainer={
    marginTop:"65px",
    // padding:"10px",
    paddingTop:"50px",
    // display:"flex",
    
  }
  const Title={
    display:"flex",
    flexDirection:"row",
    backgroundColor:"white",
    width:"100%",
    justifyContent:"space-between",
    padding:"10px",
    // paddingBottom:"10px",
    marginBottom:"-19px",
    borderTopRightRadius:"10px",
    borderTopLeftRadius:"10px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    zIndex:"1",
  }
  const Btn={
    backgroundColor:"white",
    color:"black",
    border:"none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width:"150px",
    fontWeight:600,
    display:"flex",
    justifyContent:"center"
  }
  return (
    <div style={{backgroundColor:"#F2F1EB",padding:"20px"}}>
      <Container fluid style={MainContainer}>
        <Row >
          <Col  >
            <div className="wrap"  style={Title}>
          <div>
            <Typography style={{fontWeight:600}}>Institution Name</Typography>
          </div>
          <div>
          <Typography style={{fontWeight:600}}>100/100</Typography>
          </div>
          </div>
          </Col>
        </Row>
      </Container>
     
      <Container fluid style={{padding:"20px"}}>
      <Row style={{justifyContent:"center"}} >
          <Col xs={12} sm={12} md={12} lg={7} xl={7} style={{backgroundColor:"#f3e9dc",height:"100vh",}}>  
            <div style={{paddingTop:"60px",}}>
              <Typography style={{fontWeight:600}}>1. Lorel ipsum Lorel ipsum lorel ?</Typography>
              <ol type="a" style={{paddingTop:"10px"}}>
                <li>Lorel ipsum</li>
                <li>Lorel ipsum</li>
                <li>Lorel ipsum</li>
                <li>Lorel ipsum</li>
              </ol>
              {/* <div style={{display:"flex",flexDirection:"row",width:"280px"}}>
                <Typography style={{fontWeight:600}}>Answer :</Typography>
                &nbsp;&nbsp;<input type="radio" name="a"/> a&nbsp;&nbsp;
                <input type="radio" name="a"/>b&nbsp;&nbsp;
                <input type="radio" name="a"/>c&nbsp;&nbsp;
                <input type="radio" name="a"/>d

              </div> */}
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{backgroundColor:"#FEFBE9",height:"100vh",}} >
            <div style={{backgroundColor:"white",paddingTop:"60px",width:"auto",marginTop:"30px",padding:"20px"}}>
            <div >
            <Typography style={{fontWeight:600}}>Correct Answer is C :</Typography>
            <Typography style={{fontSize:"15px",paddingTop:"10px"}}>Lorel ipsum Lorel ipsum lorel Lorel ipsum Lorel ipsum lorel </Typography>
              
            </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"70px"}}>
            <NavLink to="/year" style={{textDecoration:"none"}}>
            <Button style={Btn}>Done &nbsp;&nbsp;<img src={Arrow} height="30px"/></Button>
            </NavLink>
            </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Year1;
