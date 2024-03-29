import { ApprovesInterface } from "../models/IApprove";
import { BookingsInterface } from "../models/IBooking";
import { BorrowsInterface } from "../models/IBorrow";
import { BuildingsInterface } from "../models/IBuilding";
import { Food_and_DrinksInterface } from "../models/IFood_and_Drink";
import { PaybacksInterface } from "../models/IPayback";
import { RoomsInterface } from "../models/IRoom";
import { SigninInterface } from "../models/ISignin";
import { UsersInterface } from "../models/IUser";
import { Add_friendInterface } from "../models/IAdd_friend";
import { DevicesInterface } from "../models/IDevice";
import { Order_foodInterface } from "../models/IOrder_food";

const apiUrl = "http://localhost:8080";

async function Login(data: SigninInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  console.log(data)
  let res = await fetch(`${apiUrl}/login`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.id);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
///////////////////////////////////////////////////////////////
///////////////////    Booking    /////////////////////////////
///////////////////////////////////////////////////////////////
async function ListBookings() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    
  
    let res = await fetch(`${apiUrl}/bookings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
}

async function CreateBooking(data: BookingsInterface) {
    const requestOptions = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/booking`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {       
          return {data: res.data, status: true};
        } else {     
          return {data: res.error, status: false};
        }
      });
  
    return res;
}

async function GetBooking(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/booking/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}  

async function ListBookingbyRoom(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  if (id === "" || id === undefined) {
    id = "0";
  }
  let res = await fetch(`${apiUrl}/bookings/room/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}  

async function GetBookingbyCode(code: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/booking/code/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetBookingbyCodeThatNotApprove(code: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/notapprove/booking/code/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function ListBookingsThatNotApprove() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/notapprove/bookings`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function GetBookingbyCodeThatApprove(code: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/approve/booking/code/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function ListBookingbyUser(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/bookings/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function UpdateBooking(data: BookingsInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/booking`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function DeleteBooking(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/booking/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}
///////////////////////////////////////////////////////////////
///////////////////    Approve    /////////////////////////////
///////////////////////////////////////////////////////////////

async function CreateApprove(data: ApprovesInterface) {
  const requestOptions = {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/approve`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function ListApproves() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  let res = await fetch(`${apiUrl}/approves`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetApprove(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/approve/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetApprovebyCode(code: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/approve/code/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });}

async function UpdateApprove(data: ApprovesInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/approve`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function DeleteApprove(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/approve/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

///////////////////////////////////////////////////////////////
///////////////////    Approve    /////////////////////////////
///////////////////////////////////////////////////////////////

async function ListRoomsbyBuilding(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  
  let res = await fetch(`${apiUrl}/rooms/building/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListBuildings() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  
  let res = await fetch(`${apiUrl}/buildings`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListObjectives() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/objectives`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetUser(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}  

async function GetUserByStudentID(StudentID: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/User/StudentID/${StudentID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
} 
////////////////////////////////////borrow///////////////////////////////////////////
async function ListBorrows() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/borrows`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateBorrow(data: BorrowsInterface) {
  const requestOptions = {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/borrow`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {status: true ,data: res.data};
      } else {
        return {status: false ,data: res.error};
      }
    });

  return res;
}

async function GetBorrow(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/borrow/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function DeleteBorrow(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/borrow/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

async function UpdateBorrow(data: BorrowsInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/borrow`, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    
    if (res.data) {
      console.log(res.data);
      return {data: res.data, status: true};
    } else {     
      console.log(res.data);
      return {data: res.error, status: false};
    }
    });

  return res;
}

async function GetDevice(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/device/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateDevice(data:  DevicesInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/device`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        
        return {status:true, data:res.data};
      } else {
        return {status:false, data:res.error};
      }
    });

  return res;
}

async function ListDevices() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  let res = await fetch(`${apiUrl}/devices`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function DeleteDevice(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/device/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

async function ListDeviceType() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  let res = await fetch(`${apiUrl}/device_types`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListBrand() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  let res = await fetch(`${apiUrl}/brands`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListTypebyDevice(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  
  let res = await fetch(`${apiUrl}/devices/device_type/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

////////// ////////////////////Payback///// /////////////////////////////

async function ListPaybacks() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/paybacks`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreatePayback(data: PaybacksInterface) {
  const requestOptions = {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/paybacks`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {status: true ,data: res.data};
      } else {
        return {status: false ,data: res.error};
      }
    });

  return res;
}

async function GetPayback(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/payback/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function DeletePayback(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/payback/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

//////////////////////////////////Payback/////////////////

async function ListUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
 

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListOnlyUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
 

  let res = await fetch(`${apiUrl}/onlyuser`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListStatusBooks() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  let res = await fetch(`${apiUrl}/statusBooks`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetStatusBook(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/statusBook/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetRoom(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/room/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListShops() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/shops`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListFoodtypes() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/foodtypes`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateFood_and_Drink(data: Food_and_DrinksInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/food_and_drink`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function ListFood_and_Drinks() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  
  let res = await fetch(`${apiUrl}/food_and_drinks`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateFood_and_Drink(data: Food_and_DrinksInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  

  let res = await fetch(`${apiUrl}/food_and_drink`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        
        return {status:true, data:res.data};
      } else {
        return {status:false, data:res.error};
      }
    });

  return res;
}

async function DeleteFood_and_Drink(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/food_and_drink/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

async function GetFood_and_Drinks(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/food_and_drink/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}  


async function ListGuards() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/guards`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListCompanies() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/companies`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateBuilding(data: BuildingsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/building`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

async function GetBuilding(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/building/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}  

async function CreateRoom(data: RoomsInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/room`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

async function ListTyperooms() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/typerooms`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}


async function ListRooms() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/rooms`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {status: true ,data: res.data};
      } else {
        return {status: false ,data: res.error};
      }
    });

  return res;
}

async function CreateUser(data: UsersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/user`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function GetUserRole() {
  const id = localStorage.getItem('userID')
  const requestOptions = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        localStorage.setItem("role", res.data.Role.Name);  
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateUser(data: UsersInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/user`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        
        return {status:true, data:res.data};
      } else {
        return {status:false, data:res.error};
      }
    });

  return res;
}

async function DeleteUser(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}

async function ListEducationLevels() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/educationlevels`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListRoles() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/roles`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function ListGenders() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}


/***************************** add friend ****************************************************/

async function ListAdd_friends() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

  let res = await fetch(`${apiUrl}/add_friends`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function ListAddFriendByBookingCode(code: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/add_friend/Booking/code/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function CreateAdd_friend(data: Add_friendInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/add_friend`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function DeleteAdd_friend(id: any) {  
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },    
  };

  let res = await fetch(`${apiUrl}/add_friend/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });
    return res;
}

/***************************** Order ****************************************************/

async function ListOrders() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  
  let res = await fetch(`${apiUrl}/order_foods`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetOrderByID(id: any) {
  const requestOptions = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/order_food/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });
    return res;
  }

async function ListOrderByBookingCode(code: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/order_foods/Booking/code/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function CreateOrder(data:  Order_foodInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/order_food`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res; 
}

async function DeleteOrder(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/order_food/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.error};
      }
    });

  return res;
}
async function UpdateOrder(data:  Order_foodInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/order_food`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        
        return {status:true, data:res.data};
      } else {
        return {status:false, data:res.error};
      }
    });

  return res;
}


async function GetObjective(id: any) {
  const requestOptions = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/objective/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

// async function CreateDevice(data: DevicesInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/device`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

async function CreateDevice(data: DevicesInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/device`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}

async function UpdateBuilding(data: BuildingsInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/building`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {status:true, data:res.data};
      } else {
        return {status:false, data:res.data};
      }
    });

  return res;
}

async function DeleteBuilding(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/building/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {status: true,data: res.data};
      } else {
        return {status: false,data: res.data};
      }
    });

  return res;
}

async function UpdateRoom(data: RoomsInterface) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/room`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return {status:true, data:res.data};
      } else {
        return {status:false, data:res.error};
      }
    });

  return res;
}

async function DeleteRoom(id: any) {
  const requestOptions = {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json" 
    },
  };

  let res = await fetch(`${apiUrl}/room/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {       
        return {data: res.data, status: true};
      } else {     
        return {data: res.error, status: false};
      }
    });

  return res;
}



