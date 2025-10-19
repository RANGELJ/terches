import AsyncStorage from '@react-native-async-storage/async-storage'
import useNavigate from '@src/hooks/useNavigate'
import { StyleSheet, Text, View } from 'react-native'

const SplashScreen = () => {
  const navigate = useNavigate()

  return (
    <View style={styles.frame}>
      <Text>Splash screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SplashScreen
