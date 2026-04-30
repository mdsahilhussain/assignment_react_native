import { useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Category, RuntimeProduct } from '@/types/product'
import { useProductActions } from '../hooks/useProductActions'
import { CATEGORIES } from '../utils/mockData'

interface Props {
  visible: boolean
  product: RuntimeProduct
  onClose: () => void
}

export function EditCategoryModal({ visible, product, onClose }: Props) {
  const { debouncedEditCategory } = useProductActions()
  const insets = useSafeAreaInsets()

  const current = product._optimisticCategory ?? product.category
  const [selected, setSelected] = useState<Category>(current)

  const isDirty = selected !== current

  function handleApply() {
    debouncedEditCategory(product.id, selected)
    onClose()
  }

  function handleClose() {
    setSelected(current)
    onClose()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        className="flex-1 bg-black/70"
        onPress={handleClose}
      />

      {/* Sheet */}
      <View
        className="bg-zinc-900 border-t border-zinc-700 rounded-t-2xl"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        {/* Handle bar */}
        <View className="items-center pt-3 pb-1">
          <View className="w-10 h-1 rounded-full bg-zinc-700" />
        </View>

        <View className="px-5 pt-2 pb-4">
          <Text className="text-xs font-mono text-zinc-500 mb-1">
            Edit Category
          </Text>
          <Text className="text-white font-medium text-base leading-snug" numberOfLines={2}>
            {product.title}
          </Text>
        </View>

        <ScrollView bounces={false}>
          {CATEGORIES.map((cat) => {
            const isSelected = selected === cat
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelected(cat)}
                className={`
                  flex-row items-center gap-3 mx-4 mb-2 px-4 py-3
                  border rounded-lg
                  ${isSelected
                    ? 'border-zinc-400 bg-zinc-800'
                    : 'border-zinc-700 bg-transparent'}
                `}
              >
                {/* Radio indicator */}
                <View className={`w-4 h-4 rounded-full border-2 items-center justify-center
                  ${isSelected ? 'border-white' : 'border-zinc-600'}`}
                >
                  {isSelected && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </View>

                <Text className={`text-sm font-mono flex-1
                  ${isSelected ? 'text-white' : 'text-zinc-400'}`}
                >
                  {cat}
                </Text>

                {cat === current && (
                  <Text className="text-xs font-mono text-zinc-600">
                    current
                  </Text>
                )}
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Actions */}
        <View className="flex-row gap-3 px-4 pt-4">
          <TouchableOpacity
            onPress={handleClose}
            className="flex-1 py-3 border border-zinc-700 rounded-lg items-center"
          >
            <Text className="text-sm font-mono text-zinc-400">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleApply}
            disabled={!isDirty}
            className={`flex-1 py-3 rounded-lg items-center
              ${isDirty ? 'bg-white' : 'bg-zinc-800'}`}
          >
            <Text className={`text-sm font-mono
              ${isDirty ? 'text-zinc-900 font-medium' : 'text-zinc-600'}`}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}