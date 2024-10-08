import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { UserAuthSliceState, LoginData } from "./types"

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
        const response = await axios.post(
          `/api/users/register`,
          {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password,
            phone: payload.phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        return response.data
      },
      {
        pending: (state: UserAuthSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: UserAuthSliceState, action) => {
          state.isPending = false

          state.currentUser = action.payload
          state.accessToken = action.payload.accessToken
        },
        rejected: (state: UserAuthSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    loginUser: create.asyncThunk(
      async (payload: LoginData) => {
        const response = await axios.post(
          `/api/auth/login`,
          {
            username: payload.email,
            password: payload.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

        return response.data
      },
      {
        pending: (state: UserAuthSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: UserAuthSliceState, action) => {
          state.isPending = false
          state.currentUser = action.payload.user
          state.accessToken = action.payload.token.accessToken

        },
        rejected: (state: UserAuthSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
          console.log(action.payload)
        },
      },
    ),
    getUserProfile: create.asyncThunk(
      async (state: UserAuthSliceState) => {
        const response = await axios.get(`/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
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
          state.currentUser = action.payload
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
