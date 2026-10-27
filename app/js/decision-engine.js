/**
 * ============================================================================
 * MOTOR HEURÍSTICO DE DECISIÓN EN CRISIS (TRIAJE DE LOS PRIMEROS 90 SEGUNDOS)
 * decision-engine.js · Algoritmo de triaje: ¿Quedarse o Salir?
 * ============================================================================
 */

import { SCENARIOS } from '../data/scenarios.js';

export class DecisionEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedEventId = 'f40-nuclear';
        this.userLocation = 'casa';
        this.render();
    }

    setEvent(eventId) {
        this.selectedEventId = eventId;
        this.render();
    }

    setLocation(loc) {
        this.userLocation = loc;
        this.render();
    }

    getCurrentScenario() {
        return SCENARIOS.find(s => s.id === this.selectedEventId) || SCENARIOS[0];
    }

    render() {
        if (!this.container) return;
        const scenario = this.getCurrentScenario();

        // Determinar modo por defecto
        const isEvacuation = ['f31-sismo', 'f32-inundacion', 'f33-incendio-domestico', 'f34-incendio-forestal'].includes(scenario.id);
        const defaultMode = isEvacuation ? 'EVACUACIÓN INMEDIATA' : 'CONFINAMIENTO ESTRICTO (REFUGIO)';
        const modeColor = isEvacuation ? '#ef4444' : '#22c55e';

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <span class="badge-tactical" style="color:var(--action-yellow);">🧭 TRIAJE DE LOS PRIMEROS 90 SEGUNDOS</span>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;">
                            Árbol de Decisión Táctica: ¿Quedarse o Salir?
                        </h2>
                    </div>
                    <div style="background:${modeColor}22;border:1px solid ${modeColor};padding:6px 14px;border-radius:var(--radius-pill);font-family:var(--font-mono);font-size:12px;font-weight:700;color:${modeColor};">
                        ${defaultMode}
                    </div>
                </div>

                <!-- Selector de Evento Crítico -->
                <div style="margin-bottom:2rem;">
                    <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.75rem;text-transform:uppercase;">
                        1. Selecciona la Amenaza Activa:
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:0.5rem;">
                        ${SCENARIOS.map(s => `
                            <button class="btn btn-sm ${s.id === this.selectedEventId ? 'btn-primary' : 'btn-secondary'}" data-scenario-id="${s.id}" style="justify-content:flex-start;text-align:left;padding:0.6rem 0.8rem;">
                                <span style="font-size:1.1rem;margin-right:4px;">${s.icon}</span>
                                <span style="font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.title}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Selector de Ubicación del Usuario -->
                <div style="background:var(--bg-surface-elevated);padding:1rem 1.25rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);margin-bottom:2rem;">
                    <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.5rem;text-transform:uppercase;">
                        2. ¿Dónde te encuentras en este momento?
                    </label>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                        <button class="btn btn-sm ${this.userLocation === 'casa' ? 'btn-primary' : 'btn-secondary'}" data-loc="casa">🏠 En Casa</button>
                        <button class="btn btn-sm ${this.userLocation === 'trabajo' ? 'btn-primary' : 'btn-secondary'}" data-loc="trabajo">🏢 En la Oficina / Trabajo</button>
                        <button class="btn btn-sm ${this.userLocation === 'coche' ? 'btn-primary' : 'btn-secondary'}" data-loc="coche">🚗 En Tránsito / Vehículo</button>
                        <button class="btn btn-sm ${this.userLocation === 'calle' ? 'btn-primary' : 'btn-secondary'}" data-loc="calle">🚶 Al Aire Libre / Calle</button>
                    </div>
                </div>

                <!-- PROTOCOLO DESPLEGADO DE LA FICHA -->
                <div style="background:#0b131c;border:1px solid var(--border-strong);padding:1.5rem;border-radius:var(--radius-md);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid var(--border-subtle);padding-bottom:0.75rem;">
                        <h3 style="font-family:var(--font-display);font-size:var(--text-xl);color:#fff;margin:0;text-transform:uppercase;">
                            ${scenario.icon} ${scenario.card} · ${scenario.title}
                        </h3>
                        <span class="badge-tactical" style="color:var(--text-metallic);">${scenario.category}</span>
                    </div>

                    <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:1.5rem;line-height:1.5;">
                        ${scenario.description}
                    </p>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.5rem;">
                        <!-- QUÉ HACER YA (PRIMEROS 90 SEGUNDOS) -->
                        <div style="background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.3);padding:1.25rem;border-radius:var(--radius-sm);border-top:3px solid var(--status-green);">
                            <h4 style="font-family:var(--font-display);color:var(--status-green);margin:0 0 0.75rem 0;text-transform:uppercase;font-size:var(--text-base);">
                                ✅ ACCIONES INMEDIATAS (QUÉ HACER YA)
                            </h4>
                            <ul style="font-size:var(--text-xs);color:#fff;line-height:1.5;margin:0;padding-left:1.25rem;">
                                ${scenario.doNow.map(d => `<li style="margin-bottom:0.5rem;">${d}</li>`).join('')}
                            </ul>
                        </div>

                        <!-- QUÉ NO HACER (ERRORES MORTALES) -->
                        <div style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.3);padding:1.25rem;border-radius:var(--radius-sm);border-top:3px solid #ef4444;">
                            <h4 style="font-family:var(--font-display);color:#ef4444;margin:0 0 0.75rem 0;text-transform:uppercase;font-size:var(--text-base);">
                                ❌ QUÉ NO HACER (ERRORES FATALES)
                            </h4>
                            <ul style="font-size:var(--text-xs);color:#fff;line-height:1.5;margin:0;padding-left:1.25rem;">
                                ${scenario.doNotDo.map(d => `<li style="margin-bottom:0.5rem;">${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- ACCIONES POSTERIORES Y AYUDA -->
                    <div style="margin-top:1.5rem;background:rgba(16,29,41,0.6);border:1px solid var(--border-subtle);padding:1rem 1.25rem;border-radius:var(--radius-xs);">
                        <strong style="color:var(--text-metallic);font-size:var(--text-xs);text-transform:uppercase;display:block;margin-bottom:0.25rem;">
                            🏥 Criterio de Búsqueda de Ayuda Médica / Evacuación Táctica:
                        </strong>
                        <p style="font-size:var(--text-xs);color:var(--text-muted);margin:0;line-height:1.4;">
                            ${scenario.seekHelp}
                        </p>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const scenarioBtns = this.container.querySelectorAll('[data-scenario-id]');
        scenarioBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setEvent(e.currentTarget.dataset.scenarioId);
            });
        });

        const locBtns = this.container.querySelectorAll('[data-loc]');
        locBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setLocation(e.currentTarget.dataset.loc);
            });
        });
    }
}
