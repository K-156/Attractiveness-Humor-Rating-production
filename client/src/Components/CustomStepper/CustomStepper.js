import { 
    Box, 
    Stepper, 
    Step, 
    StepLabel
} from "@mui/material";
import _ from "lodash";

import { colorPalette } from "../../Utils/colorPalette";

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
                        sx: {"&.MuiStepIcon-root.Mui-active": {
                            color: colorPalette["green"]["primary"]
                        }}
                    }}
                    sx={{".MuiStepLabel-label.Mui-active": {
                            color: colorPalette["green"]["primary"]
                        }}}
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
