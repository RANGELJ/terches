import { StatusBar, useColorScheme } from 'react-native'

const StatusBarGeneral = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
}

export default StatusBarGeneral
