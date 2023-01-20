import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button } from "@mui/material";
import _ from "lodash";

import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import ProjectLayout from "../../Layout/ProjectLayout";
import { templates } from "../../Utils/templateList";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";

const Summary = () => {
  const {
    projDetails,
    data,
    sections,
    createProject,
    getProject,
    isLoading,
  } = useAppContext();

  const navigate = useNavigate();
  const type = sessionStorage.getItem("editMode");
  const templateOrder = JSON.parse(sessionStorage.getItem("templates"));
  const createdProjectId = sessionStorage.getItem("createdProjectId");
  const editProjectId = sessionStorage.getItem("editProjectId");
  const isEditing =
    sessionStorage.getItem("editMode") === "edit" ? true : false;

  // remove old data 
  localStorage.removeItem("projData")

  useEffect(() => {
    if (isEditing) {
      getProject(editProjectId);
    } else {
      getProject(createdProjectId);
    }
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <script>
        {
          (document.title = `${
            type === "add" ? "Add " : "Edit "
          } Project | Project Details`)
        }
      </script>
      <ProjectLayout
        isEdit={type === "edit"}
        subtitle=""
        activeStep={2}
        prevLink="/projects"
        state={{ type: type }}
        projectType="Details"
        createProject={createProject}
      >
        <SummaryCard
          header="Project Details"
          content={projDetails}
          editLink="/projects/details"
        />
        <Box className="flexEnd" sx={{mt: 2, mb: 1}}>
          <Button
            variant="contained"
            className="customButton-green"
            onClick={() => navigate("/projects/sections")}
          >
            Add/Reorder Sections
          </Button>
        </Box>
        {data && _.map(data, (section, index) => {
          const templateNum = templateOrder[index];
          return (
            <SummaryCard
              header={`Section ${index + 1}: ${templates[templateNum]}`}
              template={templates[templateNum]}
              content={section?.[templateNum]}
              editLink={`/projects/sections/${index + 1}`}
              key={index}
              index={index}
            />
          );
        })}
        {data.length === 0 && 
            <SummaryCard
              header="Section - No section added"
              template={7}
              content=""
              editLink={`/projects/sections/`}
              index={1}
            />
        }
      </ProjectLayout>
    </div>
  );
};

export default Summary;
