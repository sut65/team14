import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Food_and_DrinksInterface } from "../models/IFood_and_Drink";
import { Link as RouterLink } from "react-router-dom";
import { ListFood_and_Drinks } from "../services/HttpClientService";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Food_and_Drinks() {
  const [food_and_drinks, setFood_and_Drinks] = React.useState<Food_and_DrinksInterface[]>([]);
  const listFood_and_Drinks = async () => {
    let res = await ListFood_and_Drinks();
    if (res) {
        setFood_and_Drinks(res);
    }
  };

useEffect(() => {
  listFood_and_Drinks();
}, []);
console.log(food_and_drinks);


const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50},
    { field: "Menu", headerName: "ชื่ออาหาร", width: 150, valueFormatter: (params) => params.value.Name},
    { field: "Foodtype", headerName: "ประเภทอาหาร", width: 150, valueFormatter: (params) => params.value.Name},
    { field: "Shop", headerName: "ร้านค้า", width: 150, valueFormatter: (params) => params.value.Name },
    { field: "Tel", headerName: "เบอร์โทรศัพท์", width: 150, valueFormatter: (params) => params.value.Name},
    { field: "Address", headerName: "ที่อยู่", width: 200, valueFormatter: (params) => params.value.Name},
    { field: "Admin", headerName: "แอดมิน", width: 100, valueFormatter: (params) => params.value.FirstName },
];

return (
  <div>
     <Container maxWidth="lg">
     <Paper>
     <Grid container spacing={1} sx={{ padding: 2 }} >
         <Grid item xs={12}>
          <Paper>
            <Grid container spacing={1} sx={{ padding: 2 }} >
              <Grid item xs={6}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  รายการอาหารและเครื่องดื่ม
                </Typography>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/food_and_drink/create"
                variant="contained"
                color="primary"
              >
                สร้างรายการอาหาร
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/food_and_drink/update"
                variant="contained"
                color="primary"
              >
                แก้ไขรายการอาหาร
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/food_and_drink/delete"
                variant="contained"
                color="primary"
              >
                ลบรายการอาหาร
              </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
         
       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={food_and_drinks}
           getRowId={(row) => row.ID}
           columns={columns}
           pageSize={5}
           rowsPerPageOptions={[5]}
         />
       </div>
       
      </Grid>
     </Paper>
     </Container>
   </div>

 );

}

export default Food_and_Drinks;
