import { useAppContext } from "../../Context/AppContext";

import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

import { themePalette } from "../../Utils/themePalette";

const Droppable = ({ children }) => {
  const { theme } = useAppContext();
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <Box
      ref={setNodeRef}
      className="flexStart"
      sx={{
        backgroundColor: themePalette[theme]["primaryLight"],
        width: "100%",
        height: "450px",
        borderRadius: "10px",
        mt: 3,
        mb: 1,
        border: isOver
          ? `dashed 3px ${themePalette[theme]["primary"]}`
          : "none",
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Droppable;
