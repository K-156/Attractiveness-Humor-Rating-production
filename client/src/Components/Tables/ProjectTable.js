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

const ProjectTable = ({ data }) => {
  const navigate = useNavigate();
  const { setEditProject, deleteProject, isEditing, editProject } = useAppContext();
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
          <TableHead sx={{ backgroundColor: "#264653", height: "50px" }}>
            <TableRow>
              <TableCell
                sx={{ color: "#FFFFFF", fontWeight: "bold", width: "5%" }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{ color: "#FFFFFF", fontWeight: "bold", width: "75%" }}
              >
                Project Name
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
              (item) => {
                return (
                  <TableRow key={item.name}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell sx={{ color: "#898989", fontWeight: "bold" }}>
                      {item.isActive ? "Active" : ""}
                    </TableCell>
                    <TableCell>
                      <Chip
                        disabled={item.isPublish}
                        sx={{
                          mx: 1,
                          backgroundColor: "#C59D5F",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#264653",
                            cursor: "pointer",
                          },
                          width: "80px",
                          "&.MuiChip-root.Mui-disabled": {
                            backgroundColor: "grey",
                          },
                        }}
                        label="Publish"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          mx: 1,
                          backgroundColor: "#264653",
                          color: "#FFFFFF",
                          "&:hover": {
                            backgroundColor: "#C59D5F",
                            cursor: "pointer",
                          },
                          width: "80px",
                        }}
                        label="Edit"
                        onClick={() => handleOnEdit(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        id={item.name}
                        onClick={() => deleteProject(item._id)}
                      >
                        <RiDeleteBin6Fill
                          size={15}
                          style={{ color: "#264653", pointerEvents: "none" }}
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
