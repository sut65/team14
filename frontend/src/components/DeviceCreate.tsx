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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BrandsInterface } from "../models/IBrand";
import { DevicesInterface } from "../models/IDevice";
//import { GuardsInterface } from "../models/IGuard";
import { DeviceTypesInterface } from "../models/IDeviceType";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CreateDevice, ListDeviceType, ListBrand } from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeviceCreate(){
    const [device, setDevice] = React.useState<DevicesInterface>({Detail:""});
    const [brands, setBrands] = React.useState<BrandsInterface[]>([]);    

    const [devicetypes, setDeviceTypes] = React.useState<DeviceTypesInterface[]>([]); 

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange_Text = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof device;
        const { value } = event.target;
        setDevice({ ...device, [id]: value, });
        console.log(`[${id}]: ${value}`);
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

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof device;
        const value = event.target.value;
        setDevice({
          ...device,
          [name]: value,
        });
        console.log(`[${name}]: ${value}`);
      };

      const listBrands = async () => {
        let res = await ListBrand();
        if (res) {
            setBrands(res);
            console.log("Load Brands Complete");
            console.log(res.data);
        }
        else{
          console.log("Load Brands InComplete!!!!");
        }
      };

      const listDeviceType = async () => {
        let res = await ListDeviceType();
        if (res) {
          setDeviceTypes(res);
          console.log("Load devicetype Complete");
        }
        else{
          console.log("Load devicetype InComplete!!!!");
        }
      };

      async function submit() {
        let data = {
            
            Detail: device.Detail,

            BrandID: (device.BrandID),
            DeviceTypeID: (device.DeviceTypeID),  
        };
        console.log(data);
        
        let res = await CreateDevice(data);
        console.log(res);
        if (res) {
            setSuccess(true);
            setErrorMessage("");
        } else {
            setError(true);
            setErrorMessage(res);
        }

    }

    useEffect(() => {
        listBrands();
        listDeviceType();
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
              บันทึกข้อมูลไม่สำเร็จ  {errorMessage}
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
                         Create Device
                     </Typography>
                 </Box>
            </Box>
     

            <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>ชื่ออุปกรณ์</p>
                      <TextField
                       required
                       id="Detail"
                       type="string"
                       label="อุปกรณ์"
                       inputProps={{
                         name: "Detail",
                       }}
                       value={device.Detail + ""}
                       onChange={handleChange_Text}
                      />
                    </FormControl>
                  </Grid> 
                </Grid>               
                
    
          <Grid item xs={6} >
          <p>ประเภท</p>
          <FormControl required fullWidth >
            <InputLabel id="DeviceTypeID">กรุณาเลือกประเภทของอุปกรณ์</InputLabel>
            <Select
              labelId="DeviceTypeID"
              label="กรุณาเลือกประเภทของอุปกรณ์ *"
              onChange={ (handleChange) }
              inputProps={{
                name: "DeviceTypeID",
              }}
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

          <Grid item xs={6} >
          <p>ชื่อแบรนด์</p>
          <FormControl required fullWidth >
            <InputLabel id="BrandID">กรุณาเลือกแบรนด์</InputLabel>
            <Select
              labelId="BrandID"
              label="กรุณาเลือกแบรนด์ *"
              onChange={ (handleChange) }
              inputProps={{
                name: "BrandID",
              }}
            >
              {brands.map((item: BrandsInterface) => (
                <MenuItem 
                  key={item.ID}
                  value={item.ID}
                >
                  {item.BrandDetail}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid> 

               <Grid item xs={12}>
                <Button component={RouterLink} to="/devices" variant="contained">
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
              
          </Paper>
        </Container>
     
      );

     
}

export default DeviceCreate;