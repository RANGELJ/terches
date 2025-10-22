import { getAuth, signOut } from '@react-native-firebase/auth'
import useDebugLogValue from '@src/hooks/useDebugLogValue'
import useFirebaseAuthUser from '@src/hooks/useFirebaseAuthUser'
import useHasSeenWelcomePage from '@src/hooks/useHasSeenWelcomePage'
import useHasSeenWelcomePageMutation from '@src/hooks/useHasSeenWelcomePageMutation'
import useSafeAreaViewStyleInsets from '@src/hooks/useSafeAreaViewStyleInsets'
import { colors } from '@src/shared/colors'
import buttonStyle from '@src/styles/buttonStyle'
import {
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

type Props = {
  onExit: () => void
}

const DevelopScreen = ({ onExit }: Props) => {
  const firebaseUser = useFirebaseAuthUser()
  const safeAreaStyleInsets = useSafeAreaViewStyleInsets()
  const hasSeenWelcomePage = useHasSeenWelcomePage()
  const markHasSeenWelcomePage = useHasSeenWelcomePageMutation()
  useDebugLogValue('hasSeenWelcomePage', hasSeenWelcomePage)

  return (
    <View style={[styles.page, safeAreaStyleInsets]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Development screen</Text>
        <View style={styles.switchOptionContainer}>
          <Text>Has seen welcome page</Text>
          <Switch
            value={hasSeenWelcomePage}
            disabled={markHasSeenWelcomePage.isPending}
            onValueChange={markHasSeenWelcomePage.mutate}
          />
        </View>
        {firebaseUser && (
          <TouchableOpacity
            style={[buttonStyle, styles.optionButton]}
            onPress={() => {
              signOut(getAuth())
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[buttonStyle, styles.optionButton]}
          onPress={onExit}
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
  switchOptionContainer: {
    width: '90%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default DevelopScreen
