import { useState, useEffect } from "react";
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
import FlatwareIcon from '@mui/icons-material/Flatware';
import GroupsIcon from '@mui/icons-material/Groups';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import Booking from "./components/Booking";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UserCreate from "./components/UserCreate";
import UserUpdate from "./components/UserUpdate";
import UserDelete from "./components/UserDelete";
import User from "./components/Users";
import BookingCreate from "./components/BookingCreate";
import Approve from "./components/Approve";
import ApproveCreate from "./components/ApproveCreate";
import Borrow from "./components/Borrow";
import BorrowCreate from "./components/BorrowCreate";
import Add_friend from "./components/Add_friend";
import Add_friendCreate from "./components/Add_friendCreate";
import Food_and_Drink from "./components/Food_and_Drink";
import Food_and_DrinkCreate from "./components/Food_and_DrinkCreate";
import Building from "./components/Building";
import BuildingCreate from "./components/BuildingCreate";
import PaybackCreate from "./components/PaybackCreate";
import Paybacks from "./components/Payback";
import Room from "./components/Room";
import RoomCreate from "./components/RoomCreate";
import Device from "./components/Device";
import BookingUpdate from "./components/BookingUpdate";
import Button from "@mui/material/Button";
import Order_food from "./components/Order_food";
import OrderCreate from "./components/OrderCreate";
import BookingDelete from "./components/BookingDelete";
import DeviceCreate from "./components/DeviceCreate";
import DeviceUpdate from "./components/DeviceUpdate";
//import DeviceDelete from "./components/DeviceDelete";
import ApproveUpdate from "./components/ApproveUpdate";
import ApproveDelete from "./components/ApproveDelete";
import RoomUpdate from "./components/RoomUpdate";
import BuildingUpdate from "./components/BuildingUpdate";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate";
import OrderUpdate from "./components/OrderUpdate";
import BorrowDelete from "./components/BorrowDelete";
import Food_and_DrinkUpdate from "./components/Food_and_DrinkUpdate";
import Food_and_DrinkDelete from "./components/Food_and_DrinkDelete";
import BorrowUpdate from "./components/BorrowUpdate";
import PaybackUpdate from "./components/PaybackUpdate";
import PaybackDelete from "./components/PaybackDelete";
import image from "./images/one.jpg";
import NotFound404 from "./components/NotFound404";
import AdminUpdate from "./components/AdminUpdate";
import AdminDelete from "./components/AdminDelete";
import LogoutIcon from '@mui/icons-material/Logout';

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
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role: "All" },

  { name: "ข้อมูลการจองใช้ห้อง", icon: <MenuBookIcon />, path: "/bookings", role: "User" }, 
  { name: "ข้อมูลอนุมัติการจองใช้ห้อง", icon: <AssignmentTurnedInIcon />, path: "/approves", role: "Admin" },

  { name: "จัดการเพิ่มเพื่อนเข้าห้อง", icon: <GroupsIcon />, path: "/add_friends", role: "Admin"},
  { name: "ร้องขออาหารและเครื่องดื่ม", icon: <FlatwareIcon />, path: "/order_foods", role: "Admin"},

  { name: "รายการอาหาร", icon: <FastfoodIcon />, path: "/food_and_drinks", role: "Admin"},
  { name: "ข้อมูลสมาชิก", icon: <FolderSharedIcon />, path: "/users", role: "User"},

  { name: "จัดการยืมอุปกรณ์", icon: <AddShoppingCartTwoToneIcon />, path: "/borrows", role: "Admin"},
  { name: "จัดการคืนอุปกรณ์", icon: <ShoppingCartCheckoutTwoToneIcon />, path: "/paybacks", role: "Admin"},
  
  { name: "จัดการตึก", icon: <ApartmentIcon />, path: "/buildings", role: "Admin"},
  { name: "จัดการห้อง", icon: <MeetingRoomIcon />, path: "/rooms", role: "Admin"},

  { name: "จัดการอุปกรณ์", icon: <TextSnippetIcon />, path: "/devices", role: "Admin"},
  { name: "ข้อมูลแอดมิน", icon: <TextSnippetIcon />, path: "/admins", role: "Admin"},
];

