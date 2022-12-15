import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import ChatTemplate from "../../Components/Chatbox/ChatTemplate";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import Instruction from "../../Components/Instruction/Instruction";

const Chat = ({ title, link }) => {
  const { updateUser } = useAppContext();
  const navigate = useNavigate();

  const [selectMessage, setSelectMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

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
    navigate(link);
  };

  console.log(selectMessage)

  return (
    <div>
      <Box ml={5} mb={2}>
        <Instruction type="prewritten" />
      </Box>
      <ChatTemplate
        link={link}
        selectMessage={selectMessage}
        setSelectMessage={setSelectMessage}
      />
      <Box display="flex" justifyContent="space-between" mx={5} my={3}>
        {parseInt(title) === 1 ? (
          <PrevButton link="/chat-instruction" />
        ) : (
          <Box></Box>
        )}
        <NextButton disabled={selectMessage === null} handleOnSubmit={handleOnSubmit} />
      </Box>
    </div>
  );
};

export default Chat;
