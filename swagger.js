import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learnr API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server',
      },
    ]
  },
  apis: ['./models/*.js', './routes/*.js'],

};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // log info
  console.log(`Swagger docs available at http://localhost:${port}/docs`);

};

export default swaggerDocs;