import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.4)]',
    error: 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    info: 'border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.4)]',
  }

  return (
    <div
      className={`fixed top-5 right-5 z-[100] px-5 py-3 rounded-lg
        bg-[rgba(255,255,255,0.06)] backdrop-blur-md border
        font-mono text-sm text-white animate-slide-in
        ${colors[type]}`}
    >
      {message}
    </div>
  )
}
