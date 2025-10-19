import { StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useHasSeenWelcomePage from '@src/hooks/useHasSeenWelcomePage'
import not from '@src/shared/not'
import { lazy } from 'react'

const NonAuthenticatedStack = createNativeStackNavigator({
  screens: {
    Welcome: {
      if: not(useHasSeenWelcomePage),
      options: {
        headerShown: false,
      },
      screen: lazy(() => import('@src/screens/NonAuthenticated/WelcomeScreen')),
    },
    Login: {
      if: useHasSeenWelcomePage,
      options: {
        headerShown: false,
      },
      screen: lazy(() => import('@src/screens/NonAuthenticated/LoginScreen')),
    },
  },
})

export type NonAuthenticatedParamList = StaticParamList<
  typeof NonAuthenticatedStack
>

export default NonAuthenticatedStack
