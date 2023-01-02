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

  const { data, sections } = JSON.parse(localStorage.getItem("data"));
  const { path } =
  data[sectionNum + 1] !== undefined
    ? links.find((link) => link.id === sections[sectionNum + 1])
    : links.find((link) => link.id === 8);
  

  let arrOfRank = [];
  let rankToDisplay = 0;

  // find how many rank
  for (const [sectionNum, dict] of Object.entries(data)) {
    for (const [templateNo, data] of Object.entries(dict)) {
      if (templateNo == 3) {
        arrOfRank.push(sectionNum);
      }
    }
  }

  // find which rank to display
  for (let i = 0; i < arrOfRank.length; i++) {
    const element = arrOfRank[i];
    if (element < sectionNum) {
      rankToDisplay = i;
    }
  }

  let arr = [];
  let arrOfProfile = [];
  let dataToDisplay = {};

  // find how many profile
  for (const [sectionNum, dict] of Object.entries(data)) {
    for (const [templateNo, data] of Object.entries(dict)) {
      if (templateNo == 1) {
        arrOfProfile.push(sectionNum);
      }
    }
  }
  // find which profile to display
  for (let i = 0; i < arrOfProfile.length; i++) {
    const element = arrOfProfile[i];
    if (element <= sectionNum) {
      dataToDisplay = data[element][1];
    }
  }

  for (const [key, value] of Object.entries(dataToDisplay)) {
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      arr.push(value);
    }
  }

  const firstCandidate = user.userResponse.rank[rankToDisplay][0];
  const lastCandidate =
    user.userResponse.rank[rankToDisplay][
      user.userResponse.rank[rankToDisplay].length - 1
    ];

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
        firstCandidate={arr[firstCandidate]}
        lastCandidate={arr[lastCandidate]}
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
