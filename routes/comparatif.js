const express = require('express');
const {
  createComparatif,
  getComparatifs,
  getComparatifById,
  updateComparatif,
  deleteComparatif,
} = require('../controllers/comparatifController');

const router = express.Router();

router
  .route('/')
  .post(createComparatif)
  .get(getComparatifs);

router
  .route('/:id')
  .get(getComparatifById)
  .put(updateComparatif)
  .delete(deleteComparatif);

module.exports = router;