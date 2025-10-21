import { getAuth, signOut } from '@react-native-firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { Button, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {
  const logout = useMutation({
    mutationFn: async () => {
      signOut(getAuth())
    },
  })

  return (
    <View style={styles.page}>
      <Text>Future home page</Text>
      <Button
        title="Logout"
        disabled={logout.isPending}
        onPress={() => logout.mutate()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen
