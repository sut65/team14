import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link as RouterLink } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { DevicesInterface } from "../models/IDevice";
import { DeviceTypesInterface } from "../models/IDeviceType";
import { BrandsInterface } from "../models/IBrand";
import { UsersInterface } from "../models/IUser";
import { CreateDevice, GetUser, ListDevices, UpdateDevice, GetDevice } from "../services/HttpClientService";
import {ListDeviceType, ListBrand, ListUsers,} from "../services/HttpClientService";
import TextField from "@mui/material/TextField";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function DeviceCreate() {
    const [device, setDevice] = React.useState<Partial<DevicesInterface>>({});
    const [devices, setDevices] = React.useState<DevicesInterface[]>([]);
    const [devicetypes, setDeviceTypes] = React.useState<DeviceTypesInterface[]>([]);
    const [brands, setBrands] = React.useState<BrandsInterface[]>([]);
    const [user, setUser] = React.useState<UsersInterface>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof device;
      const value = event.target.value;
      setDevice({
        ...device,
        [name]: value,
      });
    };

    const onChangeDevice = async(event: SelectChangeEvent) => {
        const id = event.target.value;
        let res = await GetDevice(id);
        if (res.status) { setDevice(res.data); console.log("Load Device Complete");}
        else{ console.log("Load Food_and_Drink InComplete!!!!");}
    };

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof device;
      const { value } = event.target;
      setDevice({ ...device, [id]: value });
      console.log(`[${id}]: ${value}`);
    };
  
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    //ดึงข้อมูล DeviceTypes
    const listDeviceTypes = async () => {
      let res = await ListDeviceType();
      if (res) { setDeviceTypes(res); console.log("Load DeviceType Complete");}
      else{ console.log("Load DeviceType InComplete!!!!");}
    };

    //ดึงข้อมูล Brands
    const listBrands = async () => {
      let res = await ListBrand();
      if (res) { setBrands(res); console.log("Load Brand Complete");}
      else{ console.log("Load Brand InComplete!!!!");}
    };

    const listDevices = async () => {
        let res = await ListDevices();
        if (res) { setDevices(res); console.log("Load Device Complete");}
        else{ console.log("Load Device InComplete!!!!");}
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

    React.useEffect(() => {
      listDeviceTypes();
      listBrands();
      getUser();
      listDevices();
    }, []);

    async function submit() {
      let data = {
          Detail: device.Detail,
          Number_of_Device: device.Number_of_Device,
          Note: device.Note,

          DeviceTypeID: (device.DeviceTypeID),
          BrandID: (device.BrandID),  
          AdminID: (user.ID),
      };
      console.log(data);
      
      let res = await UpdateDevice(data);
      console.log(res);
      if (res.status) {
        setErrorMessage("แก้ไขรายการอุปกรณ์สำเร็จ");
        setSuccess(true);
      } else {
        setErrorMessage(res.data);
        setError(true);
      }

  }

return (
    <Container maxWidth="md">
      <Snackbar id="success" open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success"> {errorMessage} </Alert>
      </Snackbar>
      <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {errorMessage} </Alert>
      </Snackbar>
      <Paper>
        <Box display="flex" sx={{ marginTop: 2, }}>
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom > เพิ่มรายการอุปกรณ์ </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">   
            <p>รายการอาหาร</p>
            <Select required defaultValue={"0"} onChange={onChangeDevice} inputProps={{ name: "DeviceID", }}>
              <MenuItem value={"0"}>กรุณาเลือกรายการอุปกรณ์</MenuItem>
                {devices?.map((item: DevicesInterface) => 
                  <MenuItem key={item.ID} value={item.ID} > {item.Detail} </MenuItem>)}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">   
            <p>ประเภทอุปกรณ์</p>
            <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "DeviceTypeID", }}>
              <MenuItem value={"0"}>กรุณาเลือกประเภทอุปกรณ์</MenuItem>
                {devicetypes?.map((item: DeviceTypesInterface) => 
                  <MenuItem key={item.ID} value={item.ID} > {item.DeviceTypeDetail} </MenuItem>)}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">   
              <p>ยี่ห้อ</p>
              <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "BrandID", }}>
              <MenuItem value={"0"}>กรุณาเลือกยี่ห้อ</MenuItem>
                {brands?.map((item: BrandsInterface) => 
                  <MenuItem key={item.ID} value={item.ID}> {item.BrandDetail} </MenuItem>)}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={8} >  
          <FormControl fullWidth variant="outlined">
              <p>ชื่ออุปกรณ์</p>
              <TextField  id="Detail" variant="outlined" type="string" size="medium" label="ชื่ออุปกรณ์" inputProps={{name: "Detail",}} value={device.Detail || ""} onChange={handleInputChange}/>
          </FormControl>
          </Grid>
          <Grid item xs={6} >  
          <FormControl fullWidth variant="outlined">
              <p>จำนวน</p>
              <TextField  id="Number_of_Device" variant="outlined" type="string" size="medium" label="จำนวน" inputProps={{name: "Number_of_Device",}} value={device.Number_of_Device || ""} onChange={handleInputChange}/>
          </FormControl>
          </Grid>
          <Grid item xs={6} >  
          <FormControl fullWidth variant="outlined">
              <p>หมายเหตุ</p>
              <TextField  id="Note" variant="outlined" type="string" size="medium" label="หมายเหตุ" inputProps={{name: "Note",}} value={device.Note || ""} onChange={handleInputChange}/>
          </FormControl>
          </Grid>
          <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">  
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/devices" variant="contained"> ยกเลิก </Button>
            <Button style={{ float: "right" }} onClick={submit} variant="contained" color="success" > บันทึก </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
);
}
export default DeviceCreate;

