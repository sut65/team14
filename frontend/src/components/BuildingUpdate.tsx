import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CreateBuilding, GetBuilding, GetUser, ListCompanies, ListGuards, UpdateBuilding } from "../services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { get } from "http";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BuildingUpdate(){
    const {id} = useParams<{ id : string | undefined}>();
    const [building, setBuilding] = React.useState<BuildingsInterface>({
      Detail:"", Note: "",
    Time: new Date(),});
    const [user, setUser] = useState<UsersInterface>({});    

    const [guards, setGuards] = React.useState<GuardsInterface[]>([]);

    const [companies, setCompanies] = React.useState<CompaniesInterface[]>([]); 

    const [buildings, setBuildings] = React.useState<BuildingsInterface[]>([]);

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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


      const getBuilding = async (id : any) => {
        let res = await GetBuilding(id);
        if (res) {
          setBuilding(res.data);
          console.log("Load Building Complete"); 
          console.log (res);
        }
        else{
          console.log("Load Building InComplete!!!!");
        }
      };


      const getUser = async () => {
        const uid = localStorage.getItem("userID")
        let res = await GetUser(uid);
        if (res.status) {
          setUser(res.data);
          console.log("Load User Complete");
          console.log(`UserName: ${res.data.FirstName} + ${res.data.LastName}`);    
        }
        else{
          console.log("Load User InComplete!!!!");
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

      async function submit() {
        let data = {
            
          ID: building.ID,
            Detail: building.Detail,

            AdminID: (user.ID),
            GuardID: (building.GuardID),
            CompanyID: (building.CompanyID),  
            Note: building.Note,
            Time: building.Time,
        };
        console.log(data);
        
        let res = await UpdateBuilding(data);
        console.log(res);
        if (res.status) {
            setSuccess(true);
            setErrorMessage("");

        } else {
            setError(true);
            setErrorMessage(res.data);
        }

    }

    useEffect(() => {
        listGuards();
        listCompanies();
        getUser();
        getBuilding(id);
    }, []);


    

      return (
        <Container maxWidth="md">
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
     
          <Paper>
             <Box
                 display="flex"
                 sx={{
                 marginTop: 2,
                 }}
             >
                 <Box sx={{ paddingX: 2, paddingY: 1 }}>
                     <Typography
                         component="h2"
                         variant="h6"
                         color="primary"
                         gutterBottom
                     >
                         Update Building
                     </Typography>
                 </Box>
            </Box>
     

            <Grid item xs={12} >
            <FormControl fullWidth variant="outlined">
              <p>ชื่อตึก</p>
              <TextField
                required
                id="Detail"
                type="string"
                label="กรุณาเลขห้อง"
                inputProps={{
                  name: "Detail",
                }}
                value={building.Detail + ""}
                onChange={handleChange_Text}
              />
            </FormControl>
          </Grid>             
                
    
                <Grid item xs={6} >
          <p>ชื่อผู้รักษาความปลอดภัย</p>
          <FormControl required fullWidth >
            <InputLabel id="GuardID">กรุณาเลือกผู้รักษาความปลอดภัย</InputLabel>
            <Select
              id="GuardID"
              label="กรุณาเลือกผู้รักษาความปลอดภัย *"
              value={building.GuardID+""}
              onChange={ (handleChange) }
              inputProps={{
                name: "GuardID",
              }}
            >
              {guards.map((item: GuardsInterface) => (
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
          <p>ชื่อบริษัทรับเหมา</p>
          <FormControl required fullWidth >
            <InputLabel id="GuardID">กรุณาเลือกบริษัท</InputLabel>
            <Select
              id="CompanyID"
              label="กรุณาเลือกบริษัท *"
              value={building.CompanyID+""}
              onChange={ (handleChange) }
              inputProps={{
                name: "CompanyID",
              }}
            >
              {companies.map((item: CompaniesInterface) => (
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
            <p>เวลาที่อนุมัติ</p>
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

              
     
               <Grid item xs={12}>
                <Button component={RouterLink} to="/buildings" variant="contained">
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
              
          </Paper>
        </Container>
     
      );

     
}

export default BuildingUpdate;



