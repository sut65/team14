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
import { ApprovesInterface } from "../models/IApprove";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { 
    CreateApprove, 
    ListStatusBooks, 
    ListBookings,
    GetUser,
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import format from "date-fns/format";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StatusBooksInterface } from "../models/IStatusBook";
import MenuItem from "@mui/material/MenuItem";
import { RoomsInterface } from "../models/IRoom";
import { BookingsInterface } from "../models/IBooking";
import { UsersInterface } from "../models/IUser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function ApproveCreate() {
  const [user, setUser] = useState<UsersInterface>({});
  const [approve, setApprove] = useState<ApprovesInterface>({ });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [statusBooks, setStatusBooks] = useState<StatusBooksInterface[]>([]);
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);

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
    const name = event.target.name as keyof typeof approve;
    const value = event.target.value;
    setApprove({
      ...approve,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };


  const listStatusBooks = async () => {
    let res = await ListStatusBooks();
    if (res) {
      setStatusBooks(res);
      console.log("Load StatusBooks Complete");
    }
    else{
      console.log("Load StatusBooks InComplete!!!!");
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

  const listBookings = async () => {
    let res = await ListBookings();
    if (res) {
      setBookings(res);
      console.log("Load Bookings Complete");
    }
    else{
      console.log("Load Bookings InComplete!!!!");
    }
  };

  async function submit() {
      let data = {
          UserID: (user.ID),
          BookingID: (approve.BookingID),
          StatusBookID: (approve.StatusBookID),
      };
      console.log(data)
      let res = await CreateApprove(data);
      if (res) {
          setSuccess(true);
      } else {
          setError(true);
      }
  }

//   const onChangeBooking = async (e: SelectChangeEvent) =>{
//     let id = e.target.value;
//     let res = await GetRequest(id);
//     if (res) {
//       setRequest(res);  
//       console.log("Load Request ID Complete");
//     }
//     else{
//       console.log("Load Request ID Incomplete!!!");
//     }

  useEffect(() => {
    listStatusBooks();
    listBookings();
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
                    Create Approve
                </Typography>
            </Box>
       </Box>

       <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={6} >
          <p>กรุณาเลือกสถานะการจองใช้ห้อง</p>
          <FormControl required fullWidth> 
            <InputLabel id="RoomID">กรุณาเลือกสถานะการจองใช้ห้อง</InputLabel>
            <Select
              labelId="StatusBookID"
              label="กรุณาเลือกสถานะการจองใช้ห้อง *"
              onChange={handleChange}
              inputProps={{
                name: "StatusBookID",
              }}
            >
              {statusBooks?.map((item: StatusBooksInterface) => 
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
          <p>รหัสการจองใช้ห้อง</p>
          <FormControl required fullWidth >
            <Select
                required
                onChange={handleChange}
                inputProps={{
                  name: "BookingID",
                }}
              >
                {bookings?.map((item: BookingsInterface) => {
                    console.log(item.Approve);
                    if (item.Approve == null) {
                        console.log("A");
                        
                        console.log(item);
                        return(
                        <MenuItem
                            key={item.ID}
                            value={item.ID}
                        > {item.ID} </MenuItem>
                    )}
                })}
            </Select>
          </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">     
              <p>รายการแจ้งซ่อม</p>
              <Select
                required
                defaultValue={"0"}
                onChange={handleChange}
                inputProps={{
                  name: "BookingID",
                }}
              >
                <MenuItem value={"0"}>เลือกงานที่ต้องการซ่อมบำรุง</MenuItem>
                  {bookings?.map((item: BookingsInterface) => {
                    console.log(item.Approve);
                    if (item.Approve == null) {
                    return(<MenuItem
                      key={item.ID}
                      value={item.ID}
                    >
                      {item.ID}
                    </MenuItem>)
                    }
                  })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
           <Button component={RouterLink} to="/approves" variant="contained">
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


export default ApproveCreate;
