import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Box, Grid } from "@mui/material";

import PrevButton from "../../Components/NavButton/PrevButton";
import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/Form/AudioForm";
import { isValid } from "../../Utils/isValid";
import IntroMessage from "../../Components/Message/IntroMessage";
import Instruction from "../../Components/Instruction/Instruction";
import Audio from "../../Components/Audio/Audio";

const AudioRate = ({ title, link, isWritten }) => {
  const { updateUser } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("data"));
  const user = JSON.parse(localStorage.getItem("user"));
  const firstCandidate = user.userResponse.rank[0];
  const lastCandidate =
    user.userResponse.rank[user.userResponse.rank.length - 1];

    console.log(isWritten)

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
    navigate(link);
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
      <Grid container className="center" gap={2}>
        <Grid item xs={4} px={4}>
          <Box display="flex" justifyContent="center" height="200px" py={2}>
            <img
              src={
                link.includes("q2")
                  ? data.proj[firstCandidate].img
                  : data.proj[lastCandidate].img
              }
              alt="logo"
            />
          </Box>
          {isWritten ? (
            <IntroMessage text={data.writtenIntro} />
          ) : (
            <Audio src={data.audio} />
          )}
        </Grid>
        <Grid item xs={7} px={4}>
          <AudioForm
            ques={data.audioRatingInstruc}
            setRating={setRating}
            isWritten={isWritten}
          />
        </Grid>
        <Grid
          item
          xs={12}
          py={2}
          px={9}
          display="flex"
          justifyContent="space-between"
        >
          {parseInt(title) === 1 ? (
            <PrevButton link="/audio-instruction" />
          ) : (
            <Box></Box>
          )}
          <NextButton
            disabled={
              !isValid(rating, Object.keys(data.audioRatingInstruc).length)
            }
            handleOnSubmit={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AudioRate;
