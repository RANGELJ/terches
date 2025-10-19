import {
  getAuth,
  onAuthStateChanged,
  type FirebaseAuthTypes,
} from '@react-native-firebase/auth'
import FirebaseAuthUserContext from '@src/context/FirebaseAuthUserContext'
import waitMilliseconds from '@src/shared/waitMilliseconds'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect } from 'react'

const queryKey = ['firebase/auth', 'state']

const FirebaseAuthUserProvider = ({ children }: PropsWithChildren) => {
  const { data: authUser } = useSuspenseQuery<FirebaseAuthTypes.User | null>({
    queryKey,
    queryFn: async () => {
      await waitMilliseconds(2000)
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
          resolve(user)
          unsubscribe()
        })
      })
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      queryClient.setQueryData(queryKey, user)
    })
  }, [queryClient])

  return (
    <FirebaseAuthUserContext.Provider value={authUser}>
      {children}
    </FirebaseAuthUserContext.Provider>
  )
}

export default FirebaseAuthUserProvider
