import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import path from 'path';
import fs from 'fs';
import { dummyEvents } from './events';
import EventModel from '../src/models/event.model';
import serviceAccount from '../serviceAccountKey.json';
import reviewModel from '../src/models/review.model';

dotenv.config();

// Inicializar Firebase
initializeApp({
    credential: cert(serviceAccount as any),
    storageBucket: process.env.FIREBASE_BUCKET,
});
const bucket = getStorage().bucket();

// Función para subir la imagen si no existe aún en Firebase
const uploadIfNotExists = async (fileName: string): Promise<string> => {
    const dest = `events/${fileName}`;
    const file = bucket.file(dest);

    const [exists] = await file.exists();
    if (!exists) {
        const localPath = path.resolve(__dirname, 'images', fileName);

        if (!fs.existsSync(localPath)) {
            throw new Error(`❌ Imagen no encontrada localmente: ${fileName}`);
        }

        await bucket.upload(localPath, {
            destination: dest,
            public: true,
            metadata: {
                cacheControl: 'public,max-age=31536000',
            },
        });

        console.log(`✅ Subida: ${fileName}`);
    } else {
        console.log(`🟡 Ya existe: ${fileName}`);
    }

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/events%2F${encodeURIComponent(fileName)}?alt=media`;
};

// Función principal
const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('✅ Conectado a MongoDB');

        await EventModel.deleteMany();
        console.log('🗑 Eventos antiguos eliminados');
        await reviewModel.deleteMany();
        console.log('🗑 Reseñas antiguas eliminadas');

        const preparedEvents = [];

        for (const event of dummyEvents) {
            const imageUrl = await uploadIfNotExists(event.imageFileName);
            preparedEvents.push({
                ...event,
                imageUrl,
            });
        }

        await EventModel.insertMany(preparedEvents);
        console.log('🚀 Eventos insertados con éxito');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

seed();
