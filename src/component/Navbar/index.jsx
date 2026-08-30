// import React, { useState, useEffect, useContext } from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import { ListItemButton, Badge } from "@mui/material";
// import Hidden from "@mui/material/Hidden";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import Popover from "@mui/material/Popover";
// import { makeStyles } from "@material-ui/core";
// import styles from "./style";
// import Logo from '../../asserts/Artboard 1 copy 4.png';
// import Bell from "../../asserts/bell.png";
// import { Button } from "react-bootstrap";
// import Profile from "../../asserts/human.png";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogActions from "@mui/material/DialogActions";
// import CloseIcon from "@mui/icons-material/Close";
// import Logout from "../../asserts/icons.png";
// import { UserContext } from "../../Context";
// import { axiosInstance } from "../Api/instance";
// import { auth } from "../../FirebaseConfig";
// const useStyles = makeStyles((theme) => ({
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//   },
// }));

// const Btn1 = {
//   backgroundColor: "#5e3023",
//   color: "white",
//   border: "none",
//   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//   fontWeight: 600,
// };
// const link = {
//   color: "black",
//   textDecoration: "none",
// };

// const Navbar = () => {
//   const [handleopen, setHandleopen] = useState(false);
//   const [opens, setOpens] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [newNotificationCount, setNewNotificationCount] = useState(0);
//   const { Endpoint } = useContext(UserContext);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const email=localStorage.getItem("userMail");
//   // useEffect(() => {
//     const fetchData = async () => {
      
//       try {
//         const response = await axiosInstance.post(
//           `get/U_ViewNotification.php`,{
//             userId:email
//           }
//         );
//         const data = response.data || [];
//         console.log(data);
        
//         setNotifications(data);
//         calculateNewNotifications(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setNotifications([]);
//       }
//     };
    
//   // }, [Endpoint]);

//   useEffect(() => {
//     calculateNewNotifications(notifications);
//   }, [notifications]);

//   const calculateNewNotifications = (notifications) => {
//     const today = new Date().toISOString().split("T")[0];
//     const count = notifications.filter((notification) => 
//       new Date(notification.created_at).toISOString().split("T")[0] === today
//     ).length;
//     setNewNotificationCount(count);
//   };

//   const handleClickOpens = () => {
//     try{
//       localStorage.removeItem("userMail");
//       localStorage.removeItem("token");
//       localStorage.removeItem("username");
//       localStorage.removeItem("profile");
//       auth.signOut();
//      navigate("/signin");

//    }
//    catch{

//    }   
//   };

//   const handleClosed = () => {
//     setOpens(false);
//   };

//   const handleClickOpen = () => {
//     setHandleopen(true);
//     fetchData();
//     setNewNotificationCount(0); // Clear the badge when notifications are viewed
//   };

