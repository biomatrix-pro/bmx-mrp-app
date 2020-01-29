import React, { forwardRef } from 'react'
import { UserMenu, MenuItemLink } from 'react-admin'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const ConfigurationMenu =
  // eslint-disable-next-line react/display-name,react/prop-types
  forwardRef(({ onClick }, ref) => (
    <MenuItemLink
      ref={ref}
      to='/user/create'
      primaryText='Sign-up'
      leftIcon={<PersonAddIcon />}
      onClick={onClick} // close the menu on click
    />
  ))

const MyMenu = props => (<UserMenu {...props}><ConfigurationMenu /></UserMenu>)

export default MyMenu
