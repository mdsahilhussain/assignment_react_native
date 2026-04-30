import { useBackgroundSync } from '@/hooks/useBackgroundSync'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ProductScreen } from '@/components/Product/ProductScreen'

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