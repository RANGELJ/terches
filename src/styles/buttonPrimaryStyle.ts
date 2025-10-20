import { StyleSheet } from 'react-native'
import buttonStyle from './buttonStyle'
import { colors } from '@src/shared/colors'

const buttonPrimaryStyle = StyleSheet.compose(buttonStyle, {
  backgroundColor: colors.primary[500],
})

export default buttonPrimaryStyle
