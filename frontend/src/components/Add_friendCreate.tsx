import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Alert, Button, Container, FormControl, Grid, Paper, Snackbar, TextField } from "@mui/material";
import { Add_friendInterface } from "../models/IAdd_friend";
import { ApprovesInterface } from "../models/IApprove";
import { UsersInterface } from "../models/IUser";
import { BookingsInterface } from "../models/IBooking";
import { BuildingsInterface } from "../models/IBuilding";
import { RoomsInterface } from "../models/IRoom";
import { ListApproves } from "../services/HttpClientService";
import Approves from "./Approve";
function Add_friendCreate(){
    //const [add_friends, setAdd_friends] = React.useState<Add_friendInterface[]>([]);
    const [approve, setApprove] = React.useState<ApprovesInterface>();    
    const [users, setUsers] = React.useState<UsersInterface[]>([]);
    const [bookings, setBookings] = React.useState<BookingsInterface[]>([]);
    const [building, setBuilding] = React.useState<BuildingsInterface>();  
    const [room, setRoom] = React.useState<RoomsInterface>();   
    const [bookingID, setBookingID] = React.useState(localStorage.getItem('bookingID') + "");
    const [userID, setUserID] = React.useState(localStorage.getItem('userID') + "");

    const [key, setKey] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const ListBookings = async () => {
        let res = await ListBookings();
        if (res != null) {
            setBookings(res);
        }
    }; 
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setSuccess(false);
      setError(false);
    };
    
    useEffect(() => {
      ListApproves();
    }, [key]);
    
  
    useEffect(() => {
        ListApproves();
      }, []);
    async function search_B() {
        localStorage.setItem('BookingID', bookingID);
        setKey(!key);
    }
    async function search_A() {
      localStorage.setItem('UserID', userID);
      setKey(!key);
  }
  async function Submit() {    
    setKey(!key);
}

  return (  
    <div>
      <Container maxWidth="lg">
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
          <Alert onClose={handleClose} severity="success">
            ค้นหาสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ค้นหาไม่สำเร็จ
          </Alert>
        </Snackbar>
        <p>ระบบจัดการเพิ่มเพื่อนเข้าห้อง</p>
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={6}>          
          <FormControl fullWidth variant="outlined">
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="Approve ID" 
            variant="outlined" 
            type="string" 
            size="medium" 
            placeholder="Approve ID"
            value={bookingID + ""}
              onChange={(e) => {setBookingID(e.target.value)
                localStorage.setItem('bookingID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />            
              </Box>
          </FormControl>
        </Grid>
        <Grid item xs={0}>
          <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              search_B();
              }}
             variant="contained"
             color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={9}>          
          <FormControl fullWidth variant="outlined">
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="Booking ID" 
            variant="outlined" 
            type="string" 
            size="medium" 
            disabled
            placeholder="Booking ID"
            value={bookingID + ""}
              onChange={(e) => {setBookingID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            /> 
            <TextField id="outlined-basic" 
            label="Approve Satetus" 
            variant="outlined" 
            type="string" 
            size="medium"
            disabled 
            placeholder="Approve Satetus"
            value={approve + ""}
              //onChange={(e) => {setApprove(e.target.value)                               
                //console.log()
                //}
              //}
            />    
            <TextField id="outlined-basic" 
            label="User name" 
            variant="outlined" 
            type="string" 
            size="medium" 
            disabled
            placeholder="Booking ID"
            value={users + ""}
              /*onChange={(e) => {setUser(e.target.value)
                //localStorage.setItem('approveID', e.target.value);
                //console.log(localStorage.getItem('approveID'))                
                //console.log()
                }*/
              //}
            />  
            <TextField id="outlined-basic" 
            label="Building" 
            variant="outlined" 
            type="string" 
            size="medium" 
            disabled
            placeholder="Booking ID"
            value={bookingID + ""}
              onChange={(e) => {setBookingID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />    
            <TextField id="outlined-basic" 
            label="Room" 
            variant="outlined" 
            type="string" 
            size="medium" 
            disabled
            placeholder="Booking ID"
            value={bookingID + ""}
              onChange={(e) => {setBookingID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />              
              </Box>
          </FormControl>
        </Grid>        
      </Grid> 
      <hr></hr>     
      <p>ค้นหา USER</p>
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={6}>          
          <FormControl fullWidth variant="outlined">
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="User ID" 
            variant="outlined" 
            type="string" 
            size="medium" 
            placeholder="User ID"
            value={userID + ""}
              onChange={(e) => {setUserID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />            
              </Box>
          </FormControl>
        </Grid>
        <Grid item xs={0}>
          <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              search_A();
              }}
             variant="contained"
             color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: 1 }}>      
        <Grid item xs={6}>               
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' },
            }}
           noValidate
           autoComplete="off"
            >
            <TextField id="outlined-basic" 
            label="User ID" 
            variant="outlined" 
            type="string" 
            size="medium" 
            disabled
            placeholder="User ID"
            value={bookingID + ""}
              onChange={(e) => {setBookingID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />          
            <TextField id="outlined-basic" 
            label="User name" 
            variant="outlined" 
            type="string" 
            size="medium" 
            disabled  
            placeholder="User ID"
            value={bookingID + ""}
              onChange={(e) => {setBookingID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />    
                     
              </Box>         
          </Grid>
        </Grid>       
      </Container>
      <Grid container spacing={1} sx={{ padding: 1 }}>
        <Grid item xs={6}>
        <Stack direction="row" spacing={2}>
          <Button
             style={{}}
             size="large"             
             component={RouterLink}
             to="/add_friends" 
             variant="outlined"             
          >
            Back
          </Button> 
          </Stack>         
        </Grid>
        <Grid item xs={0}>
          <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              Submit();
              }}
             variant="contained"
             color="success"
          >
            Submit
          </Button>          
        </Grid>
      </Grid>
    </div>
  
  );
}
export default Add_friendCreate;