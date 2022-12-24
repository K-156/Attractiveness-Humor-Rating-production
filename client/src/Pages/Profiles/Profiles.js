import { useAppContext } from "../../Context/AppContext";
import { useLocation } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import _ from "lodash";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import Instruction from "../../Components/Instruction/Instruction";

const Profiles = () => {
  const { sectionNum } = useAppContext();
  const location = useLocation();
  const state = location.state;

  console.log(location)
  console.log(state.state)

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
                link = {state["link"]}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className="flexEnd">
        <NextButton 
          isSurvey={true} 
          text={state ? state["type"] : "Next"} 
          link={state["link"] ? state["link"] : "/attractive/rate"} 
        />
      </Box>
      
    </div>
  );
};

export default Profiles;
