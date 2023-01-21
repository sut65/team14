import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BookingsInterface } from "../models/IBooking";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookingScheduler } from "./Booking_scheduler";
import SeachBooking from "./SeachBooking";
import { 
    ListBookingbyRoom, ListBookings, 
  } from "../services/HttpClientService";
import { Grid, Paper } from "@mui/material";


function Bookings() {

    const [bookings, setBookings] = React.useState<BookingsInterface[]>([]);
    const getBookings = async () => {
    const apiUrl = "http://localhost:8080/bookings";
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
        if (res.data) {
            setBookings(res.data);
        }
        });
    };

    useEffect(() => {
        getBookings();
    }, []);

 return (

   <div>
     <Container maxWidth="lg">
        <Paper>
        <Grid container spacing={1} sx={{ padding: 2 }}>
            <Grid item xs={12}>
            <Paper>
                <Grid container spacing={1} sx={{ padding: 2 }}>
                    <Grid item xs={6}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            แสดงการจองใช้ห้อง
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            component={RouterLink}
                            to="/booking/create"
                            variant="contained"
                            color="primary"
                        >
                            Create Booking
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            component={RouterLink}
                            to="/booking/update"
                            variant="contained"
                            color="primary"
                        >
                            Update Booking
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button
                            component={RouterLink}
                            to="/booking/delete"
                            variant="contained"
                            color="primary"
                        >
                            Delete Booking
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            </Grid>

            
            <Grid item xs={12}>
                <Paper>
                    <SeachBooking />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <BookingScheduler />
            </Grid>
        </Grid>
    </Paper>
     </Container>
   </div>

 );

}


export default Bookings;