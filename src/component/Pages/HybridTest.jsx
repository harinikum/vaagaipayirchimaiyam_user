import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Typography } from '@mui/material'
import WestIcon from "@mui/icons-material/West";
import { NavLink } from 'react-router-dom';
import DailyTest from '../../asserts/calendar_3483602.jpg'
import MiniTest from '../../asserts/checklist_3534135.jpg'
import Micro from '../../asserts/exam_8980068.jpg'
import { useState,useEffect } from 'react';
export default function HybridTest() {
    
 
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateRemainingTime() {
    const now = new Date();
    const target = new Date();
    target.setHours(8); // 8:00 AM
    target.setMinutes(55); // 8:55 AM
    target.setSeconds(0); // 0 seconds
    if (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 55)) {
      target.setDate(target.getDate() + 1); // Move to tomorrow
    }
    const difference = target - now;
    return difference > 0 ? difference : 0;
  }

  function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

    const Div={
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width:"200px",
        height:"150px",
        display:"flex",
        justifyContent:"center",
        flexDirection: "column",
        alignItems:"center",
        borderRadius:"10px",
        backgroundColor:'white'
    }
    const datas=[
        {
            img:DailyTest,
            name:"Daily Test",
            path:"/dailyinstruction",
            Time:formatTime(remainingTime)
        },
        {
            img:MiniTest,
            name:"Mini Test",
            path:"/miniinstruction"
        },
        {
            img:Micro,
            name:"Micro Test",
            path:"/microinstruction"
        },
        
        
    ]
  return (
    <div>
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(45deg, #dee7fa,#ECE9FA, #f0f3fc,#e3f6fa), #FFFFFF 50% ",
        height:'100vh'
        }}
      >
        <Row style={{ marginTop: "100px", justifyContent: "center" }}>
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: 600,
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            <NavLink to="/home" style={{ color: "black" }}>
              <WestIcon />
            </NavLink>
            &nbsp;Hybrid Test
          </Typography>
          {datas.map((d) => {
            return (
              <>
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "350px",
                    marginBottom: "100px",
                  }}
                >
                  <NavLink
                    to={d.path}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div style={Div}>
                      <div>
                        <img src={d.img} height="65px" />
                      </div>
                      <div >
                        <Typography style={{ fontWeight: 600 }}>
                          {d.name}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          style={{ fontSize: "12px", fontWeight: 600 }}
                        >
                          {d.Time}
                        </Typography>
                      </div>
                    </div>
                  </NavLink>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
