# Script para solucionar el problema de directorio en VPS
Write-Host "=== SOLUCIONANDO PROBLEMA DE DIRECTORIO VPS ===" -ForegroundColor Red

Write-Host "1. Verificando directorio actual..." -ForegroundColor Yellow
Write-Host "Directorio actual: $(Get-Location)" -ForegroundColor Cyan

Write-Host "2. Verificando si estamos en el directorio correcto..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✓ package.json encontrado en directorio actual" -ForegroundColor Green
} else {
    Write-Host "✗ package.json NO encontrado. Buscando en subdirectorios..." -ForegroundColor Red
    
    # Buscar package.json en subdirectorios
    $packageJsonPath = Get-ChildItem -Recurse -Name "package.json" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($packageJsonPath) {
        Write-Host "✓ package.json encontrado en: $packageJsonPath" -ForegroundColor Green
        $projectDir = Split-Path $packageJsonPath -Parent
        Write-Host "Cambiando al directorio del proyecto: $projectDir" -ForegroundColor Yellow
        Set-Location $projectDir
    } else {
        Write-Host "✗ No se encontró package.json en ningún subdirectorio" -ForegroundColor Red
        Write-Host "Verifica que el proyecto esté clonado correctamente" -ForegroundColor Red
        exit 1
    }
}

Write-Host "3. Verificando estructura del proyecto..." -ForegroundColor Yellow
if (Test-Path "src") { Write-Host "✓ Carpeta src encontrada" -ForegroundColor Green } else { Write-Host "✗ Carpeta src NO encontrada" -ForegroundColor Red }
if (Test-Path "next.config.js") { Write-Host "✓ next.config.js encontrado" -ForegroundColor Green } else { Write-Host "✗ next.config.js NO encontrado" -ForegroundColor Red }

Write-Host "4. Limpiando instalación anterior..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "5. Instalando dependencias desde el directorio correcto..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=256"
npm install --production --no-optional --no-audit --no-fund

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install falló. Verifica la conexión a internet y permisos." -ForegroundColor Red
    exit 1
}

Write-Host "6. Construyendo aplicación..." -ForegroundColor Yellow
$env:NODE_OPTIONS="--max-old-space-size=256"
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build exitoso. Iniciando servidor..." -ForegroundColor Green
    $env:NODE_OPTIONS="--max-old-space-size=256"
    npm start
} else {
    Write-Host "✗ Build falló. Revisa los errores arriba." -ForegroundColor Red
}
