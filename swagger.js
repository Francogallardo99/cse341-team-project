import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Kizuna Rail API',
        description: 'Documentación de la API de viajes y trenes'
    },
    host: '127.0.0.1:3000',
    basePath: '/api',
    schemes: ['http']
};

const outputFile = './swagger.json';
// Aquí le indicamos que lea tus rutas de la API para generar el documento
const routes = ['./src/routes/api-routes.js'];

swaggerAutogen()(outputFile, routes, doc);