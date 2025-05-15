module.exports = async function (app) {
  const prisma = app.prisma;

  // Cabin 1
  app.get('/appointments/cabin1', async () => {
    return prisma.cabin1Appointment.findMany();
  });

  app.post('/appointments/cabin1', async (req) => {
    return prisma.cabin1Appointment.create({ data: req.body });
  });

  app.put('/appointments/cabin1/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.cabin1Appointment.update({ where: { id }, data: req.body });
  });

  app.delete('/appointments/cabin1/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.cabin1Appointment.delete({ where: { id } });
  });

  // Cabin 2
  app.get('/appointments/cabin2', async () => {
    return prisma.cabin2Appointment.findMany();
  });

  app.post('/appointments/cabin2', async (req) => {
    return prisma.cabin2Appointment.create({ data: req.body });
  });

  app.put('/appointments/cabin2/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.cabin2Appointment.update({ where: { id }, data: req.body });
  });

  app.delete('/appointments/cabin2/:id', async (req) => {
    const id = parseInt(req.params.id);
    return prisma.cabin2Appointment.delete({ where: { id } });
  });
};
