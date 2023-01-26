import { Box, Button } from "@mui/material";
import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";
import _ from "lodash";

import "./Chatbox.css";

const Messages = ({ setSelectMessage, theme, themeHover, title }) => {
  const {
    data,
    sections,
    user,
    setActiveProject,
    activeProjectId,
    getProject,
  } = useAppContext();

  const sectionNum = Number(localStorage.getItem("sectionNum"));

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
    // eslint-disable-next-line
  }, [activeProjectId]);

  const type = title === "1" ? "best" : "worst";

  const handleOnChange = (event) => {
    const value = event.target.id;
    setSelectMessage((state) => ({
      ...state,
      [`${type}_prewritten_msg`]: value,
    }));
  };
  return (
    <Box id="MessageOptions" sx={{ height: "120px", my: "12rem" }}>
      {data.length !== 0 && _.map(
        data[sectionNum][sections[sectionNum]][user.surveyRole]?.messages,
        (text) => {
          return (
            <Button
              key={text}
              id={text}
              variant="outlined"
              sx={{
                color: theme,
                borderColor: theme,
                my: 0.5,
                mx: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: themeHover,
                  borderColor: theme,
                },
              }}
              onClick={handleOnChange}
            >
              {text}
            </Button>
          );
        }
      )}
    </Box>
  );
};

export default Messages;
