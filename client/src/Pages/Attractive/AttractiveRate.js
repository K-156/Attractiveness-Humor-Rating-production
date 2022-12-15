import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Button } from "@mui/material";
import _ from "lodash";

import RatingCard from "../../Components/Form/RatingCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import { isValid } from "../../Utils/isValid";
import Instruction from "../../Components/Instruction/Instruction";

const AttractiveRate = () => {
  const { updateUser, user } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("data"));

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        userResponse: {
          ...user.userResponse,
          attractivenessRating: [
            ...user.userResponse.attractivenessRating,
            rating,
          ],
        },
      },
      id: user._id,
    });
    navigate("/rank-instruction");
  };


  return (
    <div>
      <script>{(document.title = "Profile Rating")}</script>
      <Instruction type="attractive" />
      <Grid container spacing={1} py={2}>
        {_.map(data.proj, (item, index) => {
          return (
            <Grid item key={item.name} xs={3}>
              <RatingCard
                id={index}
                title={item.name}
                img={item.img}
                description={item.description}
                setRating={setRating}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="space-between">
        <PrevButton link="/attractive/profile" />
        <NextButton
          disabled={!isValid(rating, Object.keys(data.proj).length)}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default AttractiveRate;
