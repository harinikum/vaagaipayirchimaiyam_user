import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileImg from "../../asserts/Component 278 – 1.png";
import { Button, IconButton, Typography } from "@mui/material";
import Footer from "../footer";
import "./style.css";
import CircleBar from "../Common/circleBar";
import Logout from "../../asserts/icons.png";
import close from "../../asserts/close_FILL0_wght400_GRAD0_opsz24 (1).png";

import Email from "../../asserts/email.png";
import phone from "../../asserts/352510_local_phone_icon.png";
import graduate from "../../asserts/Layer 2.png";
import gender from "../../asserts/8673492_ic_fluent_person_available_filled_icon.png";
import { Style } from "../../YearTestPaper/style";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import Editprofile from '../Pages/Editprofile'
import { useState,useEffect,useContext } from "react";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Table from 'react-bootstrap/Table';
import Score from '../../asserts/score.png'

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [del,setDel]=useState(false);
  const [subjectData,setsubjectdata]=useState([]);
  const [nonnursingData,setnonnursingdata]=useState([]);
  const {Endpoint}=useContext(UserContext);
  const email=localStorage.getItem("userMail");
  const profile=localStorage.getItem("profile");
  const navigate=useNavigate();
    useEffect(() => {
      fetchData();
      subject();
      nonnursing();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ViewProfile.php`,
          {
            email:email
          }
        );
        if (response.status === 200) {
          if (response.data.message === "timeout") {
            navigate('/signin'); 
          } 
            setData(response.data);
         
        }
        
        
      } catch (error) {
       
        console.error("Error fetching data:", error);
      }
    };
    const subject = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ScoreProfile_sw_demo.php`,
          {
            userId:email
          }
        );
        if (response.status === 200) {
          if (response.data.message === "timeout") {
            navigate('/signin'); 
          }
            setsubjectdata(response.data);
            console.log(subjectData);
          
        }
        
       
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const nonnursing = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ScoreProfile_SW.php`,
          {
            userId:email
          }
        );
        if (response.status === 200) {
          if (response.data.message === "timeout") {
            navigate('/signin'); 
          } 
            setnonnursingdata(response.data);
            console.log(nonnursingData);
      
        
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpendel = () => {
    setDel(true);
  };

  const handledelclose=()=>{
    setDel(false);
    navigate("/signup");
  }

  const handledclose=()=>{
    setDel(false);
  }

  const handleLClose=()=>{
    setOpen(false);
  }

  const handleClose =  (value) => {
    try{
       localStorage.removeItem("userMail");
       localStorage.removeItem("token");
       localStorage.removeItem("username");
       localStorage.removeItem("profile");
       auth.signOut();
      setOpen(false);
      navigate("/signin");

    }
    catch{

    }   
  };
  const [opens, setOpens] = React.useState(false);
  const handleOpens = () => setOpens(true);
  const handleClosed = () => setOpens(false);
  const MainContainer = {
    backgroundColor: "#f3e9dc",
    height: "40vh",
    padding:"10px"
  };
  const CardDesign = {
    width: "200px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    textAlign: "center",
    margin: "20px",
  };
  const CardDesign1 = {
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    textAlign: "center",
    margin: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "20px",
  };

  const Div = {
    minWidth: "400px",
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
    padding: "10px",
  };
  const Btn = {
    backgroundColor: "red",
    color: "white",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    
   
  };
  const buttonStyle = {
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  // Define a variable to conditionally apply background image
  const withBackground = {
    backgroundImage: "url('../../asserts/Component 278 – 1.png)", // Adjust the path to your background image
    backgroundSize: "cover", // Adjust background image size
    backgroundPosition: "center", // Adjust background image position
  };

 
  return (
    <Style>
      {
        Array.isArray(data) && data.length > 0 ? (
        data.map((val)=>(
          <div>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle
            style={{ width: "350px", height: "100px", textAlign: "center" }}
          >
           
            <Button onClick={handleLClose} style={{ width: 1 }}>
              <img
                src={close}
                height="10px"
                style={{ display: "flex", marginLeft: 230 }}
              />
            </Button>
            <hr style={{ width: "100%" }} />
            <Typography>Are you sure want to logout ?</Typography>
            
          </DialogTitle>
          <DialogTitle>
           
              <Button onClick={handleClose} fullWidth style={Btn}>
                yes
              </Button>
           
          </DialogTitle>
        </Dialog>

        <Dialog onClose={handledelclose} open={del}>
        <img
                src={close}
                height="10px"
                width="10px"
                style={{ display: "flex",marginLeft:"380px",marginTop:"10px"}}
                onClick={handledclose} 
              />
        <AccountCircleIcon style={{fontSize:"60px",display:"flex",justifyContent:"center",width:"400px"}}/>
          
          <DialogTitle>
            <hr style={{ width: "100%" }} />
            <Typography style={{padding:"10px",textAlign:"center"}}>Are you sure want to Delete Account?</Typography>
              <Button onClick={handledelclose} fullWidth style={Btn}>
                yes
              </Button>
           
          </DialogTitle>
        </Dialog>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f3e9dc",
            width: "100%",
            padding:"10px"
          }}
        >
          {/* <Button > */}
            <img src={Logout} height="20px" onClick={handleClickOpen}/>
            {"    "}
            
          {/* </Button> */}
          <DeleteOutlineIcon onClick={handleClickOpendel}/>
        </div>
        <Container fluid style={MainContainer}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8} xl={8} style={{display:"flex"}}>
              <div >
                <Button
                  onClick={handleOpens}
                  style={Object.assign({}, buttonStyle, withBackground)}
                >
                  <img
      src={profile ? profile : ProfileImg}
      alt="Profile"
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%', 
      }}
    />
                </Button>
                <Modal
                  keepMounted
                  open={opens}
                  onClose={handleClosed}
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                 
                  <Editprofile/>
                  
                </Modal>
                <div>
                
              </div>
              </div>
              
              <div style={{padding:"20px"}}>
              <Typography variant="h4" >
                  {val.username}
                </Typography>
              <div >

                  <Typography >
                    <img src={Email} height="10px" />
                    {"   "}
                    {val.email}
                  </Typography>
                  <Typography
                    style={{paddingTop:"5px"}}
                  >
                    <img src={phone} height="15px" />
                    {"   "}
                   {val.mobileno}
                  </Typography>
                </div>
                <div style={{display:"flex",paddingTop:"10px"}}>
                  
                  <Typography
                    
                  >
                    <img src={graduate} height="10px" />
                    {"   "}
                   {val.qualification}
                  </Typography>&nbsp;&nbsp;
                  <Typography
                    
                  >
                    <img src={gender} height="10px" />
                    {"  "}
                   {val.gender}
                  </Typography>
                </div>
               
                
              </div>
              
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="responsive-margin"
  style={{
    
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
  }}
>
    <img src={Score} height="100px" style={{ position: "relative" }} />
    <h3 style={{
      position: "absolute",
      color: "red", // Adjust color for better visibility
      padding: "5px 10px", 
      borderRadius: "5px",
      textAlign: "center",
      zIndex:1,
      fontWeight:"bold",
    }}>
      {nonnursingData || 0}
    </h3>
  </div>
</Col>

          </Row>
        </Container>
        <Container className="mt-3 mb-3">
          <Row>
            <h4>Score Board</h4>
            <Col xs={12}>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sno</th>
          <th>Student Name</th>
          <th>Papers Count</th>
          <th>Question Count</th>
          <th>Score</th>
          
        </tr>
      </thead>
      <tbody>
        {subjectData && subjectData.length > 0 ? (
          subjectData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Sno: Incremental index */}
              <td>{item.student_name}</td> {/* Student Name */}
              <td>{item.total_papers_count}</td> {/* Papers Count */}
              <td>{item.total_answers_count}</td> {/* Papers Count */}
              <td>{item.total_correct_count}</td> {/* Score */}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center' }}>
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
        ))):(
          <Typography>No datas</Typography>
        )
      }
    </Style>
  );
}
