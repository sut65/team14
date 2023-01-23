import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import { Alert, Button, Container, FormControl, Grid, Paper, Snackbar, TextField } from "@mui/material";
import { Add_friendInterface } from "../models/IAdd_friend";
import { ApprovesInterface } from "../models/IApprove";
import { ListApproves } from "../services/HttpClientService";
import Approves from "./Approve";
function Add_friendCreate(){
    //const [add_friends, setAdd_friends] = React.useState<Add_friendInterface[]>([]);
    const [approves, setApproves] = React.useState<ApprovesInterface[]>([]);
    const [approveID, setApproveID] = React.useState(localStorage.getItem('approveID') + "");
    const [key, setKey] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const ListApproves = async () => {
        let res = await ListApproves();
        if (res != null) {
            setApproves(res);
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
    async function search() {
        localStorage.setItem('ApproveID', approveID);
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
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
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
              search();
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
            placeholder="Booking ID"
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
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
            placeholder="Booking ID"
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
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
            placeholder="Booking ID"
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
                localStorage.setItem('approveID', e.target.value);
                console.log(localStorage.getItem('approveID'))                
                console.log()
                }
              }
            />  
            <TextField id="outlined-basic" 
            label="Building" 
            variant="outlined" 
            type="string" 
            size="medium" 
            placeholder="Booking ID"
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
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
            placeholder="Booking ID"
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
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
            value={approveID + ""}
              onChange={(e) => {setApproveID(e.target.value)
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
        <Grid item xs={0}>
          <Button
             style={{ float: "right" }}
             size="large"
             onClick= {() => {
              search();
              }}
             variant="contained"
             color="primary"
          >
            Search
          </Button>
        </Grid>
      </Container>
    </div>
  
  );
}
export default Add_friendCreate;