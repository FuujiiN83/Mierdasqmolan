# Script para solucionar el cierre del VPS
Write-Host "=== SOLUCIONANDO CRASH DEL VPS ===" -ForegroundColor Red

Write-Host "1. Verificando memoria del sistema..." -ForegroundColor Yellow
$memory = Get-WmiObject -Class Win32_OperatingSystem
$totalMemory = [math]::Round($memory.TotalVisibleMemorySize / 1MB, 2)
$freeMemory = [math]::Round($memory.FreePhysicalMemory / 1MB, 2)
Write-Host "Memoria total: $totalMemory MB" -ForegroundColor Cyan
Write-Host "Memoria libre: $freeMemory MB" -ForegroundColor Cyan

if ($freeMemory -lt 100) {
    Write-Host "ADVERTENCIA: Poca memoria libre. Liberando memoria..." -ForegroundColor Red
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
    [System.GC]::Collect()
}

Write-Host "2. Parando todos los procesos Node..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "3. Limpiando archivos temporales..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\* -ErrorAction SilentlyContinue

Write-Host "4. Usando package.json mínimo..." -ForegroundColor Yellow
Copy-Item package-minimal.json package.json -Force

Write-Host "5. Instalando con límites de memoria..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=256"
npm install --production --no-optional --no-audit --no-fund --silent

Write-Host "6. Build con configuración mínima..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=256"
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build exitoso. Iniciando servidor..." -ForegroundColor Green
    $env:NODE_OPTIONS="--max-old-space-size=256"
    npm start
} else {
    Write-Host "✗ Build falló. Verifica los errores arriba." -ForegroundColor Red
}
