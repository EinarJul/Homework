export const REQUEST_URL = 'http://localhost:3001'
export const LOCAL_URL = 'localhost:3000'
export const IMAGE_NOT_FOUND = process.env.PUBLIC_URL + '/image-not-found.jpg'
export const DEFAULT_USER_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png'

export function getCookie(name: string) {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
