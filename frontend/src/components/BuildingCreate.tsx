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
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { GetUser, ListCompanies, ListGuards } from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BuildingCreate(){
    const [building, setBuilding] = React.useState<BuildingsInterface>({});
    const [user, setUser] = useState<UsersInterface>({});    

    const [guards, setGuards] = React.useState<GuardsInterface[]>([]);

    const [companies, setCompanies] = React.useState<CompaniesInterface[]>([]); 

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

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


      const getUser = async () => {
        const uid = localStorage.getItem("userID")
        let res = await GetUser(uid);
        if (res) {
          setUser(res);
          console.log("Load User Complete");
          console.log(`UserName: ${res.FirstName} + ${res.LastName}`);    
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

            AdminID: (building.User),
            GuardID: (building.GuardID),
            CompanyID: (building.CompanyID),  
        };
        console.log(data)

    }

    useEffect(() => {
        listGuards();
        listCompanies();
        getUser();
    }, []);

    function onChangedevice(e: SelectChangeEvent<string>) {
        throw new Error("Function not implemented.");
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
              บันทึกข้อมูลไม่สำเร็จ
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
                         Create Building
                     </Typography>
                 </Box>
            </Box>
     

            <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>ชื่อตึก</p>
                      <TextField
                        value={building.Detail+""}  
                        InputProps={{
                          readOnly: true,
                        }}
                        onChange={handleChange_Text}
                      />
                    </FormControl>
                  </Grid> 
                </Grid>               
                
    
                <Grid item xs={6} >
          <p>ชื่อผู้รักษาความปลอดภัย</p>
          <FormControl required fullWidth >
            <InputLabel id="GuardID">กรุณาเลือกผู้รักษาความปลอดภัย</InputLabel>
            <Select
              labelId="GuardID"
              label="กรุณาเลือกผู้รักษาความปลอดภัย *"
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
              labelId="CompanyID"
              label="กรุณาเลือกบริษัท *"
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

export default BuildingCreate;

function ListDevice(did: any) {
  throw new Error("Function not implemented.");
}
