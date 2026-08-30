import React, { useState, useContext } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TodayIcon from "@mui/icons-material/Today";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    height: 10,
    marginBottom:"20px"
  },
  signInButton: {
    width: "30%",
    height: "40px",
    backgroundColor: "#E4A45A",
    color: "#fff",
    marginTop: "5px",
    textDecoration: "none",
  },
  signInButton1: {
    width: "30%",
    height: "40px",
    backgroundColor: "#fff",
    color: "black",
    marginTop: "5px",
    textDecoration: "none",
  },
  googleButton: {
    width: "96%",
    height: "20px",
    backgroundColor: "#fff",
    color: "#5e3023",
    marginTop: "10px",
  },
};

const Signup = () => {
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const [gender, setGender] = useState(""); // Default value
  const [qualification, setQualification] = useState("");
  const [name,setname]=useState("");
  const [number,setnumber]=useState("");
  const [date,setdate]=useState("");
  const [month,setmonth]=useState("");
  const [year,setyear]=useState("");
  const {Endpoint}=useContext(UserContext);
  const email=localStorage.getItem("userMail");
  const [opens, setOpens] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const nameChange=(e)=>{
    setname(e.target.value);
  }
  
  const numberChange=(e)=>{
    setnumber(e.target.value);
  }
  const dateChange=(e)=>{
    setdate(e.target.value);
  }
  const monthChange=(e)=>{
    setmonth(e.target.value);
  }
  const yearChange=(e)=>{
    setyear(e.target.value);
  }
 
 
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleClickOpen = async () => {
    try {
      const response = await axiosInstance.post(
        `put/U_updateStudent.php`,
        {
          email:email,
          username: name,
          mobileno:number,
          dob:[year,month,date],
          gender:gender,
          qualification:qualification,
        }
      );
      setname(""); 
      setnumber("");
      setGender("");
      setdate("");
      setmonth("");
      setyear("");
      setQualification("");
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin'); 
        }
          navigate('/home');
      }
      
    } catch (error) {
      console.error("Error check email or password:", error);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 1960;
  
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

  const CancelBtn = () => {
    navigate('/home');
  };

  return (
    <Grid
      container
      component="main"
      style={{ justifyContent: "center", marginTop: 20,padding:10 }}
    >
      <Grid item xs={12} sm={6}>
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            width: "100vh",
            maxHeight: "90vh",
            overflowY: "auto", 
            padding: "16px",
            margin:5
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            style={{
              marginBottom: "16px",
              color: "#5e3023",
              fontWeight: 100,
            }}
          >
            Edit
          </Typography>
          <form style={{ width: "85%", marginTop: "4px", padding: "10px" }}>
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "5px",
                fontWeight: 100,
              }}
            >
              Full Name{" "}
              <Person2Icon
                style={{
                  color: "#5e3023",
                  fontSize: "19px",
                  marginTop: "-4px",
                }}
              />
            </Typography>
            <TextField
              fullWidth
              id="fullName"
              size="small"
              style={{ marginBottom: "5px" }}
              onChange={nameChange}
              value={name}
              required
            />
            
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "5px",
                fontWeight: 100,
              }}
            >
              Mobile Number{" "}
              <PhoneIphoneIcon
                style={{
                  color: "#5e3023",
                  fontSize: "18px",
                  marginTop: "-2px",
                }}
              />
            </Typography>
            <TextField
              fullWidth
              id="mobileNumber"
              size="small"
              style={{ marginBottom: "5px" }}
              onChange={numberChange}
              value={number}
              required
            />

            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "5px",
                fontWeight: 100,
              }}
            >
              Date of Birth{" "}
              <TodayIcon
                style={{
                  color: "#5e3023",
                  fontSize: "16px",
                  marginTop: "-4px",
                }}
              />
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Date</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="Date"
                    size="small"
                    onChange={dateChange}
                  >
                    {Array.from({ length: 31 }, (_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Month"
                    size="small"
                    onChange={monthChange}
                  >
                    {months.map((monthName, index) => (
                      <MenuItem key={index + 1} value={index + 1}>{monthName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Year"
                    size="small"
                    onChange={yearChange}
                  >
                    {years.map((yearValue) => (
                      <MenuItem key={yearValue} value={yearValue}>{yearValue}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography
              style={{ color: "#5e3023", marginTop: "5px", fontWeight: 100 }}
            >
              Gender{" "}
              <PersonSearchIcon
                style={{
                  color: "#5e3023",
                  fontSize: "18px",
                  marginTop: "-4px",
                }}
              />
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
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "5px",
                fontWeight: 100,
              }}
            >
              Qualification{" "}
              <AutoStoriesIcon
                style={{
                  fontSize: "14px",
                  marginTop: "-4px",
                  marginLeft: "5px",
                }}
              />
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="qualification"
              value={qualification}
              onChange={handleQualificationChange}
              style={{ marginBottom: "5px" }}
              required
            />
            {/* <Select
              fullWidth
              id="qualification"
              value={qualification}
              onChange={handleQualificationChange}
              style={{ marginBottom: "16px" }}
            >
              <MenuItem value="">Choose Your Qualification</MenuItem>
              <MenuItem value="B.sc nursing ">B.sc nursing </MenuItem>
              <MenuItem value="M.sc nursing ">M.sc nursing </MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select> */}

            {/* Buttons */}
            <div style={styles.buttonContainer}>
              <Button
                variant="contained"
                style={styles.signInButton}
                onClick={handleClickOpen}
              >
                Save
              </Button>&nbsp;&nbsp;
              <Button
                variant="contained"
                style={styles.signInButton1}
                onClick={CancelBtn}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
