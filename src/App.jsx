import { useState, useCallback } from 'react'
import { useStorage } from './hooks/useStorage'
import Header from './components/Header'
import AppGrid from './components/AppGrid'
import DevPanel from './components/DevPanel'
import PasswordModal from './components/PasswordModal'
import Toast from './components/Toast'
import ParticleBackground from './components/ParticleBackground'

export default function App() {
  const { apps, loading, addApp, deleteApp } = useStorage()
  const [view, setView] = useState('store')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }, [])

  const handleDevPanelClick = () => {
    if (isAuthenticated) {
      setView('dev')
    } else {
      setShowPasswordModal(true)
    }
  }

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true)
    setShowPasswordModal(false)
    setView('dev')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setView('store')
  }

  const handleDownload = (app) => {
    if (!app.downloadUrl) {
      showToast('İndirme başlatılıyor...', 'info')
      return
    }

    const link = document.createElement('a')
    link.href = app.downloadUrl
    link.download = app.fileName || app.name || 'download'

    if (app.downloadUrl.startsWith('http')) {
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
    }

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAdd = async (data) => {
    try {
      await addApp(data)
      showToast('✅ Uygulama eklendi!')
    } catch {
      showToast('Uygulama eklenemedi. Sunucu çalışıyor mu?', 'error')
    }
  }

  const handleDelete = async (id) => {
    await deleteApp(id)
    showToast('Uygulama silindi.', 'error')
  }

  return (
    <div className="relative min-h-screen bg-grid scanlines">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-8">
        <Header
          currentView={view}
          onNavigate={setView}
          onDevPanelClick={handleDevPanelClick}
        />

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="font-orbitron text-[#00d4ff] animate-pulse">
              Yükleniyor...
            </div>
          </div>
        ) : view === 'store' ? (
          <AppGrid apps={apps} onDownload={handleDownload} />
        ) : (
          <DevPanel
            apps={apps}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onLogout={handleLogout}
          />
        )}
      </div>

      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
