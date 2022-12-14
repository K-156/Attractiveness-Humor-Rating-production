import { useLocation } from "react-router-dom";

import ProjectDetailsForm from "../../Components/Form/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";

const ProjectDetails = () => {

    const location = useLocation();
    const { type } = location.state;
        
    return(
        <div>
            <script>
                {document.title= `${type === "add" ? "Add " : "Edit "} Project | Project Details`}
            </script>
            <ProjectLayout
                isEdit={type === "edit"}
                subtitle="Create new project"
                activeStep={0}
                prevLink="/projects"
                nextLink="/projects/sections"
                state={{type: type}}
            >
                <ProjectDetailsForm />
            </ProjectLayout>    
        </div>
    )
}

export default ProjectDetails;