const prisma = require('../utils/prisma');
const t = require('../utils/i18n');

function localizeJob(job, lang) {
  return {
    id: job.id,
    title: lang === 'es' ? job.titleEs : job.titleEn,
    description: lang === 'es' ? job.descriptionEs : job.descriptionEn,
    department: job.department,
    employmentType: job.employmentType,
    location: job.location,
    salary: job.salary,
    status: job.status
  };
}

exports.applyToJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const { resumeText, coverLetter } = req.body;

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ message: t(req.lang, 'job_not_found') });
    }

    if (job.status !== 'ACTIVE') {
      return res.status(400).json({ message: t(req.lang, 'job_not_open') });
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        studentId: req.user.userId
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: t(req.lang, 'already_applied') });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        studentId: req.user.userId,
        resumeText,
        coverLetter
      }
    });

    res.status(201).json({
      message: t(req.lang, 'application_submitted_successfully'),
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_submit_application') });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        studentId: req.user.userId
      },
      include: {
        job: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const result = applications.map((application) => ({
      id: application.id,
      status: application.status,
      resumeText: application.resumeText,
      coverLetter: application.coverLetter,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      job: localizeJob(application.job, req.lang)
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_applications') });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ message: t(req.lang, 'job_not_found') });
    }

    if (job.employerId !== req.user.userId) {
      return res.status(403).json({ message: t(req.lang, 'forbidden') });
    }

    const applications = await prisma.application.findMany({
      where: {
        jobId
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        job: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const result = applications.map((application) => ({
      id: application.id,
      status: application.status,
      resumeText: application.resumeText,
      coverLetter: application.coverLetter,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      student: application.student,
      job: localizeJob(application.job, req.lang)
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_employer_applications') });
  }
};

exports.getEmployerApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        job: {
          employerId: req.user.userId
        }
      },
      include: {
        job: true,
        student: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }


});

    const result = applications.map((application) => ({
      id: application.id,
      status: application.status,
      resumeText: application.resumeText,
      coverLetter: application.coverLetter,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      student: application.student,
      job: localizeJob(application.job, req.lang)
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_employer_applications') });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = ['SUBMITTED', 'REVIEWING', 'ACCEPTED', 'REJECTED'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: t(req.lang, 'invalid_status') });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: true
      }
    });

    if (!application) {
      return res.status(404).json({ message: t(req.lang, 'application_not_found') });
    }

    if (application.job.employerId !== req.user.userId) {
      return res.status(403).json({ message: t(req.lang, 'forbidden') });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status }
    });

    res.json({
      message: t(req.lang, 'application_status_updated_successfully'),
      application: updatedApplication
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update application status' });
  }
};
