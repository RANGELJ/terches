import AsyncStorage from '@react-native-async-storage/async-storage'
import SafeAreaView from '@src/components/SafeAreaView'
import { colors } from '@src/shared/colors'
import type { ReactQueryKey } from '@src/types/ReactQueryKey'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SplashScreen from '@src/screens/SplashScreen'
import { useNavigation } from '@react-navigation/native'

const queryKey: ReactQueryKey = ['localStorage', 'hasSeenWelcomePage']

const POSITIVE_VALUE = '1'

const Welcome = () => {
  const { data: hasSeenWelcomePage } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const rawValue = await AsyncStorage.getItem('hasSeenWelcomePage')
      return rawValue === POSITIVE_VALUE
    },
  })

  const markHasSeenWelcomePage = useMutation<void, Error>({
    mutationFn: async (_, { client }) => {
      await AsyncStorage.setItem('hasSeenWelcomePage', POSITIVE_VALUE)
      client.setQueryData(queryKey, POSITIVE_VALUE)
    },
  })

  const navigation = useNavigation()
  const [step, setStep] = useState(0)

  console.log('hasSeenWelcomePage', hasSeenWelcomePage)

  useEffect(() => {
    if (hasSeenWelcomePage) {
      navigation.navigate('Login')
    }
  }, [hasSeenWelcomePage, navigation])

  if (hasSeenWelcomePage) {
    return <SplashScreen />
  }

  let subtitle: string
  let description: string

  switch (step) {
    case 1:
      subtitle = 'Compra, consulta y compara precios en tiempo real'
      description =
        'Ya no pierdas tu tiempo en largas llamadas telefónicas, con Terches encuentra todo lo que necesitas fácil y rápido, ¡además te conseguimos los mejores precios del mercado!'
      break
    case 2:
      subtitle = '!Grandes beneficios!'
      description =
        'Usa la App y accede a las mejores ofertas, promociones y productos o servicios !GRATIS!'
      break
    default:
      subtitle = 'Encuentra todo lo que tu auto necesita'
      description =
        'Todos los productos y servicios de tu ciudad ¡en la palma de tu mano!'
  }

  return (
    <SafeAreaView>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity
            disabled={markHasSeenWelcomePage.isPending}
            onPress={() => markHasSeenWelcomePage.mutate()}
          >
            <Text>Omitir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logo} />
        <Text style={styles.title}>¡Bienvenido a Terches!</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <Image
          source={require('@src/assets/png/WelcomeScreenStep1.png')}
          style={styles.stepImage}
          resizeMode="contain"
        />
        <View style={styles.stepDotsFrame}>
          <TouchableOpacity
            style={[
              styles.stepDot,
              step === 0 ? styles.stepDotActive : styles.stepDotInactive,
            ]}
            onPress={() => setStep(0)}
          />
          <TouchableOpacity
            style={[
              styles.stepDot,
              step === 1 ? styles.stepDotActive : styles.stepDotInactive,
            ]}
            onPress={() => setStep(1)}
          />
          <TouchableOpacity
            style={[
              styles.stepDot,
              step === 2 ? styles.stepDotActive : styles.stepDotInactive,
            ]}
            disabled={markHasSeenWelcomePage.isPending}
            onPress={() => setStep(2)}
          />
        </View>
        {step === 2 && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => markHasSeenWelcomePage.mutate()}
          >
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
        )}
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
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: '100%',
  },
  stepDotsFrame: {
    flexDirection: 'row',
    gap: 15,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: '100%',
  },
  stepDotInactive: {
    backgroundColor: colors.secondary[100],
  },
  stepDotActive: {
    backgroundColor: colors.primary[500],
  },
  stepImage: {
    width: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.secondary[500],
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
    color: colors.secondary[500],
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.secondary[300],
  },
  startButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: colors.secondary[50],
  },
})

export default Welcome
