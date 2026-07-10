import React, { useState, useEffect } from 'react';

function App() {
  // États de l'application
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // États pour les formulaires
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  // Cycle de démarrage : Splash Screen + Vérification du compte local
  useEffect(() => {
    const savedUser = localStorage.getItem('studyLife_user');
    if (savedUser) {
      setHasAccount(true);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Action : Inscription locale
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

  // Action : Connexion locale
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

  // Action : Déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
  };

  // ==========================================
  // RENDU 1 : ÉCRAN DE CHARGEMENT (SPLASH SCREEN)
  // ==========================================
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

  // ==========================================
  // RENDU 2 : FORMULAIRE D'INSCRIPTION (SÉCURITÉ RENFORCÉE)
  // ==========================================
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

              {/* Utilisation d'un nom de formulaire exotique pour bloquer l'autofill */}
              <form onSubmit={handleRegister} name="form_secure_register" autoComplete="new-password">
                
                {/* Champ Nom d'utilisateur */}
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

                {/* Champ Mot de passe */}
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

                {/* Champ Confirmation */}
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

  // ==========================================
  // RENDU 3 : ÉCRAN DE CONNEXION (SÉCURITÉ RENFORCÉE)
  // ==========================================
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
                
                {/* Champ Nom d'utilisateur */}
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

                {/* Champ Mot de passe */}
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

  // ==========================================
  // RENDU 4 : ACCUEIL PRINCIPAL (SI CONNECTÉ)
  // ==========================================
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 glass-card p-3 border-0">
        <h4 className="fw-bold m-0 text-dark">📚 StudyLife</h4>
        <button onClick={handleLogout} className="btn btn-light btn-sm fw-semibold shadow-sm border-0 rounded-3 px-3 py-2 text-danger">
          Déconnexion
        </button>
      </div>

      <div className="p-5 text-center glass-card border-0">
        <h2 className="fw-bold text-dark">Bien connecté !</h2>
        <p className="text-muted">La saisie automatique est maintenant bloquée au maximum.</p>
      </div>
    </div>
  );
}

export default App;