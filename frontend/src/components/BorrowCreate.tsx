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
GetUser,GetDevice,UpdateDevice,
ListApproves,GetApprovebyCode,
GetApprove,ListTypebyDevice,
} from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { DeviceTypesInterface } from "../models/IDeviceType";
import { BookingsInterface } from "../models/IBooking";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
props, ref
) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BorrowCreate() {
const uid = localStorage.getItem("userID")
const [borrow, setBorrow] = React.useState<BorrowsInterface>({
BorrowNote1: "",BorrowAPNote:"",
Timeofborrow: new Date(),});
const [user, setUser] = useState<UsersInterface>({});    

const [devices, setDevices] = React.useState<DevicesInterface[]>([]);
const [devicetypes, setDevicetypes] = useState<DeviceTypesInterface[]>([]);
const [device, setDevice] = React.useState<DevicesInterface>({});

const [approves, setApproves] = React.useState<ApprovesInterface>({}); 
const [appid, setAppid] = React.useState("");
const [code, setCode] = useState("")

const [success, setSuccess] = React.useState(false);
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
};  

const handleChange_Text = (
event: React.ChangeEvent<{ id?: string; value: any }>
) => {
const id = event.target.id as keyof typeof borrow;
const { value } = event.target;
setBorrow({ ...borrow, [id]: value, });
console.log(`[${id}]: ${value}`);
}; 

const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof borrow;
    const value = event.target.value;
    setBorrow({...borrow,[name]: value,});
    console.log(`[${name}]: ${value}`);
  };
  
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

const listApproves = async () => {
let res = await ListApproves();
if (res) {
    setApproves(res);
    console.log("Load Approves Complete");
}
else{
  console.log("Load Approves InComplete!!!!");
}
};

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
////////////////////////////////////////search///////////////////
async function searchAPID() {
let res = await GetApprove(appid);
console.log(res);
if (res) {
    setApproves(res);
} 
}

// async function searchAPbyCode() {
//   if (code === ""){
//     setErrorSearch(true);
//     setErrorMessage("กรุณากรอกรหัส Approve ที่จะค้นหา");
//     return
//   }
//   let res = await GetApprovebyCode(code);
//   // let res = await GetApprove(appid);
//   if (res.status){
//     setBorrow({
//       ...borrow,
//       ["Approve"]: res.data.ID,
//     });
//     setApproves(res.data);
//     handleClose()
//     setErrorMessage("");
//   } else {
//     setErrorSearch(true);
//     setErrorMessage(res.data);
//   }
// }

async function submit() {
let data = {
    Timeofborrow: borrow.Timeofborrow,

    BorrowNote1: borrow.BorrowNote1,
    BorrowAPNote:borrow.BorrowAPNote,

    AdminID: (user.ID),
    DeviceID: (borrow.DeviceID),
    //DeviceTypeID: (borrow.DeviceTypeID)+ "",
    ApproveID: (approves.ID),

};
console.log(data)
let res = await CreateBorrow(data);

console.log(res)
  if (res.status) {
    //setAlertMessage("บันทึกสำเร็จ")
    setSuccess(true);
    setErrorMessage("");
} else {
    setError(true);
    setErrorMessage(res.data);
    return
}
  /////////////
let res1 = await GetDevice(data.DeviceID)
  if(res1){
    res1.StatusDevice=false
  }
console.log(res1)
let res2 = await UpdateDevice(res1)
console.log(res2)
///////////////
if (res2.status) {
  //setAlertMessage("บันทึกสำเร็จ")
  setSuccess(true);
  setErrorMessage("");
} else {
  setError(true);
  setErrorMessage(res2.data);
}
}
///////////////////////////////search/////////////////////////
useEffect(() => {
listDeviceType();
listApproves();
getUser();},[]);

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
                  บันทึกการยืมอุปกรณ์
              </Typography>
          </Box>
      </Box>

    <Divider />
      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12} >  
        <Box component="form"
            sx={{'& > :not(style)': { m: 1, width: '50ch' },}}
            noValidate autoComplete="off">
            <TextField id="outlined-basic" label="หมายเลขการอนุมัติ" variant="outlined" 
            onChange={(e) => {setAppid(e.target.value)}}
            />
        </Box>

        {/* <FormControl required fullWidth id="ApproveCode">
          <InputLabel id="ApproveCode">กรุณาเลือกรหัสการจอง</InputLabel>
          <Select
            id="ApproveCode"
            value={code || ""}
            label="กรุณาเลือกรหัสการจอง *"
            onChange={(e: SelectChangeEvent)=>(setCode(e.target.value))}
          >
            {approves.map((item: ApprovesInterface) => {
              if (item.Borrow == null && item.ApproveTime == null) {
                return(<MenuItem
                  key={item.ID}
                  value={item.Code}
                >
                  {item.Code}
                </MenuItem>)
                }
            }

            )}
          </Select>
        </FormControl>  */}

                                                                  {/* //////////////////////////// */}
        <Button
            style={{ float: "right" }}
              size="small"
              onClick= {searchAPID}
            variant="contained"
            color="primary"
        >
            Search ApproveID
        </Button>

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
              required
              id="BorrowNote1"
              type="string"
              label="กรุณากรอกหมายเหตุจากผู้ยืม"
              inputProps={{
                name: "BorrowNote1",
              }}
              value={borrow.BorrowNote1 + ""}
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
              value={(approves?.Booking?.User?.FirstName + " " + approves?.Booking?.User?.LastName) || ""}  
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
                value={approves?.Booking?.Code || ""}
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
              value={approves?.Booking?.Date_Start || ""}  
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
              value={approves?.Booking?.Date_End || ""}
              /> 
            </FormControl>
          </Grid>  
        </Grid>   
        </Grid>
                  {/* //////////////////////////////devicetype////////////////////////////// */}
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
          อนุมัติการยืม
        </Button>
        </Grid>
      
      </Grid>
  </Paper>
</Container>

);

}

export default BorrowCreate
