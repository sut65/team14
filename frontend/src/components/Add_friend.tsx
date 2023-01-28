import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
  ListAdd_friends, 
} from "../services/HttpClientService";
import { Add_friendInterface } from "../models/IAdd_friend";

function Add_friend() {

    const [add_friend, setAdd_friends] = React.useState<Add_friendInterface[]>([]);
  
    const listAdd_friends = async () => {
        let res = await ListAdd_friends();
        if (res != null) {
            setAdd_friends(res);
        }
    };  
    const columns: GridColDef[] = [
        //{ field: "ApproveID", headerName: "Approve ID", width: 150  },
        { field: "Approve", 
        headerName: "รหัสการอนุมัติ", width: 140,
        valueFormatter: (params) => `${(params.value.Code)}`,  },
        { field: "UserID", headerName: "User ID", width: 100 },
        {field: "User",
            headerName: "เพื่อนที่เพิ่มเข้า",
            width: 200,
            valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,},        
        { field: "AdminID", headerName: "Admin ID", width: 150 },
        { field: "Admin", headerName: "ผู้ที่เพิ่มเข้า",
            width: 200,
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,},        
        
    ];
    useEffect(() => {
        listAdd_friends();
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
             Add Friend
           </Typography>
         </Box>

         <Box>
           <Button
             component={RouterLink}
             to="/add_friend/create"
             variant="contained"
             color="primary"
           >
             Create Add friend
           </Button>
         </Box>
       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={add_friend}
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
export default Add_friend;