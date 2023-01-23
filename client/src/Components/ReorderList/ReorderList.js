import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import _ from "lodash";
import { TfiArrowCircleUp, TfiArrowCircleDown } from "react-icons/tfi";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { templates } from "../../Utils/templateList";
import DeleteDialog from "../Dialog/DeleteDialog";

const ReorderList = ({
  formData,
  setFormData,
  error,
  setError,
  isEditing,
  data,
  projId,
}) => {
  const { updateProject } = useAppContext();

  const changeOrder = (index, direction) => {
    let newIndex = index;
    if (direction === "up" && index > 0) {
      newIndex -= 1;
    } else if (direction === "down" && index < formData.length) {
      newIndex += 1;
    }

    const result = reorderArray(
      { oldIndex: index, newIndex: newIndex },
      formData,
      data
    );
    setFormData(result[0]);
    updateProject(projId, "sections", result[0]);
    updateProject(projId, "projData", result[1]);
  };

  const reorderArray = (event, originalSections, originalData) => {
    const oldIndex = event.oldIndex;
    const newIndex = event.newIndex;

    const movedItem = originalSections.find(
      (item, index) => index === oldIndex
    );
    const remainingItems = originalSections.filter(
      (item, index) => index !== oldIndex
    );

    const movedData = originalData.find((item, index) => index === oldIndex);
    const remainingData = originalData.filter(
      (item, index) => index !== oldIndex
    );

    const reorderedSections = [
      ...remainingItems.slice(0, newIndex),
      movedItem,
      ...remainingItems.slice(newIndex),
    ];

    const reorderedData = [
      ...remainingData.slice(0, newIndex),
      movedData,
      ...remainingData.slice(newIndex),
    ];

    if (
      !validArray(reorderedSections, 1) ||
      !validArray(reorderedSections, 3)
    ) {
      return [originalSections, originalData];
    }

    return [reorderedSections, reorderedData];
  };

  const validArray = (array, num) => {
    const index = array.indexOf(num);
    const beforeValues = array.slice(0, index);
    const valueList = num === 1 ? [2, 3, 4, 5, 6] : [4, 5, 6];
    const filteredArray = beforeValues.filter((value) =>
      valueList.includes(value)
    );

    if (filteredArray.length > 0) {
      setError({
        profile: num === 1,
        rank: num === 3,
      });
      return false;
    }

    setError({ profile: false, rank: false });
    return true;
  };

  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState();
  const onDelete = (index) => {
    const value = formData[index];
    if (value === 1 || value === 3) {
      const findNext = formData.indexOf(value, index + 1);
      const valueList = value === 1 ? [2, 3, 4, 5, 6] : [4, 5, 6];
      const nextValue = formData.slice(
        index + 1,
        findNext === -1 ? formData.length : findNext
      );
      const filteredArray = nextValue.filter((value) =>
        valueList.includes(value)
      );
      const beforeValues = formData.slice(0, index);
      if (filteredArray.length > 0 && !beforeValues.includes(value)) {
        setError({ profile: value === 1, rank: value === 3 });
        return;
      }
    }

    if (index === 0) {
      formData.shift();
    } else {
      formData.splice(index, 1);
    }
    setFormData([...formData]);
    setError({ rank: false, profile: false });
    setOpen(false);
  };

  return (
    <Box className="flexColumn" sx={{ pt: 1, px: 2 }}>
      {_.map(formData, (value, index) => {
        return (
          <Box key={index} className="spaceBetween" sx={{ width: "400px" }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#264653", textTransform: "none" }}
            >
              {index + 1}. {templates[value]}
            </Typography>
            <Box className="center">
              <Button
                sx={{ color: "#264653", height: "32px", minWidth: "50px" }}
                onClick={() => changeOrder(index, "up")}
              >
                <TfiArrowCircleUp style={{ pointerEvents: "none" }} />
              </Button>
              <Button
                sx={{ color: "#264653", height: "32px", minWidth: "50px" }}
                onClick={() => changeOrder(index, "down")}
              >
                <TfiArrowCircleDown style={{ pointerEvents: "none" }} />
              </Button>
              <Button
                id={index}
                onClick={() => {
                  if (isEditing) {
                    setOpen(true);
                    setToDelete(index);
                  } else {
                    onDelete(index);
                  }
                }}
                sx={{ minWidth: "40px", height: "32px" }}
              >
                <RiDeleteBin6Fill
                  size={15}
                  style={{
                    color: "#264653",
                    pointerEvents: "none",
                  }}
                />
              </Button>
            </Box>
          </Box>
        );
      })}
      {(error["profile"] || error["rank"]) && (
        <Alert severity="error">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Invalid Section Order
          </AlertTitle>
          {error["profile"] &&
            "Profile section (Template 1) must be added before Templates 2 to 6"}
          {error["rank"] &&
            "Rank section (Template 3) must be added before Templates 4 to 6"}
        </Alert>
      )}
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        handleDelete={() => onDelete(toDelete)}
        text="The details in the section will be permanently deleted"
        header="Delete Section?"
      />
    </Box>
  );
};

export default ReorderList;
