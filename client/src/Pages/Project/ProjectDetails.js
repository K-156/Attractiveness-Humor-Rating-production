import { useState } from "react";

import ProjectDetailsForm from "../../Components/ProjectForm/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";

const ProjectDetails = () => {

    const type = sessionStorage.getItem("editMode")
    
    const [formData, setFormData] = useState({
        title: "", email: [], roles:[], duration: 0
    });

    console.log(formData)
        
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
                <ProjectDetailsForm 
                    formData={formData}
                    setFormData={setFormData}                
                />
            </ProjectLayout>    
        </div>
    )
}

export default ProjectDetails;