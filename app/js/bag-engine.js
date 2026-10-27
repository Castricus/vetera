/**
 * ============================================================================
 * MOTOR DE LA MOCHILA DE 72 HORAS (SISTEMA DE 3 CAPAS Y CONTROL ERGONÓMICO)
 * bag-engine.js · Checklist interactiva, pesaje dinámico y perfiles familiares
 * ============================================================================
 */

import { BAG_PROFILES } from '../data/bag-items.js';
import { CALCULATORS } from '../data/calculators.js';
import { StorageEngine } from './storage.js';

export class BagEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentProfileId = 'adulto';
        this.bodyWeightKg = StorageEngine.get('bag_body_weight', 75);
        this.checkedItems = StorageEngine.get('bag_checked_items', {});
        this.render();
    }

    setProfile(profileId) {
        this.currentProfileId = profileId;
        this.render();
    }

    setBodyWeight(weight) {
        this.bodyWeightKg = Math.max(30, Math.min(150, weight));
        StorageEngine.set('bag_body_weight', this.bodyWeightKg);
        this.updateErgonomics();
    }

    toggleItem(itemId) {
        this.checkedItems[itemId] = !this.checkedItems[itemId];
        StorageEngine.set('bag_checked_items', this.checkedItems);
        this.updateCheckedUI(itemId);
        this.updateErgonomics();
    }

    getCurrentProfile() {
        return BAG_PROFILES.find(p => p.id === this.currentProfileId) || BAG_PROFILES[0];
    }

    calculateTotalWeight() {
        // Estima el peso base según items marcados: ~450g por item promedio o peso asignado
        const profile = this.getCurrentProfile();
        let totalItems = 0;
        let checkedCount = 0;

        profile.layers.forEach(l => {
            l.items.forEach(it => {
                totalItems++;
                if (this.checkedItems[it.id]) checkedCount++;
            });
        });

        // Supongamos un peso proporcional estimado: mochila base vacía (1.5 kg) + 0.5 kg por item marcado
        const estimatedPackWeightKg = 1.5 + (checkedCount * 0.45);
        return {
            totalItems,
            checkedCount,
            estimatedWeightKg: Number(estimatedPackWeightKg.toFixed(1))
        };
    }

    render() {
        if (!this.container) return;
        const profile = this.getCurrentProfile();
        const weightStats = this.calculateTotalWeight();
        const ergo = CALCULATORS.ergonomics.evaluatePackWeight(this.bodyWeightKg, weightStats.estimatedWeightKg);

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <span class="badge-tactical" style="color:var(--action-yellow);">🎒 SISTEMA DE EVACUACIÓN TÁCTICA</span>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;">
                            Mochila de 72 Horas en 3 Capas
                        </h2>
                    </div>
                    <div class="status-indicator">
                        <span class="status-dot status-dot-green"></span>
                        <span style="color:var(--status-green);">REGLA DE LOS 20 MINUTOS A PIE</span>
                    </div>
                </div>

                <!-- Selector de Perfil y Peso Corporal -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.5rem;margin-bottom:2rem;">
                    <div>
                        <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.5rem;text-transform:uppercase;">
                            👤 Perfil Familiar de Mochila:
                        </label>
                        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                            ${BAG_PROFILES.map(p => `
                                <button class="btn btn-sm ${p.id === this.currentProfileId ? 'btn-primary' : 'btn-secondary'}" data-profile="${p.id}">
                                    ${p.icon} ${p.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div style="background:var(--bg-surface-elevated);padding:1rem;border-radius:var(--radius-sm);border:1px solid var(--border-subtle);">
                        <label style="display:block;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-metallic);margin-bottom:0.25rem;">
                            ⚖️ Tu Peso Corporal: <strong id="body-weight-val" style="color:#fff;">${this.bodyWeightKg} kg</strong> (Límite 15%: <strong style="color:var(--action-yellow);">${ergo.optimalWeightKg} kg</strong>)
                        </label>
                        <input type="range" id="body-weight-range" min="40" max="130" step="1" value="${this.bodyWeightKg}" style="width:100%;accent-color:var(--action-yellow);">
                    </div>
                </div>

                <!-- Telemetría de Peso y Carga Ergonómica -->
                <div style="background:#0b131c;border:1px solid var(--border-subtle);padding:1.25rem;border-radius:var(--radius-sm);margin-bottom:2rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;font-family:var(--font-mono);font-size:var(--text-xs);">
                        <span style="color:var(--text-dim);">PROGRESO DE CARGA (${weightStats.checkedCount}/${weightStats.totalItems} ítems):</span>
                        <span id="pack-weight-label" style="color:${ergo.status === 'PELIGROSO' ? '#ef4444' : ergo.status === 'LIMITE' ? '#f59e0b' : '#22c55e'};font-weight:700;">
                            ${weightStats.estimatedWeightKg} kg · ${ergo.currentPercentage}% de tu peso (${ergo.status})
                        </span>
                    </div>
                    <div class="threat-bar-track" style="height:10px;">
                        <div id="pack-weight-bar" style="height:100%;width:${Math.min(100, (weightStats.estimatedWeightKg / ergo.maximumWeightKg) * 100)}%;background:${ergo.status === 'PELIGROSO' ? '#ef4444' : ergo.status === 'LIMITE' ? '#f59e0b' : 'var(--status-green)'};transition:width 0.3s;border-radius:99px;"></div>
                    </div>
                    <p id="pack-verdict-text" style="font-size:12px;color:var(--text-muted);margin:0.5rem 0 0 0;">
                        ${ergo.verdict}
                    </p>
                </div>

                <!-- Capas de la Mochila -->
                <div style="display:flex;flex-direction:column;gap:1.5rem;">
                    ${profile.layers.map(layer => `
                        <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.25rem;border-left:4px solid ${layer.color};">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:0.5rem;">
                                <h3 style="font-family:var(--font-display);font-size:1.15rem;color:#fff;margin:0;text-transform:uppercase;">
                                    ${layer.title}
                                </h3>
                                <span style="font-family:var(--font-mono);font-size:11px;color:${layer.color};">CAPA 0${layer.number}</span>
                            </div>
                            <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:1rem;">
                                ${layer.desc}
                            </p>

                            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:0.5rem;">
                                ${layer.items.map(it => {
                                    const isChecked = !!this.checkedItems[it.id];
                                    return `
                                        <label style="display:flex;align-items:flex-start;gap:10px;padding:8px 12px;background:rgba(10,17,24,0.6);border:1px solid ${isChecked ? 'var(--status-green)' : 'var(--border-subtle)'};border-radius:var(--radius-xs);cursor:pointer;transition:all 0.2s;" data-item-label="${it.id}">
                                            <input type="checkbox" data-item-id="${it.id}" ${isChecked ? 'checked' : ''} style="margin-top:3px;accent-color:var(--status-green);">
                                            <div style="font-size:var(--text-xs);color:${isChecked ? '#fff' : 'var(--text-muted)'};line-height:1.4;">
                                                ${it.label}
                                                ${it.critical ? '<span style="color:#ef4444;font-size:10px;font-weight:bold;margin-left:4px;">[CRÍTICO]</span>' : ''}
                                            </div>
                                        </label>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.bindEvents();
    }

    updateCheckedUI(itemId) {
        const isChecked = !!this.checkedItems[itemId];
        const label = this.container.querySelector(`[data-item-label="${itemId}"]`);
        if (label) {
            label.style.borderColor = isChecked ? 'var(--status-green)' : 'var(--border-subtle)';
            const textEl = label.querySelector('div');
            if (textEl) textEl.style.color = isChecked ? '#fff' : 'var(--text-muted)';
        }
    }

    updateErgonomics() {
        const weightStats = this.calculateTotalWeight();
        const ergo = CALCULATORS.ergonomics.evaluatePackWeight(this.bodyWeightKg, weightStats.estimatedWeightKg);

        const bWeightLabel = document.getElementById('body-weight-val');
        const packLabel = document.getElementById('pack-weight-label');
        const bar = document.getElementById('pack-weight-bar');
        const verdict = document.getElementById('pack-verdict-text');

        if (bWeightLabel) bWeightLabel.textContent = `${this.bodyWeightKg} kg`;
        if (packLabel) {
            packLabel.textContent = `${weightStats.estimatedWeightKg} kg · ${ergo.currentPercentage}% de tu peso (${ergo.status})`;
            packLabel.style.color = ergo.status === 'PELIGROSO' ? '#ef4444' : ergo.status === 'LIMITE' ? '#f59e0b' : '#22c55e';
        }
        if (bar) {
            bar.style.width = `${Math.min(100, (weightStats.estimatedWeightKg / ergo.maximumWeightKg) * 100)}%`;
            bar.style.background = ergo.status === 'PELIGROSO' ? '#ef4444' : ergo.status === 'LIMITE' ? '#f59e0b' : 'var(--status-green)';
        }
        if (verdict) verdict.textContent = ergo.verdict;
    }

    bindEvents() {
        const profileBtns = this.container.querySelectorAll('[data-profile]');
        profileBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setProfile(e.currentTarget.dataset.profile);
            });
        });

        const range = document.getElementById('body-weight-range');
        if (range) {
            range.addEventListener('input', (e) => {
                this.setBodyWeight(parseInt(e.target.value, 10));
            });
        }

        const checkboxes = this.container.querySelectorAll('[data-item-id]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                this.toggleItem(e.target.dataset.itemId);
            });
        });
    }
}
