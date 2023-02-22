import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
  ListBorrows, 
} from "../services/HttpClientService";
import { BorrowsInterface } from "../models/IBorrow";
import { Grid, Paper } from "@mui/material";

function Borrows() {

    const [borrows, setBorrows] = React.useState<BorrowsInterface[]>([]);

    const listBorrows = async () => {
        let res = await ListBorrows();
        if (res) {
            setBorrows(res);
        }
    };
  
    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 50 },

        {field: "Approve",headerName: "รหัสการจองใช้ห้อง",width: 140,
          valueFormatter: (params) => `${(params.value.Code)}`,},

        {field: "BorrowAPNote",headerName: "หมายเหตุจากผู้บันทึก",width: 140,},

        {field: "BorrowNote1",headerName: "หมายเหตุจากผู้ใช้",width: 140,},

        {field: "Device",headerName: "อุปกรณ์",width: 140,
        valueFormatter: (params) => `${(params.value.Detail )}`,},

        {field: "Admin",headerName: "ผู้อนุมัติ",width: 120,
          valueFormatter: (params) => `${params.value.FirstName} ${params.value.LastName}`, },

        {field: "Timeofborrow",headerName: "เวลาที่ทำการยืม",width: 120,
          valueFormatter: (params) => `${new Date(params.value)}`,},

        
        
    ];

    useEffect(() => {
        listBorrows();
    }, []);

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
                  อนุมัติการยืมอุปกรณ์
                </Typography>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/borrow/create"
                variant="contained"
                color="primary"
              >
                สร้างการยืมอุปกรณ์
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/borrow/update"
                variant="contained"
                color="primary"
              >
                แก้ไขการยืมอุปกรณ์
              </Button>
              </Grid>

              <Grid item xs={2}>
              <Button
                component={RouterLink}
                to="/borrow/delete"
                variant="contained"
                color="primary"
              >
                ยกเลิกการยืมอุปกรณ์
              </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
         
       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={borrows}
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


export default Borrows;