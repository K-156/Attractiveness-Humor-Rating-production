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
    sectionNum,
    nextSection,
    sections,
    setActiveProject,
    getProject,
    activeProjectId,
  } = useAppContext();
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");
  const data = JSON.parse(sessionStorage.getItem("data"))
  const userGender = sessionStorage.getItem("userGender");
  const gender = sessionStorage.getItem("gender");

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male"
    } else {
      return "Female"
    }
  }

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId)
    }
  }, [activeProjectId]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    nextSection();
    navigate(links.find((link) => link.id === sections[sectionNum]).path);
    // navigate(state["link"] ? state["link"] : path);
  };

  let arr = [];
  let arrOfProfile = [];
  let dataToDisplay = {};

  // find how many profile
  for (const [sectionNum, dict] of Object.entries(data)) {
    for (const [templateNo, data] of Object.entries(dict)) {
      if (Number(templateNo)=== 1) {
        arrOfProfile.push(Number(sectionNum));
      }
    }
  }

  // find which profile to display
  for (let i = 0; i < arrOfProfile.length; i++) {
    const element = arrOfProfile[i];
    if (element <= sectionNum) {
      dataToDisplay = data[element][1][role][gender === "true" ? oppGender(userGender) : "NA"];
    }
  }
  for (const [key, value] of Object.entries(dataToDisplay)) {
    if (key === '1' || key === '2' || key === '3' || key === '4') {
      arr.push(value);
    }
  }

  console.log(arr)

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
                gender={gender === "true" ? oppGender(userGender) : "NA"}
                // link={state["link"]}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className="flexEnd">
        <NextButton
          isSurvey={true}
          text={state ? state["type"] : "Next"}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default Profiles;
