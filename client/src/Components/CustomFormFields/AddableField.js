import { 
    Box, 
    Typography, 
    TextField, 
    Button 
} from "@mui/material";
import { CgAdd } from "react-icons/cg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import _ from "lodash";

const AddableField = ({items, error, setError, errorText, handleOnChange, currValue, setFormData, variable}) => {

    const onAdd = () => {
        if (items.includes(currValue)) {
            setError((state) => ({
                ...state,
                [variable]: true
            }));  
        } else {
            setFormData((state) => ({
                ...state,
                [variable]: items.concat(currValue)
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
                    size="small"
                    fullWidth
                    id="roles"
                    onChange={handleOnChange}
                    error={error}
                    helperText={error? errorText : ""}
                />
                <Button onClick={onAdd}>
                    <CgAdd size={20} style={{color:"#264653", pointerEvents:"none"}}/>
                </Button>
            </Box>
            { items.length < 1 ? <></> :
                <Box sx={{pt: 1, pl: 2, pr: 8}}>
                    {_.map(items, (value, index) => {
                        return(
                            <Box    
                                key={value}
                                sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                            >
                            <Typography
                                variant="subtitle2"
                                sx={{color:"#264653"}}
                            >
                                {index + 1}. {value}
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

export default AddableField;