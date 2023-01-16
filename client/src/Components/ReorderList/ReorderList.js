import { 
    Alert,
    AlertTitle, 
    Box, 
    Button, 
    Typography
} from "@mui/material";
import _, { filter } from "lodash";
import { TfiArrowCircleUp, TfiArrowCircleDown } from "react-icons/tfi";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { templates } from "../../Utils/templateList";

const ReorderList = ({ formData, setFormData, onDelete, error, setError}) => {

    const changeOrder = (index, direction) => {
        let newIndex = index;
        if (direction === "up" && index > 0) {  
            newIndex -= 1;
        } else if (direction === "down" && index < formData.length) {
            newIndex += 1;
        }
        setFormData(reorderArray({oldIndex: index, newIndex: newIndex}, formData));
    }

    const reorderArray = (event, originalArray) => {
        const oldIndex = event.oldIndex;
        const newIndex = event.newIndex;
        const movedItem = originalArray.find((item, index) => index === oldIndex);
        const remainingItems = originalArray.filter((item, index) => index !== oldIndex);

        const reorderedItems = [
            ...remainingItems.slice(0, newIndex),
            movedItem,
            ...remainingItems.slice(newIndex)
        ];

        if (!validArray(reorderedItems, 1) || !validArray(reorderedItems, 3)) {
            return originalArray
        }

        return reorderedItems;
      }
    
    const validArray = (array, num) => {
        const index = array.indexOf(num);
        const beforeValues = array.slice(0, index);
        const valueList = num === 1 ? [2,3,4,5,6] : [4,5,6];
        const filteredArray = beforeValues.filter(value => valueList.includes(value));
        if (filteredArray.length > 0) {
            setError({
                profile: num === 1, 
                rank: num === 3
            })
            return false;
        }
        
        setError({ profile: false, rank: false });
        return true;
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
                )}) 
            }
            { (error["profile"] || error["rank"]) &&
             <Alert severity="error" >
                <AlertTitle sx={{ fontWeight: "bold" }}>Invalid Section Order</AlertTitle>
                {error["profile"] && "Profile section (Template 1) must be added before Templates 2 to 6"} 
                {error["rank"] && "Rank section (Template 3) must be added before Templates 4 to 6"}
            </Alert>         
            }   
        </Box>
    )
}

export default ReorderList;