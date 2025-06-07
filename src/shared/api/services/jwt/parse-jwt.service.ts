export interface JwtPayload {
  email: string
  name:string
  exp: number
  iat: number
};

export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) throw new Error('Invalid JWT format')

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload) as JwtPayload
  } catch (error) {
    console.error('JWT parsing error:', error)
    return null
  }
};