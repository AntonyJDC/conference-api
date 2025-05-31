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

const commentSamples: { [key: string]: string[] } = {
    excellent: [
        '¡Excelente evento! Todo estuvo perfectamente organizado.',
        'Una experiencia inolvidable, superó mis expectativas.',
        'Sin duda volvería a asistir. 10/10.',
        'Ambiente espectacular y contenido muy relevante.',
        'Los ponentes fueron increíbles, muy preparados.',
        'Una logística impecable, puntual y fluida.',
        'Me encantó cada parte del evento. Gracias.',
        'Increíble puesta en escena, fue mágico.',
        'Todo el equipo organizador merece felicitaciones.',
        'Evento de primera calidad, lo recomiendo a todos.',
    ],
    good: [
        'Muy buen evento, aunque hay algunos detalles que mejorar.',
        'Me gustó mucho, aunque faltó más participación del público.',
        'Buena organización y contenido interesante.',
        'En general fue un evento agradable y provechoso.',
        'Los horarios se respetaron, buena señalización.',
        'Una experiencia enriquecedora, aunque con algunos fallos menores.',
        'Buen ambiente y atención adecuada.',
        'Cumplió con lo que prometía, volvería.',
        'Algunas charlas fueron excelentes, otras normales.',
        'Buen lugar y buena energía del equipo organizador.',
    ],
    average: [
        'Fue un evento aceptable, sin muchos sobresaltos.',
        'No fue malo, pero tampoco destacable.',
        'Hubo partes muy buenas y otras aburridas.',
        'Faltó más interacción o dinamismo.',
        'Estuvo bien, pero se notó improvisación en algunos momentos.',
        'Ni bueno ni malo, simplemente correcto.',
        'Esperaba un poco más por la publicidad que hicieron.',
        'Hubo retrasos y poca claridad en los horarios.',
        'Los espacios estaban algo desorganizados.',
        'El contenido fue regular, no muy profundo.',
    ],
    bad: [
        'No me gustó mucho, hubo varios errores logísticos.',
        'Poca organización y desinformación general.',
        'Se notó falta de planificación y coordinación.',
        'Los ponentes no estaban bien preparados.',
        'Faltó puntualidad y orden en general.',
        'Demasiado largo para lo poco que ofrecieron.',
        'No cumplió mis expectativas, parecía improvisado.',
        'Problemas de sonido y retrasos constantes.',
        'Mal señalizado y difícil de seguir.',
        'Esperaba algo mucho más profesional.',
    ],
    terrible: [
        'Muy mal evento, una pérdida de tiempo total.',
        'Todo fue un caos desde el principio.',
        'No había nadie que informara correctamente.',
        'Muy mala experiencia, no volvería jamás.',
        'Retrasos, desorganización y contenido pobre.',
        'El lugar no era adecuado para el evento.',
        'No aprendí nada útil, todo fue relleno.',
        'Una decepción total, esperaba mucho más.',
        'Desastre total. Lo peor que he asistido.',
        'Ni siquiera los organizadores sabían qué hacer.',
    ],
};

const generateReviews = (eventId: string): any[] => {
    const count = Math.floor(Math.random() * 8) + 3;
    const reviews = [];

    for (let i = 0; i < count; i++) {
        const rating = Math.floor(Math.random() * 5) + 1;
        let commentCategory: string;
        if (rating >= 5) commentCategory = 'excellent';
        else if (rating >= 4) commentCategory = 'good';
        else if (rating >= 3) commentCategory = 'average';
        else if (rating >= 2) commentCategory = 'bad';
        else commentCategory = 'terrible';

        const comments = commentSamples[commentCategory];
        const comment = comments[Math.floor(Math.random() * comments.length)];

        reviews.push({
            id: `${eventId}-review-${i + 1}`,
            eventId,
            rating,
            comment,
            createdAt: new Date().toISOString(),
        });
    }

    return reviews;
};


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


        const allReviews = preparedEvents.flatMap(event => generateReviews(event.id));
        await reviewModel.insertMany(allReviews);
        console.log(`📝 ${allReviews.length} reseñas generadas e insertadas`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

seed();
