import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Food_and_DrinksInterface } from "../models/IFood_and_Drink";
import { Link as RouterLink } from "react-router-dom";
import { ListFood_and_Drinks } from "../services/HttpClientService";

function Food_and_Drinks() {
  const [food_and_drinks, setFood_and_Drinks] = React.useState<Food_and_DrinksInterface[]>([]);
  const listFood_and_Drinks = async () => {
    let res = await ListFood_and_Drinks();
    if (res) {
        setFood_and_Drinks(res);
    }
  };

useEffect(() => {
  ListFood_and_Drinks();
}, []);
console.log(food_and_drinks);


const columns: GridColDef[] = [
    { field: "ID", headerName: "ID"},
    { field: "Menu", headerName: "ชื่ออาหาร", width: 170, valueFormatter: (params) => params.value.Name},
    { field: "Foodtype", headerName: "ประเภทอาหาร", width: 170, valueFormatter: (params) => params.value.Name},
    { field: "Shop", headerName: "ร้านค้า", width: 170, valueFormatter: (params) => params.value.Name },
    { field: "Admin", headerName: "แอดมิน", width: 170, valueFormatter: (params) => params.value.Name },
];

return (
  <div>
      <Container maxWidth="md">
        <Box display="flex" sx={{ marginTop: 2,}}>
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom > รายการอาหาร </Typography>
          </Box>
          <Box>
            <Button component={RouterLink} to="/food_and_drink/create" variant="contained" color="success" >เพิ่มรายการอาหาร </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid rows={food_and_drinks} getRowId={(row) => row.ID} columns={columns} pageSize={10} rowsPerPageOptions={[5]} />
        </div>
      </Container>
    </div>
  );
}

export default Food_and_Drinks;
