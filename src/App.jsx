import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JournalModule from './JournalModule';
import RevisionsModule from './RevisionsModule';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const [stats, setStats] = useState({
    journalEntries: 0,
    subjectsCount: 0,
    revisionCards: 0,
    progressPercentage: 0
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('studyLife_user');
    if (savedUser) {
      setHasAccount(true);
      
      const savedNotes = JSON.parse(localStorage.getItem('studyLife_notes') || '[]');
      const savedSubjects = JSON.parse(localStorage.getItem('studyLife_subjects') || '[]');
      const savedCards = JSON.parse(localStorage.getItem('studyLife_cards') || '[]');
      
      setStats({
        journalEntries: savedNotes.length,
        subjectsCount: savedSubjects.length,
        revisionCards: savedCards.length,
        progressPercentage: savedCards.length > 0 ? Math.min(Math.round((savedCards.length * 100) / 20), 100) : 0
      });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, currentModule]);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const userData = { username: username.trim(), password: password };
    localStorage.setItem('studyLife_user', JSON.stringify(userData));
    
    setHasAccount(true);
    setIsLoggedIn(true);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const savedUser = JSON.parse(localStorage.getItem('studyLife_user'));

    if (loginUsername.trim() === savedUser.username && loginPassword === savedUser.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Nom d’utilisateur ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
    setCurrentModule('dashboard');
  };

  if (isLoading) {
    return (
      <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
        <div className="mb-4 text-center" style={{ maxWidth: '500px', width: '100%' }}>
          <img 
            src="./logo.png" 
            alt="StudyLife Logo" 
            className="img-fluid px-4"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="spinner-border" style={{ color: '#764ba2' }} role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="text-muted small mt-4 fw-light">StudyLife — Votre espace d'apprentissage</p>
      </div>
    );
  }

  if (!hasAccount) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center px-3">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card glass-card border-0 p-4 p-sm-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark">Créer un compte</h3>
                <p className="text-muted small">Configurez votre espace totalement hors ligne</p>
              </div>

              {error && <div className="alert alert-danger py-2 small text-center rounded-3">{error}</div>}

              <form onSubmit={handleRegister} name="form_secure_register" autoComplete="new-password">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="secureUserReg"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="one-time-code"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <label htmlFor="secureUserReg">Nom d'utilisateur</label>
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="securePassReg"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password" 
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <label htmlFor="securePassReg">Mot de passe de sécurité</label>
                </div>

                <div className="form-floating mb-4">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="secureConfirmReg"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <label htmlFor="secureConfirmReg">Confirmer le mot de passe</label>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm border-0" style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}>
                  Créer mon espace
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center px-3">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card glass-card border-0 p-4 p-sm-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark">Connexion</h3>
                <p className="text-muted small">Accédez à votre espace sécurisé</p>
              </div>

              {error && <div className="alert alert-danger py-2 small text-center rounded-3">{error}</div>}

              <form onSubmit={handleLogin} name="form_secure_login" autoComplete="off">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="secureUserLog"
                    placeholder="Nom d'utilisateur"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    autoComplete="one-time-code"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <label htmlFor="secureUserLog">Nom d'utilisateur</label>
                </div>

                <div className="form-floating mb-4">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="securePassLog"
                    placeholder="Mot de passe"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoComplete="one-time-code"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <label htmlFor="securePassLog">Mot de passe</label>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm border-0" style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}>
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 min-vh-100 d-flex flex-column justify-content-between">
      
      <div className="d-flex justify-content-between align-items-center mb-4 glass-card p-3 border-0">
        <h4 className="fw-bold m-0 text-dark" onClick={() => setCurrentModule('dashboard')} style={{ cursor: 'pointer' }}>
          📚 StudyLife
        </h4>
        <button onClick={handleLogout} className="btn btn-light btn-sm fw-semibold shadow-sm border-0 rounded-3 px-3 py-2 text-danger">
          <FontAwesomeIcon icon="fa-solid fa-power-off" className="me-2" />
          Déconnexion
        </button>
      </div>

      {currentModule === 'dashboard' && (
        <div className="animate__animated animate__fadeIn">
          <div className="glass-card p-4 mb-4 border-0 text-center text-sm-start">
            <h2 className="fw-bold text-dark m-0">Bonjour, {JSON.parse(localStorage.getItem('studyLife_user'))?.username || 'Étudiant'}</h2>
            <p className="text-muted m-0 mt-1 small">Prêt pour votre session de travail d'aujourd'hui ?</p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="bg-white p-3 rounded-4 shadow-sm text-center border-0">
                <FontAwesomeIcon icon="fa-solid fa-book" className="text-primary mb-2 h4" />
                <h3 className="fw-bold text-dark m-0">{stats.subjectsCount}</h3>
                <p className="text-muted small m-0">Matières</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white p-3 rounded-4 shadow-sm text-center border-0">
                <FontAwesomeIcon icon="fa-solid fa-clone" className="text-success mb-2 h4" />
                <h3 className="fw-bold text-dark m-0">{stats.revisionCards}</h3>
                <p className="text-muted small m-0">Fiches</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white p-3 rounded-4 shadow-sm text-center border-0">
                <FontAwesomeIcon icon="fa-solid fa-journal-whills" className="text-warning mb-2 h4" />
                <h3 className="fw-bold text-dark m-0">{stats.journalEntries}</h3>
                <p className="text-muted small m-0">Notes Journal</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white p-3 rounded-4 shadow-sm text-center border-0">
                <FontAwesomeIcon icon="fa-solid fa-chart-line" className="text-info mb-2 h4" />
                <h3 className="fw-bold text-dark m-0">{stats.progressPercentage}%</h3>
                <p className="text-muted small m-0">Progression</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="card glass-card h-100 p-4 border-0 shadow text-center d-flex flex-column justify-content-between align-items-center">
                <div className="mb-3">
                  <div className="p-3 bg-warning bg-opacity-10 rounded-circle mb-3 d-inline-block">
                    <FontAwesomeIcon icon="fa-solid fa-user-lock" className="text-warning h1 m-0" />
                  </div>
                  <h4 className="fw-bold text-dark">Journal Personnel</h4>
                  <p className="text-muted small px-2">
                    Consignez vos pensées, notes secrètes et bilans quotidiens. Cet espace est entièrement protégé par un code PIN.
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentModule('journal')} 
                  className="btn btn-warning text-white w-100 py-3 fw-bold rounded-3 shadow-sm border-0"
                >
                  Ouvrir le Journal <FontAwesomeIcon icon="fa-solid fa-lock" className="ms-2 small" />
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card glass-card h-100 p-4 border-0 shadow text-center d-flex flex-column justify-content-between align-items-center">
                <div className="mb-3">
                  <div className="p-3 bg-primary bg-opacity-10 rounded-circle mb-3 d-inline-block">
                    <FontAwesomeIcon icon="fa-solid fa-graduation-cap" className="text-primary h1 m-0" />
                  </div>
                  <h4 className="fw-bold text-dark">Espace Révisions</h4>
                  <p className="text-muted small px-2">
                    Créez vos matières, organisez vos fiches de cours par niveau de difficulté et planifiez vos sessions de révision.
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentModule('revisions')} 
                  className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm border-0"
                  style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}
                >
                  Accéder aux Révisions <FontAwesomeIcon icon="fa-solid fa-arrow-right" className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentModule === 'journal' && (
        <JournalModule onBack={() => setCurrentModule('dashboard')} />
      )}

      {currentModule === 'revisions' && (
        <RevisionsModule onBack={() => setCurrentModule('dashboard')} />
      )}

      <div className="text-center mt-4">
        <p className="text-white bg-dark bg-opacity-25 d-inline-block px-3 py-1 transparent-footer small m-0" style={{ borderRadius: '20px' }}>
          StudyLife 1.0 — 100% Local & Sécurisé
        </p>
      </div>

    </div>
  );
}

export default App;