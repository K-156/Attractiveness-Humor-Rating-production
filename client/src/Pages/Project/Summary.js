import _ from "lodash";

import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import ProjectLayout from "../../Layout/ProjectLayout";
import { mockData } from "./mockData";
import { templates } from "../../Utils/TemplateList";


const Summary = () => {

    const type = sessionStorage.getItem("editMode");
    const templateOrder = mockData["sections"]["type"];

    return(
        <div>
            <script>
            {
                (document.title = `${
                type === "add" ? "Add " : "Edit "
                } Project | Project Details`)
            }
            </script>
            <ProjectLayout
                isEdit={type === "edit"}
                subtitle=""
                activeStep={2}
                prevLink="/projects"
                state={{ type: type }}
                projectType="Details"
            >
            <SummaryCard 
                header="Project Details"
                content={mockData["projDetails"]}
                editLink="/projects/details"
            />
            {_.map(mockData["data"], (section, index) => {
                const templateNum = templateOrder[index];
                return(
                    <SummaryCard
                        header={`Section ${index+1}: ${templates[templateNum]}`}
                        template={templates[templateNum]}
                        content={section[templateNum]}
                        editLink={`/projects/sections/${index+1}`}
                        key={index}
                    />
                )  
            })
            }
            </ProjectLayout>
      </div>
    )
}

export default Summary;