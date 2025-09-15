# Script para eliminar productos con ID 147 y 148
$json = Get-Content 'data\products.json' | ConvertFrom-Json
$filtered = $json | Where-Object { $_.id -ne '148' -and $_.id -ne '147' }
$filtered | ConvertTo-Json -Depth 10 | Set-Content 'data\products.json' -Encoding UTF8
Write-Host "Productos eliminados: ID 147 (Taza Sinosuke) y ID 148 (Sinosuke Saludando)"
Write-Host "Productos restantes: $($filtered.Count)"
