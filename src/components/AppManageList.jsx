import { useState } from 'react'
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../constants'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function ManageItem({ app, onDelete }) {
  const [confirming, setConfirming] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const cat = CATEGORY_COLORS[app.category] || CATEGORY_COLORS.OTHER

  const handleDelete = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    setFlashing(true)
    setTimeout(() => {
      setRemoving(true)
      setTimeout(() => onDelete(app.id), 400)
    }, 200)
  }

  const handleCancel = () => setConfirming(false)

  return (
    <div
      className={`manage-item ${removing ? 'animate-slide-out' : ''} ${flashing ? 'bg-red-500/20' : ''}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-2xl shrink-0">
          {app.icon || app.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-orbitron text-white font-medium truncate">
              {app.name}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-mono"
              style={{
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                color: cat.text,
              }}
            >
              {CATEGORY_LABELS[app.category] || app.category}
            </span>
          </div>
          <p className="text-gray-500 text-xs font-mono truncate mt-0.5">
            {app.description}
          </p>
          <p className="text-gray-600 text-xs font-mono mt-0.5">
            {formatDate(app.addedAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {confirming ? (
          <>
            <span className="text-xs font-mono text-red-300 hidden sm:inline max-w-[180px]">
              Bu uygulamayı silmek istediğinize emin misiniz?
            </span>
            <button onClick={handleCancel} className="text-xs font-mono text-gray-400 hover:text-white px-2">
              Vazgeç
            </button>
            <button onClick={handleDelete} className="btn-delete">
              ✓ SİL
            </button>
          </>
        ) : (
          <button onClick={handleDelete} className="btn-delete">
            🗑 SİL
          </button>
        )}
      </div>
    </div>
  )
}

export default function AppManageList({ apps, onDelete }) {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <h2 className="font-orbitron text-lg font-bold text-white mb-4 shrink-0">
        📦 Yüklü Uygulamalar ({apps.length} adet)
      </h2>

      {apps.length === 0 ? (
        <p className="text-gray-500 font-mono text-sm text-center py-8">
          Henüz uygulama yok.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1 max-h-[600px] pr-1">
          {apps.map((app) => (
            <ManageItem key={app.id} app={app} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
