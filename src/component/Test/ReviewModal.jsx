import React, { useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Web from "../../asserts/_x36__stroke.png";

const DEFAULT_BASE_URL =
  "https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload/";
// "https://vaagaimaiyam.vebbox.in/vaagaibackend/controllers/api/admin/upload"

export const isImageCheck = (url) => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png|svg|webp|jfif)$/i) != null;
};

export const isAnswerSkipped = (ans) => {
  if (ans === undefined || ans === null) return true;
  const s = String(ans).trim().toLowerCase();
  return (
    !s ||
    s === "0" ||
    s === "0.0" ||
    s === "null" ||
    s === "undefined" ||
    s === "n/a" ||
    s === "na" ||
    s === "none" ||
    s === "not answered" ||
    s === "not_attempted" ||
    s === "skipped" ||
    s === "no" ||
    s === "unanswered" ||
    s === "-" ||
    s === "nil" ||
    s === "empty"
  );
};

export const getQuestionStatus = (question) => {
  if (!question) return { isCorrect: false, isIncorrect: false, isSkipped: true };

  const studentAns = (
    question.student_answer ||
    question.user_answer ||
    question.u_ans ||
    question.selected_option ||
    ""
  ).trim();

  const correctAns = (
    question.correct_answer ||
    question.answer ||
    question.c_ans ||
    question.question_answer ||
    question.correct ||
    question.answers ||
    question.ans ||
    ""
  ).trim();

  if (isAnswerSkipped(studentAns)) {
    return { isCorrect: false, isIncorrect: false, isSkipped: true };
  }

  const norm = (s) =>
    String(s || "")
      .replace("../upload/", "")
      .trim()
      .toLowerCase();

  const stripPrefix = (str) =>
    str.replace(/^(?:option|opt)?\s*[a-d1-4]\s*[\)\.\:]?\s*/i, "").trim();

  const cleanStudent = norm(studentAns);
  const cleanCorrect = norm(correctAns);

  if (cleanStudent && cleanCorrect && cleanStudent === cleanCorrect) {
    return { isCorrect: true, isIncorrect: false, isSkipped: false };
  }

  let studentChosenOptNum = null;
  let correctOptNum = null;
  let hasAnyOptions = false;

  [1, 2, 3, 4].forEach((optNum) => {
    const optVal =
      question[`option${optNum}`] ??
      question[`opt${optNum}`] ??
      question[`option_${optNum}`];

    if (optVal !== undefined && optVal !== null) {
      const optStr = String(optVal).trim();
      if (optStr) {
        hasAnyOptions = true;
        const cleanOpt = norm(optStr);
        const strippedOpt = stripPrefix(cleanOpt);
        const letter = ["a", "b", "c", "d"][optNum - 1];

        const isStudent =
          cleanStudent === cleanOpt ||
          cleanStudent === letter ||
          cleanStudent === String(optNum) ||
          cleanStudent === `option${optNum}` ||
          cleanStudent === `opt${optNum}` ||
          (strippedOpt && stripPrefix(cleanStudent) === strippedOpt);

        const isCorrect =
          cleanCorrect === cleanOpt ||
          cleanCorrect === letter ||
          cleanCorrect === String(optNum) ||
          cleanCorrect === `option${optNum}` ||
          cleanCorrect === `opt${optNum}` ||
          (strippedOpt && stripPrefix(cleanCorrect) === strippedOpt);

        if (isStudent) studentChosenOptNum = optNum;
        if (isCorrect) correctOptNum = optNum;
      }
    }
  });

  if (studentChosenOptNum !== null) {
    if (correctOptNum !== null && studentChosenOptNum === correctOptNum) {
      return { isCorrect: true, isIncorrect: false, isSkipped: false };
    } else {
      return { isCorrect: false, isIncorrect: true, isSkipped: false };
    }
  }

  if (hasAnyOptions) {
    const extractLeadingKey = (str) => {
      const m = str.match(/^(?:option|opt)?\s*([a-d1-4])(?:\)|\s|\.|$)/i);
      return m ? m[1].toLowerCase() : null;
    };
    const sKey = extractLeadingKey(cleanStudent);
    const cKey = extractLeadingKey(cleanCorrect);

    if (sKey && cKey && sKey === cKey) {
      return { isCorrect: true, isIncorrect: false, isSkipped: false };
    }

    const sStripped = stripPrefix(cleanStudent);
    const cStripped = stripPrefix(cleanCorrect);
    if (sStripped && cStripped && sStripped === cStripped) {
      return { isCorrect: true, isIncorrect: false, isSkipped: false };
    }

    if (cleanStudent && !isAnswerSkipped(cleanStudent)) {
      return { isCorrect: false, isIncorrect: true, isSkipped: false };
    }

    return { isCorrect: false, isIncorrect: false, isSkipped: true };
  }

  if (cleanStudent && !isAnswerSkipped(cleanStudent)) {
    return { isCorrect: false, isIncorrect: true, isSkipped: false };
  }

  return { isCorrect: false, isIncorrect: false, isSkipped: true };
};

