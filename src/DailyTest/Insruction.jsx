import { Typography } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MicroTest from '../asserts/exam_8980068.jpg';
import '../YearTestPaper/style.css';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import '../YearTestPaper/style.css';
import { Style } from '../YearTestPaper/style';
import Crown from '../asserts/crown.png';
import Arrow from '../asserts/system-regular-161-trending-flat-white.gif';
import { axiosInstance } from '../component/Api/instance';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Context';
import { useNavigate } from 'react-router-dom';
export default function DailyInstruction() {
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { sno } = useParams();
  const { Endpoint } = useContext(UserContext);
  const [paperid,setpaperid]=useState([]);
  const email = localStorage.getItem('userMail');
  const Navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ViewDailyTestDetails.php`,
          {
            userId: email,
          }
        );
        if (response.status === 200) {
          if (response.data.message === "timeout") {
            Navigate('/signin'); 
          } 
            const data = response.data || [];
            setOptions(data);
      
            // Log the fetched data directly
            data.forEach(option => {
              console.log(`Test Name: ${option.test_name}, SNO: ${option.sno}`);
            });
         
        }
        
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  const PaperData = async (ind) => {
    setSelectedIndex(ind);
    setpaperid(options[ind].sno);
    
    // Call the startTest API with the selected paper
    try {
      await startTest(options[ind].sno);
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const startTest = async (testId) => {
    try {
      const response = await axiosInstance.post(
        `post/U_DailyTest.php`,
        {
          id: email,
          test_id: testId,
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin'); 
        } 
          console.log('Test started:', response.data);
        
      }
     
    } catch (error) {
      console.error("Error fetching data:", error);
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

  return (
    <Style> 
      <div style={{ backgroundColor: "#f3e9dc",height:"100vh" }}>
        <Container fluid style={MainContainer}>
          <Row>
            <Col>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95vw", padding: "20px" }}>
                <div style={{ width: "700px" }}>
                  <Typography style={{ fontWeight: 600 }}>Daily Test</Typography>
                  <Typography>
                    This Nursing Fundamentals textbook is an open educational resource with CC-BY licensing developed for entry nursing students.
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={MicroTest} height="80px" alt="Test"/>
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
                {Array.isArray(options) && options.map((option, index) => (
                  <Button
                    key={index}
                    className="Option"
                    fullWidth
                    onClick={() => PaperData(index)}
                    style={{
                      backgroundColor: selectedIndex === index ? "#5e3023" : "#fff",
                      color: selectedIndex === index ? "#fff" : "#000",
                    }}
                  >
                    {option.test_name}&nbsp;&nbsp;{
                      (option.category === "premium") && <img src={Crown} height="20px" alt="Premium"/>
                    }
                  </Button>
                ))}
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={9} xl={9}>
              <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "40px" }}>
                <Typography style={{ fontWeight: 600 }}>INSTRUCTION</Typography>
                <ul>
                  <li>There are a total of 10 questions.</li>
                  <li>Each question carries 1 mark and there are no negative marks.</li>
                  <li>
                    Mark your answer by clicking the appropriate radio button and to change your answer, please click the radio button that you think is appropriate.
                  </li>
                  <li>
                    Once done, click on finish test to end the test.
                  </li>
                  <li>
                    Click on start to proceed.
                  </li>
                </ul>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {selectedIndex !== null && (
                    <NavLink to={`/testpage/${options[selectedIndex].sno}`}>
                      <Button style={{ backgroundColor: "#5e3023", color: "white", width: "100px" }}>
                        Start&nbsp;<img src={Arrow} height="20px" alt="Start"/>
                      </Button>
                    </NavLink> 
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Style>
  )
}
