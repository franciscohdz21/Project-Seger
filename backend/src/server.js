require('dotenv').config();
const Fastify = require('fastify');
const cors = require('@fastify/cors');
const prisma = new (require('@prisma/client').PrismaClient)();
const logger = require('./utils/logger');

const app = Fastify({ logger: true });

// Register modern CORS
app.register(cors, {
  origin: true
});

app.addHook('onRequest', logger);
app.decorate('prisma', prisma);

app.register(require('./routes/customers'));
app.register(require('./routes/payments'));
app.register(require('./routes/appointments'));

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Backend running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
