import AppCard from './AppCard'

export default function AppGrid({ apps, onDownload }) {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">🚀</span>
        <p className="text-gray-400 font-mono text-lg max-w-md">
          Henüz uygulama eklenmedi. Geliştirici panelinden başlayın.
        </p>
      </div>
    )
  }

  return (
    <div className="app-grid">
      {apps.map((app, i) => (
        <AppCard key={app.id} app={app} index={i} onDownload={onDownload} />
      ))}
    </div>
  )
}
