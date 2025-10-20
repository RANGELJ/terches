import ImagePicker from 'react-native-image-crop-picker'
import PhotoCamera from '@src/assets/svg/PhotoCamera'
import { colors } from '@src/shared/colors'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'

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
})

export default CreateUserScreen
