import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createContext } from 'react'

const FirebaseAuthUserContext = createContext<null | FirebaseAuthTypes.User>(
  null
)

export default FirebaseAuthUserContext
