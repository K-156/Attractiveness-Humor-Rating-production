import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import CustomStepper from "../Components/CustomStepper/CustomStepper";
import NextButton from "../Components/NavButton/NextButton";
import PrevButton from "../Components/NavButton/PrevButton";
import SaveButton from "../Components/SaveButton/SaveButton";
import "./Layout.css";

const ProjectLayout = ({
  children,
  isEditing,
  subtitle,
  activeStep,
  nextLink,
  prevLink,
  projectType,
  formData,
  templateNum,
  sectionNum,
  nextDisabled,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const saveProject = () => {
    navigate("/projects");
    sessionStorage.clear();
  };

  return (
    <>
      <Box sx={{ mx: 2 }}>
        {activeStep === 2 ? (
          <Box className="flexStart">
            <Typography variant="h5" className="projectHeader">
              REVIEW
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h5" className="projectHeader">
              {isEditing ? "Edit " : "Add "} Project
            </Typography>
            <Typography variant="subtitle2" className="projectHeader">
              {subtitle}
            </Typography>
          </>
        )}
      </Box>
      <CustomStepper activeStep={activeStep} />
      {children}
      {activeStep === 2 ? (
        <Box className="flexEnd" sx={{ pt: 3 }}>
          <Button
            variant="contained"
            className="customButton-green"
            onClick={saveProject}
          >
            Save Changes
          </Button>
        </Box>
      ) : (
        <>
          {isEditing ? (
            <SaveButton
              projectType={projectType}
              formData={formData}
              templateNum={templateNum}
              sectionNum={sectionNum}
            />
          ) : (
            <Box className="spaceBetween" sx={{ pt: 3 }}>
              {location.pathname.includes("projects/details") ? (
                <Box />
              ) : (
                <PrevButton link={prevLink} projectType={projectType} />
              )}
              <NextButton
                disabled={nextDisabled}
                link={nextLink}
                projectType={projectType}
                data={formData}
                templateNum={templateNum}
                sectionNum={sectionNum}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default memo(ProjectLayout);
