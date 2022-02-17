import { setGlobal } from 'reactn'

export interface IGlobalStore {
  auth: {
    isAuthenticated: boolean
    isRoot: boolean
  }
}

export const initStore = () => {
  return new Promise((resolve) => {
    setGlobal<IGlobalStore>({
      auth: {
        isAuthenticated: false,
        isRoot: false,
      },
    })

    resolve()
  })
}
