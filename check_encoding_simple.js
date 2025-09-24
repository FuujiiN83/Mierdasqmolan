const fs = require('fs');

// Leer el archivo products.json
const filePath = 'data/products.json';
const content = fs.readFileSync(filePath, 'utf8');

console.log('🔍 Verificando codificación...');

// Buscar caracteres problemáticos específicos
const problems = [
  'asÃ­', 'Â¡', 'caracterÃ­sticas', 'impresiÃ³n', 'diseÃ±o', 
  'tamaÃ±os', 'PRÃCTICO', 'magnÃ©ticos', 'nostÃ¡lgico', 'pequeÃ±o'
];

let foundProblems = 0;
problems.forEach(char => {
  if (content.includes(char)) {
    console.log(`❌ Encontrado: ${char}`);
    foundProblems++;
  }
});

if (foundProblems === 0) {
  console.log('✅ No se encontraron caracteres problemáticos');
} else {
  console.log(`❌ Total de problemas encontrados: ${foundProblems}`);
}

// Verificar si contiene el producto Imanes retro
if (content.includes('Imanes retro')) {
  console.log('✅ Producto "Imanes retro" encontrado');
} else {
  console.log('❌ Producto "Imanes retro" NO encontrado');
}

