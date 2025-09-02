# Script para arreglar la codificación UTF-8 del archivo products.json
# Este script convierte el archivo a UTF-8 correcto

Write-Host "Arreglando codificación UTF-8 del archivo products.json..." -ForegroundColor Yellow

# Ruta del archivo
$inputFile = "data/products.json"
$outputFile = "data/products_fixed_utf8.json"

# Verificar si existe el archivo de entrada
if (-not (Test-Path $inputFile)) {
    Write-Host "Error: No se encuentra el archivo $inputFile" -ForegroundColor Red
    exit 1
}

try {
    # Leer el archivo con codificación incorrecta (probablemente Windows-1252 o ISO-8859-1)
    $content = Get-Content $inputFile -Raw -Encoding Default
    
    # Convertir a UTF-8
    $utf8Content = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::Default.GetBytes($content))
    
    # Guardar con codificación UTF-8
    [System.IO.File]::WriteAllText($outputFile, $utf8Content, [System.Text.Encoding]::UTF8)
    
    Write-Host "Archivo convertido exitosamente a UTF-8: $outputFile" -ForegroundColor Green
    
    # Crear backup del archivo original
    $backupFile = "data/products_backup_before_fix.json"
    Copy-Item $inputFile $backupFile
    Write-Host "Backup creado: $backupFile" -ForegroundColor Cyan
    
    # Reemplazar el archivo original
    Copy-Item $outputFile $inputFile
    Write-Host "Archivo original reemplazado con la versión corregida" -ForegroundColor Green
    
    # Verificar que se puede leer correctamente
    $testContent = Get-Content $inputFile -Raw -Encoding UTF8
    Write-Host "Verificación: El archivo se puede leer correctamente en UTF-8" -ForegroundColor Green
    
} catch {
    Write-Host "Error durante la conversión: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Proceso completado exitosamente!" -ForegroundColor Green
