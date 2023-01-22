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

import { CreateBooking,ListDevices,ListRoomsbyBuilding} from "../services/HttpClientService";
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
    const [devices, setDevices] = React.useState<DevicesInterface[]>([]); 
    const [approve, setApprove] = React.useState<ApprovesInterface[]>([]); 
    const [user, setUser] = React.useState<UsersInterface[]>([]);
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
        const id = event.target.id as keyof typeof BorrowCreate;
        const { value } = event.target;
        setBorrow({ ...borrow , [id]: value });
    };

    const onChangeBuilding = async (e: SelectChangeEvent) =>{   ////////////////////device
        const bid = e.target.value;
        let res = await ListRoomsbyBuilding(bid);
        if (res) {
          setApprove(res);     //////////////
          console.log("Load Approve Complete");
        }
        else{
          console.log("Load Approve Incomplete!!!");
        }
        
      }
    const listDevices = async () => {
      let res = await ListDevices();
      if (res) {
        setDevices(res);
        console.log("Load Buildings Complete");
      }
      else{
        console.log("Load Buildings InComplete!!!!");
      }
    };
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
    }, []);

    return (
        <Container maxWidth="md">








        </Container>
    );

}

export default BorrowCreate;
