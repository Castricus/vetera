/**
 * ============================================================================
 * MOTOR DEL PLAN FAMILIAR: LAS 40 FICHAS EJECUTABLES (F01 a F40)
 * family-plan-engine.js · Editor interactivo, auto-guardado y exportación
 * ============================================================================
 */

import { FAMILY_PLAN_SHEETS } from '../data/fichas.js';
import { StorageEngine } from './storage.js';

export class FamilyPlanEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.activeBlock = 'A'; // 'A' | 'B' | 'C' | 'D' | 'E'
        this.formData = StorageEngine.get('family_plan_data', {});
        this.render();
    }

    setBlock(blockLetter) {
        this.activeBlock = blockLetter;
        this.render();
    }

    handleFieldChange(fieldId, value) {
        this.formData[fieldId] = value;
        StorageEngine.set('family_plan_data', this.formData);
        
        // Si es un campo que recalcula otros (ej. members_count)
        if (fieldId === 'members_count') {
            const count = parseInt(value, 10) || 1;
            const waterLitres = count * 4 * 14;
            const targetEl = document.getElementById('calc-water_goal_litres');
            if (targetEl) targetEl.textContent = `${waterLitres} Litros`;
        }
    }

    getSheetsForActiveBlock() {
        return FAMILY_PLAN_SHEETS.filter(s => s.block === this.activeBlock);
    }

    render() {
        if (!this.container) return;
        const sheets = this.getSheetsForActiveBlock();

        const blocks = [
            { letter: 'A', name: 'Quiénes Somos (F01-F05)', icon: '👥' },
            { letter: 'B', name: 'Dónde Nos Encontramos (F06-F10)', icon: '📍' },
            { letter: 'C', name: 'Qué Tenemos (F11-F18)', icon: '📦' },
            { letter: 'D', name: 'Qué Hace Cada Uno (F19-F23)', icon: '🛡️' },
            { letter: 'E', name: 'La Casa y el Refugio (F24-F28)', icon: '🏠' }
        ];

        this.container.innerHTML = `
            <div class="tactical-card" style="margin-bottom: 2rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
                    <div>
                        <span class="badge-tactical" style="color:var(--text-metallic);">📋 CUADERNO OFICIAL DE TRABAJO</span>
                        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:#fff;margin:0.5rem 0 0 0;text-transform:uppercase;">
                            Gestor Interactivo del Plan Familiar (F01 a F40)
                        </h2>
                    </div>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                        <button class="btn btn-sm btn-secondary" id="export-json-btn">💾 Descargar Backup</button>
                        <button class="btn btn-sm btn-primary" id="print-plan-btn">🖨️ Imprimir Plan</button>
                    </div>
                </div>

                <!-- Selector de Bloques -->
                <div style="display:flex;gap:0.5rem;margin-bottom:2rem;overflow-x:auto;padding-bottom:0.5rem;">
                    ${blocks.map(b => `
                        <button class="btn btn-sm ${this.activeBlock === b.letter ? 'btn-primary' : 'btn-secondary'}" data-block-letter="${b.letter}" style="white-space:nowrap;">
                            ${b.icon} Bloque ${b.letter}: ${b.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Lista de Fichas del Bloque -->
                <div style="display:flex;flex-direction:column;gap:1.5rem;">
                    ${sheets.map(sheet => `
                        <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1.5rem;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;border-bottom:1px solid var(--border-subtle);padding-bottom:0.5rem;">
                                <div>
                                    <span style="font-family:var(--font-mono);font-size:11px;color:var(--action-yellow);font-weight:700;">${sheet.code} · BLOQUE ${sheet.block}</span>
                                    <h3 style="font-family:var(--font-display);font-size:1.2rem;color:#fff;margin:0.25rem 0 0 0;text-transform:uppercase;">
                                        ${sheet.title}
                                    </h3>
                                </div>
                            </div>

                            <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:1.25rem;">
                                ${sheet.subtitle || ''}
                            </p>

                            <!-- Campos de la Ficha -->
                            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:1rem;">
                                ${sheet.fields.map(f => this.renderField(f)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.bindEvents();
    }

    renderField(field) {
        const val = this.formData[field.id] !== undefined ? this.formData[field.id] : (field.default || '');

        if (field.type === 'calculated') {
            const count = parseInt(this.formData['members_count'] || 4, 10);
            const calculatedVal = count * 4 * 14;
            return `
                <div style="grid-column: 1 / -1;background:#0b131c;border:1px solid var(--border-subtle);padding:0.75rem 1rem;border-radius:var(--radius-xs);">
                    <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-dim);margin-bottom:4px;">
                        ${field.label}
                    </label>
                    <div id="calc-${field.id}" style="font-family:var(--font-display);font-size:var(--text-2xl);color:var(--action-yellow);font-weight:700;">
                        ${calculatedVal} Litros
                    </div>
                </div>
            `;
        }

        if (field.type === 'textarea') {
            return `
                <div style="grid-column: 1 / -1;">
                    <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                        ${field.label}
                    </label>
                    <textarea data-field-id="${field.id}" rows="2" placeholder="${field.placeholder || ''}" style="width:100%;padding:0.6rem;background:#0b131c;border:1px solid var(--border-subtle);color:#fff;border-radius:var(--radius-xs);font-family:var(--font-body);font-size:var(--text-sm);">${val}</textarea>
                </div>
            `;
        }

        if (field.type === 'select') {
            return `
                <div>
                    <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                        ${field.label}
                    </label>
                    <select data-field-id="${field.id}" style="width:100%;padding:0.6rem;background:#0b131c;border:1px solid var(--border-subtle);color:#fff;border-radius:var(--radius-xs);font-size:var(--text-sm);">
                        ${field.options.map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        if (field.type === 'info') {
            return `
                <div style="grid-column: 1 / -1;background:rgba(125,211,252,0.06);border-left:3px solid var(--text-metallic);padding:0.75rem 1rem;border-radius:var(--radius-xs);font-size:var(--text-xs);color:var(--text-muted);">
                    ${field.content}
                </div>
            `;
        }

        return `
            <div>
                <label style="display:block;font-family:var(--font-mono);font-size:11px;color:var(--text-metallic);margin-bottom:4px;">
                    ${field.label}
                </label>
                <input type="${field.type || 'text'}" data-field-id="${field.id}" value="${val}" placeholder="${field.placeholder || ''}" style="width:100%;padding:0.6rem;background:#0b131c;border:1px solid var(--border-subtle);color:#fff;border-radius:var(--radius-xs);font-size:var(--text-sm);">
            </div>
        `;
    }

    bindEvents() {
        const blockBtns = this.container.querySelectorAll('[data-block-letter]');
        blockBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setBlock(e.currentTarget.dataset.blockLetter);
            });
        });

        const inputs = this.container.querySelectorAll('[data-field-id]');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleFieldChange(e.target.dataset.fieldId, e.target.value);
            });
        });

        const exportBtn = document.getElementById('export-json-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                StorageEngine.exportAllData();
            });
        }

        const printBtn = document.getElementById('print-plan-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    }
}
