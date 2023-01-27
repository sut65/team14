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
import { CreateFood_and_Drink } from "../services/HttpClientService";
import {ListFoodtypes, ListShops, ListUsers,} from "../services/HttpClientService";
import TextField from "@mui/material/TextField";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Food_and_DrinkCreate() {
    const [food_and_drink, setFood_and_Drink] = React.useState<Partial<Food_and_DrinksInterface>>({});
    const [foodtypes, setFoodtypes] = React.useState<FoodtypesInterface[]>([]);
    const [shops, setShops] = React.useState<ShopsInterface[]>([]);
    const [user, setUser] = React.useState<UsersInterface[]>([]);
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
      const name = event.target.name as keyof typeof food_and_drink;
      const value = event.target.value;
      setFood_and_Drink({
        ...food_and_drink,
        [name]: value,
      });
    };

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof Food_and_DrinkCreate;
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
    
    //ดึงข้อมูล Users
    const listUsers = async () => {
      let res = await ListUsers();
      if (res) { setUser(res); console.log("Load User Complete");}
      else{ console.log("Load User InComplete!!!!");}
    };

    React.useEffect(() => {
      listFoodtypes();
      listShops();
      listUsers();
    }, []);

    async function submit() {
      let data = {
          Name: food_and_drink.Name,

          //AdminID: (user.ID),
          FoodtypeID: (food_and_drink.FoodtypeID),
          ShopID: (food_and_drink.ShopID),  
      };
      console.log(data);
      
      let res = await CreateFood_and_Drink(data);
      console.log(res);
      if (res) {
          setSuccess(true);
      } else {
          setError(true);
      }

  }

return (
    <Container maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success"> บันทึกรายการอาหารสำเร็จ </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> บันทึกรายการอาหารไม่สำเร็จ </Alert>
      </Snackbar>
      <Paper>
        <Box display="flex" sx={{ marginTop: 2, }}>
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom > เพิ่มรายการอาหาร </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">   
            <p>ประเภทอาหาร</p>
            <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "FoodtypeID", }}>
              <MenuItem value={"0"}>กรุณาเลือกประเภทอาหาร</MenuItem>
                {foodtypes?.map((item: FoodtypesInterface) => 
                  <MenuItem key={item.ID} value={item.ID} > {item.Name} </MenuItem>)}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} >  
          <FormControl fullWidth variant="outlined">
              <p>ชื่ออาหาร</p>
              <TextField  id="Name" variant="outlined" type="string" size="medium" placeholder="เมนูอาหาร"  value={food_and_drink.Name || ""} onChange={handleInputChange}/>
          </FormControl>
          </Grid>
          <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">   
              <p>ร้านค้า</p>
              <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "ShopID", }}>
              <MenuItem value={"0"}>กรุณาเลือกร้านค้า</MenuItem>
                {shops?.map((item: ShopsInterface) => 
                  <MenuItem key={item.ID} value={item.ID}> {item.Name} </MenuItem>)}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">  
              {/* <p>แอดมิน</p>
              <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "AdminID",}}>
              <MenuItem value={"0"}>--ชื่อแอดมิน--</MenuItem>
                {user?.map((item: UsersInterface) => 
                  <MenuItem key={item.ID} value={item.ID}> {item.FirstName} </MenuItem>)}
              </Select> */}
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/food_and_drinks" variant="contained"> กลับ </Button>
            <Button style={{ float: "right" }} onClick={submit} variant="contained" color="success" > บันทึก </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
);
}
export default Food_and_DrinkCreate;

