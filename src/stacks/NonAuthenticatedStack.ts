import { StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { lazy } from 'react'

const NonAuthenticatedStack = createNativeStackNavigator({
  initialRouteName: 'Welcome',
  screens: {
    Welcome: {
      options: {
        headerShown: false,
      },
      screen: lazy(() => import('@src/screens/NonAuthenticated/WelcomeScreen')),
    },
    Login: {
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
