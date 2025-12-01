
const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- Sub-schemas for arrays used in the main form ---

const SpeculationCultiveeSchema = new Schema({
    speculation: { type: String, default: '' },
    avantProjet: { type: String, default: '' },
    apresProjet: { type: String, default: '' },
    changementObserve: { type: String, default: '' }
}, { _id: false });

const FertilisationPratiqueSchema = new Schema({
    type: { type: String, default: '' },
    avantProjet: { type: String, default: '' },
    apresProjet: { type: String, default: '' },
    changementsObserves: { type: String, default: '' }
}, { _id: false });

const IrrigationGestionEauSchema = new Schema({
    aspect: { type: String, default: '' },
    avantProjet: { type: String, default: '' },
    apresProjet: { type: String, default: '' },
    evolutionPercue: { type: String, default: '' }
}, { _id: false });

const RendementProductionSchema = new Schema({
    culturePrincipale: { type: String, default: '' },
    rendementAvant: { type: String, default: '' },
    rendementApres: { type: String, default: '' },
    variation: { type: String, default: '' },
    facteursAmelioration: { type: String, default: '' }
}, { _id: false });

const PratiqueAgroecologiqueSchema = new Schema({
    pratique: { type: String, default: '' },
    avantProjet: { type: String, default: '' },
    introduiteRenforcee: { type: String, default: '' },
    impactObserve: { type: String, default: '' }
}, { _id: false });


// --- Main Schema for the Comparative Questionnaire ---

const QuestionnaireComparatifSchema = new Schema({
    identification: {
        typeRepondant: { type: String, default: '' },
        groupementNom: { type: String, default: '' },
        groupementType: { type: String, default: '' },
        groupementAutrePrecision: { type: String, default: '' },
        individuelNom: { type: String, default: '' },
        individuelSexe: { type: String, default: '' },
        individuelAge: { type: String, default: '' },
        individuelGroupement: { type: String, default: '' },
        individuelStatut: { type: String, default: '' },
        individuelStatutAutrePrecision: { type: String, default: '' },
        fgNombreFemmes: { type: String, default: '' },
        fgNombreHommes: { type: String, default: '' },
        fgJeunes: { type: String, default: '' },
        superficieExploitee: { type: String, default: '' },
        fertilisant: { type: String, default: '' },
        speculationPrincipale: { type: String, default: '' }
    },
    speculationsCultivees: { type: [SpeculationCultiveeSchema], default: [] },
    speculationsCommentaires: { type: String, default: '' },
    fertilisationPratiques: { type: [FertilisationPratiqueSchema], default: [] },
    irrigationGestionEau: { type: [IrrigationGestionEauSchema], default: [] },
    rendementProduction: { type: [RendementProductionSchema], default: [] },
    pratiquesAgroecologiques: { type: [PratiqueAgroecologiqueSchema], default: [] },
    impactGlobal: {
        ameliorationsPratiquesAgricoles: { type: String, default: '' },
        formationsBeneficie: { type: String, default: '' },
        formationsTheme: { type: String, default: '' },
        appreciationEncadrementTechnique: { type: String, default: '' },
        contributionProductiviteRentabilite: { type: String, default: '' },
        contributionCommercialisationProduction: { type: String, default: '' }, // NOUVEAU CHAMP AJOUTÉ
        durabiliteChangementsIntroduits: { type: String, default: '' },
        difficultesPersistantes: { type: String, default: '' },
        recommandationsAgricultureDurable: { type: String, default: '' }
    },
    syntheseObservations: {
        observationsGenerales: { type: String, default: '' },
        appreciationGlobaleEvolution: { type: String, default: '' },
        signatures: { type: String, default: '' }
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('QuestionnaireComparatif', QuestionnaireComparatifSchema);