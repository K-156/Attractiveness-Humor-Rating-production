import { Box, Typography } from "@mui/material";
import CustomStepper from "../Components/CustomStepper/CustomStepper";
import NextButton from "../Components/NavButton/NextButton";
import PrevButton from "../Components/NavButton/PrevButton";
import SaveButton from "../Components/SaveButton/SaveButton";

const ProjectLayout = ({ children, isEdit, subtitle, activeStep, nextLink, prevLink }) => {
    return(
        <>
        <Box sx={{mx:2}}>
            <Typography 
                variant="h5"
                sx={{fontWeight:"bold", color: "#264653", letterSpacing:"1px"}}
            >
                { isEdit ? "Edit " : "Add "} Project
            </Typography>
            <Typography 
                variant="subtitle2"
                sx={{fontWeight:"bold", color: "#264653", letterSpacing:"1px"}}
            >
                {subtitle}
            </Typography>
        </Box>
        <CustomStepper 
            activeStep={activeStep}
        />
        {children}
        <SaveButton />
        <Box sx={{display:"flex", justifyContent:"space-between", pt:3}}>
            <PrevButton link={prevLink} />
            <NextButton link={nextLink} />
        </Box>
        </>
    )
}

export default ProjectLayout;