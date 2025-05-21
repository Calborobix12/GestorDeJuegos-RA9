# GestorDeJuegos-RA9
Gestor de Juegos para el projecto de Programacion de la RA9 - Marc Estepa, David Font
Este proyecto es un backend en Node.js con Express y MongoDB para gestionar videojuegos.

## Cómo descargar el trabajo

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Calborobix12/GestorDeJuegos-RA9.git
   ```
2. Accede al directorio del proyecto:

   ```bash
   cd GestorDeJuegos-RA9/backend
   ```

## Ejecución

Dentro de la carpeta del backend, instala dependencias y arranca el servidor:

```bash
npm install        # Instala las dependencias
npm start          # Inicia el servidor
```

Verás en consola:

```
🖥️ Servidor backend escuchando en http://localhost:3002
🔌 MongoDB conectado!
```

## Endpoints con `curl`

A continuación ejemplos de cómo usar la API desde la terminal.

### 1. Leer todos los juegos

```bash
curl -s http://localhost:3002/api/games | jq
```

### 2. Crear un juego

```bash
curl -X POST http://localhost:3002/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Witcher 3",
    "platform": "PC",
    "year": 2015
  }'
```

### 3. Editar un juego

Reemplaza `<ID>` por el `_id` del juego a modificar.

```bash
curl -X PUT http://localhost:3002/api/games/<ID> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Witcher 3: Wild Hunt",
    "platform": "PC",
    "year": 2015
  }'
```

### 4. Borrar un juego

Reemplaza `<ID>` por el `_id` del juego a eliminar.

```bash
curl -X DELETE http://localhost:3002/api/games/<ID>
```
