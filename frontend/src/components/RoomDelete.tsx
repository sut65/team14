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
import { InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { CreateRoom, GetRoom, GetUser, ListBuildings, ListRoomsbyBuilding, ListTyperooms } from "../services/HttpClientService";
import { RoomsInterface } from "../models/IRoom";
import { TyperoomsInterface } from "../models/ITyperoom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RoomDelete(){
    const [room, setRoom] = React.useState<RoomsInterface>({
      Detail:"", Note: "",
      Time: new Date(),});

    const [user, setUser] = useState<UsersInterface>({});    

    const [typeroom, setTyperooms] = React.useState<TyperoomsInterface[]>([]);

    const [building, setBuildings] = React.useState<BuildingsInterface[]>([]); 

    const [roomID, setRoomID] = useState("");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorSearch_r, setErrorSearch_r] = useState(false);
    const [errorMessage_r, setErrorMessage_r] = useState("");
    const [errorSearch, setErrorSearch] = useState(false);

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

      async function search_r(){
        if (roomID === ""){
          setErrorSearch_r(true);
          setErrorMessage_r("กรุณากรอกเลขห้อง");
          return
        }
        let res = await GetRoom(roomID);
        if (res.status){
          setRoom(res.data);
          //setBooking(res.data);
          handleClose()
          setErrorMessage("");
        } else {
          setErrorSearch(true);
          setErrorMessage(res.data);
        }
      }  
    

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
      console.log(res);
      if (res) {
          setSuccess(true);
          setErrorMessage("");

          setRoom({
            Note: "",
            Time: new Date(),
          })
      } else {
          setError(true);
          setErrorMessage(res);
      }

    }

    useEffect(() => {
        listTyperooms();
        listBuildings();
        getUser();
    }, []);


    <Grid item xs={6} >
          <p>ชื่อตึก</p>
          <FormControl required fullWidth >
            <InputLabel id="BuildingID">กรุณาเลือกตึก</InputLabel>
            <Select
              labelId="BuildingID"
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


return (  
    <div>
<Container maxWidth="md">
    <Snackbar
       id="success" 
       open={success}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         ลบข้อมูลสำเร็จ
       </Alert>
     </Snackbar>

     <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
       ลบข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>

     

     <Box sx={{ paddingX: 2, paddingY: 1 }}>
                     <Typography
                         component="h2"
                         variant="h6"
                         color="primary"
                         gutterBottom
                     >
                         Delete Building
                     </Typography>
                 </Box>
      <Grid container spacing={1} sx={{ padding: 1 }}>

      <Grid item xs={6} >
          <p>ชื่อตึก</p>
          <FormControl required fullWidth >
            <InputLabel id="BuildingID">กรุณาเลือกตึก</InputLabel>
            <Select
              labelId="BuildingID"
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

    <Grid item xs={3}>          
      <FormControl fullWidth variant="outlined">
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' },
        }}
       noValidate
       autoComplete="off"
        >
        <TextField id="outlined-basic" 
        label="Room ID" 
        variant="outlined" 
        type="string" 
        size="medium" 
        placeholder="Room ID"
        value={roomID}
          onChange={(e) => {setRoomID(e.target.value)              
            console.log(roomID)
            }
          }
        /> 
        <TextField id="outlined-basic" 
        label="TyperoomID " 
        variant="outlined"
        disabled  
        type="string" 
        size="medium" 
        placeholder="TyperoomID"
        value={room.Typeroom?.Detail +""}
                  
        />   
                             
          </Box>
      </FormControl>
    </Grid>
    <Grid item xs={5}>
      <Button
         style={{ float: "right" }}
         size="large"
         onClick= {() => {
          search_r();
          }}
         variant="contained"
         color="primary"
      >
        Search
      </Button>
    </Grid>
    <Grid container spacing={1} sx={{ padding: 1 }}>
      
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
        <p>เวลาที่เพิ่มเข้า</p>
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
        </Grid>
      </Grid>         
      </Container>
    </div>
  
  );
     
}

export default RoomDelete;




