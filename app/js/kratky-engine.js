/**
 * ============================================================================
 * MOTOR DEL LABORATORIO DE SOBERANÍA ALIMENTARIA E HIDROPONÍA KRATKY
 * kratky-engine.js · Calculadora de sales, simulador de cultivo y patología vegetal
 * ============================================================================
 */

import { KRATKY_SYSTEM } from '../data/kratky.js';

export class KratkyEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = {
            activeTab: 'calculator', // 'calculator' | 'species' | 'diy' | 'diagnostics'
            litres: 10,
            selectedSpeciesId: 'lechuga-romana',
            selectedDiagnosticId: null
        };
        this.render();
    }

    setTab(tab) {
        this.state.activeTab = tab;
        this.render();
    }

    setLitres(val) {
        this.state.litres = Math.max(1, Math.min(200, val));
        this.updateCalculatorValues();
    }

    calculateSalts(litres) {
        const factor = litres / 10;
        return {
            masterblendGrams: Number((6.0 * factor).toFixed(1)),
            epsomGrams: Number((3.0 * factor).toFixed(1)),
            calciumNitrateGrams: Number((6.0 * factor).toFixed(1))
        };
    }

    render() {
        if (!this.container) return;
        const salts = this.calculateSalts(this.state.litres);

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                <!-- Encabezado del Módulo -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <span class="badge-tactical" style="color:var(--status-green);">🌱 BIO-SOBERANÍA Y CULTIVO PASIVO</span>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;">
                            Laboratorio de Hidroponía Kratky (Cero Electricidad)
                        </h2>
                    </div>
                    <div class="status-indicator">
                        <span class="status-dot status-dot-green"></span>
                        <span style="color:var(--status-green);">MÉTODO CIENTÍFICO UNIV. HAWÁI</span>
                    </div>
                </div>

                <!-- Pestañas de Navegación del Módulo -->
                <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:0.75rem;overflow-x:auto;">
                    <button class="btn btn-sm ${this.state.activeTab === 'calculator' ? 'btn-primary' : 'btn-secondary'}" data-tab="calculator">
                        ⚖️ Calculadora de Sales N-P-K
                    </button>
                    <button class="btn btn-sm ${this.state.activeTab === 'species' ? 'btn-primary' : 'btn-secondary'}" data-tab="species">
                        🥬 Catálogo de Especies
                    </button>
                    <button class="btn btn-sm ${this.state.activeTab === 'diy' ? 'btn-primary' : 'btn-secondary'}" data-tab="diy">
                        🛠️ Guía Autoconstrucción PET
                    </button>
                    <button class="btn btn-sm ${this.state.activeTab === 'diagnostics' ? 'btn-primary' : 'btn-secondary'}" data-tab="diagnostics">
                        🔬 Doctor de Cultivo (Patologías)
                    </button>
                </div>

                <!-- CONTENIDO SEGÚN PESTAÑA -->
                <div id="kratky-tab-content">
                    ${this.renderTabContent(salts)}
                </div>
            </div>
        `;

        this.bindEvents();
    }

    renderTabContent(salts) {
        if (this.state.activeTab === 'calculator') {
            return `
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:2rem;">
                    <!-- Control de Volumen -->
                    <div style="background:var(--bg-surface-elevated);padding:1.5rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <h3 style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--text-metallic);margin-top:0;text-transform:uppercase;">
                            1. Dosificación de Solución Nutritiva
                        </h3>
                        <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:1.25rem;">
                            Indica cuántos litros de agua vas a preparar. La calculadora aplicará las proporciones estequiométricas exactas.
                        </p>

                        <div style="margin-bottom:1.5rem;">
                            <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.5rem;">
                                VOLUMEN DE AGUA: <strong id="litres-label" style="color:var(--action-yellow);font-size:1.2rem;">${this.state.litres} Litros</strong>
                            </label>
                            <input type="range" id="kratky-litres-range" min="1" max="100" step="1" value="${this.state.litres}" style="width:100%;accent-color:var(--action-yellow);">
                            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--text-dim);margin-top:4px;">
                                <span>2L (Botella)</span>
                                <span>5L (Garrafa)</span>
                                <span>10L (Cubo)</span>
                                <span>50L (Depósito)</span>
                            </div>
                        </div>

                        <!-- Tarjetas de Componentes Químicos -->
                        <div style="display:flex;flex-direction:column;gap:0.75rem;">
                            <div style="background:#0b131c;border:1px solid var(--border-subtle);padding:0.75rem 1rem;border-radius:var(--radius-xs);display:flex;justify-content:space-between;align-items:center;">
                                <div>
                                    <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">PARTE 1 · BASE HIDROPÓNICA (4-18-38)</span>
                                    <div style="color:#fff;font-weight:600;font-size:var(--text-sm);">Masterblend / Fertilizante Hidropónico</div>
                                </div>
                                <span id="salts-mb" style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--action-yellow);font-weight:700;">
                                    ${salts.masterblendGrams} g
                                </span>
                            </div>

                            <div style="background:#0b131c;border:1px solid var(--border-subtle);padding:0.75rem 1rem;border-radius:var(--radius-xs);display:flex;justify-content:space-between;align-items:center;">
                                <div>
                                    <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">PARTE 2 · SULFATO DE MAGNESIO (MgSO4)</span>
                                    <div style="color:#fff;font-weight:600;font-size:var(--text-sm);">Sales de Epsom de Farmacia / Agrícolas</div>
                                </div>
                                <span id="salts-epsom" style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--text-metallic);font-weight:700;">
                                    ${salts.epsomGrams} g
                                </span>
                            </div>

                            <div style="background:#0b131c;border:1px solid var(--border-subtle);padding:0.75rem 1rem;border-radius:var(--radius-xs);display:flex;justify-content:space-between;align-items:center;">
                                <div>
                                    <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">PARTE 3 · NITRATO DE CALCIO (15.5-0-0)</span>
                                    <div style="color:#fff;font-weight:600;font-size:var(--text-sm);">Nitrato Cálcico Soluble</div>
                                </div>
                                <span id="salts-calcium" style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--status-green);font-weight:700;">
                                    ${salts.calciumNitrateGrams} g
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Secuencia Química Obligatoria -->
                    <div style="background:var(--bg-surface-elevated);padding:1.5rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <h3 style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--action-yellow);margin-top:0;text-transform:uppercase;">
                            ⚠️ Protocolo Estricto de Disolución
                        </h3>
                        <p style="font-size:var(--text-sm);color:var(--text-muted);line-height:1.5;">
                            En hidroponía existe una regla química inviolable: <strong>NUNCA mezcles el Nitrato de Calcio directamente con el Masterblend concentrado</strong>. El calcio reacciona con los sulfatos y fosfatos formando <em>Sulfato de Calcio insoluble</em> (yeso en el fondo), inutilizando los nutrientes.
                        </p>

                        <ol style="font-size:var(--text-sm);color:#fff;line-height:1.6;padding-left:1.25rem;">
                            <li>Disuelve primero la <strong>Parte 1 (Masterblend)</strong> en agua templada.</li>
                            <li>Añade y disuelve por completo la <strong>Parte 2 (Sal de Epsom)</strong>.</li>
                            <li>Añade la <strong>Parte 3 (Nitrato de Calcio)</strong> únicamente cuando las anteriores estén 100% transparentes.</li>
                            <li>Comprueba que el pH esté en el rango de absorción: <strong>5.8 a 6.3</strong>.</li>
                        </ol>

                        <div style="background:rgba(34,197,94,0.1);border-left:3px solid var(--status-green);padding:0.75rem 1rem;border-radius:var(--radius-xs);margin-top:1rem;">
                            <strong style="color:var(--status-green);font-size:var(--text-sm);">Parámetros Óptimos de Solución:</strong>
                            <div style="font-family:var(--font-mono);font-size:11px;color:#fff;margin-top:4px;">
                                Conductividad (EC): 1.2 - 1.6 mS/cm · PPM (escala 500): 600 - 800 ppm
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (this.state.activeTab === 'species') {
            return `
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.5rem;">
                    ${KRATKY_SYSTEM.species.map(s => `
                        <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;">
                            <div>
                                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
                                    <h4 style="font-family:var(--font-display);font-size:1.15rem;color:#fff;margin:0;text-transform:uppercase;">
                                        ${s.name}
                                    </h4>
                                    <span style="font-size:10px;background:rgba(34,197,94,0.15);color:var(--status-green);padding:2px 6px;border-radius:2px;font-family:var(--font-mono);font-weight:bold;">
                                        ${s.category}
                                    </span>
                                </div>
                                <p style="font-size:12px;color:var(--text-metallic);margin-bottom:0.75rem;">
                                    ⏱️ Ciclo: <strong>${s.cycleDays}</strong> · 💧 Depósito: <strong>${s.waterVolumePerPlant}</strong>
                                </p>
                                <p style="font-size:var(--text-xs);color:var(--text-muted);line-height:1.4;margin-bottom:0.75rem;">
                                    ${s.caloricAndNutritionalValue}
                                </p>
                            </div>
                            <div style="background:#0b131c;padding:0.6rem 0.8rem;border-radius:var(--radius-xs);border-left:2px solid var(--action-yellow);font-size:11px;color:#fff;">
                                <strong>Cosecha:</strong> ${s.harvestMethod}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        if (this.state.activeTab === 'diy') {
            const guide = KRATKY_SYSTEM.diyBuildGuides[0];
            return `
                <div style="background:var(--bg-surface-elevated);padding:1.5rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">
                        <h3 style="font-family:var(--font-display);font-size:var(--text-xl);color:#fff;margin:0;text-transform:uppercase;">
                            🛠️ Construcción Paso a Paso: ${guide.containerType}
                        </h3>
                        <span class="badge-tactical" style="color:var(--action-yellow);">MATERIALES 100% RECICLADOS</span>
                    </div>

                    <div style="margin-bottom:1.5rem;background:#0b131c;padding:1rem;border-radius:var(--radius-xs);border:1px solid var(--border-subtle);">
                        <strong style="color:var(--text-metallic);font-size:var(--text-sm);">Materiales Necesarios:</strong>
                        <ul style="font-size:var(--text-xs);color:var(--text-muted);margin:0.5rem 0 0 0;padding-left:1.25rem;">
                            ${guide.materials.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:1rem;">
                        ${guide.steps.map(st => `
                            <div style="display:flex;gap:1rem;background:rgba(16,29,41,0.6);border:1px solid var(--border-subtle);padding:1rem;border-radius:var(--radius-xs);">
                                <div style="width:36px;height:36px;border-radius:var(--radius-pill);background:var(--action-yellow);color:#0a1118;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:var(--font-display);font-size:1.1rem;flex-shrink:0;">
                                    ${st.stepNumber}
                                </div>
                                <div>
                                    <h4 style="font-family:var(--font-display);font-size:var(--text-base);color:#fff;margin:0 0 0.25rem 0;text-transform:uppercase;">
                                        ${st.title}
                                    </h4>
                                    <p style="font-size:var(--text-sm);color:var(--text-muted);margin:0;line-height:1.4;">
                                        ${st.instruction}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (this.state.activeTab === 'diagnostics') {
            return `
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:0.5rem;">
                        Selecciona el síntoma visual de tu cultivo para obtener el diagnóstico fisiológico y la acción correctiva inmediata:
                    </p>
                    ${KRATKY_SYSTEM.diagnosticTree.map(d => `
                        <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.25rem;border-left:4px solid #ef4444;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                                <h4 style="font-family:var(--font-display);font-size:var(--text-base);color:#fff;margin:0;text-transform:uppercase;">
                                    🔍 ${d.visualCue}
                                </h4>
                            </div>
                            <p style="font-size:var(--text-sm);color:var(--text-metallic);margin-bottom:0.5rem;font-weight:500;">
                                <strong>Síntoma:</strong> ${d.symptom}
                            </p>
                            <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:0.75rem;">
                                <strong>Causa biológica:</strong> ${d.cause}
                            </p>
                            <div style="background:#0b131c;padding:0.75rem 1rem;border-radius:var(--radius-xs);border:1px solid var(--border-subtle);font-size:var(--text-xs);color:var(--status-green);">
                                <strong>⚡ ACCIÓN CORRECTIVA INMEDIATA:</strong> ${d.immediateCorrection}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        return '';
    }

    updateCalculatorValues() {
        const salts = this.calculateSalts(this.state.litres);
        const label = document.getElementById('litres-label');
        const sMb = document.getElementById('salts-mb');
        const sEpsom = document.getElementById('salts-epsom');
        const sCalc = document.getElementById('salts-calcium');

        if (label) label.textContent = `${this.state.litres} Litros`;
        if (sMb) sMb.textContent = `${salts.masterblendGrams} g`;
        if (sEpsom) sEpsom.textContent = `${salts.epsomGrams} g`;
        if (sCalc) sCalc.textContent = `${salts.calciumNitrateGrams} g`;
    }

    bindEvents() {
        const tabBtns = this.container.querySelectorAll('[data-tab]');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTab(e.currentTarget.dataset.tab);
            });
        });

        const range = document.getElementById('kratky-litres-range');
        if (range) {
            range.addEventListener('input', (e) => {
                this.setLitres(parseInt(e.target.value, 10));
            });
        }
    }
}
