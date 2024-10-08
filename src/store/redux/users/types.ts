export interface UserAuthSliceState {
  currentUser: UserObject | undefined
  accessToken: string | undefined
  role: string | undefined
  error: string | undefined
  isPending: boolean
}

export interface UserObject {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
}

export interface LoginData {
  email: string
  password: string
}
