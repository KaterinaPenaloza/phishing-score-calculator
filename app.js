const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurar el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Puerto
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
