import { useLocation } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import ProjectLayout from "../../Layout/ProjectLayout";
import { templates } from "../../Utils/TemplateList";
import T1ProfileRating from "../../Components/ProjectForm/T1ProfileRating";
import T2Rank from "../../Components/ProjectForm/T2Rank";
import T3Audio from "../../Components/ProjectForm/T3Audio";
import T4Intro from "../../Components/ProjectForm/T4Intro";
import T5Chatbox from "../../Components/ProjectForm/T5Chatbox";
import T6General from "../../Components/ProjectForm/T6General";


const Section = () => {

    const location = useLocation()
    const sectionNum = parseInt(location.pathname.split("/").pop())
    const templateList = sessionStorage.getItem("templates").split(",");
    const currTemplate = parseInt(templateList[sectionNum-1]);

    let templateType = null;
    const { template } = location.state;

    if (template === undefined) {
        templateType = templates[templateList[sectionNum-1]];
    } else {
        templateType = template;
    }

    const type  = sessionStorage.getItem("editMode");
 

    const {data} = useAppContext();

    return(
        <div>
            <script>
                {document.title= `${type === "add" ? "Add " : "Edit "} Project | Section ${sectionNum}`}
            </script>
            <ProjectLayout
                isEdit={type === "edit"}
                subtitle={`Section ${sectionNum}: ${templateType}`}
                activeStep={1}
                prevLink={sectionNum === 1 ? "/projects/sections" : `/projects/sections/${sectionNum-1}`}
                nextLink={sectionNum === templateList.length ? "/projects/summary" : `/projects/sections/${sectionNum+1}`}
                projectType="projData"
                formData={data}
                templateNum={currTemplate}
            >   
                { currTemplate === 1  ? <T1ProfileRating /> 
                    : currTemplate === 2 ? <T2Rank />
                    : currTemplate === 3 ? <T3Audio />
                    : currTemplate === 4 ? <T4Intro />
                    : currTemplate === 5 ? <T5Chatbox />
                    : <T6General />
                }
            </ProjectLayout>    
        </div>
    )
}

export default Section;