import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import ChatTemplate from "../../Components/Chatbox/ChatTemplate";
import NextButton from "../../Components/NavButton/NextButton";
import Instruction from "../../Components/Instruction/Instruction";
import links from "../../Utils/links";

const Chat = ({ title, link }) => {
  const {
    updateUser,
    data,
    sections,
    user,
    setActiveProject,
    activeProjectId,
    getProject,
  } = useAppContext();
  const navigate = useNavigate();

  const [selectMessage, setSelectMessage] = useState(null);
  const [items, setItems] = useState([]);
  const [rankToDisplay, setRankToDisplay] = useState(0);

  const gender = localStorage.getItem("gender");
  const sectionNum = Number(localStorage.getItem("sectionNum"));

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then((proj) => {
        let arrOfRank = [];

        // find how many rank
        for (const [sectionNum, dict] of Object.entries(data)) {
          for (const [templateNo, data] of Object.entries(dict)) {
            if (templateNo === 3) {
              arrOfRank.push(Number(sectionNum));
            }
          }
        }

        // find which rank to display
        for (let i = 0; i < arrOfRank.length; i++) {
          const element = arrOfRank[i];
          if (element < sectionNum) {
            setRankToDisplay(i);
          }
        }

        let arr = [];
        let arrOfProfile = [];
        let dataToDisplay = {};

        // find how many profile
        for (const [sectionNum, dict] of Object.entries(data)) {
          for (const [templateNo, data] of Object.entries(dict)) {
            if (Number(templateNo) === 1) {
              arrOfProfile.push(Number(sectionNum));
            }
          }
        }
        // find which profile to display
        for (let i = 0; i < arrOfProfile.length; i++) {
          const element = arrOfProfile[i];
          if (element <= sectionNum) {
            dataToDisplay =
              data[element][1][user.surveyRole][
                gender === "true" ? oppGender(user.sex) : "NA"
              ];
          }
        }

        for (const [key, value] of Object.entries(dataToDisplay)) {
          if (key == 1 || key == 2 || key == 3 || key == 4) {
            arr.push(value);
          }
        }
        setItems(arr);
      });
    }
  }, [activeProjectId]);

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
    }
  };

  const path =
    data[Number(sectionNum) + 1] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : links.find((link) => link.id === 8).path;

  const firstCandidate = Number(user.rank[rankToDisplay][0]) - 1;
  const lastCandidate =
    Number(user.rank[rankToDisplay][user.rank[rankToDisplay].length - 1]) - 1;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        userResponse: {
          ...user.userResponse,
          [title === "1" ? `best_${sectionNum}` : `worst_${sectionNum}`]:
            selectMessage,
        },
      },
      id: user._id,
    });
    if (title === "1") {
      navigate(link);
    } else {
      localStorage.setItem(
        "sectionNum",
        Number(localStorage.getItem("sectionNum")) + 1
      );
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
        firstCandidate={items[firstCandidate]}
        lastCandidate={items[lastCandidate]}
        title={title}
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
