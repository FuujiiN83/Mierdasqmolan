$content = Get-Content 'data\products_backup.json' -Raw -Encoding UTF8 | ConvertFrom-Json
$filteredProducts = @()
foreach ($product in $content) {
    if ($product.image -notlike '*placeholder.svg') {
        $filteredProducts += $product
    }
}
$json = $filteredProducts | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText((Join-Path (Get-Location) 'data\products.json'), $json, [System.Text.Encoding]::UTF8)
Write-Host "Productos filtrados: $($filteredProducts.Count)"
