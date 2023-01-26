import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import { BsFillGearFill, BsArrowRight } from "react-icons/bs";
import _ from "lodash";

import { colorPalette } from "../../Utils/colorPalette";
import links from "../../Utils/links";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

const Home = () => {
  const {
    getProject,
    setActiveProject,
    activeProjectId,
    theme,
    projDetails,
    sections,
    user,
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const rolesList = projDetails.roles;
  let roles = [];
  rolesList.forEach((dict) => {
    roles.push(dict["role"]);
  });

  let sectionNum = localStorage.getItem("sectionNum");

  const handleOnClick = (event) => {
    localStorage.setItem("role", event.target.id);
    rolesList.forEach((dict) => {
      if (dict["role"] === event.target.id) {
        localStorage.setItem("gender", dict["isGender"]);
      }
    });
    if (user?.role === "admin" && sectionNum === null) {
      navigate(`/consent`);
    } else if (user?.role === "admin") {
      navigate(links.find((link) => link.id === sections[sectionNum]).path);
    } else
      sectionNum === null
        ? navigate(`/login`)
        : navigate(links.find((link) => link.id === sections[sectionNum]).path);
  };

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then((proj) => {
        localStorage.setItem("duration", proj.projDetails.duration);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [activeProjectId]);

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Welcome")}</script>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ position: "absolute", top: "16px", right: "8px" }}>
            <Button onClick={() => navigate("/alogin")}>
              <BsFillGearFill size="25px" style={{ color: "#A3A3A3" }} />
            </Button>
          </Box>
          <Grid container className="centerPadding" gap={2}>
            <Grid item xs={4.5} px={4}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: colorPalette[theme]?.secondary,
                }}
              >
                {projDetails?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  my: 3,
                }}
              >
                {projDetails?.description}
              </Typography>
              <Grid container gap={1}>
                <Grid item xs={12} className="center" sx={{ my: 1 }}>
                  {roles.length === 0 ? (
                    <Button
                      id="start"
                      onClick={handleOnClick}
                      variant="contained"
                      className={`customButton-${theme}`}
                    >
                      Start <BsArrowRight style={{ marginLeft: "10px" }} />
                    </Button>
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: colorPalette[theme]?.secondary,
                      }}
                    >
                      I am an/a...
                    </Typography>
                  )}
                </Grid>
                {roles.length > 0 &&
                  _.map(roles, (role) => {
                    return (
                      <Grid item xs={5.5} className="center" key={role}>
                        <Button
                          id={role}
                          onClick={handleOnClick}
                          variant="contained"
                          className={`customButton-${theme}`}
                        >
                          {role}
                        </Button>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid item xs={5.5}>
              <img
                src={projDetails?.graphicLink}
                alt="landing page"
                style={{
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};
export default Home;
