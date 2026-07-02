import fs from 'fs/promises';

export class ServiceManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Método auxiliar interno para leer el archivo JSON de forma segura
  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, retornamos un array vacío
      return [];
    }
  }

  // Método auxiliar interno para escribir en el archivo JSON
  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  // 1. getServices() -> Devuelve todos los servicios
  async getServices() {
    return await this._readFile();
  }

  // 2. getServiceById(id) -> Devuelve el servicio o lanza un error
  async getServiceById(id) {
    const services = await this._readFile();
    const service = services.find(s => s.id === id);
  
    if (!service) {
      throw new Error(`El servicio con ID ${id} no existe.`);
    }
    return service;
  }

  // 3. addService(serviceData) -> Valida y agrega un servicio con ID autoincremental
  async addService(serviceData) {
    const { name, description, duration, price, category, available } = serviceData;

    // Validación estricta de campos obligatorios
    if (name === undefined || description === undefined || duration === undefined || 
        price === undefined || category === undefined || available === undefined) {
      throw new Error("❌ Error: Todos los campos son obligatorios (name, description, duration, price, category, available).");
    }

    const services = await this._readFile();
    
    // Generación de ID auto-incremental elemental
    const nextId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
   
    const newService = {
      id: nextId,
      name,
      description,
      duration,
      price,
      category,
      available
    };

    services.push(newService);
    await this._writeFile(services);
    return newService;
  }

  // 4. updateService(id, updatedData) -> Actualiza el servicio sin alterar el ID
  async updateService(id, updatedData) {
    const services = await this._readFile();
    const index = services.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`No se puede actualizar. El servicio con ID ${id} no existe.`);
    }

    // Prevenir explícitamente la modificación del ID bloqueando el parámetro si viene en el body
    if (updatedData.id && updatedData.id !== id) {
      throw new Error("No está permitido modificar el ID original del servicio.");
    }

    // Conservamos el ID original y reemplazamos/mezclamos las propiedades actualizadas
    services[index] = { ...services[index], ...updatedData, id };
    
    await this._writeFile(services);
    return services[index];
  }

  // 5. deleteService(id) -> Elimina el servicio
  async deleteService(id) {
    const services = await this._readFile();
    const index = services.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`No se puede eliminar. El servicio con ID ${id} no existe.`);
    }

    const deletedService = services.splice(index, 1)[0];
    await this._writeFile(services);
    return deletedService;
  }
}