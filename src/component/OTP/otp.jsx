import React from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField, 
  Button, 
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Image from '../../asserts/signup.png'
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context";
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../Api/instance";
import { useState } from "react";
// import { MuiOtpInput } from "mui-one-time-password-input";

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width:"100%"
  },
  signInButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "#5e3023",
    color: "#fff",
    marginTop: "10px",
  },
  Btn:{
    backgroundColor:"white",
    color:"black",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    border:"1px solid #5e3023"
  },
  submitInButton: {
    width: "180px",
    height: "40px",
    backgroundColor: "#5e3023",
    color: "#fff",
    marginTop: "30px",
    marginLeft:"4%"
   
  },
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    justifyContent:"center"
  }
};

const SigninPage = () => {
  const {Endpoint}=useContext(UserContext);  
  const [otp, setOtp] = React.useState('');
  const [email,setemail]=useState("");
  const Navigate=useNavigate();
  const handleChange = (newValue) => {
    setOtp(newValue)
  } 

 localStorage.setItem("forget",email) ;

  const handleClickOpen = async () => {
    try {
      const response = await axiosInstance.post(
        `put/U_updateOTP.php`,
        {
          email: email,
        }
      ).then(function (response) {
        if (response.data.message === "success") {
            alert("OTP Sent.");
          }  else {
            alert("EmailId is Invalid");
          }
      })
      .catch(function (error) {
        alert("Enter Valid Credentials");
        
        
      });
      
      console.log("Success:", response.data);
     
    } catch (error) {
      console.error("Error check email or password:", error);
    }
  };

  const handleOTP = async () => {
    try {
      const response = await axiosInstance.post(
        `post/U_ValidateOtp_Token.php`,
        {
          email: email,
          otp:otp
        }
      );
      
      console.log("Success:", response.data);
      if (response.data.message === "Success") {
        if (response.data.message === "timeout") {
          Navigate('/signin'); 
      }
        Navigate("/forget");
      
       
      } else {
        alert("Invalid Otp");
        console.error("Error in response:", response.data);
      }
     
    } catch (error) {
      console.error("Error check email or password:", error);
    }
  };

  return (
    <Grid container component="main" style={{ height: "100vh",overflow:"hidden",}}>
      <Grid item xs={12} sm={6}>
       
          
          <form style={{ width: "100%", marginTop: "100px", padding: "10px" }}>
           
            <Typography style={{ color: "#5e3023",fontWeight:600,paddingBottom:"10px" }}>
              Email <EmailIcon style={{ color: "#5e3023",fontSize:"14px",marginTop:"-2px" }} />
            </Typography>
            <TextField variant="outlined" fullWidth
              id="email"
              style={{ marginBottom: "10px" }} placeholder="Enter Your Email"
              value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              />
           
            <div style={styles.buttonContainer}>
              <Button variant="contained" style={styles.signInButton} onClick={handleClickOpen}>
                GET OTP
              </Button>
            </div>
            
           <div  style={styles.centerContainer}>
           <MuiOtpInput value={otp} onChange={handleChange} style={{width:"250px",marginTop:"50px",display:"flex",justifyContent:"center"}} />
            <Button variant="contained" style={styles.submitInButton} onClick={handleOTP}>
                Submit
              </Button>
           </div>
          </form>
         
       
      </Grid>
      <Grid item xs={12} sm={6} style={{ background: "#fefbe9" }}>
        <img
          src={Image}
          alt="Your Image"
          style={{
            width: "100%",
            height: "80%",
            objectFit: "cover",
            padding: "10px",
            
          }}
        />
      </Grid>
    </Grid>
  );
};
export default SigninPage;
