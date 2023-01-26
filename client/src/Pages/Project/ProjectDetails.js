import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import ProjectDetailsForm from "../../Components/ProjectForm/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";
import { useEffect } from "react";


const ProjectDetails = () => {

  const { projDetails, getProject } = useAppContext();
  const isEditing = sessionStorage.getItem("editMode") === "edit" ? true : false;
  const projId = sessionStorage.getItem("projId")

  useEffect(() => {
    getProject(projId).then((data) => {
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
        graphicLink: data.projDetails?.graphicLink === undefined
                    ? "https://res.cloudinary.com/dqbrhsxcs/image/upload/v1674728751/default_gr/default_graphic.svg"
                    : data.projDetails.graphicLink,
      });
    });
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    title: projDetails?.title,
    description: projDetails?.description,
    consent: projDetails?.consent,
    roles: projDetails?.roles,
    duration: projDetails?.duration,
    theme: projDetails?.theme === undefined ? "green" : projDetails.theme,
    graphic: projDetails?.graphic,
    graphicLink: projDetails?.graphicLink
  });

  console.log(formData)
 
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
        isEditing={isEditing}
        subtitle={isEditing ? "" : "Create new project"}
        activeStep={0}
        prevLink="/projects"
        nextLink="/projects/sections"
        projectType="projDetails"
        formData={formData}
        nextDisabled={formData.roles.length === 0}
      >
        <ProjectDetailsForm formData={formData} setFormData={setFormData} />
      </ProjectLayout>
    </div>
  );
};

export default ProjectDetails;
