const jwt = require('jsonwebtoken'); // Importar el módulo jsonwebtoken

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del encabezado Authorization
    if (!token) {
        return res.status(401).send({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'gestor_de_tareas'); // Verificar el token usando la clave secreta
        req.user = decoded; // Decodificar el token y asignar los datos del usuario a req.user {email, userId}
        next();
    } catch (err) {
        res.status(401).send({ message: 'Token inválido o expirado' });
    }
};

module.exports = auth;
