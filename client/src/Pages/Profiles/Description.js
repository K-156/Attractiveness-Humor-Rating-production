import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Pagination,
} from "@mui/material";
import _ from "lodash";

import PrevButton from "../../Components/NavButton/PrevButton";
import { colorPalette } from "../../Utils/colorPalette";

const Description = () => {
  const { theme, sectionNum, sections } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { id, candidateCount, link } = location.state;

  const data = JSON.parse(sessionStorage.getItem("data"));
  const role = sessionStorage.getItem("role");
  const userGender = sessionStorage.getItem("userGender");
  const gender = sessionStorage.getItem("gender");

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
    }
  };

  const attributes =
    data[sectionNum][1][role][gender === "true" ? oppGender(userGender) : "NA"][
      Number(id) + 1
    ].attributes;

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

      <Box>
        <PrevButton isSurvey={true} text="Profiles" link="/profiles" />
      </Box>
      <Box className="center">
        <Card sx={{ mt: 2, width: "800px" }}>
          <CardContent>
            <Grid container className="centerPadding" px={1} py={2} gap={1}>
              <Grid item xs={5}>
                <Box className="imageBox">
                  <img
                    src={
                      data[sectionNum][1][role][
                        gender === "true" ? oppGender(userGender) : "NA"
                      ][Number(id) + 1].link
                    }
                    alt="profile"
                  />
                </Box>
                <Typography
                  className="cardHeader"
                  sx={{ color: colorPalette[theme]["primary"] }}
                >
                  {
                    data[sectionNum][1][role][
                      gender === "true" ? oppGender(userGender) : "NA"
                    ][Number(id) + 1].optionName
                  }
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
                            color: colorPalette[theme]["secondary"],
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
          sx={{ color: colorPalette[theme]["primary"] }}
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
              color: colorPalette[theme]["primary"],
            },
            ".MuiPaginationItem-root.Mui-selected": {
              color: "#FFFFFF",
              backgroundColor: colorPalette[theme]["primary"],
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Description;
