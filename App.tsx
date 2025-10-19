import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Suspense } from 'react'
import NavigationProvider from '@src/components/NavigationProvider'
import SplashScreen from '@src/screens/SplashScreen'
import StatusBarGeneral from '@src/components/StatusBarGeneral'
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
    <StatusBarGeneral />
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SplashScreen />}>
        <FirebaseAuthUserProvider>
          <NavigationProvider />
        </FirebaseAuthUserProvider>
      </Suspense>
    </QueryClientProvider>
  </SafeAreaProvider>
)

export default App
