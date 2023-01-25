import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { FormControl, Grid, InputLabel, MenuItem, Paper } from "@mui/material";
import { BookingsInterface } from "../models/IBooking";
import { 
  GetRoom,
  ListBookingbyRoom, ListBuildings, ListRoomsbyBuilding, 
} from "../services/HttpClientService";
import moment from "moment";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { BuildingsInterface } from "../models/IBuilding";
import { RoomsInterface } from "../models/IRoom";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ScheduleInterface{
  title: string,
  startDate: Date,
  endDate: Date,
  notes: string;
}


function Bookings() {
  const [data, setData] = useState<ScheduleInterface[]>([]);
  const [buildings, setBuildings] = useState<BuildingsInterface[]>([]);
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [roomOne, setRoomOne] = useState<RoomsInterface>({});
  const [currentDate, setCurrentDate] = useState(new Date());


  const currentDateChange = (currentDate: Date) => {
      setCurrentDate(currentDate);
  }

  const ListBooking = async () => {
    let res = await ListBookingbyRoom(roomOne.Detail);
    if (res) {
      console.log("Load Booking Complete" + ` ห้อง: ${roomOne.Detail}`);
      schedule(res)
    }
    else{
      console.log("Load Booking InComplete");
    }
  };

  const onChangeBuilding = async (e: SelectChangeEvent) =>{
    const bid = e.target.value;
    let res = await ListRoomsbyBuilding(bid);
    if (res) {
      setRooms(res);
      console.log("Load Rooms Complete");
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
      console.log("Load Room Complete");
    }
    else{
      console.log("Load Room Incomplete!!!");
    }
    
  } 

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

  useEffect(() => {
    setCurrentDate(new Date()); 
    listBuildings();  
    ListBooking(); 
  }, []);

  function schedule(book: BookingsInterface[]){
    setData([]); // clear data
    book.map((item) => {
      const notes = `รหัสการจอง: ${item.Code+""}\n` +
                    `จุดประสงค์ในการจอง: ${item.Objective?.Detail+""}`
      const x = {
        title: item.Room?.Detail +"",
        startDate: (moment(item.Date_Start, "YYYY-MM-DDTHH:mm:ssZ").toDate()) ,
        endDate: (moment(item.Date_End, "YYYY-MM-DDTHH:mm:ssZ").toDate()) ,
        notes:  notes,
      };
      setData((data) => [...data, x]) // push data
    });
    console.log("datas");
    
    console.log(data);
    
  }
  
 return (
<div>
  <Container maxWidth="lg">
    <Paper>
    <Grid container spacing={1} sx={{ padding: 2 }}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
                style={{ float: "right" }}
                size="medium"
                onClick= {ListBooking}
                variant="contained"
                color="primary"
            >
                Search
            </Button>
        </Grid>
      </Grid>
      </Paper>
      </Grid>

      <Grid item xs={12}>
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
        </Scheduler>
      </Paper>
      </Grid>
    </Grid>
    </Paper>
  </Container>
</div>
);

}


export default Bookings;