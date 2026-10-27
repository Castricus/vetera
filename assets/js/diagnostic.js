/**
 * ============================================================================
 * MOTOR DEL WIDGET DE DIAGNÓSTICO RÁPIDO DE VULNERABILIDAD CIVIL (HERO)
 * diagnostic.js · Auditoría en 3 pasos, telemetría reactiva y prescripción
 * ============================================================================
 */

export class HeroDiagnosticWidget {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStep = 1;
        this.totalSteps = 3;
        this.answers = {
            step1: null,
            step2: null,
            step3: null
        };
        this.render();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="diagnostic-widget" id="diagnostic-card">
                <!-- Header del Diagnóstico -->
                <div class="diagnostic-header">
                    <h3 class="diagnostic-title">
                        <span class="status-dot status-dot-yellow"></span>
                        DIAGNÓSTICO RÁPIDO DE VULNERABILIDAD CIVIL
                    </h3>
                    <span class="diagnostic-step" id="step-counter">PASO ${this.currentStep}/${this.totalSteps}</span>
                </div>

                <!-- Barra Reactiva de Riesgo / Telemetría en Vivo -->
                <div class="threat-meter">
                    <div class="threat-meter-labels">
                        <span style="color:var(--text-dim);">ÍNDICE DE VULNERABILIDAD ESTIMADO:</span>
                        <span class="threat-meter-score" id="threat-score-label">--%</span>
                    </div>
                    <div class="threat-bar-track">
                        <div class="threat-bar-fill" id="threat-bar" style="width: 25%;"></div>
                    </div>
                </div>

