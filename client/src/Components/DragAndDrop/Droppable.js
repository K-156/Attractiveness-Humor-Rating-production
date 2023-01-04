import { useAppContext } from "../../Context/AppContext";

import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import _ from "lodash";

import { colorPalette } from "../../Utils/colorPalette";

const Droppable = ({ children }) => {

    const { theme } = useAppContext(); 
    const { isOver, setNodeRef } = useDroppable({ id: "droppable"})

    return(
        <Box 
            ref={setNodeRef}
            className="flexStart"
            sx={{
                backgroundColor: colorPalette[theme]["primaryLight"], 
                width: "100%", 
                height: "450px",
                borderRadius: "10px",
                mt: 3, mb: 1, 
                border: isOver ? `dashed 3px ${colorPalette[theme]["primary"]}` : "none",
                padding: 2
            }}
        >
            {children}
        </Box>
    )
}

export default Droppable;