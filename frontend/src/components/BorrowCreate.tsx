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
    GetUser,
    ListApproves,
    GetApprove,ListTypebyDevice,
    } from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { DeviceTypesInterface } from "../models/IDeviceType";

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

    const [approves, setApproves] = React.useState<ApprovesInterface>({}); 
    const [appid, setAppid] = React.useState("");

    const [success, setSuccess] = React.useState(false);
    const [errorSearch, setErrorSearch] = useState(false);
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
      async function searchAPID() {
        let res = await GetApprove(appid);
        console.log(res);
        if (res) {
            setApproves(res);
        } 
      }

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
        }
        
    }

    function onChangedevice(e: SelectChangeEvent<string>) {
      throw new Error("Function not implemented.");
        }    
    ///////////////////////////////search/////////////////////////
    useEffect(() => {
        listDeviceType();
        listApproves();
        getUser();},[]);

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
                         Create Borrow
                     </Typography>
                 </Box>
              </Box>
     
            <Divider />
             <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12} >  
                <Box component="form"
                    sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                    noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="No.Approve" variant="outlined" 
                    onChange={(e) => {setAppid(e.target.value)}}
                    />
                </Box>
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
              <p>หมายเหตุ</p>
              <TextField
                required
                id="BorrowAPNote"
                type="string"
                label="กรุณากรอกAP12345"
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
              <p>หมายเหตุ</p>
              <TextField
                required
                id="BorrowNote1"
                type="string"
                label="กรุณากรอกหมายเหตุ"
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
                        value={approves?.User?.FirstName || ""}  
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>BK-ID</p>
                      <TextField
                        value={approves?.Booking?.ID || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid>               
                
            <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>เริ่มจองเวลา</p>
                      <TextField
                        value={approves?.Booking?.Date_Start || ""}  
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>หมดจองเวลา</p>
                      <TextField
                        value={approves?.Booking?.Date_End || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid>   </Grid>
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

export default BorrowCreate
