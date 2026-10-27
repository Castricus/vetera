/**
 * ============================================================================
 * CALCULADORAS TÁCTICAS Y ALGORITMOS DE INGENIERÍA DE SUPERVIVENCIA
 * calculators.js · Fórmulas de física nuclear, atenuación, hidratación y raciones
 * ============================================================================
 * Basado en directrices de:
 * - FEMA CPG 1-17 (Outdoor Challenge & Shelter Protection Factors)
 * - CDC Radiation Emergencies Division
 * - OMS / Cruz Roja Internacional (Estándares mínimos de agua en desastres)
 * - Kearny Nuclear Survival Skills (Oak Ridge National Laboratory)
 */

export const CALCULATORS = {
    // ------------------------------------------------------------------------
    // 1. FÍSICA NUCLEAR: REGLA 7/10 Y DECAIMIENTO EXPONENCIAL DEL FALLOUT
    // ------------------------------------------------------------------------
    nuclear: {
        /**
         * Calcula la tasa de radiación remanente tras un tiempo transcurrido (Regla 7/10: R(t) = R_0 * t^(-1.2))
         * @param {number} initialDoseRate - Tasa de dosis a la hora H+1 (en Roentgens/h o mSv/h)
         * @param {number} hoursElapsed - Horas transcurridas desde la detonación
         */
        calculateDecay(initialDoseRate, hoursElapsed) {
            if (hoursElapsed <= 0) return { doseRate: initialDoseRate, percentage: 100, riskLevel: 'EXTREMO' };
            
            // Fórmula estándar del Oak Ridge National Laboratory
            const decayFactor = Math.pow(hoursElapsed, -1.2);
            const currentDoseRate = initialDoseRate * decayFactor;
            const percentage = Math.min(100, (currentDoseRate / initialDoseRate) * 100);

            let riskLevel = 'TOLERABLE';
            let recommendation = 'Salida controlada permitida con dosímetro.';

            if (currentDoseRate > 100) {
                riskLevel = 'LETAL INMEDIATO';
                recommendation = 'PERMANECER EN EL BÚNKER BAJO MÁXIMO BLINDAJE. Exposición exterior causa síndrome agudo en horas.';
            } else if (currentDoseRate > 10) {
                riskLevel = 'PELIGRO SEVERO';
                recommendation = 'Evitar salidas salvo emergencia vital de menos de 15 minutos con protección total.';
            } else if (currentDoseRate > 1) {
                riskLevel = 'MODERADO';
                recommendation = 'Salidas breves autorizadas exclusivamente para reposición de agua o tareas críticas.';
            }

            return {
                hoursElapsed,
                doseRate: Number(currentDoseRate.toFixed(2)),
                percentage: Number(percentage.toFixed(2)),
                riskLevel,
                recommendation
            };
        },

        // Materiales y sus Capas de Hemirreducción (HVL - Half-Value Layer)
        // Espesor necesario para reducir la radiación gamma entrante al 50%
        materialsHVL: {
            plomo: { name: 'Plomo sólido', hvlCm: 1.3, density: '11.34 g/cm³', unit: 'cm' },
            acero: { name: 'Acero / Hierro laminado', hvlCm: 2.5, density: '7.87 g/cm³', unit: 'cm' },
            concreto: { name: 'Hormigón armado / Concreto macizo', hvlCm: 6.0, density: '2.40 g/cm³', unit: 'cm' },
            ladrillo: { name: 'Ladrillo cerámico macizo', hvlCm: 7.5, density: '1.90 g/cm³', unit: 'cm' },
            tierra: { name: 'Tierra compactada / Arena de sílice', hvlCm: 9.0, density: '1.60 g/cm³', unit: 'cm' },
            agua: { name: 'Agua dulce en depósitos', hvlCm: 18.0, density: '1.00 g/cm³', unit: 'cm' },
            madera: { name: 'Madera de pino / Contrachapado', hvlCm: 28.0, density: '0.60 g/cm³', unit: 'cm' }
        },

        /**
         * Calcula el Factor de Protección (PF) y la atenuación porcentual de un muro
         * @param {string} materialKey - Clave del material (plomo, concreto, etc.)
         * @param {number} thicknessCm - Espesor del muro en centímetros
         */
        calculateShielding(materialKey, thicknessCm) {
            const mat = this.materialsHVL[materialKey] || this.materialsHVL.concreto;
            const hvlCount = thicknessCm / mat.hvlCm;
            
            // Cada HVL reduce a la mitad: PF = 2^n
            const protectionFactor = Math.pow(2, hvlCount);
            const radiationTransmittedPercent = (1 / protectionFactor) * 100;
            const radiationBlockedPercent = 100 - radiationTransmittedPercent;

            let rating = 'INSUFICIENTE';
            if (protectionFactor >= 100) {
                rating = 'BÚNKER DE GRADO MILITAR (PF 100+)';
            } else if (protectionFactor >= 40) {
                rating = 'REFUGIO RESIDENCIAL ÓPTIMO (PF 40 - 99)';
            } else if (protectionFactor >= 10) {
                rating = 'PROTECCIÓN MEDIA (PF 10 - 39)';
            } else {
                rating = 'BLINDAJE MÍNIMO DE ALERTA (PF < 10)';
            }

            return {
                material: mat.name,
                thicknessCm,
                hvlCount: Number(hvlCount.toFixed(2)),
                protectionFactor: Number(protectionFactor.toFixed(1)),
                radiationBlockedPercent: Number(radiationBlockedPercent.toFixed(2)),
                radiationTransmittedPercent: Number(radiationTransmittedPercent.toFixed(2)),
                rating
            };
        }
    },

    // ------------------------------------------------------------------------
    // 2. FISIOLOGÍA HÍDRICA: AUTONOMÍA, RACIONAMIENTO Y POTABILIZACIÓN
    // ------------------------------------------------------------------------
    water: {
        /**
         * Calcula el consumo biológico mínimo de agua para confinamiento en crisis
         * @param {Array} members - Lista de integrantes { role: 'adulto'|'nino'|'bebe'|'mayor'|'mascota', weightKg: number }
         * @param {number} days - Días de confinamiento proyectados
         * @param {string} climate - 'templado' | 'calor_moderado' | 'calor_extremo'
         */
        calculateFamilyQuota(members, days = 14, climate = 'templado') {
            const climateMultipliers = {
                templado: 1.0,
                calor_moderado: 1.25,
                calor_extremo: 1.55
            };
            const mult = climateMultipliers[climate] || 1.0;

            const baseLitresPerDay = {
                adulto: 4.0,       // 2.5L bebida, 1.0L cocción liofilizada, 0.5L higiene
                mayor: 4.2,        // Mayor hidratación renal y medicación
                nino: 2.5,         // Menor masa corporal
                bebe: 1.8,         // Fórmula láctea y esterilización básica
                mascota: 1.2       // Perro mediano / gato (hidratación pura)
            };

            let dailyTotal = 0;
            const breakdown = members.map(m => {
                const base = baseLitresPerDay[m.role] || 4.0;
                const adjusted = base * mult;
                dailyTotal += adjusted;
                return {
                    role: m.role,
                    dailyLitres: Number(adjusted.toFixed(1)),
                    totalLitres: Number((adjusted * days).toFixed(1))
                };
            });

            const grandTotalLitres = dailyTotal * days;
            const jugs5L = Math.ceil(grandTotalLitres / 5);
            const jugs8L = Math.ceil(grandTotalLitres / 8);

            // Requerimientos de desinfección química (Lejía apta para consumo / Cloro 5%)
            // 2 gotas por litro de agua clara = ~0.1 ml por litro
            const bleachDrops = Math.round(grandTotalLitres * 2);
            const bleachMillilitres = Number((bleachDrops / 20).toFixed(1)); // 20 gotas = 1 ml

            return {
                membersCount: members.length,
                days,
                climate,
                dailyTotalLitres: Number(dailyTotal.toFixed(1)),
                grandTotalLitres: Number(grandTotalLitres.toFixed(1)),
                jugs5L,
                jugs8L,
                disinfection: {
                    bleachDropsTotal: bleachDrops,
                    bleachMlTotal: bleachMillilitres,
                    boilingMinutesRecommended: 1, // 1 min continuo a borbotones
                    boilingMinutesHighAltitude: 3  // > 2000m sobre nivel del mar
                },
                breakdown
            };
        }
    },

    // ------------------------------------------------------------------------
    // 3. ERGONOMÍA DE MARCHA: LÍMITES DE LA MOCHILA DE 72 HORAS
    // ------------------------------------------------------------------------
    ergonomics: {
        /**
         * Evalúa si el peso de la mochila es viable para una marcha táctica de 20 minutos
         * @param {number} userBodyWeightKg - Peso corporal del usuario
         * @param {number} packWeightKg - Peso total de la mochila equipada
         */
        evaluatePackWeight(userBodyWeightKg, packWeightKg) {
            const optimalWeight = userBodyWeightKg * 0.15; // 15% peso corporal
            const maximumWeight = userBodyWeightKg * 0.20; // 20% peso corporal límite fisiológico
            const currentPercentage = (packWeightKg / userBodyWeightKg) * 100;

            let status = 'OPTIMO';
            let verdict = 'Peso perfectamente equilibrado para marcha sostenida.';

            if (packWeightKg > maximumWeight) {
                status = 'PELIGROSO';
                verdict = `Sobrecarga severa (${currentPercentage.toFixed(1)}% de tu peso). Te agotará en menos de 15 minutos de marcha forzada. Debes purgar objetos de Capa 2 o 3.`;
            } else if (packWeightKg > optimalWeight) {
                status = 'LIMITE';
                verdict = `Cerca del umbral máximo (${currentPercentage.toFixed(1)}%). Aceptable solo para personas con buena condición física.`;
            }

            return {
                userBodyWeightKg,
                packWeightKg,
                currentPercentage: Number(currentPercentage.toFixed(1)),
                optimalWeightKg: Number(optimalWeight.toFixed(1)),
                maximumWeightKg: Number(maximumWeight.toFixed(1)),
                status,
                verdict
            };
        }
    }
};
