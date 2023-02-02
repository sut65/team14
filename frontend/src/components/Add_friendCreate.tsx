import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {  Button, Container, FormControl, Grid, Snackbar, TextField } from "@mui/material";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import {BookingsInterface } from "../models/IBooking";
import { Add_friendInterface } from "../models/IAdd_friend";

import { CreateAdd_friend, GetBookingbyCodeThatApprove} from "../services/HttpClientService";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {  
  
  GetUser,
 
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Add_friendCreate(){
    const [user, setUser] = useState<UsersInterface>({
      ID:"User ID",FirstName: "User name",LastName:  "",
    });
    const [admin, setAdmin] = useState<UsersInterface>({}); 
    const [approve, setApprove] = useState<ApprovesInterface>({});   
    const [booking, setBooking] = useState<BookingsInterface>({
      ID: "Booking ID",       
       User: {FirstName: "Usesr name", LastName: "",}
      ,Room: {Detail: "", Building:{Detail: "",}}
     
    });
    const [add_frind, setAdd_friend] = useState<Add_friendInterface>({
    Note: "",
    AddfriendTime: new Date(),});    
    
    
    
    const [code, setCode] = useState("");
    const [userID, setUserID] = useState("");

    const [key, setKey] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorSearch, setErrorSearch] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorSearch_u, setErrorSearch_u] = useState(false);
    const [errorMessage_u, setErrorMessage_u] = useState("");

        

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

 const handleChange_Text = (
  event: React.ChangeEvent<{ id?: string; value: any }>
) => {
  const id = event.target.id as keyof typeof add_frind;
  const { value } = event.target;
  setAdd_friend({ ...add_frind, [id]: value, });
  console.log(`[${id}]: ${value}`);
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
  const getUser = async () => {    
    let res = await GetUser(userID);
    if (res.status) {
      setUser(res.data);
      console.log("Load User Complete");  
    }
    else{
      console.log("Load User InComplete!!!!");
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
      setAdd_friend({
        ...add_frind,
        ["ApproveID"]: res.data.ID,
      });
      
      setBooking(res.data);
      handleClose()
      setErrorMessage("");
      console.log(res.data);
    } else {
      setErrorSearch(true);
      setErrorMessage(res.data);
    }
  }
    

  async function search_u(){
    if (userID === ""){
      setErrorSearch_u(true);
      setErrorMessage_u("กรุณากรอกรหัสผู้ใช้เพื่อค้นหา");
      return
    }
    let res = await GetUser(userID);
    if (res.status){
      setUser(res.data);
      //setBooking(res.data);
      handleClose()
      setErrorMessage("");
    } else {
      setErrorSearch(true);
      setErrorMessage(res.data);
    }
  }  

  async function Submit() {
    let data = { 
      AdminID: (admin.ID),     
      ApproveID: (booking.Approve?.ID),
      UserID: (user.ID), 
      Note: add_frind.Note,
      AddfriendTime: add_frind.AddfriendTime,

      
      
    };
    console.log(data)
    let res = await CreateAdd_friend(data);
    if (res) {
      setSuccess(true);
      setErrorMessage("");     
  } else {
      setError(true);
      setErrorMessage(res.data);
  }
  setAdd_friend({
    Note: "",
    AddfriendTime: new Date(),
  })
   
}

useEffect(() => { 
  getAdmin(); 
  getUser();
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

     

        <p>ระบบจัดการเพิ่มเพื่อนเข้าห้อง</p>
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={6}>          
          <FormControl fullWidth variant="outlined">
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="Booking Code " 
            variant="outlined" 
            type="string" 
            size="medium" 
            placeholder="Code ID"
            value={code + ""}
              onChange={(e) => {setCode(e.target.value)                              
                console.log(code)
                }
              }
            />            
              </Box>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button
             style={{ float: "right" }}
             size="large"
              onClick= {() => {
               search();
               }}
             variant="contained"
             color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
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
      <hr></hr>     
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={3}>          
          <FormControl fullWidth variant="outlined">
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="User ID" 
            variant="outlined" 
            type="string" 
            size="medium" 
            placeholder="User ID"
            value={userID}
              onChange={(e) => {setUserID(e.target.value)              
                console.log(userID)
                }
              }
            /> 
            <TextField id="outlined-basic" 
            label="UserID " 
            variant="outlined"
            disabled  
            type="string" 
            size="medium" 
            placeholder="UserID"
            value={user.ID +""}
                      
            />   
             <TextField id="outlined-basic" 
            label="Username"
            disabled 
            variant="outlined" 
            type="string" 
            size="medium"            
            placeholder="Username"
            value={user.FirstName + " " + user.LastName}           
            />          
              </Box>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              search_u();
              }}
             variant="contained"
             color="primary"
          >
            Search
          </Button>
        </Grid>
        <Grid container spacing={1} sx={{ padding: 1 }}>
          
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
                value={add_frind.Note + ""}
                onChange={handleChange_Text}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>เวลาที่เพิ่มเข้า</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="กรอกเวลาที่อนุมัติ"
                value={add_frind.AddfriendTime}
                onChange={(newValue) => {
                  setAdd_friend({
                    ...add_frind,
                    AddfriendTime: newValue,
                  });
                }}
                ampm={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> 
          </Grid>
          <Grid item xs={1}>
           <Stack direction="row" spacing={2}>
            <Button component={RouterLink}
                    to="/add_friends"
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
      </Grid>         
      </Container>
    </div>
  
  );
}
export default Add_friendCreate;


