import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {  Button, Container, FormControl, Grid, Paper,InputLabel, MenuItem, Snackbar, TextField, styled, Typography, IconButton, InputBase } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiInput from '@mui/material/Input';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";

import SearchIcon from '@mui/icons-material/Search';


import { UsersInterface } from "../models/IUser";
import {BookingsInterface } from "../models/IBooking";

import {CreateOrder, GetBookingbyCodeThatApprove, } from "../services/HttpClientService";
import {  
  
  GetUser,ListFood_and_Drinks
 
} from "../services/HttpClientService";
import { Order_foodInterface } from "../models/IOrder_food";
import { Food_and_DrinksInterface } from "../models/IFood_and_Drink";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Input = styled(MuiInput)`
  width: 42px;
`;

function OrderCreate(){
    const [user, setUser] = useState<UsersInterface>({
      ID:"User ID",FirstName: "User name",LastName:  "",
    });

    const [admin, setAdmin] = useState<UsersInterface>({});        
    const [booking, setBooking] = useState<BookingsInterface>({
      ID: "Booking ID",       
       User: {FirstName: "Usesr name", LastName: "",}
      ,Room: {Detail: "", Building:{Detail: "",}}
     
    });

    const [order_food, setOrder_food] = useState<Order_foodInterface>({Note: "",
    OrderTime: new Date(),});     
    const [food_drink, setFood_Drink] = useState<Food_and_DrinksInterface[]>([]);
    const [totold, setValue] = useState<number | string | Array<number | string>>(
        1
      );

      const [code, setCode] = useState("");      
  
      const [key, setKey] = useState(true);
      const [success, setSuccess] = useState(false);
      const [error, setError] = useState(false);

      const [successB, setSuccessB] = useState(false);
      const [errorB, setErrorB] = useState(false);
      
      
      const [errorSearch, setErrorSearch] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");   
      const [food_drinkID, setFood_DrinkID] = useState("");
          
   
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));        
      };
    
      const handleBlur = () => {
        if (totold < 1) {               
          setValue(1);
        } else if (totold > 100) {
          setValue(100);
        }
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

      setSuccessB(false);
      setErrorB(false);
     
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
     
     
  async function search(){
    if (code === ""){
      setErrorSearch(true);
      setErrorMessage("กรุณากรอกรหัสการจองห้องที่จะค้นหา");
      return
    }
    let res = await GetBookingbyCodeThatApprove(code);
    if (res.status){
      setOrder_food({
        ...order_food,
        ["ApproveID"]: res.data.ID,
      });
      
      setBooking(res.data);
      handleClose()
      setSuccessB(true);
      setErrorMessage("");
      console.log(res.data);
    } else {
      setErrorB(true);
      setErrorMessage(res.data);
    }
  }
   

  async function Submit() {
    let data = { 
      AdminID: (admin.ID),     
      ApproveID: (booking.Approve?.ID),
      Food_and_DrinkID: (food_drinkID),
      Totold:(totold), 
      Note: order_food.Note,
      OrderTime: order_food.OrderTime,   
      
      
    };
    console.log(data)
    let res = await CreateOrder(data);
    if (res) {
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
  listFood_and_Drink(); 
  getAdmin();   
}, []);


return (  
    <div>
<Container maxWidth="md">
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
      <Snackbar open={errorB} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
              ค้นหาไม่สำเร็จ: {errorMessage}
          </Alert>
      </Snackbar>
     
      <Snackbar open={errorSearch} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
              ค้นหารายการไม่สำเร็จ: {errorMessage}
          </Alert>
      </Snackbar>

     <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h5"
             color="primary"
             gutterBottom
           >
             จัดการร้องขออาหารและเครื่องดื่ม
           </Typography>
      </Box>
      <Box flexGrow={1}>
           <Typography
             component="h1"
             //variant="h6"             
             gutterBottom
           >
            ค้นหาห้อง
           </Typography>
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
    
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={9}>          
          <FormControl fullWidth variant="outlined">
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="Booking ID" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={booking.ID + ""}             
             
            />                
            <TextField id="outlined-basic" 
            label="User name" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium"             
            value={booking.User?.FirstName + " " + booking.User?.LastName +""}            
            />  
            <TextField id="outlined-basic" 
            label="Building" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={booking.Room?.Building?.Detail + ""}            
            />    
            <TextField id="outlined-basic" 
            label="Room" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={booking.Room?.Detail + ""}          
              
            />   
                       
              </Box>
          </FormControl>
        </Grid>        
      </Grid> 

      <Paper component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}>      
        <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={7} >
          <p>รายการอาหาร</p>
          <FormControl required fullWidth >
            <InputLabel id="Food_and_DrinkID">กรุณารายการอาหาร</InputLabel>
            <Select
              labelId="Food_and_DrinkID"
              label="กรุณารายการอาหาร *"
              onChange={ (e: SelectChangeEvent) => (setFood_DrinkID(e.target.value)) }
              inputProps={{
                name: "Food_and_DrinkID",
              }}
            >
              {food_drink.map((item: Food_and_DrinksInterface) => (
                <MenuItem 
                  key={item.ID}
                  value={item.ID}
                >
                  {item.Menu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>        
                  
        <Grid item xs={1}>
        <p>จำนวน</p>
          <Input
            value={totold}
            size= "medium"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 100,
              type: 'number',
              
            }}
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
      

        <Grid container spacing={1} sx={{ padding: 1 }}></Grid>     
        <Grid item xs={1}>
           <Stack direction="row" spacing={2}>
            <Button component={RouterLink}
                    to="/order_foods"
                    variant="outlined">Back</Button>      
           </Stack>
         </Grid>        
         
         <Grid item xs={7}>           
            <Button                  
                    variant="contained" color="success" size="large" style={{ float: "right" }}                    
                    onClick= {() => {
                     Submit();
                     }} >Submit</Button>      
           
         </Grid> 

        </Grid> 
        </Paper>        
      </Container>
      
    </div>
  
  );
}
export default OrderCreate;


