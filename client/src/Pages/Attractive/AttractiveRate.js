import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Grid } from "@mui/material";
import _ from "lodash";

import RatingCard from "../../Components/SurveyForm/RatingCard";
import NextButton from "../../Components/NavButton/NextButton";
import { isValid } from "../../Utils/isValid";
import Instruction from "../../Components/Instruction/Instruction";
import links from "../../Utils/links";

const AttractiveRate = () => {
  const { updateUser, user, sectionNum, nextSection, theme } = useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  let arr = [];

  const { data } = JSON.parse(localStorage.getItem("data"));
  const { path } = links.find(
    (link) => link.id == Object.keys(data[sectionNum + 1])[0]
  );

  for (const [key, value] of Object.entries(
    data[sectionNum][[Object.keys(data[sectionNum])[0]]]
  )) {
    if (key !== "instruction") {
      arr.push(value);
    }
  }

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
    nextSection();
    navigate(path);
  };

  return (
    <div>
      <script>{(document.title = "Profile Rating")}</script>
      <Box className="spaceBetween" sx={{width: "250px"}}>
        <Instruction type="attractive" />
        <Button
          variant="contained"
          className={`customButton-${theme}`}
          onClick={() => {
            navigate("/profiles", {
              state: {
                link: location.pathname,
                type: "Rate"
              }})
            }}
          >
          View Profiles
        </Button>
      </Box>
      <Grid container spacing={1} py={2}>
        {_.map(arr, (item, index) => {
          return (
            <Grid item key={index} xs={3}>
              <RatingCard
                id={index}
                title={item.optionName}
                // img={item.img}
                description={item.description}
                setRating={setRating}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className="flexEnd">
        <NextButton
          isSurvey={true}
          disabled={!isValid(rating, arr.length)}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default AttractiveRate;
