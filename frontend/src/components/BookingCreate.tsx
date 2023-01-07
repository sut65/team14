import React from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { 
    CreateBooking 
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function BookingCreate() {
    const [date, setDate] = React.useState<Date | null>(null);
    const [booking, setBooking] = React.useState<BookingsInterface>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof BookingCreate;
        const { value } = event.target;
        setBooking({ ...booking, [id]: value });
    };

    async function submit() {
        let data = {
            Date_Start: date,
            Date_End: date,

            UserID: (booking.UserID),
            ObjectiveID: booking.ObjectiveID,
            RoomID: booking.RoomID,
        };

        let res = await CreateBooking(data);
        console.log(res);
        if (res) {
            setSuccess(true);
        } else {
            setError(true);
        }
    }


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
           <FormControl fullWidth variant="outlined">
             <p>เวลาเริ่มต้นการจอง</p>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DatePicker
                 value={date}
                 onChange={(newValue) => {
                   setDate(newValue);
                 }}
                 renderInput={(params) => <TextField {...params} />}
               />
             </LocalizationProvider>
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>เวลาสิ้นสุดการจอง</p>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DatePicker
                 value={date}
                 onChange={(newValue) => {
                   setDate(newValue);
                 }}
                 renderInput={(params) => <TextField {...params} />}
               />
             </LocalizationProvider>
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