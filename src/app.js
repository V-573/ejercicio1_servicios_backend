import { env } from './config/env.config.js';
import { ServiceManager } from './managers/ServiceManager.js';
import path from 'path';

console.log(`🚀 Servidor configurado correctamente en modo: ${env.NODE_ENV}`);
console.log(`🔌 Puerto asignado: ${env.PORT}\n`);

// Definimos la ruta absoluta al archivo JSON
const jsonPath = path.resolve('src/data/services.json');
const manager = new ServiceManager(jsonPath);

async function ejecutarPruebas() {

  try {
    console.log("--- 1. Agregando servicios válidos ---");

    const s1 = await manager.addService({
      name: "Limpieza Dental Básica",
      description: "Limpieza con ultrasonido y pulido",
      duration: 45,
      price: 45000,
      category: "Odontología",
      available: true
    });
    console.log("✅ Servicio 1 añadido:", s1);



    const s2 = await manager.addService({
      name: "Consulta General",
      description: "Valoración médica de rutina",
      duration: 20,
      price: 30000,
      category: "Medicina",
      available: true
    });
    console.log("✅ Servicio 2 añadido:", s2);



    // console.log("\n--- 2. Intentando agregar un servicio incompleto (Debe fallar) ---");
    // try {
    //   await manager.addService({ name: "Servicio Incompleto", price: 10000 });
    // } catch (error) {
    //   console.log("🎯 Capturado error esperado:", error.message);
    // }


    console.log("\n--- 3. Listando todos los servicios ---");
    const listaTotal = await manager.getServices();
    console.log(listaTotal);


    console.log("\n--- 4. Buscando servicio por ID (ID: 1) ---");
    const encontrado = await manager.getServiceById(1);
    console.log("🔍 Encontrado:", encontrado);


//     console.log("\n--- 5. Actualizando un servicio (Modificando precio de ID: 1) ---");
//     const actualizado = await manager.updateService(1, { price: 50000 });
//     console.log("🔄 Servicio Actualizado:", actualizado);


//     console.log("\n--- 6. Intentando alterar un ID en updateService (Debe fallar) ---");
//     try {
//       await manager.updateService(1, { id: 99 });
//     } catch (error) {
//       console.log("🎯 Capturado error esperado:", error.message);
//     }


//     console.log("\n--- 7. Eliminando un servicio (ID: 2) ---");
//     const eliminado = await manager.deleteService(2);
//     console.log("🗑️ Servicio eliminado correctamente:", eliminado.name);


//     console.log("\n--- 8. Verificación final del catálogo ---");
//     const catalogoFinal = await manager.getServices();
//     console.log(catalogoFinal);

  } catch (error) {
    console.error("❌ Ocurrió un error inesperado durante el flujo:", error);
  }
}

ejecutarPruebas();