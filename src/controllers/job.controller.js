const prisma = require('../utils/prisma');
const t = require('../utils/i18n');

function localizeJob(job, lang) {
  return {
    id: job.id,
    employerId: job.employerId,
    categoryId: job.categoryId,
    departmentId: job.departmentId,
    category: job.category ? (lang === 'es' ? job.category.nameEs : job.category.nameEn) : null,
    department: job.department ? (lang === 'es' ? job.department.nameEs : job.department.nameEn) : null,
    title: lang === 'es' ? job.titleEs : job.titleEn,
    description: lang === 'es' ? job.descriptionEs : job.descriptionEn,
    employmentType: job.employmentType,
    location: job.location,
    salary: job.salary,
    status: job.status,
    requirements: job.requirements
      ? job.requirements.map((req) => ({
          id: req.id,
          description: lang === 'es' ? req.descriptionEs : req.descriptionEn,
          isRequired: req.isRequired,
          skill: req.skill ? (lang === 'es' ? req.skill.nameEs : req.skill.nameEn) : null
        }))
      : [],
    createdAt: job.createdAt
  };
}

exports.createJob = async (req, res) => {
  try {
    const {
      titleEn,
      titleEs,
      descriptionEn,
      descriptionEs,
      employmentType,
      location,
      salary,
      status,
      categoryId,
      departmentId
    } = req.body;

    if (!titleEn || !titleEs || !descriptionEn || !descriptionEs || !employmentType) {
      return res.status(400).json({
        message: t(req.lang, 'required_job_fields')
      });
    }

    const job = await prisma.job.create({
      data: {
        employerId: req.user.userId,
        titleEn,
        titleEs,
        descriptionEn,
        descriptionEs,
        employmentType,
        location,
        salary,
        status: status || 'DRAFT',
        categoryId: categoryId ? Number(categoryId) : null,
        departmentId: departmentId ? Number(departmentId) : null
      },
      include: {
        category: true,
        department: true,
        requirements: {
          include: { skill: true }
        }
      }
    });

    res.status(201).json({
      message: t(req.lang, 'job_created_successfully'),
      job: localizeJob(job, req.lang)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_create_job') });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { keyword, employmentType, status, categoryId, departmentId } = req.query;
    const where = {};

    if (keyword) {
      where.OR = [
        { titleEn: { contains: keyword, mode: 'insensitive' } },
        { titleEs: { contains: keyword, mode: 'insensitive' } },
        { descriptionEn: { contains: keyword, mode: 'insensitive' } },
        { descriptionEs: { contains: keyword, mode: 'insensitive' } }
      ];
    }

    if (employmentType) {
      where.employmentType = employmentType;
    }

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = Number(categoryId);
    }

    if (departmentId) {
      where.departmentId = Number(departmentId);
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        category: true,
        department: true,
        requirements: {
          include: { skill: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(jobs.map((job) => localizeJob(job, req.lang)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_jobs') });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        category: true,
        department: true,
        requirements: {
          include: { skill: true }
        }
      }
    });

    if (!job) {
      return res.status(404).json({ message: t(req.lang, 'job_not_found') });
    }

    res.json(localizeJob(job, req.lang));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_job') });
  }
};
