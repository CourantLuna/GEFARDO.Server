const express = require('express');
const usuarioRolesRoutes = require('./routes/usuarioRolesRoutes');
const app = express();

app.use(express.json());
app.use('/api/usuario-roles', usuarioRolesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
