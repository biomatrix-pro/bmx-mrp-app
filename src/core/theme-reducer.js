import { CHANGE_THEME, ThemeName } from './actions'

export default (previousState = ThemeName.light, { type, payload }) => {
  if (type === CHANGE_THEME) {
    return payload
  }
  return previousState
}
