const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const MAX_RETRIES = 10;
const RETRY_DELAY = 3500;

const connectWithRetry = (retries = MAX_RETRIES) => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err.message);
      if (retries > 0) {
        console.log(`Reintentando en ${RETRY_DELAY / 1000}s... (${retries} intentos restantes)`);
        setTimeout(() => connectWithRetry(retries - 1), RETRY_DELAY);
      } else {
        console.error("No se pudo conectar a la base de datos después de varios intentos.");
        process.exit(1);
      }
    } else {
      console.log("Conectado a MySQL");

      // Solo levanta el servidor si la base de datos está conectada
      app.get("/", (req, res) => {
        res.send("API backend simple funcionando");
      });

      app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
      });
    }
  });
};

connectWithRetry();
