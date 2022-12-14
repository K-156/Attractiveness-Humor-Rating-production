import { useLocation } from "react-router-dom";

import AddSection from "../../Components/Form/AddSections";
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
                subtitle="Add Sections"
                activeStep={1}
                prevLink="/projects/details"
                nextLink="/projects/sections/1"
            >
                <AddSection />
            </ProjectLayout>    
        </div>
    )
}

export default ProjectDetails;