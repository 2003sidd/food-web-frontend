import { post } from "../api/api";
import type { GenericResponseType } from "../types/genricResponse.types";
import type { LoginRequest } from "../types/loginRequest.types";
import type { LoginResponse } from "../types/loginResponse.types";
import type { registerInterface } from "../types/registerRequest.types";

export const loginUser = (credentials: LoginRequest) => {
  return post<LoginRequest, LoginResponse>('/api/user/login', credentials);
};


export const register = (credentials: registerInterface) => {
  return post<registerInterface, GenericResponseType<LoginResponse>>('/api/user/register', credentials);
};

