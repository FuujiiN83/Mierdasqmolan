# Script para arreglar la codificación UTF-8 del blog.json
$content = Get-Content "data\blog.json" -Raw -Encoding UTF8
$content | Out-File "data\blog_fixed.json" -Encoding UTF8 -NoNewline
Copy-Item "data\blog_fixed.json" "data\blog.json" -Force
Remove-Item "data\blog_fixed.json"
Write-Host "Codificación UTF-8 arreglada correctamente"