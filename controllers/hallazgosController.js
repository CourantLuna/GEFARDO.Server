const Hallazgos = require('../models/Hallazgo');
const Inspecciones = require('../models/Inspeccion'); // Asegúrate de tener este modelo configurado correctamente

// Obtener todos los hallazgos
exports.getAllHallazgos = async (req, res) => {
    try {
        const hallazgos = await Hallazgos.findAll({
            include: [
                { model: Inspecciones, as: 'Inspeccion' }, // Alias debe coincidir con la relación
            ],
        });
        res.status(200).json(hallazgos);
    } catch (error) {
        console.error('Error al obtener los hallazgos:', error);
        res.status(500).json({
            message: 'Error al obtener los hallazgos',
            error: error.message,
        });
    }
};

// Obtener un hallazgo por ID
exports.getHallazgoById = async (req, res) => {
    try {
        const { id } = req.params;
        const hallazgo = await Hallazgos.findByPk(id, {
            include: [
                { model: Inspecciones, as: 'Inspeccion' },
            ],
        });
        if (!hallazgo) {
            return res.status(404).json({ message: 'Hallazgo no encontrado' });
        }
        res.status(200).json(hallazgo);
    } catch (error) {
        console.error('Error al obtener el hallazgo:', error);
        res.status(500).json({
            message: 'Error al obtener el hallazgo',
            error: error.message,
        });
    }
};

// Crear un nuevo hallazgo
exports.createHallazgo = async (req, res) => {
    try {
        const { Id_Inspeccion, Descripcion_Norma, es_conforme, Causa, Nivel_de_NC, Evidencias } = req.body;
        const nuevoHallazgo = await Hallazgos.create({
            Id_Inspeccion,
            Descripcion_Norma,
            es_conforme,
            Causa,
            Nivel_de_NC,
            Evidencias,
        });
        res.status(201).json(nuevoHallazgo);
    } catch (error) {
        console.error('Error al crear el hallazgo:', error);
        res.status(500).json({
            message: 'Error al crear el hallazgo',
            error: error.message,
        });
    }
};

// Actualizar un hallazgo
exports.updateHallazgoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { Id_Inspeccion, Descripcion_Norma, es_conforme, Causa, Nivel_de_NC, Evidencias } = req.body;
        const hallazgo = await Hallazgos.findByPk(id);
        if (!hallazgo) {
            return res.status(404).json({ message: 'Hallazgo no encontrado' });
        }
        hallazgo.Id_Inspeccion = Id_Inspeccion;
        hallazgo.Descripcion_Norma = Descripcion_Norma;
        hallazgo.es_conforme = es_conforme;
        hallazgo.Causa = Causa;
        hallazgo.Nivel_de_NC = Nivel_de_NC;
        hallazgo.Evidencias = Evidencias;
        await hallazgo.save();
        res.status(200).json(hallazgo);
    } catch (error) {
        console.error('Error al actualizar el hallazgo:', error);
        res.status(500).json({
            message: 'Error al actualizar el hallazgo',
            error: error.message,
        });
    }
};

// Eliminar un hallazgo
exports.deleteHallazgoById = async (req, res) => {
    try {
        const { id } = req.params;
        const hallazgo = await Hallazgos.findByPk(id);
        if (!hallazgo) {
            return res.status(404).json({ message: 'Hallazgo no encontrado' });
        }
        await hallazgo.destroy();
        res.status(200).json({ message: 'Hallazgo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el hallazgo:', error);
        res.status(500).json({
            message: 'Error al eliminar el hallazgo',
            error: error.message,
        });
    }
};
