import _ from "lodash";
import { useAppContext } from "../../Context/AppContext";

import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import ProjectLayout from "../../Layout/ProjectLayout";
import { mockData } from "./mockData";
import { templates } from "../../Utils/templateList";
import { useEffect } from "react";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";

const Summary = () => {
  const {
    projDetails,
    data,
    sections,
    createProject,
    isEditing,
    getProject,
    isLoading,
  } = useAppContext();

  const type = sessionStorage.getItem("editMode");
  const items = { ...localStorage };
  const templateOrder = isEditing ? sections : JSON.parse(items.sections);

  const test = {
    projDetails: JSON.parse(items.projDetails),
    sections: JSON.parse(items.sections),
    data: JSON.parse(items.projData),
  };

  console.log(data)

  useEffect(() => {
    // need to change project id
    getProject("dkyiw0NI6A");
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
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
        createProject={createProject}
        data={test}
      >
        <SummaryCard
          header="Project Details"
          content={isEditing ? projDetails : test.projDetails}
          editLink="/projects/details"
        />
        {_.map(data, (section, index) => {
          console.log(section[1])
          const templateNum = templateOrder[index];
          return (
            <SummaryCard
              header={`Section ${index + 1}: ${templates[templateNum]}`}
              template={templates[templateNum]}
              content={section[templateNum]}
              editLink={`/projects/sections/${index + 1}`}
              key={index}
            />
          );
        })}
      </ProjectLayout>
    </div>
  );
};

export default Summary;
