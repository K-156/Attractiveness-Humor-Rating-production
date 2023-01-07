import { useState } from 'react';

import { 
  DataGrid,
  GridToolbarContainer, 
  GridToolbarExport 
} from '@mui/x-data-grid';
import { 
  Box, 
  Button,
  Tooltip
} from "@mui/material";
import _ from 'lodash';
import moment from 'moment';
import { BsInfoCircle } from "react-icons/bs";

const ParticipantTable = ({ data, setRowsSelected, projectId, setDeleteOpen, setUploadOpen, setSendOpen }) => {

    const [pageSize, setPageSize] = useState(5);

    const CustomToolBar = () => {
      
      const today = moment(new Date()).format("DD-MM-YYYY");

      return(
        <GridToolbarContainer 
          className="spaceBetween" 
          sx={{mb:1}}
        >
          <Box>
            <GridToolbarExport
              csvOptions={{
                allColumns: true, 
                fileName: `${projectId} Participants (as of ${today})`,
              }}
              printOptions={{
                disableToolbarButton: true
              }}
              sx={{
                backgroundColor:"#264653", 
                color:"#FFFFFF", 
                textTransform:"none",
                p: "8px 16px",
                "&:hover": {
                  backgroundColor:"#C59D5F", 
                },
                mr: 3
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
                  sx={{px: 3, mr: 3, color: "#264653", borderColor:"#264653", textTransform:"none"}}
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
      )
    }

    return(
      <DataGrid
        components={{ Toolbar: CustomToolBar }}
        autoHeight
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        onSelectionModelChange={(id) => setRowsSelected(id)}
        disableSelectionOnClick
        rows={data} 
        getRowId={(row) => row["_id"]}
        columns={[
            {field: "_id", headerName: "ID", type: "number", align:"left", headerAlign:"left"}, 
            {field: "name", headerName: "Name", flex: 1.5},
            {field: "email", headerName: "Email", flex: 2.5},
            {field: "dateAdded", headerName: "Date Added", type:"date", 
              valueFormatter: (params) => moment(params.value).format("DD/MM/YYYY"),
              valueGetter: (params) => moment(params.value).format("DD/MM/YYYY")
            },
            {field: "IPAddress", headerName: "IP Address", 
              renderCell: (params) => {
                return(
                  <Box>
                  <Tooltip title="Export the table to view the IP Address">
                    <Button sx={{minWidth:"10px", color:"#C59D5F" }}>
                      <BsInfoCircle />
                    </Button>
                  </Tooltip>
                  {"*".repeat(params.value.length)}
                  </Box>
                )
              },
            }, 
            {field: "start", headerName: "Start", type:"dateTime", flex: 1.5,
              valueFormatter: (params) => moment(params.value).format("DD/MM/YYYY hh:mm:ss A"),
              valueGetter: (params) => moment(params.value).format("DD/MM/YYYY hh:mm:ss A"),
            },
            {field: "end", headerName: "End", type:"dateTime", flex: 1.5,
              valueFormatter: (params) => moment(params.value).format("DD/MM/YYYY hh:mm:ss A"),
              valueGetter: (params) => moment(params.value).format("DD/MM/YYYY hh:mm:ss A"),
            },
            {field: "role", headerName: "Role"},
        ]}
        componentsProps={{
          Toolbar:{
            sx:{
              backgroundColor:"transparent",
            }
          }
        }}
        sx={{
          ".MuiDataGrid-columnHeaders": {
            backgroundColor:"#264653",
            color:"#FFFFFF",
            border: "solid 1px #E8E8E8",
          }, 
          ".MuiDataGrid-columnSeparator":{
            color:"transparent"
          },
          ".MuiDataGrid-cellContent": {
            overflowWrap: "normal",
            whiteSpace: "normal",
            justifyContent:"center",
          },
          ".MuiDataGrid-menuIcon":{
            color:"#FFFFFF"
          },
          ".MuiDataGrid-row": {
            border: "solid 1px #E8E8E8",
            backgroundColor:"#FFFFFF"
          },
          border: "transparent",
          mt: 2,
        }}            
      /> 
    )
}

export default ParticipantTable;