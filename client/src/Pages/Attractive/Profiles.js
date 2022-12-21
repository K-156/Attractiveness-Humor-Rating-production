import { Box, Grid } from "@mui/material";
import _ from "lodash";
import { useAppContext } from "../../Context/AppContext";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import Instruction from "../../Components/Instruction/Instruction";

const Profiles = () => {
  const { sectionNum } = useAppContext();
  let arr = [];

  const { data } = JSON.parse(localStorage.getItem("data"));

  for (const [key, value] of Object.entries(data[sectionNum][[Object.keys(data[sectionNum])[0]]])) {
    if (key !== "instruction") {
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
                // img={item.img}
                description={item.description}
                candidateCount={arr.length}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className="spaceBetween">
        <PrevButton isSurvey={true} link="/attractive-instruction" />
        <NextButton isSurvey={true} link="/attractive/rate" />
      </Box>
    </div>
  );
};

export default Profiles;
