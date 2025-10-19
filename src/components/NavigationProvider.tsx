import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthUserIsNotSignedIn from '@src/hooks/useAuthUserIsNotSignedIn'
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
      screen: lazy(() => import('@src/screens/LoginScreen')),
    },
  },
})

export type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const NavigationProvider = createStaticNavigation(RootStack)

export default NavigationProvider
