import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import _ from "lodash";
import { useAppContext } from "../../Context/AppContext";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import Instruction from "../../Components/Instruction/Instruction";

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

const Profiles = () => {
  const { getProject } = useAppContext();

  useEffect(() => {
    // need to change project id
    getProject("639809da432d34c654c930cd");
  }, []);

  const data = JSON.parse(localStorage.getItem("data"));

  return (
    <div>
      <script>{(document.title = "Attractiveness")}</script>
      <Instruction type="attractive" />
      <Grid container spacing={1} py={2}>
        {_.map(data.project.proj, (item, index) => {
          return (
            <Grid item key={index} xs={3}>
              <ItemCard
                id={index}
                title={item.name}
                img={item.img}
                description={item.description}
                candidateCount={Object.keys(data.project.proj).length}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="space-between">
        <PrevButton link="attractive" />
        <NextButton link="attractive/rate" />
      </Box>
    </div>
  );
};

export default Profiles;
