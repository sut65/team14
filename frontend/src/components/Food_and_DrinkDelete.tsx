import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link as RouterLink } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { Food_and_DrinksInterface } from "../models/IFood_and_Drink";
import { FoodtypesInterface } from "../models/IFood_and_Drink";
import { ShopsInterface } from "../models/IFood_and_Drink";
import { UsersInterface } from "../models/IUser";
import { CreateFood_and_Drink, GetUser, DeleteFood_and_Drink, ListFood_and_Drinks, GetFood_and_Drinks } from "../services/HttpClientService";
import {ListFoodtypes, ListShops, ListUsers,} from "../services/HttpClientService";
import TextField from "@mui/material/TextField";
import AccessDenied from "./AccessDenied";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Food_and_DrinkDelete() {
    const [food_and_drink, setFood_and_Drink] = React.useState<Partial<Food_and_DrinksInterface>>({});
    const [food_and_drinks, setFood_and_Drinks] = React.useState<Food_and_DrinksInterface[]>([]);
    const [foodtypes, setFoodtypes] = React.useState<FoodtypesInterface[]>([]);
    const [shops, setShops] = React.useState<ShopsInterface[]>([]);
    const [user, setUser] = React.useState<UsersInterface>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
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
      const name = event.target.name as keyof typeof food_and_drink;
      const value = event.target.value;
      setFood_and_Drink({
        ...food_and_drink,
        [name]: value,
      });
    };

    const onChangeFood_and_Drink = async(event: SelectChangeEvent) => {
      const id = event.target.value;
      let res = await GetFood_and_Drinks(id);
      if (res.status) { setFood_and_Drink(res.data); console.log("Load Food_and_Drink Complete");}
      else{ console.log("Load Food_and_Drink InComplete!!!!");}
    };

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof food_and_drink;
      const { value } = event.target;
      setFood_and_Drink({ ...food_and_drink, [id]: value });
      console.log(`[${id}]: ${value}`);
    };
  
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    //ดึงข้อมูล Foodtypes
    const listFoodtypes = async () => {
      let res = await ListFoodtypes();
      if (res) { setFoodtypes(res); console.log("Load Foodtype Complete");}
      else{ console.log("Load Foodtype InComplete!!!!");}
    };

    //ดึงข้อมูล Shops
    const listShops = async () => {
      let res = await ListShops();
      if (res) { setShops(res); console.log("Load Shop Complete");}
      else{ console.log("Load Shop InComplete!!!!");}
    };

    //ดึงข้อมูล Food_and_Drinks
    const listFood_and_Drinks = async () => {
      let res = await ListFood_and_Drinks();
      if (res) { setFood_and_Drinks(res); console.log("Load Food_and_Drink Complete");}
      else{ console.log("Load Food_and_Drink InComplete!!!!");}
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

    React.useEffect(() => {
      listFoodtypes();
      listShops();
      getUser();
      listFood_and_Drinks();
    }, []);

    async function submit() {
      let res = await DeleteFood_and_Drink(food_and_drink.ID);
      console.log(res)
      if (res.status) {
          setSuccess(true);
          setErrorMessage("ลบรายการอาหารและเครื่องดื่มสำเร็จ");
      } else {
          setError(true);
          setErrorMessage(res.data);
          
      }
  }

//Check Role
const roleLevel = localStorage.getItem('role')+""
if (roleLevel !== "Admin") {
  return <AccessDenied />
}

return (
    <Container maxWidth="md">
      <Snackbar id="success" open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success"> {errorMessage} </Alert>
      </Snackbar>
      <Snackbar id="error" open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {errorMessage} </Alert>
      </Snackbar>
      <Paper>
        <Box display="flex" sx={{ marginTop: 2, }}>
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom > ลบรายการอาหาร </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">   
            <p>รายการอาหาร</p>
            <Select required defaultValue={"0"} onChange={onChangeFood_and_Drink} inputProps={{ name: "Food_and_DrinkID", }}>
              <MenuItem value={"0"}>กรุณาเลือกรายการอาหาร</MenuItem>
                {food_and_drinks?.map((item: Food_and_DrinksInterface) => 
                  <MenuItem key={item.ID} value={item.ID} > {item.Menu} </MenuItem>)}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">   
            <p>ประเภทอาหาร</p>
            <TextField  id="Foodtype" disabled variant="outlined" type="string" size="medium" label="ประเภทอาหาร" inputProps={{name: "Foodtype",}} value={food_and_drink.Foodtype?.Name || ""}/>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">   
              <p>ร้านค้า</p>
              <TextField  id="Shop" disabled variant="outlined" type="string" size="medium" label="ร้านค้า" inputProps={{name: "Shop",}} value={food_and_drink.Shop?.Name || ""}/>
          </FormControl>
          </Grid>
          <Grid item xs={6} >  
          <FormControl fullWidth variant="outlined">
              <p>เบอร์โทรศัพท์</p>
              <TextField  id="Tel" disabled variant="outlined" type="string" size="medium" label="เบอร์โทรศัพท์" inputProps={{name: "Tel",}} value={food_and_drink.Tel || ""}/>
          </FormControl>
          </Grid>
          <Grid item xs={6} >  
          <FormControl fullWidth variant="outlined">
              <p>ที่อยู่</p>
              <TextField  id="Address" disabled variant="outlined" type="string" size="medium" label="ที่อยู่" inputProps={{name: "Address",}} value={food_and_drink.Address || ""}/>
          </FormControl>
          </Grid>
          <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">  
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/food_and_drinks" variant="contained"> ยกเลิก </Button>
            <Button style={{ float: "right" }} onClick={submit} variant="contained" color="success" > ลบรายการ </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
);
}
export default Food_and_DrinkDelete;

