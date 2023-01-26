import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";
import _ from "lodash";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import Instruction from "../../Components/Instruction/Instruction";
import links from "../../Utils/links";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

const Profiles = () => {
  const {
    sections,
    setActiveProject,
    getProject,
    activeProjectId,
    user,
    data,
    theme
  } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const gender = localStorage.getItem("gender");
  const sectionNum = localStorage.getItem("sectionNum");
  const type = localStorage.getItem("type");
  const profileView = JSON.parse(localStorage.getItem("profiles"));

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
      getProject(activeProjectId).then(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
      {isLoading ? (
        <div className={`background-${theme} center`}>
          <Loading />
        </div>
      ) : (
        <>
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
              disabled={profileView === null || profileView?.length < arr?.length}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Profiles;
