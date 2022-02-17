import React, { Suspense, useEffect } from 'react'
import AppRouter from './Components/Router/Router'
import Navbar from './Components/Pages/Navbar'
import { getCookie, REQUEST_URL } from './constants'
import { setGlobal } from 'reactn'
import { IGlobalStore, initStore } from './hooks/appContext'
import { Spinner } from 'reactstrap'

initStore().then(async () => {
  const token = getCookie('token')

  if (token) {
    await fetch(REQUEST_URL + '/auth/authorize', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const data = await res.json()
      if (data.message === 'OK') {
        await setGlobal<IGlobalStore>({
          auth: {
            isRoot: data.isRoot,
            isAuthenticated: true,
          },
        })
      } else {
        await setGlobal<IGlobalStore>({
          auth: {
            isRoot: false,
            isAuthenticated: false,
          },
        })
      }
    })
  } else {
    await setGlobal<IGlobalStore>({
      auth: {
        isRoot: false,
        isAuthenticated: false,
      },
    })
  }
})

function App() {
  return (
    <Suspense fallback={<Spinner size="sm" color="primary" />}>
      <AppRouter>
        <Navbar />
      </AppRouter>
    </Suspense>
  )
}

export default App
