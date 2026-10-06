import { Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Arrow from "../asserts/system-regular-161-trending-flat.gif";
import AnswerBtn from "../SubjectModel/AnswerBtn";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Share1 from "../asserts/system-regular-1-share.gif";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Correct from "../asserts/Component 322 – 3.png";
import Rong from "../asserts/Component 26 – 5.png";
import Web from "../asserts/_x36__stroke.png";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../component/Api/instance";
import { UserContext } from "../Context";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CountdownTimer from "./Countdown";
import ReviewModal from "../component/Test/ReviewModal";
function Aptitude() {
  const styles = {
    mainContainer: {
      backgroundColor: "white",
      width: "94%",
      height: "50px",
      borderTopRightRadius: "10px",
      borderTopLeftRadius: "10px",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
    title: {
      display: "flex",
      backgroundColor: "white",
      width: "100%",
      justifyContent: "space-between",
      padding: "10px",
      marginBottom: "50px",
      height: "50px",
      // borderTopRightRadius: "10px",
      // borderTopLeftRadius: "10px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      zIndex: "1",
    },
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
    alignItems: "center",
  };
  const Btn2 = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #5e3023 ",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
  };
  const Btn1 = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #5e3023 ",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width: "150px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const PreviewBtn = {
    backgroundColor: "#5e3023",
    color: "white",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "7px",
    borderRadius: "5px",
  };
  const AlertBtn = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    width: "100px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    padding: "7px",
    alignItems: "center",
  };
  const Share = {
    backgroundColor: "#5e3023",
    color: "white",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "7px",
    borderRadius: "5px",
  };
  const Finsh = {
    backgroundColor: "#5e3023",
    color: "white",
    border: "none",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    width: "200px",
    alignItems: "center",
  };
  const noCopyStyle = {
    userSelect: "none",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    MsUserSelect: "none",
    fontFamily: "Answer",
  };

  const [Previewopen, setPreviewopen] = React.useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const { sno, paperid } = useParams();
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionsNo, setQuestionsNo] = useState([]);
  const [questioncount, setQuestioncount] = useState();
  const [responseData, setResponseData] = useState(null);
  const [responsecount, setResponsecount] = useState(null);
  const email = localStorage.getItem("userMail");
  const { Endpoint } = useContext(UserContext);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchQuestionSno();
  }, []);

  useEffect(() => {
    if (Array.isArray(questionsNo) && questionsNo.length > 0) {
      const first = questionsNo[0];
      const firstQuestionSno =
        first?.sno ?? first?.id ?? first?.question_id ?? first?.questionId ?? (typeof first === "number" || typeof first === "string" ? first : undefined);
      if (firstQuestionSno !== undefined && firstQuestionSno !== null) {
        fetchQuestions(firstQuestionSno);
        setSelectedQuestionIndex(0);
      }
    }
  }, [questionsNo]);

  const location = useLocation();
  const paperName = location.state?.paperName;
  const fetchQuestions = async (questionId) => {
    try {
      const qId =
        typeof questionId === "object" && questionId !== null
          ? questionId.sno || questionId.id || questionId.question_id || questionId.questionId
          : questionId;

      if (!qId) {
        console.warn("⚠️ fetchQuestions called without valid questionId in AptitudeTest:", questionId);
        return;
      }

      const res = await axiosInstance.post(
        `get/U_ViewNonNursingQuestions.php`,
        {
          userId: email,
          categoryId: sno,
          paperId: paperid,
          questionId: qId,
        }
      );
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        } else {
          let parsed = res.data;
          if (typeof parsed === "string") {
            try {
              parsed = JSON.parse(parsed);
            } catch (e) { }
          }
          if (parsed && Array.isArray(parsed.data)) {
            parsed = parsed.data;
          }
          if (!Array.isArray(parsed)) {
            parsed = parsed ? [parsed] : [];
          }
          setQuestions(parsed);
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const [loadingPreview, setLoadingPreview] = useState(false);

  const PreviewhandleClickOpen = () => {
    registerDatas();
    registerDatas1();
    setPreviewopen(true);
  };
  const PreviewhandleClose = () => {
    setPreviewopen(false);
    navigate("/non_nursing");
  };

  const [open, setOpen] = React.useState(false);
  const [finish, setfinish] = React.useState(false);

  const handleClickOpen = () => {
    registerDatas1();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const FinishTest = async () => {
    try {
      await registerDatas(); // Wait for the response
      await TestCount();
      setfinish(true);
    } catch (error) {
      console.error("❌ FinishTest error:", error);
    }
  };
  const FinishTestClose = () => {
    setfinish(false);
    navigate("/non_nursing");
  };

  const [CrtBtnopen, setCrtBtnOpen] = React.useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Define selected option index state
  const [selectedOption, setSelectedOption] = useState(""); // Define selected option state
  const [questionStatus, setQuestionStatus] = useState([]);
  const [optionIndexMapping, setOptionIndexMapping] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const CrtClickOpen = () => {
    setCrtBtnOpen(true);
  };

  const CrtClickClose = () => {
    setCrtBtnOpen(false);
  };

  const fetchFallbackPreview = async () => {
    try {
      if (!questionsNo || questionsNo.length === 0) return [];
      const allPromises = questionsNo.map(async (item, index) => {
        try {
          const res = await axiosInstance.post(`get/U_ViewNonNursingQuestions.php`, {
            userId: email,
            categoryId: sno,
            paperId: paperid,
            questionId: item.sno,
          });
          if (res.status === 200 && res.data && res.data[0]) {
            const qData = res.data[0];
            const studentAns = selectedOptions[index] || "";
            let correctAns =
              qData.answer ||
              qData.correct_answer ||
              qData.c_ans ||
              qData.correct ||
              qData.answers ||
              qData.ans ||
              qData.right_answer ||
              qData.crt_ans ||
              "";

            if (!correctAns) {
              for (const [k, v] of Object.entries(qData)) {
                const lk = k.toLowerCase();
                if (
                  (lk.includes("ans") || lk.includes("correct") || lk.includes("right")) &&
                  lk !== "student_answer" &&
                  lk !== "user_answer" &&
                  v &&
                  String(v).trim() !== ""
                ) {
                  correctAns = String(v).trim();
                  break;
                }
              }
            }

            const lowerC = String(correctAns).trim().toLowerCase();
            if (lowerC === "a" || lowerC === "1" || lowerC === "option1" || lowerC === "opt1") {
              correctAns = qData.option1 || correctAns;
            } else if (lowerC === "b" || lowerC === "2" || lowerC === "option2" || lowerC === "opt2") {
              correctAns = qData.option2 || correctAns;
            } else if (lowerC === "c" || lowerC === "3" || lowerC === "option3" || lowerC === "opt3") {
              correctAns = qData.option3 || correctAns;
            } else if (lowerC === "d" || lowerC === "4" || lowerC === "option4" || lowerC === "opt4") {
              correctAns = qData.option4 || correctAns;
            }

            return {
              question_id: item.sno,
              questions: qData.questions || qData.question || "",
              image: qData.image || "",
              option1: qData.option1 || "",
              option2: qData.option2 || "",
              option3: qData.option3 || "",
              option4: qData.option4 || "",
              student_answer: studentAns,
              correct_answer: correctAns,
            };
          }
        } catch (e) {
          console.error("Error fetching fallback question in AptitudeTest:", e);
        }
        return null;
      });
      return (await Promise.all(allPromises)).filter(Boolean);
    } catch (err) {
      console.error("Error generating fallback preview in AptitudeTest:", err);
      return [];
    }
  };

  const registerDatas = async () => {
    setLoadingPreview(true);
    let dataFound = false;
    try {
      const res = await axiosInstance.post(`get/U_viewNonNursingPreview.php`, {
        userId: email,
        category_id: sno,
        paper_id: paperid,
      });
      console.log("🔍 registerDatas response:", res.data);
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        }
        let list = [];
        if (Array.isArray(res.data) && res.data.length > 0) {
          list = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          list = res.data.data;
        }

        if (list.length > 0) {
          const getQId = (item) => {
            if (item === undefined || item === null) return "";
            if (typeof item === "object") {
              return String(item.sno ?? item.question_id ?? item.id ?? item.questionId ?? item.q_id ?? "").trim();
            }
            return String(item).trim();
          };

          const orderMap = new Map();
          if (Array.isArray(questionsNo) && questionsNo.length > 0) {
            questionsNo.forEach((item, index) => {
              const qId = getQId(item);
              if (qId && !orderMap.has(qId)) {
                orderMap.set(qId, index);
              }
            });
          }

          const formatted = list.map((q, idx) => {
            const qId = getQId(q);
            const orderIdx = orderMap.has(qId) ? orderMap.get(qId) : idx;
            const studentAns =
              q.student_answer || q.user_answer || q.u_ans || (selectedOptions && selectedOptions[orderIdx]) || "";
            let correctAns =
              q.correct_answer || q.answer || q.c_ans || q.correct || q.answers || q.ans || "";
            if (!correctAns) {
              for (const [k, v] of Object.entries(q)) {
                const lk = k.toLowerCase();
                if (
                  (lk.includes("ans") || lk.includes("correct") || lk.includes("right")) &&
                  lk !== "student_answer" &&
                  lk !== "user_answer" &&
                  v &&
                  String(v).trim() !== ""
                ) {
                  correctAns = String(v).trim();
                  break;
                }
              }
            }
            const lowerC = String(correctAns).trim().toLowerCase();
            if (lowerC === "a" || lowerC === "1" || lowerC === "option1") {
              correctAns = q.option1 || correctAns;
            } else if (lowerC === "b" || lowerC === "2" || lowerC === "option2") {
              correctAns = q.option2 || correctAns;
            } else if (lowerC === "c" || lowerC === "3" || lowerC === "option3") {
              correctAns = q.option3 || correctAns;
            } else if (lowerC === "d" || lowerC === "4" || lowerC === "option4") {
              correctAns = q.option4 || correctAns;
            }

            return {
              ...q,
              questions: q.questions || q.question || "",
              image: q.image || "",
              option1: q.option1 || q.opt1 || "",
              option2: q.option2 || q.opt2 || "",
              option3: q.option3 || q.opt3 || "",
              option4: q.option4 || q.opt4 || "",
              student_answer: studentAns,
              correct_answer: correctAns,
            };
          });

          if (orderMap.size > 0) {
            formatted.sort((a, b) => {
              const idA = getQId(a);
              const idB = getQId(b);
              const orderA = orderMap.has(idA) ? orderMap.get(idA) : 999999;
              const orderB = orderMap.has(idB) ? orderMap.get(idB) : 999999;
              return orderA - orderB;
            });
          }

          const hasValidAnswers = formatted.some(
            (item) => item.correct_answer && String(item.correct_answer).trim() !== "" && item.correct_answer !== "N/A"
          );
          const hasValidOptions = formatted.some((item) => item.option1 && String(item.option1).trim() !== "");

          if (hasValidAnswers && hasValidOptions) {
            setResponseData(formatted);
            dataFound = true;
          }
        }
      }
    } catch (err) {
      console.error("❌ registerDatas error:", err);
    }

    if (!dataFound) {
      const fallback = await fetchFallbackPreview();
      if (fallback.length > 0) {
        setResponseData(fallback);
      }
    }
    setLoadingPreview(false);
  };

  useEffect(() => {
    Institution();
  }, []);

  const TestCount = async () => {
    try {
      const response = await axiosInstance.post(`post/U_Testtime.php`, {
        id: email,
        institution_id: sno,
        paper_id: paperid,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Institution = async () => {
    try {
      const response = await axiosInstance.post(`get/U_ViewStaticInfo.php`, {
        userId: email,
      });
      if (response.status === 200) {
        if (response.data.message === "timeout") {
          navigate("/signin");
        }
        setWhatsapp(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const registerDatas1 = async () => {
    try {
      const res = await axiosInstance.post(`get/U_NonNursingMark.php`, {
        userId: email,
        category_id: sno,
        paper_id: paperid,
      });
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        }
        if (Array.isArray(res.data)) {
          setResponsecount(res.data);
          console.log(res.data);
          // setErrorMessage(null);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      }
    } catch (err) {
      // setErrorMessage("Failed to fetch data. Please try again later."); // Set error message

      console.error("Error fetching data:", err);
    }
  };
  const handleQuestionChange = async (index) => {
    if (Array.isArray(questionsNo) && index >= 0 && index < questionsNo.length) {
      const current = questionsNo[index];
      const selectedSno =
        current?.sno ?? current?.id ?? current?.question_id ?? current?.questionId ?? current;
      if (selectedSno !== undefined && selectedSno !== null) {
        fetchQuestions(selectedSno);
        setSelectedQuestionIndex(index);
        if (index === questionsNo.length - 1) {
          const prev = questionsNo[selectedQuestionIndex];
          const prevSno =
            prev?.sno ?? prev?.id ?? prev?.question_id ?? prev?.questionId ?? prev;
          if (prevSno) {
            await registerDatatest(prevSno);
          }
        }
      }
    }
  };
  const fetchQuestionSno = async () => {
    try {
      const res = await axiosInstance.post(
        `get/U_ViewNonNursingQuestionCount.php`,
        {
          userId: email,
          categoryId: sno,
          paperId: paperid,
        }
      );
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        }
        let parsed = res.data;
        if (typeof parsed === "string") {
          try {
            parsed = JSON.parse(parsed);
          } catch (e) {
            console.error("Error parsing res.data in fetchQuestionSno:", e);
          }
        }
        if (parsed && Array.isArray(parsed.data)) {
          parsed = parsed.data;
        }
        if (!Array.isArray(parsed)) {
          parsed = [];
        }
        setQuestionsNo(parsed);
        const count = parsed.length;
        setQuestioncount(count);

        console.log("Parsed Aptitude questionsNo:", parsed);
        setSelectedQuestionIndex(0);
      }
    } catch (error) {
      console.error("Error fetching question numbers:", error);
    }
  };
  const handleNextQuestion = async () => {
    const nextIndex = selectedQuestionIndex + 1;
    if (Array.isArray(questionsNo) && nextIndex < questionsNo.length) {
      const nextItem = questionsNo[nextIndex];
      const selectedSno =
        nextItem?.sno ?? nextItem?.id ?? nextItem?.question_id ?? nextItem?.questionId ?? nextItem;

      // Save current question data
      const curItem = questionsNo[selectedQuestionIndex];
      const curSno =
        curItem?.sno ?? curItem?.id ?? curItem?.question_id ?? curItem?.questionId ?? curItem;
      if (curSno) {
        await registerDatatest(curSno);
      }

      // Fetch the next question
      if (selectedSno !== undefined && selectedSno !== null) {
        await fetchQuestions(selectedSno);
      }
      setSelectedQuestionIndex(nextIndex);

      // Preselect the previously selected option for the next question (if available)
      setSelectedOption(selectedOptions[nextIndex] || ""); // Get saved option for next question
      setSelectedOptionIndex(
        optionIndexMapping[selectedOptions[nextIndex]] || null
      ); // Use saved index or null

      // Update question status
      setQuestionStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[selectedQuestionIndex] = selectedOptions[
          selectedQuestionIndex
        ]
          ? "answered"
          : "skipped";
        return newStatus;
      });
    } else if (nextIndex === questionsNo.length) {
      // Handle the last question case
      await registerDatatest(questionsNo[selectedQuestionIndex].sno);
      setQuestionStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[selectedQuestionIndex] = selectedOption
          ? "answered"
          : "skipped";
        return newStatus;
      });
      // Optionally, navigate to a different page or show a message
    }
  };
  const registerDatatest = async (questionId) => {
    // const userID = await AsyncStorage.getItem("userMail");
    try {
      const res = await axiosInstance.post(`put/U_updateNonNursingAns.php`, {
        id: email,
        question_id: questionId,
        answer: selectedOption,
      });
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        }
        console.log(res.data);
        setSelectedOption("");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSkipQuestion = async () => {
    // Update status for the current question
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[selectedQuestionIndex] = "skipped";
      return newStatus;
    });

    // Call handleNextQuestion to proceed to the next question
    await handleNextQuestion();
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
      [selectedQuestionIndex]: optionIndex,
    }));

    console.log("Selected option data:", selectedOptionText);
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
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Active = {
    cursor: "pointer",
    transition: "transform 0.3s ease", // Smooth transition
    transform: "scale(1)", // Normal size (zoomed out)
    width: "auto", // Adjust width to original image size
    height: "150px", // Default height
  };

  const DisActive = {
    cursor: "pointer",
    transition: "transform 0.3s ease", // Smooth transition
    transform: "scale(1.5)", // Zoomed-in size
    width: "auto",
    height: "200px", // Adjust height when zoomed in
    marginLeft: "120px",
  };

  const handleClick = () => {
    if (windowWidth > 600) {
      swapping();
    }
  };

  const isImage = (url) => {
    return url && url.match(/\.(jpeg|jpg|gif|png|svg|webp|jfif)$/) != null;
  };
  const BASE_URL =
    "https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/";

  return (
    <div
      style={{
        backgroundColor: "#F2F1EB",
        paddingTop: "40px",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Container fluid style={styles.mainContainer}>
        <Row>
          <Col lg={12} style={{ display: "flex", justifyContent: "center" }}>
            <div className="wrap" style={styles.title}>
              <div>
                <Typography style={{ fontWeight: 600 }}>{paperName}</Typography>
              </div>
              <div>
                <CountdownTimer paper={paperid} subjectId={sno} />
              </div>
              <div>
                <Typography style={{ fontWeight: 600 }}>
                  {selectedQuestionIndex + 1}/{questionsNo.length}
                </Typography>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid style={{ padding: "0px" }}>
        <Row style={{ justifyContent: "center" }}>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            style={{ backgroundColor: "#f3e9dc" }}
          >
            <div style={{ paddingTop: "30px" }}>
              <div>
                {questions[0] ? (
                  <div style={noCopyStyle}>
                    <p style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                      {`${selectedQuestionIndex + 1}. ${questions[0].questions
                        }`}
                    </p>

                    {/* Debugging Image URL */}
                    {console.log(
                      "Image URL:",
                      `https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${questions[0].image
                        ?.trim()
                        .replace("../upload/", "")}`
                    )}

                    {/* Display question image */}
                    {questions[0].image ? (
                      <img
                        src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${encodeURIComponent(
                          questions[0].image.trim().replace("../upload/", "")
                        )}`}
                        height="100px"
                        alt="Uploaded Image"
                        onClick={handleClick}
                        style={colorSwap ? Active : DisActive}
                        onError={(e) => {
                          console.error("Image failed to load:", e.target.src);
                          e.target.style.display = "none"; // Hide image if not found
                        }}
                      />
                    ) : null}

                    <ol
                      type="a"
                      style={{ paddingLeft: "0", listStylePosition: "inside" }}
                    >
                      {[1, 2, 3, 4].map((option) => (
                        <li
                          key={option}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
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
                                src={`https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/${encodeURIComponent(
                                  questions[0][`option${option}`]
                                    .trim()
                                    .replace("../upload/", "")
                                )}`}
                                alt={`Option ${option}`}
                                style={{
                                  maxHeight: "80px",
                                  marginLeft: "10px",
                                }}
                                onError={(e) => {
                                  console.error(
                                    `Option ${option} image failed to load:`,
                                    e.target.src
                                  );
                                  e.target.style.display = "none"; // Hide image if not found
                                }}
                              />
                            ) : (
                              <span>{questions[0][`option${option}`]}</span>
                            )}
                          </label>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <p>No question selected</p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  height: "300px",
                  marginBottom: "20px",
                }}
              >
                <Button style={Btn} onClick={handleSkipQuestion}>
                  Skip
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button style={Btn} onClick={handleNextQuestion}>
                  Save & Next <img src={Arrow} height="25px" />
                </Button>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={5}
            xl={5}
            style={{ backgroundColor: "#FEFBE9" }}
          >
            <Typography
              style={{
                fontWeight: 600,
                textAlign: "center",
                paddingTop: "30px",
              }}
            >
              QUESTION STATUS
            </Typography>
            <div
              style={{
                paddingTop: "60px",
                width: "auto",
                marginTop: "30px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      backgroundColor: "green",
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  &nbsp;&nbsp;
                  <span style={{ marginTop: "-3px", fontWeight: 600 }}>
                    Answered
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      backgroundColor: "red",
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  &nbsp;&nbsp;
                  <span style={{ marginTop: "-3px", fontWeight: 600 }}>
                    Skipped
                  </span>
                </div>
              </div>
              {/* <Col xs={12} sm={12} md={12} lg={6} xl={6}> */}
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
                  // marginLeft:"15px"
                }}
              >
                {questionsNo.map((question, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor:
                        questionStatus[index] === "skipped"
                          ? "red"
                          : questionStatus[index] === "answered"
                            ? "green"
                            : "white",
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
                      marginLeft: "30px",
                    }}
                    onClick={() => handleQuestionChange(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* </Col> */}
              <div>
                <div
                  className="d-grid "
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button style={Finsh} size="lg" onClick={handleClickOpen}>
                    FINISH TEST
                  </Button>
                </div>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title"></DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to finish the Test ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      style={Share}
                      onClick={() => {
                        FinishTest();
                      }}
                    >
                      Yes,Finish Test
                    </Button>
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
                  <DialogTitle id="alert-dialog-title"></DialogTitle>
                  {/* <DialogContent>
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

                  </DialogContent> */}

                  <DialogContent>
                    <DialogContentText
                      style={{ fontWeight: 600, color: "black" }}
                    >
                      Thank you, Your test is submitted successfully.
                      {console.log("✅ Debug: responsecount =", responsecount)}
                      {responsecount === null ? (
                        <Typography>Loading data...</Typography>
                      ) : responsecount.length === 0 ? (
                        <Typography>No data available</Typography>
                      ) : (
                        responsecount.map((item, index) => (
                          <div key={index}>
                            <Typography
                              style={{ fontWeight: 500, color: "black" }}
                            >
                              Correct Answer: {item.correct_count}
                            </Typography>
                            <Typography
                              style={{ fontWeight: 500, color: "black" }}
                            >
                              Wrong Answer: {item.incorrect_count}
                            </Typography>
                            <Typography
                              style={{ fontWeight: 500, color: "black" }}
                            >
                              Skipped: {item.skip_count}
                            </Typography>
                            {/* <Typography style={{ fontWeight: 500, color: "black" }}>
                              Negative Mark: {item.negative_marks}
                            </Typography> */}
                            <Typography
                              style={{ fontWeight: 500, color: "black" }}
                            >
                              Total Mark: {item.total_marks}
                            </Typography>
                          </div>
                        ))
                      )}
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button style={PreviewBtn} onClick={PreviewhandleClickOpen}>
                      <VisibilityIcon
                        style={{ fontSize: "20px", marginTop: "4px" }}
                      />
                      &nbsp; Preview
                    </button>
                    <button style={Share}>
                      <img
                        src={Share1}
                        height="20px"
                        style={{ marginTop: "4px" }}
                      />
                      &nbsp;{" "}
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Share Score
                      </a>{" "}
                    </button>
                    <button
                      style={AlertBtn}
                      onClick={FinishTestClose}
                      autoFocus
                    >
                      Done
                    </button>
                  </DialogActions>
                </Dialog>
                <ReviewModal
                  open={Previewopen}
                  onClose={PreviewhandleClose}
                  paperName={paperName || "Aptitude / Non-Nursing MCQ Test"}
                  responseData={responseData}
                  responsecount={responsecount}
                  loadingPreview={loadingPreview}
                  whatsapp={whatsapp}
                  onRetry={() => {
                    registerDatas();
                    registerDatas1();
                  }}
                  BASE_URL={BASE_URL}
                />
              </div>
            </div>
            {/* <Dialog
              open={CrtBtnopen}
              onClose={CrtClickClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Q.No 1
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography style={{ color: "black" }}>Correct Answer :</Typography>
                  <Typography style={{ color: "green" }}>Lorel ipsum Lorel ipsum lorel</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography style={{ color: "black" }}>Your Answer :</Typography>
                  <Typography style={{ color: "black" }}>Lorel ipsum Lorel ipsum lorel</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={Btn2} onClick={CrtClickClose}>Ok</Button>
                
              </DialogActions>
            </Dialog> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Aptitude;
