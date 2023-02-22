import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
    ListApproves, 
} from "../services/HttpClientService";
import { ApprovesInterface } from "../models/IApprove";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AccessDenied from "./AccessDenied";

function Approves() {

  const [approves, setApproves] = React.useState<ApprovesInterface[]>([]);

  const listApproves = async () => {
      let res = await ListApproves(); // Transaction #1
      if (res) {
          setApproves(res);
      }
  };

  const columns: GridColDef[] = [
      { field: "ID", headerName: "ID", width: 100 },
      { field: "Code", headerName: "รหัสการอนุมัติ", width: 120 },
      {
        field: "Booking",
        headerName: "รหัสการจองใช้ห้อง",
        width: 140,
        valueFormatter: (params) => `${(params.value.Code)}`,
      },
      { 
        field: "ApproveTime", headerName: "เวลาที่อนุมัติ", width: 200,
        valueFormatter: (params) => `${new Date(params.value)}`,
      },
      { field: "Note", headerName: "Note", width: 150 },
      {
          field: "User",
          headerName: "ผู้อนุมัติ",
          width: 120,
          valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`,
      },
      {
          field: "StatusBook",
          headerName: "สถานะการจอง",
          width: 120,
          valueFormatter: (params) => params.value.Detail,
      },
  ];

  useEffect(() => {
      listApproves();
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
                  อนุมัติการจองใช้ห้อง
                </Typography>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/approve/create"
                variant="contained"
                color="primary"
              >
                Create Approve
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/approve/update"
                variant="contained"
                color="primary"
              >
                Update Approve
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/approve/delete"
                variant="contained"
                color="primary"
              >
                Delete Approve
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
              rows={approves}
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


export default Approves;