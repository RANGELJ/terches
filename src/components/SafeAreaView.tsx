import { PropsWithChildren, useMemo } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeAreaView = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={useMemo(
        () => ({
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }),
        [insets.top, insets.bottom, insets.left, insets.right]
      )}
    >
      {children}
    </View>
  )
}

export default SafeAreaView
