// app/hooks/useUndoRedo.ts

import { useProductStore } from "@/store/useProductStore"

export function useUndoRedo() {
  const undo = useProductStore((s) => s.undo)
  const redo = useProductStore((s) => s.redo)
  const canUndo = useProductStore((s) => s.canUndo)
  const canRedo = useProductStore((s) => s.canRedo)

  // No keyboard bindings on mobile — undo/redo exposed via buttons only
  return { undo, redo, canUndo, canRedo }
}