import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Button,
  ListItemIcon
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from '../../asserts/20602955_6333858.png';
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import Image1 from "./google-icon.svg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth} from "../../FirebaseConfig";

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  signInButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "#5e3023",
    color: "#fff",
    marginTop: "10px",
  },
  googleButton: {
    width: "96%", 
    height: "40px",
    backgroundColor: "#fff",
    color: "#5e3023",
    marginTop: "10px", 
  },
};

const SigninPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const { setToken } = useContext(UserContext);
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(()=>{
    localStorage.clear();
  },[])
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    localStorage.clear();
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
      
      // localStorage.setItem("phone", signedInUser.phoneNumber);
      localStorage.setItem("username", signedInUser.displayName);
      localStorage.setItem("userMail", signedInUser.email);
      localStorage.setItem("profile", signedInUser.photoURL);

      console.log("Google Sign-In Successful", signedInUser.email);

      const payload = { email: signedInUser.email };
      const response = await axiosInstance.put(`put/U_googlelogin.php`, payload);
      
      if (response.data.message === "success") {
        if (response.data.message === "timeout") {
          Navigate('/signin'); 
      }
        const token = response.data.token;
        localStorage.setItem("token", token);
        const category = response.data.plan_category;
        localStorage.setItem("category",category);
        const expiryDate = new Date(response.data.plan_expiry_date);
        const currentDate = new Date();

        if (currentDate > expiryDate) {
          alert('Your premium plan has expired. Please purchase a new plan.');
          Navigate("/home");
        } else {
          Navigate("/home");
        }
     
        
      } else if (response.data.error === "you are blocked..so contact your admin") {
        alert("You are blocked. Please contact your admin.");
      } 
      
    } catch (error) {
      console.error("Google Sign-In Error", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    localStorage.clear();
    try {
      if (password.length >= 6 || password.length === 0) {
        const response = await axiosInstance.post( 
          `put/U_login.php`,
          {
            email: email,
            password: password,
          }
        );
  
        if (response.data.message === "success") {
          if (response.data.message === "timeout") {
            Navigate('/signin'); 
        }
        // console.log(response.data.data.plan_category);
        
          // const token = response.data.token;
          const category = response.data.data.plan_category;
          const ug = response.data.data.UG;
          const pg = response.data.data.PG;
          const tnset = response.data.data.TNSET;
          const tntet = response.data.data.TNTET;
          const kt = response.data.data.KT;
          localStorage.setItem("category", category);
          localStorage.setItem("UG", ug);
          localStorage.setItem("PG", pg);
          localStorage.setItem("TNSET",tnset);
          localStorage.setItem("TNTET",tntet);
          localStorage.setItem("KT",kt);
          // localStorage.setItem("token", token);
          localStorage.setItem("userMail",email);
          const expiryDate = new Date(response.data.plan_expiry_date);
          const currentDate = new Date();
  
          if (currentDate > expiryDate) {
            alert('Your premium plan has expired. Please purchase a new plan.');
            Navigate("/home");
          } else {
            Navigate("/home");
          }
       
          
        } else if (response.data.message === "You are blocked. Please contact your admin.") {
          alert("You are blocked. Please contact your admin.");
        } else {
          alert("Username or Password is Invalid");
        }
      } else {
        alert("Password must be at least 6 characters long");
      }
    } catch (error) {
      console.error("Login Error", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Grid container component="main" style={{ overflow: "hidden" }}>
      <Grid item xs={12} sm={6} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            // height: "665px"
          }}>
        
          <Typography
            component="h1"
            variant="h5"
            style={{
              marginBottom: "15px",
              color: "#5e3023",
              marginTop: "10px",
              fontWeight: 600
            }}
          >
            Sign in
          </Typography>
          <form style={{ width: "100%", marginTop: "8px", padding: "10px" }}>
            <Typography style={{ color: "#5e3023", marginBottom: "10px", fontWeight: 600 }}>
              Email <EmailIcon style={{ color: "#5e3023", fontSize: "16px", marginTop: "-2px" }} />
            </Typography>
            <TextField
              fullWidth
              id="email"
              style={{ marginBottom: "10px" }}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <Grid item xs={12}>
              <Typography style={{ color: "#5e3023", fontWeight: 600 }}>
                Password <LockIcon style={{ color: "#5e3023", fontSize: "14px", marginTop: "-3px" }} />
              </Typography>
              <FormControl sx={{ width: "100%", marginBottom: "8px" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={password}
                  placeholder="password"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
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
                />
              </FormControl>
            </Grid>
            <div style={styles.buttonContainer}>
              <Button variant="contained" style={styles.signInButton} onClick={handleLogin}>
                Sign in
              </Button>
            </div>
          </form>

          <NavLink to="/otp" style={{color: "#5e3023",}} >
            Forgot Password
          </NavLink>
          {/* <div style={styles.buttonContainer}>
            <Button variant="contained" style={styles.googleButton} onClick={signInWithGoogle}>
              <ListItemIcon>
                <img
                  src={Image1}
                  alt="Google Icon"
                  style={{ width: "20px", marginRight: "8px" }}
                />
              </ListItemIcon>
              Continue with Google
            </Button>
          </div> */}
      
      </Grid>
      <Grid item xs={12} sm={6}>
        <img
          src={Image}
          alt="Sign Up"
          style={{
            width: "100%",
            height: "70vh",
            objectFit: "cover",
            padding: "10px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SigninPage;
