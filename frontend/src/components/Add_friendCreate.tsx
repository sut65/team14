import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {  Button, Container, FormControl, Grid, Paper, Snackbar, TextField } from "@mui/material";
import { RoomsInterface } from "../models/IRoom";
import { BuildingsInterface } from "../models/IBuilding";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import {BookingsInterface } from "../models/IBooking";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CreateAdd_friend, ListApproves } from "../services/HttpClientService";
import Approves from "./Approve";
import {  
  
  GetUser,GetBookingbyCodeThatNotApprove, 
 
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Add_friendCreate(){    
    const [approve, setApprove] = useState<ApprovesInterface>({});
    const [booking, setBooking] = useState<BookingsInterface>({});
    
    const [building, setBuilding] = useState<RoomsInterface>({});
    const [room, setRoom] = useState<RoomsInterface>({});    
    const [user, setUser] = useState<UsersInterface>({});
    
    const [codeID, setCode] = useState("");
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


  const getUser = async () => {
    const uid = localStorage.getItem("userID")
    let res = await GetUser(uid);
    if (res.status) {
      setUser(res.data);
      console.log("Load User Complete");  
    }
    else{
      console.log("Load User InComplete!!!!");
    }
  };
    
  
   
  async function search(){
    if (codeID === ""){
      setErrorSearch(true);
      setErrorMessage("กรุณากรอกรหัสการจองห้องที่จะค้นหา");
      return
    }
    let res = await GetBookingbyCodeThatNotApprove(codeID);
    if (res.status){
      setApprove({
        ...approve,
        ["BookingID"]: res.data.ID,
      });
      setBooking(res.data);
      handleClose()
      setErrorMessage("");
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
      setBooking(res.data);
      handleClose()
      setErrorMessage("");
    } else {
      setErrorSearch(true);
      setErrorMessage(res.data);
    }
  }  

  async function Submit() {
    let data = {
      Code: approve.Code,   
      

      UserID: (user.ID),
      //BookingID: (approve.BookingID),
      //StatusBookID: (approve.StatusBookID),
    };
    console.log(data)
    let res = await CreateAdd_friend(data);
    if (res.status) {
      setSuccess(true);
      setErrorMessage("");
      setBooking({
        //Objective: {Detail: ""},
        User: {FirstName: "", LastName: "",},
        Room: {Detail: "", Building:{Detail: "",}}
      })
  } else {
      setError(true);
      setErrorMessage(res.data);
  }
}

useEffect(() => {  
  getUser();
}, []);


return (  
    <div>

      <Container maxWidth="lg">
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
          <Alert onClose={handleClose} severity="success">
            ค้นหาสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ค้นหาไม่สำเร็จ
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
            label="Booking Code ID" 
            variant="outlined" 
            type="string" 
            size="medium" 
            placeholder="Code ID"
            value={codeID + ""}
              onChange={(e) => {setCode(e.target.value)                              
                console.log(codeID)
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
            value={booking +""}             
             
            /> 
            <TextField id="outlined-basic" 
            label="Approve Satetus" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={""}                          
            />    
            <TextField id="outlined-basic" 
            label="User name" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={booking.User?.FirstName + " " + booking.User?.LastName}            
            />  
            <TextField id="outlined-basic" 
            label="Building" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={building + ""}              
            />    
            <TextField id="outlined-basic" 
            label="Room" 
            variant="outlined" 
            disabled 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={room + ""}             
              
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
            placeholder="Approve ID"
            value={userID}
              onChange={(e) => {setUserID(e.target.value)              
                console.log(userID)
                }
              }
            /> 
            <TextField id="outlined-basic" 
            label="User ID" 
            variant="outlined"
            disabled  
            type="string" 
            size="medium" 
            placeholder="UserID"
            value={booking.User?.ID}
                      
            />   
             <TextField id="outlined-basic" 
            label="Username"
            disabled 
            variant="outlined" 
            type="string" 
            size="medium"            
            placeholder="Username"
            value={booking.User?.FirstName + " " + booking.User?.LastName}           
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