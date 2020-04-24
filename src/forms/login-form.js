import React, { useState } from 'react'
import { Login, LoginForm } from 'react-admin'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'

export const MyLoginPage = ({ classes, userLogin }) => {
  return (
    <Login backgroundImage='https://loremflickr.com/1024/768/computers'>
      <LoginForm />
      <Divider variant="middle" />
      <CardActions>
        <Button variant='contained' color='primary' fullWidth>Login with Yandex</Button>
      </CardActions>
    </Login>
  )
}
