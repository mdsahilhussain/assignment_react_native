import { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { useUIStore } from '@/store/useUIStore'
import { Category } from '@/types/product'
import { CATEGORIES } from '@/utils/mockData'

export default function CategoryDropdown() {
  const filterCategory = useUIStore((s) => s.filterCategory)
  const setFilterCategory = useUIStore((s) => s.setFilterCategory)
  const [open, setOpen] = useState(false)

  const options = ['All', ...CATEGORIES] as const

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-1 h-11 flex-row items-center justify-between px-3 border border-zinc-700 rounded bg-zinc-900"
      >
        <Text className="text-sm font-mono text-zinc-200" numberOfLines={1}>
          {filterCategory === 'All' ? 'All Categories' : filterCategory}
        </Text>
        <Text className="text-zinc-500 text-xs ml-2">▾</Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/60"
          activeOpacity={1}
          onPress={() => setOpen(false)}
        />
        <View className="bg-zinc-900 border-t border-zinc-700 rounded-t-2xl px-4 pt-3 pb-8">
          <View className="w-10 h-1 rounded-full bg-zinc-700 self-center mb-4" />
          <Text className="text-xs font-mono text-zinc-500 mb-3">Category</Text>
          {options.map((opt) => {
            const isSelected = filterCategory === opt
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => {
                  setFilterCategory(opt as Category | 'All')
                  setOpen(false)
                }}
                className={`flex-row items-center justify-between px-4 py-3 mb-1.5 rounded-lg border
                  ${isSelected ? 'border-zinc-400 bg-zinc-800' : 'border-zinc-800 bg-transparent'}`}
              >
                <Text className={`text-sm font-mono
                  ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                  {opt === 'All' ? 'All Categories' : opt}
                </Text>
                {isSelected && <Text className="text-white text-xs">✓</Text>}
              </TouchableOpacity>
            )
          })}
        </View>
      </Modal>
    </>
  )
}