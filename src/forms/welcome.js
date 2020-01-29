import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslate } from 'react-admin'
import Logo from './logo512.png'

const useStyles = makeStyles({
  media: {
    height: '18em'
  }
})

export const Welcome = () => {
  const translate = useTranslate()
  const classes = useStyles()
  return (
    <Card>
      <CardMedia image={Logo} className={classes.media} />
      <CardContent>
        <Typography variant='h5' component='h2'>
          Добро пожаловать в Biomatrix.pro MRP app!
        </Typography>
        <Typography component='p'>
          Планирование производства
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button href='http://biomatrix.pro'>
          <HomeIcon style={{ paddingRight: '0.5em' }} />
          biomatrix.pro
        </Button>
      </CardActions>
    </Card>
  )
}

export default Welcome
