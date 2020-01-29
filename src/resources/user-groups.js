import React from 'react'
import {
  List, Datagrid, TextField, ReferenceArrayField, SelectField,
  SingleFieldList, ChipField, Edit, Create, SimpleForm,
  SelectInput, ReferenceArrayInput, SelectArrayInput, TextInput
} from 'react-admin'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { FormStyles } from './form-styles'

const useStyles = makeStyles(FormStyles)

const systemTypeNone = null
const systemTypeAdmin = 'Admin'
const systemTypeGuest = 'Guest'
const systemTypeLoggedIn = 'LoggedIn'

const choices = [
  { id: systemTypeNone, name: '' },
  { id: systemTypeAdmin, name: '(Administrator)' },
  { id: systemTypeGuest, name: '(Guest)' },
  { id: systemTypeLoggedIn, name: '(Logged-in users)' }
]

/*

const UserGroupTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ''}</span>
}

const UserGroupFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    <ReferenceInput label='User' source='userId' reference='users' allowEmpty alwaysOn>
      <SelectInput optionText='name' />
    </ReferenceInput>
  </Filter>
)
*/

export const UserGroupList = props => (
  <List title='User groups' {...props}/* filters={<UserGroupFilter />} */>
    <Datagrid rowClick='edit'>
      <TextField source='name' label='Name' />
      <SelectField source='systemType' choices={choices} translateChoice={false} />
      <ReferenceArrayField source='users' label='Users' reference='user'>
        <SingleFieldList>
          <ChipField source='name' />
        </SingleFieldList>
      </ReferenceArrayField>
    </Datagrid>
  </List>
)

const UserGroupTitle = ({ record }) => {
  return <span>User Group {record ? `"${record.name}"` : ''}</span>
}

UserGroupTitle.propTypes = {
  record: PropTypes.shape({
    name: PropTypes.string
  })
}

const UserGroupForm = (props) => {
  const classes = useStyles()

  return (
    <SimpleForm {... props}>
      <TextInput source='id' label='Id' className={classes.wide35} disabled />
      <TextInput source='name' label='Name' className={classes.wide35} />
      <SelectInput source='systemType' className={classes.wide35} choices={choices} translateChoice={false} />
      <ReferenceArrayInput source='users' label='Users' className={classes.wide50} reference='user'>
        <SelectArrayInput source='name' />
      </ReferenceArrayInput>
    </SimpleForm>
  )
}
export const UserGroupEdit = props => (
  <Edit title={<UserGroupTitle />} {...props}>
    <UserGroupForm />
  </Edit>
)

export const UserGroupCreate = props => (
  <Create {...props}>
    <UserGroupForm />
  </Create>
)
