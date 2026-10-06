import { Typography } from "@mui/material";
import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap'
import Arrow from '../asserts/system-regular-161-trending-flat.gif'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Share1 from '../asserts/system-regular-1-share.gif'
import { axiosInstance } from "../component/Api/instance";
import { UserContext } from "../Context";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function TestPage() {

  const Title = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "-19px",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    zIndex: "1",
  }
  const Btn = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width: "150px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const Share = {
    backgroundColor: "#5e3023",
    color: "white",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width: "150px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    alignItems: "center"
  }
  const ShowBtn = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "250px"
  }
  const AlertBtn = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width: "150px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const Finsh = {
    backgroundColor: "#5e3023",
    color: "white",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    width: "200px"
  }
  const noCopyStyle = {
    userSelect: "none",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    MsUserSelect: "none",
    fontFamily: "Answer"
  };
  const [open, setOpen] = React.useState(false);
  const [finish, setfinish] = React.useState(false);
  const [answer, setanswer] = React.useState(false);
  const [btn, setbtn] = React.useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsNo, setQuestionsNo] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const { sno } = useParams();
  const email = localStorage.getItem("userMail");
  const { Endpoint } = useContext(UserContext);
  const Navigate = useNavigate();
  const [responsecount, setResponsecount] = useState(null);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [optionIndexMapping, setOptionIndexMapping] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const registerDatas1 = async () => {

    try {
      const res = await axiosInstance.post(
        `get/U_DailyTestMark.php`,
        {
          userId: email,
          test_id: sno
        }
      );
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          Navigate('/signin');
        }
        if (Array.isArray(res.data)) {
          setResponsecount(res.data);
          console.log(res.data);

        } else {
          console.error("Unexpected data format:", res.data);
        }

      }

    } catch (err) {


      console.error("Error fetching data:", err);
    }
  };


  useEffect(() => {



    fetchQuestionSno();

  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const FinishTest = () => {
    setfinish(true);
  }
  const FinishTestClose = () => {
    setfinish(false);
    Navigate('/hybrid');
  }
  const Show = () => {
    setanswer(!answer);
    setbtn(!btn)
  }

  useEffect(() => {
    fetchQuestionSno();
  }, []);


  useEffect(() => {
    if (questionsNo.length > 0) {
      fetchQuestions(questionsNo[selectedQuestionIndex].sno);
    }
  }, [questionsNo, selectedQuestionIndex]);

  const fetchQuestions = async (questionId) => {
    try {
      const res = await axiosInstance.post(
        `get/U_ViewDailyQuestion.php`,
        {
          userId: email,
          test_id: sno,
          question_id: questionId,
        }
      );
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          Navigate('/signin');
        }
        setQuestions(res.data);

      }


    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const registerDatatest = async (questionId) => {

    try {
      const res = await axiosInstance.post(
        `put/U_updateDailyTestAns.php`,
        {
          id: email,
          question_id: questionId,
          answer: selectedOption
        }
      );
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          Navigate('/signin');
        }
        console.log(res.data);

      }
    } catch (err) {
      console.log(selectedOptionIndex);
      console.error("Error fetching data:", err);
    }


  };

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Define selected option index state
  const [selectedOption, setSelectedOption] = useState("");

  const fetchQuestionSno = async () => {
    try {
      const res = await axiosInstance.post(
        `get/U_ViewDailyQuestionCount.php`,
        {
          userId: email,
          test_id: sno,
        }
      );
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          Navigate('/signin');
        }
        setQuestionsNo(res.data);

      }

    } catch (error) {
      console.error("Error fetching question numbers:", error);
    }
  };

  const handleQuestionChange = async (index) => {
    if (index >= 0 && index < questionsNo.length) {
      const selectedSno = questionsNo[index].sno;
      // console.log("Selected question sno:", selectedSno);
      fetchQuestions(selectedSno);
      setSelectedQuestionIndex(index);
      if (index === questionsNo.length - 1) {
        await registerDatatest(questionsNo[selectedQuestionIndex].sno);
      }
    }
  };
  useEffect(() => {
    if (optionIndexMapping[selectedQuestionIndex] !== undefined) {
      setSelectedOptionIndex(optionIndexMapping[selectedQuestionIndex]);
    } else {
      setSelectedOptionIndex(null); // Reset if no option was selected previously
    }
  }, [selectedQuestionIndex, optionIndexMapping]);

  const handleOptionSelect = (optionIndex) => {
    const selectedOptionText = questions[0][`option${optionIndex}`];
    setSelectedOptionIndex(optionIndex);
    setSelectedOption(selectedOptionText);

    // Save selected option for the current question
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[selectedQuestionIndex] = selectedOptionText; // Save selected option for current question
      return updatedOptions;
    });

    // Update the mapping for option index per question
    setOptionIndexMapping((prevMapping) => ({
      ...prevMapping,
      [selectedQuestionIndex]: optionIndex
    }));

    console.log("Selected option data:", selectedOptionText);
  };

  const [skippedQuestions, setSkippedQuestions] = useState([]);

  const handleSkipQuestion = async () => {
    // Update status for the current question
    setQuestionStatus(prevStatus => {
      const newStatus = [...prevStatus];
      newStatus[selectedQuestionIndex] = 'skipped';
      return newStatus;
    });

    // Call handleNextQuestion to proceed to the next question
    await handleNextQuestion();
  };
  const handleNextQuestion = async () => {
    const nextIndex = selectedQuestionIndex + 1;
    if (nextIndex < questionsNo.length) {
      const selectedSno = questionsNo[nextIndex].sno;

      // Save current question data
      await registerDatatest(questionsNo[selectedQuestionIndex].sno);

      // Fetch the next question
      await fetchQuestions(selectedSno);
      setSelectedQuestionIndex(nextIndex);

      // Preselect the previously selected option for the next question (if available)
      setSelectedOption(selectedOptions[nextIndex] || ''); // Get saved option for next question
      setSelectedOptionIndex(optionIndexMapping[selectedOptions[nextIndex]] || null); // Use saved index or null

      // Update question status
      setQuestionStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[selectedQuestionIndex] = selectedOptions[selectedQuestionIndex] ? 'answered' : 'skipped';
        return newStatus;
      });
    }
    else if (nextIndex === questionsNo.length) {
      // Handle the last question case
      await registerDatatest(questionsNo[selectedQuestionIndex].sno);
      setQuestionStatus(prevStatus => {
        const newStatus = [...prevStatus];
        newStatus[selectedQuestionIndex] = selectedOption ? 'answered' : 'skipped';
        return newStatus;
      });
      // Optionally, navigate to a different page or show a message
    }
  };

  const [colorSwap, setColorSwap] = useState(true);
  function swapping() {
    setColorSwap(!colorSwap); // Toggle between zoomed-in and zoomed-out
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Active = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth transition
    transform: 'scale(1)', // Normal size (zoomed out)
    width: 'auto', // Adjust width to original image size
    height: '150px', // Default height
  };

  const DisActive = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth transition
    transform: 'scale(1.5)', // Zoomed-in size
    width: 'auto',
    height: '200px', // Adjust height when zoomed in
    marginLeft: "120px"
  };

  const handleClick = () => {
    if (windowWidth > 600) {
      swapping();
    }
  };

  const isImage = (url) => {
    return url && url.match(/\.(jpeg|jpg|gif|png|svg|webp|jfif)$/) != null;
  };
  const BASE_URL = "https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/";

  return (
    <div style={{ backgroundColor: "#F2F1EB", padding: "20px", height: "100vh" }}>
      <Container fluid >
        <Row >
          <Col  >
            <div className="wrap" style={Title}>
              <div>
                <Typography style={{ fontWeight: 600 }}>Daily Test</Typography>
              </div>
              <div>
                <Typography style={{ fontWeight: 600 }}>{selectedQuestionIndex + 1}/{questionsNo.length}</Typography>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid style={{ padding: "20px" }}>
        <Row style={{ justifyContent: "center" }} >
          <Col xs={12} sm={12} md={12} lg={7} xl={7} style={{ backgroundColor: "#f3e9dc", }}>
            <div style={{ paddingTop: "60px", }}>
              {questions[0] ? (
                <div style={noCopyStyle}>
                  <p style={{ fontWeight: 600, letterSpacing: "1px" }} >{`${selectedQuestionIndex + 1}.${questions[0].questions}`}</p>
                  {
                    questions[0].image ? <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${questions[0].image}`} height="200px" alt="Uploaded Image"
                      onClick={handleClick}
                      style={colorSwap ? Active : DisActive} /> : null
                  }
                  <ol type="a" style={{ paddingLeft: "0", listStylePosition: "inside" }}>
                    {[1, 2, 3, 4].map((option) => (
                      <li key={option} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="options"
                            value={option}
                            checked={selectedOptionIndex === option}
                            onChange={() => handleOptionSelect(option)}
                            style={{ marginRight: "10px" }}
                          />
                          {isImage(questions[0][`option${option}`]) ? (
                            <img
                              src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${questions[0][`option${option}`]}`}
                              alt={`Option ${option}`}
                              style={{ maxHeight: "80px", marginLeft: "10px" }}
                            />
                          ) : (
                            <span>{questions[0][`option${option}`]}</span>
                          )}
                        </label>
                      </li>
                    ))}
                  </ol>

                  <Button style={ShowBtn} onClick={Show}>
                    {btn ? "Hide Answer" : "Show Correct Answer"}
                  </Button>
                  {/* </div> */}
                  <div>
                    {answer && (
                      <div style={{ backgroundColor: "white", margin: "20px", padding: "30px" }}>
                        <Typography style={{ fontWeight: 600 }}>Correct Answer :</Typography>
                        {isImage(questions[0].answer) ? (
                          <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${questions[0].answer}`} alt="Answer Image" style={{ maxWidth: "80px", paddingTop: "10px" }} />
                        ) : (
                          <Typography style={{ fontSize: "15px", paddingTop: "10px" }}>{questions[0].answer}</Typography>
                        )}

                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "200px", marginBottom: "20px" }}>
                    <Button style={Btn} onClick={handleSkipQuestion}>Skip</Button>&nbsp;&nbsp;&nbsp;
                    <Button style={Btn} onClick={handleNextQuestion}>Save & Next <img src={Arrow} height="25px" /></Button>
                  </div>
                </div>
              ) : (
                <p>Loading question...</p>
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ backgroundColor: "#FEFBE9", }} >
            <Typography style={{ fontWeight: 600, textAlign: "center", paddingTop: "30px" }}>QUESTION STATUS</Typography>
            <div style={{ paddingTop: "60px", width: "auto", marginTop: "30px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ backgroundColor: "#5e3023", height: "20px", width: "20px", borderRadius: "50%" }}></div>
                  &nbsp;&nbsp;<span style={{ marginTop: "-3px", fontWeight: 600 }}>Answered</span>

                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ backgroundColor: "red", height: "20px", width: "20px", borderRadius: "50%" }}></div>
                  &nbsp;&nbsp;<span style={{ marginTop: "-3px", fontWeight: 600 }}>Skipped</span>

                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#f6f6f6",
                  borderRadius: "15px",
                  height: "300px",
                  overflow: "auto",
                  width: "100%",
                  paddingLeft: "40px",
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {Array.isArray(questionsNo) && questionsNo.length > 0 ? (
                  questionsNo.map((question, index) => (
                    <button
                      key={index}
                      style={{
                        backgroundColor: questionStatus[index] === 'skipped' ? 'red' :
                          questionStatus[index] === 'answered' ? 'green' :
                            'white',
                        color: "black",
                        border: "none",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        width: "50px",
                        height: "50px",
                        fontWeight: 600,
                        marginBottom: "10px",
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        padding: "10px",
                        marginLeft: "30px"
                      }}
                      onClick={() => handleQuestionChange(index)}
                    >
                      {index + 1}
                    </button>
                  ))
                ) : (
                  <Typography>No questions available</Typography>
                )}

              </div>


              <div >

                <div className="d-grid " style={{ display: "flex", justifyContent: "center" }}>
                  <Button style={Finsh} size="lg" onClick={handleClickOpen}>FINISH TEST</Button>
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">

                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to finish the Test ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button style={Share} onClick={() => {
                      FinishTest();
                      registerDatas1(); // Fetch data when finishing the test
                    }}>Yes,Finish Test</Button>
                    <Button style={AlertBtn} onClick={handleClose} autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={finish}
                  onClose={FinishTestClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">

                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{ fontWeight: 600, color: "black" }}>
                      Thank you, Your test is submitted successfully.
                      {responsecount ? (
                        responsecount.length > 0 ? (responsecount.map((item, index) => (
                          <div key={index}>
                            <Typography style={{ fontWeight: 500, color: "black" }}>
                              Correct Answer: {item.correct_count}
                            </Typography>
                            <Typography style={{ fontWeight: 500, color: "black" }}>
                              Wrong Answer: {item.incorrect_count}
                            </Typography>
                            <Typography style={{ fontWeight: 500, color: "black" }}>
                              Skipped: {item.skip_count}
                            </Typography>
                            <Typography style={{ fontWeight: 500, color: "black" }}>
                              Negative Mark: {item.negative_marks}
                            </Typography>
                            <Typography style={{ fontWeight: 500, color: "black" }}>
                              Total Mark: {item.total_marks}
                            </Typography>

                          </div>
                        ))
                        ) : (
                          <Typography>No data available</Typography>
                        )
                      ) : (
                        <Typography>Loading data...</Typography>
                      )}
                    </DialogContentText>

                  </DialogContent>
                  <DialogActions style={{ display: "flex", justifyContent: "space-evenly" }}>

                    <Button style={Share} ><img src={Share1} height="20px" style={{ marginTop: "4px" }} />&nbsp; <a href="https://www.instagram.com/" target="_blank" style={{ color: "white", textDecoration: "none" }}>Share Score</a> </Button>
                    <Button style={AlertBtn} onClick={FinishTestClose} autoFocus>
                      Done
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TestPage;
