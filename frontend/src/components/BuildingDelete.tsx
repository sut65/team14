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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { UsersInterface } from "../models/IUser";
import { BuildingsInterface } from "../models/IBuilding";
import { GuardsInterface } from "../models/IGuard";
import { CompaniesInterface } from "../models/ICompany";
import { InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { CreateBuilding, DeleteBuilding, GetBuilding, GetUser, ListCompanies, ListGuards } from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BuildingDelete(){
    const [building, setBuilding] = React.useState<BuildingsInterface>({
      Detail:"", Note: "",
    Time: new Date(),});
    const [user, setUser] = useState<UsersInterface>({});    

    const [guards, setGuards] = React.useState<GuardsInterface[]>([]);

    const [companies, setCompanies] = React.useState<CompaniesInterface[]>([]); 

    const [buildingID, setBuildingID] = useState("");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorSearch_b, setErrorSearch_b] = useState(false);
    const [errorMessage_b, setErrorMessage_b] = useState("");
    const [errorSearch, setErrorSearch] = useState(false);

    const handleChange_Text = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof building;
        const { value } = event.target;
        setBuilding({ ...building, [id]: value, });
        console.log(`[${id}]: ${value}`);
      };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") 
        {
            return;
        }
        setSuccess(false);
        setError(false);
    };  

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof building;
        const value = event.target.value;
        setBuilding({
          ...building,
          [name]: value,
        });
        console.log(`[${name}]: ${value}`);
      };


      const getBuilding = async () => {
        const uid = localStorage.getItem("userID")
        let res = await GetBuilding(uid);
        if (res.status) {
          setBuilding(res.data);
          console.log("Load Building Complete");
          console.log(`UserName: ${res.data.FirstName} + ${res.data.LastName}`);    
        }
        else{
          console.log("Load Building InComplete!!!!");
        }
      };

      const listGuards = async () => {
        let res = await ListGuards();
        if (res) {
            setGuards(res);
            console.log("Load Guards Complete");
        }
        else{
          console.log("Load Guards InComplete!!!!");
        }
      };

      const listCompanies = async () => {
        let res = await ListCompanies();
        if (res) {
          setCompanies(res);
          console.log("Load Company Complete");
        }
        else{
          console.log("Load Company InComplete!!!!");
        }
      };

      async function search_b(){
        if (buildingID === ""){
          setErrorSearch_b(true);
          setErrorMessage_b("กรุณากรอกชื่อตึก");
          return
        }
        let res = await GetBuilding(buildingID);
        if (res.status){
          setBuilding(res.data);
          //setBooking(res.data);
          handleClose()
          setErrorMessage("");
        } else {
          setErrorSearch(true);
          setErrorMessage(res.data);
        }
      }  
    

      async function submit() {
        let data = {
            
            Detail: building.Detail,

            AdminID: (user.ID),
            GuardID: (building.GuardID),
            CompanyID: (building.CompanyID),  
            Note: building.Note,
            Time: building.Time,
        };
        console.log(data);
        
        let res = await DeleteBuilding(data);
        console.log(res);
        if (res) {
            setSuccess(true);
            setErrorMessage("");

            setBuilding({
              Note: "",
              Time: new Date(),
            })
        } else {
            setError(true);
            setErrorMessage(res);
        }

    }

    useEffect(() => {
        
        getBuilding();
    }, []);


      return (  
    <div>
<Container maxWidth="md">
    <Snackbar
       id="success" 
       open={success}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         ลบข้อมูลสำเร็จ
       </Alert>
     </Snackbar>

     <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
       ลบข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>

     

        <p>ระบบจัดการเพิ่มเพื่อนเข้าห้อง</p>     
      <Grid container spacing={1} sx={{ padding: 1 }}>
    <Grid item xs={3}>          
      <FormControl fullWidth variant="outlined">
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' },
        }}
       noValidate
       autoComplete="off"
        >
        <TextField id="outlined-basic" 
        label="Building ID" 
        variant="outlined" 
        type="string" 
        size="medium" 
        placeholder="Building ID"
        value={buildingID}
          onChange={(e) => {setBuildingID(e.target.value)              
            console.log(buildingID)
            }
          }
        /> 
        <TextField id="outlined-basic" 
        label="GuardID " 
        variant="outlined"
        disabled  
        type="string" 
        size="medium" 
        placeholder="GuardID"
        value={building.Guard?.Detail +""}
                  
        />   
         <TextField id="outlined-basic" 
        label="Company"
        disabled 
        variant="outlined" 
        type="string" 
        size="medium"            
        placeholder="Company"
        value={building.Company?.Detail +""}           
        />          
          </Box>
      </FormControl>
    </Grid>
    <Grid item xs={5}>
      <Button
         style={{ float: "right" }}
         size="large"
         onClick= {() => {
          search_b();
          }}
         variant="contained"
         color="primary"
      >
        Search
      </Button>
    </Grid>
    <Grid container spacing={1} sx={{ padding: 1 }}>
      
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
            value={building.Note + ""}
            onChange={handleChange_Text}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <p>เวลาที่เพิ่มเข้า</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="กรอกเวลาที่อนุมัติ"
            value={building.Time}
            onChange={(newValue) => {
              setBuilding({
                ...building,
                Time: newValue,
              });
            }}
            ampm={true}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> 
      </Grid>
          <Grid item xs={1}>
           <Stack direction="row" spacing={2}>
            <Button component={RouterLink}
                    to="/buildings"
                    variant="outlined">Back</Button>      
           </Stack>
         </Grid>
         <Grid item xs={7}>           
            <Button                  
                    variant="contained" color="success" size="large" style={{ float: "right" }}                    
                    onClick= {() => {
                     submit();
                     }} 
                     >Submit</Button>      
           
         </Grid>   
        </Grid>
      </Grid>         
      </Container>
    </div>
  
  );
}

export default BuildingDelete;