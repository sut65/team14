import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
  DeleteOrder,
    ListOrders, 
} from "../services/HttpClientService";

import { Order_foodInterface } from "../models/IOrder_food";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';


function Order_food() {

    const [order_food, setOrder_food] = React.useState<Order_foodInterface[]>([]);
    
    const listOrder_foods = async () => {
        let res = await ListOrders();
        if (res != null) {
          setOrder_food(res);
        }
    };  
    const columns: GridColDef[] = [
        { field: "Approve", 
        headerName: "รหัสการอนุมัติการใช้ห้อง", width: 200,
        valueFormatter: (params) => `${(params.value.Code)}`,  },       
        { field: "Food_and_Drink", headerName: "Food or Drink", width: 300,
        valueFormatter: (params) => `${params.value.Menu}`,
        },
        { field: "Totold", headerName: " Quantity", width: 100 ,                         
        },
        { 
          field: "OrderTime", headerName: "เวลาที่บันทึก", width: 220,
          valueFormatter: (params) => `${new Date(params.value)}`,
        },
        { field: "Note", headerName: "Note", width: 200 },        
        { field: "Admin", headerName: "ผู้เพิ่มรายการสั่ง",
            width: 150,
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,}, 
       
    ];
    useEffect(() => {
        listOrder_foods();
      }, []);

    
 return (
    <div>
         <Container maxWidth="lg" sx={{p:2}}>
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
         <ButtonGroup variant="contained" aria-label="Disabled elevation buttons">
            <Button component={RouterLink}
                    to="/order_food/create"
                    variant="contained"
                    color="primary" > Create Order </Button>
            <Button component={RouterLink}
                    to="/order_food/update"
                    variant="outlined"
                    color="primary" >Edit</Button>
            <Button component={RouterLink}
                    to="/order_food/update"
                    variant="outlined"
                    color="error">Del</Button>
        </ButtonGroup>           
         </Box>
       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={order_food}
           getRowId={(row) => row.ID}
           columns={columns }
           pageSize={5}
           rowsPerPageOptions={[5]}
         />
         
       
       <TableContainer component={Paper}>
      <Table sx={{ height: 400, width: "100%", marginTop: '20px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="center">Approve Code</TableCell>
            <TableCell align="center">Menu</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">เวลาที่บันทึก</TableCell>
            <TableCell align="center">ผู้บันทึก</TableCell>
            <TableCell align="center">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order_food.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.ID}</TableCell>
              <TableCell align="center">{row.Approve?.Booking?.Code}</TableCell>
              <TableCell align="right">{row.Food_and_Drink?.Menu}</TableCell>
              <TableCell align="right">{row.Totold}</TableCell>
              <TableCell align="left">{row.Note}</TableCell>
              <TableCell align="right">{row.OrderTime?.toString()}</TableCell>               
              <TableCell align="right">{row.Admin?.FirstName} {row.Admin?.LastName} </TableCell>
              <TableCell align="right"><ButtonGroup
                                          disableElevation                                          
                                          aria-label="Disabled elevation buttons"
                                          size="small"
                                        >
                                          <Button variant="contained">Edit</Button>
                                          <Button variant="outlined" onClick={() => DeleteOrder(row.ID)}>Del</Button>
                                        </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
     </Container>
   </div>
 );

}
export default Order_food;