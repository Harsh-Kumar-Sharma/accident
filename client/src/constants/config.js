
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
  }
};