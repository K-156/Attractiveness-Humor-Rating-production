import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  useRadioGroup,
} from "@mui/material";

import NextButton from "../../Components/NavButton/NextButton";
import { colorPalette } from "../../Utils/colorPalette";
import "./InstructionPage.css";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

const InstructionPage = ({ link }) => {
  const {
    theme,
    data,
    activeProjectId,
    setActiveProject,
    getProject,
    sections,
    user,
    isLoading,
  } = useAppContext();
  const sectionNum = localStorage.getItem("sectionNum");

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
  }, [activeProjectId]);

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Instruction")}</script>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box className="instruction">
            <Box className="center" sx={{ width: "30%", p: "30px" }}>
              <img
                src={require(`../../Assets/Theme/${theme}/instruction.svg`)}
                style={{ width: "100%" }}
                alt="instruction"
              />
            </Box>
            <Card
              sx={{
                background: colorPalette[theme]?.["primary"],
                color: "#FFFFFF",
                mx: 30,
                width: "80%",
              }}
            >
              <CardContent>
                <Box className="center">
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Instruction
                  </Typography>
                </Box>
                <Box className="center" pt={1.5}>
                  <Typography className="textCenter">
                    {data.length !== 0 &&
                      data[sectionNum][sections[sectionNum]][user.surveyRole]
                        ?.instruction}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Box className="flexEnd" sx={{ py: 3, width: "80%" }}>
              <NextButton isSurvey={true} link={link} />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default InstructionPage;