export{
    Login,
    ListBookings, CreateBooking, GetBooking, ListBookingbyRoom, GetBookingbyCode, GetBookingbyCodeThatNotApprove, ListBookingbyUser,
    GetBookingbyCodeThatApprove, ListBookingsThatNotApprove, UpdateBooking, DeleteBooking,

    CreateApprove, ListApproves, GetApprove, GetApprovebyCode, UpdateApprove, DeleteApprove,

    ListRoomsbyBuilding, GetRoom ,CreateRoom,ListRooms,UpdateRoom, DeleteRoom,

    ListBuildings, GetBuilding, CreateBuilding, UpdateBuilding, DeleteBuilding,

    ListObjectives, GetObjective,

    GetUser, ListUsers, CreateUser, ListRoles, ListEducationLevels, ListGenders,GetUserRole, UpdateUser, DeleteUser, ListOnlyUsers,

    ListFoodtypes, ListShops, CreateFood_and_Drink, ListFood_and_Drinks, UpdateFood_and_Drink, DeleteFood_and_Drink, GetFood_and_Drinks,

    ListBorrows, CreateBorrow, GetBorrow,DeleteBorrow,UpdateBorrow,

    GetDevice,UpdateDevice,DeleteDevice,ListDevices,ListTypebyDevice,ListDeviceType,

    CreatePayback,ListPaybacks,GetPayback,DeletePayback,
    
    ListStatusBooks, GetStatusBook,

    ListGuards,ListCompanies, ListTyperooms,

    ListAdd_friends,CreateAdd_friend,DeleteAdd_friend,ListAddFriendByBookingCode,

    ListOrders,CreateOrder,DeleteOrder,CreateDevice,ListBrand,ListOrderByBookingCode,GetOrderByID,UpdateOrder,GetUserByStudentID
}