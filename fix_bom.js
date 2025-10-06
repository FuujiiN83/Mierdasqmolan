const fs = require('fs');

// Leer el archivo con BOM
const content = fs.readFileSync('data/products.json', 'utf8');

// Eliminar BOM si existe
const cleanContent = content.replace(/^\uFEFF/, '');

// Escribir sin BOM
fs.writeFileSync('data/products.json', cleanContent, 'utf8');

console.log('BOM eliminado correctamente');
