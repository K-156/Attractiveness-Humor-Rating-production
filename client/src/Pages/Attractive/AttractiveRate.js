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
  const { updateUser, user, nextSection, theme, prevSection, sections } =
    useAppContext();
  const [rating, setRating] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const data = JSON.parse(sessionStorage.getItem("data"));
  const role = sessionStorage.getItem("role");
  const userGender = sessionStorage.getItem("userGender");
  const gender = sessionStorage.getItem("gender");
  const sectionNum = sessionStorage.getItem("sectionNum");

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
    }
  };

  const path =
    data[sections[Number(sectionNum) + 1]] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : links.find((link) => link.id === 8);

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

  const handleViewProfile = (e) => {
    e.preventDefault();
    prevSection();
    navigate("/profiles", {
      state: {
        link: location.pathname,
        type: "Rate",
      },
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        userResponse: {
          ...user.userResponse,
          [sectionNum]: rating,
        },
      },
      id: user._id,
    });
    nextSection();
    sessionStorage.setItem(
      "sectionNum",
      Number(sessionStorage.getItem("sectionNum")) + 1
    );
    navigate(path);
  };

  return (
    <div>
      <script>{(document.title = "Profile Rating")}</script>
      <Box className="spaceBetween" sx={{ width: "250px" }}>
        <Instruction type="attractive" />
        <Button
          variant="contained"
          className={`customButton-${theme}`}
          onClick={handleViewProfile}
        >
          View Profiles
        </Button>
      </Box>
      <Grid container spacing={1} py={2}>
        {_.map(arr, (item, index) => {
          return (
            <Grid item key={index} xs={3}>
              <RatingCard
                id={`option${index + 1}_rate_${sectionNum}`}
                title={item.optionName}
                img={item.link}
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
