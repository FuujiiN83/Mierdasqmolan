// Test de importación
try {
  const blogData = require('./data/blog.json');
  console.log('✅ Importación exitosa');
  console.log('Número de posts:', blogData.length);
  console.log('Primer post:', blogData[0]?.title);
} catch (error) {
  console.log('❌ Error en importación:', error.message);
}

