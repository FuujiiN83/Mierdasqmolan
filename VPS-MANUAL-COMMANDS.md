# Comandos Manuales para VPS

## 1. Clonar el proyecto

```bash
# Crear directorio del proyecto
mkdir -p /opt/mqm-web
cd /opt/mqm-web

# Clonar desde GitHub
git clone https://github.com/FuujiiN83/Mierdasqmolan.git .

# Verificar que se clonó correctamente
ls -la
```

## 2. Instalar dependencias

```bash
# Asegurarse de estar en el directorio correcto
cd /opt/mqm-web

# Instalar dependencias con límites de memoria
NODE_OPTIONS="--max-old-space-size=256" npm install --production
```

## 3. Construir la aplicación

```bash
# Construir con límites de memoria
NODE_OPTIONS="--max-old-space-size=256" npm run build
```

## 4. Iniciar la aplicación

```bash
# Iniciar con límites de memoria
NODE_OPTIONS="--max-old-space-size=256" npm start
```

## 5. Verificar que funciona

```bash
# Verificar que el puerto 3000 esté abierto
netstat -tlnp | grep :3000

# Verificar procesos de Node
ps aux | grep node
```

## 6. Si hay problemas

```bash
# Ver logs de npm
npm logs

# Verificar memoria
free -h

# Verificar espacio en disco
df -h
```

## 7. Reiniciar si es necesario

```bash
# Parar todos los procesos de Node
pkill -f node

# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json .next
NODE_OPTIONS="--max-old-space-size=256" npm install --production
NODE_OPTIONS="--max-old-space-size=256" npm run build
NODE_OPTIONS="--max-old-space-size=256" npm start
```
