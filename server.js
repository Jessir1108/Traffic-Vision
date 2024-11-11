const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, "build")));

// Ruta para servir el archivo index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
