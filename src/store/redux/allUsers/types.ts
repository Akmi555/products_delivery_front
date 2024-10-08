export interface UsersSliceState {
    currentUser: UserObject | undefined
    users: UserObject[]
    totalPages: number
    error: string | undefined
    isPending: boolean
  }

  export interface UserObject{
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    phone: string
    roles: string
  }