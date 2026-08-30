import React from "react";
import { Row,Container} from "react-bootstrap";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EastIcon from '@mui/icons-material/East';
import { NavLink } from "react-router-dom";

function FreeTrail() {
  return (
    <>
   
    <Container fluid style={{ background: "white", padding: "100px",marginTop:"30px" }}>
      <Row>
        <div style={{ background: "#f3e9dc",  padding:"10px", textAlign: "center"}}>
          <h2>Book your Free Trial</h2>
          <form>
            <Box
              sx={{
                background: "white",
                maxWidth: "100%",
                backgroundColor: "#f3e9dc",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                fullWidth
                label="Email"
                id="fullWidth"
                style={{ backgroundColor: "white", marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                id="phoneInput"
                style={{ backgroundColor: "white", marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                
                
                <Typography><input type="checkbox"/>&nbsp;I agree to this Number</Typography>
              </Box>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <NavLink to='/home'>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#5e3023" }}
                >
                  Get Started <EastIcon />
                </Button>
                </NavLink>
              </Box>
            </Box>
          </form>
        </div>
      </Row>
    </Container>
    </>
    
  );
}

export default FreeTrail;
