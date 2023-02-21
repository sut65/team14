import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper } from "@mui/material";
import { BookingsInterface } from "../models/IBooking";
import { 
  GetRoom,
  ListBookingbyRoom, ListBookingbyUser, ListBookings, ListBuildings, ListRoomsbyBuilding, 
} from "../services/HttpClientService";
import moment from "moment";
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  TodayButton,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { BuildingsInterface } from "../models/IBuilding";
import { RoomsInterface } from "../models/IRoom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AccessDenied from "./AccessDenied";

function Bookings() {
  const uid = localStorage.getItem("userID")
  const [data, setData] = useState<AppointmentModel[]>([]);
  const [buildings, setBuildings] = useState<BuildingsInterface[]>([]);
  const [allBookings, setAllBookings] = useState<BookingsInterface[]>([]);
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [roomOne, setRoomOne] = useState<RoomsInterface>({});
  const [currentDate, setCurrentDate] = useState(
    new Date(),
  );
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);
  const [checkedRoom, setCheckedRoom] = useState(false);
  const [key, setKey] = useState(false);

  

  const currentDateChange = (currentDate: Date) => {
      setCurrentDate(currentDate);
  }

  const listBookingRoom = async (id: any) => {
    let res = await ListBookingbyRoom(id);
      if (res) {
        schedule(res)
      }
      else {
        console.log(`Load BookingRoom: ${id} InComplete`);
      }
  }

  const listBookingAll = async () => {
    let res = await ListBookings();
    if (res) {
      setAllBookings(res)
      schedule(res)        
    }
    else{
      console.log("Load BookingAll InComplete");
    } 
  }

  const listUserBooking = async () => {
    let res = await ListBookingbyUser(uid);
    if (res.status) {
      schedule(res.data);
    }
    else {
      console.log("Load BookingUser InComplete!!!!");
    }
  }

  const listBookingOption = async () => {
    if (checkedAll){
      listBookingAll();
    } 
    else if(checkedUser){
      listUserBooking();
    } 
    else if(checkedRoom){
      listBookingRoom(roomOne.Detail);
    } 
    else{ 
      listBookingRoom(0);
    }
  };

  const onChangeBuilding = async (e: SelectChangeEvent) =>{
    const bid = e.target.value;
    let res = await ListRoomsbyBuilding(bid);
    if (res) {
      setRooms(res);
      setRoomOne({});
    }
    else{
      console.log("Load Rooms Incomplete!!!");
    }
    
  } 

  const onChangeRoom = async (e: SelectChangeEvent) =>{
    const rid = e.target.value;
    let res = await GetRoom(rid);
    if (res) {
      setRoomOne(res);
    }
    else{
      console.log("Load Room Incomplete!!!");
    }
    
  } 

  const listBuildings = async () => {
    let res = await ListBuildings();
    if (res) {
      setBuildings(res);
    }
    else{
      console.log("Load Buildings InComplete!!!!");
    }
  };


  useEffect(() => {
    listBuildings();  
    listBookingAll();
  }, []);

  useEffect(() => {
    listBookingOption(); 
  }, [key]);

  function schedule(book: BookingsInterface[]){
    setData([]); // clear data
    book.map((item) => {
      let status = "";
      let statusBookID = 0;
      if (item.DeletedAt === null){
        status = `${item?.Approve?.StatusBook?.Detail || "รอการอนุมัติ"}` ;
        statusBookID = parseInt(item?.Approve?.StatusBookID || "0");
      } else {
        status = `ถูกยกเลิก` ;
        statusBookID = 3;
      }
      
      const notes = `รหัสการจอง: ${item.Code+""}\n` +
                    `จุดประสงค์ในการจอง: ${item.Objective?.Detail+""}\n` +
                    `สถานะ: ${status}`
      const x = {
        title: item.Room?.Detail +"",
        startDate: (moment(item.Date_Start, "YYYY-MM-DDTHH:mm:ssZ").toDate()) ,
        endDate: (moment(item.Date_End, "YYYY-MM-DDTHH:mm:ssZ").toDate()) ,
        statusID: statusBookID,
        notes:  notes,
      };
      setData((data) => [...data, x]) // push data
    }); 
    
  }
  const resources = [{
    fieldName: 'statusID',
    title: 'สถานะ',
    instances: [      
      {
        text: 'รอการอนุมัติ', id: 0, color: '#ff9100', 
      }, 
      {
        text: 'ได้รับการอนุมัติ', id: 1, color: '#00e5ff',
      }, 
      {
        text: 'ไม่ได้รับการอนุมัติ', id: 2, color: '#ff5252',
      }, 
      {
        text: 'ถูกยกเลิก', id: 3, color: '#9400D3',
      }],
  }];


  const header = [ "ID", "Code", "ชื่อผู้จอง", "เวลาที่เริ่มจอง", "เวลาที่สิ้นสุดจอง", "ห้อง", "สถานะ"];
  const DisplayData=allBookings?.map(
    (info)=>{
      const dateStart = String(moment(info.Date_Start, "YYYY-MM-DDTHH:mm:ssZ").toDate());
      const dateEnd = String(moment(info.Date_End, "YYYY-MM-DDTHH:mm:ssZ").toDate());
      const name = `${info?.User?.FirstName} ${info?.User?.LastName}`
      let status = "";
      if (info?.DeletedAt === null){
        status = `${info?.Approve?.StatusBook?.Detail || "รอการอนุมัติ"}` ;
      } else {
        status = `ถูกยกเลิก` ;
      }
      
        return(
            <tr>
                <td>{info.ID}</td>
                <td>{info?.Code}</td>
                <td>{name}</td>
                <td>{dateStart}</td> 
                <td>{dateEnd}</td> 
                <td>{info?.Room?.Detail}</td>
                <td>{status}</td>          
            </tr>
        )
    }
  )

  //Check Role
  const roleLevel = localStorage.getItem('role')+""
  if (roleLevel !== "User") {
    return <AccessDenied />
  }
  
 return (
  <Container maxWidth="lg">
    {/* <Paper> */}
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12}> {/* ปุ่ม */}
      <Paper>
        <Grid container spacing={1} sx={{ padding: 2 }} >
          <Grid item xs={6}>
              <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
              >
                  แสดงการจองใช้ห้อง
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Button
                  component={RouterLink}
                  to="/booking/create"
                  variant="contained"
                  color="primary"
              >
                  Create Booking
              </Button>
          </Grid>
          <Grid item xs={2}>
              <Button
                  component={RouterLink}
                  to="/booking/update"
                  variant="contained"
                  color="primary"
              >
                  Update Booking
              </Button>
          </Grid>
          <Grid item xs={2}>
              <Button
                  component={RouterLink}
                  to="/booking/delete"
                  variant="contained"
                  color="primary"
              >
                  Delete Booking
              </Button>
          </Grid>
        </Grid>
      </Paper>
      </Grid>

      <Grid item xs={12}> {/* ค้นหา */}
      <Paper>
      <Grid container spacing={1} sx={{ padding: 2 }}  alignItems="center">
        <Grid item xs={6} >
          <p>ตึก</p>
          <FormControl required fullWidth >
            <InputLabel id="BuildingID">กรุณาเลือกตึก</InputLabel>
            <Select
              labelId="BuildingID"
              label="กรุณาเลือกตึก *"
              onChange={ (onChangeBuilding) }
              inputProps={{
                name: "BuildingID",
              }}
            >
              {buildings.map((item: BuildingsInterface) => (
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

        <Grid item xs={6} >
        <p>ห้อง</p>
        <FormControl required fullWidth> 
          <InputLabel id="RoomID">กรุณาเลือกห้อง</InputLabel>
          <Select
            labelId="RoomID"
            label="กรุณาเลือกห้อง *"
            onChange={onChangeRoom}
            inputProps={{
              name: "RoomID",
            }}
          >
            {rooms?.map((item: RoomsInterface) => 
              <MenuItem
                key={item.ID}
                value={item.ID}
              >
                {item.Detail}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        </Grid>

        <Grid item xs={6} justifyContent="center">
          <Button
              size="medium"
              onClick= {() => (setKey(!key))}
              variant="contained"
              color="primary"
          >
              Search
          </Button>
        </Grid>
        <Grid item xs={6} justifyContent="center">
          <FormControlLabel control={
            <Checkbox defaultChecked checked={checkedUser} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedUser(event.target.checked);
                  setCheckedAll(false);
                  setCheckedRoom(false);
                }} sx={{
                  color: '#3300FF',
                  '&.Mui-checked': {
                    color: '#3300FF',
                  },
                }}
            />
            } label="เฉพาะของฉัน" />
            <FormControlLabel control={
            <Checkbox defaultChecked checked={checkedAll} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedAll(event.target.checked);
                  setCheckedRoom(false);
                  setCheckedUser(false);
                }} sx={{
                  color: '#3300FF',
                  '&.Mui-checked': {
                    color: '#3300FF',
                  },
                }}
            />
            } label="แสดงทั้งหมด" />
            <FormControlLabel control={
            <Checkbox defaultChecked checked={checkedRoom} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedAll(false);
                  setCheckedRoom(event.target.checked);
                  setCheckedUser(false);
                }} sx={{
                  color: '#3300FF',
                  '&.Mui-checked': {
                    color: '#3300FF',
                  },
                }}
            />
            } label="แสดงเฉพาะห้อง" />
                
                
        </Grid>
      </Grid>
      </Paper>
      </Grid>

      <Grid item xs={12} >
      <Paper>
        <Scheduler 
            data={data}
            height={660}
        >
          <ViewState
              currentDate={currentDate}
              onCurrentDateChange={currentDateChange}
          />
          <WeekView
              startDayHour={9}
              endDayHour={19}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
              showCloseButton
              showOpenButton
          />
          <AppointmentForm
              readOnly
          />
          <Resources
            data={resources}
            mainResourceName="statusID"
          />
        </Scheduler>
      </Paper>
      </Grid>

      <Grid item xs={12}> {/* Data Table */}
      <style>
        {`
          table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          td, th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          tr:nth-child(even){background-color: #bebebe;}
          tr:nth-child(odd){background-color: #fff;}
          tr:hover {background-color: #ddd;}
          th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #666;
            color: white;
          }
        `}
      </style>
        <table>
          <thead>
              <tr>
                {header.map(head => <th>{head}</th>)}
              </tr>
          </thead>
          <tbody>
              {DisplayData}
          </tbody>
        </table>
      </Grid>
    </Grid>
    {/* </Paper> */}
    
  </Container>
);

}


export default Bookings;