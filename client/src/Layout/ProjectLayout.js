import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import CustomStepper from "../Components/CustomStepper/CustomStepper";
import NextButton from "../Components/NavButton/NextButton";
import PrevButton from "../Components/NavButton/PrevButton";
import SaveButton from "../Components/SaveButton/SaveButton";

const ProjectLayout = ({ children, isEdit, subtitle, activeStep, nextLink, prevLink, projectType, formData, templateNum }) => {

    const navigate = useNavigate();
    
    const saveProject = () => {
        navigate('/projects')
    }

    const deleteProject = () => {

    }

    return(
        <>
        <Box sx={{mx:2}}>
            { activeStep === 2 ? 
                <Box
                    sx={{
                        display:"flex", 
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{fontWeight:"bold", color: "#264653", letterSpacing:"1px"}}
                    >
                        REVIEW
                    </Typography>
                    { !isEdit ? <></>
                      : <Button
                            variant="contained"
                            sx={{
                                background: "#264653", 
                                textTransform: "none",
                                '&:hover': {backgroundColor:"#C59D5F"}
                            }}
                            onClick={deleteProject}
                        >
                            Delete Project
                        </Button>
                    }
                </Box>
            :
            <>
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
            </>
            }
        </Box>
        <CustomStepper 
            activeStep={activeStep}
        />
        {children}
        { activeStep === 2 ? 
            <Box sx={{display:"flex", justifyContent:"flex-end", pt:3}}>
                <Button
                    variant="contained"
                    sx={{
                        background: "#264653", 
                        textTransform: "none",
                        '&:hover': {backgroundColor:"#C59D5F"}
                    }}
                    onClick={saveProject}
                >
                    {isEdit ? "Save Changes " : "Add Project"} 
                </Button>
             </Box>
        :
        <>
            <SaveButton projectType={projectType} formData={formData} templateNum={templateNum}/>
            <Box sx={{display:"flex", justifyContent:"space-between", pt:3}}>
                <PrevButton link={prevLink} />
                <NextButton link={nextLink} />
            </Box>
        </>
        }
        </>
    )
}

export default ProjectLayout;