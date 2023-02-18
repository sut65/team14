import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DevicesInterface } from "../models/IDevice";
import { Link as RouterLink } from "react-router-dom";
import { ListDevices } from "../services/HttpClientService";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Devices() {
  const [devices, setDevices] = React.useState<DevicesInterface[]>([]);
  const listDevices = async () => {
    let res = await ListDevices();
    if (res) {
        setDevices(res);
    }
  };

useEffect(() => {
  listDevices();
}, []);
console.log(devices);


const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50},
    { field: "Detail", headerName: "ชื่ออุปกรณ์", width: 150, valueFormatter: (params) => params.value.Detail},
    //{ field: "Number_of_Device", headerName: "จำนวน", width: 150, valueFormatter: (params) => params.value.Number_of_Device},
    { field: "StatusDevice", headerName: "สถานะ", width: 150, valueFormatter: (params) => params.value.StatusDevice },
    { field: "DeviceType", headerName: "ประเภท", width: 150, valueFormatter: (params) => params.value.DeviceTypeDetail},
    { field: "Brand", headerName: "ยี่ห้อ", width: 200, valueFormatter: (params) => params.value.BrandDetail},
    //{ field: "Admin", headerName: "ผู้ดูแล", width: 200, valueFormatter: (params) => params.value.FirstName},
    //{ field: "Note", headerName: "หมายเหตุ", width: 100, valueFormatter: (params) => params.value.Note },
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
                  รายการอุปกรณ์
                </Typography>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/device/create"
                variant="contained"
                color="primary"
              >
                สร้างรายการอุปกรณ์
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/device/update"
                variant="contained"
                color="primary"
              >
                แก้ไขรายการอุปกรณ์
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/device/delete"
                variant="contained"
                color="primary"
              >
                ลบรายการอุปกรณ์
              </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
         
       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={devices}
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

export default Devices;
