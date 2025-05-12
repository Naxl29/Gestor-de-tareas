

    // Método para eliminar un usuario
    delete: (req, res) => {
        var usuarioId = req.params.id;
        Usuario.findOneAndDelete({ _id: usuarioId }, (err, usuarioRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar'
                });
            }

            if (!usuarioRemoved) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado el usuario'
                });
            }

            // Si no hay ningún error:
            return res.status(200).send({
                status: 'success',
                usuario: usuarioRemoved
            });
        });
    },
