import { useState } from "react";

import { Box, Stepper, Step, StepLabel } from "@mui/material";
import _ from "lodash";

const CustomStepper = ({ activeStep }) => {

    const steps = [
        "Project Details", 
        "Add Sections",
        "Preview and Submit"
    ]

    return (
        <Box sx={{ width: '100%', p:3}}>
        <Stepper 
            nonLinear 
            activeStep={activeStep}
        >
            {_.map(steps, (label) => (
            <Step key={label}
            >
                <StepLabel 
                    StepIconProps={{
                        sx: {"&.MuiStepIcon-root.Mui-active": {color: "#264653"}}
                    }}
                    sx={{".MuiStepLabel-label.Mui-active": {color:"#264653"}}}
                >
                    {label}
                </StepLabel>
            </Step>
            ))}
        </Stepper>
        </Box>
    );
}

export default CustomStepper;
