import { useRef, useState } from 'react'
import { CATEGORIES } from '../constants'

const INITIAL = {
  name: '',
  category: 'GAME',
  description: '',
  icon: '',
  appFile: null,
  version: '',
}

export default function AddAppForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = true
    if (!form.category) next.category = true
    if (!form.description.trim()) next.description = true
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const resetForm = () => {
    setForm(INITIAL)
    setErrors({})
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null
    update('appFile', file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    await onAdd({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      icon: form.icon.trim(),
      appFile: form.appFile,
      version: form.version.trim(),
    })

    resetForm()
  }

  const inputClass = (field) =>
    `form-input ${errors[field] ? 'form-input-error' : ''}`

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <h2 className="font-orbitron text-lg font-bold text-white mb-5">
        ➕ UYGULAMA EKLE
      </h2>

      <div className="space-y-4">
        <div>
          <label className="form-label">Uygulama Adı *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Örn: Cyber Runner"
            className={inputClass('name')}
          />
        </div>

        <div>
          <label className="form-label">Kategori *</label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className={inputClass('category')}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">
            Kısa Açıklama * ({form.description.length}/150)
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value.slice(0, 150))}
            placeholder="Uygulamanın kısa açıklaması..."
            rows={3}
            className={inputClass('description')}
          />
        </div>

        <div>
          <label className="form-label">İkon Emoji</label>
          <input
            type="text"
            value={form.icon}
            onChange={(e) => update('icon', e.target.value)}
            placeholder="🎮"
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Uygulama Dosyaları</label>
          <div className="file-upload">
            <span
              className={`file-upload-name ${form.appFile ? '' : 'file-upload-name--empty'}`}
              title={form.appFile?.name}
            >
              {form.appFile ? form.appFile.name : 'Dosya seçilmedi'}
            </span>
            <button
              type="button"
              className="file-upload-browse"
              onClick={() => fileInputRef.current?.click()}
            >
              Gözat
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div>
          <label className="form-label">Versiyon (isteğe bağlı)</label>
          <input
            type="text"
            value={form.version}
            onChange={(e) => update('version', e.target.value)}
            placeholder="v1.2.0"
            className="form-input"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full mt-6">
        ➕ MAĞAZAYA EKLE
      </button>
    </form>
  )
}
