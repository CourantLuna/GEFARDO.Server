const FlujoEstadosServicio = require('../models/FlujoEstadosServicio');
const TipoServicio = require('../models/TipoServicio'); // Asegúrate de tener este modelo configurado correctamente

// Obtener todos los flujos de estados
exports.getAllEstadosServicio = async (req, res) => {
    try {
        const estados = await FlujoEstadosServicio.findAll({
            include: [
                { model: TipoServicio, as: 'TipoServicio' },
            ],
        });
        res.status(200).json(estados);
    } catch (error) {
        console.error('Error al obtener los estados de servicio:', error);
        res.status(500).json({
            message: 'Error al obtener los estados de servicio',
            error: error.message,
        });
    }
};

// Obtener un flujo de estado por ID
exports.getEstadoServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await FlujoEstadosServicio.findByPk(id, {
            include: [
                { model: TipoServicio, as: 'TipoServicio' },
            ],
        });
        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        res.status(200).json(estado);
    } catch (error) {
        console.error('Error al obtener el estado de servicio:', error);
        res.status(500).json({
            message: 'Error al obtener el estado de servicio',
            error: error.message,
        });
    }
};

// Crear un nuevo flujo de estado
exports.createEstadoServicio = async (req, res) => {
    try {
        const { Id_Tipo_Servicio, Nombre_Estado, Orden } = req.body;
        const nuevoEstado = await FlujoEstadosServicio.create({
            Id_Tipo_Servicio,
            Nombre_Estado,
            Orden,
        });
        res.status(201).json(nuevoEstado);
    } catch (error) {
        console.error('Error al crear el estado de servicio:', error);
        res.status(500).json({
            message: 'Error al crear el estado de servicio',
            error: error.message,
        });
    }
};

// Actualizar un flujo de estado
exports.updateEstadoServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const { Id_Tipo_Servicio, Nombre_Estado, Orden } = req.body;
        const estado = await FlujoEstadosServicio.findByPk(id);
        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        estado.Id_Tipo_Servicio = Id_Tipo_Servicio;
        estado.Nombre_Estado = Nombre_Estado;
        estado.Orden = Orden;
        await estado.save();
        res.status(200).json(estado);
    } catch (error) {
        console.error('Error al actualizar el estado de servicio:', error);
        res.status(500).json({
            message: 'Error al actualizar el estado de servicio',
            error: error.message,
        });
    }
};

// Eliminar un flujo de estado
exports.deleteEstadoServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await FlujoEstadosServicio.findByPk(id);
        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }
        await estado.destroy();
        res.status(200).json({ message: 'Estado eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el estado de servicio:', error);
        res.status(500).json({
            message: 'Error al eliminar el estado de servicio',
            error: error.message,
        });
    }
};
