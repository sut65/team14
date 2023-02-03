import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  ListRooms } from "../services/HttpClientService";
import { RoomsInterface } from "../models/IRoom";
import { Grid, Paper } from "@mui/material";


function Rooms() {

    const [room, setRooms] = React.useState<RoomsInterface[]>([]);
   
   
    const listRooms = async () => {
        let res = await ListRooms();
        if (res) {
            setRooms(res);
        }
    };
   
   
      
    ;
    const columns: GridColDef[] = [

        { field: "Admin", headerName: "แอดมิน", width: 100 , 
        valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,},
     
        { field: "Building", headerName: "ตึก", width: 100 , 
        valueFormatter: (params) => params.value.Detail,},
     
        { field: "Detail", headerName: "เลขห้อง", width: 200  ,},
       
        { field: "Typeroom", headerName: "ประเภทห้อง", width: 200 ,
        valueFormatter: (params) => params.value.Detail,},

        { field: "Note", headerName: "หมายเหตุ", width: 200  ,},
        { 
          field: "Time", headerName: "เวลาที่เพิ่มห้อง", width: 200,
          valueFormatter: (params) => `${new Date(params.value)}`,
        },
     
        
      ];
     
     
      useEffect(() => {
     
        listRooms();
     
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
                       การจัดการห้อง
                     </Typography>
                   </Grid>
     
                   <Grid item xs={2}>
                   <Button
                     component={RouterLink}
                     to="/room/create"
                     variant="contained"
                     color="primary"
                   >
                     Create room
                   </Button>
                   </Grid>
     
                   <Grid item xs={2}>
                   <Button
                     component={RouterLink}
                     to="/room/update"
                     variant="contained"
                     color="primary"
                   >
                     Update room
                   </Button>
                   </Grid>
     
                   <Grid item xs={2}>
                   <Button
                     component={RouterLink}
                     to="/room/delete"
                     variant="contained"
                     color="primary"
                   >
                     Delete room
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
                   rows={room}
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
     
     
     
     export default Rooms;