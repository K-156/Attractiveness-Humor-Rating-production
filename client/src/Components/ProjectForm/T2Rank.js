import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import _ from "lodash";

import "./ProjectForm.css";
import ProfileForm from "./ProfileForm";

const T2Rank = () => {

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
        <Box>
            <Accordion 
                disableGutters
                expanded={expanded["instruction"]}
                onChange={() => setExpanded((state)=> ({
                    ...state,
                    instruction: !expanded["instruction"]
                }))}
            >
                <AccordionSummary className="accordionSummary" >
                    <Typography className="accordionTitle">
                        {expanded["instruction"] 
                        ? <IoIosArrowForward style={{marginRight:10}}/> 
                        : <IoIosArrowDown style={{marginRight:10}}/>}
                        INSTRUCTION
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                            lassName="secondColumn" 
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
                </AccordionDetails>
            </Accordion>
            {_.map(_.range(1, 5), (num) => {
                return(
                    <Accordion 
                        disableGutters
                        key={num}
                        expanded={expanded[num]}
                        onChange={() => setExpanded((state)=> ({
                            ...state,
                            [num]: !expanded[num]
                        }))}
                    >
                        <AccordionSummary className="accordionSummary">
                            <Typography className="accordionTitle">
                                {expanded[num] 
                                ? <IoIosArrowForward style={{marginRight:10}}/> 
                                : <IoIosArrowDown style={{marginRight:10}}/>}
                                OPTION {num}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProfileForm 
                                id={num}
                                setFormData={setFormData}
                                formData={formData}
                            />
                        </AccordionDetails>
                    </Accordion>  
                )})
            }
        </Box>
        
    )
}

export default T2Rank;