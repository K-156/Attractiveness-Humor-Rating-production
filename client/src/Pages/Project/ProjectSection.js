import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import AddSection from "../../Components/ProjectForm/AddSections";
import ProjectLayout from "../../Layout/ProjectLayout";

const ProjectDetails = () => {
  const type = sessionStorage.getItem("editMode");
  const { sections } = useAppContext();
  const [formData, setFormData] = useState(sections);

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
        projectType="sections"
        formData={formData}
        nextDisabled={formData.length === 0}
      >
        <AddSection formData={formData} setFormData={setFormData} />
      </ProjectLayout>
    </div>
  );
};

export default ProjectDetails;
