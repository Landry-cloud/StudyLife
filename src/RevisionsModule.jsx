import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RevisionsModule({ onBack }) {
  const [subjects, setSubjects] = useState([]);
  const [cards, setCards] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [cardDifficulty, setCardDifficulty] = useState('Facile');

  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem('studyLife_subjects') || '[]');
    const savedCards = JSON.parse(localStorage.getItem('studyLife_cards') || '[]');
    setSubjects(savedSubjects);
    setCards(savedCards);
    if (savedSubjects.length > 0) {
      setSelectedSubject(savedSubjects[0].name);
    }
  }, []);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return;
    if (subjects.some(sub => sub.name.toLowerCase() === subjectName.trim().toLowerCase())) return;

    const newSubject = { id: Date.now(), name: subjectName.trim() };
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    localStorage.setItem('studyLife_subjects', JSON.stringify(updatedSubjects));
    
    if (!selectedSubject) {
      setSelectedSubject(newSubject.name);
    }
    setSubjectName('');
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardTitle.trim() || !cardContent.trim() || !selectedSubject) return;

    const newCard = {
      id: Date.now(),
      title: cardTitle.trim(),
      content: cardContent.trim(),
      subject: selectedSubject,
      difficulty: cardDifficulty,
      date: new Date().toLocaleDateString('fr-FR')
    };

    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);
    localStorage.setItem('studyLife_cards', JSON.stringify(updatedCards));
    setCardTitle('');
    setCardContent('');
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem('studyLife_cards', JSON.stringify(updatedCards));
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={onBack} className="btn btn-light btn-sm rounded-3 px-3 border-0 shadow-sm">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="me-2" /> Retour
        </button>
        <h4 className="fw-bold m-0 text-dark">Espace Révisions</h4>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card glass-card border-0 p-4 shadow-sm mb-4">
            <h5 className="fw-bold mb-3 text-dark">Ajouter une Matière</h5>
            <form onSubmit={handleAddSubject}>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nom de la matière"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  autoComplete="off"
                />
                <label>Nom de la matière (Ex: Mathématiques)</label>
              </div>
              <button type="submit" className="btn btn-dark w-100 py-2.5 fw-bold rounded-3 border-0">
                Créer la Matière
              </button>
            </form>
          </div>

          <div className="card glass-card border-0 p-4 shadow-sm">
            <h5 className="fw-bold mb-3 text-dark">Nouvelle Fiche de Cours</h5>
            <form onSubmit={handleAddCard}>
              <div className="form-floating mb-3">
                <select 
                  className="form-select" 
                  value={selectedSubject} 
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.length === 0 ? (
                    <option value="">Créez d'abord une matière</option>
                  ) : (
                    subjects.map(sub => (
                      <option key={sub.id} value={sub.name}>{sub.name}</option>
                    ))
                  )}
                </select>
                <label>Sélectionner la Matière</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Titre de la fiche"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  autoComplete="off"
                />
                <label>Titre de la fiche</label>
              </div>
              <div className="form-floating mb-3">
                <select 
                  className="form-select" 
                  value={cardDifficulty} 
                  onChange={(e) => setCardDifficulty(e.target.value)}
                >
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Difficile">Difficile</option>
                </select>
                <label>Niveau de difficulté</label>
              </div>
              <div className="form-floating mb-3">
                <textarea 
                  className="form-control" 
                  placeholder="Résumé du cours" 
                  style={{ height: '120px' }}
                  value={cardContent}
                  onChange={(e) => setCardContent(e.target.value)}
                ></textarea>
                <label>Résumé ou notions clés</label>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 border-0" style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }} disabled={subjects.length === 0}>
                Enregistrer la Fiche
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="row g-3">
            {cards.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-white bg-dark bg-opacity-25 d-inline-block px-4 py-2 rounded-4 m-0">Aucune fiche de révision créée.</p>
              </div>
            ) : (
              cards.map(card => (
                <div className="col-12 col-md-6" key={card.id}>
                  <div className="card border-0 p-3 shadow-sm rounded-4 h-100 d-flex flex-column justify-content-between bg-white">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary px-2 py-1 rounded-3 small">
                          {card.subject}
                        </span>
                        <span className={`badge px-2 py-1 rounded-3 small ${
                          card.difficulty === 'Facile' ? 'bg-success bg-opacity-10 text-success' :
                          card.difficulty === 'Moyen' ? 'bg-warning bg-opacity-10 text-warning' :
                          'bg-danger bg-opacity-10 text-danger'
                        }`}>
                          {card.difficulty}
                        </span>
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{card.title}</h5>
                      <p className="text-muted small text-break" style={{ whiteSpace: 'pre-line' }}>{card.content}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-2">
                      <small className="text-muted">{card.date}</small>
                      <button 
                        onClick={() => handleDeleteCard(card.id)} 
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