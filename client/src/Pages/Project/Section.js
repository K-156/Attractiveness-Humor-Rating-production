import { useLocation } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import _ from "lodash";

import T1Profile from "../../Components/ProjectForm/T1Profile";
import T2ProfileRating from "../../Components/ProjectForm/T2ProfileRating";
import T3Rank from "../../Components/ProjectForm/T3Rank";
import T4Audio from "../../Components/ProjectForm/T4Audio";
import T5Intro from "../../Components/ProjectForm/T5Intro";
import T6Chatbox from "../../Components/ProjectForm/T6Chatbox";
import T7General from "../../Components/ProjectForm/T7General";
import ProjectLayout from "../../Layout/ProjectLayout";
import { templates } from "../../Utils/templateList";

const Section = () => {
  const { formData, sections, isEditing } = useAppContext();

  const location = useLocation();
  const sectionNum = parseInt(location.pathname.split("/").pop());
  const templateList = isEditing
    ? sections
    : sessionStorage.getItem("templates").split(",");
  const currTemplate = parseInt(templateList[sectionNum - 1]);
  const roles = JSON.parse(localStorage.getItem("projDetails")).roles;

  let templateType = null;
  const { template } = location.state;

  if (template === undefined) {
    templateType = templates[templateList[sectionNum - 1]];
  } else {
    templateType = template;
  }

  const type = sessionStorage.getItem("editMode");

  return (
    <div>
      <script>
        {
          (document.title = `${
            type === "add" ? "Add " : "Edit "
          } Project | Section ${sectionNum}`)
        }
      </script>
      <ProjectLayout
        isEdit={type === "edit"}
        subtitle={`Section ${sectionNum}: ${templateType}`}
        activeStep={1}
        prevLink={
          sectionNum === 1
            ? "/projects/sections"
            : `/projects/sections/${sectionNum - 1}`
        }
        nextLink={
          sectionNum === templateList.length
            ? "/projects/summary"
            : `/projects/sections/${sectionNum + 1}`
        }
        projectType="projData"
        formData={formData}
        sectionNum={sectionNum}
        templateNum={currTemplate}
      >
        {currTemplate === 1 && roles.length > 0 ? (
          _.map(roles, (aRole) => {
            return <T1Profile role={aRole} />;
          })
        ) : currTemplate === 1 && roles.length === 0 ? (
          <T1Profile />
        ) : currTemplate === 2 && roles.length > 0 ? (
          _.map(roles, (aRole) => {
            return <T2ProfileRating role={aRole} />;
          })
        ) : currTemplate === 2 && roles.length === 0 ? (
          <T2ProfileRating />
        ) : currTemplate === 3 && roles.length > 0 ? (
          _.map(roles, (aRole) => {
            return <T3Rank role={aRole} />;
          })
        ) : currTemplate === 3 && roles.length === 0 ? (
          <T3Rank />
        ) : currTemplate === 4 && roles.length > 0 ? (
          _.map(roles, (aRole) => {
            return <T4Audio role={aRole} />;
          })
        ) : currTemplate === 4 && roles.length === 0 ? (
          <T4Audio />
        ) : currTemplate === 5 && roles.length > 0 ? (
          _.map(roles, (aRole) => {
            return <T5Intro role={aRole} />;
          })
        ) : currTemplate === 5 && roles.length === 0 ? (
          <T5Intro />
        ) : currTemplate === 6 && roles.length > 0 ? (
          _.map(roles, (aRole) => {
            return <T6Chatbox role={aRole} />;
          })
        ) : currTemplate === 6 && roles.length === 0 ? (
          <T6Chatbox />
        ) : (
          <T7General />
        )}
      </ProjectLayout>
    </div>
  );
};

export default Section;
