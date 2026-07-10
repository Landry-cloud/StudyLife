import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function JournalModule({ onBack }) {
  const [pinConfigured, setPinConfigured] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState('General');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPin = localStorage.getItem('studyLife_pin');
    if (savedPin) {
      setPinConfigured(true);
    }
    const savedNotes = JSON.parse(localStorage.getItem('studyLife_notes') || '[]');
    setNotes(savedNotes);
  }, []);

  const handleSetupPin = (e) => {
    e.preventDefault();
    setError('');
    if (newPin.length !== 4 || confirmPin.length !== 4) {
      setError('Le code PIN doit contenir exactement 4 chiffres.');
      return;
    }
    if (newPin !== confirmPin) {
      setError('Les codes PIN ne correspondent pas.');
      return;
    }
    localStorage.setItem('studyLife_pin', newPin);
    setPinConfigured(true);
    setIsUnlocked(true);
    setError('');
  };

  const handleVerifyPin = (e) => {
    e.preventDefault();
    setError('');
    const savedPin = localStorage.getItem('studyLife_pin');
    if (pinInput === savedPin) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Code PIN incorrect.');
      setPinInput('');
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      category: noteCategory,
      date: new Date().toLocaleDateString('fr-FR')
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('studyLife_notes', JSON.stringify(updatedNotes));
    setNoteTitle('');
    setNoteContent('');
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('studyLife_notes', JSON.stringify(updatedNotes));
  };

  if (!pinConfigured) {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="glass-card p-4 p-sm-5 mx-auto border-0 text-center" style={{ maxWidth: '400px' }}>
          <h4 className="fw-bold text-dark mb-3">Définir un code PIN</h4>
          <p className="text-muted small">Le journal est privé. Veuillez configurer un code de sécurité à 4 chiffres.</p>
          {error && <div className="alert alert-danger py-2 small">{error}</div>}
          <form onSubmit={handleSetupPin}>
            <div className="form-floating mb-3">
              <input 
                type="password" 
                pattern="[0-9]*" 
                inputMode="numeric" 
                maxLength="4" 
                className="form-control text-center fs-4" 
                placeholder="Nouveau PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              />
              <label>Nouveau PIN (4 chiffres)</label>
            </div>
            <div className="form-floating mb-4">
              <input 
                type="password" 
                pattern="[0-9]*" 
                inputMode="numeric" 
                maxLength="4" 
                className="form-control text-center fs-4" 
                placeholder="Confirmer PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              />
              <label>Confirmer le PIN</label>
            </div>
            <button type="submit" className="btn btn-warning text-white w-100 py-3 fw-bold rounded-3 border-0 mb-2">
              Enregistrer le code PIN
            </button>
            <button type="button" onClick={onBack} className="btn btn-link text-secondary btn-sm w-100">
              Retour
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="glass-card p-4 p-sm-5 mx-auto border-0 text-center" style={{ maxWidth: '400px' }}>
          <h4 className="fw-bold text-dark mb-3">Journal Verrouillé</h4>
          <p className="text-muted small">Saisissez votre code PIN pour accéder à vos notes.</p>
          {error && <div className="alert alert-danger py-2 small">{error}</div>}
          <form onSubmit={handleVerifyPin}>
            <div className="form-floating mb-4">
              <input 
                type="password" 
                pattern="[0-9]*" 
                inputMode="numeric" 
                maxLength="4" 
                className="form-control text-center fs-4" 
                placeholder="Code PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
              <label>Code PIN</label>
            </div>
            <button type="submit" className="btn btn-warning text-white w-100 py-3 fw-bold rounded-3 border-0 mb-2">
              Déverrouiller
            </button>
            <button type="button" onClick={onBack} className="btn btn-link text-secondary btn-sm w-100">
              Retour
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={onBack} className="btn btn-light btn-sm rounded-3 px-3 border-0 shadow-sm">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="me-2" /> Retour
        </button>
        <h4 className="fw-bold m-0 text-dark">Journal Personnel</h4>
        <button onClick={() => setIsUnlocked(false)} className="btn btn-outline-warning btn-sm rounded-3">
          Verrouiller
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card glass-card border-0 p-4 shadow-sm">
            <h5 className="fw-bold mb-3 text-dark">Nouvelle Note</h5>
            <form onSubmit={handleAddNote}>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Titre"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  autoComplete="off"
                />
                <label>Titre</label>
              </div>
              <div className="form-floating mb-3">
                <select 
                  className="form-select" 
                  value={noteCategory} 
                  onChange={(e) => setNoteCategory(e.target.value)}
                >
                  <option value="General">Général</option>
                  <option value="Etudes">Études</option>
                  <option value="Idees">Idées</option>
                  <option value="Personnel">Personnel</option>
                </select>
                <label>Catégorie</label>
              </div>
              <div className="form-floating mb-3">
                <textarea 
                  className="form-control" 
                  placeholder="Contenu" 
                  style={{ height: '150px' }}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                ></textarea>
                <label>Écrivez ici...</label>
              </div>
              <button type="submit" className="btn btn-warning text-white w-100 py-2.5 fw-bold rounded-3 border-0">
                Ajouter au Journal
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="row g-3">
            {notes.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-white bg-dark bg-opacity-25 d-inline-block px-4 py-2 rounded-4 m-0">Aucune note enregistrée dans le journal.</p>
              </div>
            ) : (
              notes.map(note => (
                <div className="col-12 col-md-6" key={note.id}>
                  <div className="card border-0 p-3 shadow-sm rounded-4 h-100 d-flex flex-column justify-content-between bg-white">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge bg-warning bg-opacity-10 text-warning px-2.5 py-1.5 rounded-3 small">
                          {note.category}
                        </span>
                        <small className="text-muted">{note.date}</small>
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{note.title}</h5>
                      <p className="text-muted small text-break" style={{ whiteSpace: 'pre-line' }}>{note.content}</p>
                    </div>
                    <div className="text-end mt-3 border-top pt-2">
                      <button 
                        onClick={() => handleDeleteNote(note.id)} 
                        className="btn btn-link text-danger p-0 border-0 btn-sm text-decoration-none"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}