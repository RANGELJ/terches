import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useUserHasProfileUrl from '@src/hooks/useUserHasProfileUrl'
import not from '@src/shared/not'
import { lazy } from 'react'

const AuthenticatedStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      if: useUserHasProfileUrl,
      screen: lazy(() => import('@src/screens/Authenticated/HomeScreen')),
    },
    ProfilePick: {
      if: not(useUserHasProfileUrl),
      screen: lazy(() => import('@src/screens/Authenticated/ProfilePicScreen')),
    },
  },
})

export default AuthenticatedStack
