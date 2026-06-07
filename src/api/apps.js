import { DEV_PASSWORD } from '../constants'

const API = '/api'

async function parseError(res) {
  try {
    const data = await res.json()
    return data.error || 'İstek başarısız'
  } catch {
    return 'İstek başarısız'
  }
}

export async function fetchApps() {
  const res = await fetch(`${API}/apps`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function createApp({ appFile, ...fields }) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value ?? '')
  }
  if (appFile) formData.append('file', appFile)

  const res = await fetch(`${API}/apps`, {
    method: 'POST',
    headers: { 'x-dev-password': DEV_PASSWORD },
    body: formData,
  })

  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function removeApp(id) {
  const res = await fetch(`${API}/apps/${id}`, {
    method: 'DELETE',
    headers: { 'x-dev-password': DEV_PASSWORD },
  })

  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}
