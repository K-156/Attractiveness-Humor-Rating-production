import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import { BsFillGearFill, BsArrowRight } from "react-icons/bs";
import _ from "lodash";

import { colorPalette } from "../../Utils/colorPalette";

const Home = () => {
  const { getProject, setActiveProject, activeProjectId, theme } =
    useAppContext();
  const navigate = useNavigate();
  const handleOnClick = (event) => {
    sessionStorage.setItem("role", event.target.id.toLowerCase());
    navigate(`/login`);
  };

  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
  }, [activeProjectId]);

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Welcome")}</script>

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
            {data?.projDetails.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              my: 3,
            }}
          >
            {data?.projDetails.description}
          </Typography>
          <Grid container gap={1}>
            <Grid item xs={12} className="center" sx={{ my: 1 }}>
              {data?.projDetails.roles.length === 0 ? (
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
            {data?.projDetails.roles.length > 0 &&
              _.map(data?.projDetails.roles, (role) => {
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
            src={data?.projDetails.graphicLink}
            alt="landing page"
            style={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
