import { useAppContext } from "../../Context/AppContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { Box, Card, CardContent, Typography } from "@mui/material";
import NextButton from "../../Components/NavButton/NextButton";
import { colorPalette } from "../../Utils/colorPalette";
import links from "../../Utils/links";

const General = () => {
  const {
    removeUserFromLocalStorage,
    theme,
    updateUser,
    user,
    data,
    setActiveProject,
    activeProjectId,
    getProject,
    sections,
  } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
  }, [activeProjectId]);

  const sectionNum = sections.length - 1;
  console.log(sectionNum);

  const path =
    data[sectionNum + 1] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : "/";

  const getCompletionCode = async () => {
    return await axios.get("/api/v1/auth/completionCode");
  };

  useEffect(() => {
    if (location.pathname.includes("complete")) {
      getCompletionCode().then((res) => {
        const { data } = res;
        updateUser({
          currentUser: {
            ...user,
            completionCode: data.token,
            endTime: new Date().toISOString(),
          },
          id: user._id,
        });
      });
    }
  }, []);

  setInterval(() => {
    // Check if the OTP has expired
    if (location.pathname.includes("complete")) {
      removeUserFromLocalStorage();
      localStorage.clear();
    }
  }, 5000);

  // sessionStorage.clear();

  return (
    <div
      className={`backgroundImage-${theme}`}
      style={{ backgroundColor: colorPalette[theme]["background"] }}
    >
      <script>{(document.title = "Thank you")}</script>
      <Box className="center">
        <img
          src={require(`../../Assets/Theme/${theme}/general.svg`)}
          style={{
            width: "20%",
            height: "100%",
            margin: "50px 20px 20px 20px",
          }}
          alt="complete"
        />
      </Box>
      <Box className="center">
        <Card
          sx={{
            background: colorPalette[theme]["primary"],
            color: "#FFFFFF",
            minWidth: "500px",
          }}
        >
          <CardContent sx={{ p: "24px" }}>
            <Typography className="textCenter" sx={{ whiteSpace: "pre-line" }}>
              {data.length !== 0 &&
                data[sectionNum][sections[sectionNum]]?.text}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {data.length !== 0 &&
        data[sectionNum][sections[sectionNum]]?.isNext === "true" && (
          <Box className="flexEnd" sx={{ py: 3, width: "80%", px: 6 }}>
            <NextButton isSurvey={true} link={path} />
          </Box>
        )}
    </div>
  );
};

export default General;
