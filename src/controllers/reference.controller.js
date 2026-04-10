const prisma = require('../utils/prisma');

function localizeName(item, lang) {
  return {
    id: item.id,
    name: lang === 'es' ? item.nameEs : item.nameEn
  };
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { nameEn: 'asc' }
    });

    res.json(categories.map((item) => localizeName(item, req.lang)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { nameEn: 'asc' }
    });

    res.json(
      departments.map((item) => ({
        id: item.id,
        name: req.lang === 'es' ? item.nameEs : item.nameEn,
        location: item.location,
        email: item.email,
        phone: item.phone
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { nameEn: 'asc' }
    });

    res.json(skills.map((item) => localizeName(item, req.lang)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

