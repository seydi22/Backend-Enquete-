const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- Sub-Schemas for Comparative Tables ---

// 1. Spéculations cultivées (Speculations cultivées)
const SpeculationCultiveeSchema = new Schema({
    speculation: { type: String, default: '' },
    avantProjet: { type: String, default: '' },
    apresProjet: { type: String, default: '' },
    changementObserve: { type: String, default: '' }
}, { _id: false });

// 2. Fertilisation et pratiques culturales (Fertilisation Pratiques)
const FertilisationPratiqueSchema = new Schema({
    type: { type: String, default: '' }, // e.g., 'Utilisation d’engrais chimiques'
    avantProjet: { type: String, default: '' },
    apresProjet: { type: String, default: '' },
    changementsObserves: { type: String, default: '' }
}, { _id: false });

// 3. Irrigation et gestion de l’eau (Irrigation Gestion Eau)
const IrrigationGestionEauSchema = new Schema({
    aspect: { type: String, default: '' }, // e.g., 'Source d’eau'
    avantProjet: { type: String, default: '' },
    apresProjet: { type: String, default: '' },
    evolutionPercue: { type: String, default: '' }
}, { _id: false });

// 4. Rendement et production (Rendement Production)
const RendementProductionSchema = new Schema({
    culturePrincipale: { type: String, required: true },
    rendementAvant: { type: String, required: true },
    rendementApres: { type: String, required: true },
    variation: { type: String, required: true },
    facteursAmelioration: { type: String, required: true }
}, { _id: false });

// 5. Pratiques agroécologiques (Pratiques Agroecologiques)
const PratiqueAgroecologiqueSchema = new Schema({
    pratique: { type: String, default: '' }, // e.g., 'Compostage...'
    avantProjet: { type: String, default: '' },
    introduiteRenforcee: { type: String, default: '' },
    impactObserve: { type: String, default: '' }
}, { _id: false });


// --- Main Schema for Formulaire Comparatif ---
const ComparatifSchema = new Schema({
    identification: {
        typeRepondant: { type: String, default: '' }, // 'groupement', 'individuel', 'fg'
        
        // Groupement fields
        groupementNom: { type: String, default: '' },
        groupementType: { type: String, default: '' },
        groupementAutrePrecision: { type: String, default: '' },
        
        // Individuel fields
        individuelNom: { type: String, default: '' },
        individuelSexe: { type: String, default: '' },
        individuelAge: { type: String, default: '' },
        // NOTE: individuelGroupement field is present in state but not used in JSX
        
        // General status field
        individuelStatut: { type: String, default: '' }, 
        individuelStatutAutrePrecision: { type: String, default: '' },
        
        // Parcelle fields
        parcelleStatut: { type: String, default: '' },
        parcelleStatutAutrePrecision: { type: String, default: '' },
        superficieExploitee: { type: String, default: '' }, // Used in 'individuel' section

        // Focus Group (FG) fields
        fgNombreFemmes: { type: String, default: '' },
        fgNombreHommes: { type: String, default: '' },
        fgJeunes: { type: String, default: '' },
        
        // NOTE: fertilisant, speculationPrincipale are in the state but not used in JSX
    },

    speculationsCultivees: [SpeculationCultiveeSchema],
    speculationsCommentaires: { type: String, default: '' },

    fertilisationPratiques: [FertilisationPratiqueSchema],

    irrigationGestionEau: [IrrigationGestionEauSchema],

    rendementProduction: [RendementProductionSchema],

    pratiquesAgroecologiques: [PratiqueAgroecologiqueSchema],

    impactGlobal: {
        ameliorationsPratiquesAgricoles: { type: String, default: '' },
        formationsBeneficie: { type: String, default: '' },
        formationsTheme: { type: String, default: '' },
        appreciationEncadrementTechnique: { type: String, default: '' },
        contributionProductiviteRentabilite: { type: String, default: '' },
        contributionCommercialisationProduction: { type: String, default: '' }, // New field
        durabiliteChangementsIntroduits: { type: String, default: '' },
        difficultesPersistantes: { type: String, default: '' },
        recommandationsAgricultureDurable: { type: String, default: '' }
    },

    syntheseObservations: {
        observationsGenerales: { type: String, default: '' },
        appreciationGlobaleEvolution: { type: String, default: '' },
        signatures: { type: String, default: '' },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comparatif', ComparatifSchema);