import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Suspense } from 'react'
import Navigation from '@src/components/Navigation'
import SplashScreen from '@src/screens/SplashScreen'
import FirebaseAuthUserProvider from '@src/providers/FirebaseAuthUserProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

const App = () => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SplashScreen />}>
        <FirebaseAuthUserProvider>
          <Navigation />
        </FirebaseAuthUserProvider>
      </Suspense>
    </QueryClientProvider>
  </SafeAreaProvider>
)

export default App
