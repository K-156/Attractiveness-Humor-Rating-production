import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Box, Grid, Typography } from "@mui/material";

import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/SurveyForm/AudioForm";
import { isValid } from "../../Utils/isValid";
import IntroMessage from "../../Components/Message/IntroMessage";
import Instruction from "../../Components/Instruction/Instruction";
import Audio from "../../Components/Audio/Audio";
import links from "../../Utils/links";
import { colorPalette } from "../../Utils/colorPalette";

const AudioRate = ({ title, link, isWritten }) => {
  const {
    updateUser,
    nextSection,
    theme,
    data,
    sections,
    setActiveProject,
    activeProjectId,
    getProject,
  } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  const gender = localStorage.getItem("gender");
  const sectionNum = Number(localStorage.getItem("sectionNum"));

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
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

  const user = JSON.parse(localStorage.getItem("user"));

  let arrOfRank = [];
  let rankToDisplay = 0;

  // find how many rank
  for (const [sectionNum, dict] of Object.entries(data)) {
    for (const [templateNo, data] of Object.entries(dict)) {
      if (templateNo == 3) {
        arrOfRank.push(Number(sectionNum));
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

  const firstCandidate = Number(user.rank[rankToDisplay][0]) - 1;
  const lastCandidate =
    Number(user.rank[rankToDisplay][user.rank[rankToDisplay].length - 1]) - 1;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    isWritten
      ? updateUser({
          currentUser: {
            ...user,
            userResponse: {
              ...user.userResponse,
              [title === "1" ? `best_${sectionNum}` : `worst_${sectionNum}`]:
                rating,
            },
          },
          id: user._id,
        })
      : updateUser({
          currentUser: {
            ...user,
            userResponse: {
              ...user.userResponse,
              [title === "1" ? `best_${sectionNum}` : `worst_${sectionNum}`]:
                rating,
            },
          },
          id: user._id,
        });

    if (title === "1") {
      navigate(link);
    } else {
      nextSection();
      localStorage.setItem(
        "sectionNum",
        Number(localStorage.getItem("sectionNum")) + 1
      );
      navigate(path);
    }
  };

  // generate random number to play audio
  function getRandomNumber(title) {
    // Check if a random number is stored in local storage
    const storedNumber = localStorage.getItem(`randomNumber${title}`);
    const prevNumber = localStorage.getItem(`randomNumber${Number(title)-1}`);

    // If a random number is stored, return it
    if (storedNumber) {
      return storedNumber;
    }

    // If no random number is stored, generate a new one and store it in local storage
    let randomNumber = isWritten
      ? Math.floor(
          Math.random() *
            data[sectionNum][sections[sectionNum]][user.surveyRole]
              ?.introductions.length
        )
      : Math.floor(
          Math.random() *
            data[sectionNum][sections[sectionNum]][user.surveyRole]?.audioLink
              .length
        );
    while (randomNumber === prevNumber) {
      randomNumber = isWritten
        ? Math.floor(
            Math.random() *
              data[sectionNum][sections[sectionNum]][user.surveyRole]
                ?.introductions.length
          )
        : Math.floor(
            Math.random() *
              data[sectionNum][sections[sectionNum]][user.surveyRole]?.audioLink
                .length
          );
    }
    localStorage.setItem(`randomNumber${title}`, randomNumber);
    return randomNumber;
  }

  // Use the getRandomNumber() function to get a random number
  const randomNum = data.length !== 0 ? getRandomNumber(title) : 0;

  return (
    <div>
      <script>
        {
          (document.title = isWritten
            ? `Introduction ${title}`
            : `Audio ${title}`)
        }
      </script>
      <Instruction type={isWritten ? "intro" : "audio"} />
      <Grid container className="centerPadding" gap={2}>
        <Grid item xs={4} px={4}>
          <Typography
            className="cardHeader"
            sx={{ color: colorPalette[theme]["primary"] }}
          >
            {link.includes("q2")
              ? arr[firstCandidate]?.optionName
              : arr[lastCandidate]?.optionName}
          </Typography>
          <Box className="imageBox">
            <img
              src={
                link.includes("q2")
                  ? arr[firstCandidate]?.link
                  : arr[lastCandidate]?.link
              }
              alt="candidate"
            />
          </Box>
          {isWritten ? (
            <IntroMessage
              text={
                data.length !== 0 &&
                data[sectionNum][sections[sectionNum]][user.surveyRole]
                  ?.introductions[randomNum]
              }
            />
          ) : (
            <Audio
              src={
                data.length !== 0 &&
                data[sectionNum][sections[sectionNum]][user.surveyRole]
                  ?.audioLink[randomNum]
              }
            />
          )}
        </Grid>
        <Grid item xs={7} px={4}>
          <AudioForm
            data={
              data.length !== 0 &&
              data[sectionNum][sections[sectionNum]][user.surveyRole]?.questions
            }
            setRating={setRating}
            isWritten={isWritten}
            title={title}
          />
        </Grid>
        <Grid item xs={12} className="spaceBetween" sx={{ py: 3, px: 9 }}>
          <NextButton
            isSurvey={true}
            disabled={
              data.length !== 0 &&
              !isValid(
                rating,
                data[sectionNum][sections[sectionNum]][user.surveyRole]
                  ?.questions.length
              )
            }
            handleOnSubmit={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AudioRate;
