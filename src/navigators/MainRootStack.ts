import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthUserIsSignedIn from '@src/hooks/useAuthUserIsSignedIn'
import NonAuthenticatedStack from './NonAuthenticatedStack'
import { lazy } from 'react'
import not from '@src/shared/not'

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Develop: {
      if: () => __DEV__,
      screen: lazy(() => import('@src/screens/DevelopScreen')),
    },
    NonAuthenticated: {
      if: not(useAuthUserIsSignedIn),
      screen: NonAuthenticatedStack,
    },
    Authenticated: {
      if: useAuthUserIsSignedIn,
      screen: () => null,
    },
  },
})

export default RootStack
