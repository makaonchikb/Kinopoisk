import { postAuth,getAuth} from '../config/http-client-auth'
import { API } from '../config/api'
import { ActivateData, SignInData, SignUpData, JwtModel, AboutUserData } from '../types/types'

export async function requestSignIn(data: SignInData) {
    const response = await postAuth(API.authSignIn, data)
    return response.data
}

export async function requestSignUp(data: SignUpData) {
    const response = await postAuth(API.authUsers,{
        course_group: 20,
        ...data,
    })
    return response.data
}

export async function requestActivateUser(data: ActivateData) {
    const response = await postAuth(API.authUsersActivate,data)
    return response.data
}

export const requestRefreshToken = async (data: Pick<JwtModel, 'refresh'>): Promise<JwtModel> => {
  const response = await postAuth(API.authRefreshToken, data)
  return response.data
}

export const requestAboutUser = async (): Promise<AboutUserData> => {
  const response = await getAuth(API.authAboutMe)
  return response.data
}