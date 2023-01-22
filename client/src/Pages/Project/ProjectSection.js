import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../Context/AppContext";

import AddSection from "../../Components/ProjectForm/AddSections";
import ProjectLayout from "../../Layout/ProjectLayout";

const type = sessionStorage.getItem("editMode");
const isEditing = sessionStorage.getItem("editMode") === "edit" ? true : false;
const projId = sessionStorage.getItem("projId")

const ProjectDetails = () => {
  const { sections, data, getProject } = useAppContext();
  const [formData, setFormData] = useState(sections);

  useEffect(() => {
    sessionStorage.setItem("templates", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    getProject(projId).then((project) => {
      setFormData(project.sections)
    })
  }, []);

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
        <AddSection
          formData={formData}
          setFormData={setFormData}
          type={type}
          data={data}
          projId={projId}
        />
      </ProjectLayout>
    </div>
  );
};

export default ProjectDetails;
