import { useAppContext } from "../../Context/AppContext";

import { Box, Typography } from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import _ from "lodash";

import { ReactComponent as Arrow } from "../../Assets/arrow.svg";
import Droppable from "./Droppable";
import RankCard from "./RankCard";
import { themePalette } from "../../Utils/themePalette";

const arrowRange = { lower: "Least Interested", upper: "Most Interested" };

const DragAndDrop = ({
  items,
  setItems,
  rankItems,
  setRankItems,
  allItems,
}) => {
  const { theme } = useAppContext();

  const onDragOver = ({ active, over }) => {
    if (over.id === "droppable" && !rankItems.includes(active.id)) {
      setRankItems(rankItems.concat(active.id));
      setItems(items.filter((aItem) => aItem["_id"] !== active.id));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragOver={onDragOver}>
      <Droppable>
        {rankItems.length > 0 ? (
          _.map(rankItems, (id) => {
            const currItem = allItems.filter((aItem) => aItem["_id"] === id)[0];
            return (
              <RankCard
                key={currItem["_id"]}
                id={currItem["_id"]}
                title={currItem["optionName"]}
                img={currItem["link"]}
                description={currItem["description"]}
              />
            );
          })
        ) : (
          <Typography
            sx={{
              color: themePalette[theme]["primary"],
              fontSize: "14px",
              position: "relative",
              margin: "auto",
            }}
          >
            Drag and drop candidates here
          </Typography>
        )}
      </Droppable>
      <Arrow style={{ width: "100%" }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight="bold" color="#717171">
          {arrowRange["upper"]}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="#717171">
          {arrowRange["lower"]}
        </Typography>
      </Box>
      <Box
        className={items.length > 0 ? "flexStart" : "center"}
        sx={{
          backgroundColor: "#DFDFDF",
          width: "100%",
          height: "450px",
          borderRadius: "10px",
          mt: 1,
          mb: 1,
          padding: 2,
        }}
      >
        {items.length > 0 ? (
          _.map(items, (aItem) => {
            return (
              <RankCard
                key={aItem["_id"]}
                id={aItem["_id"]}
                title={aItem["optionName"]}
                img={aItem["link"]}
                description={aItem["description"]}
              />
            );
          })
        ) : (
          <Typography
            sx={{
              color: "#6A6A6A",
              fontSize: "14px",
            }}
          >
            Candidates
          </Typography>
        )}
      </Box>
    </DndContext>
  );
};

export default DragAndDrop;
