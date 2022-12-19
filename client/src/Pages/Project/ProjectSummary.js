import { useAppContext } from "../../Context/AppContext";

const ProjectSummary = () => {
  const { createProject } = useAppContext();

  const items = { ...localStorage };

  const test = {
    projDetails: JSON.parse(items.projDetails),
    sections: JSON.parse(items.sections),
    data:JSON.parse(items.projData)
  };

  console.log(test);


  return (
    <div>
      <button
        onClick={() => {
          createProject(test);
        }}
      >
        submit
      </button>
    </div>
  );
};

export default ProjectSummary;
