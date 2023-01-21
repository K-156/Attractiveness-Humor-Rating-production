import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import _ from "lodash";

import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import DragAndDrop from "../../Components/DragAndDrop/DragAndDrop";
import links from "../../Utils/links";

// const instruction = "Drag and drop the candidates to rank them, with the most interested candidate on the left."

const mockdata = [
  {
    _id: 1,
    name: "Candidate 1",
    img: "../../Assets/Candidates/Female 1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
      "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi",
  },
  {
    _id: 2,
    name: "Candidate 2",
    img: "../../Assets/Candidates/Female 2.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
      "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi",
  },
  {
    _id: 3,
    name: "Candidate 3",
    img: "../../Assets/Candidates/Female 3.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
      "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi",
  },
  {
    _id: 4,
    name: "Candidate 4",
    img: "../../Assets/Candidates/Female 4.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
      "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi",
  },
];

const Rank = () => {
  const {
    theme,
    updateUser,
    user,
    nextSection,
    sections,
    prevSection,
  } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const data = JSON.parse(sessionStorage.getItem("data"));
  const role = sessionStorage.getItem("role");
  const userGender = sessionStorage.getItem("userGender");
  const gender = sessionStorage.getItem("gender");
  const sectionNum = sessionStorage.getItem("sectionNum");

  const oppGender = (userGender) => {
    if (userGender === "female") {
      return "Male";
    } else {
      return "Female";
    }
  };

  const path =
    data[sections[Number(sectionNum) + 1]] !== undefined
      ? links.find((link) => link.id === sections[Number(sectionNum) + 1]).path
      : links.find((link) => link.id === 8);

  let arr = [];
  let arrOfProfile = [];
  let dataToDisplay = {};

  // find how many profile
  for (const [sectionNum, dict] of Object.entries(data)) {
    for (const [templateNo, data] of Object.entries(dict)) {
      if (Number(templateNo) === 1) {
        arrOfProfile.push(Number(sectionNum));
      }
    }
  }
  // find which profile to display
  for (let i = 0; i < arrOfProfile.length; i++) {
    const element = arrOfProfile[i];
    if (element <= sectionNum) {
      dataToDisplay =
        data[element][1][role][
          gender === "true" ? oppGender(userGender) : "NA"
        ];
    }
  }

  for (const [key, value] of Object.entries(dataToDisplay)) {
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      value["_id"] = Number(key);
      arr.push(value);
    }
  }


  const [allItems, setAllItems] = useState(arr);
  const [items, setItems] = useState(arr);
  const [rankItems, setRankItems] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        userResponse: {
          ...user.userResponse,
          rank: [...user.userResponse.rank, rankItems],
        },
      },
      id: user._id,
    });
    nextSection();
    sessionStorage.setItem(
      "sectionNum",
      Number(sessionStorage.getItem("sectionNum")) + 1
    );
    navigate(path);
  };

  return (
    <div>
      <script>{(document.title = "Profile Ranking")}</script>
      <Box className="spaceBetween">
        <Box className="spaceBetween" sx={{ width: "250px" }}>
          <Instruction type="rank" />
          <Button
            variant="contained"
            className={`customButton-${theme}`}
            onClick={() => {
              prevSection();
              navigate("/profiles", {
                state: {
                  link: location.pathname,
                  type: "Rank",
                },
              });
            }}
          >
            View Profiles
          </Button>
        </Box>
        <Button
          variant="contained"
          className={`customButton-${theme}`}
          onClick={() => {
            setRankItems([]);
            setItems(allItems);
          }}
        >
          Reset Rank
        </Button>
      </Box>
      <DragAndDrop
        items={items}
        setItems={setItems}
        rankItems={rankItems}
        setRankItems={setRankItems}
        allItems={allItems}
      />
      <Box className="flexEnd" sx={{ mt: 3 }}>
        <NextButton
          disabled={rankItems.length < allItems.length}
          ratingType="rank"
          isSurvey={true}
          // storeItem={JSON.stringify({
          //   most: rankItems[0],
          //   least: rankItems[rankItems.length - 1],
          // })}
          handleOnSubmit={handleOnSubmit}
        />
      </Box>
    </div>
  );
};

export default Rank;
