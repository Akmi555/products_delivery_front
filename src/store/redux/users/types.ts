export interface UserAuthSliceState {
  currentUser: UserObject | undefined
  accessToken: string | undefined
  error: string | undefined
  isPending: boolean
}

export interface UserObject {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
}
