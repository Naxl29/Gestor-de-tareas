"use strict"

var express = require('express'); // Importa la librería express para crear rutas y manejar solicitudes HTTP.
var Tarea = require('../Controllers/tareaController'); // Importa el controlador de tareas.
var auth = require('../middlewares/auth'); // Importa el middleware de autenticación para proteger las rutas.
var router = express.Router(); // Crea un nuevo enrutador de Express para definir rutas específicas.


//rutas de tareas

// Ruta para guardar una nueva tarea
router.post('/saveTarea', auth, Tarea.saveTarea);

// Ruta para obtener todas las tareas
router.get('/tareas', auth, Tarea.getTareas);

// Ruta para obtener una tarea por ID
router.delete('/deleteTarea/:id', auth, Tarea.deleteTarea);

// Ruta para actualizar una tarea
router.put('/updateTarea/:id', auth, Tarea.updateTarea);

module.exports = router;