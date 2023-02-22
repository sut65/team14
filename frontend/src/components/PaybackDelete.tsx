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
ListDevices,ListDeviceType,
GetUser,GetDevice,UpdateDevice,ListPaybacks,
ListApproves,GetApprovebyCode,GetBooking,
GetApprove,ListTypebyDevice, GetPayback, GetBorrow,DeletePayback,
} from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { DeviceTypesInterface } from "../models/IDeviceType";
import { BookingsInterface } from "../models/IBooking";
import { PaybacksInterface } from "../models/IPayback";
import AccessDenied from "./AccessDenied";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaybackDelete() {
    const uid = localStorage.getItem("userID")

    const [paybacks, setPaybacks] = useState<PaybacksInterface[]>([]);
    const [payback, setPayback] = React.useState<PaybacksInterface>({
      PBADNote:"",PBusNote:"",
      Timeofpayback: new Date(),});

    const [borrow, setBorrow] = React.useState<BorrowsInterface>({});
    const [borrows, setBorrows] = React.useState<BorrowsInterface[]>([]);

    const [user, setUser] = useState<UsersInterface>({});    
    const [approves, setApproves] = React.useState<ApprovesInterface>({}); 

    const [booking, setBooking] = React.useState<BookingsInterface>({});
    const [device, setDevice] = React.useState<DevicesInterface>({}); 

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [searcherror, setSearcherror] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
      setSearcherror(false);
    };  
            
   const onChangePayback = async (e: SelectChangeEvent) =>{
    const paybackid = e.target.value;
    let res = await GetPayback(paybackid);
    if (res.status) {
        setPayback(res.data);
        console.log("Load Payback Complete");
        console.log(res);
        searchPaybackid(paybackid);
    }
    else{
        console.log("Load Payback Incomplete!!!");
    }   

    // let res0 = await GetBorrow(res.data.borrowID);
    // if (res0){
    //     setBorrows(res0);
    //     console.log(res0);
    // }

    // //////
    // let res1 = await GetDevice(res0.data.DeviceID);
    // if (res1){
    //     setDevice(res1);
    //     console.log(res1);
    // }
  }

    async function searchPaybackid(id: any) {
        let res = await GetPayback(id);
        console.log(res);
        if (res.status) {
            setPayback(res.data);
            searchBorrowid(res.data.payback.BorrowID);
        } else{
            setSearcherror(true);
            setErrorMessage(res.data);
        }
    }
    
    async function searchBorrowid(id: any) {
        let res = await GetBorrow(id);
        console.log(res);
        if (res.status) {
            setBorrow(res.data);
            searchBookingid(res.data.Approve?.BookingID);
        } else{
            setSearcherror(true);
            setErrorMessage(res.data);
            console.log("Load booking InComplete!!!!");
        }
    }
    async function searchBookingid(id: any) {
        let res = await GetBooking(id);     
        console.log(res);
        if (res) {
            setBooking(res);
        }
        else{
            console.log("Load booking InComplete!!!!");
        } 
    }

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

    const listPaybacks = async () => {
        let res = await ListPaybacks();
        if (res) {
          setPaybacks(res); 
        }
        else{
          console.log("List Paybacks InComplete!!!!");
        }
      };

        ////////////////////////////////////////search///////////////////
    async function submit() {
    let resbor = await GetPayback(payback.ID);
    console.log(resbor.data)
    console.log(resbor)
    // let resbor = await GetPayback(res.data);
    // console.log(resbor)
    
    let res1 = await GetDevice(resbor.data.DeviceID)
    if(res1){
      res1.StatusDevice=false
    }
    console.log(res1)
    let res2 = await UpdateDevice(res1)
    console.log(res2)
    if (res2.status) {
        //setAlertMessage("บันทึกสำเร็จ")
        setSuccess(true);
        setErrorMessage("");
    } else {
        setError(true);
        setErrorMessage(res2.data);
    }

    let res = await DeletePayback(payback.ID);
    if (res.status) {
        setSuccess(true);
        setErrorMessage("");
        setBorrow({
            BorrowAPNote:"",
            BorrowNote1: "",
            Timeofborrow:new Date(),
        })
        console.log(res.data) //borrow id
    } else {
        setError(true);
        setErrorMessage(res.data);
        return
    }
    }
      ///////////////////////////////search/////////////////////////
useEffect(() => {
    listPaybacks();
    getUser();},[]);

    //Check Role
    const roleLevel = localStorage.getItem('role')+""
    if (roleLevel !== "Admin") {
      return <AccessDenied />
    }
    
return (
<Container maxWidth="lg">
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

<Snackbar open={searcherror} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        ค้นหาไม่สำเร็จ: {errorMessage}
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
    ยกเลิกการคืนอุปกรณ์
    </Typography>
    </Box>
    </Box>

    <Divider />
    <Grid container spacing={3} sx={{ padding: 2 }}>
    <Grid item xs={12}>รหัสการคืนอุปกรณ์</Grid>
        <Grid item xs={12} >  
        <FormControl required fullWidth> 
              <InputLabel id="menu-PaybackID">กรุณาเลือกรหัสการคืนอุปกรณ์</InputLabel>
              <Select
                id="PaybackID"
                value={payback.ID || ""}
                label="กรุณาเลือกรหัสการคืนอุปกรณ์ *"
                onChange={onChangePayback}
                inputProps={{
                  name: "ID",
                }}
              >
                {paybacks?.map((item: PaybacksInterface) => 
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.ID}
                  </MenuItem>
                )}
              </Select>
            </FormControl>

                                                                {/* //////////////////////////// */}

        <Grid item xs={12} >
        <FormControl fullWidth variant="outlined">
            <p>หมายเหตุจากผู้บันทึก</p>
            <TextField
            label="หมายเหตุจากผู้บันทึก"
            type="string"
            disabled
            variant="filled"
            value={ payback?.Borrow?.BorrowAPNote || ""}  
            />
            </FormControl>
        </Grid>

        <Grid item xs={12} >
        <FormControl fullWidth variant="outlined">
            <p>หมายเหตุจากผู้ยืม</p>
            <TextField
            label="หมายเหตุจากผู้ยืม"
            type="string"
            disabled
            variant="filled"
            value={ payback?.Borrow?.BorrowNote1 || ""}  
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
                value={booking?.Code || ""}
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
            value={booking?.Date_Start || ""}  
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
            value={booking?.Date_End || ""}
            /> 
            </FormControl>
        </Grid>  
        </Grid>   
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ประเภทอุปกรณ์</p>
            <TextField
            label="ประเภทอุปกรณ์"
            type="string"
            disabled
            variant="filled"
            value={ device?.DeviceType?.DeviceTypeDetail || ""}
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
            value={ device?.Detail || ""}
            /> 
            </FormControl>
        </Grid> 

        <Grid item xs={12}>
        <Button component={RouterLink} to="/borrows" variant="contained">
        Back
        </Button>

        <Button
        style={{ float: "right" }}
        onClick={submit}
        variant="contained"
        color="primary"
        >
        ยกเลิกการยืมอุปกรณ์
        </Button>
        </Grid>
    
    </Grid>
</Paper>
</Container>
 );

}
export default PaybackDelete;