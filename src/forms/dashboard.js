import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { CHANGE_THEME, ThemeName } from '../core/actions'
import { Welcome } from './welcome'
import { Title } from 'react-admin'

const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme
})

const useStyles = makeStyles({
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '0.5em' },
  rightCol: { flex: 1, marginLeft: '0.5em' },
  singleCol: { marginTop: '1em', marginBottom: '1em', maxWidth: '900px' }
})

const Dashboard = () => {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <>
      <div className={classes.flexColumn}>
        <div className={classes.singleCol}>
          <Welcome />
        </div>
        <div className={classes.singleCol}>
          <Card>
            <Title title='Выбор темы' />
            <CardContent>
              <div className={classes.label}>
              Тема:
              </div>
              <Button
                variant='contained'
                className={classes.button}
                color={theme === 'light' ? 'primary' : 'default'}
                onClick={() => dispatch(changeTheme(ThemeName.light))}
              >
              Светлая
              </Button>
              <Button
                variant='contained'
                className={classes.button}
                color={theme === 'dark' ? 'primary' : 'default'}
                onClick={() => dispatch(changeTheme(ThemeName.dark))}
              >
              Тёмная
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Dashboard
