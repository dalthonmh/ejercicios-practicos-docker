const env = process.env.ENVIRONMENT || "unknown";
const message = process.env.WELCOME_MESSAGE || "Sin mensaje";

console.log(`Entorno actual: ${env}`);
console.log(`Mensaje: ${message}`);
