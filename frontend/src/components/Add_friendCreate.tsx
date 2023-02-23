import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {  Button, Container, FormControl, Grid, IconButton, InputBase, Paper, Snackbar, TextField } from "@mui/material";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import {BookingsInterface } from "../models/IBooking";
import { Add_friendInterface } from "../models/IAdd_friend";
import SearchIcon from '@mui/icons-material/Search';

import { CreateAdd_friend, GetBookingbyCodeThatApprove} from "../services/HttpClientService";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {  
  
  GetUser,GetUserByStudentID
 
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers";
import AccessDenied from "./AccessDenied";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Add_friendCreate(){
    const [user, setUser] = useState<UsersInterface>({
      StudentID:"Student ID",FirstName: "User name",LastName:  "",
    });
    const [admin, setAdmin] = useState<UsersInterface>({});       
    const [booking, setBooking] = useState<BookingsInterface>({
      ID: "Booking ID",       
       User: {FirstName: "Usesr name", LastName: "",}
      ,Room: {Detail: "", Building:{Detail: "",}}
     
    });
    const [add_frind, setAdd_friend] = useState<Add_friendInterface>({   Note: "",    AddfriendTime: new Date(),});    
    const [code, setCode] = useState("");
    const [studentID, setstudentID] = useState("");

    const [key, setKey] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false); 

    const [successu, setSuccessu] = useState(false);
    const [errorSearchu, setErrorSearchu] = useState(false);
    const [successb, setSuccessb] = useState(false);
    const [errorSearchb, setErrorSearchb] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageb, setErrorMessageb] = useState("");
    const [errorMessageu, setErrorMessageu] = useState("");
    
        

  const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
  ) => {
      if (reason === "clickaway") {
          return;
      }
      setSuccess(false);      
      setSuccessb(false);      
      setSuccessu(false);

      setErrorSearchb(false);
      setErrorSearchu(false);
     
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
    let res = await GetUserByStudentID(studentID);
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
      setErrorSearchb(true);
      setErrorMessageb("กรุณากรอกรหัสการจองห้องที่จะค้นหา");
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
      setSuccessb(true);
      setErrorMessageb("");
      console.log(res.data);
    } else {
      setErrorSearchb(true);
      setErrorMessageb(res.data);
    }
  }
    

  async function search_u(){
    if (studentID === ""){
      setErrorSearchu(true);
      setErrorMessageu("กรุณากรอกรหัสผู้ใช้เพื่อค้นหา");
      return
    }
    let res = await GetUserByStudentID(studentID);
    if (res.status){
      setUser(res.data);      
      handleClose()
      setSuccessu(true);
      setErrorMessageu("");
    } else {
      setErrorSearchu(true);
      setErrorMessageu(res.data);
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
    if (res.status) {
      setSuccess(true);
      setErrorMessage("");     
  } else {
      setError(true);
      setErrorMessage(res.data);
      console.log(res);
      
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
  //Check Role
  const roleLevel = localStorage.getItem('role')+""
  if (roleLevel !== "Admin") {
    return <AccessDenied />
  }

return (  
    <div>
<Container maxWidth="md" sx={{ bgcolor: '#EAEDED' }} >
     <Snackbar
     id = "successB" 
       open={successb}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         ค้นหาข้อมูลหาจองห้องสำเร็จ
       </Alert>
     </Snackbar> 
     <Snackbar id = "errorSearch_b" open={errorSearchb} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
          ค้นหาข้อมูลหาจองห้องไม่สำเร็จ: {errorMessageb}
          </Alert>
      </Snackbar>    

      <Snackbar
      id = "successU" 
       open={successu}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         ค้นหาข้อมูลผู้ใช้สำเร็จ
       </Alert>
     </Snackbar>

      <Snackbar id = "errorSearch_u" open={errorSearchu} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
            ค้นหาข้อมูลไม่สำเร็จ: {errorMessageu}
          </Alert>
      </Snackbar> 
      <Snackbar
     id = "success" 
       open={success}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar> 

     <Snackbar id = "error" open={error} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "bottom", horizontal: "center" }} >
       <Alert onClose={handleClose} severity="error">
         บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>   

        <p>ระบบจัดการเพิ่มเพื่อนเข้าห้อง</p>      
      <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >      
          <InputBase
          id = "booking code"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Booking Code"
            inputProps={{ 'aria-label': 'Booking Code' }}
            value={code + ""}
                  onChange={(e) => {setCode(e.target.value)                              
                    console.log(code)
                    }
                  }
          />
            <IconButton
            id = "booking button"
             type="button" sx={{ p: '10px' }} 
                        aria-label="search" size="large"
                        onClick= {() => {
                        search();
                        }}>
              <SearchIcon />
            </IconButton>      
        </Paper> 
      <div style={{ height: 200, width: "100%", marginTop: '20px'}}>
      <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:800 }}
          >
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
      </Paper>
      </div>
      <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >      
          <InputBase
            id="student id"
            sx={{ ml: 1, flex: 1 }}
            placeholder="student ID"
            inputProps={{ 'aria-label': 'studentID' }}
            value={studentID}
              onChange={(e) => {setstudentID(e.target.value)              
                console.log(studentID)
                }
              }
          />
            <IconButton id = "student button" 
                        type="button" sx={{ p: '10px' }} 
                        aria-label="search" size="large"
                        onClick= {() => {
                        search_u();
                        }}>
              <SearchIcon />
            </IconButton>      
        </Paper> 
        <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
          >   
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
            label="student ID" 
            variant="outlined"
            disabled  
            type="string" 
            size="medium" 
            placeholder="studentID"
            value={user.StudentID +""}
                      
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
       </Paper> 
       </div>         
      </Container>
    </div>
  
  );
}
export default Add_friendCreate;


