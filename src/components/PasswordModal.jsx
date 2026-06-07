import { useState, useRef, useEffect } from 'react'
import { DEV_PASSWORD } from '../constants'

export default function PasswordModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === DEV_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`glass-card p-8 w-full max-w-md mx-4 animate-scale-in ${shake ? 'animate-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-orbitron text-xl font-bold text-center mb-2 gradient-text">
          🔐 GELİŞTİRİCİ ERİŞİMİ
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6 font-mono">
          Devam etmek için şifrenizi girin
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="Şifre..."
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border font-mono text-white
              placeholder-gray-500 outline-none transition-all
              focus:border-[#00d4ff] focus:shadow-[0_0_15px_rgba(0,212,255,0.3)]
              ${error ? 'border-red-500' : 'border-white/10'}`}
          />

          {error && (
            <p className="text-red-400 text-sm mt-2 font-mono animate-pulse">
              ❌ Yanlış şifre
            </p>
          )}

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              İPTAL
            </button>
            <button type="submit" className="btn-primary flex-1">
              GİRİŞ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
