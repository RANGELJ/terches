import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useFirebaseAuthUser from '@src/hooks/useFirebaseAuthUser'

const NonAuthNavigation = createStaticNavigation(
  createNativeStackNavigator({
    initialRouteName: 'SplashScreen',
    screens: {
      SplashScreen: {
        screen: () => null,
        options: {
          headerShown: false,
        },
      },
    },
  })
)

const NavigationProvider = () => {
  const authUser = useFirebaseAuthUser()

  if (authUser) {
    return null
  }

  return <NonAuthNavigation />
}

export default NavigationProvider
