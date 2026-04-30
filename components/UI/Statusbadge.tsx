import { ProductStatus } from '@/types/product';
import { Text, View } from 'react-native';

interface Props {
  status: ProductStatus
  error: string | null
}

const config: Record<ProductStatus, { label: string; className: string } | null> = {
  idle: null,
  saving: {
    label: 'Saving…',
    className: 'border-amber-400/30 bg-amber-400/10',
  },
  error: {
    label: 'Failed',
    className: 'border-red-400/30 bg-red-400/10',
  },
}

export function StatusBadge({ status, error: _error }: Props) {
  const cfg = config[status]
  if (!cfg) return null

  return (
    <View className={`flex-row items-center gap-1 px-2 py-0.5 border rounded ${cfg.className}`}>
      {status === 'saving' && (
        <View className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      )}
      <Text className={`text-xs font-mono ${status === 'saving' ? 'text-amber-400' : 'text-red-400'}`}>
        {cfg.label}
      </Text>
    </View>
  )
}