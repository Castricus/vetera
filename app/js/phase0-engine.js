/**
 * ============================================================================
 * MOTOR TÁCTICO DE LA FASE 0: LOS PRIMEROS 90 SEGUNDOS
 * phase0-engine.js · Interfaz Dinámica de 4 Columnas y Simulador Cronometrado
 * ============================================================================
 */

import { THREAT_COLUMNS, PHASE_0_THREATS } from '../data/phase0-threats.js';

export class Phase0Engine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedThreatId = '4.1-nuclear'; // Por defecto Detonación Nuclear
        this.selectedLocation = 'casa'; // 'casa' | 'coche' | 'trabajo'
        
        // Estado del cronómetro de 90 segundos
        this.timerSeconds = 90;
        this.timerInterval = null;
        this.isTimerRunning = false;
        
        // Inicializar sintetizador de audio táctico Web Audio API
        this.audioCtx = null;

        this.render();
    }

    initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
    }

    playTacticalBeep(freq = 440, duration = 0.08, type = 'sine') {
        try {
            this.initAudio();
            if (!this.audioCtx || this.audioCtx.state === 'suspended') {
                this.audioCtx?.resume();
            }
            if (!this.audioCtx) return;

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start();
            osc.stop(this.audioCtx.currentTime + duration);
        } catch (e) {
            // Audio no permitido o silenciado
        }
    }

    selectThreat(id) {
        this.selectedThreatId = id;
        this.resetTimer();
        this.render();
        this.playTacticalBeep(520, 0.05, 'triangle');
    }

    setLocation(loc) {
        this.selectedLocation = loc;
        this.render();
        this.playTacticalBeep(480, 0.04, 'sine');
    }

    startTimer() {
        if (this.isTimerRunning) return;
        this.initAudio();
        this.isTimerRunning = true;
        this.playTacticalBeep(880, 0.15, 'square');

        this.timerInterval = setInterval(() => {
            if (this.timerSeconds > 0) {
                this.timerSeconds--;
                this.updateTimerDisplay();
                // Sonido de pulso táctico en segundos clave
                if (this.timerSeconds === 80 || this.timerSeconds === 30 || this.timerSeconds === 10) {
                    this.playTacticalBeep(880, 0.12, 'sawtooth');
                } else if (this.timerSeconds <= 5) {
                    this.playTacticalBeep(980, 0.08, 'sine');
                }
            } else {
                this.pauseTimer();
                this.playTacticalBeep(440, 0.4, 'triangle');
                alert('⏱️ ¡90 SEGUNDOS CUMPLIDOS! Impacto inicial superado. Ahora pasas a la FASE 1: Primeras 72 Horas.');
            }
        }, 1000);

        this.updateTimerControls();
    }

    pauseTimer() {
        this.isTimerRunning = false;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.updateTimerControls();
    }

    resetTimer() {
        this.pauseTimer();
        this.timerSeconds = 90;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const timerEl = document.getElementById('phase0-countdown-display');
        const progressBar = document.getElementById('phase0-progress-bar');
        const currentPhasePill = document.getElementById('phase0-current-window-label');
        
        if (timerEl) {
            const min = Math.floor(this.timerSeconds / 60);
            const sec = this.timerSeconds % 60;
            timerEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }

        const elapsed = 90 - this.timerSeconds;
        const pct = Math.min(100, Math.max(0, (elapsed / 90) * 100));
        if (progressBar) {
            progressBar.style.width = `${pct}%`;
        }

        // Resaltar ventana activa
        let activeWindowKey = 't0_10';
        let windowLabel = 'VENTANA 1: 0 - 10s · REFLEJO BIOMECÁNICO';
        let windowColor = '#ef4444';

        if (elapsed > 10 && elapsed <= 60) {
            activeWindowKey = 't10_60';
            windowLabel = 'VENTANA 2: 10 - 60s · TRIAJE ¿QUEDARSE O SALIR?';
            windowColor = '#facc15';
        } else if (elapsed > 60) {
            activeWindowKey = 't60_90';
            windowLabel = 'VENTANA 3: 60 - 90s · ASEGURAMIENTO Y FAMILIA';
            windowColor = '#22c55e';
        }

        if (currentPhasePill) {
            currentPhasePill.textContent = windowLabel;
            currentPhasePill.style.color = windowColor;
            currentPhasePill.style.borderColor = windowColor;
        }

        // Marcar visualmente el contenedor de la ventana activa
        ['t0_10', 't10_60', 't60_90'].forEach(key => {
            const el = document.getElementById(`card-window-${key}`);
            if (el) {
                if (key === activeWindowKey) {
                    el.style.borderColor = windowColor;
                    el.style.background = 'rgba(21, 38, 54, 0.95)';
                    el.style.boxShadow = `0 0 16px ${windowColor}33`;
                } else {
                    el.style.borderColor = 'var(--border-subtle)';
                    el.style.background = 'var(--bg-surface-elevated)';
                    el.style.boxShadow = 'none';
                }
            }
        });
    }

    updateTimerControls() {
        const btnStart = document.getElementById('phase0-btn-start');
        const btnPause = document.getElementById('phase0-btn-pause');
        if (btnStart && btnPause) {
            if (this.isTimerRunning) {
                btnStart.style.display = 'none';
                btnPause.style.display = 'inline-flex';
            } else {
                btnStart.style.display = 'inline-flex';
                btnPause.style.display = 'none';
            }
        }
    }

    getCurrentThreat() {
        return PHASE_0_THREATS.find(t => t.id === this.selectedThreatId) || PHASE_0_THREATS[0];
    }

    render() {
        if (!this.container) return;
        const threat = this.getCurrentThreat();
        const currentColumn = THREAT_COLUMNS.find(c => c.id === threat.columnId);
        
        const isEvac = threat.decisionType === 'evacuacion';
        const decisionBadgeBg = isEvac ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)';
        const decisionBadgeBorder = isEvac ? '#ef4444' : '#22c55e';
        const decisionBadgeText = isEvac ? '#fca5a5' : '#86efac';

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                
                <!-- CABECERA TÁCTICA DEL MÓDULO FASE 0 -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span class="badge-tactical" style="color:var(--action-yellow);border-color:var(--action-yellow);">
                                🚨 FASE 0 · PROTOCOLO OFICIAL DE PROTECCIÓN CIVIL
                            </span>
                            <span class="badge-tactical" style="color:var(--text-metallic);">
                                16 ESCENARIOS EN 4 COLUMNAS
                            </span>
                        </div>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-3xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;letter-spacing:0.02em;">
                            Los Primeros 90 Segundos: Matriz Universal
                        </h2>
                    </div>

                    <!-- Botón de Simulación de Emergencia -->
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-dim);">TIEMPO DE IMPACTO:</span>
                        <div style="background:#000;border:2px solid var(--border-strong);padding:6px 14px;border-radius:var(--radius-sm);display:flex;align-items:center;gap:8px;">
                            <span style="font-size:14px;color:var(--status-red);animation:pulse 1s infinite;">●</span>
                            <span id="phase0-countdown-display" style="font-family:var(--font-mono);font-size:1.4rem;font-weight:700;color:var(--action-yellow);letter-spacing:2px;">
                                01:30
                            </span>
                        </div>
                    </div>
                </div>

                <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:1.5rem;line-height:1.6;">
                    En una catástrofe súbita no hay tiempo para leer manuales extensos. Esta matriz cubre las cuatro amenazas primarias de la física civil. Selecciona tu ubicación actual y la amenaza detectada para ejecutar la secuencia biomecánica exacta antes de que termine la cuenta regresiva.
                </p>

                <!-- FILTRO 1: UBICACIÓN ACTUAL DEL USUARIO -->
                <div style="background:var(--bg-surface-elevated);padding:1rem 1.25rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);margin-bottom:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:1.2rem;">📍</span>
                        <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-metallic);text-transform:uppercase;font-weight:700;">
                            ¿Dónde te encuentras ahora?
                        </span>
                    </div>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;" id="phase0-location-group">
                        <button class="btn btn-sm ${this.selectedLocation === 'casa' ? 'btn-primary' : 'btn-secondary'}" data-loc="casa">
                            🏠 En Casa / Vivienda
                        </button>
                        <button class="btn btn-sm ${this.selectedLocation === 'coche' ? 'btn-primary' : 'btn-secondary'}" data-loc="coche">
                            🚗 En Tránsito / Coche
                        </button>
                        <button class="btn btn-sm ${this.selectedLocation === 'trabajo' ? 'btn-primary' : 'btn-secondary'}" data-loc="trabajo">
                            🏢 En el Trabajo / Exterior
                        </button>
                    </div>
                </div>

                <!-- LA MATRIZ DE 4 COLUMNAS (16 AMENAZAS) -->
                <div style="margin-bottom:2rem;">
                    <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">
                        SELECCIONA LA AMENAZA EN LA MATRIZ TÁCTICA (4 COLUMNAS UNIVERSALES):
                    </label>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:1rem;">
                        ${THREAT_COLUMNS.map(col => {
                            const threatsInCol = PHASE_0_THREATS.filter(t => t.columnId === col.id);
                            return `
                                <div style="background:rgba(16,29,41,0.6);border:1px solid ${col.borderColor};border-radius:var(--radius-sm);padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;">
                                    
                                    <!-- Cabecera de Columna -->
                                    <div style="padding-bottom:0.4rem;border-bottom:1px solid ${col.borderColor};display:flex;align-items:center;justify-content:space-between;">
                                        <div style="display:flex;align-items:center;gap:6px;">
                                            <span style="font-size:1.1rem;">${col.icon}</span>
                                            <div>
                                                <div style="font-family:var(--font-display);font-size:12px;font-weight:700;color:${col.color};text-transform:uppercase;">
                                                    ${col.shortTitle}
                                                </div>
                                                <div style="font-size:9px;color:var(--text-dim);font-family:var(--font-mono);">
                                                    ${col.subtitle}
                                                </div>
                                            </div>
                                        </div>
                                        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);">4 Catástrofes</span>
                                    </div>

                                    <!-- Lista de 4 Amenazas en esta Columna -->
                                    <div style="display:flex;flex-direction:column;gap:0.4rem;">
                                        ${threatsInCol.map(t => {
                                            const isSelected = t.id === this.selectedThreatId;
                                            return `
                                                <button class="threat-btn-card" data-threat-id="${t.id}" style="
                                                    display:flex;
                                                    align-items:center;
                                                    gap:8px;
                                                    padding:0.5rem 0.6rem;
                                                    text-align:left;
                                                    border-radius:4px;
                                                    border:1px solid ${isSelected ? col.color : 'rgba(255,255,255,0.06)'};
                                                    background:${isSelected ? col.accentBg : 'rgba(10,17,24,0.7)'};
                                                    color:#fff;
                                                    cursor:pointer;
                                                    transition:all 0.15s ease;
                                                    box-shadow:${isSelected ? `0 0 10px ${col.color}40` : 'none'};
                                                ">
                                                    <span style="font-size:1.15rem;flex-shrink:0;">${t.icon}</span>
                                                    <div style="flex-grow:1;overflow:hidden;">
                                                        <div style="font-family:var(--font-mono);font-size:9px;color:${isSelected ? col.color : 'var(--text-dim)'};">${t.code}</div>
                                                        <div style="font-size:12px;font-weight:${isSelected ? '700' : '500'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                            ${t.title}
                                                        </div>
                                                    </div>
                                                    <span style="font-size:10px;color:${isSelected ? col.color : 'var(--text-dim)'};">▶</span>
                                                </button>
                                            `;
                                        }).join('')}
                                    </div>

                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- ========================================================= -->
                <!-- PANEL ACTIVO DEL PROTOCOLO DE 90 SEGUNDOS SELECCIONADO -->
                <!-- ========================================================= -->
                <div style="background:#0b131c;border:2px solid ${currentColumn.color};border-radius:var(--radius-md);padding:1.5rem;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
                    
                    <!-- Fila Superior de la Amenaza Activa -->
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;">
                        <div>
                            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                                <span class="badge-tactical" style="color:${currentColumn.color};border-color:${currentColumn.borderColor};">
                                    ${currentColumn.icon} COLUMNA: ${currentColumn.title.toUpperCase()}
                                </span>
                                <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
                                    CÓDIGO OFICIAL: ${threat.code}
                                </span>
                            </div>
                            <h3 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0;text-transform:uppercase;">
                                ${threat.icon} ${threat.title}
                            </h3>
                            <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:4px;">
                                <strong>Vector Físico:</strong> ${threat.vector}
                            </div>
                        </div>

                        <!-- Pill Inapelable: QUEDARSE vs SALIR -->
                        <div style="background:${decisionBadgeBg};border:2px solid ${decisionBadgeBorder};padding:8px 16px;border-radius:var(--radius-sm);text-align:right;">
                            <span style="font-family:var(--font-mono);font-size:10px;color:${decisionBadgeText};display:block;text-transform:uppercase;letter-spacing:1px;">
                                DECISIÓN INAPELABLE 90s:
                            </span>
                            <span style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:${decisionBadgeBorder};text-transform:uppercase;">
                                ${threat.defaultDecision}
                            </span>
                        </div>
                    </div>

                    <!-- CRONÓMETRO Y BARRA DE PROGRESO DE LA SECUENCIA -->
                    <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1.5rem;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:0.5rem;">
                            <span id="phase0-current-window-label" style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--action-yellow);border:1px solid var(--action-yellow);padding:2px 8px;border-radius:var(--radius-pill);">
                                VENTANA 1: 0 - 10s · REFLEJO BIOMECÁNICO
                            </span>
                            <div style="display:flex;gap:0.5rem;">
                                <button id="phase0-btn-start" class="btn btn-sm btn-primary" style="font-size:11px;padding:4px 10px;">
                                    ▶ Iniciar Simulación 90s
                                </button>
                                <button id="phase0-btn-pause" class="btn btn-sm btn-secondary" style="font-size:11px;padding:4px 10px;display:none;">
                                    ⏸ Pausar
                                </button>
                                <button id="phase0-btn-reset" class="btn btn-sm btn-secondary" style="font-size:11px;padding:4px 10px;">
                                    ↺ Reiniciar
                                </button>
                            </div>
                        </div>

                        <!-- Barra Gráfica de 3 Fases -->
                        <div style="width:100%;height:10px;background:#05090e;border-radius:5px;overflow:hidden;position:relative;margin-top:8px;">
                            <div id="phase0-progress-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #ef4444 0%, #facc15 50%, #22c55e 100%);transition:width 0.2s linear;"></div>
                        </div>
                        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-top:4px;">
                            <span>0s (Reflejo)</span>
                            <span style="margin-left:10%;">10s (Triaje)</span>
                            <span style="margin-right:25%;">60s (Asegurar)</span>
                            <span>90s (Fin Fase 0)</span>
                        </div>
                    </div>

                    <!-- LAS 3 VENTANAS TEMPORALES DESPLEGADAS -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-bottom:1.5rem;">
                        
                        <!-- VENTANA 1: 0 a 10s -->
                        <div id="card-window-t0_10" style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.15rem;transition:all 0.2s ease;">
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:0.5rem;">
                                <span style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid #ef4444;font-family:var(--font-mono);font-size:10px;padding:2px 6px;border-radius:2px;font-weight:700;">
                                    T+0 A T+10s
                                </span>
                                <h4 style="font-family:var(--font-display);font-size:var(--text-base);color:#fff;margin:0;text-transform:uppercase;">
                                    Reflejo Físico Inmediato
                                </h4>
                            </div>
                            <p style="font-size:var(--text-xs);color:#fff;font-weight:600;margin-bottom:0.5rem;line-height:1.4;">
                                ${threat.windows.t0_10.action}
                            </p>
                            <div style="font-size:11px;color:var(--text-muted);margin-bottom:0.5rem;background:#060b10;padding:6px;border-radius:4px;">
                                <strong>Postura:</strong> ${threat.windows.t0_10.posture}
                            </div>
                            <div style="font-size:11px;color:var(--action-yellow);">
                                <strong>En tu ubicación (${this.selectedLocation.toUpperCase()}):</strong> ${threat.windows.t0_10.byLocation[this.selectedLocation]}
                            </div>
                        </div>

                        <!-- VENTANA 2: 10 a 60s -->
                        <div id="card-window-t10_60" style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.15rem;transition:all 0.2s ease;">
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:0.5rem;">
                                <span style="background:rgba(250,204,21,0.2);color:#facc15;border:1px solid #facc15;font-family:var(--font-mono);font-size:10px;padding:2px 6px;border-radius:2px;font-weight:700;">
                                    T+10 A T+60s
                                </span>
                                <h4 style="font-family:var(--font-display);font-size:var(--text-base);color:#fff;margin:0;text-transform:uppercase;">
                                    Triaje de Decisión Crítica
                                </h4>
                            </div>
                            <p style="font-size:var(--text-xs);color:#fff;font-weight:600;margin-bottom:0.5rem;line-height:1.4;">
                                ${threat.windows.t10_60.action}
                            </p>
                            <div style="font-size:11px;color:var(--text-muted);margin-bottom:0.5rem;background:#060b10;padding:6px;border-radius:4px;">
                                <strong>Física / Justificación:</strong> ${threat.windows.t10_60.rationale}
                            </div>
                            <div style="font-size:11px;color:var(--action-yellow);">
                                <strong>En tu ubicación (${this.selectedLocation.toUpperCase()}):</strong> ${threat.windows.t10_60.byLocation[this.selectedLocation]}
                            </div>
                        </div>

                        <!-- VENTANA 3: 60 a 90s -->
                        <div id="card-window-t60_90" style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.15rem;transition:all 0.2s ease;">
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:0.5rem;">
                                <span style="background:rgba(34,197,94,0.2);color:#22c55e;border:1px solid #22c55e;font-family:var(--font-mono);font-size:10px;padding:2px 6px;border-radius:2px;font-weight:700;">
                                    T+60 A T+90s
                                </span>
                                <h4 style="font-family:var(--font-display);font-size:var(--text-base);color:#fff;margin:0;text-transform:uppercase;">
                                    Aseguramiento y Enlace
                                </h4>
                            </div>
                            <p style="font-size:var(--text-xs);color:#fff;font-weight:600;margin-bottom:0.5rem;line-height:1.4;">
                                ${threat.windows.t60_90.action}
                            </p>
                            <div style="font-size:11px;color:var(--text-muted);margin-bottom:0.5rem;background:#060b10;padding:6px;border-radius:4px;">
                                <strong>Preparación de Enlace:</strong> ${threat.windows.t60_90.preparation}
                            </div>
                            <div style="font-size:11px;color:var(--status-green);">
                                <strong>Destino a Fase 1:</strong> ${threat.windows.t60_90.bridgePhase1}
                            </div>
                        </div>

                    </div>

                    <!-- ERRORES MORTALES (QUÉ NO HACER EN LOS PRIMEROS 90s) -->
                    <div style="background:rgba(239, 68, 68, 0.08);border:1px solid rgba(239, 68, 68, 0.35);border-radius:var(--radius-sm);padding:1.15rem;margin-bottom:1.5rem;">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;">
                            <span style="font-size:1.2rem;">⚠️</span>
                            <h4 style="font-family:var(--font-display);font-size:var(--text-base);color:#ef4444;margin:0;text-transform:uppercase;">
                                Errores Mortales que Cuestan la Vida en los Primeros 90 Segundos:
                            </h4>
                        </div>
                        <ul style="margin:0;padding-left:1.25rem;font-size:var(--text-xs);color:#fca5a5;line-height:1.6;">
                            ${threat.fatalMistakes.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- PUENTE TÁCTICO INAPELABLE A LA FASE 1 (72 HORAS) -->
                    <div style="background:linear-gradient(180deg, rgba(28,48,68,0.8) 0%, rgba(16,29,41,0.95) 100%);border:1px solid var(--border-strong);border-radius:var(--radius-sm);padding:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
                        <div>
                            <span class="badge-tactical" style="color:var(--action-yellow);">PUENTE OPERATIVO DE FASE</span>
                            <div style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin-top:2px;text-transform:uppercase;">
                                Has superado el impacto inicial de los 90 segundos
                            </div>
                            <div style="font-size:12px;color:var(--text-muted);">
                                ${isEvac 
                                    ? 'La decisión táctica fue EVACUACIÓN. Se activa el cálculo de peso ergonómico y checklist de tu Mochila de 72 Horas.' 
                                    : 'La decisión táctica fue CONFINAMIENTO. Se activa la Calculadora Hídrica de 72 Horas y monitoreo de blindaje.'}
                            </div>
                        </div>

                        <button id="phase0-btn-bridge" class="btn btn-primary" data-bridge-target="${isEvac ? 'bag' : 'water'}" style="padding:0.75rem 1.5rem;font-size:var(--text-sm);font-weight:700;">
                            🚀 ACTIVAR FASE 1: PRIMERAS 72 HORAS ANTE ESTA AMENAZA →
                        </button>
                    </div>

                </div>

            </div>
        `;

        this.bindEvents();
        this.updateTimerDisplay();
        this.updateTimerControls();
    }

    bindEvents() {
        // Eventos de selección de catástrofe en la matriz
        this.container.querySelectorAll('.threat-btn-card').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-threat-id');
                if (id) this.selectThreat(id);
            });
        });

        // Eventos de cambio de ubicación
        this.container.querySelectorAll('#phase0-location-group button').forEach(btn => {
            btn.addEventListener('click', () => {
                const loc = btn.getAttribute('data-loc');
                if (loc) this.setLocation(loc);
            });
        });

        // Controles de cronómetro
        const btnStart = document.getElementById('phase0-btn-start');
        const btnPause = document.getElementById('phase0-btn-pause');
        const btnReset = document.getElementById('phase0-btn-reset');

        if (btnStart) btnStart.addEventListener('click', () => this.startTimer());
        if (btnPause) btnPause.addEventListener('click', () => this.pauseTimer());
        if (btnReset) btnReset.addEventListener('click', () => this.resetTimer());

        // Botón puente a Fase 1
        const btnBridge = document.getElementById('phase0-btn-bridge');
        if (btnBridge) {
            btnBridge.addEventListener('click', () => {
                const targetView = btnBridge.getAttribute('data-bridge-target') || 'bag';
                const tab = document.querySelector(`.app-nav-tab[data-view="${targetView}"]`);
                if (tab) {
                    tab.click();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }
}
