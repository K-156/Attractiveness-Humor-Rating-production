import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import CustomStepper from "../Components/CustomStepper/CustomStepper";
import NextButton from "../Components/NavButton/NextButton";
import PrevButton from "../Components/NavButton/PrevButton";
import SaveButton from "../Components/SaveButton/SaveButton";
import "../Theme.css";

const ProjectLayout = ({
  children,
  isEdit,
  subtitle,
  activeStep,
  nextLink,
  prevLink,
  projectType,
  formData,
  templateNum,
  createProject,
  data,
}) => {
  const navigate = useNavigate();

  const saveProject = () => {
    navigate("/projects");
  };

  const deleteProject = () => {};

  return (
    <>
      <Box sx={{ mx: 2 }}>
        {activeStep === 2 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#264653",
                letterSpacing: "1px",
              }}
            >
              REVIEW
            </Typography>
          </Box>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#264653",
                letterSpacing: "1px",
              }}
            >
              {isEdit ? "Edit " : "Add "} Project
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                color: "#264653",
                letterSpacing: "1px",
              }}
            >
              {subtitle}
            </Typography>
          </>
        )}
      </Box>
      <CustomStepper activeStep={activeStep} />
      {children}
      {activeStep === 2 ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 3 }}>
          <Button
            variant="contained"
            className="customButton-green"
            onClick={isEdit ? saveProject : () => createProject(data)}
          >
            {isEdit ? "Save Changes " : "Add Project"}
          </Button>
        </Box>
      ) : (
        <>
          <SaveButton
            projectType={projectType}
            formData={formData}
            templateNum={templateNum}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 3 }}>
            <PrevButton link={prevLink} />
            <NextButton link={nextLink} />
          </Box>
        </>
      )}
    </>
  );
};

export default ProjectLayout;
