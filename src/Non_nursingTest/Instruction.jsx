// Existing Code with added logic to format the instructions properly
import { Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../YearTestPaper/style.css';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@material-ui/core";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Crown from '../asserts/crown.png';
import Arrow from '../asserts/system-regular-161-trending-flat-white.gif';
import { axiosInstance } from '../component/Api/instance';
import { UserContext } from '../Context';
import { Style } from '../YearTestPaper/style';

export default function NonInstruction() {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [paperid, setPaperid] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState('');
  const { sno } = useParams();
  const email = localStorage.getItem("userMail");
  const navigate = useNavigate();
  const { Endpoint } = useContext(UserContext);
  const plan = localStorage.getItem("category");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchInstitutionData();
    fetchPaperData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewProfile.php`, {
        email: email
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        setCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchInstitutionData = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewNonNursingCategory.php`, {
        userId: email,
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        const filteredData = response.data?.map((item) => ({
          ...item,
          img: `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${item.img}`
        })).filter(item => item.sno == sno);
        setData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching institution data:", error);
    }
  };

  const fetchPaperData = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewNonNursingPaper.php`, {
        id: sno,
        userId: email
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        const filteredPapers = response?.data?.filter((paper) => paper.category_id == sno);
        setOptions(filteredPapers);
      }
    } catch (error) {
      console.error("Error fetching paper data:", error);
    }
  };

  // const PaperData = async (index, paperCategory) => {
  //   const selectedPaper = options[index];
  //   try {
  //     const response = await axiosInstance.post(`get/U_viewtestcount.php`, {
  //       id: email,
  //       institution_id: sno,
  //       paper_id: selectedPaper.sno,
  //     });

  //     // console.log("Response data:", response.data.error);   
  //     const fetchedCount = response.data[0]; // Directly use the fetched data
  //     console.log(fetchedCount.count);
  //     // Use the fetched data directly instead of relying on the state
  //     if (category.length > 0 && options.length > 0) {
  //       if (fetchedCount.count < 3) {
  //         try {
  //           const response = await axiosInstance.post(`post/U_NonNursingTest.php`, {
  //             id: email,
  //             category_id: sno,
  //             paper_id: selectedPaper.sno
  //           });
  //           if (response.status === 200) {
  //             if (response.data.message === "timeout") {
  //               navigate('/signin');
  //             }
  //             setSelectedIndex(index);
  //             setPaperid(selectedPaper.sno);
  //           }
  //         } catch (error) {
  //           console.error("Error initializing paper:", error);
  //         }
  //       } else {
  //         alert("இந்த தேர்வு கேள்வித் தாளை நீங்கள் மூன்று முறை பயன்படுத்தியுள்ளீர்கள். இனிமேல் பயன்படுத்த வேண்டுமெனில் நிர்வாகியிடம் அனுமதி கேட்டுப் பெறுங்கள்.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const PaperData = async (index, paperCategory) => {
    const selectedPaper = options[index];
    try {
      const response = await axiosInstance.post(`get/U_viewtestcount.php`, {
        id: email,
        institution_id: sno,
        paper_id: selectedPaper.sno,
      });

      const fetchedCount = response.data[0];
      console.log(fetchedCount.count);

      if (category.length > 0 && options.length > 0) {
        if (fetchedCount.count === 0) {
          // Just set selected index and paperid for later use
          setSelectedIndex(index);
          setPaperid(selectedPaper.sno);
          // setOpen(true); // Open dialog only
        } else {
          alert(
            "இந்த தேர்வு கேள்வித் தாளை நீங்கள் ஒரு முறை பயன்படுத்தியுள்ளீர்கள். இனிமேல் பயன்படுத்த வேண்டுமெனில் நிர்வாகியிடம் அனுமதி கேட்டுப் பெறுங்கள்."
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStartTest = async () => {
    const selectedPaper = options[selectedIndex];
    try {
      const response = await axiosInstance.post(`post/U_ModelMockTest.php`, {
        id: email,
        institution_id: sno,
        mcq_id: selectedPaper.sno,
      });

      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate("/signin");
        } else {
          setOpen(false); // Close dialog
          startTest(); // Go to test route
        }
      }
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const startTest = () => {
    if (paperid) {
      const selectedPaper = options[selectedIndex];
      navigate(`/aptitudetest/${sno}/${paperid}`, {
        state: {
          paperName: selectedPaper.paper_name,
        },
      });
    }
  };

  const MainContainer = {
    backgroundColor: "#f3e9dc",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
  };

  const Btn = {
    backgroundColor: "#5e3023",
    border: "none",
    borderRadius: "5px",
    fontWeight: 600,
    marginBottom: "10px",
    height: "40px",
    display: "flex",
    justifyContent: "center"
  };

  // const renderInstructions = (instructions) => {
  //   return instructions.split(/(\d+\.\s)/).filter(Boolean).map((part, index) => {
  //     if (/\d+\.\s/.test(part)) {
  //       return <li key={index}><strong>{part}</strong></li>;
  //     }
  //     return <li key={index} style={{ marginLeft: "20px" }}>{part}</li>;
  //   });
  // };

  return (
    <Style>
      {data.map((val) => (
        <div
          key={val.sno}
          style={{ backgroundColor: "#f3e9dc", height: "100vh" }}
        >
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
                      {val.category_name}
                    </Typography>
                    <Typography>{val.category_desc}</Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img src={val.img} height="80px" alt="Category" />
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
                    &nbsp;&nbsp;Model MCQ
                  </Button>
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      className="Option"
                      fullWidth
                      onClick={() => PaperData(index, option.category)}
                      style={{
                        backgroundColor:
                          selectedIndex === index ? "#5e3023" : "#fff",
                        color: selectedIndex === index ? "#fff" : "#000",
                      }}
                    >
                      {option.paper_name}&nbsp;&nbsp;
                      {option.category === "premium" && (
                        <img src={Crown} height="20px" alt="Premium" />
                      )}
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
                  <Typography style={{ fontWeight: 600 }}>
                    INSTRUCTION
                  </Typography>
                  {val.category_instruction && (
                    <ul
                      style={{ listStyleType: "decimal", paddingLeft: "20px" }}
                    >
                      {val.category_instruction
                        .split(/\d+\.\s+/)
                        .filter((instruction) => instruction.trim() !== "") // Filter out empty instructions
                        .map((instruction, index) => (
                          <li key={index} style={{ marginBottom: "10px" }}>
                            {instruction.trim()}
                          </li>
                        ))}
                    </ul>
                  )}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {selectedIndex !== null && (
                      <Button
                        // onClick={startTest}
                        onClick={() => setOpen(true)}
                        style={{
                          backgroundColor: "#5e3023",
                          color: "white",
                          width: "100px",
                        }}
                      >
                        Start&nbsp;
                        <img src={Arrow} height="20px" alt="Start" />
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle
                sx={{
                  m: 0,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  Test:{" "}
                  {selectedIndex !== null && options[selectedIndex].paper_name}
                </span>
              </DialogTitle>

              <DialogContent dividers>
                <Typography>
                  தேர்வுக்கு வரவேற்கிறோம். தேர்வை துவக்கியவுடன், அதை முடிக்க
                  வேண்டும். நடுவில் விட்டு வெளியேறினால், உங்கள் மதிப்பெண் 0 ஆக
                  பதிவு செய்யப்படும். இந்த தேர்வை நீங்கள் ஒரே முறை மட்டும் எழுத
                  முடியும்.
                </Typography>
              </DialogContent>

              <DialogActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={() => setOpen(false)} // Close dialog
                    color="secondary"
                    variant="outlined"
                  >
                    Close
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleStartTest}
                    color="primary"
                  >
                    OK
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Container>
        </div>
      ))}
    </Style>
  );
}
