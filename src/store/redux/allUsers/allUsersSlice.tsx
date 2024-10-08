import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { UserObject, UsersSliceState } from "./types"

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
      async (payload: any) => {
        const response = await axios.get(
          `/api/users`,
          {
            headers: { Authorization: `Bearer ${payload.accessToken}`  },
          },
        )
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
  }),
  selectors: {
    usersState: (state: UsersSliceState) => state,
  },
})

export const usersAction = allUsersSlice.actions
export const usersSelectors = allUsersSlice.selectors
