import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { BookingsInterface } from "../models/IBooking";
import { 
  ListBookingbyRoom, ListBookings, 
} from "../services/HttpClientService";
import moment from "moment";
import { Alert, Button, Container, FormControl, Grid, Paper, Snackbar, TextField } from "@mui/material";


function SeachBooking() {
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);
  const [key, setKey] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [roomName, setRoomName] = React.useState(localStorage.getItem('roomName') + "");
  let test: { ID: string | undefined; title: string | undefined; startDate: string; endDate: string; Note: string | undefined; }[] = [];

  const ListBooking = async () => {
    const id = localStorage.getItem('roomName') + "";
    let res = await ListBookingbyRoom(id);
    if (res) {
      
      setBookings(res);

    }
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
  
  useEffect(() => {
    ListBooking();
  }, [key]);

  useEffect(() => {
    // console.log(bookings)
    schedule(bookings);
  }, [bookings]);


  function schedule(data: BookingsInterface[]){
    test = [];
    data.map((item, index) => {
      const data = {
        ID: item.ID,
        title: item.Room?.Detail,
        startDate: moment((String(item.Date_Start).split("+"))[0]+"Z").utc().format('YYYY-MM-DDTHH:mm'),
        endDate: moment((String(item.Date_End).split("+"))[0]+"Z").utc().format('YYYY-MM-DDTHH:mm'),
        Note: item.Objective?.Detail,
      };
      test.push(data);
    });
    
    localStorage.setItem('schedule', JSON.stringify(test));
    // console.log(localStorage.getItem('schedule'));
  }
  
  async function submit() {
    localStorage.setItem('roomName', roomName);
    setKey(!key);
    
    
  }

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
      <p>ค้นหาห้อง</p>
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={6}>
          
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Phonenumber"
              variant="outlined"
              type="string"
              size="medium"
              placeholder="เพื่อค้นหาห้อง"
              value={roomName + ""}
              onChange={(e) => {setRoomName(e.target.value)
                localStorage.setItem('roomName', e.target.value);
                console.log(localStorage.getItem('roomName'))
                }
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              submit();
              }}
             variant="contained"
             color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Grid>    
    </Container>
  </div>
 );
}

export default SeachBooking;



