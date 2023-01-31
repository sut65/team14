import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { BookingsInterface } from "../models/IBooking";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { 
    UpdateBooking, 
    GetUser,
    ListBookingbyUser,
    GetBooking,
    GetBuilding,
    ListObjectives,
    GetObjective,
    DeleteBooking,
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BuildingsInterface } from "../models/IBuilding";
import MenuItem from "@mui/material/MenuItem";
import { UsersInterface } from "../models/IUser";
import { ObjectivesInterface } from "../models/IObjective";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function BookingDelete() {
  const uid = parseInt(localStorage.getItem("userID")+"")
  const [user, setUser] = useState<UsersInterface>({});
  const [building, setBuilding] = useState<BuildingsInterface>({});
  const [bookingUser, setBookingUser] = useState<BookingsInterface>({
    Code: "",
    Date_Start: new Date(),
    Date_End: new Date(),
  });
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);
  const [objectives, setObjectives] = useState<ObjectivesInterface[]>([]);
  const [objectiveOne, setObjectiveOne] = useState<ObjectivesInterface>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


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


  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof bookingUser;
    const value = event.target.value;
    setBookingUser({
      ...bookingUser,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };

  const onChangeBooking = async (e: SelectChangeEvent) =>{
    const bid = e.target.value;
    let res = await GetBooking(bid);
    if (res) {
      setBookingUser(res);
      console.log("Load BookingUser Complete");
      console.log(res);
      
    }
    else{
      console.log("Load BookingUser Incomplete!!!");
    }
    res = await GetBuilding(res.Room.BuildingID); 
    if (res) {
      setBuilding(res);
      console.log("Load Building Complete");
    }
    else{
      console.log("Load Building Incomplete!!!");
    }   
  }

  const getUser = async () => {   
    let res = await GetUser(uid);
    if (res.status) {
      setUser(res.data);
      console.log("Load User Complete");
      console.log(`UserName: ${res.data.FirstName} + ${res.data.LastName}`);    
    }
    else{
      console.log("Load User InComplete!!!!");
    }
  };

  const listBookingbyUser = async () => {
    let res = await ListBookingbyUser(uid);
    if (res.status) {
      setBookings(res.data)
      console.log("Load Bookings Complete");
    }
    else{
      console.log("Load Bookings InComplete!!!!");
    }
  };

  const listObjectives = async () => {
    let res = await ListObjectives();
    if (res) {
      setObjectives(res);
      console.log("Load Objectives Complete");
    }
    else{
      console.log("Load Objectives InComplete!!!!");
    }
  };

  async function submit() {
      let res = await DeleteBooking(bookingUser.ID);
      if (res.status) {
          setSuccess(true);
          setErrorMessage("");
          listBookingbyUser();
      } else {
          setError(true);
          setErrorMessage(res.data);
      }
  }

  useEffect(() => {
    getUser();
    listBookingbyUser();
    listObjectives();
  }, []);

 return (
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

     <Paper>
        <Box
            display="flex"
            sx={{
            marginTop: 2,
            }}
        >
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    Update Booking
                </Typography>
            </Box>
       </Box>

       <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12} >รหัสการจองใช้ห้อง</Grid>
          <Grid item xs={12} >
            <FormControl fullWidth variant="outlined">
              <InputLabel id="BookingID">กรุณารหัสการจองของคุณ</InputLabel>
              <Select
                labelId="BookingID"
                label="กรุณารหัสการจองของคุณ *"
                onChange={ (onChangeBooking) }
                inputProps={{
                  name: "BookingID",
                }}
              >
                {bookings.map((item: BookingsInterface) => (
                  <MenuItem 
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="เวลาเริ่มต้นการจอง"
              value={bookingUser.Date_Start}
              onChange={(newValue) => {
                setBookingUser({
                  ...bookingUser,
                  Date_Start: newValue,
                });
              }}
              ampm={true}
              disabled
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="เวลาสิ้นสุดการจอง"
              value={bookingUser.Date_End}
              minDateTime={bookingUser.Date_Start}
              onChange={(newValue) => {
                setBookingUser({
                  ...bookingUser,
                  Date_End: newValue,
                });               
              }}
              disabled
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={6} >
          <p>ตึก</p>
          <FormControl required fullWidth >
            <TextField 
              value={building?.Detail}
              disabled
            />
          </FormControl>
          </Grid>

          <Grid item xs={6} >
          <p>ห้อง</p>
          <FormControl required fullWidth >
            <TextField 
              value={bookingUser.Room?.Detail}
              disabled
            />
          </FormControl>
          </Grid>

          <Grid item xs={12} >
          <p>จุดประสงค์ในการจอง</p>
          <FormControl required fullWidth >
            <TextField 
              value={bookingUser?.Objective?.Detail}
              disabled
            />
          </FormControl>
          </Grid>

          <Grid item xs={12}>
           <Button component={RouterLink} to="/bookings" variant="contained">
             Back
           </Button>

           <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
           >
             Submit
           </Button>
          </Grid>
         
        </Grid>
     </Paper>
   </Container>

 );

}

export default BookingDelete;
