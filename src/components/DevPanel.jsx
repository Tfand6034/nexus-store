import AddAppForm from './AddAppForm'
import AppManageList from './AppManageList'

export default function DevPanel({ apps, onAdd, onDelete, onLogout }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-orbitron text-2xl font-bold gradient-text">
          ⚙️ GELİŞTİRİCİ PANELİ
        </h2>
        <button onClick={onLogout} className="btn-secondary text-sm">
          ÇIKIŞ
        </button>
      </div>

      <div className="dev-layout">
        <div className="dev-form-col">
          <AddAppForm onAdd={onAdd} />
        </div>
        <div className="dev-list-col">
          <AppManageList apps={apps} onDelete={onDelete} />
        </div>
      </div>
    </div>
  )
}
