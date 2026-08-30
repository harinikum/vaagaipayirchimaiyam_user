import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Context";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { NavLink } from "react-router-dom";

const UserVideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [viewCounts, setViewCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const { Endpoint } = useContext(UserContext);

  const userId = localStorage.getItem("userMail");
  const selectedSubject = "TNSET";

  useEffect(() => {
    if (Endpoint) {
      fetchVideos();
    }
  }, [Endpoint]);

  const fetchVideos = async () => {
    try {
      const videoRes = await axios.get(
        `${Endpoint}get/U_VideoPg.php?category=${selectedSubject}`
      );
      const selectedSno = localStorage.getItem("selectedSno");
      const filtered = (Array.isArray(videoRes.data) ? videoRes.data : []).filter(item => {
        const hasInstitutionId = item.hasOwnProperty('institution_id') && item.institution_id !== null && item.institution_id !== undefined;
        if (hasInstitutionId) {
          return String(item.institution_id) === String(selectedSno);
        }
        const desc = item.description || "";
        const subjectTag = `||subj:${selectedSno}||`;
        const hasAnySubjectTag = /\|\|subj:\d+\|\|/.test(desc);
        return !hasAnySubjectTag || desc.includes(subjectTag);
      });
      setVideos(filtered);

      const viewsRes = await axios.get(
        `${Endpoint}get/U_GetUserVideoCounts.php?email=${userId}`
      );
      setViewCounts(viewsRes.data || {});

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePlay = async (videoId) => {
    const currentView = viewCounts[videoId] || { views: 0, granted: 1 };

    if (currentView.views >= 3 && currentView.granted === 0) {
      alert("View limit reached. Please request access.");
      return;
    }

    try {
      await axios.post(
        `${Endpoint}post/U_TrackVideoView.php`,
        { email: userId, video_id: videoId }
      );
      fetchVideos(); // Refresh views after playing
    } catch (err) {
      console.error("Failed to track video view:", err);
    }
  };

  const handleRequestAccess = async (videoId) => {
    try {
      const res = await axios.post(
        `${Endpoint}post/U_RequestAccess.php`,
        { email: userId, video_id: videoId }
      );

      const status = res.data.status;
      if (status === "requested") {
        alert("Request sent to admin for approval.");
      } else if (status === "already_requested") {
        alert("Access request is already pending.");
      } else {
        alert("Unexpected response. Try again later.");
      }
    } catch (err) {
      console.error("Access request error:", err);
      alert("Something went wrong.");
    }
  };

  const getVideoSrc = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) {
      if (path.includes("localhost") && !window.location.hostname.includes("localhost")) {
        const base = Endpoint.replace("controllers/api/User/", "");
        return path.replace(/https?:\/\/localhost\/vaagaibackend_local\//g, base);
      }
      return path;
    }
    const base = Endpoint.replace("controllers/api/User/", "");
    return `${base}${path.replaceAll("\\", "/")}`;
  };

  return (
    <Box
      sx={{ padding: "3rem", backgroundColor: "#f8fafc", minHeight: "100vh" }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            textAlign: "center",
            paddingBottom: "25px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <NavLink to="/card" style={{ color: "black", display: 'flex' }}>
            <WestIcon />
          </NavLink>
          &nbsp;PG-TRB TEST BATCH VIDEO LECTURES
        </Typography>

        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
          >
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : videos.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h6" color="textSecondary">
              No videos available for PG-TRB TEST BATCH.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {videos.map((video) => {
              const videoView = viewCounts[video.id] || { views: 0, granted: 1 };
              const isBlocked = videoView.views >= 3 && videoView.granted === 0;

              return (
                <Grid item xs={12} sm={12} md={6} key={video.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: "0 10px 25 rgba(0,0,0,0.05)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-5px)" }
                    }}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                      <video
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        controls={!isBlocked}
                        controlsList="nodownload"
                        onEnded={() => !isBlocked && handlePlay(video.id)}
                        onContextMenu={(e) => e.preventDefault()}
                        src={isBlocked ? "" : getVideoSrc(video.video_path)}
                      >
                        Your browser does not support the video tag.
                      </video>

                      {isBlocked && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                          color: '#fff',
                          padding: 3,
                          textAlign: 'center'
                        }}>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            View Limit Reached
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                            You have watched this video 3 times. Please request access to continue watching.
                          </Typography>
                          <Button
                            onClick={() => handleRequestAccess(video.id)}
                            variant="contained"
                            color="primary"
                            sx={{
                              borderRadius: '8px',
                              px: 4,
                              py: 1,
                              textTransform: 'none',
                              fontWeight: 700,
                              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)'
                            }}
                          >
                            Request Access
                          </Button>
                        </Box>
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1, padding: "1.5rem" }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6
                      }}>
                        {video.description ? video.description.replace(/\|\|subj:\d+\|\|/, "").trim() : ""}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default UserVideoPage;
