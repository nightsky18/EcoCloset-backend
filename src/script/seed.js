// src/seed.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Store from '../models/Store.js';
import Event from '../models/Event.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

const MONGODB_URI = process.env.MONGODB_URI;

const run = async () => {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Conexión OK');

    // 1. Crear un usuario admin de prueba
    const adminEmail = 'admin@ecocloset.co';
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      admin = await User.create({
        nombre: 'Admin EcoCloset',
        email: adminEmail,
        passwordHash: '$2b$10$N2Q4pZQp0pN8wL7Qk8h3Fucd8BZt8Jp5fM9A8XQJp9mK4vCj4aMi', // "Admin123" en bcrypt (puedes cambiarlo si quieres)
        rol: 'ADMIN',
      });
      console.log('Usuario admin creado:', admin.email);
    } else {
      console.log('Usuario admin ya existe:', admin.email);
    }

    // 2. Limpiar colecciones (opcional)
    await Store.deleteMany({});
    await Event.deleteMany({});
    await Post.deleteMany({});
    console.log('Colecciones Store, Event y Post limpiadas');

    // 3. Tiendas de prueba
    const stores = await Store.insertMany([
      {
        tipo: 'TIENDA',
        nombre: 'EcoModa Centro',
        descripcion: 'Tienda de ropa de segunda mano en el centro de la ciudad.',
        categorias: 'Ropa,Accesorios',
        ciudad: 'Medellín',
        departamento: 'Antioquia',
        direccion: 'Calle 50 #45-30',
        telefono: '3001234567',
        email: 'ecomoda@ejemplo.com',
        redes: { instagram: '@ecomoda', facebook: 'facebook.com/ecomoda' },
        destacado: true,
      },
      {
        tipo: 'ORGANIZACION',
        nombre: 'Fundación Ropero Solidario',
        descripcion: 'Organización que recibe donaciones de ropa para comunidades vulnerables.',
        categorias: 'Donaciones',
        ciudad: 'Envigado',
        departamento: 'Antioquia',
        direccion: 'Carrera 43 #30-10',
        telefono: '3019876543',
        email: 'contacto@roperosolidario.org',
        destacado: false,
      },
    ]);

    console.log(`Tiendas creadas: ${stores.length}`);

    // 4. Eventos de prueba
    const ahora = new Date();
    const enUnaSemana = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);

    const events = await Event.insertMany([
      {
        titulo: 'Feria de Trueque EcoModa',
        descripcion: 'Intercambio de ropa y accesorios en buen estado.',
        fechaInicio: ahora,
        fechaFin: enUnaSemana,
        ciudad: 'Medellín',
        lugar: 'Parque de los Deseos',
        categorias: 'Trueque,Feria',
        organizador: stores[0]._id,
        estado: 'PROGRAMADO',
      },
    ]);

    console.log(`Eventos creados: ${events.length}`);

    // 5. Posts de foro de prueba
    const posts = await Post.insertMany([
      {
        autor: { id: admin._id, nombre: admin.nombre, email: admin.email },
        titulo: 'Bienvenidos a EcoCloset',
        contenido: 'Comparte aquí tus experiencias comprando ropa de segunda mano en Antioquia.',
        etiquetas: 'Bienvenida,Comunidad',
      },
      {
        autor: { id: admin._id, nombre: admin.nombre, email: admin.email },
        titulo: 'Tips para donar ropa',
        contenido: 'Recomendaciones para clasificar y entregar tu ropa en buen estado.',
        etiquetas: 'Donaciones,Consejos',
      },
    ]);

    console.log(`Posts creados: ${posts.length}`);

    console.log('Seed completado con éxito');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err);
    process.exit(1);
  }
};

run();
