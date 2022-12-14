import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import ProjectDetailsForm from "../../Components/Form/ProjectDetailsForm";
import ProjectLayout from "../../Layout/ProjectLayout";

const ProjectDetails = ({ type }) => {

    type="add"

    return(
        <div>
            <script>
                {document.title= `${type === "add" ? "Add " : "Edit "} Project | Project Details`}
            </script>
            <ProjectLayout
                isEdit={false}
                subtitle="Create new project"
                activeStep={0}
                prevLink="/projects"
                nextLink="/projects/sections"
            >
                <ProjectDetailsForm />
            </ProjectLayout>    
        </div>
    )
}

export default ProjectDetails;