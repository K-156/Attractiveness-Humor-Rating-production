import { useState, useEffect } from "react";

import AddSection from "../../Components/ProjectForm/AddSections";
import ProjectLayout from "../../Layout/ProjectLayout";

const ProjectDetails = () => {
  const type = sessionStorage.getItem("editMode");

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("templates", formData);
  }, [formData]);

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
        subtitle="Add Sections"
        activeStep={1}
        prevLink="/projects/details"
        nextLink="/projects/sections/1"
        projectType="Sections"
        formData={formData}
      >
        <AddSection formData={formData} setFormData={setFormData} />
      </ProjectLayout>
    </div>
  );
};

export default ProjectDetails;
