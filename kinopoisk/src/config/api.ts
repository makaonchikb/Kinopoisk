export const baseUrlKinopoisk = 'https://kinopoiskapiunofficial.tech'
export const baseUrlTMS = 'https://studapi.teachmeskills.by'

const filmsEndpoint = '/api/v2.2/films'
const filmsFiltersEndpoint = '/api/v2.2/films/filters'
const filmsTopEndpoint = '/api/v2.2/films/top'
const filmsSearchEndpoint = '/api/v2.2/films'
const staffEndpoint = '/api/v1/staff'
const similarEndpoint = '/api/v2.2/films'

const authSignInEndpoint = '/auth/jwt/create/'
const authUsersEndpoint = '/auth/users/'
const authUsersActivateEndpoint = '/auth/users/activation/'
const authRefreshTokenEndpoint = '/auth/jwt/refresh/'
const authAboutMeEndpoint = '/auth/users/me'

export const API = {
  films: filmsEndpoint,
  filmsFilters: filmsFiltersEndpoint,
  filmsTop: filmsTopEndpoint,
  filmsSearch: filmsSearchEndpoint,
  staff: staffEndpoint,
  similar: similarEndpoint,
  
  authSignIn: authSignInEndpoint,
  authUsers: authUsersEndpoint,
  authUsersActivate: authUsersActivateEndpoint,
  authRefreshToken: authRefreshTokenEndpoint,
  authAboutMe: authAboutMeEndpoint,
}
