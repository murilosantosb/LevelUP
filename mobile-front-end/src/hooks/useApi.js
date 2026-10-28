import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api, getData } from '../services/api'
import { deleteToken, getToken, saveToken } from '../services/tokenStorage'

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    networkMode: 'always',
    queryFn: async ({ signal }) => {
      if (!await getToken()) return null
      try {
        return await getData('/auth/me', { signal })
      } catch (error) {
        if (error.response?.status === 401) {
          await deleteToken()
          return null
        }
        throw error
      }
    },
    retry: false,
  })
}

export function useLogin() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const { data } = await api.post('/auth/login', { username: username.trim(), password }, { skipAuth: true })
      await saveToken(data.token)
      return data.usuario
    },
    onSuccess: async (user) => {
      await client.cancelQueries()
      client.removeQueries({ predicate: (query) => query.queryKey[0] !== 'session' })
      client.setQueryData(['session'], user)
    },
  })
}

export function useCadastro() {
  return useMutation({ mutationFn: (user) => api.post('/usuarios', user, { skipAuth: true }) })
}

export function useLogout() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout')
      await deleteToken()
    },
    onSuccess: async () => {
      await client.cancelQueries()
      client.removeQueries({ predicate: (query) => query.queryKey[0] !== 'session' })
      client.setQueryData(['session'], null)
    },
  })
}

export function useApiQuery(key, url, enabled = true) {
  const { data: user } = useSession()
  return useQuery({
    queryKey: ['account', user?.id, ...key],
    queryFn: ({ signal }) => getData(url, { signal }),
    enabled: Boolean(user) && enabled,
  })
}

export function useRegistrarAtividade() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (atividade) => api.post('/atividades-diarias', atividade),
    onSuccess: () => client.invalidateQueries({ queryKey: ['account'] }),
  })
}

export function useSeguir() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, seguindo }) => seguindo
      ? api.delete(`/usuarios/${id}/seguir`)
      : api.post(`/usuarios/${id}/seguir`),
    onSuccess: () => client.invalidateQueries({ queryKey: ['account'] }),
  })
}

export function useCriarTarefa() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (titulo) => api.post('/tarefas', { titulo }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['account'], predicate: (query) => query.queryKey.includes('tarefas') }),
  })
}

export function useConcluirTarefa() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.put(`/tarefas/${id}/concluir`).then(({ data }) => data),
    onSuccess: () => client.invalidateQueries({ queryKey: ['account'] }),
  })
}

export function usePosts() {
  const { data: user } = useSession()
  return useInfiniteQuery({
    queryKey: ['account', user?.id, 'posts'],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) => getData('/posts', { params: { page: pageParam, size: 10 }, signal }),
    getNextPageParam: (page) => page.last ? undefined : page.number + 1,
    enabled: Boolean(user),
  })
}

export function usePublicar() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ texto, fotoUrl }) => api.post('/posts', { texto: texto.trim(), fotoUrl: fotoUrl.trim() || null }),
    onSuccess: () => client.invalidateQueries({ queryKey: ['account'], predicate: (query) => query.queryKey.includes('posts') }),
  })
}
