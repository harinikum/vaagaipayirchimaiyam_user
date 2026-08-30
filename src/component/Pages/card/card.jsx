import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardContent, Grid, IconButton } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

const CardPage = () => {
  const Navigate = useNavigate();
  const selectedSubject = localStorage.getItem("selectedSubject");
  const batchname = localStorage.getItem("batchname");
  const selectedItemPath = localStorage.getItem("selectedItemPath");
  const selectedItemName = localStorage.getItem("selectedItemName");

  const subjectDisplayNames = {
    FREE: "FREE",
    PG: "PG",
    UG: "UG",
    TNTET: "TNTET",
    TNSET: "PG-TRB TEST BATCH",
    KT: "KT",
  };

  const handleTestClick = () => {
    if (selectedItemPath) {
      Navigate(selectedItemPath);
    } else {
      alert("No valid test selected.");
    }
  };

  const handlevideoClick = () => {
    switch (selectedSubject) {
      case "FREE":
        Navigate("/freevideos");
        break;
      case "PG":
        Navigate("/pgvideos");
        break;
      case "UG":
        Navigate("/ugvideos");
        break;
      case "TNTET":
        Navigate("/tntetvideos");
        break;
      case "TNSET":
        Navigate("/tnsetvideos");
        break;
      case "KT":
        Navigate("/ktvideos");
        break;
      default:
        alert("No valid subject selected.");
    }
  };

  const handleBack = () => {
    switch (selectedSubject) {
      case "FREE":
        Navigate("/year");
        break;
      case "PG":
        Navigate("/subject");
        break;
      case "UG":
        Navigate("/non_nursing");
        break;
      case "TNTET":
        Navigate("/prelims");
        break;
      case "TNSET":
        Navigate("/model");
        break;
      case "KT":
        Navigate("/mains");
        break;
      default:
        Navigate("/home");
    }
  };

  const handleMaterialClick = () => {
    Navigate("/materials");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <IconButton
          onClick={handleBack}
          sx={{ position: 'absolute', left: 0 }}
        >
          <WestIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom align="center">
          {selectedItemName || subjectDisplayNames[selectedSubject] || selectedSubject}
        </Typography>
      </div>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ marginTop: "2rem" }}
      >
        {/* Test Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: 2, textAlign: "center", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Test Section
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start tests based on the selected subject.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTestClick}
                sx={{ marginTop: 2 }}
              >
                Go to Test
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Video Card (conditionally shown based on batchname) */}
        {batchname !== "testbatch" && (
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ padding: 2, textAlign: "center", boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Video Section
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Watch videos relevant to the selected subject.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handlevideoClick}
                  sx={{ marginTop: 2 }}
                >
                  Go to Videos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Material Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: 2, textAlign: "center", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Material Section
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access study materials and resources.
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: '#2e7d32', color: 'white' }}
                onClick={handleMaterialClick}
                sx={{ marginTop: 2 }}
              >
                Go to Materials
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CardPage;
