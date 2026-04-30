import { useEffect, useRef } from 'react'
import { Animated, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  message: string
  type?: 'error' | 'success'
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, type = 'error', onDismiss, duration = 4000 }: Props) {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(8)).current
  const insets = useSafeAreaInsets()

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(onDismiss)
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  const bgClass = type === 'error'
    ? 'bg-red-950 border-red-500/40'
    : 'bg-emerald-950 border-emerald-500/40'

  const textClass = type === 'error' ? 'text-red-300' : 'text-emerald-300'

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: insets.bottom + 24,
        left: 16,
        right: 16,
        opacity,
        transform: [{ translateY }],
        zIndex: 50,
      }}
      className={`flex-row items-center gap-3 px-4 py-3 border rounded ${bgClass}`}
    >
      <Text className={`flex-1 text-sm font-mono ${textClass}`}>
        {message}
      </Text>
      <TouchableOpacity onPress={onDismiss} hitSlop={8}>
        <Text className={`text-xs opacity-50 ${textClass}`}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}