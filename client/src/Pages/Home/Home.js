import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import { BsFillGearFill } from "react-icons/bs";
import _ from "lodash";

import { colorPalette } from "../../Utils/colorPalette";

const Home = () => {
  const { getProject, setActiveProject, activeProjectId } = useAppContext();
  const navigate = useNavigate();
  const handleOnClick = (event) => {
    sessionStorage.setItem("role", event.target.id.toLowerCase());
    navigate(`/login`);
  };

  useEffect(() => {
    // need to change project id
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
  }, [activeProjectId]);

  const { projDetails } = JSON.parse(localStorage.getItem("data"));

  console.log(projDetails);

  return (
    <div className={`backgroundImage-${projDetails.theme}`}>
      <script>{(document.title = "Welcome")}</script>

      <Box className="flexEnd" sx={{ mb: 5, m: 1 }}>
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
              color: colorPalette[projDetails.theme]["secondary"],
            }}
          >
            {projDetails.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              my: 3,
            }}
          >
            {projDetails.description}
          </Typography>
          <Grid container gap={1}>
            <Grid item xs={12} className="center" sx={{ my: 1 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: colorPalette[projDetails.theme]["secondary"],
                }}
              >
                I am an/a...
              </Typography>
            </Grid>
            {_.map(projDetails.roles, (role) => {
              return (
                <Grid item xs={5.5} className="center" key={role}>
                  <Button
                    id={role}
                    onClick={handleOnClick}
                    variant="contained"
                    className={`customButton-${projDetails.theme}`}
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
            src={projDetails.graphicLink}
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
