import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import * as Network from 'expo-network'
import { focusManager, onlineManager } from '@tanstack/react-query'

export function useNativeQueryEvents() {
  useEffect(() => {
    if (Platform.OS === 'web') return
    focusManager.setFocused(AppState.currentState === 'active')
    const appState = AppState.addEventListener('change', (state) => focusManager.setFocused(state === 'active'))
    let mounted = true
    const updateNetwork = (state) => {
      if (mounted) onlineManager.setOnline(state.isConnected !== false && state.isInternetReachable !== false)
    }
    const network = Network.addNetworkStateListener(updateNetwork)
    Network.getNetworkStateAsync().then(updateNetwork).catch(() => {})
    return () => {
      mounted = false
      appState.remove()
      network.remove()
    }
  }, [])
}
