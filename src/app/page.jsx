'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');

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
          <h1 className={styles.title}>Calculadora de Saída</h1>
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
            </div>
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
      </div>
    </div>
  );
}
