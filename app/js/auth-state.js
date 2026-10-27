/**
 * ============================================================================
 * GESTOR DE ESTADO Y ACCESO POR NIVELES (TIER CONTROLLER)
 * auth-state.js · Control de acceso offline y sincronización Hotmart
 * ============================================================================
 * Niveles:
 * - 'guest' (Nivel 0: Vista previa limitada)
 * - 'kit' ($17 USD: Acceso a Calculadoras, Mochila 72h, Árbol 90s, F29-F40)
 * - 'sistema' ($47 USD: Acceso Total + Módulo Kratky + 40 Fichas + Enciclopedia)
 */

import { StorageEngine } from './storage.js';

export const TIERS = {
    GUEST: 'guest',
    KIT: 'kit',
    SISTEMA: 'sistema'
};

const TIER_WEIGHTS = {
    guest: 0,
    kit: 1,
    sistema: 2
};

export const AuthState = {
    init() {
        // Desbloqueo total para modo de prueba del propietario
        const current = StorageEngine.get('user_tier');
        if (!current || current === TIERS.GUEST) {
            this.setTier(TIERS.SISTEMA);
        }

        // Verificar si viene con parámetro de URL de Hotmart (Onboarding post-compra)
        const params = new URLSearchParams(window.location.search);
        const urlTier = params.get('tier');
        const token = params.get('token');

        if (urlTier && (urlTier === 'kit' || urlTier === 'sistema')) {
            this.setTier(urlTier);
            // Limpiar URL para que no quede expuesto el token en la barra de direcciones
            if (window.history.replaceState) {
                const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
            }
        }
    },

    getCurrentTier() {
        // Desbloqueado por defecto para pruebas completas del propietario
        const stored = StorageEngine.get('user_tier', TIERS.SISTEMA);
        return (stored || TIERS.SISTEMA).toLowerCase();
    },

    setTier(tier) {
        const valid = Object.values(TIERS).includes(tier) ? tier : TIERS.GUEST;
        StorageEngine.set('user_tier', valid);
        return valid;
    },

    /**
     * Comprueba si el usuario tiene permiso para ver el módulo
     * @param {string} requiredTier - 'kit' o 'sistema'
     */
    hasAccess(requiredTier) {
        const current = this.getCurrentTier();
        const currentWeight = TIER_WEIGHTS[current] || 0;
        const requiredWeight = TIER_WEIGHTS[requiredTier] || 0;
        return currentWeight >= requiredWeight;
    },

    /**
     * Muestra modal táctico de bloqueo con enlace a la oferta correspondiente
     */
    showUpgradeModal(moduleName, requiredTier = 'sistema') {
        const existing = document.getElementById('upgrade-modal-backdrop');
        if (existing) existing.remove();

        const isSistema = requiredTier === 'sistema';
        const tierTitle = isSistema ? 'SISTEMA COMPLETO ($47 USD)' : 'KIT DIGITAL ($17 USD)';
        const tierPrice = isSistema ? '$47 USD' : '$17 USD';

        const modalHtml = `
            <div id="upgrade-modal-backdrop" style="position:fixed;inset:0;background:rgba(10,17,24,0.85);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1.5rem;">
                <div style="background:#101d29;border:1px solid #facc15;border-radius:8px;max-width:520px;width:100%;padding:2rem;box-shadow:0 0 40px rgba(250,204,21,0.25);position:relative;">
                    <button id="close-modal-btn" style="position:absolute;top:1rem;right:1rem;background:transparent;border:none;color:#94a3b8;font-size:1.5rem;cursor:pointer;">&times;</button>
                    <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(250,204,21,0.15);border:1px solid #facc15;color:#facc15;padding:4px 10px;border-radius:4px;font-family:monospace;font-size:0.75rem;font-weight:700;text-transform:uppercase;">
                        🔒 MÓDULO EXCLUSIVO · ${tierTitle}
                    </div>
                    <h2 style="font-family:'Oswald',sans-serif;font-size:1.5rem;color:#ffffff;margin-top:1rem;margin-bottom:0.5rem;text-transform:uppercase;">
                        ${moduleName}
                    </h2>
                    <p style="color:#94a3b8;font-size:0.9rem;line-height:1.5;margin-bottom:1.5rem;">
                        Este módulo técnico avanzado está reservado para los miembros del <strong>${tierTitle}</strong>. 
                        Actualiza tu plan para desbloquear simuladores interactivos, recetas científicas y la suite completa de defensa civil.
                    </p>
                    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                        <a href="../index.html#precios" style="flex:1;min-width:180px;background:#facc15;color:#0a1118;font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;padding:0.75rem 1.5rem;border-radius:4px;text-decoration:none;text-align:center;text-transform:uppercase;box-shadow:0 0 15px rgba(250,204,21,0.3);">
                            Desbloquear por ${tierPrice}
                        </a>
                        <button id="cancel-modal-btn" style="background:#152636;color:#7dd3fc;border:1px solid #1c3044;padding:0.75rem 1.5rem;border-radius:4px;font-family:'Oswald',sans-serif;cursor:pointer;">
                            Volver al Mando
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('close-modal-btn').addEventListener('click', () => {
            document.getElementById('upgrade-modal-backdrop').remove();
        });
        document.getElementById('cancel-modal-btn').addEventListener('click', () => {
            document.getElementById('upgrade-modal-backdrop').remove();
        });
    }
};

// Auto-inicializar
AuthState.init();
