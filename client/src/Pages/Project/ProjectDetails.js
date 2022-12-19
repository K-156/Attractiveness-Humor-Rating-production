import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import ProjectDetailsForm from "../../Components/ProjectForm/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";
import { useEffect } from "react";

const ProjectDetails = () => {
  const type = sessionStorage.getItem("editMode");

  const { isEditing, editProjectId, setEditProject, projDetails } =
    useAppContext();

  const [formData, setFormData] = useState({
    title:projDetails?.title,
    email: [],
    roles: isEditing ? projDetails.roles : [],
    duration: projDetails?.duration,
  });

  useEffect(() => {
    if (isEditing) {
      setEditProject(editProjectId);
    }
  }, []);

  return (
    <div>
      <script>
        {
          (document.title = `${
            !isEditing ? "Add " : "Edit "
          } Project | Project Details`)
        }
      </script>
      <ProjectLayout
        isEdit={isEditing}
        subtitle={isEditing ? "" : "Create new project"}
        activeStep={0}
        prevLink="/projects"
        nextLink="/projects/sections"
        state={{ type: type }}
        projectType="projDetails"
        formData={formData}
      >
        <ProjectDetailsForm formData={formData} setFormData={setFormData} />
      </ProjectLayout>
    </div>
  );
};

export default ProjectDetails;
