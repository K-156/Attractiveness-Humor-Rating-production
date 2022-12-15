import { useLocation } from "react-router-dom";

import ProjectLayout from "../../Layout/ProjectLayout";
import { templates } from "../../Utils/TemplateList";
import T1ProfileRating from "../../Components/ProjectForm/T1ProfileRating";


const Section = () => {

    const location = useLocation()
    const sectionNum = location.pathname.split("/").pop()

    const templateList = sessionStorage.getItem("templates");
    const type  = sessionStorage.getItem("editMode");

    return(
        <div>
            <script>
                {document.title= `${type === "add" ? "Add " : "Edit "} Project | Section ${sectionNum}`}
            </script>
            <ProjectLayout
                isEdit={type === "edit"}
                subtitle={`Section ${sectionNum}: ${templates[templateList[sectionNum-1]]}`}
                activeStep={1}
                prevLink={sectionNum === 1 ? "/projects/sections" : `/projects/sections/${sectionNum+1}`}
                nextLink={sectionNum === templateList.length ? `/projects/sections/${sectionNum+1}` : "/projects/summary"}
            >
                <T1ProfileRating />
            </ProjectLayout>    
        </div>
    )
}

export default Section;