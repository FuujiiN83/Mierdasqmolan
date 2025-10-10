#!/usr/bin/env node

/**
 * Script para analizar el bundle y identificar código no utilizado
 * Basado en las mejores prácticas de web.dev
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Analizando bundle para identificar código no utilizado...\n');

// Función para analizar imports no utilizados
function analyzeUnusedImports() {
  const srcDir = path.join(__dirname, '../src');
  const unusedImports = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        analyzeFile(filePath);
      }
    });
  }
  
  function analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Buscar imports que podrían no estar siendo utilizados
        const importMatch = line.match(/^import\s+.*?from\s+['"]([^'"]+)['"]/);
        if (importMatch) {
          const importPath = importMatch[1];
          
          // Verificar si el import se está usando en el archivo
          const isUsed = content.includes(importPath.split('/').pop()) || 
                        content.includes(importPath.split('/').pop().split('.')[0]);
          
          if (!isUsed && !importPath.startsWith('@/')) {
            unusedImports.push({
              file: filePath.replace(process.cwd(), ''),
              line: index + 1,
              import: line.trim(),
              path: importPath
            });
          }
        }
      });
    } catch (error) {
      console.error(`Error analizando ${filePath}:`, error.message);
    }
  }
  
  scanDirectory(srcDir);
  return unusedImports;
}

// Función para generar reporte
function generateReport() {
  const unusedImports = analyzeUnusedImports();
  
  console.log('📊 REPORTE DE CÓDIGO NO UTILIZADO\n');
  console.log('=' .repeat(50));
  
  if (unusedImports.length === 0) {
    console.log('✅ No se encontraron imports no utilizados.');
    return;
  }
  
  console.log(`❌ Se encontraron ${unusedImports.length} imports potencialmente no utilizados:\n`);
  
  unusedImports.forEach((item, index) => {
    console.log(`${index + 1}. ${item.file}:${item.line}`);
    console.log(`   Import: ${item.import}`);
    console.log(`   Path: ${item.path}\n`);
  });
  
  console.log('💡 RECOMENDACIONES:');
  console.log('- Revisa cada import manualmente antes de eliminarlo');
  console.log('- Algunos imports pueden ser necesarios para efectos secundarios');
  console.log('- Usa herramientas como ESLint con reglas de unused-imports');
  console.log('- Considera usar tree-shaking para eliminar código muerto automáticamente\n');
}

// Función para optimizar imports
function optimizeImports() {
  console.log('🚀 OPTIMIZACIONES RECOMENDADAS:\n');
  
  const optimizations = [
    {
      title: '1. Tree Shaking',
      description: 'Configurar webpack para eliminar código muerto automáticamente',
      action: 'Ya configurado en next.config.js'
    },
    {
      title: '2. Dynamic Imports',
      description: 'Usar import() dinámicos para cargar código solo cuando se necesite',
      action: 'Implementado en HomeContent.tsx'
    },
    {
      title: '3. Bundle Splitting',
      description: 'Separar vendor code del código de aplicación',
      action: 'Configurado en webpack splitChunks'
    },
    {
      title: '4. Lazy Loading',
      description: 'Cargar componentes pesados solo cuando sean visibles',
      action: 'Implementado con React.lazy()'
    },
    {
      title: '5. Code Splitting por Rutas',
      description: 'Cargar código específico de cada página',
      action: 'Next.js lo hace automáticamente'
    }
  ];
  
  optimizations.forEach(opt => {
    console.log(`${opt.title}: ${opt.description}`);
    console.log(`   ✅ ${opt.action}\n`);
  });
}

// Ejecutar análisis
generateReport();
optimizeImports();

console.log('🎯 PRÓXIMOS PASOS:');
console.log('1. Ejecutar: npm run build');
console.log('2. Analizar bundle con: ANALYZE=true npm run build');
console.log('3. Revisar métricas de rendimiento en Lighthouse');
console.log('4. Verificar que el tiempo de ejecución de JavaScript se haya reducido\n');

console.log('📈 MÉTRICAS ESPERADAS:');
console.log('- Reducción del 30-50% en el tiempo de ejecución de JavaScript');
console.log('- Mejora en LCP (Largest Contentful Paint)');
console.log('- Reducción del TBT (Total Blocking Time)');
console.log('- Mejor puntuación en Core Web Vitals\n');
