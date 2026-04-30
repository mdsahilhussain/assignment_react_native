import { useProductStore } from '@/store/useProductStore'
import { useUIStore } from '@/store/useUIStore'
import { RuntimeProduct } from '@/types/product'
import { deriveProducts } from '@/utils/deriveProducts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProductRow } from './ProductRow'
import { Toast } from './Toast'
import { Toolbar } from './Toolbar'


const ROW_HEIGHT = 72

interface ToastState {
  id: number
  message: string
  type: 'error' | 'success'
}

function EmptyState() {
  return (
    <View className="items-center justify-center py-16 px-6">
      <Text className="text-zinc-600 font-mono text-sm text-center">
        No products match your filters.
      </Text>
    </View>
  )
}

export function ProductScreen() {
  const products = useProductStore((s) => s.products)
  const lastError = useProductStore((s) => s.lastError)
  const clearLastError = useProductStore((s) => s.clearLastError)

  const search = useUIStore((s) => s.search)
  const filterCategory = useUIStore((s) => s.filterCategory)
  const sortField = useUIStore((s) => s.sortField)
  const sortOrder = useUIStore((s) => s.sortOrder)

  const insets = useSafeAreaInsets()
  const [toasts, setToasts] = useState<ToastState[]>([])

  const visible = useMemo(
    () => deriveProducts(products, { search, filterCategory, sortField, sortOrder }),
    [products, search, filterCategory, sortField, sortOrder]
  )

  useEffect(() => {
    if (!lastError) return
    setToasts((prev) => [
      ...prev,
      { id: Date.now(), message: lastError.message, type: 'error' },
    ])
    clearLastError()
  }, [lastError, clearLastError])

  const keyExtractor = useCallback(
    (item: RuntimeProduct) => String(item.id),
    []
  )

  const renderItem = useCallback(
    ({ item }: { item: RuntimeProduct }) => <ProductRow product={item} />,
    []
  )

  const getItemLayout = useCallback(
    (_: ArrayLike<RuntimeProduct> | null | undefined, index: number) => ({
      length: ROW_HEIGHT,
      offset: ROW_HEIGHT * index,
      index,
    }),
    []
  )

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <View className="flex-1 bg-zinc-950" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-zinc-800">
        <View>
          <Text className="text-xl font-mono font-semibold text-white tracking-tight">
            Product Catalogue
          </Text>
          <Text className="text-xs font-mono text-zinc-500 mt-0.5">
            {visible.length} of {products.length} products
          </Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={visible}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ListHeaderComponent={<Toolbar />}
        ListEmptyComponent={<EmptyState />}
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      {/* Toasts */}
      <View
        style={{ position: 'absolute', bottom: insets.bottom + 24, left: 0, right: 0 }}
        pointerEvents="box-none"
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onDismiss={() => dismissToast(t.id)}
          />
        ))}
      </View>

    </View>
  )
}