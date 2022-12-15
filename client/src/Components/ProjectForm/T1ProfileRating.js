import { useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import _ from "lodash";

import "./ProjectForm.css";
import ProfileRatingForm from "./ProfileRatingForm";

const T1ProfileRating = () => {

    const [expanded, setExpanded] = useState({
        instruction: false, 
        1: false, 
        2: false, 
        3: false, 
        4: false
    });

    const [formData, setFormData] = useState({
        instruction:"",
        1: {optionName:"", description:"", img:null, attributes:[]},
        2: {optionName:"", description:"", img:null, attributes:[]},
        3: {optionName:"", description:"", img:null, attributes:[]},
        4: {optionName:"", description:"", img:null, attributes:[]},
    })

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
                <AccordionSummary 
                    sx={{
                        backgroundColor:"#E6E6E6", 
                        color:"#6A6A6A", 
                        border:"solid 1px #C8CCCF"
                    }} 
                >
                    <Typography sx={{fontWeight:"bold", display:"flex", alignItems:"center"}}>
                        {expanded["instruction"] 
                        ? <IoIosArrowForward style={{marginRight:10}}/> 
                        : <IoIosArrowDown style={{marginRight:10}}/>}
                        INSTRUCTION
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className="twoColumns">
                    <Typography className="variable">Instruction</Typography>
                    <Box className="secondColumn">
                        <TextField
                            size="small" 
                            fullWidth
                            multiline
                            minRows={3}
                            onChange={(event) => {
                                setFormData((state) => ({
                                    ...state, 
                                    instruction: event.target.value
                                }))}
                            }
                        />
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
                        <AccordionSummary 
                            sx={{
                                backgroundColor:"#E6E6E6", 
                                color:"#6A6A6A", 
                                border:"solid 1px #C8CCCF",
                                "&.Mui-expanded": {minHeight: "50px"}
                            }} 
                        >
                            <Typography sx={{fontWeight:"bold", display:"flex", alignItems:"center"}}>
                                {expanded[num] 
                                ? <IoIosArrowForward style={{marginRight:10}}/> 
                                : <IoIosArrowDown style={{marginRight:10}}/>}
                                OPTION {num}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProfileRatingForm 
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

export default T1ProfileRating;