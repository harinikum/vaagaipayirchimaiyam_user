import React, { useState, useRef, useEffect } from "react";
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
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "../../asserts/13955560_5381413.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
// import GoogleButton from 'react-google-button'
import { auth } from "../../FirebaseConfig";
import { UserContext } from "../../Context";
import { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TaskIcon from "@mui/icons-material/Task";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  signInButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "#5e3023",
    color: "#fff",
    marginTop: "10px",
    textDecoration: "none",
  },
  googleButton: {
    width: "96%",
    height: "40px",
    backgroundColor: "#fff",
    color: "#5e3023",
    marginTop: "10px",
  },
};

const Signup = () => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [gender, setGender] = useState(""); // Default value
  const [qualification, setQualification] = useState("");
  const [pass, setPass] = useState("");
  const [conpass, setconpass] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [number, setnumber] = useState("");
  const [date, setdate] = useState("");
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [pstm, setpstm] = useState("");
  const [community, setCommunity] = useState("");
  const [otpbox, setOtpbox] = useState(false);
  const [district, setDistrict] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConPassword = () => setShowConPassword((show) => !show);
  const { Endpoint } = useContext(UserContext);
  // const [profile,setprofile]=useContext(UserContext);
  const [course, setCourse] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoMode, setPhotoMode] = useState("upload");
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 300 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      streamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera access denied or not available");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 300;
      canvas.height = videoRef.current.videoHeight || 300;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setPhoto(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const nameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;

    if (regex.test(value)) {
      setname(value);
    }
  };
 const emailChange = (e) => {
   const value = e.target.value;
   setemail(value);

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(value)) {
     setEmailError("Enter a valid email address.");
   } else {
     setEmailError("");
   }
 };


  const handleOtpsend = async () => {
    try {
      const response = await axiosInstance
        .post(`post/U_insertOtp.php`, {
          number: number,
        })
        .then(function (response) {
          if (response.data.message === "Success") {
            alert("OTP Sent.");
          } else {
            alert("Number is Invalid");
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
  const handleCheckOtp = async () => {
    try {
      const response = await axiosInstance.post(`put/U_checkOtp.php`, {
        number: number,
        otp: otp,
      });
      if (response.data.status === "success") {
        alert("OTP verified successfully");
      } else {
        alert("Otp is Invalid");
      }

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error check email or password:", error);
    }
  };
  const numberChange = (e) => {
    const value = e.target.value;

    // Regular expression to allow only digits
    const regex = /^[0-9\b]+$/;

    // Check if the input is a number and the length is 10 or less
    if (regex.test(value) && value.length <= 10) {
      setnumber(value);
      setOtpbox(true);
    }
  };
  const dateChange = (e) => {
    setdate(e.target.value);
  };
  const monthChange = (e) => {
    setmonth(e.target.value);
  };
  const yearChange = (e) => {
    setyear(e.target.value);
  };
  const handleChange = (event) => {
    setPass(event.target.value);
  };
  const handleChangeConpass = (event) => {
    setconpass(event.target.value);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConPassword = (event) => {
    event.preventDefault();
  };

  const handlePstmChange = (event) => {
    setpstm(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };
  const handleCommunityChange = (event) => {
    setCommunity(event.target.value);
  };
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 1960;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );

  const handleClickOpen = async () => {
    try {
      // Validate if OTP and number are provided
      if (!otp || !number) {
        alert("OTP and Mobile Number cannot be empty");
        return;
      }

      // Validate password and confirm password length
      if (pass.length >= 6 && conpass.length >= 6) {
        // Check if passwords match
        if (pass === conpass) {
          const response = await axiosInstance.post(
            `post/U_InsertStudent.php`,
            {
              username: name,
              email: email,
              password: pass,
              mobileno: number,
              dob: [year, month, date],
              gender: gender,
              qualification: qualification,
              pstm: pstm,
              course: course,
              district: district,
              profile_image: photo,
            }
          );
          // echo json_encode(["username"=>$username, "email"=>$email, "mobileno"=>$mobileno, "gender"=>$gender, "qualification"=>$qualification, "password"=>$password, "dob"=>$dob, "plan_category"=>$plan_category, "currentDateTime"=>$currentDateTime, "currentDate"=>$currentDate, "pstm"=>$pstm,"status"=>$status,"course"=>$course ,"district"=>$district]);
          // Navigate to sign-in page on success
          Navigate("/signin");
        } else {
          alert("Passwords do not match");
        }
      } else {
        // Show password validation error
        document.getElementById("pass").innerHTML =
          "Password and Confirm Password must be at least 6 characters long";
        document.getElementById("pass").style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Enter Valid Credentials");
    }
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;

      localStorage.setItem("username", signedInUser.displayName);
      const username = localStorage.getItem("username");
      localStorage.setItem("userMail", signedInUser.email);
      localStorage.setItem("profile", signedInUser.photoURL);
      const userid = localStorage.getItem("userMail");

      let payload = {
        username: username,
        email: userid,
        mobileno: "",
        gender: "",
        qualification: "",
        password: "",
        dob: "",
        community: "",
        pstm: "",
        district: "",
      };
      try {
        const response = await axiosInstance.post(
          `post/U_InsertStudent.php`,
          payload
        );
        Navigate("/signin");
      } catch (error) {
        console.error("Error:", error);
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  return (
    <Grid container component="main" style={{ height: "50vh" }}>
      <Grid item xs={12} sm={6}>
        <Paper
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
            style={{
              marginBottom: "16px",
              color: "#5e3023",
              marginTop: "30px",
              fontWeight: 600,
            }}
          >
            Signup
          </Typography>
          <form style={{ width: "100%", marginTop: "8px", padding: "10px" }}>
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
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
              onChange={nameChange}
              value={name}
              required
              style={{ marginBottom: "10px" }}
              // helperText="Only letters are allowed."
              error={!/^[A-Za-z\s]*$/.test(name)}
            />
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              Email{" "}
              <EmailIcon
                style={{
                  color: "#5e3023",
                  fontSize: "16px",
                  marginTop: "-2px",
                }}
              />
            </Typography>
            <TextField
              fullWidth
              id="email"
              size="small"
              style={{ marginBottom: "10px" }}
              placeholder="Enter with Email"
              onChange={emailChange}
              required
              value={email}
              helperText={emailError}
              error={!!emailError}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography style={{ color: "#5e3023", fontWeight: 600 }}>
                  Password{" "}
                  <LockIcon
                    style={{
                      color: "#5e3023",
                      fontSize: "14px",
                      marginTop: "-3px",
                    }}
                  />
                </Typography>
                <FormControl
                  sx={{ width: "100%", marginBottom: "8px" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={pass}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label={`toggle ${label.toLowerCase()} password visibility`}
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
                  <p id="pass"></p>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography style={{ color: "#5e3023", fontWeight: 600 }}>
                  Confirm Password{" "}
                  <LockIcon
                    style={{
                      color: "#5e3023",
                      fontSize: "14px",
                      marginTop: "-3px",
                    }}
                  />
                </Typography>
                <FormControl
                  sx={{ width: "100%", marginBottom: "8px" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConPassword ? "text" : "password"}
                    onChange={handleChangeConpass}
                    value={conpass}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label={`toggle ${label.toLowerCase()} password visibility`}
                          onClick={handleClickShowConPassword}
                          onMouseDown={handleMouseDownConPassword}
                          edge="end"
                        >
                          {showConPassword ? (
                            <VisibilityOff style={{ color: "#5e3023" }} />
                          ) : (
                            <Visibility style={{ color: "#5e3023" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <p id="conpass"></p>
                </FormControl>
              </Grid>
            </Grid>

            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
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
              onChange={numberChange}
              value={number}
              required
              style={{ marginBottom: "10px" }}
              helperText={
                number.length !== 10
                  ? "Enter a valid 10-digit mobile number."
                  : ""
              }
              error={number.length !== 10 && number.length > 0}
            />
            {otpbox && (
              <>
                <MuiOtpInput
                  length={4}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  style={{
                    width: "250px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleOtpsend}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#5e3023",
                  }}
                >
                  Send OTP
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  onClick={handleCheckOtp}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#5e3023",
                  }}
                >
                  Verify OTP
                </Button>
              </>
            )}

            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
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
                  <InputLabel id="demo-simple-select-label" size="small">
                    Date
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="Date"
                    size="small"
                    onChange={dateChange}
                  >
                    {Array.from({ length: 31 }, (_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Month
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Month"
                    size="small"
                    onChange={monthChange}
                  >
                    {months.map((monthName, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {monthName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Year
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Year"
                    size="small"
                    onChange={yearChange}
                  >
                    {years.map((yearValue) => (
                      <MenuItem key={yearValue} value={yearValue}>
                        {yearValue}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography
              style={{ color: "#5e3023", marginTop: "10px", fontWeight: 600 }}
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

            <Typography
              style={{ color: "#5e3023", marginTop: "10px", fontWeight: 600 }}
            >
              PSTM(தமிழ் வழி சான்றிதழ்){" "}
              <InsertDriveFileIcon
                style={{
                  color: "#5e3023",
                  fontSize: "18px",
                  marginTop: "-4px",
                }}
              />
            </Typography>
            <RadioGroup
              row
              aria-label="PSTM"
              name="PSTM"
              value={pstm}
              onChange={handlePstmChange}
              style={{ marginBottom: "16px" }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
                style={{ color: "#5e3023" }}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No"
                style={{ color: "#5e3023" }}
              />
            </RadioGroup>

            {/* Qualification */}
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              Qualification{" "}
              <AutoStoriesIcon
                style={{
                  fontSize: "16px",
                  marginTop: "-4px",
                  marginLeft: "5px",
                }}
              />
            </Typography>
            <TextField
              fullWidth
              id="qualification"
              value={qualification}
              onChange={handleQualificationChange}
              placeholder="Qualification"
              size="small"
              required
              style={{ marginBottom: "10px" }}
            />
            {/* <Select
              fullWidth
              id="qualification"
              value={qualification}
              onChange={handleQualificationChange}
              placeholder=" Choose Your Qualification"
              style={{ marginBottom: "8px", maxHeight: "40px" }}
            >
              <MenuItem value="">Choose Your Qualification</MenuItem>
              <MenuItem value="B.Ed">B.Ed  </MenuItem>
              <MenuItem value="M.Ed ">M.Ed  </MenuItem>
              <MenuItem value="Others">Others</MenuItem>
             
            </Select> */}

            {/* <Typography style={{ color: "#5e3023",marginBottom:"10px",fontWeight:600 }}>
            Community <TaskIcon style={{fontSize:"16px",marginTop:"-4px",marginLeft:'5px'}}/>
            </Typography>
            <Select
              fullWidth
              id="community"
              value={community}
              onChange={handleCommunityChange}
              placeholder=" Choose Your community"
              style={{ marginBottom: "8px", maxHeight: "40px" }}
            >
              <MenuItem value="">Choose Your Community</MenuItem>
              <MenuItem value="OC ">OC  </MenuItem>
              <MenuItem value="BC ">BC  </MenuItem>
              <MenuItem value="BCM">BCM</MenuItem>
              <MenuItem value="MBC/DNC ">MBC/DNC  </MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="SCA">SCA</MenuItem>
              <MenuItem value="ST">ST</MenuItem>
              
            </Select> */}

            {/* Signup and Signin buttons with styles */}
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              Preferred Course
            </Typography>
            <Select
              fullWidth
              id="course"
              value={course}
              onChange={handleCourseChange}
              placeholder=" Choose Your Course"
              style={{ marginBottom: "8px", maxHeight: "40px" }}
            >
              <MenuItem value="">Choose Your Course</MenuItem>
              <MenuItem value="PG-TRB Tamil">PG-TRB Tamil </MenuItem>
              <MenuItem value="UG-TRB Tamil">UG-TRB Tamil </MenuItem>
              <MenuItem value="TNSET/UGCET">PG-TRB TEST BATCH</MenuItem>
              <MenuItem value="TNTET">TNTET</MenuItem>
              <MenuItem value="கட்டாயத் தமிழ் தகுதி தேர்வு">
                கட்டாயத் தமிழ் தகுதி தேர்வு
              </MenuItem>
            </Select>
            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              Preferred District
            </Typography>
            <Select
              fullWidth
              id="district"
              value={district}
              onChange={handleDistrictChange}
              placeholder="Choose Your District"
              style={{ marginBottom: "8px", maxHeight: "40px" }}
            >
              <MenuItem value="">Choose Your District</MenuItem>
              <MenuItem value="Ariyalur">Ariyalur</MenuItem>
              <MenuItem value="Chengalpattu">Chengalpattu</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Coimbatore">Coimbatore</MenuItem>
              <MenuItem value="Cuddalore">Cuddalore</MenuItem>
              <MenuItem value="Dharmapuri">Dharmapuri</MenuItem>
              <MenuItem value="Dindigul">Dindigul</MenuItem>
              <MenuItem value="Erode">Erode</MenuItem>
              <MenuItem value="Kallakurichi">Kallakurichi</MenuItem>
              <MenuItem value="Kancheepuram">Kancheepuram</MenuItem>
              <MenuItem value="Karur">Karur</MenuItem>
              <MenuItem value="Krishnagiri">Krishnagiri</MenuItem>
              <MenuItem value="Madurai">Madurai</MenuItem>
              <MenuItem value="Mayiladuthurai">Mayiladuthurai</MenuItem>
              <MenuItem value="Nagapattinam">Nagapattinam</MenuItem>
              <MenuItem value="Namakkal">Namakkal</MenuItem>
              <MenuItem value="Nilgiris">Nilgiris</MenuItem>
              <MenuItem value="Perambalur">Perambalur</MenuItem>
              <MenuItem value="Pudukkottai">Pudukkottai</MenuItem>
              <MenuItem value="Ramanathapuram">Ramanathapuram</MenuItem>
              <MenuItem value="Ranipet">Ranipet</MenuItem>
              <MenuItem value="Salem">Salem</MenuItem>
              <MenuItem value="Sivaganga">Sivaganga</MenuItem>
              <MenuItem value="Tenkasi">Tenkasi</MenuItem>
              <MenuItem value="Thanjavur">Thanjavur</MenuItem>
              <MenuItem value="Theni">Theni</MenuItem>
              <MenuItem value="Thoothukudi">Thoothukudi</MenuItem>
              <MenuItem value="Tiruchirappalli">Tiruchirappalli</MenuItem>
              <MenuItem value="Tirunelveli">Tirunelveli</MenuItem>
              <MenuItem value="Tirupathur">Tirupathur</MenuItem>
              <MenuItem value="Tiruppur">Tiruppur</MenuItem>
              <MenuItem value="Tiruvallur">Tiruvallur</MenuItem>
              <MenuItem value="Tiruvannamalai">Tiruvannamalai</MenuItem>
              <MenuItem value="Tiruvarur">Tiruvarur</MenuItem>
              <MenuItem value="Vellore">Vellore</MenuItem>
              <MenuItem value="Viluppuram">Viluppuram</MenuItem>
              <MenuItem value="Virudhunagar">Virudhunagar</MenuItem>
            </Select>

            <Typography
              style={{
                color: "#5e3023",
                marginBottom: "10px",
                marginTop: "15px",
                fontWeight: 600,
              }}
            >
              Profile Photo{" "}
              <PhotoCameraIcon
                style={{
                  color: "#5e3023",
                  fontSize: "19px",
                  marginTop: "-4px",
                }}
              />
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: "15px" }}>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    border: "2px dashed #5e3023",
                    borderRadius: "8px",
                    backgroundColor: "#fcf9f8"
                  }}
                >
                  {photo ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <img
                        src={photo}
                        alt="Profile Preview"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid #5e3023",
                          marginBottom: "10px"
                        }}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          setPhoto(null);
                          stopCamera();
                        }}
                      >
                        Remove Photo
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
                        <Button
                          variant={photoMode === "upload" ? "contained" : "outlined"}
                          size="small"
                          onClick={() => {
                            setPhotoMode("upload");
                            stopCamera();
                          }}
                          style={{
                            backgroundColor: photoMode === "upload" ? "#5e3023" : "transparent",
                            color: photoMode === "upload" ? "#fff" : "#5e3023",
                            borderColor: "#5e3023"
                          }}
                        >
                          Upload Photo
                        </Button>
                        <Button
                          variant={photoMode === "capture" ? "contained" : "outlined"}
                          size="small"
                          onClick={() => {
                            setPhotoMode("capture");
                            startCamera();
                          }}
                          style={{
                            backgroundColor: photoMode === "capture" ? "#5e3023" : "transparent",
                            color: photoMode === "capture" ? "#fff" : "#5e3023",
                            borderColor: "#5e3023"
                          }}
                        >
                          Take Photo
                        </Button>
                      </div>

                      {photoMode === "upload" ? (
                        <div>
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="photo-upload-input"
                            type="file"
                            onChange={handleFileUpload}
                          />
                          <label htmlFor="photo-upload-input">
                            <Button
                              variant="outlined"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                              style={{ color: "#5e3023", borderColor: "#5e3023" }}
                            >
                              Choose Image
                            </Button>
                          </label>
                          <Typography variant="caption" display="block" style={{ marginTop: "8px", color: "#666" }}>
                            Supports JPG, PNG or WEBP
                          </Typography>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div
                            style={{
                              width: "200px",
                              height: "150px",
                              backgroundColor: "#000",
                              borderRadius: "8px",
                              overflow: "hidden",
                              position: "relative",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <video
                              ref={videoRef}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: cameraActive ? "block" : "none"
                              }}
                              playsInline
                              muted
                            />
                            {!cameraActive && (
                              <Typography style={{ color: "#fff", fontSize: "12px" }}>
                                Camera starting...
                              </Typography>
                            )}
                          </div>
                          {cameraActive && (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={capturePhoto}
                              startIcon={<PhotoCameraIcon />}
                              style={{ backgroundColor: "#5e3023" }}
                            >
                              Capture
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Paper>
              </Grid>
            </Grid>

            <div style={styles.buttonContainer}>
              <Button
                variant="contained"
                style={styles.signInButton}
                onClick={handleClickOpen}
              >
                Sign up
              </Button>
            </div>
          </form>
          <Typography>
            Have an Account ?{" "}
            <NavLink to="/signin" style={{ color: "#5e3023" }}>
              {" "}
              Signin
            </NavLink>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: "40px" }}>
        {/* Your image goes here */}
        <img
          src={Image}
          alt="Your Image"
          style={{
            width: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
};
export default Signup;
