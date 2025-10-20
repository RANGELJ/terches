import SafeAreaView from '@src/components/SafeAreaView'
import { colors } from '@src/shared/colors'
import { StyleSheet, Text, View } from 'react-native'

const GlobalErrorScreen = () => (
  <SafeAreaView>
    <View style={styles.page}>
      <Text>Error!</Text>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.error[100],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default GlobalErrorScreen
