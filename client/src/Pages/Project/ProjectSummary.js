import { useAppContext } from "../../Context/AppContext";

const ProjectSummary = () => {
  const { createProject } = useAppContext();

  const items = { ...localStorage };
  console.log(Object.keys(items));
  console.log(items.projDetails);
  const test = {
    projDetails:JSON.parse(items.projDetails),
    sections:JSON.parse(items.sections)
  };

  console.log(test)
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
