import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BookingsInterface } from "../models/IBooking";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookingScheduler } from "./Booking_scheduler";
import { 
    ListBookingbyRoom, ListBookings, 
  } from "../services/HttpClientService";


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
        console.log(res.data);
        if (res.data) {
            setBookings(res.data);
        }
        });
    };


    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 50 },
        { 
            field: "Date_Start", headerName: "Date Start", width: 150, type: 'dateTime',
            valueGetter: ({ value }) => value && new Date(value),
        },
        { 
            field: "Date_End", headerName: "Date End", width: 150 , type: 'dateTime',
            valueGetter: ({ value }) => value && new Date(value),
        },
        {
            field: "User", headerName: "ชื่อผู้จองใช้ห้อง", width: 150,
            valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName,
        },
        {
            field: "Room", headerName: "ห้องที่จอง", width: 150,
            valueFormatter: (params) => params.value.Detail,
        },
        {
            field: "Objective", headerName: "รายละเอียดการจอง", width: 150,
            valueFormatter: (params) => params.value.Detail,
        },

    ];

    useEffect(() => {
        getBookings();
    }, []);

 return (

   <div>
     <Container maxWidth="lg">
        <Box
            display="flex"
            sx={{
                marginTop: 2,
            }}
        >

            <Box flexGrow={30}>
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    แสดงการจองใช้ห้อง
                </Typography>
            </Box>

            <Box flexGrow={1}>
                <Button
                    component={RouterLink}
                    to="/booking/create"
                    variant="contained"
                    color="primary"
                >
                    Create Booking
                </Button>
            </Box>

            <Box flexGrow={1}>
                <Button
                    component={RouterLink}
                    to="/booking/update"
                    variant="contained"
                    color="primary"
                >
                    Update Booking
                </Button>
            </Box>

            <Box flexGrow={1}>
                <Button
                    component={RouterLink}
                    to="/booking/delete"
                    variant="contained"
                    color="primary"
                >
                    Delete Booking
                </Button>
            </Box>

        </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         {/* <DataGrid
           rows={bookings}
           getRowId={(row) => row.ID}
           columns={columns}
           pageSize={5}
           rowsPerPageOptions={[5]}
         /> */}
         <BookingScheduler />
       </div>
       
     </Container>
   </div>

 );

}


export default Bookings;