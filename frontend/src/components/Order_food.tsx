import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
    ListOrders, 
} from "../services/HttpClientService";
import { Add_friendInterface } from "../models/IAdd_friend";

function Order_food() {

    const [order_food, setOrder_food] = React.useState<Add_friendInterface[]>([]);
  
    const listOrder_foods = async () => {
        let res = await ListOrders();
        if (res != null) {
          setOrder_food(res);
        }
    };  
    const columns: GridColDef[] = [
        { field: "ApproveID", headerName: "Approve ID", width: 150  },
        { field: "Food_and_Drink", headerName: "Food or Drink", width: 300,
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}` },
        { field: "Totold", headerName: " Quantity", width: 100  },        
        { field: "Admin", headerName: "ผู้ที่เพิ่มเข้า",
            width: 150,
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,},        
        
    ];
    useEffect(() => {
        listOrder_foods();
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
             จัดการร้องขออาหารและเครื่องดื่ม
           </Typography>
         </Box>

         <Box>
           <Button
             component={RouterLink}
             to="/add_friends/create"
             variant="contained"
             color="primary"
           >
             Create Add friend
           </Button>
         </Box>
       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={order_food}
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
export default Order_food;