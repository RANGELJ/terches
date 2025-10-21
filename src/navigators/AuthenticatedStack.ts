import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { lazy } from 'react'

const AuthenticatedStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: lazy(() => import('@src/screens/Authenticated/HomeScreen')),
  },
})

export default AuthenticatedStack
