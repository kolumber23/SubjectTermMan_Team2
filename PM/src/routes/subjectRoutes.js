const express = require('express');
const app = express();

app.use(express.json());
const {
  createSubject,
  getSubject,
  listSubjects
} = require('../controllers/subjectController');
const router = express.Router();

router.get('/get', getSubject);

router.post('/create', createSubject);

router.get('/listSubjects', listSubjects);

module.exports = router;
