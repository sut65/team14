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
    CreateBooking, 
    ListBuildings, ListRoomsbyBuilding,
    ListObjectives,
    GetUser,
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import format from "date-fns/format";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BuildingsInterface } from "../models/IBuilding";
import MenuItem from "@mui/material/MenuItem";
import { RoomsInterface } from "../models/IRoom";
import { ObjectivesInterface } from "../models/IObjective";
import { UsersInterface } from "../models/IUser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function BookingCreate() {
  const [user, setUser] = useState<UsersInterface>({});
  const [booking, setBooking] = useState<BookingsInterface>({
    Date_Start: new Date(),
    Date_End: new Date(),
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [buildings, setBuildings] = useState<BuildingsInterface[]>([]);
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [objectives, setObjectives] = useState<ObjectivesInterface[]>([]);

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
    const name = event.target.name as keyof typeof booking;
    const value = event.target.value;
    setBooking({
      ...booking,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };

  const onChangeBuilding = async (e: SelectChangeEvent) =>{
    const bid = e.target.value;
    let res = await ListRoomsbyBuilding(bid);
    if (res) {
      setRooms(res);
      console.log("Load Room Complete");
    }
    else{
      console.log("Load Room Incomplete!!!");
    }
    
  }

  const listBuildings = async () => {
    let res = await ListBuildings();
    if (res) {
      setBuildings(res);
      console.log("Load Buildings Complete");
    }
    else{
      console.log("Load Buildings InComplete!!!!");
    }
  };

  const getUser = async () => {
    const uid = localStorage.getItem("userID")
    let res = await GetUser(uid);
    if (res) {
      setUser(res);
      console.log("Load User Complete");
      console.log(`UserName: ${res.FirstName} + ${res.LastName}`);    
    }
    else{
      console.log("Load User InComplete!!!!");
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
      let data = {
          // Date_Start: format(booking?.Date_Start as Date, 'yyyy-dd-MM HH:mm:ss zz'),
          // Date_End: format(booking?.Date_End as Date, 'yyyy-dd-MM HH:mm:ss zz'),

          Date_Start: booking.Date_Start,
          Date_End: booking.Date_End,

          UserID: (user.ID),
          ObjectiveID: (booking.ObjectiveID),
          RoomID: (booking.RoomID),
      };
      console.log(data)
      let res = await CreateBooking(data);
      console.log(res);
      if (res) {
          setSuccess(true);
      } else {
          setError(true);
      }
  }

  useEffect(() => {
    listBuildings();
    listObjectives();
    getUser();
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
         บันทึกข้อมูลไม่สำเร็จ
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
                    Create Booking
                </Typography>
            </Box>
       </Box>

       <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="เวลาเริ่มต้นการจอง"
              value={booking.Date_Start}
              onChange={(newValue) => {
                setBooking({
                  ...booking,
                  Date_Start: newValue,
                });
                console.log(`Date End ${booking.Date_End}`);
              }}
              ampm={true}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="เวลาสิ้นสุดการจอง"
              value={booking.Date_End}
              inputFormat={"yyyy-dd-MM HH:mm:ss zz"}
              onChange={(newValue) => {
                setBooking({
                  ...booking,
                  Date_End: newValue,
                });
                console.log(`Date End ${booking.Date_End}`);
                
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={6} >
          <p>ตึก</p>
          <FormControl required fullWidth >
            <InputLabel id="BuildingID">กรุณาเลือกตึก</InputLabel>
            <Select
              labelId="BuildingID"
              label="กรุณาเลือกตึก *"
              onChange={ (onChangeBuilding) }
              inputProps={{
                name: "BuildingID",
              }}
            >
              {buildings.map((item: BuildingsInterface) => (
                <MenuItem 
                  key={item.ID}
                  value={item.ID}
                >
                  {item.Detail}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>

          <Grid item xs={6} >
          <p>ห้อง</p>
          <FormControl required fullWidth> 
            <InputLabel id="RoomID">กรุณาเลือกห้อง</InputLabel>
            <Select
              labelId="RoomID"
              label="กรุณาเลือกห้อง *"
              onChange={handleChange}
              inputProps={{
                name: "RoomID",
              }}
            >
              {rooms?.map((item: RoomsInterface) => 
                <MenuItem
                  key={item.ID}
                  value={item.ID}
                >
                  {item.Detail}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          </Grid>

          <Grid item xs={12} >
          <p>จุดประสงค์ในการจอง</p>
          <FormControl required fullWidth >
            <InputLabel id="BuildingID">กรุณาเลือกจุดประสงค์ในการจอง</InputLabel>
            <Select
              labelId="ObjectiveID"
              label="กรุณาเลือกจุดประสงค์ในการจอง *"
              onChange={ (handleChange) }
              inputProps={{
                name: "ObjectiveID",
              }}
            >
              {objectives.map((item: ObjectivesInterface) => (
                <MenuItem 
                  key={item.ID}
                  value={item.ID}
                >
                  {item.Detail}
                </MenuItem>
              ))}
            </Select>
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


export default BookingCreate;

function ListRoombyBuildings(bid: any) {
  throw new Error("Function not implemented.");
}
