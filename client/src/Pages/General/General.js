import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isEnd, setIsEnd] = useState(false);
  const [sectionNum, setSectionNum] = useState(localStorage.getItem("sectionNum"));
  const path =
    data[Number(sectionNum) + 1] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : "/";

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then((proj) => {
        const { data, sections } = proj;
        console.log(data[sectionNum][sections[sectionNum]]?.isEnd)
        setIsEnd(data[sectionNum][sections[sectionNum]]?.isEnd);
        if (data[sectionNum][sections[sectionNum]]?.isEnd == "true") {
          setSectionNum(sections.length - 1);
          removeUserFromLocalStorage();
          localStorage.clear();
        }
      });
    }
  }, [activeProjectId, sectionNum]);

  console.log(sectionNum)


  const getCompletionCode = async () => {
    return await axios.get("/api/v1/auth/completionCode");
  };

  useEffect(() => {
    if (isEnd == "true") {
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
  }, [sectionNum]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSectionNum(Number(localStorage.getItem("sectionNum")) + 1)
    localStorage.setItem(
      "sectionNum",
      Number(localStorage.getItem("sectionNum")) + 1
    );
    navigate(path);
  };

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
      {isEnd === "false" && (
        <Box className="flexEnd" sx={{ py: 3, width: "80%", px: 6 }}>
          <NextButton isSurvey={true} handleOnSubmit={handleOnSubmit} />
        </Box>
      )}
    </div>
  );
};

export default General;
