import { createAppSlice } from "store/createAppSlice"
import { UsersSliceState } from "./types"
import axiosConfig from "../../../../axiosConfig"

const usersInitialState: UsersSliceState = {
  currentUser: undefined,
  users: [],
  totalPages: 3,
  error: undefined,
  isPending: false,
}

export const allUsersSlice = createAppSlice({
  name: "USERS",
  initialState: usersInitialState,
  reducers: create => ({
    getUsers: create.asyncThunk(
      async () => {
        const response = await axiosConfig.get(`/api/users`)
        return response.data
      },
      {
        pending: (state: UsersSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: UsersSliceState, action) => {
          state.isPending = false
          state.users = action.payload
          // state.totalPages = action.payload.totalPages
        },
        rejected: (state: UsersSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    deleteUser: create.asyncThunk(async (userID: number| undefined) => {
      const response = await axiosConfig.delete(`/api/users/${userID}`)
      return response.data
    },
    {
      pending: (state: UsersSliceState) => {
        state.error = undefined
        state.isPending = true
      },
      fulfilled: (state: UsersSliceState, action) => {
        state.isPending = false
        state.users = state.users.filter(u => u.id!== action.payload.id)
      },
      rejected: (state: UsersSliceState, action) => {
        state.error = action.error.message
        state.isPending = false
      },
    }),
  }),
  selectors: {
    usersState: (state: UsersSliceState) => state,
  },
})

export const usersAction = allUsersSlice.actions
export const usersSelectors = allUsersSlice.selectors
