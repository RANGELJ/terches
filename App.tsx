import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Suspense } from 'react'
import Navigation from '@src/components/Navigation'
import SplashScreen from '@src/screens/SplashScreen'
import FirebaseAuthUserProvider from '@src/providers/FirebaseAuthUserProvider'
import GlobalErrorScreen from '@src/screens/GlobalErrorScreen'
import FirebaseEmulatorProvider from '@src/providers/FirebaseEmulatorProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
})

const App = () => (
  <SafeAreaProvider>
    <ErrorBoundary fallback={<GlobalErrorScreen />}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<SplashScreen />}>
          <FirebaseEmulatorProvider>
            <FirebaseAuthUserProvider>
              <Navigation />
            </FirebaseAuthUserProvider>
          </FirebaseEmulatorProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </SafeAreaProvider>
)

export default App
