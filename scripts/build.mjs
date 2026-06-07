import { spawnSync } from 'node:child_process'

if (process.env.DEV_PASSWORD && !process.env.VITE_DEV_PASSWORD) {
  process.env.VITE_DEV_PASSWORD = process.env.DEV_PASSWORD
}

const result = spawnSync('npx', ['vite', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
})

process.exit(result.status ?? 1)
