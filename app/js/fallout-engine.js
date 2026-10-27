/**
 * ============================================================================
 * MOTOR DE FÍSICA NUCLEAR Y SIMULADOR DE BLINDAJE RADIOLÓGICO
 * fallout-engine.js · Ley 7/10, decaimiento del fallout y capas de hemirreducción
 * ============================================================================
 */

import { CALCULATORS } from '../data/calculators.js';

export class FalloutEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = {
            initialDose: 100, // R/h o mSv/h a H+1
            hoursElapsed: 7,
            material: 'concreto',
            thicknessCm: 30
        };
        this.render();
    }

    render() {
        if (!this.container) return;
        const decayRes = CALCULATORS.nuclear.calculateDecay(this.state.initialDose, this.state.hoursElapsed);
        const shieldRes = CALCULATORS.nuclear.calculateShielding(this.state.material, this.state.thicknessCm);

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;">
                    <div>
                        <span class="badge-tactical" style="color:#ef4444;">☢️ FÍSICA Y BALÍSTICA RADIOLÓGICA</span>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;">
                            Simulador de Decaimiento (Ley 7/10) y Blindaje
                        </h2>
                    </div>
                    <div class="status-indicator">
                        <span class="status-dot status-dot-green"></span>
                        <span style="color:var(--text-metallic);">ESTÁNDAR OAK RIDGE / FEMA</span>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:2rem;">
                    <!-- CUADRANTE 1: DECAIMIENTO TEMPORAL DEL FALLOUT -->
                    <div style="background:var(--bg-surface-elevated);padding:1.5rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <h3 style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--action-yellow);margin-top:0;text-transform:uppercase;">
                            1. Tiempo Transcurrido vs Radiactividad
                        </h3>
                        <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:1.25rem;">
                            Por cada incremento de 7x en el tiempo, la radiación se reduce en un factor de 10 (cae un 90%).
                        </p>

                        <div style="margin-bottom:1rem;">
                            <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                                DOSIS INICIAL A H+1 (R/h o mSv/h): <strong id="initial-dose-val" style="color:#fff;">${this.state.initialDose}</strong>
                            </label>
                            <input type="range" id="initial-dose-range" min="10" max="1000" step="10" value="${this.state.initialDose}" style="width:100%;accent-color:#ef4444;">
                        </div>

                        <div style="margin-bottom:1.5rem;">
                            <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                                TIEMPO TRASCURRIDO: <strong id="hours-val" style="color:var(--action-yellow);font-size:1.1rem;">${this.state.hoursElapsed} horas</strong>
                            </label>
                            <input type="range" id="hours-range" min="1" max="336" step="1" value="${this.state.hoursElapsed}" style="width:100%;accent-color:var(--action-yellow);">
                            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-top:4px;">
                                <span>H+1h (100%)</span>
                                <span>H+7h (10%)</span>
                                <span>H+49h (1%)</span>
                                <span>H+14d (0.1%)</span>
                            </div>
                        </div>

                        <!-- Telemetría de Decaimiento -->
                        <div style="background:#0b131c;border:1px solid var(--border-subtle);padding:1rem;border-radius:var(--radius-xs);">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                                <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">RADIACIÓN REMANENTE:</span>
                                <span id="decay-percentage" style="font-family:var(--font-mono);font-size:12px;font-weight:bold;color:var(--text-metallic);">${decayRes.percentage}%</span>
                            </div>
                            <div id="decay-dose-val" style="font-family:var(--font-display);font-size:var(--text-3xl);font-weight:700;color:${decayRes.doseRate > 10 ? '#ef4444' : decayRes.doseRate > 1 ? '#f59e0b' : '#22c55e'};">
                                ${decayRes.doseRate} <span style="font-size:var(--text-base);color:var(--text-muted);">R/h</span>
                            </div>
                            <div id="decay-verdict" style="margin-top:0.5rem;font-size:12px;color:#fff;background:rgba(255,255,255,0.05);padding:6px 10px;border-radius:2px;">
                                <strong>Nivel:</strong> ${decayRes.riskLevel} · ${decayRes.recommendation}
                            </div>
                        </div>
                    </div>

                    <!-- CUADRANTE 2: FACTOR DE PROTECCIÓN DE BLINDAJE (PF) -->
                    <div style="background:var(--bg-surface-elevated);padding:1.5rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <h3 style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--text-metallic);margin-top:0;text-transform:uppercase;">
                            2. Atenuación por Masa de la Vivienda
                        </h3>
                        <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:1.25rem;">
                            La radiación gamma solo se detiene con densidad física y masa entre tú y las paredes exteriores.
                        </p>

                        <div style="margin-bottom:1rem;">
                            <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                                MATERIAL DEL MURO:
                            </label>
                            <select id="material-select" style="width:100%;padding:0.6rem;background:#0b131c;border:1px solid var(--border-subtle);color:#fff;border-radius:var(--radius-xs);">
                                <option value="concreto" ${this.state.material === 'concreto' ? 'selected' : ''}>Hormigón Armado / Concreto (HVL = 6.0 cm)</option>
                                <option value="ladrillo" ${this.state.material === 'ladrillo' ? 'selected' : ''}>Ladrillo Macizo (HVL = 7.5 cm)</option>
                                <option value="tierra" ${this.state.material === 'tierra' ? 'selected' : ''}>Tierra / Arena Compactada (HVL = 9.0 cm)</option>
                                <option value="plomo" ${this.state.material === 'plomo' ? 'selected' : ''}>Plomo Sólido (HVL = 1.3 cm)</option>
                                <option value="agua" ${this.state.material === 'agua' ? 'selected' : ''}>Agua en Depósito (HVL = 18.0 cm)</option>
                                <option value="madera" ${this.state.material === 'madera' ? 'selected' : ''}>Madera / Tableros (HVL = 28.0 cm)</option>
                            </select>
                        </div>

                        <div style="margin-bottom:1.5rem;">
                            <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                                ESPESOR DEL MURO: <strong id="thickness-val" style="color:#fff;">${this.state.thicknessCm} cm</strong>
                            </label>
                            <input type="range" id="thickness-range" min="2" max="120" step="1" value="${this.state.thicknessCm}" style="width:100%;accent-color:var(--text-metallic);">
                        </div>

                        <!-- Telemetría de Blindaje -->
                        <div style="background:#0b131c;border:1px solid var(--border-subtle);padding:1rem;border-radius:var(--radius-xs);">
                            <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-family:var(--font-mono);font-size:11px;">
                                <span style="color:var(--text-dim);">FACTOR DE PROTECCIÓN:</span>
                                <span style="color:var(--status-green);font-weight:bold;">${shieldRes.radiationBlockedPercent}% BLOQUEADO</span>
                            </div>
                            <div id="pf-val" style="font-family:var(--font-display);font-size:var(--text-3xl);font-weight:700;color:var(--text-metallic);">
                                PF ${shieldRes.protectionFactor}
                            </div>
                            <div id="pf-rating" style="margin-top:0.5rem;font-size:12px;color:#fff;background:rgba(125,211,252,0.1);padding:6px 10px;border-radius:2px;border-left:2px solid var(--text-metallic);">
                                ${shieldRes.rating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const doseRange = document.getElementById('initial-dose-range');
        if (doseRange) {
            doseRange.addEventListener('input', (e) => {
                this.state.initialDose = parseFloat(e.target.value);
                this.updateDecay();
            });
        }

        const hoursRange = document.getElementById('hours-range');
        if (hoursRange) {
            hoursRange.addEventListener('input', (e) => {
                this.state.hoursElapsed = parseInt(e.target.value, 10);
                this.updateDecay();
            });
        }

        const matSelect = document.getElementById('material-select');
        if (matSelect) {
            matSelect.addEventListener('change', (e) => {
                this.state.material = e.target.value;
                this.updateShield();
            });
        }

        const thickRange = document.getElementById('thickness-range');
        if (thickRange) {
            thickRange.addEventListener('input', (e) => {
                this.state.thicknessCm = parseInt(e.target.value, 10);
                this.updateShield();
            });
        }
    }

    updateDecay() {
        const decayRes = CALCULATORS.nuclear.calculateDecay(this.state.initialDose, this.state.hoursElapsed);
        const doseLabel = document.getElementById('initial-dose-val');
        const hoursLabel = document.getElementById('hours-val');
        const decayPct = document.getElementById('decay-percentage');
        const doseVal = document.getElementById('decay-dose-val');
        const verdict = document.getElementById('decay-verdict');

        if (doseLabel) doseLabel.textContent = this.state.initialDose;
        if (hoursLabel) hoursLabel.textContent = `${this.state.hoursElapsed} horas`;
        if (decayPct) decayPct.textContent = `${decayRes.percentage}%`;
        if (doseVal) {
            doseVal.innerHTML = `${decayRes.doseRate} <span style="font-size:var(--text-base);color:var(--text-muted);">R/h</span>`;
            doseVal.style.color = decayRes.doseRate > 10 ? '#ef4444' : decayRes.doseRate > 1 ? '#f59e0b' : '#22c55e';
        }
        if (verdict) {
            verdict.innerHTML = `<strong>Nivel:</strong> ${decayRes.riskLevel} · ${decayRes.recommendation}`;
        }
    }

    updateShield() {
        const shieldRes = CALCULATORS.nuclear.calculateShielding(this.state.material, this.state.thicknessCm);
        const thickLabel = document.getElementById('thickness-val');
        const pfVal = document.getElementById('pf-val');
        const pfRating = document.getElementById('pf-rating');

        if (thickLabel) thickLabel.textContent = `${this.state.thicknessCm} cm`;
        if (pfVal) pfVal.textContent = `PF ${shieldRes.protectionFactor}`;
        if (pfRating) pfRating.textContent = shieldRes.rating;
    }
}
