import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../component/Api/instance";
import { Container, Row, Col } from "react-bootstrap";
import Year from "../asserts/system-solid-23-calendar.gif";
import "../YearTestPaper/style.css";
import { Button } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { Style } from "./style";
import Arrow from "../asserts/system-regular-161-trending-flat-white.gif";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
// import Style from '../YearTestPaper/style.css'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Instruction() {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState("");
  const [paperid, setpaperid] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [paper, setPaper] = useState('');
  const { Endpoint } = useContext(UserContext);
  const plan = localStorage.getItem("category");
  const email = localStorage.getItem("userMail");
  const { sno } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewAds.php`,
        {
          userId: email,
          category: "yearMCQ"
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }
        setDatas(response.data[0].attachment_file);

      }
      // console.log(response.data[0].attachment_file);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(datas);
  }, [datas]); // Add datas as a dependency to the useEffect hook


  useEffect(() => {
    Institution();
  }, []);

  const Institution = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewPmcqInstitution.php`,
        {
          userId: email,
          id: sno
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }
        const yearobj = response.data?.map((item) => ({
          ...item,
          img: `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${item.img}`

        })).filter(item => item.sno == sno);
        console.log(yearobj);
        setData(yearobj);

      }
    } catch (error) {

      console.error("Error fetching data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ViewPmcqPaper.php`,
          {
            id: sno,
            userId: email
          }
        );
        if (response.status === 200) {
          if (response.data.message === "timeout") {
            Navigate('/signin');
          }
          const paperobj = response?.data?.filter((datas) =>
            datas.institution_id == sno);
          setOptions(paperobj);

        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleClickOpen();
    fetchData();
  }, []);

  // const PaperData= async (ind) => {
  //   setSelectedIndex(ind);
  //   setpaperid(options[ind].sno);

  // };

  const MainContainer = {
    backgroundColor: "#f3e9dc",
    height: "200px",
    // marginTop: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  const Btn = {
    backgroundColor: "#5e3023",
    border: "none",
    borderRadius: "5px",
    fontWeight: 600,
    marginBottom: "10px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
  };

  const PaperData = async (index, paperCategory) => {
    const selectedPaper = options[index];
    setPaper(paperCategory);


    try {
      const response = await axiosInstance.post(`post/U_YearTest.php`, {
        id: email,
        year_id: sno,
        paper_id: selectedPaper.sno,
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }
        setSelectedIndex(index);
        setpaperid(selectedPaper.sno);
      }
    } catch (error) {
      console.error("Error initializing paper:", error);
    }

  };

  const startTest = () => {
    if (paperid) {
      // const selectedPaper = options[selectedIndex];
      // console.log(selectedPaper);

      Navigate(`/yeartest/${sno}/${paperid}`, {
        state: {
          paperName: paper,
        },
      });
    }
  };

  return (
    <Style>

      {
        data.map((val) => (
          <div style={{ backgroundColor: "#f3e9dc", }}>
            <Container fluid style={MainContainer}>
              <Row>
                <Col>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "95vw",
                      padding: "20px",
                    }}
                  >
                    <div style={{ width: "700px" }}>
                      <Typography style={{ fontWeight: 600 }}>
                        {val.institution_name}
                      </Typography>
                      <Typography>
                        {" "}

                        {val.institution_desc}
                      </Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <img src={val.img} height="65px" alt="Institution Logo" />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container fluid style={{ padding: "20px" }}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                  <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
                    <Button fullWidth style={Btn}>
                      <img src={Year} alt="Year Icon" height="20px" />
                      &nbsp;&nbsp;Select Year
                    </Button>
                    {options.map((option, index) => (
                      <Button key={index} className="Option" fullWidth onClick={() => PaperData(index, option.year + " " + option.month)}
                        style={{
                          backgroundColor: selectedIndex === index ? "#5e3023" : "#fff",
                          color: selectedIndex === index ? "#fff" : "#000",
                        }}
                      >
                        {option.year + " " + option.month}
                      </Button>
                    ))}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={9} xl={9}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "40px",
                    }}
                  >
                    <Typography style={{ fontWeight: 600 }}>INSTRUCTION</Typography>
                    <ul>
                      <li>
                        {val.institution_instruction}
                      </li>

                    </ul>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {selectedIndex !== null && (
                        <Button
                          onClick={startTest}
                          // onClick={()=>{Navigate(`/yeartest/${sno}/${paperid}`)}}
                          style={{
                            backgroundColor: "#5e3023",
                            color: "white",
                            width: "100px",
                          }}
                        >
                          Start &nbsp;
                          <img src={Arrow} alt="Arrow Icon" height="20px" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        ))
      }

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
          {datas && datas && (
            <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${datas}`} height="500px" />
          )}
        </DialogContent>
      </BootstrapDialog>
    </Style>
  );
}
