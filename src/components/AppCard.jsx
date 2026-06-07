import { CATEGORY_COLORS, CATEGORY_LABELS } from '../constants'

function AppIcon({ app }) {
  if (app.icon) {
    if (app.icon.startsWith('http')) {
      return (
        <img
          src={app.icon}
          alt={app.name}
          className="w-14 h-14 rounded-xl object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )
    }
    return <span className="text-4xl">{app.icon}</span>
  }

  const colors = ['#00d4ff', '#39ff14', '#a855f7', '#ec4899', '#f59e0b']
  const color = colors[app.name.charCodeAt(0) % colors.length]

  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-orbitron font-bold"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {app.name.charAt(0).toUpperCase()}
    </div>
  )
}

export default function AppCard({ app, index, onDownload }) {
  const cat = CATEGORY_COLORS[app.category] || CATEGORY_COLORS.OTHER

  return (
    <div
      className="glass-card p-5 flex flex-col animate-card-enter hover:scale-[1.02] transition-transform duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4 mb-3">
        <AppIcon app={app} />
        <div className="flex-1 min-w-0">
          <h3 className="font-orbitron text-white font-semibold text-lg truncate">
            {app.name}
          </h3>
          <span
            className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium"
            style={{
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              color: cat.text,
            }}
          >
            {CATEGORY_LABELS[app.category] || app.category}
          </span>
        </div>
      </div>

      <p className="text-gray-400 text-sm font-mono line-clamp-2 mb-3 flex-1">
        {app.description}
      </p>

      {app.version && (
        <p className="text-gray-500 text-xs font-mono mb-3">
          {app.version}
        </p>
      )}

      <button onClick={() => onDownload(app)} className="btn-download w-full mt-auto">
        ⬇ YÜKLE
      </button>
    </div>
  )
}
