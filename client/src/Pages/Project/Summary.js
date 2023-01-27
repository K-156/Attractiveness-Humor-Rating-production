import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import _ from "lodash";

import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import ProjectLayout from "../../Layout/ProjectLayout";
import { templates } from "../../Utils/variableList";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";

const Summary = () => {
  const { projDetails, data, createProject, getProject } = useAppContext();
  const navigate = useNavigate();
  const type = sessionStorage.getItem("editMode");
  const templateOrder = JSON.parse(sessionStorage.getItem("templates"));
  const projId = sessionStorage.getItem("projId");
  const roles = sessionStorage.getItem("roles");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    sessionStorage.setItem("editMode", "edit");
    getProject(projId).then(() => {
      setIsLoading(false);
    });
    sessionStorage.removeItem("projData");
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className={`background-blue center`}>
        <LoadingAnimation />
      </div>
    );
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
        isEditing={type === "edit"}
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
        {roles === "[]" && (
          <Typography className="center" sx={{ my: 2, color: "#264653" }}>
            <i>
              Please add in roles in <b>Project Details </b>before adding other
              sections. If there is no role, please add in "NA" as the role.
            </i>
          </Typography>
        )}
        <Box className="flexEnd" sx={{ mt: 2, mb: 1 }}>
          <Button
            variant="contained"
            className="customButton-green"
            onClick={() => navigate("/projects/sections")}
            disabled={roles === "[]"}
          >
            Add/Reorder Sections
          </Button>
        </Box>
        {data &&
          _.map(templateOrder, (section, index) => {
            console.log(data[index]?.[section]);
            const templateNum = templateOrder[index];
            return (
              <SummaryCard
                header={`Section ${index + 1}: ${templates[templateNum]}`}
                template={templates[templateNum]}
                content={data[index]?.[section]}
                editLink={`/projects/sections/${index + 1}`}
                key={index}
                index={index}
              />
            );
          })}
        {roles !== "[]" && templateOrder?.length === 0 && (
          <Card sx={{ my: 1 }}>
            <CardContent>
              <Typography className="summaryHeader">
                No section added
              </Typography>
            </CardContent>
          </Card>
        )}
      </ProjectLayout>
    </div>
  );
};

export default Summary;
