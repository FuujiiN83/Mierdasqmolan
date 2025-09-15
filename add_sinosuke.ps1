# Script para añadir producto Sinosuke saludando
$json = Get-Content 'data\products.json' | ConvertFrom-Json

# Crear el nuevo producto
$newProduct = @{
    id = "149"
    slug = "sinosuke-saludando-figura"
    title = "Sinosuke Saludando"
    shortDescription = "Vas por la calle y nadie te saluda. Es algo que te molesta y quieres mas cercanía. Pues ale, toma, un Sinosuke que te saluda todo el tiempo ¿contento?"
    description = "<p>Vas por la calle y nadie te saluda. Es algo que te molesta y quieres mas cercanía. Pues ale, toma, un Sinosuke que te saluda todo el tiempo ¿contento?</p><h2>Características del producto</h2><ul><li><strong>Basado en el anime japonés Crayon Shinchan:</strong> Es una figura hecha en PVC diseñada y moldeada a mano, representando fielmente al personaje de Shinnosuke Nohara.</li><li><strong>Producto llega en su caja sellada:</strong> Garantiza la autenticidad y el estado perfecto de la figura desde el momento de la compra.</li><li><strong>Embalaje ecológico:</strong> Siéntete parte del mundo de la colección y los animes con esta figura que viene empaquetada en un embalaje ecológico, respetando el medio ambiente.</li><li><strong>Producto importado legalmente con licencia Banpresto:</strong> El producto llega en su caja original con soporte base incluido, garantizando la calidad y autenticidad oficial.</li><li><strong>Figura de acción coleccionable:</strong> Una figura de acción coleccionable para adultos y niños, perfecta para fans del anime y coleccionistas.</li></ul><h2>Especificaciones técnicas</h2><ul><li><strong>Tema:</strong> Anime</li><li><strong>Marca:</strong> Banpresto</li><li><strong>Color:</strong> Multicolor</li><li><strong>Estilo:</strong> Shinnosuke Nohara</li><li><strong>Material:</strong> Plástico (PVC)</li><li><strong>Dimensiones del producto:</strong> 10 x 10 x 18 centímetros</li><li><strong>Personaje en dibujos animados:</strong> Shinnosuke Nohara</li><li><strong>Rango de edad:</strong> Niño</li><li><strong>Número de piezas:</strong> 1</li><li><strong>Peso del producto:</strong> 350 Gramos</li><li><strong>Incluye:</strong> Soporte base</li><li><strong>Licencia:</strong> Oficial Banpresto</li></ul>"
    image = "/images/sinosuke.webp"
    alt = "Figura Sinosuke saludando - Figura de PVC Banpresto de Shinnosuke Nohara coleccionable"
    affiliateUrl = "https://amzn.to/4ppOTQL"
    merchant = "Amazon"
    price = 22.38
    currency = "EUR"
    categories = @("divertido", "frikis", "adolescentes", "hogar")
    isFeatured = $false
    createdAt = "2025-09-15T16:30:00Z"
    tags = @("sinosuke", "shinnosuke", "anime", "crayon", "shinchan", "figura", "pvc", "banpresto", "divertido", "frikis", "adolescentes", "hogar", "coleccionable")
}

# Añadir al principio del array
$newArray = @($newProduct) + $json

# Guardar el archivo
$newArray | ConvertTo-Json -Depth 10 | Set-Content 'data\products.json' -Encoding UTF8

Write-Host "Producto Sinosuke saludando añadido con ID 149"
Write-Host "Total de productos: $($newArray.Count)"
