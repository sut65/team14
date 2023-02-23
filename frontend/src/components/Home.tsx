import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import  {useState, useEffect} from 'react'
import TextField from "@mui/material/TextField";
import { UsersInterface } from "../models/IUser";
import { GetUser } from "../services/HttpClientService";
import { Paper, Typography, Container } from '@mui/material';

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
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ padding: 2 }} >
      <Grid item xs={12}> {/* ปุ่ม */}
          <Grid container spacing={1} sx={{ padding: 2 }} component={Paper}>
            <Grid item xs={12}>
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    Team 14 - ระบบจองใช้ห้อง
                </Typography>
            </Grid>
          </Grid>
      </Grid>
          
        <Grid item xs={12}>
        <Grid container spacing={1} sx={{ padding: 2 }} component={Paper}>
          <Grid item xs={4}>
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

          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
            <p>Role</p>
              <TextField
                value={user.Role?.Name || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Container>


  )
}

export default Home