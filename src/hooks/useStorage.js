import { useState, useEffect, useCallback } from 'react'
import { fetchApps, createApp, removeApp } from '../api/apps'

export function useStorage() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  const loadApps = useCallback(async () => {
    const data = await fetchApps()
    setApps(Array.isArray(data) ? data : [])
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await fetchApps()
        if (!cancelled) setApps(Array.isArray(data) ? data : [])
      } catch {
        if (!cancelled) setApps([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const addApp = useCallback(async (appData) => {
    const newApp = await createApp(appData)
    setApps((prev) => [...prev, newApp])
    return newApp
  }, [])

  const deleteApp = useCallback(async (id) => {
    await removeApp(id)
    setApps((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return { apps, loading, addApp, deleteApp, refreshApps: loadApps }
}
