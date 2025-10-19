import SafeAreaView from '@src/components/SafeAreaView'
import { StatusBar, Text } from 'react-native'

const SplashScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Text>Splash screen</Text>
    </SafeAreaView>
  )
}

export default SplashScreen
