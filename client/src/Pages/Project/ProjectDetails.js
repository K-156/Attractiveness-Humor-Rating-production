import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import ProjectDetailsForm from "../../Components/ProjectForm/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";
import { useEffect } from "react";

const ProjectDetails = () => {
  const type = sessionStorage.getItem("editMode");

  const { getProject, isEditing, editProjectId } = useAppContext();

  const [formData, setFormData] = useState({
    title: "",
    email: [],
    roles: [],
    duration: 0,
  });

  useEffect(() => {
    if (isEditing) {
      getProject(editProjectId)
    }
  },[editProjectId])

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
        subtitle="Create new project"
        activeStep={0}
        prevLink="/projects"
        nextLink="/projects/sections"
        state={{ type: type }}
        projectType="Details"
        formData={formData}
      >
        <ProjectDetailsForm formData={formData} setFormData={setFormData} />
      </ProjectLayout>
    </div>
  );
};

export default ProjectDetails;
