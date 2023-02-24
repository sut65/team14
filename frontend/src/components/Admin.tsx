import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { UsersInterface } from "../models/IUser";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListUsers, } from "../services/HttpClientService";
import { Grid, Paper } from "@mui/material";
import AccessDenied from "./AccessDenied";

function Users() {
  const [users, setUsers] = React.useState<UsersInterface[]>([]);
  const listUsers = async () => {
    let res = await ListUsers();
    if (res) {
      setUsers(res);
    }
  };

  const columns: GridColDef[] = [
      { field: "ID", headerName: "ID", width: 50 },
      { field: "FirstName", headerName: "ชื่อ", width: 150 },
      { field: "LastName", headerName: "นามสกุล", width: 150 },
      { field: "Email", headerName: "อีเมลล์", width: 150 },
      { field: "PhoneNumber", headerName: "เบอร์โทรศัพท์", width: 120 },
      { field: "IdentificationNumber", headerName: "เลขบัตรประชาชน", width: 150 },
      { field: "StudentID", headerName: "รหัสนักศึกษา", width: 100 },
      { field: "Age", headerName: "อายุ", width: 30 },
      { field: "Password", headerName: "รหัสผ่าน", width: 100, },
      { field: "BirthDay", headerName: "วัน/เดือน/ปีเกิด", width: 150 },
      { field: "Role", headerName: "สถานะ", width: 70, valueFormatter: (params) => params.value.Name, },
      { field: "Gender", headerName: "เพศ", width: 80, valueFormatter: (params) => params.value.Name  },
      { field: "EducationLevel", headerName: "ระดับการศึกษา", width: 120, valueFormatter: (params) => params.value.Name  },
  ];

  useEffect(() => {
    listUsers();
  }, []);

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
           <Grid item xs={8}>
             <Typography
               component="h2"
               variant="h6"
               color="primary"
               gutterBottom
             >
               ข้อมูลแอดมิน
             </Typography>
           </Grid>

           <Grid item xs={2}>
           <Button
             component={RouterLink}
             to="/admin/create"
             variant="contained"
             color="primary"
           >
             ลงทะเบียนแอดมิน
           </Button>
           </Grid>

           <Grid item xl={2}>
           <Button
             component={RouterLink}
             to="/admin/update"
             variant="contained"
             color="primary"
           >
             แก้ไขบัญชีแอดมิน
           </Button>
           </Grid>

           <Grid item xl={2}>
           <Button
             component={RouterLink}
             to="/admin/delete"
             variant="contained"
             color="primary"
           >
             ลบบัญชีแอดมิน
           </Button>
           </Grid>
         </Grid>
       </Paper>
     </Grid>
      
    <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
      <DataGrid
        rows={users}
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


export default Users;