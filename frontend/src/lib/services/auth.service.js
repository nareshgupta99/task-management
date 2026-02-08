import api from "@/lib/axios";

export const AuthService = {
  login: (data) => api.post("http://localhost:8080/api/auth/login",data),
 
};

