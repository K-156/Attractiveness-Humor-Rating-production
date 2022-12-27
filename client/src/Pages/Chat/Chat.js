import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import ChatTemplate from "../../Components/Chatbox/ChatTemplate";
import NextButton from "../../Components/NavButton/NextButton";
import Instruction from "../../Components/Instruction/Instruction";
import links from "../../Utils/links";

const Chat = ({ title, link }) => {
  const { updateUser, nextSection, sectionNum } = useAppContext();
  const navigate = useNavigate();

  const [selectMessage, setSelectMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const { sections } = JSON.parse(localStorage.getItem("data"));
  const { path } = links.find((link) => link.id === sections[sectionNum + 1]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        userResponse: {
          ...user.userResponse,
          prewrittenResponse: [
            ...user.userResponse.prewrittenResponse,
            selectMessage,
          ],
        },
      },
      id: user._id,
    });
    if (title === "1") {
      navigate(link);
    } else {
      nextSection();
      navigate(path);
    }
  };

  return (
    <div>
      <Box sx={{ ml: 5, mb: 2 }}>
        <Instruction type="prewritten" />
      </Box>
      <ChatTemplate
        link={link}
        selectMessage={selectMessage}
        setSelectMessage={setSelectMessage}
      />
      <Box className="spaceBetween" sx={{ mx: 5, my: 3 }}>
        <NextButton
          isSurvey={true}
          disabled={selectMessage === null}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default Chat;
