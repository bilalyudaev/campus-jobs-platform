const express = require('express');
const router = express.Router();

const {
  getCategories,
  getDepartments,
  getSkills
} = require('../controllers/reference.controller');

router.get('/categories', getCategories);
router.get('/departments', getDepartments);
router.get('/skills', getSkills);

module.exports = router;
