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

const AudioRate = ({ title, link, isWritten }) => {
  const { updateUser, nextSection, theme } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  const data = JSON.parse(sessionStorage.getItem("data"));
  const role = sessionStorage.getItem("role");

  const userGender = sessionStorage.getItem("userGender");
  const gender = sessionStorage.getItem("gender");
  const sectionNum = Number(sessionStorage.getItem("sectionNum"));
  const sections = JSON.parse(sessionStorage.getItem("sections"))

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
    }
  };

  const path =
    data[sectionNum+1] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : links.find((link) => link.id === 8);

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
        data[element][1][role][
          gender === "true" ? oppGender(userGender) : "NA"
        ];
    }
  }

  for (const [key, value] of Object.entries(dataToDisplay)) {
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      arr.push(value);
    }
  }

  const firstCandidate = Number(user.userResponse.rank[rankToDisplay][0]) - 1;
  const lastCandidate =
    Number(
      user.userResponse.rank[rankToDisplay][
        user.userResponse.rank[rankToDisplay].length - 1
      ]
    ) - 1;

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
      sessionStorage.setItem(
        "sectionNum",
        Number(sessionStorage.getItem("sectionNum")) + 1
      );
      navigate(path);
    }
  };

  // generate random number to play audio
  function getRandomNumber(title) {
    // Check if a random number is stored in local storage
    const storedNumber = localStorage.getItem(`randomNumber${title}`);

    // If a random number is stored, return it
    if (storedNumber) {
      return storedNumber;
    }

    // If no random number is stored, generate a new one and store it in local storage
    const randomNumber = isWritten
      ? Math.floor(
          Math.random() *
            data[sectionNum][sections[sectionNum]][role].introductions.length
        )
      : Math.floor(
          Math.random() *
            data[sectionNum][sections[sectionNum]][role].audioLink.length
        );
    localStorage.setItem(`randomNumber${title}`, randomNumber);
    return randomNumber;
  }

  // Use the getRandomNumber() function to get a random number
  const randomNum = getRandomNumber(title);

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
                data[sectionNum][sections[sectionNum]][role].introductions[
                  randomNum
                ]
              }
            />
          ) : (
            <Audio
              src={
                data[sectionNum][sections[sectionNum]][role].audioLink[
                  randomNum
                ]
              }
            />
          )}
        </Grid>
        <Grid item xs={7} px={4}>
          <AudioForm
            data={data[sectionNum][sections[sectionNum]][role].questions}
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
                data[sectionNum][sections[sectionNum]][role].questions.length
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
