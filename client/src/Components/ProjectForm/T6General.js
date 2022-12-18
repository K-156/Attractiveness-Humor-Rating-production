import { useState } from "react";

import { 
    Box, 
    Card, 
    CardContent, 
    FormControl, 
    FormControlLabel, 
    Radio,
    RadioGroup,
    TextField, 
    Typography
} from "@mui/material";
import _ from "lodash";

import "./ProjectForm.css";

const T6General = () => {

    const [formData, setFormData] = useState({
        text: "",
        isNext: false, 
    });

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((state) => ({
            ...state, 
            [name]: value
        }))
    }
    
    return(
        <Card>
            <CardContent sx={{p:2, pl: 10}}>
            <FormControl>
                <Box className="twoColumns">
                    <Typography className="variable">Text</Typography>
                    <Box className="secondColumn">
                        <TextField
                            size="small" 
                            name="text"
                            fullWidth
                            multiline
                            minRows={3}
                            onChange={handleOnChange}
                        />
                    </Box>
                </Box>
                <Box className="twoColumns">
                    <Typography 
                        className="variable"
                        sx={{pt:"9px"}}
                    >
                        Is there a Next button?
                    </Typography>
                    <RadioGroup 
                        row 
                        className="secondColumn"
                        sx={{justifyContent:"space-around"}}
                    >
                        {_.map(["Yes", "No"], (option) => {
                            return(
                                <FormControlLabel
                                    key={option}
                                    name="isNext"
                                    value={option === "Yes"}
                                    control={<Radio size="small" />}
                                    label={option}
                                    labelPlacement="start"
                                    sx={{ ".MuiFormControlLabel-label": { fontSize: "14px" } }}
                                    onChange={handleOnChange}
                                />
                            )})
                        }
                    </RadioGroup>
                </Box>
        </FormControl>
        </CardContent>
    </Card>
    )
}

export default T6General;