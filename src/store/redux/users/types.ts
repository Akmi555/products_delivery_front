export interface UserAuthSliceState {
  currentUser: CurrentUser | undefined
  accessToken: string | undefined
  role: string | undefined
  error: string | undefined
  isPending: boolean
}

export interface CurrentUser {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  roles: Role[]
}

export interface LoginData {
  email: string
  password: string
}

export interface Role {
  id: number
  title: string
  authority: string
}
