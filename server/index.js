import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const UPLOADS_DIR = path.join(__dirname, 'uploads')
const APPS_FILE = path.join(DATA_DIR, 'apps.json')
const DEV_PASSWORD = process.env.DEV_PASSWORD || 'nexus2025'
const PORT = Number(process.env.PORT) || 4000

fs.mkdirSync(DATA_DIR, { recursive: true })
fs.mkdirSync(UPLOADS_DIR, { recursive: true })

function readApps() {
  if (!fs.existsSync(APPS_FILE)) return []
  try {
    const data = JSON.parse(fs.readFileSync(APPS_FILE, 'utf-8'))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeApps(apps) {
  fs.writeFileSync(APPS_FILE, JSON.stringify(apps, null, 2), 'utf-8')
}

function toPublicApp(app) {
  return {
    ...app,
    downloadUrl: app.filePath ? `/uploads/${app.filePath}` : '',
  }
}

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    const safe = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    cb(null, safe)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
})

const app = express()
app.use(cors())
app.use('/uploads', express.static(UPLOADS_DIR))

function requireDev(req, res, next) {
  if (req.headers['x-dev-password'] !== DEV_PASSWORD) {
    return res.status(401).json({ error: 'Yetkisiz erişim' })
  }
  next()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/apps', (_req, res) => {
  res.json(readApps().map(toPublicApp))
})

app.post('/api/apps', requireDev, upload.single('file'), (req, res) => {
  const { name, category, description, icon, version } = req.body

  if (!name?.trim() || !category || !description?.trim()) {
    return res.status(400).json({ error: 'Zorunlu alanlar eksik' })
  }

  const entry = {
    id: crypto.randomUUID(),
    name: name.trim(),
    category,
    description: description.trim(),
    icon: icon?.trim() || '',
    version: version?.trim() || '',
    fileName: req.file?.originalname || '',
    filePath: req.file?.filename || '',
    addedAt: new Date().toISOString(),
  }

  const apps = readApps()
  apps.push(entry)
  writeApps(apps)

  res.status(201).json(toPublicApp(entry))
})

app.delete('/api/apps/:id', requireDev, (req, res) => {
  const apps = readApps()
  const index = apps.findIndex((a) => a.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Uygulama bulunamadı' })

  const [removed] = apps.splice(index, 1)
  if (removed.filePath) {
    const filePath = path.join(UPLOADS_DIR, removed.filePath)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  writeApps(apps)
  res.json({ ok: true })
})

const dist = path.join(__dirname, '..', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/^(?!\/api|\/uploads).*/, (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NEXUS STORE → port ${PORT}`)
})
