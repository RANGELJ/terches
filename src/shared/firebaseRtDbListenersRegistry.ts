import { getDatabase, ref, onValue } from '@react-native-firebase/database'
import { ReactQueryKey } from '@src/types/ReactQueryKey'
import type { QueryClient } from '@tanstack/react-query'

type ListenerEntry = {
  count: number
  unsubscribe: () => void
}

const firebaseListenersRegistry = new Map<string, ListenerEntry>()

export const firebaseRegistryAddListener = (
  queryClient: QueryClient,
  path: string
) => {
  const existingEntry = firebaseListenersRegistry.get(path)

  if (existingEntry) {
    existingEntry.count += 1
    return path
  }

  const database = getDatabase()

  const reference = ref(database, path)
  const queryKey: ReactQueryKey = ['firebase/database', 'value', { path }]

  firebaseListenersRegistry.set(path, {
    count: 1,
    unsubscribe: onValue(reference, (snapshot) => {
      const data = snapshot.val()
      queryClient.setQueryData(queryKey, data)
    }),
  })

  return path
}

export const firebaseRegistryRemoveListener = (path: string) => {
  const entry = firebaseListenersRegistry.get(path)

  if (!entry) {
    return
  }

  entry.count -= 1

  if (entry.count <= 0) {
    entry.unsubscribe()
    firebaseListenersRegistry.delete(path)
  }
}
