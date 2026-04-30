import { useUndoRedo } from '@/hooks/useUndoRedo'
import { Text, TouchableOpacity, View } from 'react-native'

export function UndoRedoBar() {
  const { undo, redo, canUndo, canRedo } = useUndoRedo()

  return (
    <View className="flex-row items-center gap-2">
      <TouchableOpacity
        onPress={undo}
        disabled={!canUndo}
        className={`px-3 py-1.5 border rounded ${canUndo ? 'border-zinc-600 bg-zinc-800' : 'border-zinc-800'}`}
      >
        <Text className={`text-xs font-mono ${canUndo ? 'text-zinc-300' : 'text-zinc-700'}`}>
          ↩ Undo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={redo}
        disabled={!canRedo}
        className={`px-3 py-1.5 border rounded ${canRedo ? 'border-zinc-600 bg-zinc-800' : 'border-zinc-800'}`}
      >
        <Text className={`text-xs font-mono ${canRedo ? 'text-zinc-300' : 'text-zinc-700'}`}>
          ↪ Redo
        </Text>
      </TouchableOpacity>
    </View>
  )
}