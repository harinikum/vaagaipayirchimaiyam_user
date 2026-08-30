import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../component/Api/instance";
import { Container, Row, Col } from "react-bootstrap";
import "../YearTestPaper/style.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@material-ui/core";
import { Style } from "../YearTestPaper/style";
import Arrow from "../asserts/system-regular-161-trending-flat-white.gif";
import Typography from "@mui/material/Typography";
import Crown from "../asserts/crown.png";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context";

export default function MainsInstruction() {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [paperid, setPaperid] = useState(null);
  const { sno } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [category, setCategory] = useState([]);
  const plan = localStorage.getItem("category");
  const email = localStorage.getItem("userMail");
  const { Endpoint } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Institution();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewProfile.php`, {
        email: email,
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        setCategory(response.data);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Institution = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewMains.php`,
        { userId: email }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        let list = response.data;
        if (typeof list === "string") {
          try {
            list = JSON.parse(list);
          } catch (e) {}
        }
        if (list && Array.isArray(list.data)) {
          list = list.data;
        }
        if (!Array.isArray(list)) {
          list = [];
        }
        const yearobj = list
          ?.map((item) => ({
            ...item,
            img: `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${item.img}`,
          }))
          .filter((item) => String(item.sno) === String(sno));
        setData(yearobj.length > 0 ? yearobj : (list.length > 0 ? [list[0]] : [{ mains_name: "Mains Test", sno: sno }]));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([{ mains_name: "Mains Test", sno: sno }]);
    }
  };

  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ViewMainsPaper.php`,
          { userId: email, id: sno }
        );
        if (response.status === 200) {
          if (response.data.message === "timeout") {
            navigate('/signin');
          }
          let list = response.data;
          if (typeof list === "string") {
            try {
              list = JSON.parse(list);
            } catch (e) {}
          }
          if (list && Array.isArray(list.data)) {
            list = list.data;
          }
          if (!Array.isArray(list)) {
            list = [];
          }
          const paperobj = list.filter(
            (datas) =>
              String(datas.mains_id) === String(sno) ||
              String(datas.main_id) === String(sno) ||
              String(datas.institution_id) === String(sno)
          );
          setOptions(paperobj.length > 0 ? paperobj : list);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPaperData();
  }, [sno]);

  // const PaperData = async (index, paperCategory) => {
  //   const selectedPaper = options[index];

  //   if (category.length > 0 && options.length > 0) {
  //     if (plan === "standard" && paperCategory != "premium") {
  //       try {
  //         const response = await axiosInstance.post(`post/U_MainsTest.php`, {
  //           id: email,
  //           mains_id: sno,
  //           paper_id: selectedPaper.sno,
  //         });
  //         if (response.status === 200) {
  //           if (response.data.message === "timeout") {
  //             navigate('/signin'); 
  //           } 
  //           setSelectedIndex(index);
  //           setPaperid(selectedPaper.sno);
  //         }
  //       } catch (error) {
  //         console.error("Error initializing paper:", error);
  //       }
  //     } else if (plan == "premium") {
  //       try {
  //         const response = await axiosInstance.post(`post/U_MainsTest.php`, {
  //           id: email,
  //           mains_id: sno,
  //           paper_id: selectedPaper.sno,
  //         });
  //         if (response.status === 200) {
  //           if (response.data.message === "timeout") {
  //             navigate('/signin'); 
  //           } 
  //           setSelectedIndex(index);
  //           setPaperid(selectedPaper.sno);
  //         }
  //       } catch (error) {
  //         console.error("Error initializing paper:", error);
  //       }
  //     } else {
  //       alert("You are not allowed to access this paper."+plan);
  //     }
  //   } else {
  //     alert("Data is not available to determine access.");
  //   }
  // };

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
  //           const response = await axiosInstance.post(`post/U_MainsTest.php`, {
  //             id: email,
  //             mains_id: sno,
  //             paper_id: selectedPaper.sno,
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
    if (!options || !options[index]) return;
    const selectedPaper = options[index];
    try {
      let count = 0;
      try {
        const response = await axiosInstance.post(`get/U_viewtestcount.php`, {
          id: email,
          institution_id: sno,
          paper_id: selectedPaper.sno,
        });
        if (response.data && response.data[0]) {
          count = Number(response.data[0].count) || 0;
        }
      } catch (e) {
        console.warn("Could not fetch test count:", e);
      }

      if (count === 0) {
        try {
          const userName =
            (Array.isArray(category) && category[0]?.username) ||
            (Array.isArray(category) && category[0]?.name) ||
            category?.username ||
            category?.name ||
            localStorage.getItem("username") ||
            email ||
            "";
          const response = await axiosInstance.post(`post/U_MainsTest.php`, {
            id: email,
            email: email,
            EmailID: email,
            name: userName,
            username: userName,
            mains_id: sno,
            paper_id: selectedPaper.sno,
          });
          if (response.status === 200 && response.data?.message === "timeout") {
            navigate("/signin");
          }
        } catch (error) {
          console.warn("Error initializing paper in post/U_MainsTest.php:", error);
        }
        setSelectedIndex(index);
        setPaperid(selectedPaper.sno);
      } else {
        alert(
          "இந்த தேர்வு கேள்வித் தாளை நீங்கள் ஒரு முறை பயன்படுத்தியுள்ளீர்கள். இனிமேல் பயன்படுத்த வேண்டுமெனில் நிர்வாகியிடம் அனுமதி கேட்டுப் பெறுங்கள்."
        );
        setSelectedIndex(index);
        setPaperid(selectedPaper.sno);
      }
    } catch (error) {
      console.error("Error fetching data in PaperData:", error);
      setSelectedIndex(index);
      setPaperid(selectedPaper.sno);
    }
  };

  // const handleStartTest = async () => {
  //   const selectedPaper = options[selectedIndex];
  //   try {
  //     const response = await axiosInstance.post(`post/U_ModelMockTest.php`, {
  //       id: email,
  //       institution_id: sno,
  //       mcq_id: selectedPaper.sno,
  //     });

  //     if (response.status === 200) {
  //       if (response.data.message === "timeout") {
  //         navigate("/signin");
  //       } else {
  //         setOpen(false); // Close dialog
  //         startTest(); // Go to test route
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error starting test:", error);
  //   }
  // };

  const startTest = () => {
    if (paperid) {
      const selectedPaper = options[selectedIndex];
      navigate(`/mainstest/${sno}/${paperid}`, {
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

  return (
    <Style>
      {data.length > 0 &&
        data.map((d) => (
          <div
            key={d.sno}
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
                        {d.mains_name}
                      </Typography>
                      <Typography>{d.mains_desc}</Typography>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <img src={d.img} height="65px" alt="Institution Logo" />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container fluid style={{ padding: "20px" }}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                  <div
                    style={{ backgroundColor: "white", borderRadius: "10px" }}
                  >
                    <Button fullWidth style={Btn}>
                      Model MCQ
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
                          <img src={Crown} height="20px" alt="Crown Icon" />
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
                    {d.mains_instruction && (
                      <ul>
                        {d.mains_instruction
                          .split(/\r\n/)
                          .filter((instruction) => instruction.trim() !== "") // filter out empty instructions
                          .map((instruction, index) => (
                            <li key={index} style={{ listStyleType: "none" }}>
                              {instruction.trim()}
                            </li>
                          ))}
                      </ul>
                    )}

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {selectedIndex !== null && (
                        <Button
                          // onClick={startTest}  // Only navigate on button click
                          onClick={() => setOpen(true)}
                          style={{
                            backgroundColor: "#5e3023",
                            color: "white",
                            width: "100px",
                          }}
                          disabled={!paperid}
                        >
                          Start &nbsp;
                          <img src={Arrow} alt="Arrow Icon" height="20px" />
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
                    {selectedIndex !== null &&
                      options[selectedIndex].paper_name}
                  </span>
                </DialogTitle>

                <DialogContent dividers>
                  <Typography>
                    ⚠️ தேர்வுக்கு வரவேற்கிறோம். தேர்வை துவக்கியவுடன், அதை
                    முடிக்க வேண்டும். நடுவில் விட்டு வெளியேறினால், உங்கள்
                    மதிப்பெண் 0 ஆக பதிவு செய்யப்படும்.{" "}
                    <span style={{ color: "red" }}>
                      இந்த தேர்வை நீங்கள் ஒரே முறை மட்டுமே எழுத முடியும்.
                    </span>
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
                      onClick={startTest}
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
