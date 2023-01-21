import { Box, Button } from "@mui/material";
import { useAppContext } from "../../Context/AppContext";
import _ from "lodash";

import "./Chatbox.css";

const Messages = ({ setSelectMessage, theme, themeHover }) => {
  
  const data = JSON.parse(sessionStorage.getItem("data"));
  const sections = JSON.parse(sessionStorage.getItem("sections"));
  const sectionNum = Number(sessionStorage.getItem("sectionNum"));
  const role = sessionStorage.getItem("role");

  return (
    <Box id="MessageOptions" sx={{ height: "120px", my:"12rem"}}>
      {_.map(data[sectionNum][sections[sectionNum]][role].messages, (text) => {
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
            onClick={(event) => setSelectMessage(event.target.id)}
          >
            {text}
          </Button>
        );
      })}
    </Box>
  );
};

export default Messages;
