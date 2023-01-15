import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import ProjectDetailsForm from "../../Components/ProjectForm/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";
import { useEffect } from "react";

const ProjectDetails = () => {
  const type = sessionStorage.getItem("editMode");
  const createdProjectId = sessionStorage.getItem("createdProjectId");
  const editProjectId = sessionStorage.getItem("editProjectId");
  const isEditing =
    sessionStorage.getItem("editMode") === "edit" ? true : false;

  const { projDetails, getProject } = useAppContext();

  useEffect(() => {
    getProject(isEditing ? editProjectId : createdProjectId).then((data) => {
      setFormData({
        title:
          data.projDetails.title === "untitled" ? "" : data.projDetails.title,
        description: data.projDetails.description,
        consent: data.projDetails.consent,
        roles: data.projDetails.roles,
        duration: data.projDetails.duration,
        theme:
          data.projDetails.theme === undefined
            ? "green"
            : data.projDetails.theme,
        graphic:
          data.projDetails.graphic?.length === 0
            ? null
            : data.projDetails.graphic,
        graphicLink: data.projDetails.graphicLink,
      });
    });
  }, []);

  const [formData, setFormData] = useState({
    title: projDetails?.title,
    description: projDetails?.description,
    consent: projDetails?.consent,
    roles: projDetails?.roles,
    duration: projDetails?.duration,
    theme: projDetails?.theme === undefined ? "green" : projDetails.theme,
    graphic: projDetails?.graphic,
    graphicLink: projDetails?.graphicLink,
  });

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
