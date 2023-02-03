import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BuildingsInterface } from "../models/IBuilding";
import { ListBuildings } from "../services/HttpClientService";
import { Grid, Paper } from "@mui/material";


function Buildings() {

    const [building, setBuildings] = React.useState<BuildingsInterface[]>([]);
   
   
    const listBuildings = async () => {
        let res = await ListBuildings();
        if (res) {
            setBuildings(res);
        }
        console.log(res);
        
    };
   
   
      
    ;
    const columns: GridColDef[] = [

        { field: "Admin", headerName: "แอดมิน", width: 100 , 
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,},
     
        { field: "Detail", headerName: "ชื่อตึก", width: 100},
     
        { field: "Guard", headerName: "ผู้รักษาความปลอดภัย", width: 200  ,
        valueFormatter: (params) => params.value.Detail,},
     
        { field: "Company", headerName: "บริษัทรับเหมา", width: 200 ,
        valueFormatter: (params) => params.value.Detail,},
     
        { field: "Note", headerName: "หมายเหตุ", width: 200  ,},
        { 
          field: "Time", headerName: "เวลาที่เพิ่มตึก", width: 200,
          valueFormatter: (params) => `${new Date(params.value)}`,
        },
        
      ];
     
     
      useEffect(() => {
     
        listBuildings();
     
      }, [])

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
                       การจัดการตึก
                     </Typography>
                   </Grid>
     
                   <Grid item xs={2}>
                   <Button
                     component={RouterLink}
                     to="/building/create"
                     variant="contained"
                     color="primary"
                   >
                     Create building
                   </Button>
                   </Grid>
     
                   <Grid item xs={2}>
                   <Button
                     component={RouterLink}
                     to="/building/update"
                     variant="contained"
                     color="primary"
                   >
                     Update building
                   </Button>
                   </Grid>
     
                   <Grid item xs={2}>
                   <Button
                     component={RouterLink}
                     to="/building/delete"
                     variant="contained"
                     color="primary"
                   >
                     Delete building
                   </Button>
                   </Grid>
                 </Grid>
               </Paper>
             </Grid>
             
             <Grid item xs={12}>
             <Paper>
               <Grid container spacing={1} sx={{ padding: 2 }} >
                 <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
                 <DataGrid
                   rows={building}
                   getRowId={(row) => row.ID}
                   columns={columns}
                   pageSize={5}
                   rowsPerPageOptions={[5]}
                 />
                 </div>
               </Grid>
             </Paper>
             </Grid>
     
           </Grid>
         </Paper>
         
         </Container>
        </div>
     
      );
            }
     
     
     
     export default Buildings;