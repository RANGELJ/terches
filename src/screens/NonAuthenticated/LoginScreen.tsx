import SafeAreaView from '@src/components/SafeAreaView'
import titleStyle from '@src/styles/titleStyle'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
        <TextInput placeholder="Contraseña" style={styles.textInput} />
        <View>
          <Text>Olvidaste tu contraseña?</Text>
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
})

export default LoginScreen
