export const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD || 'nexus2025'

export const STORAGE_KEY = 'nexus_apps'

export const CATEGORIES = ['GAME', 'UTILITY', 'TOOL', 'DESIGN', 'OTHER']

export const CATEGORY_COLORS = {
  GAME: { bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', text: '#c084fc' },
  UTILITY: { bg: 'rgba(0, 212, 255, 0.2)', border: '#00d4ff', text: '#67e8f9' },
  TOOL: { bg: 'rgba(57, 255, 20, 0.2)', border: '#39ff14', text: '#86efac' },
  DESIGN: { bg: 'rgba(236, 72, 153, 0.2)', border: '#ec4899', text: '#f9a8d4' },
  OTHER: { bg: 'rgba(156, 163, 175, 0.2)', border: '#9ca3af', text: '#d1d5db' },
}

export const CATEGORY_LABELS = {
  GAME: 'OYUN',
  UTILITY: 'YARDIMCI',
  TOOL: 'ARAÇ',
  DESIGN: 'TASARIM',
  OTHER: 'DİĞER',
}
