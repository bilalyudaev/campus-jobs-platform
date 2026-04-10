const prisma = require('../utils/prisma');

function localizeRequirement(requirement, lang) {
  return {
    id: requirement.id,
    description: lang === 'es' ? requirement.descriptionEs : requirement.descriptionEn,
    isRequired: requirement.isRequired,
    skill: requirement.skill
      ? {
          id: requirement.skill.id,
          name: lang === 'es' ? requirement.skill.nameEs : requirement.skill.nameEn
        }
      : null
  };
}

exports.getJobRequirements = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const requirements = await prisma.requirement.findMany({
      where: { jobId },
      include: { skill: true },
      orderBy: { id: 'asc' }
    });

    res.json(requirements.map((item) => localizeRequirement(item, req.lang)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch requirements' });
  }
};

exports.createRequirement = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const { skillId, descriptionEn, descriptionEs, isRequired } = req.body;

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employerId !== req.user.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const requirement = await prisma.requirement.create({
      data: {
        jobId,
        skillId: skillId ? Number(skillId) : null,
        descriptionEn,
        descriptionEs,
        isRequired: typeof isRequired === 'boolean' ? isRequired : true
      },
      include: {
        skill: true
      }
    });

    res.status(201).json(localizeRequirement(requirement, req.lang));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create requirement' });
  }
};
