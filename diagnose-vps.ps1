# Script de diagnóstico para VPS
Write-Host "=== DIAGNÓSTICO VPS MQM WEB ===" -ForegroundColor Green

Write-Host "1. Verificando Node.js..." -ForegroundColor Yellow
node --version
npm --version

Write-Host "2. Verificando memoria disponible..." -ForegroundColor Yellow
Get-WmiObject -Class Win32_OperatingSystem | Select-Object TotalVisibleMemorySize, FreePhysicalMemory

Write-Host "3. Verificando espacio en disco..." -ForegroundColor Yellow
Get-WmiObject -Class Win32_LogicalDisk | Select-Object DeviceID, Size, FreeSpace

Write-Host "4. Verificando puertos en uso..." -ForegroundColor Yellow
netstat -an | findstr :3000

Write-Host "5. Verificando procesos de Node..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue

Write-Host "6. Verificando archivos del proyecto..." -ForegroundColor Yellow
if (Test-Path "package.json") { Write-Host "✓ package.json encontrado" -ForegroundColor Green } else { Write-Host "✗ package.json NO encontrado" -ForegroundColor Red }
if (Test-Path "next.config.js") { Write-Host "✓ next.config.js encontrado" -ForegroundColor Green } else { Write-Host "✗ next.config.js NO encontrado" -ForegroundColor Red }
if (Test-Path "src") { Write-Host "✓ carpeta src encontrada" -ForegroundColor Green } else { Write-Host "✗ carpeta src NO encontrada" -ForegroundColor Red }

Write-Host "7. Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Write-Host "✓ node_modules encontrado" -ForegroundColor Green } else { Write-Host "✗ node_modules NO encontrado" -ForegroundColor Red }

Write-Host "=== DIAGNÓSTICO COMPLETADO ===" -ForegroundColor Green
