
export const CLIENT_URL = "http://localhost:8080";
export const BASE_URL = "http://localhost:3000";
export const SOCKET_URL = "http://localhost:3000";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SESSION: "/api/auth/session",
  },
  LOCATION_ZONE: {
    GET:'/api/location/zone/get'
  },
  REASONS_OF_ACCIDENTS:{
    GET:'/api/reason/get'
  },
  Graph:{
    DASHBOARD:'/api/accident/getDashboardData'
  },
  users:{
    create:'/api/user/createUser',
    getRoles:'/api/user/getRoles',
    getUser:'/api/user',
     update: (id)=>{ return `/api/user/update/${id}`},
      delete:(id)=>{ return `/api/user/${id}`}
  },
  vehicleType:{
    create:"/api/vehicleType",
    update: (id)=>{ return `/api/vehicleType/${id}`},
    delete:(id)=>{ return `/api/vehicleType/${id}`},
    get:"/api/vehicleType",
  },
  vehicleCategory:{
    create:"/api/vehicleCategory",
    update:(id)=>{ return `/api/vehicleCategory/${id}`},
    delete:(id)=>{ return `/api/vehicleCategory/${id}`},
    get:"/api/vehicleCategory",
  },
  timeOfDays:{
    create:"/api/timeOfDay",
    update:(id)=>{ return `/api/timeOfDay/${id}`},
    delete:(id)=>{ return `/api/timeOfDay/${id}`},
    get:"/api/timeOfDay",
  },
  reasonOfAccident:{
    create:"/api/reason",
    update:(id)=>{ return `/api/reason/${id}`},
    delete:(id)=>{ return `/api/reason/${id}`},
    get:"/api/reason",
  },
  sourceOfInformation:{
    create:"/api/sourceOfInformation",
    update:(id)=>{ return `/api/sourceOfInformation/${id}`},
    delete:(id)=>{ return `/api/sourceOfInformation/${id}`},
    get:"/api/sourceOfInformation",
  },
  accident:{
    create:'/api/accident/create',
     getAccident:'/api/accident/getAll',
     getAccidentById:(id)=>{return `/api/accident/${id}`},
     update:(id)=>{return `/api/accident/${id}`}
  }
};