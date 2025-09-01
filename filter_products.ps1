$content = Get-Content 'data\products.json' -Raw | ConvertFrom-Json
$filteredProducts = @()
foreach ($product in $content) {
    if ($product.image -notlike '*placeholder.svg') {
        $filteredProducts += $product
    }
}
$filteredProducts | ConvertTo-Json -Depth 10 | Set-Content 'data\products_new.json' -Encoding UTF8
Write-Host "Productos filtrados: $($filteredProducts.Count)"
