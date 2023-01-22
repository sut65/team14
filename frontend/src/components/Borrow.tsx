import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
    ListApproves, 
} from "../services/HttpClientService";
import { ApprovesInterface } from "../models/IApprove";

function Borrows() {

    const [approves, setApproves] = React.useState<ApprovesInterface[]>([]);

    const listApproves = async () => {
        let res = await ListApproves();
        if (res) {
            setApproves(res);
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
            field: "StatusBook",
            headerName: "สถานะการจอง",
            width: 120,
            valueFormatter: (params) => params.value.Detail,
        },
    ];

    useEffect(() => {
        listApproves();
    }, []);

 return (

   <div>
     <Container maxWidth="md">
       {/* <Box
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
             อนุมัติการจองใช้ห้อง
           </Typography>
         </Box>

         <Box>
           <Button
             component={RouterLink}
             to="/approve/create"
             variant="contained"
             color="primary"
           >
             Create Approve
           </Button>
         </Box>
       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={approves}
           getRowId={(row) => row.ID}
           columns={columns}
           pageSize={5}
           rowsPerPageOptions={[5]}
         />
       </div> */}
       
     </Container>
   </div>

 );

}


export default Borrows;