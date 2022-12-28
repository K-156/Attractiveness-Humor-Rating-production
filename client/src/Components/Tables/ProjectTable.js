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

const ProjectTable = ({ data }) => {
  const navigate = useNavigate();
  const { setEditProject, deleteProject, isEditing, editProject, publishProject } = useAppContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleOnEdit = (id) => {
    navigate("/projects/summary");
    sessionStorage.setItem("editMode", "edit");
    setEditProject(id);
    if (isEditing) {
      editProject()
    }
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
                sx={{ width: "5%" }}
              >
                ID
              </TableCell>
              <TableCell 
                className="tableHeader-cell"
                sx={{ width: "75%" }}
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
                        onClick={()=>publishProject(item._id)}
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
                        sx={{minWidth:"10px"}}
                        onClick={() => deleteProject(item._id)}
                      >
                        <RiDeleteBin6Fill
                          size={15}
                          style={{ 
                            color: "#264653",
                            pointerEvents: "none" 
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
    </Box>
  );
};

export default ProjectTable;
