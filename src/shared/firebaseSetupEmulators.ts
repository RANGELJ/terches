import { connectAuthEmulator, getAuth } from '@react-native-firebase/auth'
import {
  connectDatabaseEmulator,
  getDatabase,
} from '@react-native-firebase/database'
import {
  connectStorageEmulator,
  getStorage,
} from '@react-native-firebase/storage'
import env from '@src/env'

const firebaseSetupEmulators = async () => {
  connectAuthEmulator(getAuth(), env.AUTH_EMULATOR_URL)
  connectStorageEmulator(
    getStorage(),
    env.STORAGE_EMULATOR_HOST,
    env.SOTRAGE_EMULATOR_PORT
  )
  connectDatabaseEmulator(
    getDatabase(),
    env.DATABASE_EMULATOR_HOST,
    env.DATABASE_EMULATOR_PORT
  )
}

export default firebaseSetupEmulators
