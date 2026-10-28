import * as SecureStore from 'expo-secure-store'

const key = 'levelup.access-token'

export const getToken = () => SecureStore.getItemAsync(key)
export const saveToken = (token) => SecureStore.setItemAsync(key, token)
export const deleteToken = () => SecureStore.deleteItemAsync(key)
