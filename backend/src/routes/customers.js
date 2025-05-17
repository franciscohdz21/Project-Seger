module.exports = async function (app) {
  const prisma = app.prisma;

  app.get('/customers', async (req) => {
    const q = req.query.q?.toLowerCase() || '';
    return prisma.customer.findMany({
      where: {
        OR: [
          { email: { contains: q, mode: 'insensitive' } },
          { cellPhone: { contains: q } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  });

  app.post('/customers', async (req, res) => {
    try {
      const body = {
        ...req.body,
        dateOfBirth: new Date(req.body.dateOfBirth)
      };

      const newCustomer = await prisma.customer.create({
        data: body
      });

      return newCustomer;
    } catch (err) {
      res.code(400).send({ error: 'Invalid input', details: err.message });
    }
  });

  app.put('/customers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      return await prisma.customer.update({
        where: { id },
        data: req.body
      });
    } catch (err) {
      res.code(400).send({ error: 'Update failed', details: err.message });
    }
  });

  app.delete('/customers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      return await prisma.customer.delete({ where: { id } });
    } catch (err) {
      console.error("Backend delete error:", err);
      res.code(400).send({ error: 'Delete failed', details: err.message });
    }
  });
};
