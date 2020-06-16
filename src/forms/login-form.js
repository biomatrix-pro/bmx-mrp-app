import React, { useState, useEffect } from 'react'
import { Login, LoginForm, useLogin, useNotify } from 'react-admin'
import { useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import qs from 'qs'

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))

export const MyLoginPage = () => {
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const userLogin = useLogin()
  const location = useLocation()
  const notify = useNotify()

  useEffect(() => {
    // const { searchParams } = new URL(window.location.href)
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })

    console.log(params)
    const code = params.code
    const state = params.state

    // If code is present, we came back from the provider
    if (code && state) {
      setLoading(true)
      userLogin({ code, state })
        .catch((e) => {
          setLoading(false)
          console.log('ERROR:')
          console.log(e)
          notify('Login error', 'warning')
        })
    }
  }, [userLogin, notify, location.search])

  const handleLogin = () => {
    setLoading(true)
    userLogin({ social: 'yandex' }) // Do not provide code, just trigger the redirection
  }

  return (
    <Login backgroundImage='https://loremflickr.com/1024/768/computers'>
      <LoginForm />
      <Divider variant='middle' />
      <CardActions>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleLogin}
          disabled={loading}
          fullWidth
        >
          {loading && (
            <CircularProgress
              className={classes.icon}
              size={18}
              thickness={2}
            />
          )}
          Login with Yandex
        </Button>
      </CardActions>
    </Login>
  )
}
