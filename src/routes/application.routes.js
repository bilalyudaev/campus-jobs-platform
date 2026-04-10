const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const uploadResume = require('../middleware/upload.middleware');

const {
  applyToJob,
  getMyApplications,
  getJobApplications,
  getEmployerApplications,
  updateApplicationStatus
} = require('../controllers/application.controller');

router.post(
  '/jobs/:id/apply',
  authMiddleware,
  roleMiddleware('STUDENT'),
  uploadResume.single('resumeFile'),
  applyToJob
);

router.get('/applications/my', authMiddleware, roleMiddleware('STUDENT'), getMyApplications);
router.get('/jobs/:id/applications', authMiddleware, roleMiddleware('EMPLOYER'), getJobApplications);
router.get('/employer/applications', authMiddleware, roleMiddleware('EMPLOYER'), getEmployerApplications);
router.patch('/applications/:id/status', authMiddleware, roleMiddleware('EMPLOYER'), updateApplicationStatus);

module.exports = router;