//   const handleClose = () => {
//     setHandleopen(false);
//   };

 

  

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   const location = useLocation();
//   const navigate = useNavigate();
//   const classes = useStyles();

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const Btn = {
//     backgroundColor: "white",
//     border: "none",
//     color: 'black',
//   };

//   const Bts = {
//     backgroundColor: "#E4A45A",
//     color: "white",
//     boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//     width: 300,
//     border: 'none'
//   };

//   const Btn2 = {
//     backgroundColor: "white",
//     border: "none",
//     color: "black",
//     position: 'absolute',
//     right: 0,
//     display:"flex",
//     justifyContent:"flex-end",
//     alignItems:"center"
//   };

//   return (
//     <AppBar position="sticky" style={styles.appBar}>
//       <Toolbar style={styles.toolbar}>
//         <div style={styles.logoContainer}>
//           <Hidden lgUp mdUp smUp>
//             <IconButton
//               color="inherit"
//               onClick={toggleDrawer}
//               style={styles.menuIcon}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Hidden>
//           <img
//             src={Logo}
//             alt="Company Logo"
//             style={{ marginRight: "10px", marginBottom: "5px" }}
//             height="80px"
//             width="80px"
//           />
//           <Typography
//             variant="h6"
//             component="div"
//             style={{ color: "#5e3023", marginBottom: "5px", fontWeight: "600", fontFamily: 'Source' }}
//           >
//             வாகை பயிற்சி மய்யம்
//           </Typography> 
//         </div>
//         <Hidden smDown>
//           {location.pathname === "/" ||
//             location.pathname === "/signup" ||
//             location.pathname === "/signin" || location.pathname === '/otp' || location.pathname === '/forget' ? null : (
//               <div style={{
//                 display: "flex",
//                 justifyContent: "space-evenly",
//                 flexGrow: 4,
//               }}>
//                 <div style={{
//                   backgroundColor: 'white',
//                   display: "flex",
//                   justifyContent: "space-evenly",
//                   flexGrow: 4,
//                   marginTop:"8px",
                 
                 
//                 }}>
//                   <Link to="/home" className={classes.link}>
//                     <Typography style={styles.menuText}>Home</Typography>
//                   </Link>
//                   <Link to="/courses" className={classes.link}>
//                     <Typography style={styles.menuText}>Courses</Typography>
//                   </Link>
//                   <Link to="/about" className={classes.link}>
//                     <Typography style={styles.menuText}>About Us</Typography>
//                   </Link>
//                   <Link to="/contact" className={classes.link}>
//                     <Typography style={styles.menuText}>Contact Us</Typography>
//                   </Link>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                   <IconButton onClick={handleClickOpen}>
//                     <Badge badgeContent={newNotificationCount} color="secondary">
//                       <img src={Bell} height="25px" alt="Bell" />
//                     </Badge>
//                   </IconButton>
//                   <NavLink to={'/profile'}>
//                     <img
//                       src={Profile}
//                       height="30px"
//                       style={{ paddingLeft: "20px",marginTop:"5px" }}
//                       alt="Profile"
//                     />
//                   </NavLink>
//                 </div>
//               </div>
//             )}
//         </Hidden>
//         <div />
//         {location.pathname === "/" ||
//           location.pathname === "/signup" ||
//           location.pathname === '/otp' || location.pathname === '/forget' ? (
//             <Button
//             style={{width:"100px",height:"40px",backgroundColor:"#5e3023",border:'none'}}
//               onClick={() => navigate("/signin")}
              
//             >
//               Sign in
//             </Button>
//           ) :  location.pathname === "/signin" ?  <Button
//           style={{width:"100px",height:"40px",backgroundColor:"#5e3023",border:'none'}}
//           onClick={() => navigate("/signup")}
         
//         >
//           Sign up
//         </Button> : (
//             <Popover
//               id={id}
//               open={open}
//               anchorEl={anchorEl}
//               // onClose={handlepopClose}
//               anchorOrigin={{
//                 vertical: "bottom",
//               }}
//               style={{ textAlign: 'center', }}
//             >
//               <Typography 
//                 component={NavLink}
//                 to="/profile"
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <ListItemText primary="View" />
//               </Typography>
//               <Button variant="outlined" onClick={handleClickOpens}>
//                 <img src={Logout} height="15px" alt="Logout" />
//                 {"    "}
//                 Logout
//               </Button>
             

//             </Popover>
//           )}
//       </Toolbar>
//       {/* Mobile Drawer */}
//       {
//         location.pathname === "/" ||
//         location.pathname === "/signup" ||
//         location.pathname === "/signin" || location.pathname === '/otp' || location.pathname === '/forget' ? null :  <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
//         <List>
//           <ListItem button onClick={toggleDrawer}> 
//             <ListItemButton>
//             <Link style={link} to="/home">
//                     Home
//             </Link>
//               {/* <ListItemText primary="Home" component={NavLink} to="/home" /> */}
//             </ListItemButton>
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemButton>
//             <Link style={link} to="/courses">
//                     Courses
//                   </Link>
//             </ListItemButton>
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemButton>
//             <Link style={link} to="/about">
//                     About
//                   </Link>
//             </ListItemButton>
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemButton>
//             <Link style={link} to="/contact">
//                     Contact us
//                   </Link>
//             </ListItemButton>
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemButton>
//             <Link style={link} onClick={handleClickOpen}>
//                     Notification
//                   </Link>
//             </ListItemButton>
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemButton>
//             <Link style={link} to="/profile">
//                       Profile
//                     </Link>
//             </ListItemButton>
//           </ListItem>
//           <ListItem button onClick={toggleDrawer}>
//             <ListItemButton onClick={handleClickOpens}>
//             <Link style={link} >
//                     Logout
//                   </Link>
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>
//       }
     
//      <Dialog
//   open={handleopen}
//   onClose={handleClose}
//   aria-labelledby="alert-dialog-title"
//   aria-describedby="alert-dialog-description"
// >
//   <DialogTitle
//     style={{
//       height: "50px",
//       padding: "16px", 
     
//     }}
//   >
//     <div style={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
//       <Typography  style={{ fontWeight: "bold" }}>
//         Notifications
//       </Typography>
//       <Button onClick={handleClose} style={Btn2}>
//         <CloseIcon />
//       </Button>
//     </div>
//     <hr style={{ width: "100%", marginTop: "10px" }} />
//   </DialogTitle>
//   <List>
//     {notifications.map((notification, index) => (
//       <ListItem key={index} alignItems="flex-start">
//         <ListItemText
//           primary={
//             <Typography variant="subtitle1" style={{ fontWeight:600 }}>
//               {notification.title}
//             </Typography>
//           }
//           secondary={
//             <>
//               <Typography variant="body2" color="textSecondary">
//                 {notification.date}
//               </Typography>
//               <Typography variant="body2" style={{ marginTop: "8px" }}>
//                 {notification.content}
//               </Typography>
//             </>
//           }
//         />
//       </ListItem>
//     ))}
//   </List>
// </Dialog>

//     </AppBar>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Badge,
  Hidden,
  Popover,
  Dialog,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Logo from "../../asserts/Artboard 1 copy 4.png";
import Bell from "../../asserts/bell.png";
import Profile from "../../asserts/human.png";
import Logout from "../../asserts/icons.png";
import { UserContext } from "../../Context";
import { axiosInstance } from "../Api/instance";
import { auth } from "../../FirebaseConfig";
import styles from "./style";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Btn2 = {
  backgroundColor: "white",
  border: "none",
  color: "black",
  position: "absolute",
  right: 0,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

const linkStyle = {
  color: "black",
  textDecoration: "none",
};

const Navbar = () => {
  const [handleopen, setHandleopen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const email = localStorage.getItem("userMail");

  const { Endpoint } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname === "/otp" ||
    location.pathname === "/forget";

  const isRestrictedRoute =
    location.pathname.startsWith("/subtest") ||
    location.pathname.startsWith("/mainstest") ||
    location.pathname.startsWith("/institutiontest");

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewNotification.php`, {
        userId: email,
      });
      const data = response.data || [];
      setNotifications(data);
      calculateNewNotifications(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNotifications([]);
    }
  };

  const calculateNewNotifications = (notifications) => {
    const today = new Date().toISOString().split("T")[0];
    const count = notifications.filter(
      (notification) =>
        new Date(notification.created_at).toISOString().split("T")[0] === today
    ).length;
    setNewNotificationCount(count);
  };

  const handleClickOpen = () => {
    setHandleopen(true);
    fetchData();
    setNewNotificationCount(0);
  };

  const handleClose = () => {
    setHandleopen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("userMail");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("profile");
      auth.signOut();
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    calculateNewNotifications(notifications);
  }, [notifications]);

  return (
    <AppBar position="sticky" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        <div style={styles.logoContainer}>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              style={styles.menuIcon}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <img
            src={Logo}
            alt="Company Logo"
            height="80px"
            width="80px"
            style={{ marginRight: "10px", marginBottom: "5px" }}
          />
          <Typography
            variant="h6"
            component="div"
            style={{
              color: "#5e3023",
              marginBottom: "5px",
              fontWeight: 600,
              fontFamily: "Source",
            }}
          >
            வாகை பயிற்சி மய்யம்
          </Typography>
        </div>

        <Hidden smDown>
          {!isAuthPage && !isRestrictedRoute && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexGrow: 4,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexGrow: 4,
                  marginTop: "8px",
                }}
              >
                <Link
                  to={isRestrictedRoute ? "#" : "/home"}
                  onClick={(e) => isRestrictedRoute && e.preventDefault()}
                  className={classes.link}
                >
                  <Typography style={styles.menuText}>Home</Typography>
                </Link>

                <Link
                  to={isRestrictedRoute ? "#" : "/courses"}
                  onClick={(e) => isRestrictedRoute && e.preventDefault()}
                  className={classes.link}
                >
                  <Typography style={styles.menuText}>Courses</Typography>
                </Link>

                <Link
                  to={isRestrictedRoute ? "#" : "/about"}
                  onClick={(e) => isRestrictedRoute && e.preventDefault()}
                  className={classes.link}
                >
                  <Typography style={styles.menuText}>About Us</Typography>
                </Link>

                <Link
                  to={isRestrictedRoute ? "#" : "/contact"}
                  onClick={(e) => isRestrictedRoute && e.preventDefault()}
                  className={classes.link}
                >
                  <Typography style={styles.menuText}>Contact Us</Typography>
                </Link>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handleClickOpen}>
                  <Badge badgeContent={newNotificationCount} color="secondary">
                    <img src={Bell} height="25px" alt="Bell" />
                  </Badge>
                </IconButton>
                <NavLink to={"/profile"}>
                  <img
                    src={Profile}
                    height="30px"
                    style={{ paddingLeft: "20px", marginTop: "5px" }}
                    alt="Profile"
                  />
                </NavLink>
              </div>
            </div>
          )}
        </Hidden>

        {isAuthPage ? (
          location.pathname === "/signin" ? (
            <Button
              style={{
                width: "100px",
                height: "40px",
                backgroundColor: "#5e3023",
                border: "none",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          ) : (
            <Button
              style={{
                width: "100px",
                height: "40px",
                backgroundColor: "#5e3023",
                border: "none",
              }}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Button>
          )
        ) : (
          !isRestrictedRoute && (
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom" }}
              style={{ textAlign: "center" }}
            >
              <Typography
                component={NavLink}
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="View" />
              </Typography>
              <Button variant="outlined" onClick={handleLogout}>
                <img src={Logout} height="15px" alt="Logout" /> Logout
              </Button>
            </Popover>
          )
        )}
      </Toolbar>

      {!isAuthPage && !isRestrictedRoute && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            {["home", "courses", "about", "contact"].map((item) => (
              <ListItem button key={item} onClick={toggleDrawer}>
                <ListItemButton>
                  <Link
                    to={isRestrictedRoute ? "#" : `/${item}`}
                    onClick={(e) => isRestrictedRoute && e.preventDefault()}
                    style={linkStyle}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem button onClick={toggleDrawer}>
              <ListItemButton>
                <Link style={linkStyle} onClick={handleClickOpen}>
                  Notification
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemButton>
                <Link style={linkStyle} to="/profile">
                  Profile
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemButton onClick={handleLogout}>
                <Link style={linkStyle}>Logout</Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}

      <Dialog open={handleopen} onClose={handleClose}>
        <DialogTitle style={{ height: "50px", padding: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontWeight: "bold" }}>
              Notifications
            </Typography>
            <Button onClick={handleClose} style={Btn2}>
              <CloseIcon />
            </Button>
          </div>
          <hr style={{ width: "100%", marginTop: "10px" }} />
        </DialogTitle>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">
                      {notification.date}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "8px" }}>
                      {notification.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
