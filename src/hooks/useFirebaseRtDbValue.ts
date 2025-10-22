import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  firebaseRegistryAddListener,
  firebaseRegistryRemoveListener,
} from '@src/shared/firebaseRtDbListenersRegistry'
import { ReactQueryKey } from '@src/types/ReactQueryKey'
import { get, getDatabase, ref } from '@react-native-firebase/database'

const useFirebaseRtDbValue = <T>(path: string) => {
  const queryKey: ReactQueryKey = ['firebase/database', 'value', { path }]

  const { data } = useSuspenseQuery<T | null>({
    queryKey,
    queryFn: async () => {
      const database = getDatabase()
      const reference = ref(database, path)
      const snapshot = await get(reference)
      return snapshot.val()
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!path) {
      return
    }
    firebaseRegistryAddListener(queryClient, path)
    return () => firebaseRegistryRemoveListener(path)
  }, [path, queryClient])

  return data
}

export default useFirebaseRtDbValue
