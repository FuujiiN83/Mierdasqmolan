# Script de deployment seguro para VPS
Write-Host "=== DEPLOYMENT SEGURO MQM WEB ===" -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: No se encuentra package.json. Ejecuta desde el directorio del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host "1. Limpiando node_modules y reinstalando dependencias..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

Write-Host "2. Instalando dependencias..." -ForegroundColor Yellow
npm install --production

Write-Host "3. Limpiando build anterior..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "4. Construyendo aplicación..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build falló. Revisa los errores arriba." -ForegroundColor Red
    exit 1
}

Write-Host "5. Iniciando aplicación en modo producción..." -ForegroundColor Yellow
Write-Host "Aplicación lista en: http://localhost:3000" -ForegroundColor Green
Write-Host "Para detener: Ctrl+C" -ForegroundColor Cyan

npm start
