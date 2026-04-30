import { memo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import { StatusBadge } from '@/components/UI/Statusbadge'
import { RuntimeProduct } from '@/types/product'
import { EditCategoryModal } from '../Editcategorymodal'


interface Props {
  product: RuntimeProduct
}

function RatingStars({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <View className="flex-row items-center gap-1">
      <View className="flex-row">
        {Array.from({ length: 5 }, (_, i) => (
          <Text key={i} className={`text-xs ${i < filled ? 'text-amber-400' : 'text-zinc-700'}`}>
            ★
          </Text>
        ))}
      </View>
      <Text className="text-xs font-mono text-zinc-500">{rating.toFixed(1)}</Text>
    </View>
  )
}

export const ProductRow = memo(function ProductRow({ product }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  const displayCategory = product._optimisticCategory ?? product.category
  const isLocked = product._lockedByUser

  return (
    <>
      <View
        className={`
          flex-row items-center px-4 py-3 border-b border-zinc-800/60
          ${isLocked ? 'opacity-60' : ''}
        `}
      >
        {/* Left — product info */}
        <View className="flex-1 gap-1.5 mr-3">
          <Text
            className="text-sm text-zinc-200 leading-snug"
            numberOfLines={1}
          >
            {product.title}
          </Text>

          <View className="flex-row items-center flex-wrap gap-2">
            <Text className="text-sm font-mono text-zinc-300 tabular-nums">
              ${product.price.toFixed(2)}
            </Text>

            <View className="px-1.5 py-0.5 border border-zinc-700 rounded bg-zinc-800/50">
              <Text className="text-xs font-mono text-zinc-400">
                {displayCategory}
              </Text>
            </View>

            <RatingStars rating={product.rating} />

            <StatusBadge status={product._status} error={product._error} />
          </View>
        </View>

        {/* Right — edit button */}
        <Pressable
          onPress={() => setModalOpen(true)}
          disabled={isLocked}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          className={`
            px-3 py-1.5 border rounded
            ${isLocked ? 'border-zinc-800' : 'border-zinc-700'}
          `}
        >
          <Text className={`text-xs font-mono ${isLocked ? 'text-zinc-700' : 'text-zinc-400'}`}>
            Edit
          </Text>
        </Pressable>
      </View>

      <EditCategoryModal
        visible={modalOpen}
        product={product}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
})