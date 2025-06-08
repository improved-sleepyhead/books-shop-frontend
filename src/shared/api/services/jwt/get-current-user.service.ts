import { parseJwt, JwtPayload } from './parse-jwt.service'

export const getAccessTokenFromCookies = (reqHeaders: { cookie?: string }): string | null => {
  const cookies = reqHeaders.cookie?.split('; ') || []
  const accessTokenCookie = cookies.find((c) => c.startsWith('accessToken='))
  if (!accessTokenCookie) return null

  return decodeURIComponent(accessTokenCookie.split('=')[1])
};

export const getUserFromJwt = (reqHeaders: { cookie?: string }): JwtPayload | null => {
  const accessToken = getAccessTokenFromCookies(reqHeaders)
  if (!accessToken) return null

  return parseJwt(accessToken)
};