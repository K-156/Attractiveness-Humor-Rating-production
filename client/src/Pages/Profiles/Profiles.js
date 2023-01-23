import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Box, Grid } from "@mui/material";
import _ from "lodash";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import Instruction from "../../Components/Instruction/Instruction";
import links from "../../Utils/links";

const Profiles = () => {
  const {
    sections,
    setActiveProject,
    getProject,
    activeProjectId,
    user,
    data
  } = useAppContext();
  const navigate = useNavigate();

  const gender = localStorage.getItem("gender");
  const sectionNum = localStorage.getItem("sectionNum");
  const type = sessionStorage.getItem("type");

  const path =
  data[Number(sectionNum) + 1] !== undefined
    ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
    : links.find((link) => link.id === 8).path;


  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
    }
  };

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
  }, [activeProjectId]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (type === "Rate" || type === "Rank") {
      navigate(links.find((link) => link.id === sections[sectionNum]).path);
    } else {
      localStorage.setItem(
        "sectionNum",
        Number(localStorage.getItem("sectionNum")) + 1
      );
      navigate(path);
    }
  };



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
    if (key === "1" || key === "2" || key === "3" || key === "4") {
      arr.push(value);
    }
  }

  return (
    <div>
      <script>{(document.title = "Attractiveness")}</script>
      <Instruction type="attractive" />
      <Grid container spacing={1} py={2}>
        {_.map(arr, (item, index) => {
          return (
            <Grid item key={index} xs={3}>
              <ItemCard
                id={index}
                title={item.optionName}
                img={item?.link}
                description={item.description}
                candidateCount={arr?.length}
                gender={gender === "true" ? oppGender(user.sex) : "NA"}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className="flexEnd">
        <NextButton
          isSurvey={true}
          text={type !== null ? type : "Next"}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default Profiles;
