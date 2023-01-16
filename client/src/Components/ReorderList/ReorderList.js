import { useEffect, useState } from "react";

import { 
    Box, 
    Button, 
    Typography
} from "@mui/material";
import _ from "lodash";
import { TfiArrowCircleUp, TfiArrowCircleDown } from "react-icons/tfi";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { templates } from "../../Utils/templateList";

const ReorderList = ({ formData, setFormData, onDelete }) => {

    const reorderArray = (event, originalArray) => {
        const movedItem = originalArray.find((item, index) => index === event.oldIndex);
        const remainingItems = originalArray.filter((item, index) => index !== event.oldIndex);
      
        const reorderedItems = [
            ...remainingItems.slice(0, event.newIndex),
            movedItem,
            ...remainingItems.slice(event.newIndex)
        ];
      
        return reorderedItems;
      }
      
      function changeOrder(index, direction) {
        let newIndex = index;
        if (direction === "up" && index > 0) {  
            newIndex -= 1;
        } else if (direction === "down" && index < formData.length) {
            newIndex += 1;
        }
        setFormData(reorderArray({oldIndex: index, newIndex: newIndex}, formData));
      }
      

    return(
        <Box 
            className="flexColumn"
            sx={{pt: 1, px: 2}}
        >
            {_.map(formData, (value, index) => {
                return(
                    <Box
                        key={index}
                        className="spaceBetween"
                        sx={{width:"400px"}}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{color: "#264653", textTransform:"none"}}
                        >
                            {index + 1}. {templates[value]}
                        </Typography>
                        <Box className="center" >
                            <Button
                                sx={{color: "#264653", height: "32px", minWidth: "50px"}}
                                onClick={() => changeOrder(index,"up")}
                            >
                                <TfiArrowCircleUp style={{pointerEvents:"none"}}/>
                            </Button>
                            <Button
                                sx={{color: "#264653", height: "32px", minWidth: "50px"}}
                                onClick={() => changeOrder(index,"down")}
                            >
                                <TfiArrowCircleDown style={{pointerEvents:"none"}}/>
                            </Button>
                            <Button
                                id={index}
                                onClick={() => onDelete(index)}
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
                    
                )
            }) 
            }            
        </Box>
    )
}

export default ReorderList;