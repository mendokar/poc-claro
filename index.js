const express = require('express');
const crypto = require('crypto');
const cors = require('cors');  // Importar cors
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use(cors());  // Esto permitirá solicitudes desde cualquier origen

// Middleware para parsear JSON (si lo necesitas para otros endpoints)
app.use(express.json());


// Endpoint para generar un token
app.get('/generate-token', (req, res) => {
    // Generar un token aleatorio de 32 bytes en formato hexadecimal
    const token = crypto.randomBytes(32).toString('hex');

    res.json({
        success: true,
        token,
        message: 'Token generado correctamente'
    });
});

// Configura la carpeta estática para Angular
app.use(express.static(path.join(__dirname, '/angular')));

// Sirve el index.html de Angular para cualquier ruta que no sea de la API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/angular/index.html'));
});



// Manejo de errores
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
