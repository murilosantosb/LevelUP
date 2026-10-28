const key = 'levelup.access-token'
let memoryToken = null

export async function getToken() {
  try {
    return globalThis.sessionStorage.getItem(key)
  } catch {
    return memoryToken
  }
}

export async function saveToken(token) {
  memoryToken = token
  try {
    globalThis.sessionStorage.setItem(key, token)
  } catch {
    return
  }
}

export async function deleteToken() {
  memoryToken = null
  try {
    globalThis.sessionStorage.removeItem(key)
  } catch {
    return
  }
}
