import { 
    Box, 
    Typography, 
    TextField, 
    Button 
} from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import _ from "lodash";

const AddableTwoField = ({ id, items, formData, handleOnChange, 
                            setFormData, variable, currValue, setError, error}) => {

    const onAdd = () => {
        if (items.includes(currValue)) {
            setError(true);  
        } else {
            setFormData((state)=>({
                ...state, 
                [id]: {
                    ...formData[id],
                    [variable]: formData[id][variable].concat(currValue)
                }
            }))
        }      
    }

    const onDelete = (index) => {
        if (index === 0) {
            items.shift()
        } else {
            items.splice(index, 1)
        }
        setFormData((state) => ({
            ...state,
            [variable]: items
        }))  
    }

    return(
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Box className="secondColumn">
                <TextField 
                    name="name"
                    label="Name"
                    size="small"
                    onChange={handleOnChange}
                    error={error}
                    helperText={error? "Name-value added" : ""}
                    sx={{width: "180px", mr: "20px"}}
                />
                <TextField 
                    name="value"
                    label="Value"
                    size="small"
                    onChange={handleOnChange}
                    error={error}
                    helperText={error? "Name-value added" : ""}
                    sx={{width: "180px"}}
                />
                <Button onClick={onAdd}>
                    <CgAdd size={20} style={{color:"#264653", pointerEvents:"none"}}/>
                </Button>
            </Box>
            { items.length < 1 ? <></> :
                <Box sx={{pt: 1, pl: 2, pr: 8}}>
                    {_.map(items, (aItem, index) => {
                        return(
                            <Box    
                                key={aItem.name+aItem.value}
                                sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                            >
                            <Typography
                                variant="subtitle2"
                                sx={{color:"#264653"}}
                            >
                                {index + 1}. {aItem.name}: {aItem.value}
                            </Typography>
                            <Button
                                id={index}
                                onClick={()=>onDelete(index)}
                            >
                                <RiDeleteBin6Fill size={15} style={{color:"#264653", pointerEvents:"none"}}/>   
                            </Button>
                            </Box>
                        )
                    })}
                </Box>
            }
        </Box>
    )
}

export default AddableTwoField;