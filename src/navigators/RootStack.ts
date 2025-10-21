import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthUserIsSignedIn from '@src/hooks/useAuthUserIsSignedIn'
import NonAuthenticatedStack from './NonAuthenticatedStack'
import not from '@src/shared/not'
import AuthenticatedStack from './AuthenticatedStack'

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    NonAuthenticated: {
      if: not(useAuthUserIsSignedIn),
      screen: NonAuthenticatedStack,
    },
    Authenticated: {
      if: useAuthUserIsSignedIn,
      screen: AuthenticatedStack,
    },
  },
})

export default RootStack
