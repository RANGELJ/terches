import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthUserIsNotSignedIn from '@src/hooks/useAuthUserIsNotSignedIn'
import useFirebaseAuthUser from '@src/hooks/useFirebaseAuthUser'
import { lazy } from 'react'

const Navigation = createStaticNavigation(
  createNativeStackNavigator({
    screenOptions: {
      headerShown: false,
    },
    groups: {
      NotSignedIn: {
        if: useAuthUserIsNotSignedIn,
        screens: {
          NonSignedInNavigator: createNativeStackNavigator({
            initialRouteName: 'Welcome',
            screenOptions: {
              headerShown: false,
            },
            screens: {
              Welcome: lazy(() => import('@src/screens/WelcomeScreen')),
            },
          }),
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

  return <Navigation />
}

export default NavigationProvider
