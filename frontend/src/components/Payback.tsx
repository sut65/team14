import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListPaybacks,} from "../services/HttpClientService";
import { PaybacksInterface } from "../models/IPayback";
import { Grid, Paper } from "@mui/material";
import AccessDenied from "./AccessDenied";

function Paybacks() {

    const [paybacks, setPaybacks] = React.useState<PaybacksInterface[]>([]);

    const listPaybacks = async () => {
        let res = await ListPaybacks();
        if (res) {
            setPaybacks(res);
            console.log(res)
        }
    };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ID", width: 50 },

      {field: "Admin",headerName: "ผู้อนุมัติ",width: 120,
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,},

      // {field: "Approve",headerName: "รหัสการจองใช้ห้อง",width: 140,
      //   valueFormatter: (params) => `${(params.value.Code)}`,},

      {field: "PBADNote",headerName: "หมายเหตุจากผู้บันทึก",width: 140,},

      {field: "PBusNote",headerName: "หมายเหตุจากผู้ใช้",width: 140,},

      {field: "Device",headerName: "อุปกรณ์",width: 80,
      valueFormatter: (params) => `${(params.value.Detail )}`,},

      {field: "Timeofborrow",headerName: "เวลาที่ทำการยืม",width: 120,
          valueFormatter: (params) => `${new Date(params.value)}`,},
      
      {field: "Timeofpayback",headerName: "เวลาที่ทำการคืน",width: 120,
      valueFormatter: (params) => `${new Date(params.value)}`,},    
        
    ];

    useEffect(() => {
        listPaybacks();
    }, []);

    //Check Role
    const roleLevel = localStorage.getItem('role')+""
    if (roleLevel !== "Admin") {
      return <AccessDenied />
    }
    
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
                  อนุมัติการคืนอุปกรณ์
                </Typography>
              </Grid>

              <Grid item xs={2}></Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/payback/create"
                variant="contained"
                color="primary"
              >
                Create Payback
              </Button>
              </Grid>

              {/* <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/payback/update"
                variant="contained"
                color="primary"
              >
                Update Payback
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/payback/delete"
                variant="contained"
                color="primary"
              >
                Delete Payback
              </Button>
              </Grid> */}
            
            </Grid>
          </Paper>
        </Grid>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={paybacks}
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


export default Paybacks;