const mdTheme = createTheme();

export default function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const roleLevel = (localStorage.getItem("role")+"");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const signout = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/";
    }, 1000);
  };

  if (!token) {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/user/create" element={<UserCreate />} />
            <Route path="*" element={<SignIn />} />
          </Routes>
        </Router>
      </div>
    );
  }
  else{
  
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
                <Button 
                  onClick={signout} 
                  type="submit"
                  color="inherit"
                  sx={{ 
                      borderRadius: "40px", 
                      border: "none", outline: "none",
                      cursor: "pointer", 
                      fontSize: "1em",fontWeight: "600",
                    }}
                >
                <LogoutIcon/>
                  ออกจากระบบ
                </Button>
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
                  if(item.role === roleLevel || item.role === "All"){
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
                )}
                
                })}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                // backgroundImage: `url(${image})`,
                // backgroundRepeat: "no-repeat",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/bookings" element={<Booking />} />
                  <Route path="/booking/create" element={<BookingCreate />} />
                  <Route path="/booking/update" element={<BookingUpdate />} />
                  <Route path="/booking/delete" element={<BookingDelete />} />

                  <Route path="/users" element={<User />} />               
                  <Route path="/user/update" element={<UserUpdate />} />
                  <Route path="/user/delete" element={<UserDelete />} />

                  <Route path="/add_friends" element={<Add_friend />} />
                  <Route path="/add_friend/create" element={<Add_friendCreate />} />

                  <Route path="/approves" element={<Approve />} />
                  <Route path="/approve/create" element={<ApproveCreate />} />
                  <Route path="/approve/update" element={<ApproveUpdate />} />
                  <Route path="/approve/delete" element={<ApproveDelete />} />

                  <Route path="/borrows" element={<Borrow />} />
                  <Route path="/borrow/create" element={<BorrowCreate />} />
                  <Route path="/borrow/update" element={<BorrowUpdate />} />
                  <Route path="/borrow/delete" element={<BorrowDelete />} />

                  <Route path="/food_and_drinks" element={<Food_and_Drink />} />
                  <Route path="/food_and_drink/create" element={<Food_and_DrinkCreate />} />
                  <Route path="/food_and_drink/update" element={<Food_and_DrinkUpdate />} />
                  <Route path="/food_and_drink/delete" element={<Food_and_DrinkDelete />} />

                  <Route path="/order_foods" element={< Order_food />} />
                  <Route path="/order_food/create" element={< OrderCreate />} />
                  <Route path="/order_food/update/:id" element={< OrderUpdate />} />
                  

                  <Route path="/buildings" element={<Building />} />
                  <Route path="/building/create" element={<BuildingCreate />} />
                  <Route path="/building/update/:id" element={<BuildingUpdate />} />

                  <Route path="/rooms" element={<Room />} />
                  <Route path="/room/create" element={<RoomCreate />} />
                  <Route path="/room/update/:id" element={<RoomUpdate />} />

                  <Route path="/paybacks" element={<Paybacks />} />
                  <Route path="/payback/create" element={<PaybackCreate />} />
                  {/* <Route path="/payback/update" element={<PaybackUpdate />} /> */}
                  <Route path="/payback/delete" element={<PaybackDelete />} />

                  <Route path="/devices" element={<Device />} />
                  <Route path="/device/create" element={<DeviceCreate />} />
                  <Route path="/device/update" element={<DeviceUpdate />} />
                  {/* <Route path="/device/delete" element={<DeviceDelete />} /> */}

                <Route path="/admins" element={<Admin />} />
                <Route path="/admin/create" element={<AdminCreate />} />
                <Route path="/admin/update" element={<AdminUpdate />} />
                <Route path="/admin/delete" element={<AdminDelete />} />

                  <Route path="*" element={<NotFound404 />} />
                </Routes> 
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </Router>
  );
}
}
