import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Box, Grid } from "@mui/material";

import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/SurveyForm/AudioForm";
import { isValid } from "../../Utils/isValid";
import IntroMessage from "../../Components/Message/IntroMessage";
import Instruction from "../../Components/Instruction/Instruction";
import Audio from "../../Components/Audio/Audio";
import links from "../../Utils/links";

const mockdata = [
  { id_: 0, 
    question: "Am I humorous?",
    lower: {number: 1, text: "not humurous"}, 
    upper: {number: 9, text: "extremely humurous"}, 
  },
  { id_: 1, 
    question: "Am I interesting?",
    lower: {number: 1, text: "not at all"}, 
    upper: {number: 9, text: "very interesting"}, 
  }, 
  { id_: 3, 
    question: "How likely will you hire me?",
    lower: {number: 1, text: "not at all"}, 
    upper: {number: 9, text: "very likely"}, 
  }
]

const AudioRate = ({ title, link, isWritten }) => {
  const { updateUser, sectionNum, nextSection } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  const { data, sections } = JSON.parse(localStorage.getItem("data"));
  const { path } = links.find((link) => link.id === sections[sectionNum + 1]);

  const user = JSON.parse(localStorage.getItem("user"));
  const firstCandidate = user.userResponse.rank[0];
  const lastCandidate =
    user.userResponse.rank[user.userResponse.rank.length - 1];

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
        if (title === "1"){
          navigate(link)
        } else{
          nextSection();
          navigate(path);
        }
  };

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
          <Box className="imageBox">
            {/* <img
              src={
                link.includes("q2")
                  ? data.proj[firstCandidate].img
                  : data.proj[lastCandidate].img
              }
              alt="candidate"
            /> */}
          </Box>
          {isWritten ? (
            <IntroMessage text={data[sectionNum][sections[sectionNum]].introductions} />
          ) : (
            <Audio src={data.audio} />
          )}
        </Grid>
        <Grid item xs={7} px={4}>
          <AudioForm
            // data={data[sectionNum][sections[sectionNum]].questions}
            data={mockdata}
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
