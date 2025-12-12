const express = require('express');
const {
  createParticipative,
  getParticipatives,
  getParticipativeById,
  updateParticipative,
  deleteParticipative,
  exportParticipatives,
} = require('../controllers/participativeController');

const router = express.Router();

router
  .route('/')
  .post(createParticipative)
  .get(getParticipatives);

router.route('/export').get(exportParticipatives);

router
  .route('/:id')
  .get(getParticipativeById)
  .put(updateParticipative)
  .delete(deleteParticipative);

module.exports = router;