import { ServiceManager } from "../managers/ServiceManager.js";
import path from "path";

// Instanciamos el manager apuntando al archivo JSON de persistencia
const jsonPath = path.resolve("src/data/services2.json");
const manager = new ServiceManager(jsonPath);

// 1. Obtener todos los servicios
export const getServices = async (req, res) => {
  try {
    const services = await manager.getServices();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    // Le pasamos el body completo al manager para que lo valide y guarde
    const newService = await manager.addService(req.body);
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    // Si falta un campo obligatorio, el manager lanzará un error que capturamos aquí
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Actualizar un servicio por ID
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedService = await manager.updateService(parseInt(id), req.body);
    
    res.status(200).json({ success: true, data: updatedService });
  } catch (error) {
    // Captura si el ID no existe o si intentaron modificar el ID original
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. Eliminar un servicio por ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await manager.deleteService(parseInt(id));
    
    res.status(200).json({ 
      success: true, 
      message: `Servicio '${deletedService.name}' eliminado con éxito` 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. obtener un servicio por id
export const getServiceById = async (req, res) =>{

    try {
        const { id } = req.params;
        console.log("esto es lo que agarra", id)
        const serviceById = await manager.getServiceById(parseInt(id));
        res.status(200).json({
            success:true,
            message:`servicio consultado: ${serviceById.name}`
        })

    } catch (error) {
        res.status(404).json({success: false,
            message:"servicio no existe"
        })
    }




}

