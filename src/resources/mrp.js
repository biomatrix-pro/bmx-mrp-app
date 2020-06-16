import React from 'react'
import PropTypes from 'prop-types'
import {
  List, Create, Edit, Filter,
  SimpleForm,
  TextInput,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ReferenceField,
  SelectField,
  DateField,
  EditButton,
  DateInput,
  BooleanInput,
  ReferenceInput,
  NumberInput,
  SelectInput
} from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import { FormStyles } from './form-styles'

const useStyles = makeStyles(FormStyles)

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Фильтр' source='q' alwaysOn />
  </Filter>
)

export const ProductList = props => (
  <List {...props} title='Продукты' filters={<ProductFilter />}>
    <Datagrid rowClick='edit'>
      <TextField source='caption' label='Название' />
      <TextField source='unit' label='Ед изм' />
      <NumberField source='qntMin' label='Мин выпуск' />
      <NumberField source='qntStep' label='Шаг выпуска' />
      <BooleanField source='inWorkingDays' label='Рабочие дни' />
      <TextField source='comments' label='Примечания' />
    </Datagrid>
  </List>
)

const ProductForm = (props) => {
  const classes = useStyles()

  return (
    <SimpleForm {... props}>
      <TextInput source='id' label='id' disabled className={classes.wide45} />
      <TextInput source='caption' label='Название' className={classes.wide75} />
      <TextInput source='unit' label='Ед изм' />
      <NumberInput source='qntMin' label='Мин выпуск' />
      <NumberInput source='qntStep' label='Шаг выпуска' />
      <BooleanInput source='inWorkingDays' label='Рабочие дни' />
      <TextInput source='comments' label='Примечания' />
    </SimpleForm>
  )
}

export const ProductCreate = (props) => (
  <Create {...props}>
    <ProductForm />
  </Create>
)

const ProductEditTitle = ({ record }) => {
  return <span>Продукт {record ? `"${record.caption}"` : ''}</span>
}

ProductEditTitle.propTypes = {
  record: PropTypes.shape({
    caption: PropTypes.string
  })
}

export const ProductEdit = props => (
  <Edit title={<ProductEditTitle />} {...props}>
    <ProductForm />
  </Edit>
)

// ------- EVENT ---------
const DeployEventTypes = [
  { id: 0, name: '(unknown)' },
  { id: 1, name: '(ERROR)' },
  { id: 2, name: 'Github' },
  { id: 3, name: 'Webhook' }
]

const FullNameField = ({ record }) => <span>{record.name} ({record.branch})</span>

FullNameField.propTypes = {
  record: PropTypes.shape({
    name: PropTypes.string,
    branch: PropTypes.string
  })
}

export const DeployEventList = props => (
  <List {...props} title='Deploy events' filters={<ProductFilter />}>
    <Datagrid rowClick='edit'>
      <DateField source='createdAt' label='CreatedAt' />
      <TextField source='status' label='Status' />
      <SelectField source='type' choices={DeployEventTypes} />
      <TextField source='caption' label='Caption' />
      <TextField source='commit' label='Commit' />
      <TextField source='branch' label='Branch' />
      <ReferenceField label='Project:' source='projectId' reference='DeployProject'>
        <TextField source='name' optionText={<FullNameField />} optionValue='id' />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

const DeployProjectEventTitle = ({ record }) => {
  return <span>Deploy event {record ? `"${record.caption}"` : ''}</span>
}

DeployProjectEventTitle.propTypes = {
  record: PropTypes.shape({
    caption: PropTypes.string
  })
}

export const DeployEventEdit = props => {
  const classes = useStyles()

  return (
    <Edit title={<DeployProjectEventTitle />} {...props}>
      <SimpleForm>
        <TextInput source='id' label='Id' className={classes.wide} disabled />
        <DateInput source='createdAt' />
        <TextInput source='status' />
        <TextInput source='statusMessage' className={classes.wide} />
        <SelectInput source='type' choices={DeployEventTypes} />
        <TextInput source='caption' className={classes.wide} />
        <TextInput source='commit' className={classes.wide} />
        <TextInput source='branch' />
        <ReferenceInput label='Project' source='projectId' reference='DeployProject'>
          <SelectInput source='caption' />
        </ReferenceInput>
        <TextInput source='stdout' multiline fullWidth label='Console log:' />
        <TextInput source='stderr' multiline fullWidth label='Error log:' />
      </SimpleForm>
    </Edit>
  )
}
