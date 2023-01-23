import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";

import { colorPalette } from "../../Utils/colorPalette";

const ConsentForm = () => {
  const navigate = useNavigate();
  const { theme, setActiveProject, getProject, activeProjectId, projDetails } =
    useAppContext();

    useEffect(() => {
      setActiveProject();
      if (activeProjectId !== "") {
        getProject(activeProjectId);
      }
    }, [activeProjectId]);

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Consent Form")}</script>
      <Card sx={{ width: "80%" }}>
        <CardContent className="flexColumn center">
          <Typography
            variant="h5"
            className="formCardHeader"
            sx={{ color: colorPalette[theme]["primary"] }}
          >
            Consent Form
          </Typography>
          <Box sx={{ height: "250px", overflow: "auto", px: 3 }}>
            <Typography sx={{ fontSize: "14px" }}>
              {projDetails.consent}
            </Typography>
          </Box>
          <Box className="center" sx={{ mt: 3 }}>
            <Button
              sx={{
                textTransform: "none",
                color: colorPalette[theme]["primary"],
                mr: 5,
              }}
              onClick={() => navigate("/")}
            >
              <BsArrowLeft style={{ marginRight: "10px" }} />
              Back to Home
            </Button>
            <Button
              variant="contained"
              className={`customButton-${theme}`}
              onClick={() => navigate("/details")}
            >
              I agree
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentForm;
