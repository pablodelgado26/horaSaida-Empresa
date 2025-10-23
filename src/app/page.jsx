'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [savedTimes, setSavedTimes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editEntry, setEditEntry] = useState('');
  const [editExit, setEditExit] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Carregar dados do localStorage após montagem no cliente
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('savedTimes');
    if (saved) {
      setSavedTimes(JSON.parse(saved));
    }
  }, []);

  const calculateExitTime = (entry) => {
    if (!entry) {
      setExitTime('');
      return;
    }

    const [hours, minutes] = entry.split(':').map(Number);
    
    // Adicionar 8 horas e 48 minutos
    let exitHours = hours + 8;
    let exitMinutes = minutes + 48;
    
    // Ajustar minutos se passar de 60
    if (exitMinutes >= 60) {
      exitHours += Math.floor(exitMinutes / 60);
      exitMinutes = exitMinutes % 60;
    }
    
    // Ajustar horas se passar de 24
    if (exitHours >= 24) {
      exitHours = exitHours % 24;
    }
    
    // Formatar com zero à esquerda
    const formattedExit = `${String(exitHours).padStart(2, '0')}:${String(exitMinutes).padStart(2, '0')}`;
    setExitTime(formattedExit);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setEntryTime(value);
    calculateExitTime(value);
  };

  const handleSave = () => {
    if (!entryTime || !exitTime) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      entryTime,
      exitTime,
      timestamp: new Date().toISOString()
    };

    const updatedTimes = [newEntry, ...savedTimes];
    setSavedTimes(updatedTimes);
    localStorage.setItem('savedTimes', JSON.stringify(updatedTimes));
    
    // Mostrar mensagem de sucesso
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    const updatedTimes = savedTimes.filter(time => time.id !== id);
    setSavedTimes(updatedTimes);
    localStorage.setItem('savedTimes', JSON.stringify(updatedTimes));
  };

  const handleEdit = (time) => {
    setEditingId(time.id);
    setEditEntry(time.entryTime);
    setEditExit(time.exitTime);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditEntry('');
    setEditExit('');
  };

  const handleSaveEdit = (id) => {
    const updatedTimes = savedTimes.map(time => 
      time.id === id 
        ? { ...time, entryTime: editEntry, exitTime: editExit }
        : time
    );
    setSavedTimes(updatedTimes);
    localStorage.setItem('savedTimes', JSON.stringify(updatedTimes));
    setEditingId(null);
    setEditEntry('');
    setEditExit('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className={styles.title}>Horário de Saída</h1>
          <p className={styles.subtitle}>Jornada de 8h48min</p>
        </div>

        {/* Input Section */}
        <div className={styles.inputSection}>
          <label htmlFor="entry-time" className={styles.label}>
            Horário de Entrada
          </label>
          <input
            id="entry-time"
            type="time"
            value={entryTime}
            onChange={handleTimeChange}
            className={styles.timeInput}
          />
        </div>

        {/* Divider */}
        {exitTime && (
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className={styles.dividerLine}></div>
          </div>
        )}

        {/* Result Section */}
        {exitTime && (
          <div className={styles.resultSection}>
            <label className={styles.label}>Horário de Saída</label>
            <div className={styles.resultBox}>
              <div className={styles.resultTime}>{exitTime}</div>
              <div className={styles.resultInfo}>+ 8 horas e 48 minutos</div>
            </div>
            
            {/* Botão Salvar */}
            <button onClick={handleSave} className={styles.saveButton}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Salvar Horários
            </button>
          </div>
        )}

        {/* Mensagem de Sucesso */}
        {showSuccess && (
          <div className={styles.successMessage}>
            ✓ Horários salvos com sucesso!
          </div>
        )}

        {/* Info Card */}
        {!exitTime && (
          <div className={styles.infoCard}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.infoIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className={styles.infoText}>
              Insira seu horário de entrada para calcular automaticamente a hora de saída
            </p>
          </div>
        )}

        {/* Lista de Horários Salvos */}
        {isMounted && savedTimes.length > 0 && (
          <div className={styles.savedTimesSection}>
            <h2 className={styles.savedTimesTitle}>Horários Salvos</h2>
            <div className={styles.savedTimesList}>
              {savedTimes.map((time) => (
                <div key={time.id} className={styles.savedTimeItem}>
                  {editingId === time.id ? (
                    // Modo de Edição
                    <div className={styles.editMode}>
                      <div className={styles.savedTimeDate}>{time.date}</div>
                      <div className={styles.editInputs}>
                        <div className={styles.editField}>
                          <label className={styles.editLabel}>Entrada:</label>
                          <input
                            type="time"
                            value={editEntry}
                            onChange={(e) => setEditEntry(e.target.value)}
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.editField}>
                          <label className={styles.editLabel}>Saída:</label>
                          <input
                            type="time"
                            value={editExit}
                            onChange={(e) => setEditExit(e.target.value)}
                            className={styles.editInput}
                          />
                        </div>
                      </div>
                      <div className={styles.editButtons}>
                        <button 
                          onClick={() => handleSaveEdit(time.id)} 
                          className={styles.saveEditButton}
                          title="Salvar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Salvar
                        </button>
                        <button 
                          onClick={handleCancelEdit} 
                          className={styles.cancelEditButton}
                          title="Cancelar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Modo de Visualização
                    <>
                      <div className={styles.savedTimeContent}>
                        <div className={styles.savedTimeDate}>{time.date}</div>
                        <div className={styles.savedTimeTimes}>
                          <span className={styles.timeLabel}>Entrada:</span>
                          <span className={styles.timeValue}>{time.entryTime}</span>
                          <span className={styles.timeSeparator}>→</span>
                          <span className={styles.timeLabel}>Saída:</span>
                          <span className={styles.timeValue}>{time.exitTime}</span>
                        </div>
                      </div>
                      <div className={styles.actionButtons}>
                        <button 
                          onClick={() => handleEdit(time)} 
                          className={styles.editButton}
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(time.id)} 
                          className={styles.deleteButton}
                          title="Excluir"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
