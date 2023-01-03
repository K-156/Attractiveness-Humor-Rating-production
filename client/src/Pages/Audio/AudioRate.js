import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/SurveyForm/AudioForm";
import { isValid } from "../../Utils/isValid";
import IntroMessage from "../../Components/Message/IntroMessage";
import Instruction from "../../Components/Instruction/Instruction";
import Audio from "../../Components/Audio/Audio";
import links from "../../Utils/links";
import { colorPalette } from "../../Utils/colorPalette";

const mockdata = [
  {
    id_: 0,
    question: "Am I humorous?",
    lower: { number: 1, text: "not humurous" },
    upper: { number: 9, text: "extremely humurous" },
  },
  {
    id_: 1,
    question: "Am I interesting?",
    lower: { number: 1, text: "not at all" },
    upper: { number: 9, text: "very interesting" },
  },
  {
    id_: 3,
    question: "How likely will you hire me?",
    lower: { number: 1, text: "not at all" },
    upper: { number: 9, text: "very likely" },
  },
];

const AudioRate = ({ title, link, isWritten }) => {
  const { updateUser, sectionNum, nextSection, theme, sections } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  const { data } = JSON.parse(localStorage.getItem("data"));
  const { path } =
    data[sectionNum + 1] !== undefined
      ? links.find((link) => link.id === sections[sectionNum + 1])
      : links.find((link) => link.id === 8);

  const user = JSON.parse(localStorage.getItem("user"));

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

  const firstCandidate = Number(user.userResponse.rank[rankToDisplay][0])-1;
  const lastCandidate =
    Number(user.userResponse.rank[rankToDisplay][
      user.userResponse.rank[rankToDisplay].length - 1
    ])-1;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    isWritten
      ? updateUser({
          currentUser: {
            ...user,
            userResponse: {
              ...user.userResponse,
              writtenIntroRating: [
                ...user.userResponse.writtenIntroRating,
                rating,
              ],
            },
          },
          id: user._id,
        })
      : updateUser({
          currentUser: {
            ...user,
            userResponse: {
              ...user.userResponse,
              audioRating: [...user.userResponse.audioRating, rating],
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

  // generate random number to play audio
  const randomNum = isWritten
    ? Math.floor(
        Math.random() *
          data[sectionNum][sections[sectionNum]].introductions.length
      )
    : Math.floor(
        Math.random() * data[sectionNum][sections[sectionNum]].audioLink.length
      );

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
              ? arr[firstCandidate].optionName
              : arr[lastCandidate].optionName}
          </Typography>
          <Box className="imageBox">
            <img
              src={
                link.includes("q2")
                  ? arr[firstCandidate].link
                  : arr[lastCandidate].link
              }
              alt="candidate"
            />
          </Box>
          {isWritten ? (
            <IntroMessage
              text={
                data[sectionNum][sections[sectionNum]].introductions[randomNum]
              }
            />
          ) : (
            <Audio
              src={data[sectionNum][sections[sectionNum]].audioLink[randomNum]}
            />
          )}
        </Grid>
        <Grid item xs={7} px={4}>
          <AudioForm
            data={data[sectionNum][sections[sectionNum]].questions}
            setRating={setRating}
            isWritten={isWritten}
          />
        </Grid>
        <Grid item xs={12} className="spaceBetween" sx={{ py: 3, px: 9 }}>
          <NextButton
            isSurvey={true}
            disabled={
              !isValid(
                rating,
                data[sectionNum][sections[sectionNum]].questions.length
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
