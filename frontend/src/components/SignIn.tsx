import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SigninInterface } from "../models/ISignin";
import { Login, GetUserRole } from "../services/HttpClientService";
import { Link } from "react-router-dom";
import image from "../images/one.jpg";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props,  ref ) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function SignIn() {
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
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

  const submit = async () => {
    console.log(signin)
    let res = await Login(signin);
    let tmp = await GetUserRole();
    if (res || tmp) {
      setSuccess(true);  
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (

    
    
    <ThemeProvider theme={theme} >
      
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>
        
        <CssBaseline />
        <Paper
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
        <Box
          sx =  {{
            position: "relative",
            width: "400px",
            height: "600px",
            background: "transparent",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'
            
          }}
        >
          <Grid container component="main" spacing={0} 
                //direction="row"
                alignItems="center"
                justifyContent="center"
                //style={{ minHeight: '100vh' }} 
          >
            <Grid item xs={12} >
              <Avatar sx={{  bgcolor: "secondary.main", left: '50%', transform: 'translate(-50%, -50%)' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{textAlign: "center",}}>
                Sign in
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <TextField
                  sx={{
                    position: "relative",
                    margin: "30px",
                    width: "330px",
                    borderBottom: "2px solid #fff",
                  }}
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={signin.Email || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  sx={{
                    position: "relative",
                    margin: "30px",
                    width: "330px",
                    borderBottom: "2px solid #fff",
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="Password"
                  autoComplete="current-password"
                  value={signin.Password || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={6} >
                <Button 
                  type="submit"
                  sx={{ 
                    mt: 3, mb: 2, width: "80%", height: "40px",
                    borderRadius: "40px", background: "#fff",
                    border: "none", outline: "none",
                    cursor: "pointer", fontSize: "1em",
                    fontWeight: "600", left: '50%', transform: 'translate(-50%, -50%)',
                  }}
                  onClick={submit}
                  color="inherit"
                >
                  Sign In
                </Button>
              </Grid>

              <Grid item xs={6} >
                <Button
                  type="submit"
                  sx={{ 
                    mt: 3, mb: 2, width: "80%", height: "40px",
                    borderRadius: "40px", background: "#fff",
                    border: "none", outline: "none",
                    cursor: "pointer", fontSize: "1em",
                    fontWeight: "600", left: '50%', transform: 'translate(-50%, -50%)',
                  }}
                  component={Link}
                  to="/user/create"
                  variant="outlined"
                  color="inherit"
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={6} >
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      mt: 3, mb: 2, width: "80%", height: "40px",
                      borderRadius: "40px", background: "#fff",
                      border: "none", outline: "none",
                      cursor: "pointer", fontSize: "1em",
                      fontWeight: "600", left: '50%', transform: 'translate(-50%, -50%)',
                    }}
                    onClick={()=>setSignin({Email:"user@gmail.com", Password:"123456"})}
                  >
                    user
                  </Button>
                </Grid>

                <Grid item xs={6} >
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      mt: 3, mb: 2, width: "80%", height: "40px",
                      borderRadius: "40px", background: "#fff",
                      border: "none", outline: "none",
                      cursor: "pointer", fontSize: "1em",
                      fontWeight: "600", left: '50%', transform: 'translate(-50%, -50%)',
                    }}
                    onClick={()=>setSignin({Email:"admin@gmail.com", Password:"123456"})}
                  >
                    admin
                  </Button>
                </Grid>
          </Grid>
        </Box>
       
        </Paper>
    </ThemeProvider>
  );
}

export default SignIn;