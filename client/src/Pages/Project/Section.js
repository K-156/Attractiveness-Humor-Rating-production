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
  const { formData, sections, isEditing, projDetails } = useAppContext();

  const location = useLocation();
  const sectionNum = parseInt(location.pathname.split("/").pop());
  const templateList = isEditing
    ? sections
    : JSON.parse(sessionStorage.getItem("templates"));
  const currTemplate = parseInt(templateList[sectionNum - 1]);
  const roles = JSON.parse(sessionStorage.getItem("roles"));

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
        { currTemplate === 1 ? <T1Profile roles={roles}/>
                    : currTemplate === 2 ? <T2ProfileRating roles={roles}/>
                    : currTemplate === 3 ? <T3Rank roles={roles}/>
                    : currTemplate === 4 ? <T4Audio roles={roles}/>
                    : currTemplate === 5 ? <T5Intro roles={roles}/>
                    : currTemplate === 6 ? <T6Chatbox roles={roles}/>
                    : <T7General />
                } 
      </ProjectLayout>
    </div>
  );
};

export default Section;
