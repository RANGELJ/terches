import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthUserIsNotSignedIn from '@src/hooks/useAuthUserIsNotSignedIn'
import useFirebaseAuthUser from '@src/hooks/useFirebaseAuthUser'
import { lazy } from 'react'

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Welcome',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Welcome: {
      if: useAuthUserIsNotSignedIn,
      screen: lazy(() => import('@src/screens/WelcomeScreen')),
    },
    Login: {
      if: useAuthUserIsNotSignedIn,
      screen: () => null,
    },
  },
})

const Navigation = createStaticNavigation(RootStack)

export type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const NavigationProvider = () => {
  const authUser = useFirebaseAuthUser()

  if (authUser) {
    return null
  }

  return <Navigation />
}

export default NavigationProvider
