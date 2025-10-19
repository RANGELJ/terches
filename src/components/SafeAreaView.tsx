import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView as SafeAreaViewOriginal } from 'react-native-safe-area-context'

const SafeAreaView = ({ children }: PropsWithChildren) => (
  <SafeAreaViewOriginal style={styles.safeArea}>
    {children}
  </SafeAreaViewOriginal>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SafeAreaView
