import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TodayIcon from "@mui/icons-material/Today";
import image from "./google-icon.svg";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Link } from "react-router-dom";
const PasswordInput = ({
  label,
  id,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => (
  <Grid item xs={6}>
    <Typography style={{ color: "#5e3023" }}>
      {label} <LockIcon style={{ color: "#5e3023" }} />
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
      />
    </FormControl>
  </Grid>
);

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  signInButton: {
    width: "100%", 
    height: "40px",
    backgroundColor: "#5e3023",
    color: "#fff",
    marginTop: "10px",
  },
  googleButton: {
    width: "100% !important", 
    height: "40px",
    backgroundColor: "#fff",
    color: "#5e3023",
    marginTop: "10px", 
  },
  hr: {
    margin: "20px 0", 
    borderTop: "1px solid black",
  },
};

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("male"); // Default value
  const [qualification, setQualification] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };



  return (
    <Grid container component="main" style={{ height: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={5}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "16px", color: "#5e3023" }}
          >
            Signup
          </Typography>
          <form style={{ width: "100%", marginTop: "8px", padding: "10px" }}>
            <Typography style={{ color: "#5e3023" }}>
              Full Name <Person2Icon style={{ color: "#5e3023" }} />
            </Typography>
            <TextField
              fullWidth
              id="fullName"
              size="small"
              style={{ marginBottom: "8px" }}
            />
            <Typography style={{ color: "#5e3023" }}>
              Email <EmailIcon style={{ color: "#5e3023" }} />
            </Typography>
            <TextField
              fullWidth
              id="email"
              size="small"
              style={{ marginBottom: "8px" }}
              placeholder="Enter with Email"
            />

            <Grid container spacing={2}>
              <PasswordInput
                label="Password"
                id="outlined-adornment-password"
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              />
              <PasswordInput
                label="Confirm Password"
                id="outlined-adornment-confirm-password"
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              />
            </Grid>

            <Typography style={{ color: "#5e3023" }}>
              Mobile Number <PhoneIphoneIcon style={{ color: "#5e3023" }} />
            </Typography>
            <TextField
              fullWidth
              id="mobileNumber"
              size="small"
              style={{ marginBottom: "8px" }}
            />

            <Typography style={{ color: "#5e3023" }}>
              Date of Birth <TodayIcon style={{ color: "#5e3023" }} />
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="date"
                  label="Date"
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="month"
                  label="Month"
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="year"
                  label="Year"
                  type="number"
                  size="small"
                />
              </Grid>
            </Grid>

            <Typography style={{ color: "#5e3023" }}>
              Gender <PersonSearchIcon style={{ color: "#5e3023" }} />
            </Typography>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              style={{ marginBottom: "16px" }}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                style={{ color: "#5e3023" }}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                style={{ color: "#5e3023" }}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                style={{ color: "#5e3023" }}
              />
            </RadioGroup>

            {/* Qualification */}
            <Typography style={{ color: "#5e3023" }}>
              Qualification <AutoStoriesIcon />
            </Typography>
            <Select
              fullWidth
              id="qualification"
              value={qualification}
              onChange={handleQualificationChange}
              placeholder=" Choose Your Qualification"
              style={{ marginBottom: "8px", maxHeight: "40px" }}
            >
              <MenuItem value="">Choose Your Qualification</MenuItem>
              <MenuItem value="highSchool">High School</MenuItem>
              <MenuItem value="bachelors">Bachelors</MenuItem>
              <MenuItem value="masters">Masters</MenuItem>
              {/* Add more qualification options as needed */}
            </Select>

            {/* Signup and Signin buttons with styles */}
            <div style={styles.buttonContainer}>
              <Button variant="contained" style={styles.signInButton}>
                Sign up
              </Button>
            </div>
          </form>
          <Typography>Have an Account ?  Signin</Typography>
          <hr sx={styles.hr} /> or <hr sx={styles.hr} />
          <div style={styles.buttonContainer}>
            <Button variant="contained" style={styles.googleButton}>
              <ListItemIcon>
                <img
                  src={image}
                  alt="Google Icon"
                  style={{ width: "20px", marginRight: "8px" }}
                />
              </ListItemIcon>
              Continue with Google
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} style={{ background: "#fefbe9" }}>
        {/* Your image goes here */}
        <img
          src={image}
          alt="Your Image"
          style={{
            width: "100%",
            height: "100%",
        
            padding: "10px",
          }}
        />
      </Grid>
    </Grid>
  );
};
export default LoginPage;
