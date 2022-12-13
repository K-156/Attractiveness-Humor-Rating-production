import { DataGrid } from '@mui/x-data-grid';

import { Card, Chip, Typography } from '@mui/material';

const data = [
    {id: 1, name: "Employment", isActive: true, isPublish: true, edit: 1}, 
    {id: 2, name: "Project 1", isActive: false, isPublish: false, edit: 2}, 
    {id: 3, name: "Project 2", isActive: false, isPublish: false, edit: 3}, 
    {id: 4, name: "Project 3", isActive: false, isPublish: false, edit: 4}, 
    {id: 5, name: "Project 4", isActive: false, isPublish: false, edit: 5}, 
    {id: 6, name: "Project 5", isActive: false, isPublish: false, edit: 6}, 
    {id: 7, name: "Project 6", isActive: false, isPublish: false, edit: 7}             
]


// if isActive, publish isdisabled

const AllProjects = () => {

    return(
        <Card sx={{ mt: 3}}>
            <DataGrid
              autoHeight
              pageSize={10}
              disableSelectionOnClick
              rows={data}
              columns={[
                { field: 'id', headerName: 'ID', flex: 1},
                { field: 'name', headerName: 'Project Name', flex: 1},
                { field: 'isActive', headerName: ' ', flex: 1, 
                    renderCell: (cellValues) => {
                        return <Typography>{cellValues.row.isActive ? "Active" : ""}</Typography>
                    }
                },
                { field: 'isPublish', headerName: ' ', flex: 1, 
                  renderCell: (cellValues) => {
                    return(
                      <Chip
                        disabled={cellValues.row.isPublish}
                        sx={{ mx: 1, backgroundColor: "#C59D5F", color:"#FFFFFF",
                              "&:hover": {backgroundColor: "#264653", cursor:"pointer"}, width: "80px", 
                              "&.MuiChip-root.Mui-disabled": {backgroundColor: "grey"}}}
                        label="Publish"
                      />
                    )
                  }
                }, 
                { field: 'edit', headerName: '', flex: 1,
                  renderCell: () => {
                    return(
                        <Chip
                          sx={{ mx: 1, backgroundColor: "#264653", color:"#FFFFFF",
                                "&:hover": {backgroundColor: "#C59D5F", cursor:"pointer"}, width: "80px" }}
                          label="Edit"
                        />
                    )
                  }}
              ]}
              sx={{
                ".MuiDataGrid-cellContent": {
                  overflowWrap: "normal",
                  whiteSpace: "normal"
                }
              }}            
            /> 
          </Card>
    )
}

export default AllProjects;