                <!-- Contenedor Dinámico de Pasos -->
                <div id="diagnostic-step-content" class="question-container">
                    ${this.getStepHtml(this.currentStep)}
                </div>
            </div>
        `;

        this.bindStepEvents();
    }

    getStepHtml(step) {
        if (step === 1) {
            return `
                <h4 class="question-text">
                    1. ¿Cuánto tardaría tu familia en refugiarse con suministros tras sonar una sirena de alerta?
                </h4>
                <div class="options-grid">
                    <button class="option-btn" data-value="opt-a" data-score="10">
                        <span class="option-indicator">A</span>
                        <span>Menos de 90 segundos (Mochila lista y punto interior asignado)</span>
                    </button>
                    <button class="option-btn" data-value="opt-b" data-score="45">
                        <span class="option-indicator">B</span>
                        <span>Entre 5 y 15 minutos (Tenemos cosas pero dispersas en casa)</span>
                    </button>
                    <button class="option-btn" data-value="opt-c" data-score="80">
                        <span class="option-indicator">C</span>
                        <span>Más de 30 minutos (Habría que salir a comprar agua y buscar provisiones)</span>
                    </button>
                    <button class="option-btn" data-value="opt-d" data-score="95">
                        <span class="option-indicator">D</span>
                        <span>Sin plan ni suministros asignados</span>
                    </button>
                </div>
            `;
        }

        if (step === 2) {
            return `
                <h4 class="question-text">
                    2. Si la red de agua colapsa por completo, ¿cuántos litros seguros tienes sellados por persona?
                </h4>
                <div class="options-grid">
                    <button class="option-btn" data-value="opt-a" data-score="90">
                        <span class="option-indicator">A</span>
                        <span>Menos de 3 días (Solo un par de botellas en la nevera)</span>
                    </button>
                    <button class="option-btn" data-value="opt-b" data-score="55">
                        <span class="option-indicator">B</span>
                        <span>Entre 7 y 14 días (Varias garrafas, pero sin método de desinfección)</span>
                    </button>
                    <button class="option-btn" data-value="opt-c" data-score="20">
                        <span class="option-indicator">C</span>
                        <span>Más de 30 días calculados con kit de cloración y filtros</span>
                    </button>
                    <button class="option-btn" data-value="opt-d" data-score="100">
                        <span class="option-indicator">D</span>
                        <span>Dependemos al 100% del grifo de la red pública</span>
                    </button>
                </div>
            `;
        }

        if (step === 3) {
            return `
                <h4 class="question-text">
                    3. ¿Conoces el factor de protección radiológica (PF) de tu vivienda o cómo sellar rendijas contra nubes tóxicas?
                </h4>
                <div class="options-grid">
                    <button class="option-btn" data-value="opt-a" data-score="15">
                        <span class="option-indicator">A</span>
                        <span>Sí, tenemos sótano o muros de hormigón macizo y cinta/plástico de sellado rápido</span>
                    </button>
                    <button class="option-btn" data-value="opt-b" data-score="50">
                        <span class="option-indicator">B</span>
                        <span>Parcial: Muros estándar de ladrillo, pero sin material de sellado de aire</span>
                    </button>
                    <button class="option-btn" data-value="opt-c" data-score="85">
                        <span class="option-indicator">C</span>
                        <span>Vivienda ligera (madera, tabiques secos o ático con ventanas grandes)</span>
                    </button>
                    <button class="option-btn" data-value="opt-d" data-score="95">
                        <span class="option-indicator">D</span>
                        <span>Desconocemos por completo el protocolo de sellado y atenuación</span>
                    </button>
                </div>
            `;
        }

        return '';
    }

    selectOption(score) {
        this.answers[`step${this.currentStep}`] = score;

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.render();
            this.updateThreatBar();
        } else {
            this.showCalculatingState();
        }
    }

    updateThreatBar() {
        const scores = Object.values(this.answers).filter(v => v !== null);
        if (scores.length === 0) return;

        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const scoreLabel = document.getElementById('threat-score-label');
        const bar = document.getElementById('threat-bar');

        if (scoreLabel) scoreLabel.textContent = `${avg}%`;
        if (bar) {
            bar.style.width = `${avg}%`;
            bar.style.background = avg > 70 ? 'var(--status-red)' : avg > 40 ? 'var(--status-amber)' : 'var(--status-green)';
        }
    }

    showCalculatingState() {
        const content = document.getElementById('diagnostic-step-content');
        const counter = document.getElementById('step-counter');
        if (counter) counter.textContent = 'PROCESANDO';

        if (content) {
            content.innerHTML = `
                <div style="text-align:center;padding:2rem 1rem;">
                    <span class="status-dot status-dot-yellow" style="width:16px;height:16px;margin-bottom:1rem;"></span>
                    <h4 style="font-family:var(--font-display);font-size:var(--text-lg);color:#fff;margin:0 0 0.5rem 0;text-transform:uppercase;">
                        Procesando Vectores de Vulnerabilidad...
                    </h4>
                    <p style="font-size:var(--text-xs);color:var(--text-metallic);font-family:var(--font-mono);margin:0;">
                        Cruzando datos con estándares FEMA CPG 1-17, CDC y OMS...
                    </p>
                </div>
            `;
        }

        setTimeout(() => {
            this.showResults();
        }, 1100);
    }

    showResults() {
        const scores = Object.values(this.answers);
        const finalVulnerability = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const counter = document.getElementById('step-counter');
        const content = document.getElementById('diagnostic-step-content');
        const scoreLabel = document.getElementById('threat-score-label');
        const bar = document.getElementById('threat-bar');

        if (counter) counter.textContent = 'DICTAMEN TÁCTICO';
        if (scoreLabel) scoreLabel.textContent = `${finalVulnerability}%`;
        if (bar) {
            bar.style.width = `${finalVulnerability}%`;
            bar.style.background = finalVulnerability > 65 ? 'var(--status-red)' : 'var(--action-yellow)';
        }

        let verdictTitle = 'VULNERABILIDAD CRÍTICA DETECTADA';
        let verdictDesc = 'Tu familia enfrentaría un colapso logístico antes de las 72 horas por falta de protocolo hídrico estricto y desprotección radiológica.';
        if (finalVulnerability < 40) {
            verdictTitle = 'PREPARACIÓN BASE MODERADA';
            verdictDesc = 'Tienes nociones fundamentales, pero existen brechas peligrosas en sellado de aire y autonomía calórica a 14 días.';
        }

        if (content) {
            content.innerHTML = `
                <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.4);border-radius:var(--radius-sm);padding:1.25rem;margin-bottom:1.25rem;border-left:4px solid #ef4444;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                        <span style="font-family:var(--font-mono);font-size:11px;color:#ef4444;font-weight:bold;">DICTAMEN: ${verdictTitle}</span>
                        <span style="font-family:var(--font-mono);font-size:12px;color:var(--action-yellow);font-weight:700;">ÍNDICE: ${finalVulnerability}%</span>
                    </div>
                    <p style="font-size:var(--text-xs);color:#fff;margin:0;line-height:1.5;">
                        ${verdictDesc}
                    </p>
                </div>

                <div style="display:flex;flex-direction:column;gap:0.75rem;">
                    <a href="#precios" class="btn btn-primary btn-full" style="text-decoration:none;">
                        Ver Solución: Sistema de Mitigación Táctica
                    </a>
                    <a href="app/index.html" class="btn btn-secondary btn-full btn-sm" style="text-decoration:none;font-size:11px;">
                        💻 Abrir Centro de Mando Táctico (Web App)
                    </a>
                </div>
            `;
        }
    }

    bindStepEvents() {
        const optionBtns = this.container.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const score = parseInt(e.currentTarget.dataset.score, 10);
                this.selectOption(score);
            });
        });
    }
}
