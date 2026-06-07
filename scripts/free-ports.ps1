$ports = 3000, 3001, 4000, 5173, 5174, 5175, 5176, 5177, 5178

foreach ($port in $ports) {
  $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  foreach ($conn in $connections) {
    $processId = $conn.OwningProcess
    if ($processId -and $processId -ne 0) {
      Write-Host "Port $port -> PID $processId sonlandiriliyor..."
      Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Host "Portlar temizlendi."
