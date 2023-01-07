import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { BookingsInterface } from "../models/IBooking";
import { 
  ListBookingbyRoom, ListBookings, 
} from "../services/HttpClientService";
import moment from "moment";

function Seach() {
  const [bookings, setBookings] = React.useState<BookingsInterface[]>([]);

  const ListBooking = async () => {
    let res = await ListBookings();
    if (res) {
      setBookings(res);
      console.log("Load Booking Complete");
    }
    else{
      console.log("Load Booking InComplete!!!!");
    }
  };
  
  useEffect(() => {
    ListBooking();
  }, []);

  // console.log(bookings);

 return (
  <div>
                    <h3>Test</h3>
                    <ul>
                        {bookings.map((item, index) => {
                          const Date_Start = moment((String(item.Date_Start).split("+"))[0]+"Z").utc().format('YYYY-MM-DDTHH:mm')
                            return <li>{Date_Start}</li>;
                        })}
                    </ul>
                </div>
 );
}

export default Seach;