const express = require('express');
const app = express();

app.use(express.json());
const {
  getStudent
} = require('../controllers/studentController');
const router = express.Router();

router.get('/get', getStudent);

module.exports = router;
