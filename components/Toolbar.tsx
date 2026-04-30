import { SortField, useUIStore } from '@/store/useUIStore'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CategoryDropdown from './CategoryDropdown'
import { UndoRedoBar } from './Undoredobar'


export function Toolbar() {
  const search = useUIStore((s) => s.search)
  const filterCategory = useUIStore((s) => s.filterCategory)
  const sortField = useUIStore((s) => s.sortField)
  const sortOrder = useUIStore((s) => s.sortOrder)
  const setSearch = useUIStore((s) => s.setSearch)
  const setSortField = useUIStore((s) => s.setSortField)
  const toggleSortOrder = useUIStore((s) => s.toggleSortOrder)
  const resetFilters = useUIStore((s) => s.resetFilters)

  const hasActiveFilters = search !== '' || filterCategory !== 'All'

  const sortFields: { value: SortField; label: string }[] = [
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
  ]

  return (
    <View className="bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-2 gap-3">
      {/* Search */}
      <View className="flex-row items-center bg-zinc-900 border border-zinc-700 rounded px-3 gap-2">
        <Text className="text-zinc-500 text-base">⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search products…"
          placeholderTextColor="#52525b"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          className="flex-1 py-2 text-sm font-mono text-zinc-200"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
            <Text className="text-zinc-500 text-xs">✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter + Sort row */}
      <View className="flex-row items-center gap-2">

        {/* Category picker */}
        {/* <View
          className="flex-1 border border-zinc-700 rounded bg-zinc-900"
          style={{ height: 44, justifyContent: 'center' }}
        >
          <Picker
            selectedValue={filterCategory}
            onValueChange={(val) => setFilterCategory(val as Category | 'All')}
            dropdownIconColor="#71717a"
            style={{
              color: '#e4e4e7',
              height: 44,
              marginTop: -4,
            }}
            itemStyle={{
              color: '#e4e4e7',
              fontSize: 13,
              height: 44,
            }}
          >
            <Picker.Item label="All Categories" value="All" />
            {CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View> */}
        <CategoryDropdown />

        {/* Sort field toggle */}
        <View className="flex-row border border-zinc-700 rounded overflow-hidden">
          {sortFields.map((f, i) => (
            <TouchableOpacity
              key={f.value}
              onPress={() => setSortField(f.value)}
              className={`px-3 py-2 ${sortField === f.value ? 'bg-zinc-700' : 'bg-zinc-900'} ${i === 0 ? 'border-r border-zinc-700' : ''}`}
            >
              <Text className={`text-xs font-mono ${sortField === f.value ? 'text-white' : 'text-zinc-400'}`}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sort order */}
        <TouchableOpacity
          onPress={toggleSortOrder}
          className="px-2.5 py-2 bg-zinc-900 border border-zinc-700 rounded"
        >
          <Text className="text-zinc-400 text-sm">
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Undo/redo + reset row */}
      <View className="flex-row items-center justify-between">
        <UndoRedoBar />
        {hasActiveFilters && (
          <TouchableOpacity onPress={resetFilters} hitSlop={8}>
            <Text className="text-xs font-mono text-zinc-500 underline">
              Reset
            </Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
}