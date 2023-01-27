import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Pagination,
} from "@mui/material";
import _ from "lodash";

import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import PrevButton from "../../Components/NavButton/PrevButton";
import { themePalette } from "../../Utils/themePalette";

const Description = () => {
  const { theme, data, user, setActiveProject, getProject, activeProjectId } =
    useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id, candidateCount, link } = location.state;

  const gender = localStorage.getItem("gender");
  const sectionNum = localStorage.getItem("sectionNum");

  // check profiles viewed
  useEffect(() => {
    const getProfileView = JSON.parse(localStorage.getItem("profiles"));

    const profileView = getProfileView === null ? [] : getProfileView;
    if (!profileView.includes(id.toString())) {
      profileView.push(id.toString());
    }
    localStorage.setItem("profiles", JSON.stringify(profileView));
  }, [id]);

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [activeProjectId]);

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
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

  const attributes = arr[id]?.attributes;

  const handleOnChange = (event) => {
    const newId = parseInt(event.target.textContent);
    navigate(`/profiles/${newId}`, {
      state: {
        id: parseInt(newId) - 1,
        candidateCount: candidateCount,
        link: link,
      },
    });
  };

  return (
    <div>
      <script>{(document.title = "Description")}</script>
      {isLoading ? (
        <div className={`background-${theme} center`}>
          <Loading />
        </div>
      ) : (
        <>
          {" "}
          <Box>
            <PrevButton isSurvey={true} text="Profiles" link="/profiles" />
          </Box>
          <Box className="center">
            <Card sx={{ mt: 2, width: "800px" }}>
              <CardContent>
                <Grid container className="centerPadding" px={1} py={2} gap={1}>
                  <Grid item xs={5}>
                    <Box className="imageBox">
                      <img src={arr[id]?.link} alt="profile" />
                    </Box>
                    <Typography
                      className="cardHeader"
                      sx={{ color: themePalette[theme]["primary"] }}
                    >
                      {arr[id]?.optionName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {_.map(attributes, (attribute, key) => {
                      const { name, value } = attribute;
                      return (
                        <Grid container gap={2} key={key} mt={1}>
                          <Grid item xs={3} className="flexEnd">
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: themePalette[theme]["secondary"],
                              }}
                            >
                              {name}
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography sx={{ fontSize: "14px" }}>
                              {value}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          <Box
            className="flexColumn"
            sx={{
              alignItems: "center",
              mt: 5,
            }}
          >
            <Typography
              className="cardHeader"
              sx={{ color: themePalette[theme]["primary"] }}
            >
              CANDIDATES
            </Typography>
            <Pagination
              count={candidateCount.candidateCount}
              variant="outlined"
              hideNextButton
              hidePrevButton
              page={parseInt(id) + 1}
              onChange={handleOnChange}
              sx={{
                mt: 2,
                ".MuiPaginationItem-root": {
                  mx: 2,
                  color: themePalette[theme]["primary"],
                },
                ".MuiPaginationItem-root.Mui-selected": {
                  color: "#FFFFFF",
                  backgroundColor: themePalette[theme]["primary"],
                },
              }}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Description;
