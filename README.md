# 🗓️ Conference Management API

Esta es la API para el proyecto de gestión de eventos/conferencias. Soporta:

- Gestión de eventos
- Suscripción a eventos
- Favoritos
- Reseñas anónimas
- Sincronización con app Flutter (SQLite local)

---

## 🚀 Tecnologías

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/conference-api.git
cd conference-api
```

2. Instala dependencias:

```bash
npm install
```

3. Configura tu `.env`:

```env
MONGO_URI=mongodb://localhost:27017/conference-api
PORT=3000
```

4. Ejecuta en modo desarrollo:

```bash
npm run dev
```

---

## 📁 Estructura

```
src/
├── controllers/
├── routes/
├── models/
├── database/
└── app.ts
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

---

### ⭐ Favoritos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/events/:id/favorite` | Agregar a favoritos |
| `DELETE` | `/api/events/:id/favorite` | Quitar de favoritos |
| `GET` | `/api/events/favorites` | Obtener lista de favoritos (solo IDs) |

---

### 📅 Eventos Reservados

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/events/:id/book` | Reservar (marcar como inscrito) |
| `DELETE` | `/api/events/:id/book` | Cancelar reserva |
| `GET` | `/api/events/booked` | Obtener lista de eventos reservados (IDs) |

---

### 📝 Reseñas

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/events/:id/reviews` | Crear una reseña para un evento |
| `GET` | `/api/events/:id/reviews` | Ver reseñas de un evento |

---

## 📌 Notas

- No se requiere autenticación (anónimo).
- Para usar Mongo Atlas, cambia `MONGO_URI` por el string de conexión.

---

## 📬 Contacto

Proyecto académico — desarrollado por [Tu Nombre].  
Basado en requisitos de la Universidad del Norte.
