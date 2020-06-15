// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin'
import fetch, { Request, Headers } from 'node-fetch'

import { ApiUrl } from './data-provider'

const authProvider = {
  login: ({ social, username, password, code, state }) => {
    if (username && password) {
      const request = new Request(`${ApiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      return fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .then(({ token }) => {
          window.localStorage.setItem('token', token)
        })
    } else if (social && !username && !password && !code && !state) {
      // 1 redirect to social login:
      if (social !== 'yandex') {
        // as for now - only Yandex login in supported:
        throw new Error('Only Yandex is supported')
      }
      window.location =
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.REACT_APP_SOCIAL_YANDEX_APP}` +
        `&redirect_uri=${encodeURIComponent(process.env.REACT_APP_URL + '/#/login')}&state=app`
    } else if (!username && !password && code && state) {
      console.log('Code grabbed!')
      console.log(code)
      // login via server to get JWT with social login
      const request = new Request(`${ApiUrl}/auth/social/yandex`, {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      return fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .then(({ token }) => {
          window.localStorage.setItem('token', token)
        })
    }
  },
  logout: () => {
    window.localStorage.removeItem('token')
    return Promise.resolve()
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    window.localStorage.getItem('token') ? Promise.resolve() : Promise.reject(Error('no auth')),
  getPermissions: () => Promise.reject(Error('Unknown method'))
}

export default authProvider

/*
export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params
    const options = {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: { 'Content-Type': 'application/json' }
    }

    return fetch(`${ApiUrl}/auth/login`, options)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ token }) => {
        window.localStorage.setItem('token', token)
        console.log(`auth ok, token ${token}`)
      })
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    // return fetch(`${ApiUrl}/auth/logout`, options)
    //   .then(response => {
    //     if (response.status < 200 || response.status >= 300) {
    //       throw new Error(response.statusText)
    //     }
    window.localStorage.removeItem('token')
    return Promise.resolve()
    // })
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params
    if (status === 401 || status === 403) {
      window.localStorage.removeItem('token')
      return Promise.reject(new Error('Auth error'))
    }
    return Promise.resolve()
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return window.localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject(new Error('No auth'))
  }
  if (type === AUTH_GET_PERMISSIONS) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Unknown method'))
}
*/
