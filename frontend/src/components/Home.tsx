import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import React, {useState, useEffect} from 'react'
import TextField from "@mui/material/TextField";
import { UsersInterface } from "../models/IUser";
import { GetUser } from "../services/HttpClientService";

function Home() {
  const uid = parseInt(localStorage.getItem("userID")+"")
  
  const [user, setUser] = useState<UsersInterface>({});
  const getUser = async () => {
    let res = await GetUser(uid);
    if (res.status) {
      setUser(res.data);
      console.log("Load User Complete");
    }
    else{
      console.log("Load User InComplete!!!!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
  
    <div>
      User Role Level: {user.Role?.Name}
      <Grid container spacing={3} sx={{ padding: 2 }}>       
      
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
          <p>ชื่อ</p>
            <TextField
              value={`${user.FirstName} ${user.LastName}`}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
          <p>Email</p>
            <TextField
              value={user.Email || ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
    


  )
}

export default Home