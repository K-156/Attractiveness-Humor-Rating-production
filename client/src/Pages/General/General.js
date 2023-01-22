import { useAppContext } from "../../Context/AppContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { Box, Card, CardContent, Typography } from "@mui/material";
import NextButton from "../../Components/NavButton/NextButton";
import { colorPalette } from "../../Utils/colorPalette";
import links from "../../Utils/links";
import { getCurrentTime } from "../../Utils/getCurrentTime";

const General = () => {
  const { removeUserFromLocalStorage, theme, updateUser, user } =
    useAppContext();
  const location = useLocation();

  const data = JSON.parse(sessionStorage.getItem("data"));
  const sections = JSON.parse(sessionStorage.getItem("sections"));
  const sectionNum = Number(sessionStorage.getItem("sectionNum"));

  let path = "/";
  if (sectionNum + 1 !== sections.length) {
    path = links.find(
      (link) => link.id === sections[Number(sectionNum) + 1]
    ).path;
  }

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

  // setTimeout(() => {
  //   removeUserFromLocalStorage();
  // }, 300);
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
              {data[sectionNum][sections[sectionNum]].text}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {data[sectionNum][sections[sectionNum]].isNext === "true" && (
        <Box className="flexEnd" sx={{ py: 3, width: "80%", px: 6 }}>
          <NextButton isSurvey={true} link={path} />
        </Box>
      )}
    </div>
  );
};

export default General;
