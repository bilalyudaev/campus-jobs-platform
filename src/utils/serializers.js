function localizeJob(job, lang = 'en') {
  return {
    id: job.id,
    employerId: job.employerId,
    title: lang === 'es' ? job.titleEs : job.titleEn,
    description: lang === 'es' ? job.descriptionEs : job.descriptionEn,
    department: job.department,
    employmentType: job.employmentType,
    location: job.location,
    salary: job.salary,
    status: job.status,
    createdAt: job.createdAt
  };
}

function localizeApplication(application, lang = 'en') {
  return {
    id: application.id,
    status: application.status,
    resumeText: application.resumeText,
    coverLetter: application.coverLetter,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    job: application.job ? localizeJob(application.job, lang) : null,
    student: application.student || null
  };
}

module.exports = {
  localizeJob,
  localizeApplication
};
