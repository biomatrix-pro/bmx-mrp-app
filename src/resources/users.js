import React from 'react'
import PropTypes from 'prop-types'
import {
  Filter,
  TextInput,
  BooleanInput,
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  Create, Edit, SimpleForm, required, PasswordInput
} from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import { FormStyles } from './form-styles'

const useStyles = makeStyles(FormStyles)

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    <TextInput label='Name' source='name' />
    <TextInput label='E-mail' source='email' />
    <BooleanInput label='Disabled' source='disabled' />
  </Filter>
)

const UserForm = (props) => {
  const classes = useStyles()

  return (
    <SimpleForm {...props}>
      <TextInput disabled label='Id' className={classes.wide35} source='id' />
      <TextInput source='name' className={classes.wide35} validate={required()} />
      <TextInput source='email' className={classes.wide35} validate={required()} />
      <PasswordInput source='password' className={classes.wide35} validate={required()} />
    </SimpleForm>
  )
}

export const UserCreate = (props) => (
  <Create resource={props.resource || 'user'} basePath={props.basePath || '/user'} {...props}>
    <UserForm {... props} />
  </Create>
)

UserCreate.propTypes = {
  resource: PropTypes.string,
  basePath: PropTypes.string
}

export const UserEdit = (props) => (
  <Edit {...props}>
    <UserForm />
  </Edit>
)

export const UserList = props => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid rowClick='edit'>
      <TextField source='name' />
      <EmailField source='email' />
      <BooleanField source='disabled' />
    </Datagrid>
  </List>
)
