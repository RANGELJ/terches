import AsyncStorage from '@react-native-async-storage/async-storage'
import SafeAreaView from '@src/components/SafeAreaView'
import type { ReactQueryKey } from '@src/types/ReactQueryKey'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Image, StyleSheet, Text, View } from 'react-native'

const queryKey: ReactQueryKey = ['localStorage', 'hasSeenWelcomePage']

const Welcome = () => {
  const { data: hasSeenWelcomePage } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const rawValue = await AsyncStorage.getItem('hasSeenWelcomePage')
      return rawValue === '1'
    },
  })

  console.log('hasSeenWelcomePage', hasSeenWelcomePage)

  return (
    <SafeAreaView>
      <View style={styles.page}>
        <View style={styles.logo} />
        <Text style={styles.title}>¡Bienvenido a Terches!</Text>
        <Text style={styles.subtitle}>
          Encuentra todo lo que tu auto necesita
        </Text>
        <Text style={styles.description}>
          Todos los productos y servicios de tu ciudad ¡en la palma de tu mano!
        </Text>
        <Image
          source={require('@src/assets/png/WelcomeScreenStep1.png')}
          style={styles.stepImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: '100%',
  },
  stepImage: {
    width: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
    color: '#555',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
})

export default Welcome
