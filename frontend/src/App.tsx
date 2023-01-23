import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ComputerIcon from '@mui/icons-material/Computer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RoomIcon from '@mui/icons-material/Room';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HistoryIcon from '@mui/icons-material/History';

import Booking from "./components/Booking";
// import SignIn from "./components/SignIn";
import Home from "./components/Home";

import UserCreate from "./components/UserCreate";
import User from "./components/Users";
import BookingCreate from "./components/BookingCreate";
import Approve from "./components/Approve";
import ApproveCreate from "./components/ApproveCreate";
import Borrow from "./components/Borrow";
import BorrowCreate from "./components/BorrowCreate";
import Food_and_Drink from "./components/Food_and_Drink";
import Food_and_DrinkCreate from "./components/Food_and_DrinkCreate";

const drawerWidth = 260;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  { name: "ข้อมูลการจองใช้ห้อง", icon: <TextSnippetIcon />, path: "/bookings"},
  { name: "ข้อมูลอนุมัติการจองใช้ห้อง", icon: <TextSnippetIcon />, path: "/approves"},
  { name: "ข้อมูลสมาชิก", icon: <TextSnippetIcon />, path: "/users"},
  { name: "ยืมอุปกรณ์", icon: <TextSnippetIcon />, path: "/borrows"},
  { name: "รายการอาหาร", icon: <TextSnippetIcon />, path: "/food_and_drinks"},
];

const mdTheme = createTheme();

export default function App() {
  localStorage.setItem("userID", "1")
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = useState(true);
  // const roleLevel = parseInt(localStorage.getItem("role_id")+"");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);

  // if (!token) {
  //   return <SignIn />;
  // }

  // const signout = () => {
  //   localStorage.clear();
  //   window.location.href = "/";
  // };
return (
  <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ระบบจองใช้ห้อง
              </Typography>
              {/* <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button> */}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => {
                  return (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              )
              
              })}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/bookings" element={<Booking />} />
                <Route path="/booking/create" element={<BookingCreate />} />

                <Route path="/users" element={<User />} />
                <Route path="/user/create" element={<UserCreate />} />

                <Route path="/approves" element={<Approve />} />
                <Route path="/approve/create" element={<ApproveCreate />} />

                <Route path="/borrows" element={<Borrow />} />
                <Route path="/borrow/create" element={<BorrowCreate />} />

                <Route path="/food_and_drinks" element={<Food_and_Drink />} />
                <Route path="/food_and_drink/create" element={<Food_and_DrinkCreate />} />

              </Routes> 
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}