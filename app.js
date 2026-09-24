const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Configurar el middleware para servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal que sirve el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
