require('dotenv').config();
const express = require('express');

process.env.JWT_SECRET = "dave"

const router = express.Router();
const {
  login
} = require('../controllers/authController');

router.post('/login', login);

module.exports = router;
