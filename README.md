
# 🗓️ Conference Management API

Esta es la API para el proyecto de gestión de eventos/conferencias. Soporta:

- Gestión de eventos
- Suscripción a eventos
- Reseñas anónimas
- Sincronización con app Flutter (SQLite local)
- Seeder automático con subida de imágenes a Firebase Storage

---

## 🚀 Tecnologías

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Firebase Admin SDK
- Docker (para MongoDB o despliegue completo)

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/AntonyJDC/conference-api.git
cd conference-api
```

2. Instala dependencias:

```bash
npm install
```

3. Configura tu entorno `.env`:

```env
MONGO_URI=mongodb://localhost:27017/conference-api
PORT=3000

# Firebase
FIREBASE_BUCKET=your-app.appspot.com
```

4. Ejecuta en modo desarrollo:

```bash
npm run dev
```

---

## 🐳 Docker

Puedes levantar un contenedor de MongoDB con:

```bash
docker-compose up -d
```


---

## 🌱 Seeder

Para insertar datos falsos automáticamente y subir imágenes a Firebase Storage:

```bash
npm run seed
```

Este comando:
- Elimina eventos y reseñas antiguas
- Sube imágenes locales a Firebase Storage (si no existen)
- Inserta eventos predefinidos
- Genera reseñas aleatorias con comentarios coherentes según la calificación y la categoría

> Asegúrate de tener el archivo `serviceAccountKey.json` y tus imágenes en `scripts/images/`.

---

## 📁 Estructura

```
src/
├── controllers/
├── routes/
├── models/
├── database/
├── utils/
└── app.ts
scripts/
├── seed.ts
├── events.ts
└── images/
```

---

## 📚 Endpoints

### 📌 Eventos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/events` | Obtener todos los eventos |
| `POST` | `/api/events` | Crear un nuevo evento |
| `GET` | `/api/events/:id` | Obtener un evento por ID |
| `POST` | `/api/events/:id/subscribe` | Suscribirse a un evento (resta cupo) |
| `POST` | `/api/events/:id/unsubscribe` | Cancelar suscripción (aumenta cupo) |
| `PUT` | `/api/events/:id/` | Actualizar los datos del evento |
| `DELETE` | `/api/events/:id/` | Eliminar un evento |

---

### 📝 Reseñas

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/reviews/:id/create` | Crear una reseña para un evento |
| `GET` | `/api/reviews/:id/get` | Ver reseñas de un evento |

---

## 📌 Notas

- No se requiere autenticación (anónimo).
- Puedes conectar con MongoDB Atlas usando el string correcto en `MONGO_URI`.
- Compatible con sincronización Flutter ↔ API REST.

---

## 📬 Contacto

Proyecto académico — desarrollado por Antony Dominguez  
Basado en requisitos de la Universidad del Norte  
GitHub: [@AntonyJDC](https://github.com/AntonyJDC)
