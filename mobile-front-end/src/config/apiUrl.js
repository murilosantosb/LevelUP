import Constants from 'expo-constants'
import { Platform } from 'react-native'

export function resolveApiUrl(configuredUrl, hostUri, platform) {
  if (configuredUrl?.trim()) return configuredUrl.trim().replace(/\/+$/, '')
  const host = hostUri ? new URL(`http://${hostUri}`).hostname : platform === 'android' ? '10.0.2.2' : 'localhost'
  return `http://${host}:8080/api`
}

const hostUri = Platform.OS === 'web' && typeof window !== 'undefined'
  ? window.location.hostname
  : Constants.expoConfig?.hostUri

export const apiUrl = resolveApiUrl(process.env.EXPO_PUBLIC_API_URL, hostUri, Platform.OS)
