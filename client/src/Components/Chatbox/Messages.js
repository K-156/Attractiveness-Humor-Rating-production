import { Box, Button } from "@mui/material";
import { useAppContext } from "../../Context/AppContext";
import _ from "lodash";

import "./Chatbox.css";

// const msg = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est", "omo", "jinjja"]

const Messages = ({ setSelectMessage, theme, themeHover }) => {
  const { data,sections } = JSON.parse(localStorage.getItem("data"));
  const { sectionNum } = useAppContext();

  return (
    <Box id="MessageOptions" sx={{ height: "120px" }}>
      {_.map(data[sectionNum][sections[sectionNum]].messages, (text) => {
        console.log(text);
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
