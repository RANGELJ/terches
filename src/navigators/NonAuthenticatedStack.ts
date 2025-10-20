import { StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useHasSeenWelcomePage from '@src/hooks/useHasSeenWelcomePage'
import not from '@src/shared/not'
import { lazy } from 'react'

const NonAuthenticatedStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Welcome: {
      if: not(useHasSeenWelcomePage),
      screen: lazy(() => import('@src/screens/NonAuthenticated/WelcomeScreen')),
    },
    Login: {
      if: useHasSeenWelcomePage,
      screen: lazy(() => import('@src/screens/NonAuthenticated/LoginScreen')),
    },
    CreateUser: {
      if: useHasSeenWelcomePage,
      options: {
        headerShown: true,
        title: 'Registrate',
      },
      screen: lazy(
        () => import('@src/screens/NonAuthenticated/CreateUserScreen')
      ),
    },
  },
})

export type NonAuthenticatedParamList = StaticParamList<
  typeof NonAuthenticatedStack
>

export default NonAuthenticatedStack
