const express = require('express');
const app = express();

app.use(express.json());
const {
  getActivity,
  createActivity,
  listActivity,
  deleteActivity
} = require('../controllers/activityController');
const router = express.Router();

router.get('/get', getActivity);

router.post('/create', createActivity);

router.get('/list', listActivity);

router.post('/delete', deleteActivity);
module.exports = router;
