import { ReactQueryKey } from '@src/types/ReactQueryKey'
import { useSuspenseQuery } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryKey: ReactQueryKey = ['firebase/emulators', 'setup']

const FirebaseEmulatorProvider = ({ children }: PropsWithChildren) => {
  useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      if (!__DEV__) {
        return null
      }
      const { default: firebaseSetupEmulators } = await import(
        '@src/shared/firebaseSetupEmulators'
      )
      await firebaseSetupEmulators()
      console.warn('Firebase emulators configured and ready')
      return null
    },
  })

  return children
}

export default FirebaseEmulatorProvider
