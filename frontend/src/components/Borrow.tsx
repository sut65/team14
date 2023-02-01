import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
    ListBorrows, 
} from "../services/HttpClientService";
import { BorrowsInterface } from "../models/IBorrow";

function Borrows() {

    const [borrows, setBorrows] = React.useState<BorrowsInterface[]>([]);

    const listBorrows = async () => {
        let res = await ListBorrows();
        if (res) {
            setBorrows(res);
        }
    };
  
    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 50 },
        // { field: "ApproveCode", headerName: "Approve Code", width: 150 },
        {
            field: "User",
            headerName: "ผู้อนุมัติ",
            width: 120,
            valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,
        },
        {
          field: "DeviceTypeID",
          headerName: "ประเภทอุปกรณ์",
          width: 120,
          valueFormatter: (params) => params.value.Detail,
      },
        {
            field: "DeviceID",
            headerName: "อุปกรณ์",
            width: 120,
            valueFormatter: (params) => params.value.Detail,
        },
        {
            field: "StatusDevice",
            headerName: "สถานะอุปกรณ์",
            width: 120,
            valueFormatter: (params) => params.value.Detail,
        },
    ];

    useEffect(() => {
        ListBorrows();
    }, []);

 return (

   <div>
     <Container maxWidth="md">
       <Box
         display="flex"
         sx={{
           marginTop: 2,
         }}
       >

         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
           >
             อนุมัติการยืมอุปกรณ์
           </Typography>
         </Box>

         <Box>
           <Button
             component={RouterLink}
             to="/borrow/create"
             variant="contained"
             color="primary"
           >
             Create Borrow
           </Button>
         </Box>
       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={borrows}
           getRowId={(row) => row.ID}
           columns={columns}
           pageSize={5}
           rowsPerPageOptions={[5]}
         />
       </div>
       
     </Container>
   </div>

 );

}


export default Borrows;