# 🗓️ Conference Management API

Esta es la API para el proyecto de gestión de eventos/conferencias. Soporta:

- Gestión de eventos
- Suscripción a eventos
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
git clone https://github.com/AntonyJDC/conference-api.git
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
- Para usar Mongo Atlas, cambia `MONGO_URI` por el string de conexión.

---

## 📬 Contacto

Proyecto académico — desarrollado por Antony Dominguez.
Basado en requisitos de la Universidad del Norte.
