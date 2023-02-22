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
ListDevices,ListDeviceType,GetUser,GetDevice,UpdateDevice,
ListApproves,GetApprovebyCode,ListBorrows,
GetApprove,ListTypebyDevice, GetBorrow, GetBooking, UpdateBorrow,
} from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { DeviceTypesInterface } from "../models/IDeviceType";
import { BookingsInterface } from "../models/IBooking";
import AccessDenied from "./AccessDenied";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BorrowUpdate() {
  const uid = localStorage.getItem("userID")
  const [borrows, setBorrows] = useState<BorrowsInterface[]>([]);
  const [borrow, setBorrow] = React.useState<BorrowsInterface>({
  BorrowNote1: "",BorrowAPNote:"",
  Timeofborrow: new Date(),});
  const [user, setUser] = useState<UsersInterface>({});    
  
  const [devices, setDevices] = React.useState<DevicesInterface[]>([]);
  const [devicetypes, setDevicetypes] = useState<DeviceTypesInterface[]>([]);
  const [device, setDevice] = React.useState<DevicesInterface>({});
  const [deviceOld, setDeviceOld] = React.useState<DevicesInterface>({});
  const [booking, setBooking] = React.useState<BookingsInterface>({});
  
  const [approves, setApproves] = React.useState<ApprovesInterface>({}); 
  const [appid, setAppid] = React.useState("");
  
  const [success, setSuccess] = React.useState(false);
  const [searcherror, setSearcherror] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    
  const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
  };

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

  const handleChange_Text = (
  event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
  const id = event.target.id as keyof typeof borrow;
  const { value } = event.target;
  setBorrow({ ...borrow, [id]: value, });
  console.log(`[${id}]: ${value}`);
  }; 

      
  const onChangeBorrow = async (e: SelectChangeEvent) =>{
  const borrowid = e.target.value;
  let res = await GetBorrow(borrowid);
  if (res.status) {
      setBorrow(res.data);
      searchBorrowid(res.data.ID);
      setDeviceOld(res.data.Device);
  }
  else{
      console.log("Load Borrow Incomplete!!!");
  }   

  let res1 = await GetDevice(res.data.DeviceID);
  if (res1){
      setDevice(res1);
      console.log(res1);
  }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof borrow;
    const value = event.target.value;
    setBorrow({...borrow,[name]: value,});
    console.log(`[${name}]: ${value}`);
  };

  async function searchBorrowid(id: any) {
  let res = await GetBorrow(id);
  console.log(res);
  if (res.status) {
      setBorrow(res.data);
      searchBookingid(res.data.Approve?.BookingID);
  } else{
      setSearcherror(true);
      setErrorMessage(res.data);
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

  const onChangeDevicebyType = async (e: SelectChangeEvent) =>{
  const did = e.target.value;
  let res = await ListTypebyDevice(did);
  if (res) {
    setDevices(res);
    console.log("Load Device Complete");
  }
  else{
    console.log("Load Device Incomplete!!!");
  }

  }

  const listDeviceType = async () => {
    let res = await ListDeviceType();  /////////////////////////
    if (res) {
      setDevicetypes(res);
      console.log("Load DeviceTypes Complete");
    }
    else{
      console.log("Load DeviceTypes InComplete!!!!");
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

  const listBorrows = async () => {
    let res = await ListBorrows();
    if (res) {
      setBorrows(res); 
    }
    else{
      console.log("Load Approves InComplete!!!!");
    }
  };

async function submit() {
  // update Old Device
  console.log("Device Old: Before")
  console.log(deviceOld)
  deviceOld.StatusDevice = true
  let bres2 = await UpdateDevice(deviceOld)
  //console.log("update device status be true finish")
  if (!bres2.status) {
    setError(true);
    setErrorMessage(bres2.data);
    return
  } 
  console.log("Device Old: After")
  console.log(deviceOld)

  //new data Borrow
  let data = {
    ID: borrow.ID,
    Timeofborrow: borrow.Timeofborrow,
    BorrowNote1: borrow.BorrowNote1,
    BorrowAPNote:borrow.BorrowAPNote,

    AdminID: user.ID,
    DeviceID: (borrow.DeviceID),
    ApproveID: (borrow.ApproveID),
  };

  // new Device Update
  let res1 = await GetDevice(data.DeviceID)
  console.log("Device New: Before")
  console.log(res1)
  res1.StatusDevice=false
  let res2 = await UpdateDevice(res1)
  if (!res2.status) {
    setError(true);
    setErrorMessage(res2.data);
    return
  } 
  console.log("Device New: After")
  console.log(res1)
  //cant update but have last data i need still cant update
  console.log("Borrow")
  console.log(data)
  let res3 = await UpdateBorrow(data);
  if (res3.status) {
      setSuccess(true);
      setErrorMessage("");
  } else {
      setError(true);
      setErrorMessage(res3.data);
      return
  }
  
  
}

useEffect(() => {
  listDeviceType();
  listBorrows();
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
    แก้ไขข้อมูลการยืมอุปกรณ์
    </Typography>
    </Box>
    </Box>
  
    <Divider />
    <Grid container spacing={3} sx={{ padding: 2 }}>
    <Grid item xs={12}>รหัสการยืมอุปกรณ์</Grid>
      
  <Grid item xs={12} >  
  <FormControl required fullWidth> 
    <InputLabel id="menu-BorrowID">กรุณาเลือกรหัสการยืมอุปกรณ์</InputLabel>
    <Select
      id="BorrowID"
      value={borrow.ID || ""}
      label="กรุณาเลือกรหัสการยืมอุปกรณ์ *"
      onChange={onChangeBorrow}
      inputProps={{
        name: "ID",
      }}
    >
      {borrows?.map((item: BorrowsInterface) => 
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
  required
  id="BorrowAPNote"
  type="string"
  label="กรุณากรอกหมายเหตุจากผู้บันทึก"
  inputProps={{
    name: "BorrowAPNote",
  }}
  value={borrow.BorrowAPNote + ""}
  onChange={handleChange_Text}
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
    value={ borrow?.BorrowNote1 || ""}  
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

<Grid item xs={6} >
<p>ประเภทอุปกรณ์</p>
<FormControl required fullWidth >
<InputLabel id="DeviceTypeID">กรุณาเลือกประเภทอุปกรณ์</InputLabel>
<Select
  labelId="DeviceTypeID"
  label="กรุณาเลือกประเภทอุปกรณ์ *"
  onChange={(e: SelectChangeEvent) => {onChangeDevicebyType(e);handleChange(e)} }
  inputProps={{name: "DeviceTypeID",}}

>
  {devicetypes.map((item: DeviceTypesInterface) => (
    <MenuItem 
      key={item.ID}
      value={item.ID}
    >
      {item.DeviceTypeDetail}
    </MenuItem>
  ))}
</Select>
</FormControl>
</Grid>  
  {/* //////////////////////////////device after choose type//////////////////////// */}

<Grid item xs={6} >
<p>อุปกรณ์</p>
<FormControl required fullWidth >
<InputLabel id="DeviceID">กรุณาเลือกอุปกรณ์</InputLabel>
  <Select
    labelId="DeviceID"
    label="กรุณาเลือกอุปกรณ์ *"
    onChange={ (handleChange) }
    inputProps={{name: "DeviceID",}}
  >
  {devices.map((item: DevicesInterface) => (
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
  <Button component={RouterLink} to="/borrows" variant="contained">
  Back
  </Button>

  <Button
  style={{ float: "right" }}
  onClick={submit}
  variant="contained"
  color="primary"
  >
  ยืนยันการแก้ไขข้อมูลการยืม
  </Button>
  </Grid>
    
    </Grid>
  </Paper>
  </Container>
           );
}
export default BorrowUpdate;