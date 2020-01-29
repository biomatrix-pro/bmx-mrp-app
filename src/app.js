import React from 'react'
import { Admin, Resource, Login, Layout, AppBar } from 'react-admin'
import { useSelector } from 'react-redux'
import dataProvider from './core/data-provider'
import { UserList, UserCreate, UserEdit } from './resources/users'
import { UserGroupCreate, UserGroupEdit, UserGroupList } from './resources/user-groups'

import UserIcon from '@material-ui/icons/Person'
import UserGroupIcon from '@material-ui/icons/Group'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

import Dashboard from './forms/dashboard'
import authProvider from './core/auth-provider'
import MyMenu from './ui/my-menu'
import { Route } from 'react-router-dom'
import themeReducer from './core/theme-reducer'
import { darkTheme, lightTheme } from './core/themes'
import { ThemeName } from './core/actions'

import {
  ProductList, ProductCreate, ProductEdit,
  DeployEventList, DeployEventEdit
} from './resources/mrp'

const MyLoginPage = () => <Login backgroundImage='https://loremflickr.com/1024/768/computers' />
const MyAppBar = props => <AppBar {...props} userMenu={<MyMenu />} />
const MyLayout = props => {
  const theme = useSelector((state) =>
    state.theme === ThemeName.dark ? darkTheme : lightTheme
  )

  return (
    <Layout
      {...props}
      appBar={MyAppBar}
      theme={theme}
    />
  )
}
const MyRoutes = [
  <Route key='1' exact path='/signup' component={UserCreate} />
]

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={MyLoginPage}
    layout={MyLayout}
    customRoutes={MyRoutes}
    customReducers={{ theme: themeReducer }}
  >
    <Resource
      name='Product'
      options={{ label: 'Products' }}
      list={ProductList}
      icon={AccountTreeIcon}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <Resource
      name='DeployEvent'
      options={{ label: 'Deploy events' }}
      list={DeployEventList}
      icon={LibraryBooksIcon}
      edit={DeployEventEdit}
    />
    <Resource
      name='user'
      options={{ label: 'Users' }}
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      icon={UserIcon}
    />
    <Resource
      name='usergroup'
      options={{ label: 'User groups' }}
      list={UserGroupList}
      icon={UserGroupIcon}
      edit={UserGroupEdit}
      create={UserGroupCreate}
    />
  </Admin>
)

export default App
