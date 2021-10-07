import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserReq } from '../api/getUserReq'
import { checkToken } from "../api/checkToken"

export interface UserType {
  isAuthorized: boolean,
  username: string,
  email: string,
  dob: string,
  password: string,
  role: string
  isTokenChecking: boolean,
  isExists: boolean
}

const initialState: UserType = {
  isAuthorized: true,
  username: '',
  email: '',
  dob: '',
  password: '123456',
  role: '',
  isTokenChecking: false,
  isExists: true
}

export const fetchUser = createAsyncThunk(
  'user/fetchUserStatus',
  async () => {
    const res = await getUserReq()
    return res.data
  }
)

export const fetchToken = createAsyncThunk(
  'user/fetchTokenStatus',
  async () => {
    const res = await checkToken()
    return res.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload
    },
    getRole: (state): any => {
      return state.role
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.dob = action.payload.dob
      state.role = action.payload.role === 1 ? 'User' : 'Admin'
    })
    builder.addCase(fetchUser.pending, (state, action) => {
      state.username = '...'
      state.email = '...'
      state.dob = '...'
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isExists = false
    })
    
    builder.addCase(fetchToken.pending, (state, action) => {
      state.isTokenChecking = true
      console.log('pending')
    })
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.isAuthorized = true
      state.isTokenChecking = false
      console.log('fulfiilled')
    })
    builder.addCase(fetchToken.rejected, (state, action: any) => {
      state.isAuthorized = false
      state.isTokenChecking = false
      console.log('rejected')
    })
  }
})

export const { setUsername, setIsAuthorized, getRole } = userSlice.actions
export default userSlice.reducer