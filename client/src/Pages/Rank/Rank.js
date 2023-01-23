import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import DragAndDrop from "../../Components/DragAndDrop/DragAndDrop";
import links from "../../Utils/links";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

const Rank = () => {
  const {
    theme,
    updateUser,
    user,
    data,
    sections,
    setActiveProject,
    activeProjectId,
    getProject,
  } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const gender = sessionStorage.getItem("gender");
  const sectionNum = localStorage.getItem("sectionNum");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId).then((proj) => {
        let arr = [];
        let arrOfProfile = [];
        let dataToDisplay = {};
        const { data } = proj;
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
              data[element][1][user.surveyRole][
                gender === "true" ? oppGender(user.sex) : "NA"
              ];
          }
        }

        for (const [key, value] of Object.entries(dataToDisplay)) {
          if (key == 1 || key == 2 || key == 3 || key == 4) {
            value["_id"] = Number(key);
            arr.push(value);
          }
        }
        setAllItems(arr);
        setItems(arr);
        setIsLoading(false);
      });
    }
  }, [activeProjectId]);

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

  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [rankItems, setRankItems] = useState([]);

  const rankDict = {};
  rankItems.map((item, index) => {
    const result = rankItems.indexOf(index + 1);
    rankDict[`option${index + 1}_rank`] = result + 1;
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUser({
      currentUser: {
        ...user,
        rank: [...user.rank, rankItems],
        userResponse: {
          ...user.userResponse,
          [sectionNum]: rankDict,
        },
      },
      id: user._id,
    });
    localStorage.setItem(
      "sectionNum",
      Number(localStorage.getItem("sectionNum")) + 1
    );
    navigate(path);
  };

  const handleViewProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("type", "Rank");
    navigate("/profiles", {
      state: {
        link: location.pathname,
        type: "Rank",
      },
    });
  };

  return (
    <div>
      <script>{(document.title = "Profile Ranking")}</script>
      {isLoading ? (
        <div className={`background-${theme} center`}>
          <Loading />
        </div>
      ) : (
        <>
          <Box className="spaceBetween">
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
              handleOnSubmit={handleOnSubmit}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Rank;
