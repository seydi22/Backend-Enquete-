const EnqueteParticipative = require('../models/EnqueteParticipative');

// @desc    Créer une nouvelle enquête participative
// @route   POST /api/participative
// @access  Public
const createParticipative = async (req, res) => {
  try {
    const enquete = await EnqueteParticipative.create(req.body);
    res.status(201).json({ success: true, data: enquete });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Récupérer toutes les enquêtes participatives
// @route   GET /api/participative
// @access  Public
const getParticipatives = async (req, res) => {
  try {
    const enquetes = await EnqueteParticipative.find();
    res.status(200).json({ success: true, count: enquetes.length, data: enquetes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Récupérer une seule enquête participative par son ID
// @route   GET /api/participative/:id
// @access  Public
const getParticipativeById = async (req, res) => {
  try {
    const enquete = await EnqueteParticipative.findById(req.params.id);
    if (!enquete) {
      return res.status(404).json({ success: false, error: 'Enquête non trouvée' });
    }
    res.status(200).json({ success: true, data: enquete });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Mettre à jour une enquête participative
// @route   PUT /api/participative/:id
// @access  Public
const updateParticipative = async (req, res) => {
  try {
    const enquete = await EnqueteParticipative.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!enquete) {
      return res.status(404).json({ success: false, error: 'Enquête non trouvée' });
    }
    res.status(200).json({ success: true, data: enquete });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Supprimer une enquête participative
// @route   DELETE /api/participative/:id
// @access  Public
const deleteParticipative = async (req, res) => {
  try {
    const enquete = await EnqueteParticipative.findByIdAndDelete(req.params.id);
    if (!enquete) {
      return res.status(404).json({ success: false, error: 'Enquête non trouvée' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createParticipative,
  getParticipatives,
  getParticipativeById,
  updateParticipative,
  deleteParticipative,
};