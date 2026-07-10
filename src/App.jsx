import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Gestion du Splash Screen (Écran de démarrage style Facebook)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Arrête le chargement après 3 secondes
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Rendu de l'écran de chargement
  if (isLoading) {
    return (
      <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
        <div className="mb-4" style={{ maxWidth: '150px' }}>
          {/* Recherche l'image logo.png placée dans le dossier public */}
          <img 
            src="./logo.png" 
            alt="StudyLife Logo" 
            className="img-fluid"
            onError={(e) => {
              // Si le logo personnalisé n'existe pas encore, affiche une icône par défaut
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Spinner de chargement Bootstrap */}
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        
        <p className="text-muted small mt-3 fw-light">StudyLife — Votre espace d'apprentissage</p>
      </div>
    );
  }

  // Rendu de l'application après chargement
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-5 shadow text-center" style={{ maxWidth: '400px', borderRadius: '15px' }}>
        
        <div className="text-success display-1 mb-3">
          <FontAwesomeIcon icon="fa-solid fa-circle-check" />
        </div>
        
        <h2 className="fw-bold text-dark">Démarrage Réussi !</h2>
        <p className="text-muted small">
          Le Splash Screen a fonctionné. L'environnement est prêt pour le code.
        </p>
        
        <button className="btn btn-primary w-100 py-2 mt-2 fw-semibold">
          <FontAwesomeIcon icon="fa-solid fa-rocket" className="me-2" />
          Étape suivante
        </button>
      </div>
    </div>
  );
}

export default App;