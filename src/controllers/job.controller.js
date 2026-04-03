const prisma = require('../utils/prisma');
const t = require('../utils/i18n');
const { localizeJob } = require('../utils/serializers');

exports.createJob = async (req, res) => {
  try {
    const {
      titleEn,
      titleEs,
      descriptionEn,
      descriptionEs,
      department,
      employmentType,
      location,
      salary,
      status
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
        department,
        employmentType,
        location,
        salary,
        status: status || 'DRAFT'
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
    const { keyword, employmentType, department, status } = req.query;

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

    if (department) {
      where.department = { contains: department, mode: 'insensitive' };
    }

    if (status) {
      where.status = status;
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(jobs.map(job => localizeJob(job, req.lang)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_jobs') });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: { id: jobId }
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
