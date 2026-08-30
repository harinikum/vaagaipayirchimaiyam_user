import React, { useEffect, useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./style";
import MyComponent from "../Category";
import AchivementMain from '../Achivements/index';
import Footer from "../footer";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from "../../Context";
import { axiosInstance } from "../Api/instance";
import './style.css'
import ListStackRatio from "../Carousal";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState("");
  const { Endpoint } = useContext(UserContext);
  const email = localStorage.getItem("userMail");
  const expiry_date = localStorage.getItem("expiry_date");
  const Navigate = useNavigate();

  useEffect(() => {
    fetchData();
    checkAdDialog();  // Check if the ad dialog has been shown in this session
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewAds.php`,
        {
          userId: email,
          category: "Home",
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }

        const data = response.data[0].attachment_file;
        setDatas(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkPlanExpiry = () => {
    if (expiry_date) {
      const currentDate = new Date().toISOString().split('T')[0];
      const alertShown = localStorage.getItem("alertShown");

      if (!alertShown && currentDate > expiry_date) {
        alert("Your plan has expired. Please purchase a new plan.");
        localStorage.setItem("alertShown", "true");
      }
    }
  };

  const checkAdDialog = () => {
    // Check if the ad dialog has already been shown in this session
    const adDialogShown = sessionStorage.getItem("adDialogShown");

    if (!adDialogShown) {
      handleClickOpen();  // Show the dialog if not already shown
      sessionStorage.setItem("adDialogShown", "true");  // Mark as shown in this session
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListStackRatio />

      <div id="category">
        <MyComponent />
      </div>
      <div id="ad">
        <AchivementMain />
      </div>
      <div>
        <Footer />
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* Display the fetched advertisement */}
          <img src={`http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/${datas}`} height="500px" />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default Home;
