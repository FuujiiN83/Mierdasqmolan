# Script cuidadoso para corregir codificación
Write-Host "🔧 Iniciando corrección cuidadosa de codificación..."

# Crear backup
$backupName = "products_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').json"
Copy-Item 'data\products.json' "data\$backupName"
Write-Host "💾 Backup creado: $backupName"

# Leer archivo
$content = Get-Content 'data\products.json' -Raw
Write-Host "📖 Archivo leído correctamente"

# Contar caracteres problemáticos antes
$beforeCount = 0
$problems = @('asÃ­', 'Â¡', 'caracterÃ­sticas', 'impresiÃ³n', 'diseÃ±o', 'tamaÃ±os', 'PRÃCTICO', 'magnÃ©ticos', 'nostÃ¡lgico', 'pequeÃ±o', 'DescripciÃ³n', 'tÃ©cnicas', 'TamaÃ±o', 'DecoraciÃ³n', 'NÃºmero', 'NÃºm.', 'identificaciÃ³n')
foreach ($problem in $problems) {
    $count = ([regex]::Matches($content, [regex]::Escape($problem))).Count
    $beforeCount += $count
    if ($count -gt 0) {
        Write-Host "🔍 Encontrados $count casos de '$problem'"
    }
}

Write-Host "📊 Total de caracteres problemáticos encontrados: $beforeCount"

# Aplicar correcciones
$content = $content -replace 'asÃ­', 'así'
$content = $content -replace 'Â¡', '¡'
$content = $content -replace 'caracterÃ­sticas', 'características'
$content = $content -replace 'impresiÃ³n', 'impresión'
$content = $content -replace 'diseÃ±o', 'diseño'
$content = $content -replace 'tamaÃ±os', 'tamaños'
$content = $content -replace 'PRÃCTICO', 'PRÁCTICO'
$content = $content -replace 'magnÃ©ticos', 'magnéticos'
$content = $content -replace 'nostÃ¡lgico', 'nostálgico'
$content = $content -replace 'pequeÃ±o', 'pequeño'
$content = $content -replace 'DescripciÃ³n', 'Descripción'
$content = $content -replace 'tÃ©cnicas', 'técnicas'
$content = $content -replace 'TamaÃ±o', 'Tamaño'
$content = $content -replace 'DecoraciÃ³n', 'Decoración'
$content = $content -replace 'NÃºmero', 'Número'
$content = $content -replace 'NÃºm\.', 'Núm.'
$content = $content -replace 'identificaciÃ³n', 'identificación'

# Contar caracteres problemáticos después
$afterCount = 0
foreach ($problem in $problems) {
    $count = ([regex]::Matches($content, [regex]::Escape($problem))).Count
    $afterCount += $count
}

$corrected = $beforeCount - $afterCount
Write-Host "✅ Caracteres corregidos: $corrected"

# Guardar archivo
$content | Out-File 'data\products.json' -Encoding UTF8 -NoNewline
Write-Host "💾 Archivo guardado con codificación UTF-8"

# Verificar que el producto Imanes retro sigue presente
if ($content -match 'Imanes retro') {
    Write-Host "✅ Producto 'Imanes retro' verificado"
} else {
    Write-Host "❌ ERROR: Producto 'Imanes retro' no encontrado"
}

Write-Host "🎉 Proceso completado"
