import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  DeleteRoom, ListRooms } from "../services/HttpClientService";
import { RoomsInterface } from "../models/IRoom";
import { Alert, ButtonGroup, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


function Rooms() {

    const [room, setRoom] = React.useState<RoomsInterface>(
      {
        Detail: "", Note: "",
        Time: new Date(),
      }
    );
    const [rooms, setRooms] = useState<RoomsInterface[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [successDel, setSuccessDel] = useState(false);
    const [errorDel, setErrorDel] = useState(false);

    const [errorMessageDel, setErrorMessageDel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



   
    const listRooms = async () => {
        let res = await ListRooms();
        if (res) {
            setRooms(res);
        }
        console.log(res)
    };
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
          return;
      }
      setSuccess(false);
      setError(false);

      setSuccessDel(false);
      setErrorDel(false);
     
 };

 async function DelRoom(id:any) {
  let res = await DeleteRoom((id));
  if (res.status) {

  
        setSuccess(true);
        setErrorMessage("");
        setRoom(res.data)
        listRooms();
     

    }
  
   else {
    setError(true);
    setErrorMessage(res.data);
  }
}

      useEffect(() => {
     
        listRooms();
     
      }, [])

      return (

        <div>
          <Container maxWidth="lg">
          <Paper>
           <Grid container spacing={1} sx={{ padding: 2 }} >
             <Grid item xs={12}>
              
                 <Grid container spacing={1} sx={{ padding: 2 }} >
                   <Grid item xs={10}>
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
                 </Grid>
              
             </Grid>
             
             <Snackbar
       open={successDel}
       autoHideDuration={6000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         ยกเลิกรายการสั่งสำเร็จ
       </Alert>
     </Snackbar>

     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         ยกเลิกรายการสั่งไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>
     
           </Grid>
         </Paper>
         <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
       <TableContainer component={Paper}>
      <Table sx={{ height: 400, width: "100%", marginTop: '20px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>                         
            <TableCell align="center">ชื่อตึก</TableCell>           
            <TableCell align="center">เลขห้อง</TableCell>
            <TableCell align="center">ประเภทห้อง</TableCell>
            <TableCell align="center">หมายเหตุ</TableCell>
            <TableCell align="center">ชื่อ</TableCell>
            <TableCell align="center">เวลาที่บันทึก</TableCell>
            <TableCell align="center">option</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.ID}</TableCell>                          
              <TableCell align="center">{row.Building?.Detail}</TableCell>
              <TableCell align="center">{row.Detail}</TableCell>
              <TableCell align="center">{row.Typeroom?.Detail}</TableCell>
              <TableCell align="center">{row.Note}</TableCell>
              <TableCell align="center">{row.Admin?.FirstName} {row.Admin?.LastName}</TableCell> 
              <TableCell align="center">{row.Time?.toString()}</TableCell>                              
              <TableCell align="center"><ButtonGroup
                                          disableElevation                                          
                                          aria-label="Disabled elevation buttons"
                                          size="small"
                                        >
                                          
                                          <Button variant="contained" 
                                                  component={RouterLink}
                                                  to={`/room/update/${row.ID}`} >Edit</Button>
                                          <Button variant="outlined" 
                                                  color="error" 
                                                  onClick={() => DelRoom(row.ID)}>Del</Button>
                                        </ButtonGroup>
              </TableCell>  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
         </Container>
        </div>
     
      );
            }
     
     
     
     export default Rooms;