const createProject = async (req, res) => {
  res.send("create project");
};

const getAllProjects = async (req, res) => {
    res.send("get all projects");
  };

const updateProject = async (req, res) => {
  res.send("update project");
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createProject, updateProject, showStats, getAllProjects };
