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
import format from "date-fns/format";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { CreateBorrow,
    ListDevices,ListBorrows,
    GetUser,ListApproves,GetBorrow,
    GetBooking,CreatePayback,
    } from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { PaybacksInterface } from "../models/IPayback";
import { BookingsInterface } from "../models/IBooking";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaybackCreate() {
    const [payback, setPayback] = React.useState<PaybacksInterface>({
    PBADNote: "",PBusNote:"",
    Timeofpayback: new Date(),});
    const [user, setUser] = useState<UsersInterface>({});    
    
    const [devices, setDevices] = React.useState<DevicesInterface[]>([]);
    const [booking, setBooking] = React.useState<BookingsInterface>({});
    const [approves, setApproves] = React.useState<ApprovesInterface>({});

    const [borrows, setBorrows] = React.useState<BorrowsInterface>({}); 
    const [borrowid, setborrowid] = React.useState("");

    const [success, setSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = React.useState(false);



    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") 
        {
            return;
        }
        setSuccess(false);
        setError(false);
    }; 

    const handleChange_Text = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof payback;
      const { value } = event.target;
      setPayback({ ...payback, [id]: value, });
      console.log(`[${id}]: ${value}`);
    }; 

    // const handleInputChange = (
    //     event: React.ChangeEvent<{ id?: string; value: any }>
    // ) => {
    //     const id = event.target.id as keyof typeof payback;
    //     const { value } = event.target.value;
    //     setPayback({ 
    //         ...payback , 
    //         [id]: value 
    //     }); console.log(`[${id}]: ${value}`);
    // };

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof payback;
      const value = event.target.value;
      setPayback({...payback,[name]: value,});
      console.log(`[${name}]: ${value}`);
    };

    const listBorrows = async () => {
        let res = await ListBorrows();
        if (res) {
            setBorrows(res);
            console.log("Load Borrows Complete");
        }
        else{
          console.log("Load Borrows InComplete!!!!");
        }
      };

    const listDevices = async () => {
      let res = await ListDevices();
      if (res) {
        setDevices(res);
        console.log("Load Devices Complete");
      }
      else{
        console.log("Load Devices InComplete!!!!");
      }
    };

    const getUser = async () => {
      const uid = localStorage.getItem("userID")
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

                                                        ////////////////////////////////////////search///////////////////

      async function searchBorrowid() {
        let res = await GetBorrow(borrowid);
        console.log(res);
        if (res) {
            setBorrows(res);
            searchBookingid(res.Approve?.BookingID);
        } 
      }

      async function searchBookingid(id: any) {
        let res = await GetBooking(id);     
        console.log(res);
        if (res) {
            setBooking(res);
        } 
      }

    async function submit() {
        let data = {
            Timeofpayback: payback.Timeofpayback,
            PBADNote: payback.PBADNote,
            PBusNote: payback.PBusNote,

            AdminID: (user.ID),
            DeviceID: (borrows.DeviceID),
            BorrowID: (borrows.ID),  
        };
        console.log(data)
        let res = await CreatePayback(data);
        console.log(res)
          if (res.status) {
            //setAlertMessage("บันทึกสำเร็จ")
            setSuccess(true);
            setErrorMessage("");
        } else {
            setError(true);
            setErrorMessage(res.data);
        }

    }

    ///////////////////////////////search/////////////////////////

    useEffect(() => {
        listDevices();
        ListApproves();
        listBorrows();
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
                     Create Payback
                 </Typography>
             </Box>
          </Box>
 
        <Divider />
         <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12} >  
             <Box component="form"
                sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                noValidate autoComplete="off">
                <TextField id="outlined-basic" label="No.Borrow" variant="outlined" 
                onChange={(e) => {setborrowid(e.target.value)
                    }
                  }
                />
            </Box> 

                  {/* //////////////////////////// */}
        
             <Button
                style={{ float: "right" }}
                 size="small"
                 onClick= {searchBorrowid}
                variant="contained"
                color="primary"
            >
                Search BorrowID
            </Button> 
           
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                <p>หมายเหตุจากผู้บันทึก</p>
                <TextField
                  required
                  id="PBADNote"
                  type="string"
                  label="กรุณากรอกหมายเหตุจากผู้บันทึก"
                  inputProps={{
                    name: "PBADNote",
                  }}
                  value={payback.PBADNote + ""}
                  onChange={handleChange_Text}
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                  <FormControl fullWidth variant="outlined">
                    <p>หมายเหตุจากผู้ยืม</p>
                    <TextField
                      required
                      id="PBusNote"
                      type="string"
                      label="กรุณากรอกหมายเหตุจากผู้ยืม"
                      inputProps={{
                        name: "PBusNote",
                      }}
                      value={payback.PBusNote + ""}
                      onChange={handleChange_Text}
                    />
                  </FormControl>
                </Grid>


          <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>ผู้ยืมอุปกรณ์</p>
                      <TextField
                      label="ชื่อ"
                      type="string"
                      disabled
                      variant="filled"
                      value={(booking.User?.FirstName + " " + booking.User?.LastName) || ""}  
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>Bookingcode</p>
                      <TextField
                        label="รหัสการจอง"
                        type="string"
                        disabled
                        variant="filled"
                        value={booking.Code || "" }
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid>             
            
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>เริ่มจองเวลา</p>
                      <TextField
                      label="เริ่มจองเวลา"
                      type="string"
                      disabled
                      variant="filled"
                      value={booking.Date_Start || ""}  
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>หมดจองเวลา</p>
                      <TextField
                      label="หมดจองเวลา"
                      type="string"
                      disabled
                      variant="filled"
                      value={booking.Date_End || ""}
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid>  
        
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>เริ่มยืมเวลา</p>
                      <TextField
                      label="เริ่มยืมเวลา"
                      type="string"
                      disabled
                      variant="filled"
                      value={borrows?.Timeofborrow || ""}  
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>อุปกรณ์</p>
                      <TextField
                      label="อุปกรณ์"
                      type="string"
                      disabled
                      variant="filled"
                      value={borrows?.Device?.Detail || ""}
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid> 

        </Grid> 
           <Grid item xs={12}>
            <Button component={RouterLink} to="/paybacks" variant="contained">
              Back
            </Button>
 
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              อนุมัติการคืน
            </Button>
           </Grid>
          
         </Grid>
      </Paper>
    </Container>
 
  );

}

export default PaybackCreate;