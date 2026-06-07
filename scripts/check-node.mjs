if (process.env.RENDER || process.env.CI) {
  process.exit(0)
}

const { node: version } = process.versions
const [major, minor] = version.split('.').map(Number)

const supported =
  (major === 20 && minor >= 19) ||
  (major === 22 && minor >= 12) ||
  major > 22

if (!supported) {
  console.error(
    `\nNode.js ${version} bu proje ile uyumlu değil.\n` +
      `Kullanilan: ${process.execPath}\n` +
      'Vite 8 için Node.js 20.19+ veya 22.12+ gerekir.\n\n' +
      'Çözüm (Windows):\n' +
      '  1. https://nodejs.org/ — 22.x LTS indirip kurun\n' +
      '  2. VEYA: winget install OpenJS.NodeJS.LTS\n' +
      '  3. Terminali kapatip yeniden acin\n' +
      '  4. node -v ile 22.x gorunene kadar kontrol edin\n',
  )
  process.exit(1)
}
