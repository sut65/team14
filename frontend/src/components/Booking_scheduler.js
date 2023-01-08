import React, { useEffect, fetchData } from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from "moment";
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
import { Alert, Button, Container, FormControl, Grid, Paper, Snackbar, TextField } from "@mui/material";

const now = moment().format('YYYY-MM-DD');
let appointments = [
  {
    title: 'B4101',
    startDate: moment("2023-01-08T09:00:00.000Z").utc().format('YYYY-MM-DDTHH:mm'),
    endDate:   moment("2023-01-08T10:00:00.0182752Z").utc().format('YYYY-MM-DDTHH:mm'),
    Note: "เพื่อนอน",
  }
]
appointments = JSON.parse(localStorage.getItem("schedule"));
export class BookingScheduler extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: JSON.parse(localStorage.getItem("schedule")),
      currentDate: now,
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  render() {
    const { data, currentDate } = this.state;
    return (
      <Paper>
        <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              const x = JSON.parse(localStorage.getItem("schedule"));
              console.log(x);
              this.setState({data: x})
            }}
             variant="contained"
             color="primary"
          >
            Reload
          </Button>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
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
    );
  }
}


