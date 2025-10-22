import { colors } from '@src/shared/colors'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useMutation } from '@tanstack/react-query'
import textInputStyle from '@src/styles/textInputStyle'
import buttonPrimaryStyle from '@src/styles/buttonPrimaryStyle'
import buttonPrimaryTextStyle from '@src/styles/buttonPrimaryTextStyle'
import ArrowRightAlt from '@src/assets/svg/ArrowRightAlt'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth'
import ClientFacingError from '@src/errors/ClientFacingError'
import unknownGetErrorMessage from '@src/shared/unknownGetErrorMessage'
import errorTextStyle from '@src/styles/errorTextStyle'

const CreateUserScreen = () => {
  const [email, setEmail] = useState(__DEV__ ? 'georgeranpe@gmail.com' : '')
  const [password, setPassword] = useState(__DEV__ ? '1234567890' : '')
  const [passwordConfirmation, setPasswordConfirmation] = useState(
    __DEV__ ? '1234567890' : ''
  )

  const createUser = useMutation<void, ClientFacingError>({
    mutationFn: async () => {
      if (password !== passwordConfirmation) {
        throw new ClientFacingError('Las constraseñas no coinciden')
      }

      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
      } catch (error) {
        const errorMessage = unknownGetErrorMessage(error)
        if (errorMessage?.includes('[auth/email-already-in-use]')) {
          throw new ClientFacingError('Este correo ya esta en uso')
        }
        throw error
      }
    },
  })

  return (
    <View style={styles.page}>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Correo electronico</Text>
        <TextInput
          style={textInputStyle}
          placeholder="usuario@gmail.com"
          readOnly={createUser.isPending}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          style={textInputStyle}
          placeholder="Contraseña"
          readOnly={createUser.isPending}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Confirmar contraseña</Text>
        <TextInput
          style={textInputStyle}
          placeholder="Contraseña"
          readOnly={createUser.isPending}
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
      </View>
      <TouchableOpacity
        style={[buttonPrimaryStyle, styles.nextButton]}
        disabled={createUser.isPending}
        onPress={() => createUser.mutate()}
      >
        <Text style={buttonPrimaryTextStyle}>Siguiente</Text>
        <ArrowRightAlt size={25} fill={colors.secondary[100]} />
      </TouchableOpacity>
      {createUser.error && (
        <Text style={errorTextStyle}>{createUser.error.message}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    paddingTop: 50,
  },
  inputView: {
    width: '90%',
    gap: 5,
  },
  inputLabel: {
    width: '90%',
  },
  nextButton: {
    width: '90%',
    flexDirection: 'row',
    gap: 10,
  },
})

export default CreateUserScreen
