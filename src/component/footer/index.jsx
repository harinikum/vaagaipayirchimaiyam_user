import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Phone from '../../asserts/system-regular-58-call-phone.gif'
import Mail from '../../asserts/wired-outline-177-envelope-send.gif'
import Facebook from '../../asserts/facebook.png'
import Insta from '../../asserts/instagram.png'
import { axiosInstance } from '../Api/instance'
import { useEffect,useState } from 'react'
import Logo from '../../asserts/Artboard 1 copy 4.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Context' 
import './index.css'
import { useLocation } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom'
export default function Footer() { 
    const [data, setData] = useState([]);
    const {Endpoint}=useContext(UserContext);
    const email=localStorage.getItem("userMail");
    const Navigate=useNavigate();
    const location = useLocation();

    const getHref = (path) => {
        return location.pathname === "/home" ? `#${path}` : `/home/#${path}`;
    };
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          `get/U_ViewStaticInfo.php`,
          {
            userId:email
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

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/Vaagai Mayyam.apk'; 
        link.download = 'Vaagai Mayyam.apk'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    const Col1={
        margin:"10px",
        color:"white",
        display:"flex",
        justifyContent:"space-between"
    }
    const MainContainer={
        backgroundColor:"black",
        borderTopLeftRadius:"20px",
        borderTopRightRadius:"20px"
    }
  return (
    <div>
    <Container fluid style={MainContainer}>
        <Row>
            <Col xs={12}>
                <div style={Col1} >
                <div>
                <img src={Logo} height="80px"/>&nbsp;&nbsp;
                <b> வாகை பயிற்சி மய்யம்</b> 
                </div>
               <div style={{backgroundColor:"white",color:"black",padding:"5px",height:"50px",borderRadius:"5px"}}>
                   <button   style={{border:"none",backgroundColor:"white",height:"40px"}} onClick={handleDownload}> Download App <DownloadIcon/> </button>
                </div>
                </div>
                
            </Col>
        </Row>
        <Row style={{paddingLeft:"10px",marginTop:"10px"}}>
            <Col xs={12} sm={5} md={6} lg={3} xl={3}>
            <div style={{color:"white"}}>
                content
                <div> 
                <ul style={{ listStyleType: "none", color: "gray", paddingLeft: "0px" }}>
                <li><a href={getHref("category")} className='nav'>Category</a></li>
            
            <NavLink to="/about" className='nav'>
                <li>About</li>
            </NavLink>
            <NavLink to="/courses" className='nav'>
                <li>Courses</li>
            </NavLink>
           
                <li><a href={getHref("ad")} className='nav'>Achievements</a></li>
           
        </ul>
                </div>
            </div>
            </Col>
            <Col xs={12} sm={7} md={6} lg={3} xl={3}>
            <div style={{color:"white"}}>
                Contact Us
                <div>
                {Array.isArray(data) && data.map((d) => (
    <ul style={{ listStyleType: "none", color: "gray", paddingLeft: "0px" }}>
        <li><img src={Mail} height="25px" alt="mail" />&nbsp;{d.gmaillink}</li>
        <li><img src={Phone} height="25px" alt="phone" />&nbsp;{d.mobibleno}</li>
    </ul>
))}

                </div>
            </div>
            </Col>
            <Col xs={12} sm={5} md={6} lg={3} xl={3}>
            <div style={{color:"white"}}>
                Get Started
                <div>
                    <ul style={{listStyleType:"none",color:"gray",paddingLeft:"0px"}}>
                        <li>Pricing</li>
                        <li>Free Trail</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
            </Col>
            <Col xs={12} sm={7} md={6} lg={3} xl={3}>
            <div style={{color:"white",marginBottom:"20px"}}>
                Stay Connected
                <div style={{marginTop:"3px"}}>
                    <a href='https://www.instagram.com/vaagaipayirchimayym/profilecard/?igsh=MTluOWs2MXg0cHVxeg==' target='_blank'><img src={Insta} height="30px"/></a>
                    &nbsp;&nbsp;<a href='https://www.facebook.com/profile.php?id=61571203583019&mibextid=ZbWKwL' target='_blank'><img src={Facebook} height="30px"/></a>
                </div>
            </div>
            </Col>
           
        </Row>  
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <p style={{color:"gray"}}>@ Copyright <span style={{color:"white"}}>&nbsp; வாகை பயிற்சி மய்யம்</span> All rights reserved</p>
        <p style={{color:"gray"}}>Designed by <a href='https://www.vebbox.com/' target='_blank' style={{color:"white",textDecoration:"none"}}>VEBBOX SOFTWARE SOLUTIONS</a></p>

        </div>
    </Container>
    
    </div>
  )
}
