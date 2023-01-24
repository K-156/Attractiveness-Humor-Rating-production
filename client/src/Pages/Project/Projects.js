import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";

import ProjectTable from "../../Components/Tables/ProjectTable";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import SuccessAlert from "../../Components/SnackBar/SuccessAlert";
import SearchBar from "../../Components/SearchBar/SearchBar";
import _ from "lodash";

const Projects = () => {
  const navigate = useNavigate();
  const { getAllProjects, projects, createProject, setOriginalState } =
    useAppContext();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const options = [];
  _.map(projects, (project) => {
    const { projDetails } = project;
    options.push(`${project._id}: ${projDetails.title}`);
  });
  const [projectId, setProjectId] = useState(null);
  const [filterProj, setFilterProj] = useState(projects);

  const handleOnClick = async () => {
    const createdProjectId = await createProject();
    navigate("/projects/details");
    sessionStorage.setItem("editMode", "add");
    sessionStorage.setItem("projId", createdProjectId);
    sessionStorage.setItem("sectionNum", 0);
  };

  const handleSearch = (projects, projectId) => {
    const id = projectId.split(": ")[0];
    setFilterProj(projects.filter((aProject) => aProject["_id"] === id));
  };

  useEffect(() => {
    getAllProjects();
    setOriginalState();
  }, []);

  useEffect(() => {
    setFilterProj(projects);
  }, [projects]);

  return (
    <div>
      <script>{(document.title = "Projects")}</script>
      {!filterProj ? (
        <Loading />
      ) : (
        <>
          <Box className="spaceBetween" sx={{ mx: 6 }}>
            <SearchBar
              handleSearch={() => handleSearch(projects, projectId)}
              handleSearchChange={(event, value) => {
                if (value) {
                  setProjectId(value);
                } else {
                  setProjectId(null);
                  setFilterProj(projects);
                }
              }}
              projectId={projectId}
              options={options}
            />
            <Button
              variant="contained"
              onClick={handleOnClick}
              className="customButton-green"
            >
              Add Project
            </Button>
          </Box>
          <ProjectTable data={filterProj} setDeleteSuccess={setDeleteSuccess} />
        </>
      )}
      <SuccessAlert
        isSuccess={deleteSuccess}
        setIsSuccess={setDeleteSuccess}
        text="Project deleted successfully"
      />
    </div>
  );
};

export default Projects;
