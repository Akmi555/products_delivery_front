import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { UserAuthSliceState, LoginData } from "./types"
import axiosConfig from "../../../../axiosConfig"

const userAuthInitialState: UserAuthSliceState = {
  currentUser: undefined,
  accessToken: localStorage.getItem("accessToken") ?? undefined,
  role: undefined,
  error: undefined,
  isPending: false,
}

export const userAuthSlice = createAppSlice({
  name: "USERAUTH",
  initialState: userAuthInitialState,
  reducers: create => ({
    register: create.asyncThunk(
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
    login: create.asyncThunk(
      async (payload: LoginData) => {
        const response = await axios.post(`/api/auth/login`, {
          username: payload.email,
          password: payload.password,
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
          state.currentUser = action.payload.user
          state.accessToken = action.payload.token.accessToken
          // !
          localStorage.setItem("accessToken", action.payload.token.accessToken)
          state.role = action.payload.user.roles[0].authority
        },
        rejected: (state: UserAuthSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    getUser: create.asyncThunk(
      async () => {
        const response = await axiosConfig.get(`/api/auth/profile`)
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
          state.role = action.payload.roles[0].authority
        },
        rejected: (state: UserAuthSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    logOut: create.reducer((state: UserAuthSliceState) => {
      state.currentUser = undefined
      state.accessToken = undefined
      state.role = undefined
      state.error = undefined
    }
      ),
  }),
  selectors: {
    userAuthState: (state: UserAuthSliceState) => state,
  },
})

export const userAuthAction = userAuthSlice.actions
export const userAuthSelectors = userAuthSlice.selectors
