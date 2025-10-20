import { colors } from '@src/shared/colors'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useSafeAreaViewStyleInsets from '@src/hooks/useSafeAreaViewStyleInsets'
import useHasSeenWelcomePageMutation from '@src/hooks/useHasSeenWelcomePageMutation'
import titleStyle from '@src/styles/titleStyle'
import buttonPrimaryStyle from '@src/styles/buttonPrimaryStyle'
import buttonPrimaryTextStyle from '@src/styles/buttonPrimaryTextStyle'

const Welcome = () => {
  const [step, setStep] = useState(0)

  const safeAreaStyleInsets = useSafeAreaViewStyleInsets()
  const markHasSeenWelcomePage = useHasSeenWelcomePageMutation()

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
    <View style={safeAreaStyleInsets}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity
            disabled={markHasSeenWelcomePage.isPending}
            onPress={() => markHasSeenWelcomePage.mutate(true)}
          >
            <Text>Omitir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logo} />
        <Text style={titleStyle}>¡Bienvenido a Terches!</Text>
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
            style={buttonPrimaryStyle}
            onPress={() => markHasSeenWelcomePage.mutate(true)}
          >
            <Text style={buttonPrimaryTextStyle}>Iniciar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
})

export default Welcome
