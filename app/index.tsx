import { ProductScreen } from '@/components/ProductScreen'
import { useBackgroundSync } from '@/hooks/useBackgroundSync'
import { SafeAreaProvider } from 'react-native-safe-area-context'


function RootApp() {
  useBackgroundSync()
  return <ProductScreen />
}

export default function App() {
  return (
    <SafeAreaProvider>
      <RootApp />
    </SafeAreaProvider>
  )
}