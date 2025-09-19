# Script de emergencia para VPS inestable
Write-Host "=== EMERGENCY DEPLOYMENT ===" -ForegroundColor Red

# Parar todos los procesos de Node
Write-Host "1. Parando procesos existentes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Limpiar completamente
Write-Host "2. Limpieza completa..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Instalar solo dependencias esenciales
Write-Host "3. Instalando dependencias mínimas..." -ForegroundColor Yellow
npm install --production --no-optional --no-audit --no-fund

# Build con configuración mínima
Write-Host "4. Build de emergencia..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=512"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build falló. Intentando build sin optimizaciones..." -ForegroundColor Red
    $env:NODE_OPTIONS="--max-old-space-size=256"
    npm run build
}

# Iniciar con límites de memoria
Write-Host "5. Iniciando con límites de memoria..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=512"
npm start
