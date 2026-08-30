import React, { useState,useContext } from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from '../../asserts/signup.png'
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
const PasswordInput = ({
  label,
  id,
  showPassword, 
  handleClickShowPassword,
  handleMouseDownPassword,
  value,
  onChange,
}) => (
  <Grid item xs={12}>
    <Typography style={{ color: "#5e3023",fontWeight:600 }}>
      {label} <LockIcon style={{ color: "#5e3023",fontSize:"14px",marginTop:"-4px" }} />
    </Typography>
    <FormControl sx={{ width: "100%", marginBottom: "8px" }} variant="outlined">
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={`toggle ${label.toLowerCase()} password visibility`}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff style={{ color: "#5e3023" }} />
              ) : (
                <Visibility style={{ color: "#5e3023" }} />
              )}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
      />
    </FormControl>
  </Grid>
);

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width:"100%",
    marginTop:"20px"
  },
  signInButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "#5e3023",
    color: "#fff",
    marginTop: "10px",
  },
  signInWithGoogle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "16px",
  },
  googleButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "white",
    color: "black",
    marginTop: "10px",
  },
  hr: {
    margin: " 0",
    borderTop: "1px solid black",
  },
  Btn:{
    backgroundColor:"white",
    color:"black",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    border:"1px solid #5e3023"
  }
};

const Forget = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [conpass,setconpass]=useState("");
  const [password,setpassword]=useState("");
  const {Endpoint}=useContext(UserContext);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const email=localStorage.getItem("forget");
  console.log(email);
  const Navigate=useNavigate();
 
    const handlePassword = async () => {
      if(password===conpass){
        try {
          const response = await axiosInstance.post(
            `put/U_updatePassword.php`,
            {
              email:email,
              password:password
            }
          );
          if (response.status === 200) {
            if (response.data.message === "timeout") {
              Navigate('/signin'); 
          }
            alert("your password change successfully");
            Navigate('/signin');
           }
        
         
        } catch (error) {
          console.error("Error check email or password:", error);
        }
      }
       else{
        alert("Password and Confirm Password are mismatched");
       }
      }
      
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleMouseDownPassword1 = (event) => {
      event.preventDefault();
    };
   

  return (
    <Grid container component="main" style={{ height: "100vh",
    overflow:"hidden",paddingTop:"30px"}}>
      <Grid item xs={12} sm={6}  style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            height:"610px"
          }}>
      
         
          <form style={{ width: "100%", marginTop: "100px", padding: "10px" }}>
            <Grid container spacing={2}>
              
              <PasswordInput
              fullWidth
                label="Password"
                id="outlined-adornment-password"
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                value={password}
                onChange={(event)=> setpassword(event.target.value)}
              />
              <PasswordInput
              fullWidth
                label="Confirm Password"
                id="outlined-adornment-password"
                showPassword1={showPassword1}
                handleClickShowPassword={handleClickShowPassword1}
                handleMouseDownPassword={handleMouseDownPassword1}
                value={conpass}
                onChange={(event)=>setconpass(event.target.value)}
              />
            </Grid>
            
            
            <div style={styles.buttonContainer}>
              <Button variant="contained" style={styles.signInButton} onClick={handlePassword }>
                Done
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
export default Forget;
