import { Button, Typography } from '@mui/material'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from '../footer'
import Phone from '../../asserts/call (2).gif'
import Email from '../../asserts/mail (2).gif'
import Location from '../../asserts/lo.gif'
import TextField from '@mui/material/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from '../../asserts/mm.gif'
import Party from '../../asserts/party (2).gif'
import { axiosInstance } from '../Api/instance'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
export default function ContactUs() {
  const [data, setData] = useState([]);
  const { Endpoint } = useContext(UserContext);
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [contact, setContact] = useState();
  const [message, setMessage] = useState();
  const email = localStorage.getItem("userMail");
  const Navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(
        `get/U_ViewStaticInfo.php`,
        {
          userId: email
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

  const sendMail = async (toEmail, subject, message) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedMessage = encodeURIComponent(message);
    const url = `http://localhsot/mail/index.php?to_mail=vaagaipayirchimayyam@gmail.com&subject=${encodedSubject}&msg=${encodedMessage}`;

    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        console.log('Mail sent successfully');
      } else {
        console.log('Failed to send mail');
      }
    } catch (error) {
      console.error('Error sending mail:', error);
    }
  };

  const Submit = async () => {
    const contactData = {
      name,
      mail,
      contact,
      message
    };

    try {
      // Sending contact data to your backend or handling it as needed.
      // await axios.post('http://localhost:5000/send', contactData);

      // Sending email notification
      await sendMail(mail, 'New Contact Form Submission', `Name: ${name}\nEmail: ${mail}\nContact: ${contact}\nMessage: ${message}`);

      alert('Message sent successfully!');
      setName("");
      setMail("");
      setContact("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };


  const MainContainer = {
    // marginTop:"65px", 
    backgroundColor: "#f3e9dc",
    padding: "40px"

  }
  const MainCol = {
    marginTop: "10px",
  }
  const form = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
  }
  const Btn = {
    backgroundColor: "#5e3023",
    width: "100%",
    marginTop: "20px",
    color: "white"
  }
  return (
    <div>
      {
        data.map((d) => (
          <Container fluid style={MainContainer}>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6} style={MainCol}>
                <div>
                  <div>
                    <Typography variant='h5'>Contact Us
                      &nbsp;<img src={Message} height="40px" />
                    </Typography>
                    <Typography>Let us know your queries.feedback enquiries.<br />We are here to support you24/7.</Typography>
                  </div>
                  <hr />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div >
                      <img src={Phone} height="40px" />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <Typography>Give us a call</Typography>
                      <Typography>{d.mobibleno}</Typography>
                    </div>
                  </div>
                  <hr />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div >
                      <img src={Email} height="40px" />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <Typography>Write to us</Typography>
                      <Typography>{d.gmaillink}</Typography>
                    </div>
                  </div>
                  <hr />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div >
                      <img src={Location} height="40px" />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <Typography>{d.address}</Typography>
                    </div>
                  </div>
                  <div>
                    <img src={Party} height="70px" style={{ paddingLeft: "60%" }} />
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6} style={MainCol}>
                <div style={form}>
                  <div style={{ color: "#5e3023", }}>
                    <Typography variant='h5' style={{ fontWeight: 600 }}>Say Hello !</Typography>
                    <Typography variant='h5'>Feel free to stop by and say hi !</Typography>
                  </div>
                  <div>
                    <label>Name <span style={{ color: "#5e3023" }}>*</span></label><br />
                    <TextField id="outlined-basic" value={name} variant="outlined" fullWidth onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label>Email <span style={{ color: "#5e3023" }}>*</span></label><br />
                    <TextField id="outlined-basic" value={mail} type='email' variant="outlined" fullWidth onChange={(e) => setMail(e.target.value)} />
                  </div>
                  <div>
                    <label>Contact <span style={{ color: "#5e3023" }}>*</span></label><br />
                    <TextField id="outlined-basic" value={contact} type="number" variant="outlined" fullWidth onChange={(e) => setContact(e.target.value)} />
                  </div>
                  <div>
                    <label>Message <span style={{ color: "#5e3023" }}>*</span></label><br />
                    <TextField id="outlined-basic" value={message} variant="outlined" multiline rows={4} fullWidth onChange={(e) => setMessage(e.target.value)} />
                  </div>
                  <div>
                    <Button style={Btn} onClick={Submit}>SEND</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        ))
      }
      <Footer />
    </div>
  )
}
