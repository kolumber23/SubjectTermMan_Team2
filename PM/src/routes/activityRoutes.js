const express = require('express');
const app = express();

app.use(express.json());
const {
  getActivity
} = require('../controllers/activityController');
const router = express.Router();

router.get('/get', getActivity);

module.exports = router;
