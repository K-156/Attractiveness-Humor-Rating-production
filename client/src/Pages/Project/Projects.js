import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";

import ProjectTable from "../../Components/Tables/ProjectTable";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import SuccessAlert from "../../Components/SnackBar/SuccessAlert";

const Projects = () => {
  const navigate = useNavigate();
  const { getAllProjects, projects, isLoading, createProject } =
    useAppContext();
  const handleOnClick = () => {
    createProject();
    navigate("/projects/details");
    sessionStorage.setItem("editMode", "add");
  };
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    getAllProjects();
  }, []);

   return (
    <div>
      <script>{(document.title = "Projects")}</script>
      {isLoading ? <Loading />
      : <>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 6 }}>
            <Button
              variant="contained"
              onClick={handleOnClick}
              className="customButton-green"
            >
              Add Project
            </Button>
          </Box>
          <ProjectTable 
            data={projects} 
            setDeleteSuccess={setDeleteSuccess}
          />
        </>
      }
      <SuccessAlert 
        isSuccess={deleteSuccess}
        setIsSuccess={setDeleteSuccess}
        text="Project deleted successfully"
      />
    </div>
  );
};

export default Projects;
