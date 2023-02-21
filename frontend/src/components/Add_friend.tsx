import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from '@mui/icons-material/Search';
import { 
  ListAdd_friends,ListAddFriendByBookingCode 
} from "../services/HttpClientService";
import { Add_friendInterface } from "../models/IAdd_friend";
import { ButtonGroup, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function Add_friend() {

    const [add_friend, setAdd_friends] = React.useState<Add_friendInterface[]>([]);
    
    const [code, setCode] = React.useState("")

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");   
    const [errorSearch, setErrorSearch] = React.useState(false); 
   
  
    const listAdd_friends = async () => {
        let res = await ListAdd_friends();
        if (res != null) {
            setAdd_friends(res);
        }
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
 };

    async function search(){
      if (code === ""){
        setErrorSearch(true);
        setErrorMessage("กรุณากรอกรหัสการจองห้องที่จะค้นหา");
        return
      }      
      let res = await ListAddFriendByBookingCode(code);  
      if (res != null){
        setAdd_friends(res.data);   
        handleClose()
        setSuccess(true);
        setErrorMessage("");
        console.log(res.data);
        } else {
          setErrorSearch(true);
          setErrorMessage(res);
        }
    };    
    useEffect(() => {
        listAdd_friends();
      }, []);

    
 return (
    <div>
         <Container maxWidth="md">
       <Box
         display="flex"
         sx={{
           marginTop: 2,
         }}
       >

         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
           >
             Add Friend
           </Typography>
         </Box>

         <Box>
           <Button
             component={RouterLink}
             to="/add_friend/create"
             variant="contained"
             color="primary"
           >
             Create Add friend
           </Button>
         </Box>
       </Box>      
       <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >      
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Booking Code"
            inputProps={{ 'aria-label': 'Booking Code' }}
            value={code + ""}
                  onChange={(e) => {setCode(e.target.value)                              
                    console.log(code)
                    }
                  }
          />
            <IconButton type="button" sx={{ p: '10px' }} 
                        aria-label="search" size="large"
                        onClick= {() => {
                        search();
                        }}>
              <SearchIcon />
            </IconButton>      
        </Paper> 
       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
       
       <TableContainer component={Paper}>
      <Table sx={{ height: 400, width: "100%", marginTop: '20px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Approve Code</TableCell>           
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Note</TableCell>
            <TableCell align="center">เวลาที่บันทึก</TableCell>
            <TableCell align="center">ผู้บันทึก</TableCell>
            <TableCell align="center">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {add_friend.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.ID}</TableCell>
              <TableCell align="center">{row.Approve?.Code}</TableCell>              
              <TableCell align="right">{row.User?.FirstName} {row.User?.LastName} </TableCell>             
              <TableCell align="left">{row.Note}</TableCell>
              <TableCell align="right">{row.AddfriendTime?.toString()}</TableCell>               
              <TableCell align="right">{row.Admin?.FirstName} {row.Admin?.LastName} </TableCell>
              <TableCell align="right"><ButtonGroup
                                          disableElevation                                          
                                          aria-label="Disabled elevation buttons"
                                          size="small"
                                        >                                          
                                          <Button variant="outlined" 
                                                  color="error" 
                                                  onClick={() =>(row.ID)}>Del</Button>
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
export default Add_friend;