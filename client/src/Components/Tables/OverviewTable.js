import { useState } from "react";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import _ from "lodash";
import moment from "moment";

const OverviewTable = ({ data, projectId, users }) => {
  // const columns = [];

  // _.map(users[0]?.userResponse, (value, key) => {
  //   _.map(Object.keys(value), (key) => {
  //     columns.push(key);
  //   });
  // });

  const [pageSize, setPageSize] = useState(5);

  const CustomToolBar = () => {
    const today = moment(new Date()).format("DD-MM-YYYY");

    return (
      <GridToolbarContainer sx={{ p: 0 }}>
        <GridToolbarExport
          csvOptions={{
            allColumns: true,
            fileName: `${projectId} (as of ${today})`,
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
            mb: 1,
          }}
        />
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
      disableSelectionOnClick
      rows={data}
      getRowId={(row) => row["_id"]}
      // columns={columns.forEach((element) => {
      //   return {
      //     key: element,
      //     field:element,
      //     headerName: element === "_id" ? "User ID" : element,
      //   };
      // })}
      columns={_.map(Object.keys(data[0]), (key) => {
        return {
          key: key,
          field: key,
          headerName: key === "_id" ? "User ID" : key,
        };
      })}
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

export default OverviewTable;
