import SafeAreaView from '@src/components/SafeAreaView'
import { colors } from '@src/shared/colors'
import buttonStyle from '@src/styles/buttonStyle'
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
        <TextInput placeholder="Correo" style={styles.textInput} />
        <TextInput
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry
        />
        <View>
          <Text>Olvidaste tu contraseña?</Text>
        </View>
        <TouchableOpacity style={[buttonStyle, styles.loginButton]}>
          <Text style={styles.loginButtonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttonStyle, styles.withoutLoginButton]}>
          <Text style={styles.withoutLoginText}>Comienza sin registrarte</Text>
        </TouchableOpacity>
        <View>
          <Text>Aun no tienes cuenta?</Text>
          <Text>Registrate</Text>
        </View>
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
  textInput: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    width: '90%',
    borderRadius: 15,
    height: 50,
  },
  loginButton: {
    backgroundColor: colors.primary[500],
    width: '90%',
  },
  loginButtonText: {
    color: colors.secondary[100],
  },
  withoutLoginButton: {
    borderColor: colors.primary[500],
    borderWidth: 1,
    width: '90%',
  },
  withoutLoginText: {
    color: colors.primary[500],
  },
})

export default LoginScreen
