const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Array para almacenar comentarios en memoria
let comentarios = [];

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint GET para obtener comentarios
app.get('/comentarios', (req, res) => {
    res.json(comentarios);
});

// Endpoint POST para agregar comentarios
app.post('/comentarios', (req, res) => {
    const { nombre, comentario } = req.body;
    
    // Validación básica
    if (!nombre || !comentario) {
        return res.status(400).json({ 
            error: 'El nombre y el comentario son obligatorios' 
        });
    }
    
    // Crear nuevo comentario con timestamp
    const nuevoComentario = {
        id: Date.now(),
        nombre: nombre.trim(),
        comentario: comentario.trim(),
        fecha: new Date().toLocaleDateString('es-CO')
    };
    
    // Agregar al array
    comentarios.push(nuevoComentario);
    
    // Responder con el comentario creado
    res.status(201).json(nuevoComentario);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});