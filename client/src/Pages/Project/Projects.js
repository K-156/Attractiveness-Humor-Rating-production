import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";

import ProjectTable from "../../Components/Tables/ProjectTable";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import SuccessAlert from "../../Components/SnackBar/SuccessAlert";

const Projects = () => {
  const navigate = useNavigate();
  const {
    getAllProjects,
    projects,
    isLoading,
    createProject,
    setOriginalState,
  } = useAppContext();
  const handleOnClick = async () => {
    const createdProjectId = await createProject();
    navigate("/projects/details");
    sessionStorage.setItem("editMode", "add");
    sessionStorage.setItem("createdProjectId", createdProjectId);
    sessionStorage.setItem("sectionNum", 0);
  };
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    getAllProjects();
    setOriginalState();
  }, []);

  return (
    <div>
      <script>{(document.title = "Projects")}</script>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 6 }}>
            <Button
              variant="contained"
              onClick={handleOnClick}
              className="customButton-green"
            >
              Add Project
            </Button>
          </Box>
          <ProjectTable data={projects} setDeleteSuccess={setDeleteSuccess} />
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
