import SafeAreaView from '@src/components/SafeAreaView'
import useNavigation from '@src/hooks/useNavigation'
import { colors } from '@src/shared/colors'
import buttonPrimaryStyle from '@src/styles/buttonPrimaryStyle'
import buttonPrimaryTextStyle from '@src/styles/buttonPrimaryTextStyle'
import buttonStyle from '@src/styles/buttonStyle'
import textInputStyle from '@src/styles/textInputStyle'
import titleStyle from '@src/styles/titleStyle'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'

const LoginScreen = () => {
  const navigation = useNavigation<'NonAuthenticated'>()

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}
      >
        <Image
          source={require('@src/assets/png/LoginScreen.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={titleStyle}>Iniciar Sesion</Text>
        <TextInput
          placeholder="Correo"
          style={[textInputStyle, styles.input]}
        />
        <TextInput
          placeholder="Contraseña"
          style={[textInputStyle, styles.input]}
          secureTextEntry
        />
        <View>
          <Text>Olvidaste tu contraseña?</Text>
        </View>
        <TouchableOpacity style={[buttonPrimaryStyle, styles.loginButton]}>
          <Text style={buttonPrimaryTextStyle}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttonStyle, styles.withoutLoginButton]}>
          <Text style={styles.withoutLoginText}>Comienza sin registrarte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notAccountView}
          onPress={() => {
            navigation.navigate('CreateUser')
          }}
        >
          <Text>Aun no tienes cuenta?</Text>
          <Text style={styles.noAccountText}>Registrate</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  image: {
    width: '90%',
    height: 200,
  },
  input: {
    width: '90%',
  },
  loginButton: {
    width: '90%',
  },
  withoutLoginButton: {
    borderColor: colors.primary[500],
    borderWidth: 1,
    width: '90%',
  },
  withoutLoginText: {
    color: colors.primary[500],
  },
  notAccountView: {
    alignItems: 'center',
  },
  noAccountText: {
    color: colors.primary[500],
    fontWeight: 'bold',
  },
})

export default LoginScreen