export default function ReviewModal({
  open,
  onClose,
  paperName,
  responseData,
  responsecount,
  loadingPreview = false,
  whatsapp = [],
  onRetry,
  BASE_URL = DEFAULT_BASE_URL,
}) {
  const [previewFilter, setPreviewFilter] = useState("all");

  const hasResponseCount =
    responsecount &&
    responsecount[0] &&
    (responsecount[0].correct_count !== undefined ||
      responsecount[0].incorrect_count !== undefined ||
      responsecount[0].skip_count !== undefined);

  const calculatedCorrect = responseData
    ? responseData.filter((q) => getQuestionStatus(q).isCorrect).length
    : 0;

  const calculatedIncorrect = responseData
    ? responseData.filter((q) => getQuestionStatus(q).isIncorrect).length
    : 0;

  const calculatedSkip = responseData
    ? responseData.filter((q) => getQuestionStatus(q).isSkipped).length
    : 0;

  const correctCount = hasResponseCount
    ? Number(responsecount[0].correct_count ?? 0)
    : responseData && responseData.length > 0
      ? calculatedCorrect
      : 0;

  const incorrectCount = hasResponseCount
    ? Number(responsecount[0].incorrect_count ?? 0)
    : responseData && responseData.length > 0
      ? calculatedIncorrect
      : 0;

  const skipCount = hasResponseCount
    ? Number(responsecount[0].skip_count ?? 0)
    : responseData && responseData.length > 0
      ? calculatedSkip
      : 0;

  const totalMarks =
    hasResponseCount &&
      (responsecount[0].total_question_count !== undefined ||
        (responsecount[0].total_marks !== undefined &&
          Number(responsecount[0].total_marks) > 1))
      ? Number(
        responsecount[0].total_question_count ||
        responsecount[0].total_marks ||
        correctCount + incorrectCount + skipCount
      )
      : responseData && responseData.length > 0
        ? responseData.length
        : correctCount + incorrectCount + skipCount;

  const accuracy = totalMarks > 0 ? Math.round((correctCount / totalMarks) * 100) : 0;

  return (
    <Dialog
      fullScreen
      open={Boolean(open)}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#f0f2f5",
          backgroundImage: "linear-gradient(180deg, #f8f9fc 0%, #f0f2f5 100%)",
        },
      }}
    >
      {/* Top Sticky App Bar */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          backgroundColor: "#ffffff",
          color: "#202124",
          borderBottom: "1px solid #dadce0",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            minHeight: { xs: "56px", sm: "64px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              edge="start"
              onClick={onClose}
              sx={{
                color: "#5e3023",
                backgroundColor: "#fdf8f5",
                "&:hover": { backgroundColor: "#f4ebe6" },
              }}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#5e3023",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  lineHeight: 1.2,
                }}
              >
                {paperName || "Test Performance & Review"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#5f6368",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Google Forms Style Review Mode
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Full Page Content Container */}
      <Box
        id="preview-content-area"
        sx={{
          flex: 1,
          overflowY: "auto",
          py: { xs: 2.5, md: 4 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        <Box sx={{ maxWidth: "960px", mx: "auto" }}>
          {/* Google Forms Header Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "14px",
              border: "1px solid #e0e0e0",
              overflow: "hidden",
              mb: 3,
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Top Accent Strip */}
            <Box
              sx={{
                height: "10px",
                background: "linear-gradient(90deg, #5e3023 0%, #8d493a 100%)",
              }}
            />
            <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#202124",
                  mb: 0.5,
                }}
              >
                {paperName || "Question Paper Review"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#5f6368", mb: 2.5 }}>
                Detailed analysis of all questions, your selected choices, and correct solutions.
              </Typography>

              {/* Total Score Prominent Card */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                  p: 2,
                  mb: 2.5,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #fdf8f5 0%, #f7ebe4 100%)",
                  border: "1.5px solid #e2c9be",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#8d493a",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Total Score
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "#5e3023",
                      lineHeight: 1.1,
                      mt: 0.3,
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                    }}
                  >
                    {correctCount} / {totalMarks}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={`${accuracy}% Accuracy`}
                    sx={{
                      backgroundColor: "#5e3023",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      px: 1,
                    }}
                  />
                </Box>
              </Box>

              {/* Score Stats Bar */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(4, 1fr)",
                  },
                  gap: 2,
                  p: 2,
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
                  border: "1px solid #ededed",
                  mb: 2.5,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#5f6368",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Total Marks
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#5e3023" }}>
                    {totalMarks}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#2e7d32",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Correct
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#2e7d32" }}>
                    {correctCount}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#d32f2f",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Wrong
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#d32f2f" }}>
                    {incorrectCount}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#e65100",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Skipped
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#e65100" }}>
                    {skipCount}
                  </Typography>
                </Box>
              </Box>

              {/* Filter Chips */}
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label={`All Questions (${responseData ? responseData.length : 0})`}
                  clickable
                  onClick={() => setPreviewFilter("all")}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: previewFilter === "all" ? "#5e3023" : "#ffffff",
                    color: previewFilter === "all" ? "#ffffff" : "#5f6368",
                    border: "1px solid #dcdcdc",
                    "&:hover": {
                      backgroundColor: previewFilter === "all" ? "#4a251b" : "#f5f5f5",
                    },
                  }}
                />
                <Chip
                  icon={
                    <CheckCircleIcon
                      sx={{
                        color:
                          previewFilter === "correct"
                            ? "#fff !important"
                            : "#2e7d32 !important",
                      }}
                    />
                  }
                  label={`Correct (${correctCount})`}
                  clickable
                  onClick={() => setPreviewFilter("correct")}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: previewFilter === "correct" ? "#2e7d32" : "#ffffff",
                    color: previewFilter === "correct" ? "#ffffff" : "#2e7d32",
                    border: "1px solid #a5d6a7",
                    "&:hover": {
                      backgroundColor: previewFilter === "correct" ? "#1b5e20" : "#e8f5e9",
                    },
                  }}
                />
                <Chip
                  icon={
                    <CancelIcon
                      sx={{
                        color:
                          previewFilter === "incorrect"
                            ? "#fff !important"
                            : "#d32f2f !important",
                      }}
                    />
                  }
                  label={`Incorrect (${incorrectCount})`}
                  clickable
                  onClick={() => setPreviewFilter("incorrect")}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: previewFilter === "incorrect" ? "#d32f2f" : "#ffffff",
                    color: previewFilter === "incorrect" ? "#ffffff" : "#d32f2f",
                    border: "1px solid #ef9a9a",
                    "&:hover": {
                      backgroundColor: previewFilter === "incorrect" ? "#b71c1c" : "#ffebee",
                    },
                  }}
                />
                <Chip
                  icon={
                    <HelpOutlineIcon
                      sx={{
                        color:
                          previewFilter === "skipped"
                            ? "#fff !important"
                            : "#ed6c02 !important",
                      }}
                    />
                  }
                  label={`Skipped (${skipCount})`}
                  clickable
                  onClick={() => setPreviewFilter("skipped")}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: previewFilter === "skipped" ? "#ed6c02" : "#ffffff",
                    color: previewFilter === "skipped" ? "#ffffff" : "#ed6c02",
                    border: "1px solid #ffcc80",
                    "&:hover": {
                      backgroundColor: previewFilter === "skipped" ? "#c75100" : "#fff3e0",
                    },
                  }}
                />
              </Stack>
            </Box>
          </Paper>

          {/* Questions List (Continuous Scroll) */}
          {loadingPreview ? (
            <Paper
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <CircularProgress sx={{ color: "#5e3023" }} />
              <Typography variant="h6" sx={{ color: "#5e3023", fontWeight: 600 }}>
                Loading test preview questions...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Preparing detailed answer breakdown and solutions...
              </Typography>
            </Paper>
          ) : responseData && responseData.length > 0 ? (
            (() => {
              const filteredQuestions = responseData
                .map((q, idx) => ({ ...q, originalIndex: idx }))
                .filter((q) => {
                  const { isCorrect, isIncorrect, isSkipped } = getQuestionStatus(q);

                  if (previewFilter === "correct") return isCorrect;
                  if (previewFilter === "incorrect") return isIncorrect;
                  if (previewFilter === "skipped") return isSkipped;
                  return true;
                });

              if (filteredQuestions.length === 0) {
                return (
                  <Paper
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="body1" color="textSecondary">
                      No questions match the selected filter.
                    </Typography>
                  </Paper>
                );
              }

              return filteredQuestions.map((question) => {
                const studentAns = (
                  question.student_answer ||
                  question.user_answer ||
                  ""
                ).trim();
                const correctAns = (
                  question.correct_answer ||
                  question.answer ||
                  question.c_ans ||
                  ""
                ).trim();

                const { isCorrect, isIncorrect, isSkipped } = getQuestionStatus(question);

                return (
                  <Paper
                    key={question.question_id || question.sno || question.originalIndex}
                    elevation={0}
                    sx={{
                      borderRadius: "14px",
                      border: "1px solid #dadce0",
                      borderLeft: isCorrect
                        ? "6px solid #2e7d32"
                        : isIncorrect
                          ? "6px solid #d32f2f"
                          : "6px solid #f57c00",
                      mb: 2.5,
                      p: { xs: 2.5, md: 3 },
                      backgroundColor: "#ffffff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      transition: "box-shadow 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    {/* Card Top: Question Number & Status Badge */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        pb: 1.5,
                        borderBottom: "1px solid #f1f3f4",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "#202124",
                          fontSize: "1rem",
                        }}
                      >
                        Question {question.originalIndex + 1} of {responseData.length}
                      </Typography>

                      {isCorrect && (
                        <Chip
                          icon={<CheckCircleIcon sx={{ fontSize: "18px !important" }} />}
                          label="Correct"
                          size="small"
                          sx={{
                            backgroundColor: "#e8f5e9",
                            color: "#1b5e20",
                            fontWeight: 700,
                            border: "1px solid #a5d6a7",
                          }}
                        />
                      )}
                      {isIncorrect && (
                        <Chip
                          icon={<CancelIcon sx={{ fontSize: "18px !important" }} />}
                          label="Incorrect"
                          size="small"
                          sx={{
                            backgroundColor: "#ffebee",
                            color: "#b71c1c",
                            fontWeight: 700,
                            border: "1px solid #ef9a9a",
                          }}
                        />
                      )}
                      {isSkipped && (
                        <Chip
                          icon={<HelpOutlineIcon sx={{ fontSize: "18px !important" }} />}
                          label="Not Attempted"
                          size="small"
                          sx={{
                            backgroundColor: "#fff8e1",
                            color: "#b78103",
                            fontWeight: 700,
                            border: "1px solid #ffe082",
                          }}
                        />
                      )}
                    </Box>

                    {/* Question Text / Image */}
                    <Box sx={{ mb: 2.5 }}>
                      {question.questions &&
                        question.questions.trim().startsWith("../upload/") ? (
                        <Box sx={{ my: 1 }}>
                          <img
                            src={`${BASE_URL}${question.questions
                              .trim()
                              .replace("../upload/", "")}`}
                            alt={`Question ${question.originalIndex + 1}`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "300px",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#202124",
                            fontWeight: 500,
                            fontSize: "1.05rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {question.questions}
                        </Typography>
                      )}

                      {/* Optional Question Diagram Image */}
                      {question.image && (
                        <Box sx={{ mt: 1.5, mb: 1 }}>
                          <img
                            src={`${BASE_URL}${question.image
                              .trim()
                              .replace("../upload/", "")}`}
                            alt="Question Diagram"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "250px",
                              borderRadius: "8px",
                              border: "1px solid #e0e0e0",
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Options List (A, B, C, D) */}
                    <Box
                      sx={{
                        my: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {[1, 2, 3, 4].map((optNum) => {
                        const optVal =
                          question[`option${optNum}`] ??
                          question[`opt${optNum}`] ??
                          question[`option_${optNum}`];

                        if (!optVal && optVal !== 0 && optVal !== "0") return null;

                        const optStr = String(optVal).trim();
                        if (!optStr) return null;
                        const letter = ["A", "B", "C", "D"][optNum - 1];

                        const norm = (s) =>
                          String(s || "")
                            .replace("../upload/", "")
                            .trim()
                            .toLowerCase();

                        const stripPrefix = (str) =>
                          str.replace(/^(?:option|opt)?\s*[a-d1-4]\s*[\)\.\:]?\s*/i, "").trim();

                        const cleanOpt = norm(optStr);
                        const cleanStudent = norm(studentAns);
                        const cleanCorrect = norm(correctAns);

                        const strippedOpt = stripPrefix(cleanOpt);

                        const isStudentChosen =
                          !isAnswerSkipped(studentAns) &&
                          (cleanStudent === cleanOpt ||
                            cleanStudent === letter.toLowerCase() ||
                            cleanStudent === String(optNum) ||
                            cleanStudent === `option${optNum}` ||
                            cleanStudent === `opt${optNum}` ||
                            (strippedOpt && stripPrefix(cleanStudent) === strippedOpt));

                        const isThisCorrect =
                          Boolean(correctAns) &&
                          (cleanCorrect === cleanOpt ||
                            cleanCorrect === letter.toLowerCase() ||
                            cleanCorrect === String(optNum) ||
                            cleanCorrect === `option${optNum}` ||
                            cleanCorrect === `opt${optNum}` ||
                            (strippedOpt && stripPrefix(cleanCorrect) === strippedOpt));

                        let cardBg = "#ffffff";
                        let cardBorder = "1px solid #e0e0e0";
                        let badgeBg = "#f1f3f4";
                        let badgeColor = "#5f6368";
                        let textColor = "#202124";

                        if (isThisCorrect) {
                          cardBg = "#e8f5e9";
                          cardBorder = "2px solid #2e7d32";
                          badgeBg = "#2e7d32";
                          badgeColor = "#ffffff";
                          textColor = "#1b5e20";
                        } else if (isStudentChosen && !isThisCorrect) {
                          cardBg = "#ffebee";
                          cardBorder = "2px solid #d32f2f";
                          badgeBg = "#d32f2f";
                          badgeColor = "#ffffff";
                          textColor = "#b71c1c";
                        }

                        return (
                          <Box
                            key={optNum}
                            sx={{
                              p: 1.5,
                              borderRadius: "10px",
                              backgroundColor: cardBg,
                              border: cardBorder,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 1.5,
                              transition: "all 0.2s ease",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                flex: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  backgroundColor: badgeBg,
                                  color: badgeColor,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: "0.875rem",
                                  flexShrink: 0,
                                }}
                              >
                                {letter}
                              </Box>

                              {isImageCheck(optStr) || optStr.startsWith("../upload/") ? (
                                <img
                                  src={`${BASE_URL}${optStr.replace("../upload/", "")}`}
                                  alt={`Option ${letter}`}
                                  style={{
                                    maxHeight: "80px",
                                    maxWidth: "250px",
                                    borderRadius: "6px",
                                    border: "1px solid #e0e0e0",
                                  }}
                                />
                              ) : (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight:
                                      isThisCorrect || isStudentChosen ? 700 : 500,
                                    color: textColor,
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {optStr}
                                </Typography>
                              )}
                            </Box>

                            <Box sx={{ flexShrink: 0 }}>
                              {isThisCorrect && isStudentChosen && (
                                <Chip
                                  size="small"
                                  icon={
                                    <CheckCircleIcon
                                      sx={{
                                        fontSize: "16px !important",
                                        color: "#fff !important",
                                      }}
                                    />
                                  }
                                  label="Your Choice & Correct"
                                  sx={{
                                    backgroundColor: "#2e7d32",
                                    color: "#ffffff",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                  }}
                                />
                              )}
                              {isThisCorrect && !isStudentChosen && (
                                <Chip
                                  size="small"
                                  icon={
                                    <CheckCircleIcon
                                      sx={{
                                        fontSize: "16px !important",
                                        color: "#fff !important",
                                      }}
                                    />
                                  }
                                  label="Correct Answer"
                                  sx={{
                                    backgroundColor: "#2e7d32",
                                    color: "#ffffff",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                  }}
                                />
                              )}
                              {isStudentChosen && !isThisCorrect && (
                                <Chip
                                  size="small"
                                  icon={
                                    <CancelIcon
                                      sx={{
                                        fontSize: "16px !important",
                                        color: "#fff !important",
                                      }}
                                    />
                                  }
                                  label="Your Choice (Wrong)"
                                  sx={{
                                    backgroundColor: "#d32f2f",
                                    color: "#ffffff",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>


                  </Paper>
                );
              });
            })()
          ) : (
            <Paper
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="h6" sx={{ color: "#5e3023", fontWeight: 700, mb: 1 }}>
                No Preview Questions Recorded
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 2.5, maxWidth: "520px", mx: "auto", lineHeight: 1.6 }}
              >
                Backend returned no saved answers for this test session.
              </Typography>
              {onRetry && (
                <button
                  style={{
                    backgroundColor: "#5e3023",
                    color: "#ffffff",
                    border: "none",
                    padding: "9px 24px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(94, 48, 35, 0.2)",
                  }}
                  onClick={onRetry}
                >
                  Retry Fetching Data
                </button>
              )}
            </Paper>
          )}
        </Box>
      </Box>

      {/* Sticky Bottom Actions Bar */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
          py: 2,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: "960px",
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <button
              style={{
                backgroundColor: "#5e3023",
                color: "#ffffff",
                border: "none",
                padding: "10px 28px",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(94, 48, 35, 0.3)",
              }}
              onClick={onClose}
            >
              Done / Close
            </button>

            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#5e3023",
                border: "1px solid #5e3023",
                padding: "9px 20px",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              onClick={() => {
                const elem = document.getElementById("preview-content-area");
                if (elem) elem.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ArrowUpwardIcon sx={{ fontSize: "18px" }} /> Top
            </button>
          </Box>

          {whatsapp && whatsapp.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={Web} height="26px" alt="Web" />
              {whatsapp.map((d) => (
                <div key={d.id}>
                  <a
                    href={d.whatsapplink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#25D366",
                        color: "white",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        boxShadow: "0 2px 6px rgba(37, 211, 102, 0.2)",
                      }}
                    >
                      Join WhatsApp Community
                    </div>
                  </a>
                </div>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
