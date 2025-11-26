export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  token: string;
}
export interface UserData {
  user: {
    usr_id: number;
    usr_fname: string;
    usr_lname: string;
    usr_username: string;
    usr_email: string;
    usr_profile_img: string;
    role: string;
    [key: string]: any;
  };
  token: string;
}
export interface ApiResponse {
  success: boolean;
  message: string;
  data: UserData | { user_email_unverified?: number };
}
export interface AuthState {
  loading: boolean;
  error: string | null;
  user: UserData | null;
}
