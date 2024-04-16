const express = require('express');
const app = express();

app.use(express.json());
const {
  createSubjectTerm,
  updateSubjectTerm,
  getSubjectTerm,
  listSubjectTermsBySemester,
  listSubjectTermsBySubjectId
} = require('../controllers/subjectTermController');
const router = express.Router();

router.get('/get', getSubjectTerm);

router.post('/create', createSubjectTerm);

router.put('/update', updateSubjectTerm);

router.get('/listActive', listSubjectTermsBySemester);

router.get('/listArchived', listSubjectTermsBySubjectId);

module.exports = router;
