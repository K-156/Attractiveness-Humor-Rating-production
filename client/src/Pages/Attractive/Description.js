import { useLocation, useNavigate } from "react-router-dom";

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

// const itemName = [
//   {
//     name: "Candidate 1",
//     img: "Female 1.jpg",
//   },
//   {
//     name: "Candidate 2",
//     img: "Female 2.jpg",
//   },
//   {
//     name: "Candidate 3",
//     img: "Female 3.jpg",
//   },
//   {
//     name: "Candidate 4",
//     img: "Female 4.jpg",
//   },
// ];

// const details = {
//   School: "Singapore Management University",
//   Major: "Information Systems",
//   GPA: "3.8",
//   Skills: "Python, Java, Figma",
// };

const Description = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, candidateCount } = location.state;

  const data = JSON.parse(localStorage.getItem("data"));
  const attributes = data.proj[id].attributes;

  const handleOnChange = (event) => {
    const newId = parseInt(event.target.textContent);
    navigate(`/attractive/profile/${newId}`, {
      state: {
        id: parseInt(newId) - 1,
        candidateCount: candidateCount,
      },
    });
  };

  return (
    <div>
      <script>{(document.title = "Description")}</script>

      <Box>
        <PrevButton link="attractive/profile" />
      </Box>
      <Box display="flex" justifyContent="center">
        <Card sx={{ mt: 2, width: "800px" }}>
          <CardContent>
            <Grid container className="center" px={1} py={2} gap={1}>
              <Grid item xs={5}>
                <Box
                  display="flex"
                  justifyContent="center"
                  height="200px"
                  py={2}
                >
                  <img src={data.proj[id].img} alt="profile" />
                </Box>
                <Typography
                  variant="subtitle2"
                  className="cardHeader"
                  fontWeight="bold"
                  height="100%"
                >
                  {data.proj[id].name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {_.map(attributes, (attribute, key) => {
                  const { field, value } = attribute;
                  return (
                    <Grid container gap={2} key={key} mt={1}>
                      <Grid
                        item
                        xs={3}
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="#C59D5F"
                        >
                          {field}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="subtitle2">{value}</Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          my={2}
          color="#264653"
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
            color: "#264653",
            ".css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root": { mx: 2 },
            ".css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
              {
                color: "#FFFFFF",
                backgroundColor: "#264653",
              },
          }}
        />
      </Box>
    </div>
  );
};

export default Description;
