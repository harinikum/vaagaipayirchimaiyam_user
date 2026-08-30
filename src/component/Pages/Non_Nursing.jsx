import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Typography } from '@mui/material'
import WestIcon from "@mui/icons-material/West";
import { NavLink } from 'react-router-dom';
import { axiosInstance } from '../Api/instance';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
export default function Non_Nursing() {
  const Div = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: 'white'
  }
  const container = {
    backgroundColor: '#f3e9dc',
    padding: 20,
    height: "100vh",
  };
  const [datas, setDatas] = useState([]);
  const email = localStorage.getItem("userMail");
  const { Endpoint } = useContext(UserContext);
  const Navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewNonNursingCategory.php`,
        {
          userId: email
        }
      );
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          Navigate('/signin');
        }

        const obj = response.data.map((data) => ({
          img: `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${data.img}`,
          name: data.category_name,
          path: `/noninstruction/${data.sno}`,
          sno: data.sno
        }));
        setDatas(obj);
        console.log(datas);


      }


    } catch (error) {
      // console.log(data);
      console.error("Error fetching data:", error);
    }
  };

  const handleItemClick = (path, name, sno) => {
    localStorage.setItem("selectedItemPath", path);
    localStorage.setItem("selectedItemName", name);
    localStorage.setItem("selectedSno", sno);
    Navigate("/card");
  };

  return (
    <div>

      <Container fluid style={container} >
        <Row style={{ marginTop: "20px", justifyContent: "center" }}>
          <Typography style={{ fontSize: "20px", fontWeight: 600, textAlign: "center", paddingBottom: "20px" }}><NavLink to="/home" style={{ color: "black" }}><WestIcon /></NavLink>&nbsp;UG-TRB</Typography>
          {
            datas.map((d) => {
              return (
                <>
                  <Col xs={12} sm={12} md={6} lg={3} xl={3} style={{ justifyContent: "center", marginBottom: "20px" }} >
                    <div
                      onClick={() => handleItemClick(d.path, d.name, d.sno)}
                      style={{ color: "black", textDecoration: "none", cursor: "pointer" }}
                    >
                      <div style={Div}>
                        <div>
                          <img src={d.img} height="65px" />
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                          <Typography style={{ fontWeight: 600 }}>{d.name}</Typography>
                        </div>
                      </div>
                    </div>
                  </Col>
                </>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}
