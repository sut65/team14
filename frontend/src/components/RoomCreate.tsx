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
import { UsersInterface } from "../models/IUser";
import { BuildingsInterface } from "../models/IBuilding";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CreateRoom, GetUser, ListBuildings, ListRoomsbyBuilding, ListTyperooms } from "../services/HttpClientService";
import { RoomsInterface } from "../models/IRoom";
import { TyperoomsInterface } from "../models/ITyperoom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RoomCreate(){
    const [room, setRoom] = React.useState<RoomsInterface>({
      Detail:"", Note: "",
      Time: new Date(),});

    const [user, setUser] = useState<UsersInterface>({});    

    const [typeroom, setTyperooms] = React.useState<TyperoomsInterface[]>([]);

    const [building, setBuildings] = React.useState<BuildingsInterface[]>([]); 

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange_Text = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof room;
        const { value } = event.target;
        setRoom({ ...room, [id]: value, });
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
        const name = event.target.name as keyof typeof room;
        const value = event.target.value;
        setRoom({
          ...room,
          [name]: value,
        });
        console.log(`[${name}]: ${value}`);
      };

      const onChangeBuilding = async (e: SelectChangeEvent) =>{
        const bid = e.target.value;
        let res = await ListRoomsbyBuilding(bid);
        if (res) {
          setRoom(res);
          console.log("Load Room Complete");
        }
        else{
          console.log("Load Room Incomplete!!!");
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

      const listTyperooms = async () => {
        let res = await ListTyperooms();
        if (res) {
            setTyperooms(res);
            console.log("Load Typerooms Complete");
        }
        else{
          console.log("Load Typerooms InComplete!!!!");
        }
      };

      const listBuildings = async () => {
        let res = await ListBuildings();
        if (res) {
          setBuildings(res);
          console.log("Load Buildings Complete");
        }
        else{
          console.log("Load Buildings InComplete!!!!");
        }
      };

      async function submit() {
        let data = {

            Detail: room.Detail,
            AdminID: (user.ID),
            TyperoomID: (room.TyperoomID),
            BuildingID: (room.BuildingID),  
            Note: room.Note,
            Time: room.Time,
        };
        let res = await CreateRoom(data);
      console.log(data);
      if (res.status) {
          setSuccess(true);
          setErrorMessage("");

          setRoom({
            Detail:"",
            Note: "",
            Time: new Date(),
          })
      } else {
          setError(true);
          setErrorMessage(res.data);
      }

    }

    useEffect(() => {
        listTyperooms();
        listBuildings();
        getUser();
    }, []);

      return (
        <Container maxWidth="md">
          <Snackbar
            id="success" 
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
     
          <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
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
                         Create Room
                     </Typography>
                 </Box>
            </Box>

            <Grid item xs={6} >
          <p>ชื่อตึก</p>
          <FormControl required fullWidth >
            <InputLabel id="BuildingID">กรุณาเลือกตึก</InputLabel>
            <Select
              id="BuildingID"
              label="กรุณาเลือกตึก *"
              value={room?.BuildingID || ""}
              onChange={ (handleChange) }
              inputProps={{
                name: "BuildingID",
              }}
            >
              {building.map((item: BuildingsInterface) => (
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
     

            <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>เลขห้อง</p>
                      <TextField
                        required
                        id="Detail"
                        type="int"
                        label="เลขห้อง"
                        inputProps={{
                          name: "Detail",
                        }}
                        value={room.Detail + ""}
                        onChange={handleChange_Text}
                      />
                    </FormControl>
                  </Grid> 
                </Grid>               
                
    
                <Grid item xs={6} >
          <p>ประเภทห้อง</p>
          <FormControl required fullWidth >
            <InputLabel id="TyperoomID">กรุณาเลือกประเภทห้อง</InputLabel>
            <Select
              id="TyperoomID"
              label="กรุณาเลือกประเภทห้อง *"
              onChange={ (handleChange) }
              inputProps={{
                name: "TyperoomID",
              }}
            >
              {typeroom.map((item: TyperoomsInterface) => (
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

          <Grid item xs={12} >
            <FormControl fullWidth variant="outlined">
              <p>หมายเหตุ</p>
              <TextField
                required
                id="Note"
                type="string"
                label="กรุณากรอกหมายเหตุ"
                inputProps={{
                  name: "Note",
                }}
                value={room.Note + ""}
                onChange={handleChange_Text}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>เวลาที่อนุมัติ</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="กรอกเวลาที่อนุมัติ"
                value={room.Time}
                onChange={(newValue) => {
                  setRoom({
                    ...room,
                    Time: newValue,
                  });
                }}
                ampm={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> 
          </Grid>

          
              
     
               <Grid item xs={12}>
                <Button component={RouterLink} to="/rooms" variant="contained">
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

export default RoomCreate;




