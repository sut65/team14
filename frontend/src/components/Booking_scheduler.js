import * as React from 'react';
import Paper from '@mui/material/Paper';
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


const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2023, 0, 7, 9, 30),
    endDate: new Date(2023, 0, 7, 11, 30),
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2023, 0, 23, 12, 0),
    endDate: new Date(2023, 0, 23, 13, 0),
  },
]

export class BookingScheduler extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2023-01-07',
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
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


