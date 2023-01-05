import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';

const ParticipantTable = ({ data, setRowsSelected }) => {

    const [pageSize, setPageSize] = useState(5);

    return(
      <DataGrid
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
            {field: "email", headerName: "Email", flex: 2},
            {field: "dateAdded", headerName: "Date Added", type:"date", flex: 0.8}
        ]}
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