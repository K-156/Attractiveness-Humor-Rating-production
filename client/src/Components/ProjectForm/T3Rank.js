import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Card, 
    CardContent, 
    FormControl,
    TextField, 
    Typography, 
  } from "@mui/material";
import _ from "lodash";

import "./ProjectForm.css";

const T3Rank = () => {

    const [expanded, setExpanded] = useState({
        instruction: false, 
        1: false, 
        2: false, 
        3: false, 
        4: false
    });

    const [formData, setFormData] = useState({
        instruction:"",
        characteristics: {lowerbound: "", upperbound: ""},
        1: {optionName:"", description:"", img:null, attributes:[]},
        2: {optionName:"", description:"", img:null, attributes:[]},
        3: {optionName:"", description:"", img:null, attributes:[]},
        4: {optionName:"", description:"", img:null, attributes:[]},
    })

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "instruction") {
            setFormData((state) => ({
                ...state, 
                instruction: value
            }))
        } else {
            setFormData((state) => ({
                ...state, 
                characteristics: {
                    ...formData["characteristics"], 
                    [name]: value
                }
            }))}
    }

    const { submitFormData } = useAppContext();

    useEffect(() => {
      submitFormData(formData);
    }, [formData]);

    return(
        <Card>
            <CardContent className="cardPadding">
            <FormControl>
            <Box className="twoColumns">
                <Typography className="variable">Instruction</Typography>
                <Box className="secondColumn">
                    <TextField
                        size="small" 
                        name="instruction"
                        fullWidth
                        multiline
                        minRows={3}
                        onChange={handleOnChange}
                    />
                </Box>  
            </Box>
            <Box className="twoColumns">
                <Typography className="variable">Characteristics</Typography>
                <Box 
                    className="secondColumn" 
                    sx={{justifyContent:"space-between"}}
                >
                    {_.map(["Lowerbound", "Upperbound"], (type) => {
                        return(
                            <TextField
                                key={type}
                                size="small" 
                                name={type.toLowerCase()}
                                label={type}
                                onChange={handleOnChange}
                                sx={{width: "180px"}}
                            />
                        )})
                    }
                </Box>          
            </Box>      
            </FormControl>
            </CardContent>
        </Card>
    )
}

export default T3Rank;

      