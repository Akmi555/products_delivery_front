export interface UsersSliceState {
  currentUser: UserObject | undefined
  users: UserObject[]
  totalPages: number
  error: string | undefined
  isPending: boolean
}

export interface UserObject {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  roles: Role[]
}

export interface Role {
  id: number
  title: string
  authority: string
}
