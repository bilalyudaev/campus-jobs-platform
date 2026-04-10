const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const {
  getJobRequirements,
  createRequirement
} = require('../controllers/requirement.controller');

router.get('/jobs/:id/requirements', getJobRequirements);
router.post('/jobs/:id/requirements', authMiddleware, roleMiddleware('EMPLOYER'), createRequirement);

module.exports = router;
