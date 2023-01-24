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
import format from "date-fns/format";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { CreateBorrow,
    ListDevices,ListBorrows,
    GetUser,
    ListApproves,
    GetApprove,
    GetBorrow,
    } from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { PaybacksInterface } from "../models/IPayback";
import { containerClasses } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaybackCreate() {
    const [payback, setPayback] = React.useState<PaybacksInterface>({Timeofpayback: new Date(),});
    const [user, setUser] = useState<UsersInterface>({});    

    const [devices, setDevices] = React.useState<DevicesInterface[]>([]);

    const [borrows, setBorrows] = React.useState<BorrowsInterface>(); 
    const [borrowid, setborrowid] = React.useState("");

    const [success, setSuccess] = React.useState(false);
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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof payback;
        const { value } = event.target.value;
        setPayback({ 
            ...payback , 
            [id]: value 
        }); console.log(`[${id}]: ${value}`);
    };

    // const onChangedevice = async (e: SelectChangeEvent) =>{   ///////////
    //     const did = e.target.value;
    //     let res = await listDevices(did);
    //     if (res) {
    //         setDevices(res);     //////////////
    //       console.log("Load Device Complete");
    //     }
    //     else{
    //       console.log("Load Device Incomplete!!!");
    //     } }

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
        if (res) {
          setUser(res);
          console.log("Load User Complete");
          console.log(`UserName: ${res.FirstName} + ${res.LastName}`);    
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
        } 
      }

      // async function searchdtype() {
      //   let res = await GetDevices(appid);
      //   console.log(res);
      //   if (res) {
      //       setDevices(res);
      //   } 
      // }

    async function submit() {
        let data = {
            Timeofpayback: payback.Timeofpayback,

            AdminID: (payback.User),
            DeviceID: (payback.DeviceID),
            BorrowID: (payback.BorrowID),  
        };
        console.log(data)
        // let res = await CreateBorrow(data);
        // console.log(res);
        // if (res) {
        //     setSuccess(true);
        // } else {
        //     setError(true);
        // }
    }

    ///////////////////////////////search/////////////////////////

    useEffect(() => {
        listDevices();
        listBorrows();
        getUser();
    }, []);

  function onChangedevice(e: SelectChangeEvent<string>) {
    throw new Error("Function not implemented.");
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
               </Grid>

            <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>ผู้ยืมอุปกรณ์</p>
                      <TextField
                        value={borrows?.User?.FirstName || ""}  
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>room</p>
                      <TextField
                        //value={borrow?.approves?.Booking?.Room?.Detail || ""}
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
                       // value={borrow?.approves?.Booking?.Date_Start || ""}  
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
                        //value={borrow?.approves?.Booking?.Date_End || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid>   

                <FormControl fullWidth variant="outlined">     
                <Typography
                    component="h2"
                    variant="h5"
                    color="primary"
                    gutterBottom
                  >ประเภทของอุปกรณ์
                </Typography>
                  <Grid item xs={6}>
                  <Select
                    required
                    defaultValue={"0"}
                    onChange={(e) => {
                      //(handleInputChange(e));    /////////////////////  handle  ////////////////////
                      onChangedevice(e);
                    }}
                    inputProps={{
                      name: "DeviceType",       ///////////////////////////device/
                    }}
                  >
                    <MenuItem value={"0"}>เลือกประเภทของอุปกรณ์</MenuItem>
                      {devices?.map((item: DevicesInterface) => {
                        if (item.DeviceType == null) {
                        return(<MenuItem
                          key={item.ID}
                          value={item.ID}
                        >
                          {item.ID}
                        </MenuItem>)
                        }
                      })}  
                  </Select>
                  </Grid>
              </FormControl>   

               {/* <Grid item xs={12} >
               <p>รหัสการจองใช้ห้อง</p>
               <FormControl required fullWidth >
                 <Select
                     required
                     onChange={handleInputChange}
                     inputProps={{
                       name: "BookingID",
                     }}
                   >
                     {borrow?.map((item: BorrowsInterface) => {
                         console.log(item.Borrow);
                         if (item.Borrow == null) {
                             console.log("A");
                             
                             console.log(item);
                             return(
                             <MenuItem
                                 key={item.ID}
                                 value={item.ID}
                             > {item.ID} </MenuItem>
                         )}
                     })}
                 </Select>
               </FormControl>
               </Grid>
     
               <Grid item xs={6}>
                 <FormControl fullWidth variant="outlined">     
                   <p>รายการแจ้งซ่อม</p>
                   <Select
                     required
                     defaultValue={"0"}
                     onChange={handleChange}
                     inputProps={{
                       name: "BookingID",
                     }}
                   >
                     <MenuItem value={"0"}>เลือกงานที่ต้องการซ่อมบำรุง</MenuItem>
                       {bookings?.map((item: BookingsInterface) => {
                         console.log(item.Approve);
                         if (item.Approve == null) {
                         return(<MenuItem
                           key={item.ID}
                           value={item.ID}
                         >
                           {item.ID}
                         </MenuItem>)
                         }
                       })}
                   </Select>
                 </FormControl>
               </Grid> */}
     
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

export default PaybackCreate;

function ListDevice(did: any) {
  throw new Error("Function not implemented.");
}