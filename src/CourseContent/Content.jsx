import { Typography } from '@mui/material'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../YearTestPaper/style.css'
import Nursing from '../asserts/nursing_service.png'
import '../YearTestPaper/style.css'
import { useState, useEffect, useContext } from 'react'
import { axiosInstance } from '../component/Api/instance'
import { useParams } from 'react-router-dom'
import { UserContext } from '../Context'
import { useNavigate } from 'react-router-dom'
export default function Content() {
  const [data, setData] = useState([]);
  const { sno } = useParams();
  const { Endpoint } = useContext(UserContext);
  const Navigate = useNavigate();
  const email = localStorage.getItem("userMail");

  useEffect(() => {
    Institution();
  }, []);

  const Institution = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewCourseContent.php`,
        {
          userId: email,
          id: sno
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }
        setData(response.data);

      }


    } catch (error) {

      console.error("Error fetching data:", error);
    }
  };
  const MainContainer = {
    backgroundColor: "#f3e9dc",
    height: "200px",
    // marginTop:"60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
  }
  const Content = {
    backgroundColor: "white",
    // height:"500px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "10px"

  }
  if (!Array.isArray(data)) {
    return null; // or some other fallback UI if you prefer
  }
  return (
    <>
      {
        Array.isArray(data) && data.length > 0 ? (
          data.map((val) => (
            <div style={{ backgroundColor: "#f3e9dc" }}>
              <Container fluid style={MainContainer}>
                <Row>
                  <Col>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95vw", padding: "20px" }}>
                      <div style={{ width: "700px" }}>
                        <Typography style={{ fontWeight: 600 }}>{val.course_name}</Typography>
                        <Typography>
                          {val.course_description}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <img src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${val.img}`} height="100px" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <div style={{ padding: "20px" }}>
                <Container fluid style={Content}>
                  <Row style={{ padding: "20px" }}>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div>
                        <img src={Nursing} height="250px" />
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                      <div style={{ padding: "20px" }}>
                        <Typography style={{ fontWeight: 600 }}>About this Program</Typography>
                        <Typography style={{ fontWeight: 600, paddingTop: "10px", paddingBottom: "20px" }}>What will you learn : </Typography>
                        <div>
                          <ul style={{ listStyleType: "none", }}>
                            <li>
                              {val.course_about}
                            </li>

                          </ul>
                        </div>
                      </div>

                    </Col>
                  </Row>
                </Container>
              </div>
              {/* <Courses/> */}
            </div>
          ))

        ) : (
          <div>Loading...</div>
        )
      }
    </>
  )
}
