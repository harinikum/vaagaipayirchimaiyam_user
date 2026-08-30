import React from "react";
import Navbar from "../Navbar/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Courses from "../Pages/Courses";
import AboutUs from "../Pages/AboutUs";
import LandingPage from "../LandingPage";
import Signup from "../Signup";
import FreeTrail from "../FreeTrail/trail";
import Plan from "../premium/Plan";
import ContactUs from "../Pages/ContactUs";
// import Notification from "../SmsNotification/MainComp";
import SigninPage from "../Signin";
import PricingPlan from "../premium/PricingPlan";
import Profile from "../Pages/Profile";
import YearMCQ from "../Pages/YearMCQ";
import Subject from "../Pages/Subject";
import Non_Nursing from "../Pages/Non_Nursing";
import ModelTest from "../Pages/ModelTest";
import HybridTest from "../Pages/HybridTest";
import Discussion from "../Pages/Discussion";
import Test from "../Test/index";
import Instruction from "../../YearTestPaper/Instruction";
import Year1 from "../Test/Year1";
import SubInstruction from "../../SubjectModel/instruction";
import SubTest from "../../SubjectModel/subTest";
// import FinalTest from "../../SubjectModel/finalTest";
import NonInstruction from "../../Non_nursingTest/Instruction";
import AptitudeTest from "../../Non_nursingTest/AptitudeTest";
import ModelInstruction from "../../ModelMockTest/Instruction";
import InstitutionTest from "../../ModelMockTest/InstitutionTest";
import TestPage from "../../DailyTest/TestPage";
import Content from "../../CourseContent/Content";
import Forget from "../Forget/forgetPassword";
import Otp from "../OTP/otp";
import MiniInstruction from "../../MiniTest/Instruction";
import MiniTest from "../../MiniTest/miniTest";
import MicroInstruction from "../../MicroTest/Insruction";
import MicroTest from "../../MicroTest/microTest";
import DailyInstruction from "../../DailyTest/Insruction";
import PrivateRouter from "../Router/PublicRouter";
import Prelims from "../Pages/Prelims";
import Mains from "../Pages/Mains";
import PrelimsInstruction from "../../Prelims/instruction";
import MainsInstruction from "../../Mains/instruction";
import PrelimsTest from "../../Prelims/PrelimsTest";
import MainsTest from "../../Mains/MainsTest";
import YearTest from "../Test/YearTest";
import BlockBackNavigation from "./blcokback";
import BlockRefresh from "./blockrefresh";
import Card from "../Pages/card/card";
import Materials from "../Pages/Materials";
import PGV from "../Pages/videos/pg";
import UGV from "../Pages/videos/ug";
import TNTETV from "../Pages/videos/tntet";
import TNSETV from "../Pages/videos/tnset";
import FREEV from "../Pages/videos/free";
import KTV from "../Pages/videos/kt";
const MainComponent = () => {
  return (
    <Router>
      <div>
        {/* <BlockBackNavigation /> */}
        <Navbar />
        <Routes>
          <Route path="/freevideos" element={<FREEV />} />
          <Route path="/tnsetvideos" element={<TNSETV />} />
          <Route path="/ktvideos" element={<KTV />} />
          <Route path="/tntetvideos" element={<TNTETV />} />
          <Route path="/ugvideos" element={<UGV />} />
          <Route path="/pgvideos" element={<PGV />} />
          <Route path="/card" element={<Card />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/trail" element={<FreeTrail />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/pricingplan" element={<PricingPlan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/year" element={<YearMCQ />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/non_nursing" element={<Non_Nursing />} />
          <Route path="/model" element={<ModelTest />} />
          <Route path="/hybrid" element={<HybridTest />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/yeartest/:sno/:paperid" element={<YearTest />} />
          <Route path="/instruction/:sno" element={<Instruction />} />
          <Route path="/year1" element={<Year1 />} />
          <Route path="/subinstruction/:sno" element={<SubInstruction />} />
          <Route
            path="/subtest/:sno/:paperid"
            element={
              <>
                <BlockRefresh />
                <BlockBackNavigation />
                <SubTest />
              </>
            }
          />
          <Route path="/noninstruction/:sno" element={<NonInstruction />} />
          <Route
            path="/aptitudetest/:sno/:paperid"
            element={<AptitudeTest />}
          />
          <Route path="/modelinstruction/:sno" element={<ModelInstruction />} />
          <Route
            path="/institutiontest/:sno/:paperid"
            element={
              <>
                <BlockRefresh />
                <BlockBackNavigation />
                <InstitutionTest />
              </>
            }
          />
          <Route path="/testpage/:sno" element={<TestPage />} />
          <Route path="/content/:sno" element={<Content />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/miniinstruction" element={<MiniInstruction />} />
          <Route path="minitest/:sno" element={<MiniTest />} />
          <Route path="/microinstruction" element={<MicroInstruction />} />
          <Route path="/microtest/:sno" element={<MicroTest />} />
          <Route path="/dailyinstruction" element={<DailyInstruction />} />
          <Route path="/prelims" element={<Prelims />} />
          <Route path="/mains" element={<Mains />} />
          <Route
            path="/prelimsinstruction/:sno"
            element={<PrelimsInstruction />}
          />
          <Route path="/mainsinstruction/:sno" element={<MainsInstruction />} />
          <Route path="/prelimstest/:sno/:paperid" element={<PrelimsTest />} />
          <Route
            path="/mainstest/:sno/:paperid"
            element={
              <>
                <BlockRefresh />
                <BlockBackNavigation />
                <MainsTest />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default MainComponent;
