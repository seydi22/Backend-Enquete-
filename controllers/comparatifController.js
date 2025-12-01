const QuestionnaireComparatif = require('../models/QuestionnaireComparatif');

// @desc    Créer un nouveau questionnaire comparatif
// @route   POST /api/comparatif
// @access  Public
const createComparatif = async (req, res) => {
  try {
    console.log('Received Comparatif data:', req.body); // Log incoming data
    const questionnaire = await QuestionnaireComparatif.create(req.body);
    res.status(201).json({ success: true, data: questionnaire });
  } catch (error) {
    console.error('Error creating Comparatif:', error); // Log the error
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Récupérer tous les questionnaires comparatifs
// @route   GET /api/comparatif
// @access  Public
const getComparatifs = async (req, res) => {
  try {
    const questionnaires = await QuestionnaireComparatif.find();
    res.status(200).json({ success: true, count: questionnaires.length, data: questionnaires });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Récupérer un seul questionnaire comparatif par son ID
// @route   GET /api/comparatif/:id
// @access  Public
const getComparatifById = async (req, res) => {
  try {
    const questionnaire = await QuestionnaireComparatif.findById(req.params.id);
    if (!questionnaire) {
      return res.status(404).json({ success: false, error: 'Questionnaire non trouvé' });
    }
    res.status(200).json({ success: true, data: questionnaire });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Mettre à jour un questionnaire comparatif
// @route   PUT /api/comparatif/:id
// @access  Public
const updateComparatif = async (req, res) => {
  try {
    const questionnaire = await QuestionnaireComparatif.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!questionnaire) {
      return res.status(404).json({ success: false, error: 'Questionnaire non trouvé' });
    }
    res.status(200).json({ success: true, data: questionnaire });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Supprimer un questionnaire comparatif
// @route   DELETE /api/comparatif/:id
// @access  Public
const deleteComparatif = async (req, res) => {
  try {
    const questionnaire = await QuestionnaireComparatif.findByIdAndDelete(req.params.id);
    if (!questionnaire) {
      return res.status(404).json({ success: false, error: 'Questionnaire non trouvé' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createComparatif,
  getComparatifs,
  getComparatifById,
  updateComparatif,
  deleteComparatif,
};