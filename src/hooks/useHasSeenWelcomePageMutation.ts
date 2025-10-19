import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import {
  queryKey,
  POSITIVE_VALUE,
  KEY_NAME,
} from '@src/hooks/useHasSeenWelcomePage'

const useHasSeenWelcomePageMutation = () =>
  useMutation<void, Error, boolean>({
    mutationFn: async (value, { client }) => {
      if (value) {
        await AsyncStorage.setItem(KEY_NAME, POSITIVE_VALUE)
        client.setQueryData(queryKey, true)
      } else {
        await AsyncStorage.removeItem(KEY_NAME)
        client.setQueryData(queryKey, false)
      }
    },
  })

export default useHasSeenWelcomePageMutation
