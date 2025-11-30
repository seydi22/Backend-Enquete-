const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

// Initialiser l'application Express
const app = express();

// Middlewares
app.use(cors()); // Activer CORS pour toutes les routes
app.use(express.json()); // Pour parser le JSON des requêtes entrantes

// Importer les fichiers de routes
const comparatifRoutes = require('./routes/comparatif');
const participativeRoutes = require('./routes/participative');

// Monter les routes
app.use('/api/comparatif', comparatifRoutes);
app.use('/api/participative', participativeRoutes);

// Route de base pour tester le serveur
app.get('/', (req, res) => {
  res.send('API pour l\'évaluation du projet agricole de Nouakchott');
});

// Définir le port
const PORT = process.env.PORT || 5000;

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré en mode ${process.env.NODE_ENV || 'development'} sur le port ${PORT}`);
});

// Gérer les erreurs de promesses non interceptées
process.on('unhandledRejection', (err, promise) => {
  console.log(`Erreur: ${err.message}`);
  // Fermer le serveur et quitter le processus
  server.close(() => process.exit(1));
});