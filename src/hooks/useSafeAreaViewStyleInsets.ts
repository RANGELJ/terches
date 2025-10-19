import { useMemo } from 'react'
import type { ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useSafeAreaViewStyleInsets = () => {
  const insets = useSafeAreaInsets()

  return useMemo<ViewStyle>(
    () => ({
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }),
    [insets.top, insets.bottom, insets.left, insets.right]
  )
}

export default useSafeAreaViewStyleInsets
