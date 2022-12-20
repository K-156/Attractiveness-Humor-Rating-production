import { 
    DataGrid, 
    GridToolbarContainer, 
    GridToolbarExport 
} from '@mui/x-data-grid';
import _ from 'lodash';

const OverviewTable = ({ data }) => {
  <></>

    // const CustomToolBar = () => {

    //     return(
    //       <GridToolbarContainer>
    //         <GridToolbarExport
    //           csvOptions={{
    //             allColumns: true, 
    //             fileName: "Loan History",
    //           }}
    //           printOptions={{
    //             disableToolbarButton: true
    //           }}
    //         />
    //       </GridToolbarContainer>
    //     )
    //   }

    // return(
    //     <DataGrid
    //           components={{ Toolbar: CustomToolBar }}
    //           autoHeight
    //         //   pageSize={pageSize}
    //         //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
    //         //   rowsPerPageOptions={[5, 10, 20]}
    //           disableSelectionOnClick
    //           rows={data}
    //           getRowId={()=>data[0]["id_"]}
    //           columns={_.map(data, (row) => {
    //                 _.map(row, (value, key) => {
    //                     return {id: key, field: key, headerName: key}
    //                 })                        
    //              })
    //             }
    //             // { field: 'option', headerName: 'ID', flex: 0.6},
    //             // { field: 'membership', headerName: 'MEMBERSHIP', flex: 2},
    //             // { field: 'type', headerName: 'TYPE', flex: 0.8},
    //             // { field: 'cardNumber', headerName: 'CARD NUMBER', flex: 1}, 
    //             // { field: 'eid', headerName: 'EMPLOYEE', flex: 0.8}, 
    //             // { field: 'loanDate', headerName: 'LOAN DATE', flex: 1}, 
    //             // { field: 'dueDate', headerName: 'DUE DATE', flex: 1},
    //           sx={{
    //             ".css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
    //               fontSize: "12px"
    //             }, 
    //             ".MuiDataGrid-cellContent": {
    //               overflowWrap: "normal",
    //               whiteSpace: "normal"
    //             }
    //           }}            
    //         /> 
    // )
}

export default OverviewTable;