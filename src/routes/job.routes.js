const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const {
  createJob,
  getAllJobs,
  getJobById
} = require('../controllers/job.controller');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', authMiddleware, roleMiddleware('EMPLOYER'), createJob);

module.exports = router;

