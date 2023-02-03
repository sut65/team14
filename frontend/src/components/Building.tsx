import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BuildingsInterface } from "../models/IBuilding";
import { ListBuildings } from "../services/HttpClientService";


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
                  การจัดการตึก
                </Typography>
              </Box>
     
              <Box>
                <Button
                  component={RouterLink}
                  to="/building/create"
                  variant="contained"
                  color="primary"
                >
                  Create Building
                </Button>
              </Box>
            </Box>
     
            <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
              <DataGrid
                rows={building}
                getRowId={(row) => row.ID}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
            
          </Container>
        </div>
     
      );
            }
     
     
     
     export default Buildings;