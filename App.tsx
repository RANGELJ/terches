import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { lazy, Suspense, useState } from 'react'
import SplashScreen from '@src/screens/SplashScreen'
import FirebaseAuthUserProvider from '@src/providers/FirebaseAuthUserProvider'
import GlobalErrorScreen from '@src/screens/GlobalErrorScreen'
import FirebaseEmulatorProvider from '@src/providers/FirebaseEmulatorProvider'
import RootStack from '@src/navigators/RootStack'
import { createStaticNavigation } from '@react-navigation/native'
import ClientFacingError from '@src/errors/ClientFacingError'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      throwOnError: true,
    },
    mutations: {
      throwOnError: (error) => !(error instanceof ClientFacingError),
    },
  },
})

const Navigation = createStaticNavigation(RootStack)
const DevelopScreen = lazy(() => import('@src/screens/DevelopScreen'))

const AppContent = () => {
  const [showDeveloperScreen, setShowDeveloperScreen] = useState(__DEV__)

  if (showDeveloperScreen) {
    return <DevelopScreen onExit={() => setShowDeveloperScreen(false)} />
  }

  return <Navigation />
}

const App = () => (
  <SafeAreaProvider>
    <ErrorBoundary fallback={<GlobalErrorScreen />}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<SplashScreen />}>
          <FirebaseEmulatorProvider>
            <FirebaseAuthUserProvider>
              <AppContent />
            </FirebaseAuthUserProvider>
          </FirebaseEmulatorProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </SafeAreaProvider>
)

export default App
