# Sistema de Gestión de Turnos y Reservas - Módulo de Servicios

Este proyecto implementa la lógica del Backend encargada de administrar los servicios provistos en un sistema de turnos y reservas, utilizando **Node.js**, arquitectura limpia basada en clases y persistencia local en archivos JSON.

## Características Técnicas
- **Entorno:** Node.js con soporte nativo de ECMAScript Modules (ESM).
- **Validación de Entorno:** Integración con `dotenv` y blindaje contra variables de entorno ausentes.
- **Persistencia:** Almacenamiento local asíncrono utilizando el módulo `fs/promises`.

## Instalación

1. Clona o descarga este repositorio.
2. Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install


Configuración de Variables de Entorno
Copia el archivo .env.example y renombralo como .env en la raíz del proyecto.

Asegúrate de configurar las siguientes variables:
PORT=8080
NODE_ENV=development

Ejecución del Proyecto
Para correr la suite de pruebas del ciclo de vida de los servicios, ejecuta:
npm start

Estructura del Recurso Service
Cada servicio gestionado cuenta con las siguientes propiedades obligatorias:

id (Número autoincremental)

name (String)

description (String)

duration (Número en minutos)

price (Número)

category (String)

available (Booleano)


Ejemplos de uso del ServiceManager:
import { ServiceManager } from './src/managers/ServiceManager.js';
const manager = new ServiceManager('./src/data/services.json');

// Obtener todos los servicios
const servicios = await manager.getServices();

// Agregar un nuevo servicio
const nuevo = await manager.addService({
  name: "Corte de Cabello",
  description: "Corte moderno",
  duration: 30,
  price: 20000,
  category: "Estética",
  available: true
});

// Actualizar el precio de un servicio por ID
await manager.updateService(1, { price: 25000 });

// Eliminar un servicio por ID
await manager.deleteService(1);