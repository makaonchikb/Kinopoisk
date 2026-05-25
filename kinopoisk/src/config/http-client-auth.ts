import axios from 'axios'
import { baseUrlTMS } from './api'
import { API } from './api'
import { store } from '../redux/store'
import { jwtApi } from '../utils/jwt'
import { refreshToken } from '../redux/auth-slice'

export const authHttpClient = axios.create({
  baseURL: baseUrlTMS
})

authHttpClient.interceptors.request.use(async (config) => {
  const url = config.url || ""

  const noAuthNeeded = [
    API.authUsers,
    API.authUsersActivate,
    API.authSignIn,
  ]

  if (noAuthNeeded.includes(url)) {
    return config
  }

  if (url === API.authRefreshToken) {
    return config
  }

  let { jwt } = store.getState().auth

  if (jwt) {
    if (jwtApi.isAccessTokenExpired(jwt.access)) {
      try {
        await store.dispatch(refreshToken({ refresh: jwt.refresh }))
        jwt = store.getState().auth.jwt
      } catch {
        jwt = null
      }
    }

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt.access}`
    }
  }

  return config
})

export const getAuth = (url: string) => authHttpClient.get(url)
export const postAuth = (url: string, data?: any) => authHttpClient.post(url, data)
