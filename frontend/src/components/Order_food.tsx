import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MuiInput from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import { 
  DeleteOrder,
    ListOrders,ListOrderByBookingCode
} from "../services/HttpClientService";

import { Order_foodInterface } from "../models/IOrder_food";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import { Grid, IconButton, InputBase, Snackbar, styled } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Input = styled(MuiInput)`
  width: 42px;
`;
function Order_food() {

    const [order_foods, setOrder_foods] = useState<Order_foodInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [successDel, setSuccessDel] = useState(false);
    const [errorDel, setErrorDel] = useState(false);

    const [errorMessageDel, setErrorMessageDel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [code, setCode] = useState(""); 
    const [errorSearch, setErrorSearch] = useState(false); 
    const [ OrderID, setOrderID] = useState("");
  

    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
          return;
      }
      setSuccess(false);
      setError(false);

      setSuccessDel(false);
      setErrorDel(false);
     
 };
  async function search(){
    if (code === ""){
      setErrorSearch(true);
      setErrorMessage("กรุณากรอกรหัสการจองห้องที่จะค้นหา");
      return
    }  
    let res = await ListOrderByBookingCode(code);  
    if (res != null){
      setOrder_foods(res.data);   
      handleClose()
      setSuccess(true);
      setErrorMessage("");
      console.log(res.data);
      } else {
        setErrorSearch(true);
        setErrorMessage(res);
      }
  };

  const DelOrder  = async (id:any) => {
    let res = await DeleteOrder(id);
    if (res != null) {
      let res = await ListOrderByBookingCode(code);
      if (res != null){
        setOrder_foods(res.data);   
        handleClose()
        setSuccessDel(true);
        setErrorMessage("");
        console.log(res.data);
        console.log(res.data);
        } else {
          setErrorSearch(true);
          setErrorMessage(res);
        }     
      
    }
    else{
      setErrorDel(true);
      setErrorMessageDel(res);
    }
}; 
       
    
 return (
    <div>
         <Container maxWidth="lg" sx={{p:2}}>
       <Box
         display="flex"
         sx={{
           marginTop: 2,
         }}
       >
      <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert onClose={handleClose} severity="success">
                ค้นหาข้อมูลสำเร็จ
              </Alert>
      </Snackbar>
      <Snackbar open={errorSearch} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            ค้นหาข้อมูลไม่สำเร็จ: {errorMessage}
          </Alert>
      </Snackbar>

      <Snackbar
       open={successDel}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         ยกเลิกรายการสั่งสำเร็จ
       </Alert>
     </Snackbar>
     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         ยกเลิกรายการสั่งไม่สำเร็จ: {errorMessageDel}
       </Alert>
     </Snackbar>
     
         <Box flexGrow={1}>
           <Typography             
             variant="h6"
             color="primary"
             gutterBottom
             component="h4"
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
            <Button 
                    variant="outlined"
                    color="primary" >Edit</Button>           
        </ButtonGroup>           
         </Box>
       </Box>
       <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >      
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Booking Code"
            inputProps={{ 'aria-label': 'Booking Code' }}
            value={code + ""}
                  onChange={(e) => {setCode(e.target.value)                              
                    console.log(code)
                    }
                  }
          />
            <IconButton type="button" sx={{ p: '10px' }} 
                        aria-label="search" size="large"
                        onClick= {() => {
                        search();
                        }}>
              <SearchIcon />
            </IconButton>      
        </Paper> 

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
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
          {order_foods.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.ID}</TableCell>
              <TableCell align="center">{row.Approve?.Code}</TableCell>              
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
                                          <Button variant="contained" 
                                                  component={RouterLink}
                                                  to="/order_food/update" >Edit</Button>
                                          <Button variant="outlined" 
                                                  color="error" 
                                                  onClick={() => DelOrder(row.ID)}>Del</Button>
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