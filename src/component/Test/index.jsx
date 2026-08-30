import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Arrow from '../../asserts/system-regular-161-trending-flat.gif';
import { useParams } from "react-router-dom";
import { axiosInstance } from "../Api/instance";
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./Countdown";

function Test() {
  const { sno, paperid } = useParams();
  const [data, setData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const email = localStorage.getItem("userMail");
  const { Endpoint } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // State for total questions
  const [questionNumbers, setQuestionNumbers] = useState([]); // State for storing question numbers
  const navigate = useNavigate();
  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
    setShowCorrectAnswer(true);
  };

  const handleFinish = () => {
    navigate('/year');
  }

  useEffect(() => {
    fetchTotalQuestions();
  }, []);

  useEffect(() => {
    if (questionNumbers.length > 0) {
      fetchData(questionNumbers[count]);
    }
  }, [count, questionNumbers]);

  const fetchTotalQuestions = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewPMCQCount.php`,
        {
          userId: email,
          institutionId: sno,
          paperId: paperid,
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        if (Array.isArray(response.data)) {
          const questionNumbers = response.data.map(item => item.sno);
          setQuestionNumbers(questionNumbers); // Set question numbers
          setTotalQuestions(questionNumbers.length); // Set total questions
          if (questionNumbers.length > 0) {
            fetchData(questionNumbers[0]); // Fetch the first question
          }
        } else {
          console.error("Data received from API is not an array:", response.data);
        }

      }

    } catch (error) {
      console.error("Error fetching total questions:", error);
    }
  };

  const fetchData = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewPmcqQuestions.php`,
        {
          userId: email,
          institutionId: sno,
          paperId: paperid,
          questionId: questionId
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate('/signin');
        }
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Data received from API is not an array:", response.data);
        }

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    if (count < totalQuestions - 1) {
      setCount((prevCount) => prevCount + 1);
      setSelectedAnswer('');
      setShowCorrectAnswer(false);
    }
  };

  const MainContainer = {
    width: "98vw"
  };

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
  };

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
  };
  const Finsh = {
    backgroundColor: "#5e3023",
    color: "white",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "50px",
    width: "200px",
    alignItems: "center"
  };

  const noCopyStyle = {
    userSelect: "none",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    MsUserSelect: "none",
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
    height: '200px', // Default height
  };

  const DisActive = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth transition
    transform: 'scale(1.5)', // Zoomed-in size
    width: 'auto',
    height: '230px', // Adjust height when zoomed in
    marginLeft: "120px"
  };

  const handleClick = () => {
    if (windowWidth > 600) {
      swapping();
    }
  };


  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp|jfif)$/) != null;
  };


  return (
    <div style={{ backgroundColor: "#F2F1EB", padding: "20px", height: "90vh", display: "flex", justifyContent: "center" }}>
      {
        data.length > 0 ? data.map((d) => (
          <div key={d.sno}>
            <Container fluid style={MainContainer}>
              <Row>
                <Col>
                  <div className="wrap" style={Title}>
                    <div>
                      <Typography style={{ fontWeight: 600 }}>Institution Name</Typography>
                    </div>

                    <div>
                      <Typography style={{ fontWeight: 600 }}>{count + 1}/{totalQuestions}</Typography>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container fluid style={{ padding: "20px" }}>
              <Row style={{ justifyContent: "center" }}>
                <Col xs={12} sm={12} md={12} lg={7} xl={7} style={{ backgroundColor: "#f3e9dc", height: "70vh" }}>
                  <div style={{ paddingTop: "30px" }}>
                    <p style={{ fontWeight: "500", fontFamily: "Question", ...noCopyStyle }}>
                      {count + 1}. {d.questions}
                    </p>
                    {d.image ? (
                      <img
                        src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${d.image}`}
                        height="200px"
                        alt="Uploaded Image"
                        onClick={handleClick}
                        style={colorSwap ? Active : DisActive}
                      />

                    ) : (
                      null
                    )}

                    <ol type="a" style={{ paddingTop: "10px", listStyle: "none", paddingLeft: "0", ...noCopyStyle }}>
                      <li style={{ display: "flex", alignItems: "center", paddingBottom: "10px", ...noCopyStyle }}>
                        <input type="radio" name="answer" value="a" onChange={handleOptionChange} style={{ marginRight: "10px" }} />
                        {isImage(d.option1) ? (
                          <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${d.option1}`} alt="Option 1" style={{ maxHeight: "80px" }} />
                        ) : (
                          <span>{d.option1}</span>
                        )}
                      </li>
                      <li style={{ display: "flex", alignItems: "center", paddingBottom: "10px", ...noCopyStyle }}>
                        <input type="radio" name="answer" value="b" onChange={handleOptionChange} style={{ marginRight: "10px" }} />
                        {isImage(d.option2) ? (
                          <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${d.option2}`} alt="Option 2" style={{ maxHeight: "80px" }} />
                        ) : (
                          <span>{d.option2}</span>
                        )}
                      </li>
                      <li style={{ display: "flex", alignItems: "center", paddingBottom: "10px", ...noCopyStyle }}>
                        <input type="radio" name="answer" value="c" onChange={handleOptionChange} style={{ marginRight: "10px" }} />
                        {isImage(d.option3) ? (
                          <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${d.option3}`} alt="Option 3" style={{ maxHeight: "80px" }} />
                        ) : (
                          <span>{d.option3}</span>
                        )}
                      </li>
                      <li style={{ display: "flex", alignItems: "center", paddingBottom: "10px", ...noCopyStyle }}>
                        <input type="radio" name="answer" value="d" onChange={handleOptionChange} style={{ marginRight: "10px" }} />
                        {isImage(d.option4) ? (
                          <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${d.option4}`} alt="Option 4" style={{ maxHeight: "80px" }} />
                        ) : (
                          <span>{d.option4}</span>
                        )}
                      </li>
                    </ol>

                  </div>

                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} style={{ backgroundColor: "#FEFBE9", height: "70vh", }}>
                  <div style={{ backgroundColor: "white", paddingTop: "60px", width: "auto", marginTop: "30px", padding: "20px" }}>
                    {showCorrectAnswer && (
                      <div style={noCopyStyle}>
                        <Typography style={{ fontWeight: 600 }}>Correct Answer :</Typography>
                        {isImage(d.answer) ? (
                          <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${d.answer}`} alt="Answer Image" style={{ maxWidth: "80px", paddingTop: "10px" }} />
                        ) : (
                          <Typography style={{ fontSize: "15px", paddingTop: "10px" }}>{d.answer}</Typography>
                        )}

                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}>
                    <Button style={Btn} onClick={handleNext}>Next &nbsp;&nbsp;<img src={Arrow} height="30px" /></Button>
                  </div>
                  <div className="d-grid" style={{ display: "flex", justifyContent: "center" }}>
                    <Button style={Finsh} size="lg" onClick={handleFinish} >FINISH TEST</Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )) : <p>Loading...</p>
      }
    </div>
  );
}

export default Test;
