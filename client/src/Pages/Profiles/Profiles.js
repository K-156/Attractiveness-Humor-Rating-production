import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import _ from "lodash";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import Instruction from "../../Components/Instruction/Instruction";
import links from "../../Utils/links";


const Profiles = () => {
  const { sectionNum, nextSection } = useAppContext();
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const { data } = JSON.parse(localStorage.getItem("data"));
  const { path } = links.find(
    (link) => link.id == Object.keys(data[sectionNum + 1])[0]
  );

  let arr = [];

  console.log(path)


  for (const [key, value] of Object.entries(
    data[sectionNum][[Object.keys(data[sectionNum])[0]]]
  )) {
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      arr.push(value);
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    nextSection()
    navigate(path);
  };

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
                img={item.link}
                description={item.description}
                candidateCount={arr.length}
                link={state["link"]}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className="flexEnd">
        <NextButton
          isSurvey={true}
          text={state ? state["type"] : "Next"}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default Profiles;
