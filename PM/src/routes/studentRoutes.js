const express = require('express');
const app = express();

app.use(express.json());
const {
  getStudent,
  listStudent
} = require('../controllers/studentController');
const router = express.Router();

router.get('/get', getStudent);

router.get('/list', listStudent);

module.exports = router;
