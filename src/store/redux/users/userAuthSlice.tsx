import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { UserAuthSliceState } from "./types"

const userAuthInitialState: UserAuthSliceState = {
  currentUser: undefined,
  accessToken: undefined,
  error: undefined,
  isPending: false,
}

export const userAuthSlice = createAppSlice({
  name: "USERAUTH",
  initialState: userAuthInitialState,
  reducers: create => ({
    registrUser: create.asyncThunk(
      async (payload: any) => {
        const response = await axios.post(`/api/users`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password,
            phoneNumber: payload.phoneNumber,
          },
        })
        return response.data
      },
      {
        pending: (state: UserAuthSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: UserAuthSliceState, action) => {
          state.isPending = false
          //   указать правильные пути!!!
          state.currentUser = action.payload.content
          state.accessToken = action.payload.content.accessToken
        },
        rejected: (state: UserAuthSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    loginUser: create.asyncThunk(
      async (payload: any) => {
        const response = await axios.post(`api/auth/login`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            userName: payload.email,
            password: payload.password,
          },
        })
        return response.data
      },
      {
        pending: (state: UserAuthSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: UserAuthSliceState, action) => {
          state.isPending = false
          //   указать правильные пути!!!
          state.currentUser = action.payload.content
          state.accessToken = action.payload.content.accessToken
        },
        rejected: (state: UserAuthSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
  }),
  selectors: {
    userAuthState: (state: UserAuthSliceState) => state,
  },
})

export const userAuthAction = userAuthSlice.actions
export const userAuthSelectors = userAuthSlice.selectors
