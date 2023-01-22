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
    ListDevices,
    GetUser,
    ListApproves,
    GetApprove,
    } from "../services/HttpClientService";
import { UsersInterface } from "../models/IUser";
import { ApprovesInterface } from "../models/IApprove";
import { DevicesInterface } from "../models/IDevice";
import { BorrowsInterface } from "../models/IBorrow";
import { containerClasses } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BorrowCreate() {
    const [borrow, setBorrow] = React.useState<BorrowsInterface>({Timeofborrow: new Date(),});
    const [user, setUser] = useState<UsersInterface>({});    

    const [devices, setDevices] = React.useState<DevicesInterface[]>([]);

    const [approves, setApproves] = React.useState<ApprovesInterface>({}); 
    const [appid, setAppid] = React.useState("");

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
        const id = event.target.id as keyof typeof borrow;
        const { value } = event.target.value;
        setBorrow({ 
            ...borrow , 
            [id]: value 
        }); console.log(`[${id}]: ${value}`);
    };

    // const onChangeBuilding = async (e: SelectChangeEvent) =>{   ///////////
    //     const bid = e.target.value;
    //     let res = await listDevices(bid);
    //     if (res) {
    //         setDevices(res);     //////////////
    //       console.log("Load Approve Complete");
    //     }
    //     else{
    //       console.log("Load Approve Incomplete!!!");
    //     }
        
    //   }

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

      async function searchAPID() {
        let res = await GetApprove(appid);
        console.log(res);
        if (res) {
            setApproves(res);
        } 
      }
    async function submit() {
        let data = {
            //Date_Start: format(borrow?.Date_Start as Date, 'yyyy-dd-MM HH:mm:ss zz'),
            Timeofborrow: borrow.Timeofborrow,

            AdminID: (borrow.User),
            DeviceID: (borrow.DeviceID),
            ApproveID: (borrow.ApproveID),  
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



    useEffect(() => {
        listDevices();
        listApproves();
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
                    onChange={(e) => {setAppid(e.target.value)
                        }
                      }
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
                      <p>room</p>
                      <TextField
                        value={approves?.Booking?.Room?.Detail || ""}
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
                      <p>หมดจองเวลาkkkk</p>
                      <TextField
                        value={approves?.Booking?.Date_End || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      /> 
                    </FormControl>
                  </Grid>  
                </Grid>   


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

export default BorrowCreate;
