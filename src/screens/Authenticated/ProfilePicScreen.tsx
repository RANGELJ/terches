import { useMutation } from '@tanstack/react-query'
import {
  getStorage,
  ref as getStorageRef,
  putFile,
} from '@react-native-firebase/storage'
import PhotoCamera from '@src/assets/svg/PhotoCamera'
import ImageResizer from '@bam.tech/react-native-image-resizer'
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import {
  request as requestPermissions,
  openSettings,
} from 'react-native-permissions'
import unknownGetErrorMessage from '@src/shared/unknownGetErrorMessage'
import ClientFacingError from '@src/errors/ClientFacingError'
import { colors } from '@src/shared/colors'
import useFirebaseAuthUser from '@src/hooks/useFirebaseAuthUser'
import errorTextStyle from '@src/styles/errorTextStyle'
import SafeAreaView from '@src/components/SafeAreaView'
import titleStyle from '@src/styles/titleStyle'
import buttonPrimaryStyle from '@src/styles/buttonPrimaryStyle'
import buttonPrimaryTextStyle from '@src/styles/buttonPrimaryTextStyle'

const profilePickSize = 250

const ProfilePicScreen = () => {
  const user = useFirebaseAuthUser()!
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
        await ImageCropPicker.clean()
        const image = await ImageCropPicker.openCamera({
          mediaType: 'photo',
          width: 500,
          height: 500,
          cropping: true,
          useFrontCamera: true,
        })

        const resizedResponse = await ImageResizer.createResizedImage(
          image.path,
          profilePickSize,
          profilePickSize,
          'PNG',
          100
        )

        return resizedResponse
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

  const uploadProfilePic = useMutation({
    mutationFn: async () => {
      if (!image) {
        throw new ClientFacingError(
          'Se requiere una imagen de perfil para continuar'
        )
      }

      const storageRef = getStorageRef(
        getStorage(),
        `/byUserId/${user.uid}/profile_${profilePickSize}.png`
      )

      await new Promise<void>((resolve, reject) => {
        const task = putFile(storageRef, image.uri)
        task.on('state_changed', (taskSnapshot) => {
          if (taskSnapshot.error) {
            reject(taskSnapshot.error)
            return
          }
          if (taskSnapshot.state === 'success') {
            resolve()
            return
          }
        })
      })
    },
  })

  const uploadButtonIsDisabled = !image || uploadProfilePic.isPending

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        <Text style={titleStyle}>Bienvenido!</Text>
        <TouchableOpacity
          style={styles.profilePickButton}
          onPress={() => {
            openImagePicker.mutate()
          }}
        >
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={styles.profileButtonImage}
            />
          ) : (
            <PhotoCamera size={70} />
          )}
        </TouchableOpacity>
        {openImagePicker.error && (
          <Text style={errorTextStyle}>{openImagePicker.error.message}</Text>
        )}
        <Text>Completa tu perfil</Text>
        <TouchableOpacity
          style={[
            buttonPrimaryStyle,
            uploadButtonIsDisabled ? styles.buttonPrimaryDisabled : null,
          ]}
          disabled={uploadButtonIsDisabled}
          onPress={() => uploadProfilePic.mutate()}
        >
          <Text style={buttonPrimaryTextStyle}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const profilePickButtonSize = 150

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6%',
  },
  buttonPrimaryDisabled: {
    backgroundColor: colors.primary[100],
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
})

export default ProfilePicScreen
