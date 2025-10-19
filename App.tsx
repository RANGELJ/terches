import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import StatusBarGeneral from '@src/components/StatusBarGeneral'
import RouterProvider from '@src/components/RouterProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => (
  <SafeAreaProvider>
    <StatusBarGeneral />
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  </SafeAreaProvider>
)

const AppContent = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <RouterProvider />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default App
