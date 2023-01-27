import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import { Button, Tooltip } from "@mui/material";

import { themePalette } from "../../Utils/themePalette";

const Instruction = ({ type }) => {
  const {
    theme,
    activeProjectId,
    setActiveProject,
    getProject,
    user,
    data,
    sections,
  } = useAppContext();
  const sectionNum = localStorage.getItem("sectionNum");

  useEffect(() => {
    setActiveProject();
    if (activeProjectId !== "") {
      getProject(activeProjectId);
    }
    // eslint-disable-next-line
  }, [activeProjectId]);

  return (
    <div className="flexStart">
      <Tooltip
        title={
          data.length !== 0 && (type === "audio" || type === "written")
            ? data[sectionNum][sections[sectionNum]][user.surveyRole]
                ?.ratingInstruction
            : data[sectionNum][sections[sectionNum]][user.surveyRole]
                ?.instruction
        }
        placement="bottom-start"
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: themePalette[theme]["primaryLight"],
              color: themePalette[theme]["primary"],
              p: 2,
              border: `solid 1px ${themePalette[theme]["primary"]}`,
              fontSize: "14px",
              textAlign: "center",
              maxWidth: 800,
              whiteSpace: "pre-line",
            },
          },
        }}
      >
        <Button
          variant="contained"
          className={`customButton-${theme}`}
          sx={{
            "&.MuiButton-contained:hover": {
              background: themePalette[theme]["primary"],
            },
          }}
        >
          Instruction
        </Button>
      </Tooltip>
    </div>
  );
};

export default Instruction;
