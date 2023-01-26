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
import { ApprovesInterface } from "../models/IApprove";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { 
    CreateApprove, 
    ListStatusBooks, 
    GetUser,
    GetBookingbyCodeThatNotApprove,
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StatusBooksInterface } from "../models/IStatusBook";
import MenuItem from "@mui/material/MenuItem";
import { BookingsInterface } from "../models/IBooking";
import { UsersInterface } from "../models/IUser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function ApproveCreate() {
  const [user, setUser] = useState<UsersInterface>({});
  const [approve, setApprove] = useState<ApprovesInterface>({
    Code: "", Note: "",
    ApproveTime: new Date(),
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [statusBooks, setStatusBooks] = useState<StatusBooksInterface[]>([]);
  const [booking, setBooking] = useState<BookingsInterface>({
    Objective: {Detail: ""},
    User: {FirstName: "", LastName: "",},
    Room: {Detail: "", Building:{Detail: "",}}
  });
  const [code, setCode] = useState("")

  const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
  ) => {
      if (reason === "clickaway") {
          return;
      }
      setSuccess(false);
      setError(false);
      setErrorSearch(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof approve;
    const value = event.target.value;
    setApprove({
      ...approve,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };

  const handleChange_Text = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof approve;
    const { value } = event.target;
    setApprove({ ...approve, [id]: value, });
    console.log(`[${id}]: ${value}`);
  }; 

  const listStatusBooks = async () => {
    let res = await ListStatusBooks();
    if (res) {
      setStatusBooks(res);
      console.log("Load StatusBooks Complete");
    }
    else{
      console.log("Load StatusBooks InComplete!!!!");
    }
  };

  const getUser = async () => {
    const uid = localStorage.getItem("userID")
    let res = await GetUser(uid);
    if (res.status) {
      setUser(res.data);
      console.log("Load User Complete");  
    }
    else{
      console.log("Load User InComplete!!!!");
    }
  };

  async function submit() {
      let data = {
        Code: approve.Code,
        Note: approve.Note,
        ApproveTime: approve.ApproveTime,

        UserID: (user.ID),
        BookingID: (approve.BookingID),
        StatusBookID: (approve.StatusBookID),
      };
      console.log(data)
      let res = await CreateApprove(data);
      if (res.status) {
        setSuccess(true);
        setErrorMessage("");
        setBooking({
          Objective: {Detail: ""},
          User: {FirstName: "", LastName: "",},
          Room: {Detail: "", Building:{Detail: "",}}
        })
    } else {
        setError(true);
        setErrorMessage(res.data);
    }
  }

  async function search(){
    if (code === ""){
      setErrorSearch(true);
      setErrorMessage("กรุณากรอกรหัสการจองห้องที่จะค้นหา");
      return
    }
    let res = await GetBookingbyCodeThatNotApprove(code);
    if (res.status){
      setApprove({
        ...approve,
        ["BookingID"]: res.data.ID,
      });
      setBooking(res.data);
      handleClose()
      setErrorMessage("");
    } else {
      setErrorSearch(true);
      setErrorMessage(res.data);
    }
  }

  useEffect(() => {
    listStatusBooks();
    getUser();
  }, []);

  function randomNumberInRange() {
    const min = 10000, max = 99999;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setApprove({ ...approve, ["Code"]: `Ap${random}`, });
  }

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
         บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>

     <Snackbar open={errorSearch} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         ค้นหาข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>

     <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 2 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
            >
              บันทึกอนุมัติการจองใช้ห้อง
            </Typography>
          </Box>
       </Box>

       <Divider />
        <Grid container spacing={1} sx={{ padding: 2 }}>
          <Grid item xs={12}>รหัสการอนุมัติ</Grid>
          <Grid item xs={10} >
            <FormControl fullWidth variant="outlined">
              <TextField
                required
                id="Code"
                type="string"
                label="รหัสการอนุมัติ (Ap ตามด้วยตัวเลข5ตัว)"
                inputProps={{
                  name: "Code",
                }}
                value={approve.Code + ""}
                onChange={handleChange_Text}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2} justifyContent="center">
            <Button
                style={{ float: "right" }}
                size="medium"
                onClick= {randomNumberInRange}
                variant="contained"
                color="primary"
            >
                Random
            </Button>
          </Grid>
          <Grid item xs={6} ><p>กรุณาเลือกสถานะการจองใช้ห้อง</p></Grid>
          <Grid item xs={6} ><p>รหัสการจองใช้ห้อง</p></Grid>
          <Grid item xs={6} >
            <FormControl required fullWidth> 
              <InputLabel id="StatusBookID">กรุณาเลือกสถานะการจองใช้ห้อง</InputLabel>
              <Select
                labelId="StatusBookID"
                label="กรุณาเลือกสถานะการจองใช้ห้อง *"
                onChange={handleChange}
                inputProps={{
                  name: "StatusBookID",
                }}
              >
                {statusBooks?.map((item: StatusBooksInterface) => 
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

          <Grid item xs={4} >
            <FormControl fullWidth variant="outlined">
              <TextField
                required
                id="Code"
                type="string"
                label="กรุณาเลือกรหัสการจองใช้ห้อง"
                inputProps={{
                  name: "Code",
                }}
                value={code + ""}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2} justifyContent="center">
            <Button
                style={{ float: "right" }}
                size="medium"
                onClick= {search}
                variant="contained"
                color="primary"
            >
                Search
            </Button>
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
                value={approve.Note + ""}
                onChange={handleChange_Text}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>เวลาที่อนุมัติ</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="กรอกเวลาที่อนุมัติ"
                value={approve.ApproveTime}
                onChange={(newValue) => {
                  setApprove({
                    ...approve,
                    ApproveTime: newValue,
                  });
                }}
                ampm={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> 
          </Grid>
          
          <Grid item xs={6} >
            <FormControl fullWidth variant="outlined">
              <p>ชื่อผู้จองใช้ห้อง</p>
              <TextField
                label="ชื่อ"
                type="string"
                disabled
                variant="filled"
                value={booking.User?.FirstName + " " + booking.User?.LastName}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6} >
            <FormControl fullWidth variant="outlined">
              <p>วัตถุประสงค์ในการจอง</p>
              <TextField
                label="วัตถุประสงค์ในการจอง"
                type="string"
                disabled
                variant="filled"
                value={booking.Objective?.Detail + "" }
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} >
            <FormControl fullWidth variant="outlined">
              <p>ตึก</p>
              <TextField
                label="ชื่อตึก"
                type="string"
                disabled
                variant="filled"
                value={booking.Room?.Building?.Detail + ""}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} >
            <FormControl fullWidth variant="outlined">
              <p>ห้อง</p>
              <TextField
                label="ชื่อห้อง"
                type="string"
                disabled
                variant="filled"
                value={booking.Room?.Detail + ""}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>เวลาที่อนุมัติ</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="เวลาวันที่เริ่มต้นการจอง"
                value={booking.Date_Start}
                disabled
                onChange={(newValue) => {
                  setBooking({
                    ...booking,
                    Date_Start: newValue,
                  });
                }}
                ampm={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> 
          </Grid>

          <Grid item xs={6}>
            <p>เวลาที่อนุมัติ</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="เวลาวันที่สิ้นสุดการจอง"
                disabled
                value={booking.Date_End}
                onChange={(newValue) => {
                  setBooking({
                    ...booking,
                    Date_End: newValue,
                  });
                }}
                ampm={true}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> 
          </Grid>

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


export default ApproveCreate;
