const prisma = require('../src/utils/prisma');

async function main() {
  const categories = [
    { nameEn: 'Library', nameEs: 'Biblioteca' },
    { nameEn: 'Administration', nameEs: 'Administración' },
    { nameEn: 'Research', nameEs: 'Investigación' },
    { nameEn: 'IT', nameEs: 'Tecnologías de la información' },
    { nameEn: 'Marketing', nameEs: 'Marketing' },
    { nameEn: 'Internship', nameEs: 'Prácticas' },
    { nameEn: 'Student Support', nameEs: 'Apoyo estudiantil' },
    { nameEn: 'Finance', nameEs: 'Finanzas' }
  ];

  const departments = [
    {
      nameEn: 'Library',
      nameEs: 'Biblioteca',
      location: 'Main Building',
      email: 'library@urfu.test',
      phone: '+7-000-000-01'
    },
    {
      nameEn: 'IT Department',
      nameEs: 'Departamento de TI',
      location: 'IT Building',
      email: 'it@urfu.test',
      phone: '+7-000-000-02'
    },
    {
      nameEn: 'Career Center',
      nameEs: 'Centro de Carrera',
      location: 'Career Office',
      email: 'career@urfu.test',
      phone: '+7-000-000-03'
    },
    {
      nameEn: 'International Office',
      nameEs: 'Oficina Internacional',
      location: 'Admin Building',
      email: 'international@urfu.test',
      phone: '+7-000-000-04'
    },
    {
      nameEn: 'Research Center',
      nameEs: 'Centro de Investigación',
      location: 'Research Building',
      email: 'research@urfu.test',
      phone: '+7-000-000-05'
    }
  ];

  const skills = [
    { nameEn: 'Communication', nameEs: 'Comunicación' },
    { nameEn: 'Teamwork', nameEs: 'Trabajo en equipo' },
    { nameEn: 'Excel', nameEs: 'Excel' },
    { nameEn: 'Data Analysis', nameEs: 'Análisis de datos' },
    { nameEn: 'Research Writing', nameEs: 'Redacción de investigación' },
    { nameEn: 'Customer Support', nameEs: 'Atención al cliente' },
    { nameEn: 'Translation', nameEs: 'Traducción' },
    { nameEn: 'Social Media Management', nameEs: 'Gestión de redes sociales' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: -1 },
      update: {},
      create: category
    }).catch(async () => {
      const exists = await prisma.category.findFirst({
        where: { nameEn: category.nameEn }
      });
      if (!exists) await prisma.category.create({ data: category });
    });
  }

  for (const department of departments) {
    const exists = await prisma.department.findFirst({
      where: { nameEn: department.nameEn }
    });
    if (!exists) {
      await prisma.department.create({ data: department });
    }
  }

  for (const skill of skills) {
    const exists = await prisma.skill.findFirst({
      where: { nameEn: skill.nameEn }
    });
    if (!exists) {
      await prisma.skill.create({ data: skill });
    }
  }

  console.log('Reference data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
