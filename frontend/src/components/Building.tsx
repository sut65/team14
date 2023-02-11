import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BuildingsInterface } from "../models/IBuilding";
import { DeleteBuilding, ListBuildings } from "../services/HttpClientService";
import { Alert, ButtonGroup, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


function Buildings() {

    const [building, setBuilding] = React.useState<BuildingsInterface>(
    {
      Detail: "", Note: "",
      Time: new Date(),
    }
  );
  const [buildings, setBuildings] = useState<BuildingsInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successDel, setSuccessDel] = useState(false);
  const [errorDel, setErrorDel] = useState(false);

  const [errorMessageDel, setErrorMessageDel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

   
   
  const listBuildings = async () => {
    let res = await ListBuildings();
    if (res) {
        setBuildings(res);
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
   
async function DelBuilding(id:any) {
  let res = await DeleteBuilding((id));
  if (res.status) {

  
        setSuccess(true);
        setErrorMessage("");
        setBuilding(res.data)
        listBuildings();
     

    }
  
   else {
    setError(true);
    setErrorMessage(res.data);
  }
}


      
    ;
    
     
      useEffect(() => {
     
        listBuildings();
     
      }, [])

      return (

        <div>
          <Container maxWidth="lg">
          
           <Grid container spacing={1} sx={{ padding: 2 }} >
             <Grid item xs={12}>
               <Paper>
                 <Grid container spacing={1} sx={{ padding: 2 }} >
                   <Grid item xs={10}>
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
             </Grid>
             
             <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
       <TableContainer component={Paper}>
      <Table sx={{ height: 400, width: "100%", marginTop: '20px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>                         
            <TableCell align="center">ชื่อตึก</TableCell>           
            <TableCell align="center">ผู้รักษาความปลอดภัย</TableCell>
            <TableCell align="center">บริษัทรับเหมา</TableCell>
            <TableCell align="center">หมายเหตุ</TableCell>
            <TableCell align="center">ชื่อ</TableCell>
            <TableCell align="center">เวลาที่บันทึก</TableCell>
            <TableCell align="center">option</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {buildings.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.ID}</TableCell>                          
              <TableCell align="center">{row.Detail}</TableCell>
              <TableCell align="center">{row.Guard?.Detail}</TableCell>
              <TableCell align="center">{row.Company?.Detail}</TableCell>
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
                                                  to={`/building/update/${row.ID}`} >Edit</Button>
                                          <Button variant="outlined" 
                                                  color="error" 
                                                  onClick={() => DelBuilding(row.ID)}>Del</Button>
                                        </ButtonGroup>
              </TableCell>  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
     
           </Grid>
         
         
         </Container>
        </div>
     
      );
            }
     
     
     
     export default Buildings;