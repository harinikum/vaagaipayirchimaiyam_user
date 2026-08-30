import { Typography } from '@mui/material'
import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import BG from '../../asserts/About.png'
import CheckIcon from '@mui/icons-material/Check';
import Mission from '../../asserts/mission.webp'
import Vision from '../../asserts/mission.png'
import Update from '../../asserts/rb_15449.png'
import Teacher from '../../asserts/13404833_5211205.png'
import PG from '../../asserts/PG TRB TAMIL.png';
import UG from '../../asserts/UG TRB TAMIL.png';
import KT from '../../asserts/KATTAYA TAMILPADA THERVU.png';
import UGC from '../../asserts/UGC NET.png'
import Footer from '../footer';


export default function AboutUs() {
  const MainContainer={
    background:`url(${BG})`,
    height:"50vh",
    backgroundSize:"cover",
  }
  const MainCol={
    display:"flex",
    backgroundColor:"rgba(255, 255, 255, 0.301)",
    height:"70vh",
    width:"98vw",
    alignItems:"center"
  }
  const MainDiv={
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    width:"99vw",
  }
  const ColStyle={
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
  return (
    <div>
      <Container fluid style={MainContainer}>
        <Row>
          <Col style={MainCol}>
            <div style={MainDiv}>
           
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid style={{marginTop:"30px"}}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={ColStyle}>
            <div>
              <img src={Teacher} height="220px"/>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={ColStyle}>
          <div style={{marginTop:"40px"}}>
              <Typography variant='h5' style={{paddingBottom:"20px",fontWeight:600}}>வாகை ஆசிரியரைப் பற்றி….</Typography>
              <div style={{width:"90%"}}>
              <ul style={{textAlign:"justify",listStyleType:"none"}}>
                <li>
                ●   2013-14 PG TRB (STATE RANK )</li>
                <li>
                ●   NET தேர்வில் 3 முறையும்  
(JUNE 2006,JUNE,DEC.2007)
</li>
                <li>
                ●		JRF - TAMIL (JUNE 2013)</li>
                <li>
                ●	  SET தேர்வு  EDUCATION  (OCT 2012)</li>
                <li>
                ●   TET தேர்வு (AUG 2013) தேர்ச்சி பெற்றுள்ளார்</li>
                <li>●பணி அனுபவம்: 5 ஆண்டுகள் கல்லூரியில் உதவிப் பேராசிரியராக கல்வியியல் கல்லூரிகளில் பணியாற்றி உள்ளார் </li>
                <li>
                ●	  2014 முதல் முதுகலைத் தமிழாசிரியராக பள்ளியில் பணியாற்றி வருகிறார் </li>
                <li>
                ●பல்வேறு ஆய்வுக் கட்டுரைகளை தமிழ் இலக்கியம், மொழி, இலக்கணம், கல்வியியல் குறித்து எழுதியுள்ளார்</li>
                

                
              </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container  style={{marginTop:"30px"}}>
        <Row>
          <Col xs={{order:2}} sm={{order:2}}  lg={{order:1}} xl={{order:1}} md={{ order: 1 }} style={ColStyle}>
            <div>
              <Typography variant='h5' style={{paddingBottom:"20px",fontWeight:600}}>PG-TRB தமிழ் </Typography>
              <Typography style={{textAlign:"justify"}}> தமிழக அரசுப்பள்ளிகள் பயிலும் 11 மற்றும் 12 வகுப்பு மாணவர்களுக்கு கற்பிப்பதற்கான ஆசிரியர்ளை தேர்ந்தெடுப்பதன் பொருட்டு தமிழ்நாடு அரசு ஆசிரியர் தேர்வு வாரியம் மூலமாக தேர்வினை காலிப்பணியிடங்களுக்கேற்ப நடத்தி ஆசிரியர்களை நியமிக்கிறது. தமிழ்ப்பாடத்தில் முதுகலைப் பட்டமும் இளங்கலைக் கல்வியியலும் (M.A.,B.Ed,) படித்து முடித்தவர்கள் இத்தேர்வினை எழுதும் தகுதி உடையவர்கள் ஆவர். இத்தேர்வில் கொள்குறி வகையில் (MCQ) 150 வினாக்கள் கொண்டது முதன்மைப்பாடத்தில் 110 கல்வியியல் மற்றும் உளவியல் பாடத்தில் -30, பொது அறிவு - 10 என 150 மதிப்பெண்கள் கொண்டதாகும். </Typography>
              {/* <Typography><img src={Tick}/>&nbsp; Enterprise is the way,  </Typography>
              <Typography><img src={Tick}/>&nbsp; Hard work is the solution </Typography> */}
            </div>
          </Col>
          <Col  xs={12} sm={12} md={6}  lg={{order:2}} xl={{order:2}} style={ColStyle}>
          <div>
          <img src={PG} height="200px"/>
          </div>
          </Col>
        </Row>
      </Container>
      <Container fluid style={{backgroundColor:"#f3e9dc",marginTop:"30px"}}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={ColStyle}>
            <div>
              <img src={UG} height="200px"/>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={ColStyle}>
          <div style={{marginTop:"40px"}}>
              <Typography variant='h5' style={{paddingBottom:"20px",fontWeight:600}}>UG-TRB - தமிழ்</Typography>
              <div style={{width:"90%"}}>
              <ul style={{textAlign:"justify",listStyleType:"none"}}>
                <li>
                  தமிழ்நாடு அரசு பள்ளிளியில்.6-10 வகுப்புகள் வரை மொழிப்பாடம் கற்பிப்பதற்காக ஆசிரியர் தகுதித் தேர்வில் (TNTET-Paper-2) தேர்ச்சிபெற்றவர்ளை பட்டதாரி ஆசிரியர்களாக நியமனம் செய்யும் பொருட்டு ஆசிரியர் தேர்வு வாரியம் மூலம் UG - TRB- நியமனத்தேர்வு நடத்துகிறது இதில் தேர்வாகும் பட்டதாரிகள் இளங்கலை ஆசிரியர்களாகவும்( BT ASSISTANT), வட்டார வளமைய அலுவலராகவும் (BRTE) நியமிக்கப்படுவர் </li><br/>
                
              </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container  style={{marginTop:"30px"}}>
        <Row>
          <Col xs={{order:2}} sm={{order:2}}  lg={{order:1}} xl={{order:1}} md={{ order: 1 }} style={ColStyle}>
            <div>
              <Typography variant='h5' style={{paddingBottom:"20px",fontWeight:600}}>கட்டாயத் தமிழ்ப்பாடத் தேர்வு  </Typography>
              <Typography style={{textAlign:"justify"}}>தமிழ்நாடு அரசு ஆசிரியர் தேர்வு வாரியம் மற்றும் தமிழ்நாடு அரசு பணியாளர் தேர்வாணையம் மூலம் நடத்தப்படும் அனைத்து தேர்வுகளுக்கும் தமிழ்ப் பாடத்தில் கட்டாய தகுதித்தேர்வு நடத்துகிறது. எந்த விதமான  பணி நியமனத்திற்காக  தேர்வு எழுதினாலும் இத்தேர்வில் கேட்கப்படும் 30 வினாக்களில் தேர்ச்சிக்குரிய மதிப்பெண்களை எடுத்த பிறகே முதன்மை பாடத்தின் மதிப்பெண்கள் மூலம் பணி நியமனம் பெற முடியும் எனவே அத்தகுதித் தீர்வுக்கு  எங்களது வாகை பயிற்சி மய்யத்தில் சிறப்பு பயிற்சி மற்றும் தேர்வுகள் மூலம் தேர்வர்களுக்கு வாகை வழிகாட்டுகிறது. </Typography>
      
            </div>
          </Col>
          <Col  xs={12} sm={12} md={6}  lg={{order:2}} xl={{order:2}} style={ColStyle}>
          <div>
          <img src={KT} height="200px"/>
          </div>
          </Col>
        </Row>
      </Container>
      
      <Container fluid style={{backgroundColor:"#f3e9dc"}}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={ColStyle}>
          <div>
            <img src={UGC} height="200px"/>
          </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={ColStyle}>
          <div style={{marginTop:"40px"}}>
              <Typography variant='h5' style={{paddingBottom:"20px",fontWeight:600}}>UGC-NET</Typography>
              <div style={{width:"90%"}}>
              <ul style={{textAlign:"justify",listStyleType:"none"}}>
                <li>  மத்திய அரசு நிறுவனமான UGC நடத்தும் கல்லூரி உதவிப்  பேராசிரியர்களுக்கான தகுதித்தேர்வை ஆண்டுக்கு இரண்டு முறை நடத்துகிறது.. இத்தேர்வில் வெற்றி பெறுபவர்கள் கல்லூரி உதவிப் பேராசிரியர்களாக தகுதி பெறுவதோடு JRF எனப்படும் உதவித்தொகையுடன் கூடிய ஆராய்ச்சிப் படிப்புக்கும் (Ph.D.,) தகுதி பெறுவர். தமிழக அரசு நடத்தும் கல்லூரி உதவிப் பேராசிரியர் நியமனத்தேர்வு  எழுத இத்தேர்வில் தேர்ச்சி  அவசியம்.   </li><br/>
               
              </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  )
}
