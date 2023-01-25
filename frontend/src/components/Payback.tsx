import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListBorrows, ListPaybacks,
} from "../services/HttpClientService";
import { BorrowsInterface } from "../models/IBorrow";
import { PaybacksInterface } from "../models/IPayback";

function Paybacks() {

    const [paybacks, setPaybacks] = React.useState<PaybacksInterface[]>([]);

    const listPaybacks = async () => {
        let res = await ListPaybacks();
        if (res) {
            setPaybacks(res);
        }
    };
  
    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 50 },
        // { field: "ApproveCode", headerName: "Approve Code", width: 150 },
        {
            field: "Borrow",
            headerName: "การยืมที่",
            width: 120,
            valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,
        },
        {
            field: "User",
            headerName: "ผู้อนุมัติ",
            width: 120,
            valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,
        },
        {
            field: "DeviceID",
            headerName: "อุปกรณ์",
            width: 120,
            valueFormatter: (params) => params.value.Detail,
        },
        {
            field: "Date_Start",
            headerName: "เริ่มจองเวลา",
            width: 120,
            valueFormatter: (params) => params.value.Detail,
        },
        {
            field: "Date_End",
            headerName: "หมดจองเวลา",
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
        ListPaybacks();
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
             อนุมัติการคืนอุปกรณ์
           </Typography>
         </Box>

         <Box>
           <Button
             component={RouterLink}
             to="/payback/create"
             variant="contained"
             color="primary"
           >
             Create Payback
           </Button>
         </Box>
       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={paybacks}
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


export default Paybacks;