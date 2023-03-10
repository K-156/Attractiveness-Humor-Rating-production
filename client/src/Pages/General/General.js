import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Card, CardContent, Typography } from "@mui/material";
import NextButton from "../../Components/NavButton/NextButton";
import { themePalette } from "../../Utils/themePalette";
import links from "../../Utils/links";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

const General = () => {
  const {
    theme,
    updateUser,
    user,
    data,
    setActiveProject,
    activeProjectId,
    getProject,
    sections,
    sendEmail,
  } = useAppContext();
  const navigate = useNavigate();
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionNum, setSectionNum] = useState(
    localStorage.getItem("sectionNum")
  );
  const path =
    data[Number(sectionNum) + 1] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : "/";

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then((proj) => {
        const { data, sections } = proj;
        if (sectionNum === null) setSectionNum(sections.length - 1);
        setIsEnd(data[sectionNum][sections[sectionNum]]?.isEnd);
        if (data[sectionNum][sections[sectionNum]]?.isEnd === true) {
          if (user.role === "admin") {
            updateUser({
              currentUser: {
                ...user,
                userResponse: {},
                rank: [],
              },
              id: user._id,
            });
            localStorage.clear();
            setIsLoading(false);
          } else {
            getCompletionCode().then((res) => {
              const { data } = res;
              sendEmail({
                email: user.email,
                name: user.name,
                completionCode: data.token,
                projId: user.projId,
                type: "end",
                userid: user._id,
              });
              updateUser({
                currentUser: {
                  ...user,
                  completionCode: data.token,
                  endTime: new Date().toISOString(),
                },
                id: user._id,
              });
            });
            localStorage.clear();
            setIsLoading(false);
          }
        }
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [activeProjectId, sectionNum]);

  const getCompletionCode = async () => {
    return await axios.get("/api/v1/auth/completionCode");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSectionNum(Number(localStorage.getItem("sectionNum")) + 1);
    localStorage.setItem(
      "sectionNum",
      Number(localStorage.getItem("sectionNum")) + 1
    );
    navigate(path);
  };

  return (
    <div
      className={`backgroundImage-${theme}`}
      style={{ backgroundColor: themePalette[theme]["background"] }}
    >
      <script>{(document.title = "Thank you")}</script>
      {isLoading ? (
        <div className={`backgroundImage-${theme} center`}>
          <Loading />
        </div>
      ) : (
        <>
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
                background: themePalette[theme]["primary"],
                color: "#FFFFFF",
                minWidth: "500px",
              }}
            >
              <CardContent sx={{ p: "24px" }}>
                <Typography
                  className="textCenter"
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {data.length !== 0 &&
                    data[sectionNum][sections[sectionNum]]?.text}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {isEnd === "false" && (
            <Box className="flexEnd" sx={{ py: 3, width: "80%", px: 6 }}>
              <NextButton isSurvey={true} handleOnSubmit={handleOnSubmit} />
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default General;
