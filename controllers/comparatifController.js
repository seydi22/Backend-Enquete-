const QuestionnaireComparatif = require('../models/QuestionnaireComparatif');
const excel = require('exceljs');

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

// @desc    Exporter les questionnaires comparatifs en format Excel
// @route   GET /api/comparatif/export
// @access  Public
const exportComparatifs = async (req, res) => {
  try {
    const questionnaires = await QuestionnaireComparatif.find().lean();

    const workbook = new excel.Workbook();
    const mainSheet = workbook.addWorksheet('Questionnaires');
    const speculationsSheet = workbook.addWorksheet('Spéculations');
    const fertilisationSheet = workbook.addWorksheet('Fertilisation');
    const irrigationSheet = workbook.addWorksheet('Irrigation');
    const rendementSheet = workbook.addWorksheet('Rendement');
    const agroecologieSheet = workbook.addWorksheet('Pratiques Agroécologiques');

    // Définir les colonnes pour la feuille principale
    mainSheet.columns = [
      { header: 'ID', key: '_id', width: 30 },
      { header: 'Type de répondant', key: 'identification_typeRepondant', width: 20 },
      { header: 'Nom du groupement', key: 'identification_groupementNom', width: 20 },
      { header: 'Type de groupement', key: 'identification_groupementType', width: 20 },
      { header: 'Autre précision (Groupement)', key: 'identification_groupementAutrePrecision', width: 30 },
      { header: 'Nom (Individuel)', key: 'identification_individuelNom', width: 20 },
      { header: 'Sexe (Individuel)', key: 'identification_individuelSexe', width: 10 },
      { header: 'Âge (Individuel)', key: 'identification_individuelAge', width: 10 },
      { header: 'Groupement (Individuel)', key: 'identification_individuelGroupement', width: 20 },
      { header: 'Statut (Individuel)', key: 'identification_individuelStatut', width: 20 },
      { header: 'Autre précision (Statut Individuel)', key: 'identification_individuelStatutAutrePrecision', width: 30 },
      { header: 'Statut de la parcelle', key: 'identification_parcelleStatut', width: 20 },
      { header: 'Autre précision (Statut Parcelle)', key: 'identification_parcelleStatutAutrePrecision', width: 30 },
      { header: 'Nombre de femmes (FG)', key: 'identification_fgNombreFemmes', width: 15 },
      { header: 'Nombre d\'hommes (FG)', key: 'identification_fgNombreHommes', width: 15 },
      { header: 'Jeunes (FG)', key: 'identification_fgJeunes', width: 15 },
      { header: 'Superficie exploitée', key: 'identification_superficieExploitee', width: 20 },
      { header: 'Fertilisant', key: 'identification_fertilisant', width: 20 },
      { header: 'Spéculation principale', key: 'identification_speculationPrincipale', width: 20 },
      { header: 'Commentaires sur les spéculations', key: 'speculationsCommentaires', width: 30 },
      { header: 'Améliorations des pratiques agricoles', key: 'impactGlobal_ameliorationsPratiquesAgricoles', width: 30 },
      { header: 'A bénéficié de formations', key: 'impactGlobal_formationsBeneficie', width: 20 },
      { header: 'Thèmes des formations', key: 'impactGlobal_formationsTheme', width: 30 },
      { header: 'Appréciation de l\'encadrement technique', key: 'impactGlobal_appreciationEncadrementTechnique', width: 30 },
      { header: 'Contribution à la productivité/rentabilité', key: 'impactGlobal_contributionProductiviteRentabilite', width: 30 },
      { header: 'Contribution à la commercialisation', key: 'impactGlobal_contributionCommercialisationProduction', width: 30 },
      { header: 'Durabilité des changements', key: 'impactGlobal_durabiliteChangementsIntroduits', width: 30 },
      { header: 'Difficultés persistantes', key: 'impactGlobal_difficultesPersistantes', width: 30 },
      { header: 'Recommandations pour l\'agriculture durable', key: 'impactGlobal_recommandationsAgricultureDurable', width: 30 },
      { header: 'Observations générales', key: 'syntheseObservations_observationsGenerales', width: 30 },
      { header: 'Appréciation globale de l\'évolution', key: 'syntheseObservations_appreciationGlobaleEvolution', width: 30 },
      { header: 'Signatures', key: 'syntheseObservations_signatures', width: 30 },
      { header: 'Date de création', key: 'createdAt', width: 20 },
      { header: 'Date de mise à jour', key: 'updatedAt', width: 20 },
    ];

    speculationsSheet.columns = [
        { header: 'ID Questionnaire', key: 'questionnaireId', width: 30 },
        { header: 'Spéculation', key: 'speculation', width: 20 },
        { header: 'Avant le projet', key: 'avantProjet', width: 20 },
        { header: 'Après le projet', key: 'apresProjet', width: 20 },
        { header: 'Changement observé', key: 'changementObserve', width: 30 },
    ];

    fertilisationSheet.columns = [
        { header: 'ID Questionnaire', key: 'questionnaireId', width: 30 },
        { header: 'Type', key: 'type', width: 20 },
        { header: 'Avant le projet', key: 'avantProjet', width: 20 },
        { header: 'Après le projet', key: 'apresProjet', width: 20 },
        { header: 'Changements observés', key: 'changementsObserves', width: 30 },
    ];

    irrigationSheet.columns = [
        { header: 'ID Questionnaire', key: 'questionnaireId', width: 30 },
        { header: 'Aspect', key: 'aspect', width: 20 },
        { header: 'Avant le projet', key: 'avantProjet', width: 20 },
        { header: 'Après le projet', key: 'apresProjet', width: 20 },
        { header: 'Évolution perçue', key: 'evolutionPercue', width: 30 },
    ];

    rendementSheet.columns = [
        { header: 'ID Questionnaire', key: 'questionnaireId', width: 30 },
        { header: 'Culture principale', key: 'culturePrincipale', width: 20 },
        { header: 'Rendement avant', key: 'rendementAvant', width: 20 },
        { header: 'Rendement après', key: 'rendementApres', width: 20 },
        { header: 'Variation', key: 'variation', width: 20 },
        { header: 'Facteurs d\'amélioration', key: 'facteursAmelioration', width: 30 },
    ];

    agroecologieSheet.columns = [
        { header: 'ID Questionnaire', key: 'questionnaireId', width: 30 },
        { header: 'Pratique', key: 'pratique', width: 20 },
        { header: 'Avant le projet', key: 'avantProjet', width: 20 },
        { header: 'Introduite ou renforcée', key: 'introduiteRenforcee', width: 20 },
        { header: 'Impact observé', key: 'impactObserve', width: 30 },
    ];
    
    // Aplatir et ajouter les données
    questionnaires.forEach(q => {
      const flattenedData = {
        _id: q._id,
        identification_typeRepondant: q.identification?.typeRepondant,
        identification_groupementNom: q.identification?.groupementNom,
        identification_groupementType: q.identification?.groupementType,
        identification_groupementAutrePrecision: q.identification?.groupementAutrePrecision,
        identification_individuelNom: q.identification?.individuelNom,
        identification_individuelSexe: q.identification?.individuelSexe,
        identification_individuelAge: q.identification?.individuelAge,
        identification_individuelGroupement: q.identification?.individuelGroupement,
        identification_individuelStatut: q.identification?.individuelStatut,
        identification_individuelStatutAutrePrecision: q.identification?.individuelStatutAutrePrecision,
        identification_parcelleStatut: q.identification?.parcelleStatut,
        identification_parcelleStatutAutrePrecision: q.identification?.parcelleStatutAutrePrecision,
        identification_fgNombreFemmes: q.identification?.fgNombreFemmes,
        identification_fgNombreHommes: q.identification?.fgNombreHommes,
        identification_fgJeunes: q.identification?.fgJeunes,
        identification_superficieExploitee: q.identification?.superficieExploitee,
        identification_fertilisant: q.identification?.fertilisant,
        identification_speculationPrincipale: q.identification?.speculationPrincipale,
        speculationsCommentaires: q.speculationsCommentaires,
        impactGlobal_ameliorationsPratiquesAgricoles: q.impactGlobal?.ameliorationsPratiquesAgricoles,
        impactGlobal_formationsBeneficie: q.impactGlobal?.formationsBeneficie,
        impactGlobal_formationsTheme: q.impactGlobal?.formationsTheme,
        impactGlobal_appreciationEncadrementTechnique: q.impactGlobal?.appreciationEncadrementTechnique,
        impactGlobal_contributionProductiviteRentabilite: q.impactGlobal?.contributionProductiviteRentabilite,
        impactGlobal_contributionCommercialisationProduction: q.impactGlobal?.contributionCommercialisationProduction,
        impactGlobal_durabiliteChangementsIntroduits: q.impactGlobal?.durabiliteChangementsIntroduits,
        impactGlobal_difficultesPersistantes: q.impactGlobal?.difficultesPersistantes,
        impactGlobal_recommandationsAgricultureDurable: q.impactGlobal?.recommandationsAgricultureDurable,
        syntheseObservations_observationsGenerales: q.syntheseObservations?.observationsGenerales,
        syntheseObservations_appreciationGlobaleEvolution: q.syntheseObservations?.appreciationGlobaleEvolution,
        syntheseObservations_signatures: q.syntheseObservations?.signatures,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt,
      };
      mainSheet.addRow(flattenedData);

      q.speculationsCultivees?.forEach(item => speculationsSheet.addRow({ questionnaireId: q._id, ...item }));
      q.fertilisationPratiques?.forEach(item => fertilisationSheet.addRow({ questionnaireId: q._id, ...item }));
      q.irrigationGestionEau?.forEach(item => irrigationSheet.addRow({ questionnaireId: q._id, ...item }));
      q.rendementProduction?.forEach(item => rendementSheet.addRow({ questionnaireId: q._id, ...item }));
      q.pratiquesAgroecologiques?.forEach(item => agroecologieSheet.addRow({ questionnaireId: q._id, ...item }));
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=questionnaires_comparatifs.xlsx'
    );

    await workbook.xlsx.write(res);
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
  exportComparatifs,
};