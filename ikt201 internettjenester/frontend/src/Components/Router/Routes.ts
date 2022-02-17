import React from 'react'
import { RouteComponentProps } from 'react-router'

const HomePage = React.lazy(() => import('../Page/HomePage'))
const LoginPage = React.lazy(() => import('../Page/LoginPage'))
const RegisterPage = React.lazy(() => import('../Page/RegisterPage'))
const CategoryPage = React.lazy(() => import('../Page/CategoryPage'))
const PostsPage = React.lazy(() => import('../Page/PostsPage'))
const LogoutPage = React.lazy(() => import('../Page/LogoutPage'))
const SellerPageBase = React.lazy(() => import('../Page/SellerPageBase'))
const ProfilePage = React.lazy(() => import('../Page/ProfilePage'))
const PostPage = React.lazy(() => import('../Page/PostPage'))
const ReportingPage = React.lazy(() => import('../Page/ReportingPage'))
const ModeratorPanel = React.lazy(() => import('../Page/ModeratorPanel'))
const PanelCategoriesPage = React.lazy(
  () => import('../Page/ModeratorPanel/PanelCategoryPage')
)
const PanelSellerRequestsPage = React.lazy(
  () => import('../Page/ModeratorPanel/PanelSellerRequestsPage')
)

export interface IRoute {
  name: string
  path: string | string[]
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  auth: boolean
}

interface IRoutes {
  routes: Array<IRoute>
}

export const routeList = {
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomePage,
      auth: false,
    },
    {
      name: 'Login',
      path: '/account/login',
      component: LoginPage,
      auth: false,
    },
    {
      name: 'Register',
      path: '/account/register',
      component: RegisterPage,
      auth: false,
    },
    {
      name: 'Logout',
      path: '/account/logout',
      component: LogoutPage,
      auth: false,
    },
    {
      name: 'Categories',
      path: '/categories',
      component: CategoryPage,
      auth: false,
    },
    {
      name: 'Posts',
      path: '/category/:slug',
      component: PostsPage,
      auth: false,
    },
    {
      name: 'BecomeASeller',
      path: '/become-a-seller',
      component: SellerPageBase,
      auth: true,
    },
    {
      name: 'Profile',
      path: '/account/profile/:profileId?',
      component: ProfilePage,
      auth: false,
    },
    {
      name: 'Post',
      path: '/post/:slug',
      component: PostPage,
      auth: false,
    },
    {
      name: 'ReportingPage',
      path: '/reporting',
      component: ReportingPage,
      auth: true,
    },
    {
      name: 'ModeratorPanel',
      path: '/panel',
      component: ModeratorPanel,
      auth: true,
    },
    {
      name: 'ModeratorPanelCategories',
      path: '/panel/categories',
      component: PanelCategoriesPage,
      auth: true,
    },
    {
      name: 'ModeratorPanelSellerRequests',
      path: '/panel/seller-requests',
      component: PanelSellerRequestsPage,
      auth: true,
    },
  ],
} as IRoutes
