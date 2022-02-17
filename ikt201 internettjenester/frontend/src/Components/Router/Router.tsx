import React, { ReactChildren, ReactElement, useEffect } from 'react'
import { routeList } from './Routes'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { IGlobalStore } from '../../hooks/appContext'
import { useGlobal } from 'reactn'

interface IAppRouter {
  children: ReactChildren | ReactElement | Array<ReactElement>
}

function AppRouter(props: IAppRouter) {
  const { children } = props
  const [globalState] = useGlobal<IGlobalStore>('auth')
  const routes = routeList.routes

  return (
    <Router>
      {children}
      <Switch>
        {routes.map((route, k) => {
          const Component = route.component
          return (
            <Route
              path={route.path}
              exact={true}
              sensitive={false}
              strict={true}
              key={k}
              render={(props) => {
                if (
                  (route.name === 'Login' || route.name === 'Register') &&
                  globalState.isAuthenticated
                ) {
                  return <Redirect to={'/'} />
                } else if (
                  (route.name === 'Profile' || route.name === 'Logout') &&
                  !globalState.isAuthenticated
                ) {
                  return <Redirect to={'/'} />
                } else if (
                  (route.path.includes('panel') &&
                    !globalState.isAuthenticated) ||
                  (route.path.includes('panel') && !globalState.isRoot)
                ) {
                  return <Redirect to={'/'} />
                } else if (route.auth && !globalState.isAuthenticated) {
                  return <Redirect to={'/account/login'} />
                }

                return <Component {...props} />
              }}
            />
          )
        })}
      </Switch>
    </Router>
  )
}

export default AppRouter
