import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignInData, AuthState, JwtModel, SignUpData, UserModel, ActivateData, AboutUserData } from '../types/types'
import { requestActivateUser, requestSignIn,requestSignUp, requestRefreshToken, requestAboutUser} from '../services/auth.ts'
import { jwtApi } from '../utils/jwt'

export const fetchSignUp = createAsyncThunk('auth/fetchSignUp', async (formData: SignUpData, { rejectWithValue }) => {
  try {
    const user = await requestSignUp(formData)
    return user
  } catch (error) {
    return rejectWithValue(error as Error)
  }
})

export const fetchSignIn = createAsyncThunk('auth/SignIn', async (data: SignInData, { rejectWithValue }) => {
    try {
        const jwt = await requestSignIn(data)
        if (jwt) {
            jwtApi.saveToLocalStorage(jwt)
        }
        return jwt
    } catch (error) {
        return rejectWithValue(error as Error)
    }
})

export const activateUser = createAsyncThunk('auth/activateUser', async (data: ActivateData, { rejectWithValue }) => {
    try {
     await requestActivateUser(data)
    } catch (error) {
        return rejectWithValue(error as Error)
    }
})

export const refreshToken = createAsyncThunk('auth/refreshToken', async (data: Pick<JwtModel, 'refresh'>, { rejectWithValue }) => {
  try {
    const token = await requestRefreshToken(data)

    if (token) {
      jwtApi.updateAccessTokenLocalStorage(token.access)
    }
    return token
  } catch (error) {
    return rejectWithValue(error as Error)
  }
})

export const fetchAboutUser = createAsyncThunk('auth/fetchAboutUser', async (_, { rejectWithValue }) => {
  try {
    const user = await requestAboutUser()
    return user
  } catch (error) {
    return rejectWithValue(error as Error)
  }
})

const initialState: AuthState = {
    user: null,
    jwt: jwtApi.getFromLocalStorage(),
    AboutUser: null,
    isActivated: false,
    error: false,
    loading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       logoutUser: (state: AuthState) => {
            state.user = null
            state.jwt = null
            state.isActivated = false
            state.AboutUser = null
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchSignUp.pending, (state: AuthState) => {
            state.loading = true
        })
        builder.addCase(fetchSignUp.fulfilled, (state: AuthState, action: PayloadAction<UserModel>) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(fetchSignUp.rejected, (state: AuthState) => {
            state.loading = false
            state.error = true
        })

        builder.addCase(fetchSignIn.pending, (state: AuthState) => {
            state.loading = true
        })
        builder.addCase(fetchSignIn.fulfilled, (state: AuthState, action: PayloadAction<JwtModel>) => {
            state.loading = false
            state.jwt = action.payload
        })
        builder.addCase(fetchSignIn.rejected, (state: AuthState) => {
            state.loading = false
            state.error = true
        })

        builder.addCase(activateUser.pending, (state: AuthState) => {
            state.loading = true
        })
        builder.addCase(activateUser.fulfilled, (state: AuthState) => {
            state.loading = false
            state.isActivated = true
        })
        builder.addCase(activateUser.rejected, (state: AuthState) => {
            state.loading = false
            state.error = true
        })

        builder.addCase(fetchAboutUser.pending, (state: AuthState) => {
            state.loading = true
        })
        builder.addCase(fetchAboutUser.fulfilled, (state: AuthState,action : PayloadAction<AboutUserData>) => {
            state.loading = false
            state.AboutUser = action.payload
        })
        builder.addCase(fetchAboutUser.rejected, (state: AuthState) => {
            state.loading = false
            state.error = true
        })
    },
})

export const { logoutUser } = authSlice.actions
export const authReducer = authSlice.reducer