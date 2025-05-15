module.exports = async function (app) {
  const prisma = app.prisma;

  app.get('/customers', async () => {
    return prisma.customer.findMany();
  });

  app.post('/customers', async (req) => {
    return prisma.customer.create({ data: req.body });
  });

  app.put('/customers/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.customer.update({ where: { id }, data: req.body });
  });

  app.delete('/customers/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.customer.delete({ where: { id } });
  });
};
