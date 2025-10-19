import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactQueryKey } from '@src/types/ReactQueryKey'
import { useSuspenseQuery } from '@tanstack/react-query'

export const queryKey: ReactQueryKey = ['localStorage', 'hasSeenWelcomePage']

export const POSITIVE_VALUE = '1'
export const KEY_NAME = 'hasSeenWelcomePage'

const useHasSeenWelcomePage = () =>
  useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const rawValue = await AsyncStorage.getItem(KEY_NAME)
      return rawValue === POSITIVE_VALUE
    },
  }).data

export default useHasSeenWelcomePage
