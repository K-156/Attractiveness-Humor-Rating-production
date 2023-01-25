import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import _ from "lodash";
import moment from "moment";

const OverviewTable = ({ displayData, projectId, isLoading }) => {
  const [pageSize, setPageSize] = useState(5);
  const role = sessionStorage.getItem("role");
  const { sections, data } = useAppContext();

  const columns = ["_id"];

  sections.length !== 0 &&
    sections.forEach((element) => {
      switch (element) {
        case 2:
          for (let i = 1; i <= 4; i++) {
            columns.push(`option${i}_rate`);
          }
          break;
        case 3:
          for (let i = 1; i <= 4; i++) {
            columns.push(`option${i}_rank`);
          }
          break;
        case 4:
          const audioIndex = sections.indexOf(4);
          const audioQns =
            data?.[audioIndex]?.["4"]?.[role]?.questions?.length;
          for (let i = 1; i <= audioQns; i++) {
            columns.push(`best_audio_q${i}`);
          }
          for (let i = 1; i <= audioQns; i++) {
            columns.push(`worst_audio_q${i}`);
          }

          break;
        case 5:
          const introIndex = sections.indexOf(5);
          const introQns =
            data?.[introIndex]?.["5"]?.[role]?.questions?.length;
          for (let i = 1; i <= introQns; i++) {
            columns.push(`best_intro_q${i}`);
          }
          for (let i = 1; i <= introQns; i++) {
            columns.push(`worst_intro_q${i}`);
          }
          break;
        case 6:
          columns.push("best_prewritten_msg");
          columns.push("worst_prewritten_msg");
          break;
        default:
          console.log("no need column name");
      }
    });

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
      rows={displayData}
      loading={isLoading}
      getRowId={(row) => row["_id"]}
      columns={_.map(columns, (key, index) => {
        return {
          key: `${key}_${index}`,
          field: key,
          headerName: key === "_id" ? "User ID" : key,
          valueFormatter: (params) =>
            params.value === undefined ? "null" : params.value,
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
