import { Router } from "express";
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService 
} from "../controllers/services.controller.js";

const router = Router();

// Definición de rutas para los servicios
router.get("/services", getServices);       // Obtener todos los servicios
router.post("/services", createService);     // Crear un servicio
router.put("/services/:id", updateService);  // Actualizar un servicio por su ID
router.delete("/services/:id", deleteService); // Eliminar un servicio por su ID

export default router;