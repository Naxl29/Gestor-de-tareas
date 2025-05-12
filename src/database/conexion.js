// ./database/conexion.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_tareas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' Conectado a la base de datos db_tareas');
})
.catch((error) => {
  console.error(' Error al conectar a la base de datos:', error);
});

module.exports = mongoose;
