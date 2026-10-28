import { create } from 'axios'
import { apiUrl } from '../config/apiUrl'
import { getToken } from './tokenStorage'

export const api = create({
  baseURL: apiUrl,
  timeout: 15000,
})

api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token && !config.skipAuth) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function errorMessage(error) {
  return error?.response?.data?.message || (error?.response
    ? 'Não foi possível concluir a solicitação.'
    : 'Não foi possível conectar à API. Verifique sua conexão e se o backend está em execução.')
}

export const getData = (url, config) => api.get(url, config).then(({ data }) => data)
