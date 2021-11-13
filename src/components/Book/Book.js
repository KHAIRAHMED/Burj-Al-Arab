import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import 'date-fns';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Booking from "../Booking/Booking"

const Book = () => {
  const { bedType } = useParams();
  const [isLoggedIn, setLoggedIn] = useContext(userContext);
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });

  const handleCheckInDate = (date) => {
    const newDate = {...selectedDate};
    newDate.checkIn = date;
    setSelectedDate(newDate);
  };
  const handleCheckOutDate = (date) => {
    const newDate = {...selectedDate};
    newDate.checkOut = date;
    setSelectedDate(newDate);
  };

  const handleBooking = ()=>{
    const bookingData = {...selectedDate , ...isLoggedIn}
    console.log("clicked",bookingData)
    fetch("http://localhost:4000/addBooking",
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(bookingData)
  })
  .then(res => res.json())
  .then(result => {
    console.log(result);
  })
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        Mr. {isLoggedIn.name} ! Let's book a {bedType} Room.
      </h1>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date"
            value={selectedDate.checkIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="MM/dd/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button variant="contained" color="primary" onClick = {handleBooking}>
          Book Now
        </Button>
      </MuiPickersUtilsProvider>

      <Booking></Booking>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
    </div>
  );
};

export default Book;
