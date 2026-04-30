import { useProductStore } from "@/store/useProductStore"

export function useUndoRedo() {
  const undo = useProductStore((s) => s.undo)
  const redo = useProductStore((s) => s.redo)
  const canUndo = useProductStore((s) => s.canUndo)
  const canRedo = useProductStore((s) => s.canRedo)

  return { undo, redo, canUndo, canRedo }
}