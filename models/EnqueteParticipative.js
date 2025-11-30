const mongoose = require('mongoose');
const { Schema } = mongoose;

// This sub-schema is for the list of participants in the identification section
const ParticipantSchema = new Schema({
    nomPrenom: { type: String, default: '' },
    age: { type: String, default: '' },
    sexe: { type: String, default: '' },
    fonction: { type: String, default: '' },
    contact: { type: String, default: '' },
    parcelleDimension: { type: String, default: '' },
    titreFoncier: { type: String, default: '' }
}, { _id: false });

// This sub-schema is for the 'difficulties and solutions' table
const DifficulteSolutionSchema = new Schema({
    difficulte: { type: String, default: '' },
    solution: { type: String, default: '' }
}, { _id: false });

// This is the main schema for the entire focus group survey
const EnqueteParticipativeSchema = new Schema({
    identification: {
        localite: { type: String, default: '' },
        dateSeance: { type: String, default: '' },
        compositionGroupe: { type: String, default: '' },
        listeParticipants: [ParticipantSchema]
    },
    pertinence: {
        problematiquesAgricoles: { type: String, default: '' },
        repondBesoinLocaux: { type: String, default: '' },
        repondBesoinLocauxCommentaire: { type: String, default: '' },
        implicationActeurs: { type: String, default: '' },
        aspectsPertinents: { type: String, default: '' },
        besoinsNonCouvert: { type: String, default: '' }
    },
    efficacite: {
        activitesRealiseesDelaisPlans: { type: String, default: '' },
        activitesRealiseesCommentaire: { type: String, default: '' },
        qualiteFormationsAppuis: { type: String, default: '' },
        coordinationSatisfaisante: { type: String, default: '' },
        coordinationCommentaire: { type: String, default: '' },
        difficultesSolutions: [DifficulteSolutionSchema],
        difficultesCommentaire: { type: String, default: '' }
    },
    efficience: {
        ressourcesOptimales: { type: String, default: '' },
        ressourcesOptimalesCommentaire: { type:String, default: '' },
        gaspillagesRetardsDoublons: { type: String, default: '' },
        gaspillagesRetardsDoublonsCommentaire: { type: String, default: '' },
        mecanismesFavorables: { type: String, default: '' },
        mecanismesFreinage: { type: String, default: '' }
    },
    resultatsImpacts: {
        changementsProductionAgricole: { type: String, default: '' },
        revenusConditionsVieEvolue: { type: String, default: '' },
        revenusConditionsVieExemples: { type: String, default: '' },
        capacitesTechniquesRenforcees: { type: String, default: '' },
        capacitesTechniquesExemples: { type: String, default: '' },
        innovationsBonnesPratiques: {
            innovations: { type: String, default: '' },
            bonnesPratiques: { type: String, default: '' }
        },
        beneficeFemmesJeunes: {
            casFemmes: { type: String, default: '' },
            casJeunes: { type: String, default: '' }
        },
        effetsIndirectsInattendus: {
            positifsIndirects: { type: String, default: '' },
            negatifsIndirects: { type: String, default: '' },
            positifsInattendus: { type: String, default: '' },
            negatifsInattendus: { type: String, default: '' }
        }
    },
    durabilitePerspectives: {
        acquisMaintenusFinancement: { type: String, default: '' },
        acquisMaintenusCommentaire: { type: String, default: '' },
        acteursLocauxMoyensNecessaires: { type: String, default: '' },
        acteursLocauxMoyensNecessairesCommentaire: { type: String, default: '' },
        partenariatsAppuisNecessaires: { type: String, default: '' },
        recommandationsDurabilite: { type: String, default: '' }
    },
    gouvernanceParticipation: {
        gestionParticipativeTransparente: { type: String, default: '' },
        gestionParticipativeTransparenteCommentaire: { type: String, default: '' },
        structuresLocalesRoleActif: { type: String, default: '' },
        structuresLocalesRoleActifCommentaire: { type: String, default: '' },
        mecanismesCommunicationSuivi: { type: String, default: '' },
        mecanismesCommunicationSuiviCommentaire: { type: String, default: '' }
    },
    recommandationsParticipants: {
        suggestionsAmeliorerProjet: { type: String, default: '' },
        leconsExperienceCollective: { type: String, default: '' }
    },
    animateur: { type: String, default: '' },
    dateAnimateur: { type: String, default: '' },
}, {
    timestamps: true, // This will add createdAt and updatedAt fields
});

module.exports = mongoose.model('EnqueteParticipative', EnqueteParticipativeSchema);
