import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { BookingScheduler } from "./Booking_scheduler";
import SeachBooking from "./SeachBooking";
import { Grid, Paper } from "@mui/material";

function Bookings() {
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