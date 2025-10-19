import useNavigation from '@src/hooks/useNavigation'
import useSafeAreaViewStyleInsets from '@src/hooks/useSafeAreaViewStyleInsets'
import { colors } from '@src/shared/colors'
import buttonStyle from '@src/styles/buttonStyle'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const DevelopScreen = () => {
  const safeAreaStyleInsets = useSafeAreaViewStyleInsets()
  const navigation = useNavigation<'Root'>()

  return (
    <View style={[styles.page, safeAreaStyleInsets]}>
      <View style={styles.content}>
        <Text style={styles.title}>Development screen</Text>
        <TouchableOpacity
          style={[buttonStyle, styles.optionButton]}
          onPress={() => {
            navigation.navigate('NonAuthenticated')
          }}
        >
          <Text>Continue to App</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFADAD',
  },
  content: {
    flex: 1,
    backgroundColor: '#A0C4FF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  optionButton: {
    width: '90%',
    backgroundColor: '#FFD6A5',
  },
  title: {
    color: colors.primary[500],
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default DevelopScreen
