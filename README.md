# Gestor de Videojocs RA9

Aplicación web para gestionar tu colección de videojuegos. Proyecto desarrollado como parte de la RA9 por **Marc Estepa** y **David Font**.

Este proyecto incluye:
- 🖥️ Un **frontend web interactivo** donde puedes añadir, modificar o eliminar juegos
- 📸 Soporte para subir imágenes (carátulas) de los juegos
- 🌐 Un **backend en Node.js** con Express y MongoDB para la gestión de datos
- 📁 Las imágenes se guardan en el servidor y se visualizan automáticamente

---

## Cómo clonar y ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/Calborobix12/GestorDeJuegos-RA9.git
```

### 2. Accede al backend y instala dependencias

```bash
cd GestorDeJuegos-RA9/backend
npm install
```
### 3. Inicia el backend

```bash
npm start
```

Verás en la consola:

```
🖥️ Servidor backend escoltant a http://localhost:3002
🔌 MongoDB connectat!
```

---

## Cómo acceder a la web

Abre en el navegador el archivo:

```
frontend/index.html
```

Si estás usando un servidor web (como Apache o Nginx), asegúrate de que sirva la carpeta `frontend`.

---

## ¿Qué puedes hacer en la web?

- Añadir juegos con título, plataforma, año y carátula
- Ver una **galería visual** de los juegos con imágenes grandes
- Editar juegos existentes
- Eliminar juegos de la lista

Cada juego se muestra con:

- Imagen del juego (formato cuadrado)
- Título, plataforma y año
- Botones de **Editar** (amarillo) y **Borrar** (rojo)

---

## Endpoints API (para pruebas manuales)

> Todos los endpoints están en `http://localhost:3002/api/games`

### 1. Obtener todos los juegos

```bash
curl -s http://localhost:3002/api/games | jq
```

### 2. Crear un juego (sin imagen)

```bash
curl -X POST http://localhost:3002/api/games   -H "Content-Type: application/json"   -d '{
    "title": "The Witcher 3",
    "platform": "PC",
    "year": 2015
  }'
```

### 3. Editar un juego (sin imagen)

```bash
curl -X PUT http://localhost:3002/api/games/<ID>   -H "Content-Type: application/json"   -d '{
    "title": "The Witcher 3: Wild Hunt",
    "platform": "PC",
    "year": 2015
  }'
```

### 4. Borrar un juego

```bash
curl -X DELETE http://localhost:3002/api/games/<ID>
```

---

## Tecnologías usadas

- **Frontend**: HTML5, CSS3, JavaScript (modular)
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB (con Mongoose)
- **Manejo de archivos**: Multer para subir imágenes
