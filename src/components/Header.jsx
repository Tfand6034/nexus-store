export default function Header({ currentView, onNavigate, onDevPanelClick }) {
  return (
    <header className="relative z-10 mb-10">
      <div className="text-center mb-6">
        <h1 className="font-orbitron text-3xl md:text-4xl font-black gradient-text tracking-wider">
          ⬡ NEXUS STORE
        </h1>
        <p className="text-gray-400 font-mono text-sm mt-2">
          Premium Apps &amp; Games — Built for the Pros
        </p>
      </div>

      <nav className="flex justify-center gap-3">
        <button
          onClick={() => onNavigate('store')}
          className={`nav-btn ${currentView === 'store' ? 'nav-btn-active' : ''}`}
        >
          STORE
        </button>
        <button
          onClick={onDevPanelClick}
          className={`nav-btn ${currentView === 'dev' ? 'nav-btn-active' : ''}`}
        >
          DEV PANEL 🔐
        </button>
      </nav>
    </header>
  )
}
