/**
 * ============================================================================
 * MOTOR REACTIVO DE HIDRATACIÓN Y AUTONOMÍA HÍDRICA
 * water-engine.js · Cálculos biológicos de consumo, garrafas y potabilización
 * ============================================================================
 */

import { CALCULATORS } from '../data/calculators.js';
import { StorageEngine } from './storage.js';

export class WaterEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = StorageEngine.get('water_calc_state', {
            members: [
                { role: 'adulto', name: 'Adulto 1' },
                { role: 'adulto', name: 'Adulto 2' },
                { role: 'nino', name: 'Menor 1' }
            ],
            days: 14,
            climate: 'templado'
        });
        this.render();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        StorageEngine.set('water_calc_state', this.state);
        this.updateCalculations();
    }

    addMember(role = 'adulto') {
        const count = this.state.members.filter(m => m.role === role).length + 1;
        const name = `${role.charAt(0).toUpperCase() + role.slice(1)} ${count}`;
        this.state.members.push({ role, name });
        this.setState({ members: this.state.members });
        this.render();
    }

    removeMember(index) {
        if (this.state.members.length <= 1) return;
        this.state.members.splice(index, 1);
        this.setState({ members: this.state.members });
        this.render();
    }

    getResults() {
        return CALCULATORS.water.calculateFamilyQuota(
            this.state.members,
            this.state.days,
            this.state.climate
        );
    }

    render() {
        if (!this.container) return;
        const res = this.getResults();

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;">
                    <div>
                        <span class="badge-tactical" style="color:var(--text-metallic);">💧 TELEMETRÍA HÍDRICA FAMILIAR</span>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;">
                            Calculadora de Racionamiento y Reserva
                        </h2>
                    </div>
                    <div class="status-indicator">
                        <span class="status-dot status-dot-green"></span>
                        <span style="color:var(--status-green);">ESTÁNDAR OMS ACTIVO</span>
                    </div>
                </div>

                <!-- Controles Principales -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.5rem;margin-bottom:2rem;">
                    <!-- Selector de Días de Confinamiento -->
                    <div style="background:var(--bg-surface-elevated);padding:1.25rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.5rem;text-transform:uppercase;">
                            📅 Días de Confinamiento Estricto: <strong id="days-val" style="color:#fff;font-size:1.1rem;">${this.state.days} días</strong>
                        </label>
                        <input type="range" id="water-days-range" min="3" max="90" step="1" value="${this.state.days}" style="width:100%;accent-color:var(--action-yellow);">
                        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-top:4px;">
                            <span>72 Horas</span>
                            <span>14 Días (Mínimo Nuclear)</span>
                            <span>30 Días</span>
                            <span>90 Días</span>
                        </div>
                    </div>

                    <!-- Selector de Clima / Estrés Térmico -->
                    <div style="background:var(--bg-surface-elevated);padding:1.25rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.5rem;text-transform:uppercase;">
                            🌡️ Estrés Térmico del Refugio:
                        </label>
                        <select id="water-climate-select" style="width:100%;padding:0.6rem;background:#0b131c;border:1px solid var(--border-subtle);color:#fff;border-radius:var(--radius-xs);font-family:var(--font-body);">
                            <option value="templado" ${this.state.climate === 'templado' ? 'selected' : ''}>Templado (18°C - 24°C) · Factor 1.0x</option>
                            <option value="calor_moderado" ${this.state.climate === 'calor_moderado' ? 'selected' : ''}>Calor Moderado (25°C - 32°C) · Factor 1.25x</option>
                            <option value="calor_extremo" ${this.state.climate === 'calor_extremo' ? 'selected' : ''}>Calor Extremo / Sótano sin ventilación (>33°C) · Factor 1.55x</option>
                        </select>
                    </div>
                </div>

                <!-- Integrantes de la Familia -->
                <div style="margin-bottom:2rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <span style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);text-transform:uppercase;">
                            👥 Integrantes en el Refugio (${this.state.members.length})
                        </span>
                        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                            <button class="btn btn-sm btn-secondary" id="add-adult-btn">+ Adulto</button>
                            <button class="btn btn-sm btn-secondary" id="add-child-btn">+ Niño</button>
                            <button class="btn btn-sm btn-secondary" id="add-elder-btn">+ Mayor/Crónico</button>
                            <button class="btn btn-sm btn-secondary" id="add-pet-btn">+ Mascota</button>
                        </div>
                    </div>
                    
                    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;" id="members-list">
                        ${this.state.members.map((m, idx) => `
                            <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(21,38,54,0.8);border:1px solid var(--border-subtle);padding:6px 12px;border-radius:var(--radius-sm);font-size:var(--text-sm);">
                                <span>${m.role === 'adulto' ? '👤' : m.role === 'nino' ? '🧒' : m.role === 'mayor' ? '🧓' : '🐾'}</span>
                                <span style="color:#fff;font-weight:600;">${m.name}</span>
                                <span style="color:var(--text-dim);font-size:11px;">(${m.role})</span>
                                <button data-remove="${idx}" style="background:transparent;border:none;color:#ef4444;cursor:pointer;font-weight:bold;margin-left:4px;">&times;</button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Resultados de Telemetría Hídrica -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;background:#0b131c;padding:1.5rem;border-radius:var(--radius-md);border:1px solid var(--border-strong);">
                    <div>
                        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);text-transform:uppercase;">VOLUMEN TOTAL OBLIGATORIO</span>
                        <div id="res-total-litres" style="font-family:var(--font-display);font-size:var(--text-3xl);color:var(--action-yellow);font-weight:700;">
                            ${res.grandTotalLitres} <span style="font-size:var(--text-base);color:var(--text-metallic);">Litros</span>
                        </div>
                        <span style="font-size:12px;color:var(--text-muted);">${res.dailyTotalLitres} L / día familiar</span>
                    </div>

                    <div>
                        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);text-transform:uppercase;">EQUIVALENCIA EN GARRAFAS</span>
                        <div id="res-jugs" style="font-family:var(--font-display);font-size:var(--text-3xl);color:#fff;font-weight:700;">
                            ${res.jugs5L} <span style="font-size:var(--text-base);color:var(--text-metallic);">de 5 Litros</span>
                        </div>
                        <span style="font-size:12px;color:var(--text-muted);">(o ${res.jugs8L} botellones de 8 Litros)</span>
                    </div>

                    <div>
                        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);text-transform:uppercase;">DESINFECCIÓN QUÍMICA (LEJÍA 5%)</span>
                        <div id="res-bleach" style="font-family:var(--font-display);font-size:var(--text-3xl);color:var(--status-green);font-weight:700;">
                            ${res.disinfection.bleachDropsTotal} <span style="font-size:var(--text-base);color:var(--text-metallic);">gotas</span>
                        </div>
                        <span style="font-size:12px;color:var(--text-muted);">(Equivale a ${res.disinfection.bleachMlTotal} ml de lejía común sin perfume)</span>
                    </div>
                </div>

                <!-- Protocolo de Potabilización -->
                <div style="margin-top:1.5rem;background:rgba(16,29,41,0.5);border-left:3px solid var(--action-yellow);padding:1rem 1.25rem;border-radius:var(--radius-xs);">
                    <h4 style="font-family:var(--font-display);color:#fff;margin:0 0 0.5rem 0;text-transform:uppercase;font-size:var(--text-base);">
                        🛡️ Regla de Oro de Potabilización de Emergencia
                    </h4>
                    <p style="font-size:var(--text-sm);color:var(--text-muted);margin:0;line-height:1.5;">
                        Aplica <strong>2 gotas de lejía pura sin detergente ni perfumes por cada litro de agua clara</strong> (4 gotas si el agua presenta ligera turbidez). Agita y deja reposar obligatoriamente <strong>30 minutos</strong> antes de ingerir. Debe percibirse un olor tenue a cloro; si no huele, repite la dosis y espera otros 15 minutos.
                    </p>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    updateCalculations() {
        const res = this.getResults();
        const daysLabel = document.getElementById('days-val');
        const resLitres = document.getElementById('res-total-litres');
        const resJugs = document.getElementById('res-jugs');
        const resBleach = document.getElementById('res-bleach');

        if (daysLabel) daysLabel.textContent = `${this.state.days} días`;
        if (resLitres) resLitres.innerHTML = `${res.grandTotalLitres} <span style="font-size:var(--text-base);color:var(--text-metallic);">Litros</span>`;
        if (resJugs) resJugs.innerHTML = `${res.jugs5L} <span style="font-size:var(--text-base);color:var(--text-metallic);">de 5 Litros</span>`;
        if (resBleach) resBleach.innerHTML = `${res.disinfection.bleachDropsTotal} <span style="font-size:var(--text-base);color:var(--text-metallic);">gotas</span>`;
    }

    bindEvents() {
        const range = document.getElementById('water-days-range');
        if (range) {
            range.addEventListener('input', (e) => {
                this.setState({ days: parseInt(e.target.value, 10) });
            });
        }

        const climateSelect = document.getElementById('water-climate-select');
        if (climateSelect) {
            climateSelect.addEventListener('change', (e) => {
                this.setState({ climate: e.target.value });
            });
        }

        const addAdult = document.getElementById('add-adult-btn');
        if (addAdult) addAdult.addEventListener('click', () => this.addMember('adulto'));

        const addChild = document.getElementById('add-child-btn');
        if (addChild) addChild.addEventListener('click', () => this.addMember('nino'));

        const addElder = document.getElementById('add-elder-btn');
        if (addElder) addElder.addEventListener('click', () => this.addMember('mayor'));

        const addPet = document.getElementById('add-pet-btn');
        if (addPet) addPet.addEventListener('click', () => this.addMember('mascota'));

        const list = document.getElementById('members-list');
        if (list) {
            list.addEventListener('click', (e) => {
                if (e.target.dataset.remove) {
                    this.removeMember(parseInt(e.target.dataset.remove, 10));
                }
            });
        }
    }
}
