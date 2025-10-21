import { connectAuthEmulator, getAuth } from '@react-native-firebase/auth'
import env from '@src/env'

const firebaseSetupEmulators = async () => {
  const auth = getAuth()
  connectAuthEmulator(auth, env.AUTH_EMULATOR_URL)
}

export default firebaseSetupEmulators
