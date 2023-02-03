import React from "react";
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
import { EducationLevelsInterface, GendersInterface, RolesInterface, UsersInterface } from "../models/IUser";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {ListGenders, ListRoles, ListEducationLevels,} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function UserCreate() {
    const [date, setDate] = React.useState<Date | null>(null);
    const [user, setUser] = React.useState<Partial<UsersInterface>>({});
    const [genders, setGenders] = React.useState<GendersInterface[]>([]);
    const [roles, setRoles] = React.useState<RolesInterface[]>([]);
    const [educationlevels, setEducationLevels] = React.useState<EducationLevelsInterface[]>([]);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof user;
      const value = event.target.value;
      setUser({
        ...user,
        [name]: value,
      });
      console.log(`[${name}]: ${value}`);
    };

    const handleInputChange = (

      event: React.ChangeEvent<{ id?: string; value: any }>

  ) => {
      const id = event.target.id as keyof typeof UserCreate;
      const { value } = event.target;
      setUser({ ...user, [id]: value });
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

    //ดึงข้อมูล Genders
    const listGenders = async () => {
      let res = await ListGenders();
      if (res) { setGenders(res); console.log("Load Gender Complete");}
      else{ console.log("Load Gender InComplete!!!!");}
    };

    //ดึงข้อมูล Roles
    const listRoles = async () => {
      let res = await ListRoles();
      if (res) { setRoles(res); console.log("Load Role Complete");}
      else{ console.log("Load Role InComplete!!!!");}
    };
    
    //ดึงข้อมูล EducationLevels
    const listEducationLevels = async () => {
      let res = await ListEducationLevels();
      if (res) { setEducationLevels(res); console.log("Load EducationLevel Complete");}
      else{ console.log("Load EducationLevel InComplete!!!!");}
    };

    React.useEffect(() => {
      listGenders();
      listRoles();
      listEducationLevels();
    }, []);

    
    function submit() {
        let data = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Phonenumber: user.PhoneNumber,
            IdentificationNumber: user.IdentificationNumber,
            StudentID: user.StudentID,
            Age: typeof user.Age === "string" ? parseInt(user.Age) : 0,
            Password: user.Password,
            BirthDay: date,
            
            EducationLevelID: convertType(user.EducationLevelID),
            RoleID: convertType(user.RoleID),
            GenderID: convertType(user.GenderID),
        };

        const apiUrl = "http://localhost:8080/users";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setSuccess(true);
            } else {
                setError(true);
            }
        });
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
                    Create User
                </Typography>
            </Box>
       </Box>

       <Divider />

       <Grid container spacing={3} sx={{ padding: 2 }}>
         <Grid item xs={6}>
           <p>First Name</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="FirstName"
               variant="outlined"
               type="string"
               size="medium"
               label="ชื่อ" 
               inputProps={{name: "FirstName",}}
               value={user.FirstName || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>Last Name</p>
             <TextField
               id="LastName"
               variant="outlined"
               type="string"
               size="medium"
               value={user.LastName || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>Email</p>
             <TextField
               id="Email"
               variant="outlined"
               type="string"
               size="medium"
               value={user.Email || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>Password</p>
             <TextField
               id="Password"
               variant="outlined"
               type="string"
               size="medium"
               value={user.Password || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <p>StudentID</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="StudentID"
               variant="outlined"
               type="string"
               size="medium"
               value={user.StudentID || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
             <p>Age</p>
             <TextField
               id="Age"
               variant="outlined"
               type="number"
               size="medium"
               InputProps={{ inputProps: { min: 1 } }}
               InputLabelProps={{ shrink: true,}}
               value={user.Age || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>Gender</p>
              <Select
                required
                defaultValue={"0"}
                onChange={handleChange}
                inputProps={{name: "GenderID",}}
              >
                <MenuItem value={"0"}>กรุณาเลือกเพศ</MenuItem>
                {genders?.map((item: GendersInterface) =>
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Name}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>


         <Grid item xs={6}>
           <p>Phone Number</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="PhoneNumber"
               variant="outlined"
               type="string"
               size="medium"
               value={user.PhoneNumber || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <p>Identification Number</p>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="IdentificationNumber"
               variant="outlined"
               type="string"
               size="medium"
               value={user.IdentificationNumber || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Education Level</p>
              <Select
                required
                defaultValue={"0"}
                onChange={handleChange}
                inputProps={{name: "EducationLevelID",}}
              >
                <MenuItem value={"0"}>กรุณาเลือกระดับการศึกษา</MenuItem>
                {educationlevels?.map((item: EducationLevelsInterface) =>
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Name}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

         <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
             <p>BirthDay</p>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DatePicker
                 value={date}
                 onChange={(newValue) => {setDate(newValue);}}
                 renderInput={(params) => <TextField {...params} />}
               />
             </LocalizationProvider>
           </FormControl>
         </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>Role</p>
              <Select
                required
                defaultValue={"0"}
                onChange={handleChange}
                inputProps={{name: "RoleID",}}
              >
                <MenuItem value={"0"}>กรุณาเลือกบทบาท</MenuItem>
                {roles?.map((item: RolesInterface) =>
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Name}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

         <Grid item xs={12}>
           <Button component={RouterLink} to="/users" variant="contained">
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


export default UserCreate;