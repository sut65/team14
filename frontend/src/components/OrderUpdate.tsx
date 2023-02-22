import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {  Button, Container, FormControl, Grid, Snackbar, TextField, styled, Typography, Paper,} from "@mui/material";
import MuiInput from '@mui/material/Input';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";

import { Order_foodInterface } from "../models/IOrder_food";
import { Food_and_DrinksInterface } from "../models/IFood_and_Drink";
import { UsersInterface } from "../models/IUser";

import {GetOrderByID, UpdateOrder} from "../services/HttpClientService";
import {  
  
  GetUser,ListFood_and_Drinks
 
} from "../services/HttpClientService";
import AccessDenied from "./AccessDenied";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Input = styled(MuiInput)`
  width: 42px;
`;

function OrderUpateOrder(){

    const {id} = useParams<{ id: string | undefined }>();
    const [admin, setAdmin] = useState<UsersInterface>({});        
    const [order_food, setOrder_food] = useState<Order_foodInterface>({
      Note: "",
      OrderTime: new Date(),});     
    const [food_drink, setFood_Drink] = useState<Food_and_DrinksInterface>({});
    const [totold, setValue] = useState<number | string | Array<number | string>>(
        0,
      );
      const [key, setKey] = useState(true);
      const [success, setSuccess] = useState(false);
      const [error, setError] = useState(false);
     
      const [errorMessage, setErrorMessage] = useState("");   

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));     
               
      };


      const handleChange_Text = (
  event: React.ChangeEvent<{ id?: string; value: any }>
) => {
  const id = event.target.id as keyof typeof order_food;
  const { value } = event.target;
  setOrder_food({ ...order_food, [id]: value, });
  console.log(`[${id}]: ${value}`);
};    
    
const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
  ) => {
      if (reason === "clickaway") {
          return;
      }
      setSuccess(false);
      setError(false);
 };  

const listFood_and_Drink = async () => {
    let res = await ListFood_and_Drinks();
    if (res) {
      setFood_Drink(res);
      console.log("Load Food_Drinks Complete");
    }
    else{
      console.log("Load Food_Drinks InComplete!!!!");
    }
  };

  const getAdmin = async () => {
    const uid = localStorage.getItem("userID")
    let res = await GetUser(uid);
    if (res.status) {
      setAdmin(res.data);
      console.log("Load Admin Complete");  
    }
    else{
      console.log("Load Admin InComplete!!!!");
    }
  };   

  const getOrderByID = async (id:any) => {    
    let res = await GetOrderByID(id);
    if (res.status) {
      setOrder_food(res.data);
      console.log(res.data);
      console.log("Load order Complete");
      console.log(order_food)
      console.log(res.data?.Totold )  
      setValue(res.data?.Totold || 0)
    }
    else{
      console.log("Load Order InComplete!!!!");
    }
  }; 

  async function Submit() {
    let data = { 
      ID: order_food.ID,
      AdminID: admin.ID,     
      ApproveID: order_food.ApproveID,
      Food_and_DrinkID: order_food.Food_and_DrinkID,
      Totold: totold, 
      Note: order_food.Note,
      OrderTime: order_food.OrderTime,         
      
    };
    
    console.log(data)
    let res = await UpdateOrder(data);
    if (res.status) {
      setSuccess(true);
      setErrorMessage("");     
  } else {
      setError(true);
      setErrorMessage(res.data);
  }
  setOrder_food({
    Note: "",   
    OrderTime: new Date(),
   
  })
   
}

useEffect(() => {
  console.log("id page : " + id + "*********************"); 
  getOrderByID(id);
  listFood_and_Drink();
  getAdmin();   
}, []);
  //Check Role
  const roleLevel = localStorage.getItem('role')+""
  if (roleLevel !== "Admin") {
    return <AccessDenied />
  }

return ( 
     
    <div >
<Container maxWidth="lg" >
     <Snackbar
       open={success}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar>

     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>     
     <Box flexGrow={1}>
           <Typography
             component="h1"
             variant="h4"
             color="primary"
             gutterBottom                        
           >
             Update Order
           </Typography>
      </Box>
        
      <Paper
            component="form"
            sx={{ height: "95%", width: "100%", marginTop: '20px' }}
          >             
        <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={7} >
          <p>รายการอาหาร</p>
          <FormControl required fullWidth >
              <TextField 
                value={order_food.Food_and_Drink?.Menu}
                disabled
              />
            </FormControl>
        </Grid>        
                  
        <Grid item xs={1}>
        <p>จำนวน</p>
          <Input 
            id = "tolold"                   
            size= "medium"            
            //onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number', 
              name : "tolold"       
            }
          }
          onChange={handleInputChange}          
          value={totold+ ""}
          />
        </Grid>
        <Grid item xs={12} >
            <FormControl fullWidth variant="outlined">
              <p>หมายเหตุ</p>
              <TextField
                required
                id="Note"
                type="string"
                label="กรุณากรอกหมายเหตุ"
                inputProps={{
                  name: "Note",
                }}
                value={order_food.Note + ""}
                onChange={handleChange_Text}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>เวลาบันทึกรายการ</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="กรอกเวลาที่อนุมัติ"
                value={order_food.OrderTime}
                onChange={(newValue) => {
                  setOrder_food({
                    ...order_food,
                    OrderTime: newValue,
                  });
                }}
                ampm={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> 
          </Grid>
      

        <Grid container spacing={1} sx={{ padding: 1 }}>    
          <Grid item xs={10}>
            <Stack direction="row" spacing={2}>
              <Button component={RouterLink}
                      to="/order_foods"
                      variant="outlined">Back</Button>      
            </Stack>
          </Grid>        
          
          <Grid item xs={2}>           
              <Button                  
                      variant="contained" color="success" size="large" style={{ float: "right" }}                    
                      onClick= {() => {
                      Submit();
                      }} >Submit</Button>      
            
          </Grid> 
        </Grid> 
        </Grid> 
      </Paper>
      </Container>
      
    </div>
  
  );
}
export default OrderUpateOrder;


 