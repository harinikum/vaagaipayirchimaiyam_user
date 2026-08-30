import { Typography } from "@mui/material";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Arrow from "../asserts/system-regular-161-trending-flat.gif";
import DialogContentText from "@mui/material/DialogContentText";
import Share1 from "../asserts/system-regular-1-share.gif";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Correct from "../asserts/Component 322 – 3.png";
import Rong from "../asserts/Component 26 – 5.png";
import Web from "../asserts/_x36__stroke.png";
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../component/Api/instance";
import { UserContext } from "../Context";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CountdownTimer from "./Countdown";
import html2pdf from "html2pdf.js";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import ReviewModal from "../component/Test/ReviewModal";
function MainsTest() {
  const MainContainer = {
    // overflowX:"hidden"
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
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "7px",
    borderRadius: "5px",
    width: "100px",
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
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const { sno, paperid } = useParams();
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionsNo, setQuestionsNo] = useState([]);
  const [questioncount, setQuestioncount] = useState();
  const [responseData, setResponseData] = useState(null);
  const [responsecount, setResponsecount] = useState(null);
  const email = localStorage.getItem("userMail");
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);
  const location = useLocation();
  const { time } = useContext(UserContext);
  const [part, setPart] = useState(1);
  const navigate = useNavigate();
  const [optionIndexMapping, setOptionIndexMapping] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paperName = location.state?.paperName;
  const [loading, setLoading] = useState(false);
  const questionsPerPage = 10;

  useEffect(() => {
    fetchQuestionSno(part);
  }, [part]);

  useEffect(() => {
    if (Array.isArray(questionsNo) && questionsNo.length > 0) {
      const first = questionsNo[0];
      const firstQuestionSno =
        first?.sno ?? first?.id ?? first?.question_id ?? first?.questionId ?? (typeof first === "number" || typeof first === "string" ? first : undefined);
      if (firstQuestionSno !== undefined && firstQuestionSno !== null) {
        fetchQuestions(firstQuestionSno); // Fetch the first question
        setSelectedQuestionIndex(0); // Set the selected index to 0
      }
    }
  }, [questionsNo]);

  const fetchQuestions = async (questionId) => {
    try {
      const qId =
        typeof questionId === "object" && questionId !== null
          ? questionId.sno || questionId.id || questionId.question_id || questionId.questionId
          : questionId;

      if (!qId) {
        console.warn("⚠️ fetchQuestions called without valid questionId:", questionId);
        return;
      }

      const res = await axiosInstance.post(`get/U_ViewMainsQuestions.php`, {
        userId: email,
        id: email,
        mainsId: sno,
        mains_id: sno,
        institutionId: sno,
        institution_id: sno,
        paperId: paperid,
        paper_id: paperid,
        questionId: qId,
        question_id: qId,
      });
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        }
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
        console.log("Fetched questions:", parsed);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
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

  const [Previewopen, setPreviewopen] = React.useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const PreviewhandleClickOpen = () => {
    registerDatas();
    registerDatas1();
    setPreviewopen(true);
  };
  const PreviewhandleClose = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit this preview?"
    );
    if (confirmExit) {
      setPreviewopen(false);
      navigate("/mains");
    }
  };
  const indexOfLast = currentPage * questionsPerPage;
  const indexOfFirst = indexOfLast - questionsPerPage;
  const currentQuestions = responseData?.slice(indexOfFirst, indexOfLast) || [];
  const totalPages = Math.ceil((responseData?.length || 0) / questionsPerPage);

  const [open, setOpen] = React.useState(false);
  const [finish, setFinish] = React.useState(false);

  const handleClickOpen = () => {
    registerDatas1();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const FinishTest = () => {
  //   // Check if responsecount is not null or undefined and is an array
  //   // if (Array.isArray(responsecount) && responsecount.length > 0) {
  //   //   // Check if there are skipped questions
  //   //   const hasSkippedQuestions = responsecount.some((d) => d.skip_count > 0);

  //   //   if (hasSkippedQuestions) {
  //   //     alert("Attend all the questions; don't skip any questions. Only then will you be able to submit the answers.");
  //   //     setOpen(false);
  //   //   } else {
  //   // Proceed with registering data

  //   registerDatas();
  //   TestCount();
  //   setFinish(true);
  //   //   }
  //   // } else {
  //   //   alert("No data available to process the test. Please try again.");
  //   // }
  // };

  const FinishTest = async () => {
    try {
      await registerDatas(); // Wait for the response
      await TestCount();
      setFinish(true);
    } catch (error) {
      console.error("❌ FinishTest error:", error);
    }
  };
  const FinishTestClose = () => {
    setFinish(false);
    navigate("/mains");
  };

  const [CrtBtnopen, setCrtBtnOpen] = React.useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const CrtClickOpen = () => {
    setCrtBtnOpen(true);
  };

  const CrtClickClose = () => {
    setCrtBtnOpen(false);
  };

  const styles = {
    mainContainer: {
      width: "100%",
      marginLeft: 0,
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      height: "50px",
      borderTopRightRadius: "10px",
      borderTopLeftRadius: "10px",
    },
    title: {
      display: "flex",
      flexDirection: "row",
      width: "95vw",
      marginLeft: "-10px",
      justifyContent: "space-between",
      padding: "10px 10px",
      zIndex: "1",
    },
  };

  // const registerDatas = async () => {
  //   try {
  //     const res = await axiosInstance.post(`get/U_viewMainsPreview.php`, {
  //       userId: email,
  //       mains_id: sno,
  //       paper_id: paperid,
  //     });
  //     if (res.status === 200) {
  //       if (res.data.message === "timeout") {
  //         navigate("/signin");
  //       }
  //       if (Array.isArray(res.data)) {
  //         setResponseData(res.data);
  //       } else {
  //         console.error("Unexpected data format:", res.data);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //   }
  // };

  const fetchFallbackPreview = async () => {
    try {
      if (!questionsNo || questionsNo.length === 0) return [];
      const allPromises = questionsNo.map(async (item, index) => {
        try {
          const res = await axiosInstance.post(`get/U_ViewMainsQuestions.php`, {
            userId: email,
            mainsId: sno,
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
          console.error("Error fetching fallback question in MainsTest:", e);
        }
        return null;
      });
      return (await Promise.all(allPromises)).filter(Boolean);
    } catch (err) {
      console.error("Error generating fallback preview in MainsTest:", err);
      return [];
    }
  };

  const registerDatas = async () => {
    setLoadingPreview(true);
    let dataFound = false;
    try {
      const res = await axiosInstance.post(`get/U_viewMainsPreview.php`, {
        userId: email,
        mains_id: sno,
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
            const rawAns =
              q.student_answer || q.user_answer || q.u_ans || q.selected_option;
            const isSkippedRaw =
              !rawAns ||
              String(rawAns).trim() === "" ||
              String(rawAns).trim() === "0" ||
              String(rawAns).trim().toLowerCase() === "null" ||
              String(rawAns).trim().toLowerCase() === "n/a";
            const studentAns =
              isSkippedRaw && selectedOptions && selectedOptions[orderIdx]
                ? selectedOptions[orderIdx]
                : rawAns || "";
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

  const registerDatas1 = async () => {
    try {
      const res = await axiosInstance.post(`get/U_MainsMark.php`, {
        userId: email,
        mains_id: sno,
        paper_id: paperid,
      });
      if (res.status === 200) {
        if (res.data.message === "timeout") {
          navigate("/signin");
        }
        if (Array.isArray(res.data)) {
          setResponsecount(res.data);
          console.log(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleQuestionChange = async (index) => {
    if (Array.isArray(questionsNo) && index >= 0 && index < questionsNo.length) {
      const current = questionsNo[index];
      const selectedSno =
        current?.sno ?? current?.id ?? current?.question_id ?? current?.questionId ?? current;
      if (selectedSno !== undefined && selectedSno !== null) {
        await fetchQuestions(selectedSno);
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

  const fetchQuestionSno = async (part) => {
    try {
      const res = await axiosInstance.post(`get/U_ViewMainsQuestionCount.php`, {
        userId: email,
        id: email,
        mainsId: sno,
        mains_id: sno,
        institutionId: sno,
        institution_id: sno,
        paperId: paperid,
        paper_id: paperid,
        partNumber: part,
        part: part,
      });
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
        console.log("Parsed questionsNo:", parsed);
        setSelectedQuestionIndex(0); // Reset question index when part changes
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
      if (selectedSno !== undefined && selectedSno !== null) {
        await fetchQuestions(selectedSno);
        if (time != 0) {
          const curItem = questionsNo[selectedQuestionIndex];
          const curSno =
            curItem?.sno ?? curItem?.id ?? curItem?.question_id ?? curItem?.questionId ?? curItem;
          if (curSno) {
            await registerDatatest(curSno);
          }
          setSelectedQuestionIndex(nextIndex);
          setSelectedOption(selectedOptions[nextIndex] || ""); // Get saved option for next question
          setSelectedOptionIndex(
            optionIndexMapping[selectedOptions[nextIndex]] || null
          ); // Use saved index or null
          setQuestionStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            if (selectedOption) {
              newStatus[selectedQuestionIndex] = "answered";
            } else {
              newStatus[selectedQuestionIndex] = "skipped";
            }
            return newStatus;
          });
        }
      }
    } else if (Array.isArray(questionsNo) && nextIndex === questionsNo.length) {
      if (time != 0) {
        const curItem = questionsNo[selectedQuestionIndex];
        const curSno =
          curItem?.sno ?? curItem?.id ?? curItem?.question_id ?? curItem?.questionId ?? curItem;
        if (curSno) {
          await registerDatatest(curSno);
        }
        setSelectedOption("");
        setSelectedOptionIndex(null);
        setQuestionStatus((prevStatus) => {
          const newStatus = [...prevStatus];
          newStatus[selectedQuestionIndex] = selectedOption
            ? "answered"
            : "skipped";
          return newStatus;
        });
      }
    }
  };

  const registerDatatest = async (questionId, answer) => {
    try {
      const res = await axiosInstance.post(`put/U_updateMainsAns.php`, {
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

  // const registerDatatest = async (questionId, selectedAnswer) => {
  //   try {
  //     const email = localStorage.getItem("email");

  //     if (!email || !questionId || !selectedAnswer) {
  //       console.warn("Missing data", email, questionId, selectedAnswer);
  //       return;
  //     }

  //     const res = await axiosInstance.post("put/U_updateMainsAns.php", {
  //       id: email,
  //       question_id: questionId,
  //       answer: selectedAnswer,
  //     });

  //     if (res.status === 200) {
  //       if (res.data.message === "timeout") {
  //         navigate("/signin");
  //       }
  //       console.log(res.data);
  //       setSelectedOption(""); // reset
  //     }
  //   } catch (err) {
  //     console.error("Error in answer save:", err);
  //   }
  // };

  useEffect(() => {
    Institution();
  }, []);

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

  const handleSkipQuestion = async () => {
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[selectedQuestionIndex] = "skipped";
      return newStatus;
    });

    await handleNextQuestion();
  };

  // console.log(time);

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

  // const decodeUnicode = (str) => {
  //   return str.replace(/\\u[\dA-F]{4}/gi, (match) =>
  //     String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
  //   );
  // };

  const handleDownload = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(`get/U_viewMainsPreview.php`, {
        userId: email,
        mains_id: sno,
        paper_id: paperid,
      });

      const questions = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];

      // Helper: convert image URL to base64
      const getBase64ImageFromUrl = async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          throw new Error("Image fetch failed");
        }
      };

      // Build HTML content
      let htmlContent = `<div style="font-family: 'Nirmala UI', sans-serif;">`;

      for (const [index, q] of questions.entries()) {
        const questionText =
          q.questions && q.questions.trim() !== ""
            ? q.questions
            : "தகவல் இல்லை";

        const studentAnswer =
          q?.student_answer && q.student_answer.trim() !== ""
            ? q.student_answer
            : "தகவல் இல்லை";

        const correctAnswer =
          q?.correct_answer && q.correct_answer.trim() !== ""
            ? q.correct_answer
            : "தகவல் இல்லை";

        htmlContent += `<p><strong>${index + 1}. ${questionText}</strong></p>`;

        // IMAGE HANDLING
        if (q?.image && q.image.trim() !== "") {
          if (q.image.includes("<img")) {
            // Already an <img> tag (like base64 or inline HTML)
            htmlContent += q.image;
          } else {
            // It's just a path (like ../upload/img.jpg), so build full URL
            const cleanedImagePath = q.image.replace("../upload/", "");
            const imageUrl = `http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/${cleanedImagePath}`;
            try {
              const base64Img = await getBase64ImageFromUrl(imageUrl);
              htmlContent += `<img src="${base64Img}" width="300" height="200" style="margin: 10px 0;" />`;
            } catch (imgErr) {
              console.error("Image load failed for:", imageUrl);
              htmlContent += `<p>படத்தை ஏற்ற முடியவில்லை</p>`;
            }
          }
        }

        htmlContent += `<p>மாணவர் பதில்: ${studentAnswer}</p>`;
        htmlContent += `<p>சரியான பதில்: ${correctAnswer}</p>`;
        htmlContent += `<hr />`;
      }

      htmlContent += `</div>`;

      // PDF settings
      const opt = {
        margin: 10,
        filename: "Questions.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Generate PDF
      html2pdf().set(opt).from(htmlContent).save();
    } catch (error) {
      console.error("PDF download error:", error);
      alert("PDF பதிவிறக்கம் தோல்வியடைந்தது.");
    } finally {
      setLoading(false);
    }
  };

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
  const BASE_URL =
    "http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/";

  const isImage = (url) => {
    return url && url.match(/\.(jpeg|jpg|gif|png|svg|webp|jfif)$/) != null;
  };
  return (
    <div
      style={{ backgroundColor: "#F2F1EB", padding: "20px", height: "100vh" }}
    >
      <Container fluid style={styles.mainContainer}>
        <Row>
          <Col>
            <div className="wrap" style={styles.title}>
              <div>
                <Typography style={{ fontWeight: 600 }}>{paperName}</Typography>
              </div>
              <CountdownTimer mainsId={sno} paperId={paperid} />
              <div>
                <Typography style={{ fontWeight: 600 }}>
                  {selectedQuestionIndex + 1}/{questionsNo.length}
                </Typography>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Container fluid style={MainContainer}>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={7}
              xl={7}
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
                        `http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/${questions[0].image
                          ?.trim()
                          .replace("../upload/", "")}`
                      )}

                      {/* Display question image */}
                      {questions[0].image ? (
                        <img
                          src={`http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/${encodeURIComponent(
                            questions[0].image.trim().replace("../upload/", "")
                          )}`}
                          height="100px"
                          alt="Uploaded Image"
                          onClick={handleClick}
                          style={colorSwap ? Active : DisActive}
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              e.target.src
                            );
                            e.target.style.display = "none"; // Hide image if not found
                          }}
                        />
                      ) : null}

                      <ol
                        type="a"
                        style={{
                          paddingLeft: "0",
                          listStylePosition: "inside",
                        }}
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
                                  src={`http://localhost/vaagaibackend_local/vaagaibackend_local/controllers/api/admin/upload/${encodeURIComponent(
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
              style={{ backgroundColor: "#FEFBE9", zIndex: 1 }}
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                <div
                  style={{
                    backgroundColor: "#f6f6f6",
                    borderRadius: "15px",
                    overflow: "auto",
                    width: "100%",
                    paddingLeft: "40px",
                    marginTop: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    height: "300px",
                  }}
                >
                  {Array.isArray(questionsNo) && questionsNo.length > 0 ? (
                    questionsNo.map((question, index) => (
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
                    ))
                  ) : (
                    <p>No questions available</p>
                  )}
                </div>

                <div>
                  <div
                    className="d-grid "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button style={Finsh} onClick={handleClickOpen}>
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
                        {console.log(
                          "✅ Debug: responsecount =",
                          responsecount
                        )}
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
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        style={PreviewBtn}
                        onClick={PreviewhandleClickOpen}
                      >
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
                    paperName={paperName || "Mains Question Paper MCQ"}
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MainsTest;
