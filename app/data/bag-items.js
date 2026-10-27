export const BAG_PROFILES = [
    {
        id: "adulto",
        name: "Adulto",
        icon: "👤",
        maxWeight: "8 - 10 kg (15% peso corporal)",
        layers: [
            {
                number: 1,
                title: "Capa 1: Protege Ahora (Inmediato)",
                desc: "Ropa, iluminación y protección física para los primeros 20 minutos de marcha.",
                color: "#10b981",
                items: [
                    { id: "ad_c1_ropa", label: "Ropa resistente de recambio (manga larga, fibras naturales)", critical: true },
                    { id: "ad_c1_calzado", label: "Calzado robusto de trekking/deportivo ya usado", critical: true },
                    { id: "ad_c1_impermeable", label: "Poncho impermeable o chubasquero ligero", critical: false },
                    { id: "ad_c1_linterna", label: "Linterna frontal LED + pilas de repuesto", critical: true },
                    { id: "ad_c1_navaja", label: "Navaja multiusos o multiherramienta", critical: false },
                    { id: "ad_c1_botiquin", label: "Botiquín individual de bolsillo (gasas, apósitos, analgésicos)", critical: true },
                    { id: "ad_c1_mascarilla", label: "Mascarilla FFP2/N95 y gafas protectoras de trabajo", critical: true },
                    { id: "ad_c1_silbato", label: "Silbato de emergencia sin bola", critical: false }
                ]
            },
            {
                number: 2,
                title: "Capa 2: Sostiene 72 Horas (Autonomía)",
                desc: "Agua, calorías y refugio térmico para sobrevivir 3 días sin asistencia.",
                color: "#3b82f6",
                items: [
                    { id: "ad_c2_agua", label: "Agua potable en envase flexible / cantimplora (2 a 3 litros)", critical: true },
                    { id: "ad_c2_filtro", label: "Filtro portátil de agua (Sawyer Mini) o pastillas de cloro", critical: true },
                    { id: "ad_c2_comida", label: "Alimentos calóricos sin cocción (barritas, frutos secos, chocolate)", critical: true },
                    { id: "ad_c2_manta", label: "Manta térmica aluminizada de emergencia (x2)", critical: true },
                    { id: "ad_c2_fuego", label: "Mechero anti-viento / cerillas impermeables", critical: false },
                    { id: "ad_c2_bolsa", label: "Bolsa de basura grande y resistente (aislante/poncho)", critical: false },
                    { id: "ad_c2_higiene", label: "Toallitas húmedas y gel desinfectante de manos", critical: false }
                ]
            },
            {
                number: 3,
                title: "Capa 3: Reconstruye Después (Documentos)",
                desc: "Recuperación post-evacuación, efectivo, comunicaciones y energía.",
                color: "#f59e0b",
                items: [
                    { id: "ad_c3_docs", label: "Copia de documentos (DNI, seguros, escrituras) en bolsa estanca o USB cifrado", critical: true },
                    { id: "ad_c3_dinero", label: "Dinero en efectivo fraccionado (5€, 10€, 20€)", critical: true },
                    { id: "ad_c3_cuaderno", label: "Libreta pequeña y bolígrafo con teléfonos clave anotados", critical: false },
                    { id: "ad_c3_powerbank", label: "Powerbank cargado (10.000-20.000 mAh) + cable de móvil", critical: true },
                    { id: "ad_c3_radio", label: "Radio compacta AM/FM a pilas para alertas oficiales", critical: true }
                ]
            }
        ]
    },
    {
        id: "bebe_nino",
        name: "Bebé / Niño",
        icon: "👶",
        maxWeight: "Mochila propia muy ligera (1-2 kg) o en mochila de padres",
        layers: [
            {
                number: 1,
                title: "Capa 1: Confort y Protección Inmediata",
                desc: "Abrigo, calzado y sujeción emocional.",
                color: "#10b981",
                items: [
                    { id: "bb_c1_muda", label: "2 mudas completas de ropa de abrigo", critical: true },
                    { id: "bb_c1_gorro", label: "Gorro térmico y calcetines gruesos", critical: true },
                    { id: "bb_c1_apego", label: "Juguete pequeño de apego / peluche para calmar ansiedad", critical: false },
                    { id: "bb_c1_id", label: "Tarjeta con nombre, grupo sanguíneo y teléfonos cosida a la ropa", critical: true }
                ]
            },
            {
                number: 2,
                title: "Capa 2: Alimentación e Higiene 72 Horas",
                desc: "Nutrición especializada y control de pañales.",
                color: "#3b82f6",
                items: [
                    { id: "bb_c2_leche", label: "Leche de fórmula en polvo / potitos listos para comer (3 días)", critical: true },
                    { id: "bb_c2_biberon", label: "Biberón o vaso antiderrame + cuchara", critical: true },
                    { id: "bb_c2_panales", label: "Pañales para 3 días (mínimo 15-18 unidades)", critical: true },
                    { id: "bb_c2_toallitas", label: "Paquete grande de toallitas húmedas hipoalergénicas", critical: true },
                    { id: "bb_c2_crema", label: "Crema para rozaduras y jabón infantil", critical: false }
                ]
            },
            {
                number: 3,
                title: "Capa 3: Salud y Documentación Pediátrica",
                desc: "Libro de vacunación y medicinas pediátricas.",
                color: "#f59e0b",
                items: [
                    { id: "bb_c3_meds", label: "Paracetamol / Ibuprofeno pediátrico con dosificador", critical: true },
                    { id: "bb_c3_vacunas", label: "Copia de cartilla de vacunación y tarjeta sanitaria", critical: true },
                    { id: "bb_c3_chupete", label: "Chupete de repuesto y baberos desechables", critical: false }
                ]
            }
        ]
    },
    {
        id: "mayor_cronico",
        name: "Adulto Mayor / Medicación Crónica",
        icon: "👵",
        maxWeight: "Máximo 4 - 6 kg (según capacidad física)",
        layers: [
            {
                number: 1,
                title: "Capa 1: Movilidad y Visión",
                desc: "Garantizar desplazamiento seguro y visión clara.",
                color: "#10b981",
                items: [
                    { id: "my_c1_gafas", label: "Gafas graduadas de repuesto en estuche rígido", critical: true },
                    { id: "my_c1_baston", label: "Bastón plegable o apoyo para caminar", critical: false },
                    { id: "my_c1_audifono", label: "Audífono + blíster de pilas de repuesto", critical: true },
                    { id: "my_c1_abrigo", label: "Chaqueta térmica de fácil colocación (cremallera grande)", critical: true }
                ]
            },
            {
                number: 2,
                title: "Capa 2: Continuidad de Tratamientos Vitales (7 Días)",
                desc: "Medicamentos de prescripción ininterrumpida.",
                color: "#3b82f6",
                items: [
                    { id: "my_c2_pastillero", label: "Pastillero semanal con dosis exactas preparadas", critical: true },
                    { id: "my_c2_insulina", label: "Insulina / Inyectables en estuche térmico isotérmico", critical: true },
                    { id: "my_c2_inhalador", label: "Inhaladores de rescate / medicación pulmonar", critical: true },
                    { id: "my_c2_tensio", label: "Tensiómetro o glucómetro portátil si es dependiente", critical: false }
                ]
            },
            {
                number: 3,
                title: "Capa 3: Historial Clínico y Contactos Médicos",
                desc: "Información clave para equipos de urgencias y rescate.",
                color: "#f59e0b",
                items: [
                    { id: "my_c3_informes", label: "Informe médico actualizado con patologías y alergias", critical: true },
                    { id: "my_c3_recetas", label: "Copia impresa del plan terapéutico oficial", critical: true },
                    { id: "my_c3_alimentos", label: "Alimentos adaptados si tiene problemas de deglución", critical: false }
                ]
            }
        ]
    },
    {
        id: "mascota",
        name: "Mascota (Perro / Gato)",
        icon: "🐕",
        maxWeight: "2 - 3 kg (en mochila propia para perro o bolsa de transporte)",
        layers: [
            {
                number: 1,
                title: "Capa 1: Seguridad y Retención Inmediata",
                desc: "Evitar escapes por pánico ante ruidos fuertes.",
                color: "#10b981",
                items: [
                    { id: "ms_c1_arnes", label: "Arnés resistente y correa fija (no extensible)", critical: true },
                    { id: "ms_c1_bozal", label: "Bozal de tela (obligatorio en transporte público de evacuación)", critical: true },
                    { id: "ms_c1_placa", label: "Collar con chapa identificativa y teléfono legible", critical: true }
                ]
            },
            {
                number: 2,
                title: "Capa 2: Alimento y Agua 72 Horas",
                desc: "Raciones secas y recipientes plegables.",
                color: "#3b82f6",
                items: [
                    { id: "ms_c2_pienso", label: "Pienso seco para 3 días en bolsas zip herméticas", critical: true },
                    { id: "ms_c2_bebedero", label: "Comedero y bebedero plegable de silicona", critical: true },
                    { id: "ms_c2_agua", label: "1.5 litros de agua adicionales reservados para la mascota", critical: true },
                    { id: "ms_c2_bolsitas", label: "Rollo de bolsas para recoger excrementos / arenero portátil", critical: false }
                ]
            },
            {
                number: 3,
                title: "Capa 3: Sanidad y Documentación Animal",
                desc: "Pasaporte veterinario y medicación antiparasitaria.",
                color: "#f59e0b",
                items: [
                    { id: "ms_c3_pasaporte", label: "Cartilla veterinaria con vacunas al día y número de microchip", critical: true },
                    { id: "ms_c3_meds", label: "Medicación veterinaria crónica si la requiere", critical: true },
                    { id: "ms_c3_toalla", label: "Toalla pequeña para secar patas y pelo", critical: false }
                ]
            }
        ]
    }
];
