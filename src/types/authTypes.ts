export interface SignupRequest {
  username: string
  email: string
  password: string
}

export interface SignupResponse {
  id: string
  username: string
  email: string
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  username: string
  email: string
  password: string
}