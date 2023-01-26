import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DevicesInterface } from "../models/IDevice";
import { ListDevices } from "../services/HttpClientService";


function Devices() {

    const [device, setDevices] = React.useState<DevicesInterface[]>([]);
   
   
    const listdevices = async () => {
        let res = await ListDevices();
        if (res) {
            setDevices(res);
        }
    };
   
   
      
    ;
    const columns: GridColDef[] = [

        { field: "DeviceID", headerName: "ไอดี", width: 100},
     
        { field: "Detail", headerName: "ชื่ออุปกรณ์", width: 100},
     
        { field: "StatusDevice", headerName: "สถานะ", width: 200},
     
        { field: "Devicetype", headerName: "ประเภท", width: 200},

        { field: "Brand", headerName: "ยี่ห้อ", width: 200},
     
        
      ];
     
     
      useEffect(() => {
     
        listdevices();
     
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
                  การจัดอุปกรณ์
                </Typography>
              </Box>
     
              <Box>
                {/* <Button
                  component={RouterLink}
                  to="/building/create"
                  variant="contained"
                  color="primary"
                >
                  Update Device
                </Button> */}
              </Box>
            </Box>
     
            <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
              <DataGrid
                rows={device}
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
     
     
     
     export default Devices;