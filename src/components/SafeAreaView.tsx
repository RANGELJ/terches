import useSafeAreaViewStyleInsets from '@src/hooks/useSafeAreaViewStyleInsets'
import { PropsWithChildren } from 'react'
import { View } from 'react-native'

const SafeAreaView = ({ children }: PropsWithChildren) => {
  const safeAreaStyleInsets = useSafeAreaViewStyleInsets()

  return <View style={safeAreaStyleInsets}>{children}</View>
}

export default SafeAreaView
