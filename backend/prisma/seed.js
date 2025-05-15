const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.customer.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        cellPhone: '1234567890',
        email: 'john@example.com',
        dateOfBirth: new Date('1990-01-01'),
        street: '123 Main St',
        state: 'TX',
        country: 'USA',
        healthNotes: 'None'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        cellPhone: '0987654321',
        email: 'jane@example.com',
        dateOfBirth: new Date('1985-05-15'),
        street: '456 Oak Ave',
        state: 'TX',
        country: 'USA',
        healthNotes: 'Asthma'
      }
    ]
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
