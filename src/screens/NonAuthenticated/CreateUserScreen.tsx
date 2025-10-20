import ImagePicker from 'react-native-image-crop-picker'
import PhotoCamera from '@src/assets/svg/PhotoCamera'
import { colors } from '@src/shared/colors'
import {
  Image,
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

const CreateUserScreen = () => {
  const openImagePicker = useMutation({
    mutationFn: async () => {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        width: 500,
        height: 500,
        cropping: true,
      })

      return image
    },
  })

  const image = openImagePicker.data

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
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Correo electronico</Text>
        <TextInput style={textInputStyle} placeholder="usuario@gmail.com" />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          style={textInputStyle}
          placeholder="Contraseña"
          secureTextEntry
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Confirmar contraseña</Text>
        <TextInput
          style={textInputStyle}
          placeholder="Contraseña"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={[buttonPrimaryStyle, styles.nextButton]}>
        <Text style={buttonPrimaryTextStyle}>Siguiente</Text>
        <ArrowRightAlt size={25} fill={colors.secondary[100]} />
      </TouchableOpacity>
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
})

export default CreateUserScreen
