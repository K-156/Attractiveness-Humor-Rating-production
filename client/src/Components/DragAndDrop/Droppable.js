import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import _ from "lodash";

const Droppable = ({ items }) => {
    const { setNodeRef } = useDroppable({
        id: "destination"
    })

    return(
        <Box 
            sx={{backgroundColor: "black", width: "100%", height: "500px"}}
        >
            {_.map((items, (aItem) => {
                return aItem
            }))}
        </Box>
    )
}

export default Droppable;