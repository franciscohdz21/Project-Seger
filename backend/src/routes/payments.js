module.exports = async function (app) {
  const prisma = app.prisma;

  app.get('/payments', async () => {
    return prisma.payment.findMany();
  });

  app.post('/payments', async (req) => {
    return prisma.payment.create({ data: req.body });
  });

  app.put('/payments/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.payment.update({ where: { id }, data: req.body });
  });

  app.delete('/payments/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.payment.delete({ where: { id } });
  });
};
