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
  UpdateApprove, 
  ListStatusBooks, 
  GetUser,
  GetBookingbyCode,
  ListApproves,
  GetApprove,
  GetStatusBook,
} from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StatusBooksInterface } from "../models/IStatusBook";
import MenuItem from "@mui/material/MenuItem";
import { BookingsInterface } from "../models/IBooking";
import { UsersInterface } from "../models/IUser";
import { log } from "console";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function ApproveUpdate() {
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
  const [statusBook, setStatusBook] = useState<StatusBooksInterface>({});
  const [approves, setApproves] = useState<ApprovesInterface[]>([]);
  const [booking, setBooking] = useState<BookingsInterface>({
    Objective: {Detail: ""},
    User: {FirstName: "", LastName: "",},
    Room: {Detail: "", Building:{Detail: "",}}
  });

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

  const onChangeApprove = async (e: SelectChangeEvent) =>{
    const appid = e.target.value;
    let res = await GetApprove(appid);
    if (res) {
      let data = {
        ID: res.ID,
        Code: res.Code,
        Note: res.Note,
        ApproveTime: new Date(),
  
        UserID: (user.ID),
        BookingID: (res.BookingID),
        StatusBookID: (res.StatusBookID),
      };
      setApprove(data);
      search(res.Booking?.Code);
      getStatusBook(data.StatusBookID);
    } else{
      console.log("Load Approve InComplete");
    }
  }

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
    }
    else{
      console.log("Load User InComplete!!!!");
    }
  };

  const getStatusBook = async (id:any) => {
    let res = await GetStatusBook(id);
    if (res) {
      setStatusBook(res);
      console.log(res);
      
    }
    else{
      console.log("Load Status Book InComplete!!!!");
    }
  };

  const listApprove = async () => {
    let res = await ListApproves();
    if (res) {
      setApproves(res); 
    }
    else{
      console.log("Load Approves InComplete!!!!");
    }
  };

  async function submit() {
    let data = {
      ID: approve.ID,
      Code: approve.Code,
      Note: approve.Note,
      ApproveTime: approve.ApproveTime,

      User: user,
      UserID: user.ID,
      Booking: booking,
      BookingID: booking.ID,
      StatusBook: statusBook,
      StatusBookID: approve.StatusBookID,
    };
    console.log(data)
    let res = await UpdateApprove(data);
    if (res.status) {
      setSuccess(true);
      setErrorMessage("");
      setStatusBook({});
      setBooking({
        Objective: {Detail: ""},
        User: {FirstName: "", LastName: "",},
        Room: {Detail: "", Building:{Detail: "",}}
      })
      setApprove({
        Code: "", Note: "",
        ApproveTime: new Date(),
      })
    } else {
      setError(true);
      setErrorMessage(res.data);
    }
  }

  async function search(code : any){
    let res = await GetBookingbyCode(code);
    if (res){
      setBooking(res);      
    } else {
      console.log("Load Booking InComplete!!!");
    }   
  }

  useEffect(() => {
    listStatusBooks();
    getUser();
    listApprove();
  }, []);

 return (
   <Container maxWidth="lg">
     <Snackbar
       id="success" 
       open={success}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
          อัพเดทข้อมูลสำเร็จ
       </Alert>
     </Snackbar>

     <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
          อัพเดทข้อมูลไม่สำเร็จ: {errorMessage}
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
              อัพเดทอนุมัติการจองใช้ห้อง
            </Typography>
          </Box>
       </Box>

       <Divider />
        <Grid container spacing={1} sx={{ padding: 2 }}>
          <Grid item xs={12}>รหัสการอนุมัติ</Grid>
          <Grid item xs={12} >
            <FormControl required fullWidth> 
              <InputLabel id="menu-ApproveID">กรุณาเลือกรหัสการอนุมัติ</InputLabel>
              <Select
                id="ApproveID"
                value={statusBook.ID || ""}
                label="กรุณาเลือกรหัสการอนุมัติ *"
                onChange={onChangeApprove}
                inputProps={{
                  name: "ID",
                }}
              >
                {approves?.map((item: ApprovesInterface) => 
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Code}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} ><p>กรุณาเลือกสถานะการจองใช้ห้อง</p></Grid>
          <Grid item xs={6} ><p>รหัสการจองใช้ห้อง</p></Grid>
          <Grid item xs={6} >
            <FormControl required fullWidth> 
              <InputLabel id="menu-StatusBookID">กรุณาเลือกสถานะการจองใช้ห้อง</InputLabel>
              <Select
                id="StatusBookID"
                value={approve.StatusBookID || ""}
                label="กรุณาเลือกสถานะการจองใช้ห้อง *"
                onChange={(e: SelectChangeEvent) => {
                  handleChange(e);
                  getStatusBook(e.target.value);
                }}
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

          <Grid item xs={6} >
            <FormControl required fullWidth >
              <TextField 
                value={booking.Code}
                disabled
              />
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


export default ApproveUpdate;
