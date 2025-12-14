const EnqueteParticipative = require('../models/EnqueteParticipative');
const excel = require('exceljs');

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

// @desc    Exporter les enquêtes participatives en format Excel
// @route   GET /api/participative/export
// @access  Public
const exportParticipatives = async (req, res) => {
  try {
    const enquetes = await EnqueteParticipative.find().lean();

    const workbook = new excel.Workbook();
    const mainSheet = workbook.addWorksheet('Enquêtes');
    const participantsSheet = workbook.addWorksheet('Participants');
    const difficultesSheet = workbook.addWorksheet('Difficultés et Solutions');

    // Define columns for the main sheet
    mainSheet.columns = [
      { header: 'ID', key: '_id', width: 30 },
      { header: 'Localité', key: 'identification_localite', width: 20 },
      { header: 'Date de la séance', key: 'identification_dateSeance', width: 20 },
      { header: 'Composition du groupe', key: 'identification_compositionGroupe', width: 30 },
      { header: 'Problématiques agricoles', key: 'pertinence_problematiquesAgricoles', width: 30 },
      { header: 'Répond aux besoins locaux', key: 'pertinence_repondBesoinLocaux', width: 20 },
      { header: 'Commentaire (Répond aux besoins locaux)', key: 'pertinence_repondBesoinLocauxCommentaire', width: 30 },
      { header: 'Implication des acteurs', key: 'pertinence_implicationActeurs', width: 30 },
      { header: 'Aspects pertinents', key: 'pertinence_aspectsPertinents', width: 30 },
      { header: 'Besoins non couverts', key: 'pertinence_besoinsNonCouvert', width: 30 },
      { header: 'Activités réalisées dans les délais', key: 'efficacite_activitesRealiseesDelaisPlans', width: 20 },
      { header: 'Commentaire (Activités réalisées)', key: 'efficacite_activitesRealiseesCommentaire', width: 30 },
      { header: 'Qualité des formations et appuis', key: 'efficacite_qualiteFormationsAppuis', width: 30 },
      { header: 'Coordination satisfaisante', key: 'efficacite_coordinationSatisfaisante', width: 20 },
      { header: 'Commentaire (Coordination)', key: 'efficacite_coordinationCommentaire', width: 30 },
      { header: 'Commentaire (Difficultés)', key: 'efficacite_difficultesCommentaire', width: 30 },
      { header: 'Ressources utilisées de manière optimale', key: 'efficience_ressourcesOptimales', width: 20 },
      { header: 'Commentaire (Ressources optimales)', key: 'efficience_ressourcesOptimalesCommentaire', width: 30 },
      { header: 'Gaspillages, retards, doublons', key: 'efficience_gaspillagesRetardsDoublons', width: 20 },
      { header: 'Commentaire (Gaspillages)', key: 'efficience_gaspillagesRetardsDoublonsCommentaire', width: 30 },
      { header: 'Mécanismes favorables', key: 'efficience_mecanismesFavorables', width: 30 },
      { header: 'Mécanismes de freinage', key: 'efficience_mecanismesFreinage', width: 30 },
      { header: 'Changements dans la production agricole', key: 'resultatsImpacts_changementsProductionAgricole', width: 30 },
      { header: 'Evolution des revenus et conditions de vie', key: 'resultatsImpacts_revenusConditionsVieEvolue', width: 20 },
      { header: 'Exemples (Revenus et conditions de vie)', key: 'resultatsImpacts_revenusConditionsVieExemples', width: 30 },
      { header: 'Capacités techniques renforcées', key: 'resultatsImpacts_capacitesTechniquesRenforcees', width: 20 },
      { header: 'Exemples (Capacités techniques)', key: 'resultatsImpacts_capacitesTechniquesExemples', width: 30 },
      { header: 'Innovations', key: 'resultatsImpacts_innovationsBonnesPratiques_innovations', width: 30 },
      { header: 'Bonnes pratiques', key: 'resultatsImpacts_innovationsBonnesPratiques_bonnesPratiques', width: 30 },
      { header: 'Bénéfice pour les femmes', key: 'resultatsImpacts_beneficeFemmesJeunes_casFemmes', width: 30 },
      { header: 'Bénéfice pour les jeunes', key: 'resultatsImpacts_beneficeFemmesJeunes_casJeunes', width: 30 },
      { header: 'Effets indirects positifs', key: 'resultatsImpacts_effetsIndirectsInattendus_positifsIndirects', width: 30 },
      { header: 'Effets indirects négatifs', key: 'resultatsImpacts_effetsIndirectsInattendus_negatifsIndirects', width: 30 },
      { header: 'Effets inattendus positifs', key: 'resultatsImpacts_effetsIndirectsInattendus_positifsInattendus', width: 30 },
      { header: 'Effets inattendus négatifs', key: 'resultatsImpacts_effetsIndirectsInattendus_negatifsInattendus', width: 30 },
      { header: 'Acquis maintenus après le financement', key: 'durabilitePerspectives_acquisMaintenusFinancement', width: 20 },
      { header: 'Commentaire (Acquis maintenus)', key: 'durabilitePerspectives_acquisMaintenusCommentaire', width: 30 },
      { header: 'Acteurs locaux ont les moyens nécessaires', key: 'durabilitePerspectives_acteursLocauxMoyensNecessaires', width: 20 },
      { header: 'Commentaire (Acteurs locaux)', key: 'durabilitePerspectives_acteursLocauxMoyensNecessairesCommentaire', width: 30 },
      { header: 'Partenariats et appuis nécessaires', key: 'durabilitePerspectives_partenariatsAppuisNecessaires', width: 30 },
      { header: 'Recommandations pour la durabilité', key: 'durabilitePerspectives_recommandationsDurabilite', width: 30 },
      { header: 'Gestion participative et transparente', key: 'gouvernanceParticipation_gestionParticipativeTransparente', width: 20 },
      { header: 'Commentaire (Gestion participative)', key: 'gouvernanceParticipation_gestionParticipativeTransparenteCommentaire', width: 30 },
      { header: 'Structures locales ont un rôle actif', key: 'gouvernanceParticipation_structuresLocalesRoleActif', width: 20 },
      { header: 'Commentaire (Structures locales)', key: 'gouvernanceParticipation_structuresLocalesRoleActifCommentaire', width: 30 },
      { header: 'Mécanismes de communication et de suivi', key: 'gouvernanceParticipation_mecanismesCommunicationSuivi', width: 30 },
      { header: 'Commentaire (Mécanismes)', key: 'gouvernanceParticipation_mecanismesCommunicationSuiviCommentaire', width: 30 },
      { header: 'Suggestions pour améliorer le projet', key: 'recommandationsParticipants_suggestionsAmeliorerProjet', width: 30 },
      { header: 'Leçons de l\'expérience collective', key: 'recommandationsParticipants_leconsExperienceCollective', width: 30 },
      { header: 'Animateur', key: 'animateur', width: 20 },
      { header: 'Date (Animateur)', key: 'dateAnimateur', width: 20 },
      { header: 'Date de création', key: 'createdAt', width: 20 },
      { header: 'Date de mise à jour', key: 'updatedAt', width: 20 },
    ];

    // Define columns for the participants sheet
    participantsSheet.columns = [
        { header: 'ID Enquête', key: 'enqueteId', width: 30 },
        { header: 'Nom et Prénom', key: 'nomPrenom', width: 30 },
        { header: 'Age', key: 'age', width: 10 },
        { header: 'Sexe', key: 'sexe', width: 10 },
        { header: 'Fonction', key: 'fonction', width: 20 },
        { header: 'Contact', key: 'contact', width: 20 },
        { header: 'Dimension de la parcelle', key: 'parcelleDimension', width: 20 },
        { header: 'Titre foncier', key: 'titreFoncier', width: 20 },
    ];

    // Define columns for the difficulties and solutions sheet
    difficultesSheet.columns = [
        { header: 'ID Enquête', key: 'enqueteId', width: 30 },
        { header: 'Difficulté', key: 'difficulte', width: 50 },
        { header: 'Solution', key: 'solution', width: 50 },
    ];

    // Flatten and add data
    enquetes.forEach(enquete => {
      const flattenedData = {
        _id: enquete._id,
        identification_localite: enquete.identification?.localite,
        identification_dateSeance: enquete.identification?.dateSeance,
        identification_compositionGroupe: enquete.identification?.compositionGroupe,
        pertinence_problematiquesAgricoles: enquete.pertinence?.problematiquesAgricoles,
        pertinence_repondBesoinLocaux: enquete.pertinence?.repondBesoinLocaux,
        pertinence_repondBesoinLocauxCommentaire: enquete.pertinence?.repondBesoinLocauxCommentaire,
        pertinence_implicationActeurs: enquete.pertinence?.implicationActeurs,
        pertinence_aspectsPertinents: enquete.pertinence?.aspectsPertinents,
        pertinence_besoinsNonCouvert: enquete.pertinence?.besoinsNonCouvert,
        efficacite_activitesRealiseesDelaisPlans: enquete.efficacite?.activitesRealiseesDelaisPlans,
        efficacite_activitesRealiseesCommentaire: enquete.efficacite?.activitesRealiseesCommentaire,
        efficacite_qualiteFormationsAppuis: enquete.efficacite?.qualiteFormationsAppuis,
        efficacite_coordinationSatisfaisante: enquete.efficacite?.coordinationSatisfaisante,
        efficacite_coordinationCommentaire: enquete.efficacite?.coordinationCommentaire,
        efficacite_difficultesCommentaire: enquete.efficacite?.difficultesCommentaire,
        efficience_ressourcesOptimales: enquete.efficience?.ressourcesOptimales,
        efficience_ressourcesOptimalesCommentaire: enquete.efficience?.ressourcesOptimalesCommentaire,
        efficience_gaspillagesRetardsDoublons: enquete.efficience?.gaspillagesRetardsDoublons,
        efficience_gaspillagesRetardsDoublonsCommentaire: enquete.efficience?.gaspillagesRetardsDoublonsCommentaire,
        efficience_mecanismesFavorables: enquete.efficience?.mecanismesFavorables,
        efficience_mecanismesFreinage: enquete.efficience?.mecanismesFreinage,
        resultatsImpacts_changementsProductionAgricole: enquete.resultatsImpacts?.changementsProductionAgricole,
        resultatsImpacts_revenusConditionsVieEvolue: enquete.resultatsImpacts?.revenusConditionsVieEvolue,
        resultatsImpacts_revenusConditionsVieExemples: enquete.resultatsImpacts?.revenusConditionsVieExemples,
        resultatsImpacts_capacitesTechniquesRenforcees: enquete.resultatsImpacts?.capacitesTechniquesRenforcees,
        resultatsImpacts_capacitesTechniquesExemples: enquete.resultatsImpacts?.capacitesTechniquesExemples,
        resultatsImpacts_innovationsBonnesPratiques_innovations: enquete.resultatsImpacts?.innovationsBonnesPratiques?.innovations,
        resultatsImpacts_innovationsBonnesPratiques_bonnesPratiques: enquete.resultatsImpacts?.innovationsBonnesPratiques?.bonnesPratiques,
        resultatsImpacts_beneficeFemmesJeunes_casFemmes: enquete.resultatsImpacts?.beneficeFemmesJeunes?.casFemmes,
        resultatsImpacts_beneficeFemmesJeunes_casJeunes: enquete.resultatsImpacts?.beneficeFemmesJeunes?.casJeunes,
        resultatsImpacts_effetsIndirectsInattendus_positifsIndirects: enquete.resultatsImpacts?.effetsIndirectsInattendus?.positifsIndirects,
        resultatsImpacts_effetsIndirectsInattendus_negatifsIndirects: enquete.resultatsImpacts?.effetsIndirectsInattendus?.negatifsIndirects,
        resultatsImpacts_effetsIndirectsInattendus_positifsInattendus: enquete.resultatsImpacts?.effetsIndirectsInattendus?.positifsInattendus,
        resultatsImpacts_effetsIndirectsInattendus_negatifsInattendus: enquete.resultatsImpacts?.effetsIndirectsInattendus?.negatifsInattendus,
        durabilitePerspectives_acquisMaintenusFinancement: enquete.durabilitePerspectives?.acquisMaintenusFinancement,
        durabilitePerspectives_acquisMaintenusCommentaire: enquete.durabilitePerspectives?.acquisMaintenusCommentaire,
        durabilitePerspectives_acteursLocauxMoyensNecessaires: enquete.durabilitePerspectives?.acteursLocauxMoyensNecessaires,
        durabilitePerspectives_acteursLocauxMoyensNecessairesCommentaire: enquete.durabilitePerspectives?.acteursLocauxMoyensNecessairesCommentaire,
        durabilitePerspectives_partenariatsAppuisNecessaires: enquete.durabilitePerspectives?.partenariatsAppuisNecessaires,
        durabilitePerspectives_recommandationsDurabilite: enquete.durabilitePerspectives?.recommandationsDurabilite,
        gouvernanceParticipation_gestionParticipativeTransparente: enquete.gouvernanceParticipation?.gestionParticipativeTransparente,
        gouvernanceParticipation_gestionParticipativeTransparenteCommentaire: enquete.gouvernanceParticipation?.gestionParticipativeTransparenteCommentaire,
        gouvernanceParticipation_structuresLocalesRoleActif: enquete.gouvernanceParticipation?.structuresLocalesRoleActif,
        gouvernanceParticipation_structuresLocalesRoleActifCommentaire: enquete.gouvernanceParticipation?.structuresLocalesRoleActifCommentaire,
        gouvernanceParticipation_mecanismesCommunicationSuivi: enquete.gouvernanceParticipation?.mecanismesCommunicationSuivi,
        gouvernanceParticipation_mecanismesCommunicationSuiviCommentaire: enquete.gouvernanceParticipation?.mecanismesCommunicationSuiviCommentaire,
        recommandationsParticipants_suggestionsAmeliorerProjet: enquete.recommandationsParticipants?.suggestionsAmeliorerProjet,
        recommandationsParticipants_leconsExperienceCollective: enquete.recommandationsParticipants?.leconsExperienceCollective,
        animateur: enquete.animateur,
        dateAnimateur: enquete.dateAnimateur,
        createdAt: enquete.createdAt,
        updatedAt: enquete.updatedAt,
      };
      mainSheet.addRow(flattenedData);

      // Add participants to the participants sheet
      if (enquete.identification && enquete.identification.listeParticipants) {
        enquete.identification.listeParticipants.forEach(participant => {
            participantsSheet.addRow({ enqueteId: enquete._id, ...participant });
        });
      }

      // Add difficulties and solutions to their sheet
      if (enquete.efficacite && enquete.efficacite.difficultesSolutions) {
        enquete.efficacite.difficultesSolutions.forEach(item => {
            difficultesSheet.addRow({ enqueteId: enquete._id, ...item });
        });
      }
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'enquetes_participatives.xlsx'
    );

    await workbook.xlsx.write(res);
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
  exportParticipatives,
};