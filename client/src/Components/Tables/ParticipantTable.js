import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box, Button, Tooltip } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { BsInfoCircle } from "react-icons/bs";

const ParticipantTable = ({
  setRowsSelected,
  projectId,
  setDeleteOpen,
  setUploadOpen,
  setSendOpen,
  isLoading,
}) => {
  const [pageSize, setPageSize] = useState(5);
  const { users } = useAppContext();
  const CustomToolBar = () => {
    const today = moment(new Date()).format("DD-MM-YYYY");
    return (
      <GridToolbarContainer className="spaceBetween" sx={{ mb: 1 }}>
        <Box>
          <GridToolbarExport
            csvOptions={{
              allColumns: true,
              fileName: `${projectId} Participants (as of ${today})`,
            }}
            printOptions={{
              disableToolbarButton: true,
            }}
            sx={{
              backgroundColor: "#264653",
              color: "#FFFFFF",
              textTransform: "none",
              p: "8px 16px",
              "&:hover": {
                backgroundColor: "#C59D5F",
              },
              mr: 3,
            }}
          />
          <Button
            variant="contained"
            className="customButton-green"
            onClick={() => setUploadOpen(true)}
          >
            Add participants
          </Button>
        </Box>
        <Box className="flexEnd">
          <Button
            variant="outlined"
            sx={{
              px: 3,
              mr: 3,
              color: "#264653",
              borderColor: "#264653",
              textTransform: "none",
            }}
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            className="customButton-green"
            onClick={() => setSendOpen(true)}
          >
            Send Email
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  };

  return (
    <DataGrid
      components={{ Toolbar: CustomToolBar }}
      autoHeight
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
      checkboxSelection
      onSelectionModelChange={(id) => setRowsSelected(id)}
      disableSelectionOnClick
      rows={users}
      loading={isLoading}
      getRowId={(row) => row["_id"]}
      columns={[
        {
          field: "_id",
          headerName: "ID",
          type: "number",
          align: "left",
          headerAlign: "left",
        },
        { field: "name", headerName: "Name" },
        { field: "email", headerName: "Email" },
        {
          field: "createdAt",
          headerName: "Date Added",
          type: "date",
          valueFormatter: (params) => moment(params.value).format("DD/MM/YYYY"),
        },
        {
          field: "sex",
          headerName: "Sex",
          valueFormatter: (params) =>
            params.value === undefined ? "null" : params.value,
        },
        {
          field: "age",
          headerName: "Age",
          valueFormatter: (params) =>
            params.value === undefined ? "null" : params.value,
        },
        {
          field: "ethnicity",
          headerName: "Ethnicity",
          valueFormatter: (params) =>
            params.value === undefined ? "null" : params.value,
        },
        {
          field: "ipAddress",
          headerName: "IP Address",
          minWidth: 150,
          renderCell: (params) => {
            return (
              <Box>
                <Tooltip title="Export the table to view the IP Address">
                  <Button sx={{ minWidth: "10px", color: "#C59D5F" }}>
                    <BsInfoCircle />
                  </Button>
                </Tooltip>
                {"*".repeat(params.value?.length)}
              </Box>
            );
          },
        },
        {
          field: "startTime",
          headerName: "Start",
          type: "dateTime",
          minWidth: 100,
          valueFormatter: (params) =>
            params.value === undefined
              ? "null"
              : moment(params.value).format("DD/MM/YYYY hh:mm A"),
        },
        {
          field: "endTime",
          headerName: "End",
          type: "dateTime",
          minWidth: 100,
          valueFormatter: (params) =>
            params.value === undefined
              ? "null"
              : moment(params.value).format("DD/MM/YYYY hh:mm A"),
        },
        {
          field: "duration",
          headerName: "Total Time Taken",
          type: "dateTime",
          minWidth: 100,
          valueFormatter: (params) => {
            const user = users.find((user) => user._id === params.id);
            const start = user.startTime;
            const end = user.endTime;
            if (start === undefined || end === undefined) return "null";
            const duration = moment.duration(moment(end).diff(moment(start)));
            return duration.humanize();
          },
        },
        { 
          field: "otp", 
          headerName: "OTP",
          minWidth: 100,
        },
        {
          field: "completionCode",
          headerName: "Completion Code",
          minWidth: 150,
          valueFormatter: (params) =>
            params.value === undefined ? "null" : params.value,
        },
      ]}
      componentsProps={{
        Toolbar: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
      sx={{
        ".MuiDataGrid-columnHeaders": {
          backgroundColor: "#264653",
          color: "#FFFFFF",
          border: "solid 1px #E8E8E8",
        },
        ".MuiDataGrid-columnSeparator": {
          color: "transparent",
        },
        ".MuiDataGrid-cellContent": {
          overflowWrap: "normal",
          whiteSpace: "normal",
          justifyContent: "center",
        },
        ".MuiDataGrid-menuIcon": {
          color: "#FFFFFF",
        },
        ".MuiDataGrid-row": {
          border: "solid 1px #E8E8E8",
          backgroundColor: "#FFFFFF",
        },
        border: "transparent",
        mt: 2,
      }}
    />
  );
};

export default ParticipantTable;
