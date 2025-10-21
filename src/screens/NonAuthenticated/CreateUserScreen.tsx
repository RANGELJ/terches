import PhotoCamera from '@src/assets/svg/PhotoCamera'
import { colors } from '@src/shared/colors'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import {
  request as requestPermissions,
  openSettings,
} from 'react-native-permissions'
import { useMutation } from '@tanstack/react-query'
import textInputStyle from '@src/styles/textInputStyle'
import buttonPrimaryStyle from '@src/styles/buttonPrimaryStyle'
import buttonPrimaryTextStyle from '@src/styles/buttonPrimaryTextStyle'
import ArrowRightAlt from '@src/assets/svg/ArrowRightAlt'
import ImageCropPicker from 'react-native-image-crop-picker'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth'
import ClientFacingError from '@src/errors/ClientFacingError'
import unknownGetErrorMessage from '@src/shared/unknownGetErrorMessage'

const CreateUserScreen = () => {
  const openImagePicker = useMutation({
    mutationFn: async () => {
      const permissionStatus = await requestPermissions(
        'android.permission.CAMERA',
        {
          title: 'Permiso de Cámara',
          message:
            'Necesitamos acceso a tu cámara para que puedas tomar una foto y usarla como tu foto de perfil.',
          buttonPositive: 'Aceptar',
        }
      )

      if (permissionStatus === 'blocked') {
        Alert.alert(
          'Permiso denegado',
          'El permiso para usar la camara fue denegado, por favor activalo en los ajustes de tu celular para tomar una foto de perfil.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Abrir ajustes',
              onPress: async () => await openSettings(),
            },
          ]
        )
        return
      }

      try {
        const image = await ImageCropPicker.openCamera({
          mediaType: 'photo',
          width: 500,
          height: 500,
          cropping: true,
        })

        return image
      } catch (error) {
        const errorMessage = unknownGetErrorMessage(error)
        if (errorMessage?.includes('User cancelled image selection')) {
          return undefined
        }
        if (errorMessage?.includes('User did not grant camera permission')) {
          throw new ClientFacingError(
            'La aplicacion no tiene permiso para usar la camara'
          )
        }
        throw error
      }
    },
  })

  const image = openImagePicker.data
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
      <TouchableOpacity
        style={styles.profilePickButton}
        onPress={() => {
          openImagePicker.mutate()
        }}
      >
        {image ? (
          <Image
            source={{ uri: image.path }}
            style={styles.profileButtonImage}
          />
        ) : (
          <PhotoCamera size={70} />
        )}
      </TouchableOpacity>
      {openImagePicker.error && (
        <Text style={styles.errorText}>{openImagePicker.error.message}</Text>
      )}
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
        <Text style={styles.errorText}>{createUser.error.message}</Text>
      )}
    </View>
  )
}

const profilePickButtonSize = 150

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    paddingTop: 50,
  },
  profilePickButton: {
    borderWidth: 2,
    borderColor: colors.secondary[100],
    backgroundColor: 'white',
    width: profilePickButtonSize,
    height: profilePickButtonSize,
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
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
  errorText: {
    color: colors.error[500],
    fontWeight: 'bold',
  },
})

export default CreateUserScreen
