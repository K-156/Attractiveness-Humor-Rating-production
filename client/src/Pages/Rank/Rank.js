import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";
import _ from "lodash";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableCard from "../../Components/DragAndDrop/SortableCard";
import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as Arrow } from "../../Assets/arrow.svg";
import links from "../../Utils/links";

// const instruction = "Drag and drop the candidates to rank them, with the most interested candidate on the left."

const allItems = [
  {
    name: "Candidate 1",
    img: "../../Assets/Candidates/Female 1.jpg",
  },
  {
    name: "Candidate 2",
    img: "../../Assets/Candidates/Female 2.jpg",
  },
  {
    name: "Candidate 3",
    img: "../../Assets/Candidates/Female 3.jpg",
  },
  {
    name: "Candidate 4",
    img: "../../Assets/Candidates/Female 4.jpg",
  },
];

const Rank = () => {
  const { theme } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionNum, prevSection, nextSection, updateUser, user } =
    useAppContext();

  const { data } = JSON.parse(localStorage.getItem("data"));
  const { path } =
    data[sectionNum + 1] !== undefined
      ? links.find((link) => link.id == Object.keys(data[sectionNum + 1])[0])
      : links.find((link) => link.id === 8);

  const [itemName, setItemName] = useState(allItems);
  const [isSelect, setIsSelect] = useState({});

  let arr = [];
  let arrOfProfile = [];
  let dataToDisplay = {};

  // find how many profile
  for (const [sectionNum, dict] of Object.entries(data)) {
    for (const [templateNo, data] of Object.entries(dict)) {
      if (templateNo == 1) {
        arrOfProfile.push(sectionNum);
      }
    }
  }
  // find which profile to display
  for (let i = 0; i < arrOfProfile.length; i++) {
    const element = arrOfProfile[i];
    if (element < sectionNum) {
      dataToDisplay = data[element][1];
    }
  }

  for (const [key, value] of Object.entries(dataToDisplay)) {
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      arr.push(value);
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItemName((allItems) => {
        const activeIndex = Object.keys(allItems).findIndex(
          (id) => id === active.id
        );
        const overIndex = Object.keys(allItems).findIndex(
          (id) => id === over.id
        );
        return arrayMove(allItems, activeIndex, overIndex);
      });
    }
    setIsSelect({});
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setIsSelect((state) => ({ ...state, [active.id]: true }));
    }
  };

  const handleViewProfile = (e) => {
    e.preventDefault();
    prevSection();
    navigate("/profiles", {
      state: {
        link: location.pathname,
        type: "Rate",
      },
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        userResponse: {
          ...user.userResponse,
          rank: [
            ...user.userResponse.rank,
            //fake data
            [0, 1, 2, 3],
          ],
        },
      },
      id: user._id,
    });
    nextSection();
    navigate(path);
  };

  return (
    <div>
      <script>{(document.title = "Profile Ranking")}</script>
      <Box className="spaceBetween" sx={{ width: "250px" }}>
        <Instruction type="rank" />
        <Button
          variant="contained"
          className={`customButton-${theme}`}
          onClick={handleViewProfile}
        >
          View Profiles
        </Button>
      </Box>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragOver}
      >
        <Grid container spacing={1} py={2}>
          <Grid item xs={12}></Grid>
          <SortableContext
            items={Object.keys(arr)}
            strategy={horizontalListSortingStrategy}
          >
            {_.map(Object.keys(arr), (key) => {
              return (
                <Grid item key={key} xs={3}>
                  <SortableCard
                    id={key}
                    title={arr[key]["optionName"]}
                    img={arr[key]["link"]}
                    isSelect={isSelect}
                    candidateCount={Object.keys(arr).length}
                  />
                </Grid>
              );
            })}
          </SortableContext>
        </Grid>
      </DndContext>

      <Arrow style={{ width: "100%" }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight="bold" color="#717171">
          Most Interested
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="#717171">
          Least Interested
        </Typography>
      </Box>
      <Box className="flexEnd" sx={{ mt: 3 }}>
        <NextButton
          handleOnSubmit={handleOnSubmit}
          ratingType="rank"
          isSurvey={true}
          storeItem={JSON.stringify({
            most: itemName[0],
            least: itemName[Object.keys(itemName).length - 1],
          })}
        />
      </Box>
    </div>
  );
};

export default Rank;
