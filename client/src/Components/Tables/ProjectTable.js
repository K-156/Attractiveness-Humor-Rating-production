import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { RiDeleteBin6Fill } from "react-icons/ri";
import _ from "lodash";

import "./Tables.css";
import DeleteDialog from "../Dialog/DeleteDialog";

const ProjectTable = ({ data, setDeleteSuccess,setIsLoading }) => {
  const navigate = useNavigate();
  const {
    setEditProject,
    deleteProject,
    isEditing,
    editProject,
    publishProject,
    deleteAllUsers,
    getProject
  } = useAppContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState({
    id: "",
    isActive: null,
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleOnEdit = async (id) => {
    navigate("/projects/summary");
    sessionStorage.setItem("editMode", "edit");
    sessionStorage.setItem("projId", id);
    const data = await getProject(id);
    const { sections, projDetails } = data;
    sessionStorage.setItem("templates", JSON.stringify(sections));
    sessionStorage.setItem("roles", JSON.stringify(projDetails.roles));
    setEditProject(id);
    if (isEditing) {
      editProject();
    }
  };

  const handleOnDelete = (item) => {
    setOpen(true);
    setToDelete({
      id: item._id,
      isActive: item.isActive,
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ px: 6, py: 2 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead className="tableHeader">
            <TableRow>
              <TableCell
                className="tableHeader-cell"
                sx={{ width: "5%", minWidth: "150px" }}
              >
                ID
              </TableCell>
              <TableCell
                className="tableHeader-cell"
                sx={{ width: "75%", minWidth: "300px" }}
              >
                Project Name
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={{ width: "3%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              (item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.projDetails.title}</TableCell>
                    <TableCell className="projectActive">
                      {item.isActive ? "Active" : ""}
                    </TableCell>
                    <TableCell>
                      <Chip
                        disabled={item.isPublish}
                        className="publishChip"
                        label="Publish"
                        onClick={() => publishProject(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        className="editChip"
                        label="Edit"
                        onClick={() => handleOnEdit(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        id={item.name}
                        sx={{ minWidth: "10px" }}
                        onClick={() => handleOnDelete(item)}
                      >
                        <RiDeleteBin6Fill
                          size={15}
                          style={{
                            color: "#264653",
                            pointerEvents: "none",
                          }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 45 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        isActive={toDelete.isActive}
        handleDelete={async (event) => {
          // delete registered participants
          setIsLoading(true);
          await deleteAllUsers(event.target.name);
          await deleteProject(event.target.name).then(() => {
            setDeleteSuccess(true);
          });
          setOpen(false);
          setIsLoading(false);
        }}
        id={toDelete.id}
        text="This project and the files will be permanently deleted from the storage"
        header="Delete Project?"
      />
    </Box>
  );
};

export default ProjectTable;
