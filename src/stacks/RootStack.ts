import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthUserIsSignedIn from '@src/hooks/useAuthUserIsSignedIn'
import NonAuthenticatedStack from './NonAuthenticatedStack'
import { lazy } from 'react'
import not from '@src/shared/not'

const RootStack = createNativeStackNavigator({
  initialRouteName: __DEV__ ? 'Develop' : 'NonAuthenticated',
  screens: {
    Develop: {
      options: {
        headerShown: false,
      },
      screen: __DEV__
        ? lazy(() => import('@src/screens/DevelopScreen'))
        : () => null,
    },
    NonAuthenticated: {
      if: not(useAuthUserIsSignedIn),
      options: {
        headerShown: false,
      },
      screen: NonAuthenticatedStack,
    },
    Authenticated: {
      if: useAuthUserIsSignedIn,
      options: {
        headerShown: false,
      },
      screen: () => null,
    },
  },
})

export default RootStack
