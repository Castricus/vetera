/**
 * ============================================================================
 * SOBERANÍA ALIMENTARIA E HIDROPONÍA PASIVA KRATKY (CERO ELECTRICIDAD)
 * kratky.js · Base de datos técnica, formulaciones minerales, especies y patología
 * ============================================================================
 * Basado en las investigaciones del Dr. Bernard A. Kratky (Universidad de Hawái)
 * y protocolos de autosuficiencia en colapso de infraestructuras críticas.
 */

export const KRATKY_SYSTEM = {
    metadata: {
        title: "Laboratorio de Soberanía Alimentaria e Hidroponía Pasiva",
        subtitle: "Cultivo continuo sin bombas, sin electricidad y sin ruido mecánico",
        authorOrigin: "Dr. Bernard A. Kratky · University of Hawaii at Manoa",
        applicability: "Aislamiento en búnker, confinamiento urbano, corte de red eléctrica prolongado (EMP/Apagón)",
        corePrinciple: "Gradiente irreversible de nivel hídrico con cámara de aire húmedo (Air Gap) para absorción simultánea de oxígeno atmosférico y nutrientes minerales."
    },

    // 1. ANATOMÍA Y MECÁNICA BIOLÓGICA DEL SISTEMA
    mechanics: {
        airGap: {
            name: "Cámara de Aire Húmedo (Air Gap)",
            description: "A medida que la planta consume la solución, el nivel desciende de forma permanente. El espacio libre que queda entre la canastilla y la superficie del líquido se satura al 100% de humedad relativa.",
            function: "Permite que las raíces superiores (raíces respiratorias) capten oxígeno directamente del aire, evitando la asfixia celular sin necesidad de aireadores mecánicos.",
            criticalRule: "NUNCA rellenar el depósito por completo una vez que la planta ha crecido. Si sumerges las raíces aéreas, la planta muere por asfixia en 24 a 48 horas."
        },
        rootZones: [
            {
                zone: "Zona Superior (Aérea)",
                location: "Primer tercio desde la base del tallo hasta la canastilla",
                morphology: "Raíces más gruesas, con vellosidades adaptadas a la absorción de gas O2",
                risk: "Desecación si la humedad relativa del contenedor baja del 85%"
            },
            {
                zone: "Zona Intermedia (Transición)",
                location: "Cámara húmeda sobre el nivel del agua",
                morphology: "Red de filamentos radiculares suspendidos en vapor saturado",
                risk: "Exposición a luz directa (genera proliferación de algas verdes)"
            },
            {
                zone: "Zona Inferior (Nutricional)",
                location: "Sumergida en el fondo del depósito",
                morphology: "Puntas radiculares jóvenes de rápido crecimiento celular",
                function: "Absorción continua de agua y minerales disueltos (N, P, K, Ca, Mg, microelementos)"
            }
        ]
    },

    // 2. RECETAS DE SALES MINERALES Y NUTRICIÓN
    nutrientFormulas: [
        {
            id: "masterblend-standard",
            name: "Fórmula Maestra de 3 Componentes (Grado Profesional)",
            target: "Hortalizas de hoja (Lechuga, Acelga, Espinaca, Albahaca, Rúcula)",
            dilutionPer10L: {
                water: "10 Litros de agua declorada (reposada 24h o filtrada)",
                part1_masterblend: {
                    name: "Base Hidropónica (4-18-38 o 5-11-26)",
                    amount: "6.0 gramos",
                    function: "Aporta fósforo, potasio y microelementos quelatados (Fe, Mn, Zn, Cu, B, Mo)"
                },
                part2_epsom: {
                    name: "Sal de Epsom (Sulfato de Magnesio heptahidratado MgSO4·7H2O)",
                    amount: "3.0 gramos",
                    function: "Aporta magnesio central para la molécula de clorofila y azufre para síntesis proteica"
                },
                part3_calcium_nitrate: {
                    name: "Nitrato de Calcio [5Ca(NO3)2·NH4NO3·10H2O] (15.5-0-0 + 19% Ca)",
                    amount: "6.0 gramos",
                    function: "Aporta nitrógeno nítrico de asimilación rápida y calcio para paredes celulares rígidas"
                }
            },
            mixingOrder: [
                "1. Disolver completamente el Masterblend (Parte 1) en agua templada.",
                "2. Añadir y disolver completamente la Sal de Epsom (Parte 2).",
                "3. Añadir el Nitrato de Calcio (Parte 3) AL FINAL.",
                "⚠️ REGLA QUÍMICA VITAL: NUNCA mezclar el Nitrato de Calcio directamente con el Masterblend o Sulfato de Magnesio en polvo o concentrado. El calcio reacciona con los sulfatos y fosfatos precipitando Sulfato de Calcio insoluble (yeso), inutilizando los nutrientes."
            ],
            targetParameters: {
                ec: "1.2 - 1.6 mS/cm",
                ppm500: "600 - 800 ppm",
                ppm700: "840 - 1120 ppm",
                ph: "5.8 - 6.3"
            }
        },
        {
            id: "emergency-diy",
            name: "Fórmula de Emergencia Táctica (Suministros Domésticos Limitados)",
            target: "Supervivencia de cultivos durante corte total de tiendas especializadas",
            components: [
                {
                    source: "Fertilizante N-P-K soluble balanceado de jardín (ej. 15-15-15 o 20-20-20)",
                    dose: "5 gramos por cada 10 Litros (usar al 50% de la dosis recomendada en etiqueta para tierra)",
                    note: "El fertilizante de tierra suele tener nitrógeno amoniacal; no exceder la dosis para evitar quemadura radicular"
                },
                {
                    source: "Cáscaras de huevo calcinadas y disueltas en vinagre (Acetato de Calcio)",
                    dose: "15 ml por 10 Litros de agua",
                    note: "Aporta calcio soluble para prevenir necrosis de bordes foliares (Tip Burn)"
                },
                {
                    source: "Sal de Epsom de farmacia (Laxante de sulfato de magnesio puro)",
                    dose: "2.5 gramos por 10 Litros",
                    note: "Aporta magnesio indispensable si las hojas muestran clorosis internervial"
                }
            ],
            targetParameters: {
                ec: "1.0 - 1.4 mS/cm",
                ph: "6.0 - 6.5"
            }
        }
    ],

    // 3. CATÁLOGO DE ESPECIES ÓPTIMAS PARA CULTIVO KRATKY
    species: [
        {
            id: "lechuga-romana",
            name: "Lechuga Romana / Mantecosa (Lactuca sativa)",
            category: "Hortaliza de Hoja",
            difficulty: "Principiante (10/10 éxito)",
            cycleDays: "30 a 45 días desde plántula a cosecha",
            waterVolumePerPlant: "3.5 a 4.0 Litros (suficiente para todo su ciclo de vida en depósito sellado)",
            phRange: "5.6 - 6.2",
            ecRange: "1.0 - 1.4 mS/cm",
            lightRequirement: "12 a 16 horas diarias (luz solar directa o LED blanco frío de 6500K)",
            caloricAndNutritionalValue: "Alta en Vitamina A, K, folato y agua biológicamente pura filtrada por la planta.",
            harvestMethod: "Cosecha continua por hojas exteriores ('Cut and Come Again') prolongando la vida productiva a 8 semanas."
        },
        {
            id: "albahaca-genovesa",
            name: "Albahaca (Ocimum basilicum)",
            category: "Hierba Aromática y Medicinal",
            difficulty: "Principiante (10/10 éxito)",
            cycleDays: "25 a 35 días para primer corte",
            waterVolumePerPlant: "2.5 a 3.0 Litros",
            phRange: "5.5 - 6.5",
            ecRange: "1.2 - 1.6 mS/cm",
            lightRequirement: "14 a 16 horas diarias",
            caloricAndNutritionalValue: "Potentes aceites esenciales antibacterianos (eugenol), antioxidantes y micronutrientes.",
            harvestMethod: "Pellizcado del tallo apical justo por encima de dos nodos foliares para inducir ramificación doble infinita."
        },
        {
            id: "acelga",
            name: "Acelga de Penca Blanca o Roja (Beta vulgaris)",
            category: "Superalimento de Resiliencia",
            difficulty: "Fácil (9/10 éxito)",
            cycleDays: "45 a 60 días",
            waterVolumePerPlant: "5.0 a 6.0 Litros",
            phRange: "6.0 - 6.8",
            ecRange: "1.6 - 2.2 mS/cm",
            lightRequirement: "10 a 14 horas diarias",
            caloricAndNutritionalValue: "Rica en hierro, magnesio, calcio y vitamina C. Gran resistencia a oscilaciones térmicas.",
            harvestMethod: "Corte de pencas exteriores respetando el corazón central."
        },
        {
            id: "cebollin",
            name: "Cebollín / Verdeo (Allium fistulosum)",
            category: "Regeneración Continua",
            difficulty: "Extrema Facilidad (10/10 éxito)",
            cycleDays: "7 a 10 días tras clonación de resto de cocina",
            waterVolumePerPlant: "1.0 Litro",
            phRange: "5.8 - 6.5",
            ecRange: "1.2 - 1.8 mS/cm",
            lightRequirement: "8 a 12 horas",
            caloricAndNutritionalValue: "Compuestos de azufre antimicrobianos, vitamina C y saborizante de alta densidad para raciones secas.",
            harvestMethod: "Corte con tijera a 3 cm de la base. Vuelve a brotar hasta 5 veces consecutivas."
        },
        {
            id: "espinaca",
            name: "Espinaca (Spinacia oleracea)",
            category: "Hortaliza de Hoja de Clima Fresco",
            difficulty: "Intermedio (requiere temperatura de solución < 22°C)",
            cycleDays: "35 a 45 días",
            waterVolumePerPlant: "3.0 a 4.0 Litros",
            phRange: "5.5 - 6.2",
            ecRange: "1.4 - 1.8 mS/cm",
            lightRequirement: "10 a 12 horas (más de 14 horas induce floración prematura/amargor)",
            caloricAndNutritionalValue: "Hierro, ácido fólico, potasio y carotenoides protectores celulares.",
            harvestMethod: "Cosecha gradual de hojas maduras."
        }
    ],

    // 4. PROTOCOLO DE REGENERACIÓN POR RESTOS DE COCINA (TOTIPOTENCIA CELULAR)
    kitchenCloningProtocols: [
        {
            plant: "Cebollín / Cebolla de Verdeo",
            source: "Base blanca con raíces descartada al cocinar",
            steps: [
                "Corta la base dejando exactamente entre 2.5 y 4.0 cm de tallo blanco.",
                "Colócala verticalmente en un vaso con 2.0 cm de agua limpia (las raíces sumergidas, el tallo emergente).",
                "Ubícalo junto a una ventana con buena iluminación natural.",
                "En 48 horas verás el cilindro verde central emerger. Cambia el agua cada 2 días.",
                "Al día 7 tendrás tallos de 15 cm listos para su primer consumo."
            ]
        },
        {
            plant: "Corazón de Lechuga Romana",
            source: "Tallo basal grueso sobrante",
            steps: [
                "Corta a 4-5 cm de la base del cogollo. Desprende las hojas exteriores marchitas.",
                "Ubica la base en un plato o cuenco plano con 1.5 cm de agua.",
                "Mantén en ambiente luminoso sin sol abrasador durante 5 días.",
                "Cuando broten hojas nuevas del centro y raíces adventicias de 2.5 cm en la base, transfiere a un sistema Kratky con solución nutritiva al 50%."
            ]
        },
        {
            plant: "Corona de Piña (Ananas comosus) - Calórica a Largo Plazo",
            source: "Penacho de hojas superior",
            steps: [
                "Retuerce la corona con la mano para separarla de la pulpa sin romper el tallo.",
                "Pela las 4 capas de hojas inferiores hasta dejar expuesto el tallo desnudo con sus nódulos de raíz latentes.",
                "Deja secar 24 horas al aire para cicatrizar y evitar hongos.",
                "Suspende en agua hasta que emita raíces de 5 cm, luego pásala a depósito o suelo."
            ]
        }
    ],

    // 5. GUÍA PASO A PASO: AUTOCONSTRUCCIÓN DE CONTENEDOR KRATKY PET (2L Y 5L)
    diyBuildGuides: [
        {
            containerType: "Botella PET de 2 Litros (Unidad Personal)",
            materials: [
                "1 Botella PET de 2 Litros transparente (de agua o refresco limpio)",
                "Cúter o tijeras robustas",
                "Trozo de esponja sintética común (para fregar vajilla) o guata de filtro",
                "Cinta aislante negra, papel aluminio o pintura oscura opaca",
                "Regla y rotulador permanente"
            ],
            steps: [
                {
                    stepNumber: 1,
                    title: "Corte Anatómico Invertido",
                    instruction: "Mide 10 cm desde la boca hacia abajo (justo donde la botella pasa de cono a cilindro). Corta horizontalmente con el cúter. Invierte la parte superior (el embudo) dentro de la base."
                },
                {
                    stepNumber: 2,
                    title: "Opacificación Estricta (Control Anti-Algas)",
                    instruction: "Cubre toda la base exterior con papel de aluminio o cinta negra para bloquear el 100% de la luz. Deja una rendija vertical de 0.5 cm sin tapar para inspeccionar el nivel del agua."
                },
                {
                    stepNumber: 3,
                    title: "Preparación del Tapón de Soporte",
                    instruction: "Corta un prisma de esponja de 3 x 3 cm. Hazle una hendidura longitudinal e inserta el tallo de la plántula sin estrangularlo. Introduce la esponja en la boquilla invertida."
                },
                {
                    stepNumber: 4,
                    title: "Llenado Inicial Calibrado",
                    instruction: "Llena la base con solución nutritiva hasta que el nivel toque apenas el fondo de la esponja (solo el 20% inferior mojado). La capilaridad mantendrá la raíz húmeda hasta que crezca hacia abajo."
                },
                {
                    stepNumber: 5,
                    title: "Régimen Pasivo Cero Toques",
                    instruction: "Coloca la unidad en la ventana. La planta consumirá el agua al mismo ritmo que expande sus raíces. En 30-40 días cosecharás una lechuga completa sin haber tocado el depósito ni gastado 1 watt de electricidad."
                }
            ]
        },
        {
            containerType: "Garrafa o Botellón de 5 a 8 Litros (Unidad Familiar Continua)",
            materials: [
                "1 Garrafa de agua mineral de 5L a 8L (polietileno / PET)",
                "Canastilla hidropónica plástica de 2 o 3 pulgadas (o vaso de plástico desechable perforado con soldador)",
                "Sustrato inerte: Arcilla expandida (arlita), perlita o fibra de coco lavada",
                "Funda opaca de bolsa plástica gruesa negra o cartón"
            ],
            steps: [
                {
                    stepNumber: 1,
                    title: "Calado de la Tapa",
                    instruction: "Corta un orificio circular en la parte superior de la garrafa con el diámetro exacto del labio de la canastilla para que encaje ajustada sin caerse al fondo."
                },
                {
                    stepNumber: 2,
                    title: "Blindaje Lumínico Total",
                    instruction: "Envuelve la garrafa con una bolsa negra o caja de cartón. Las soluciones ricas en nitrógeno expuestas a la luz crían algas en 72 horas, compitiendo por oxígeno y pudriendo las raíces."
                },
                {
                    stepNumber: 3,
                    title: "Montaje de Plántula y Solución",
                    instruction: "Vierte 4.5 Litros de solución balanceada. Coloca la plántula en la canastilla asegurada con bolitas de arlita. La solución debe mojar únicamente el tercio inferior de la canastilla."
                }
            ]
        }
    ],

    // 6. MOTOR DE DIAGNÓSTICO PATOLÓGICO DE CULTIVO HIDROPÓNICO
    diagnosticTree: [
        {
            id: "root-rot",
            symptom: "Raíces marrones, oscuras, viscosas y con olor a descomposición",
            visualCue: "Pudrición Radicular (Pythium / Anoxia)",
            cause: "Falta crítica de oxígeno en el agua o temperatura de solución superior a 25°C. Común al rellenar el depósito y sumergir las raíces aéreas.",
            immediateCorrection: "1. Enjuagar suavemente las raíces con agua limpia tibia. 2. Podar las raíces podridas con tijera desinfectada en alcohol. 3. Desinfectar el depósito con agua y unas gotas de agua oxigenada (H2O2 al 3%). 4. Rellenar solo hasta la mitad, dejando libre la zona de raíces aéreas."
        },
        {
            id: "iron-chlorosis",
            symptom: "Hojas jóvenes amarillas en la parte superior, pero los nervios principales se mantienen verdes",
            visualCue: "Clorosis Férrica por pH Alto",
            cause: "El pH de la solución ha subido por encima de 6.8 - 7.0. El hierro se precipita químicamente y la planta no puede absorberlo aunque esté presente.",
            immediateCorrection: "1. Medir pH. 2. Añadir ácido cítrico (un cuarto de cucharadita en 10L) o vinagre blanco diluido hasta restablecer el pH entre 5.8 y 6.2."
        },
        {
            id: "tip-burn",
            symptom: "Puntas y bordes de las hojas jóvenes quemadas, marrones y retorcidas",
            visualCue: "Necrosis Marginal (Tip Burn / Deficiencia de Calcio)",
            cause: "Deficiencia translocativa de Calcio por baja transpiración foliar o falta de nitrato de calcio en la solución.",
            immediateCorrection: "1. Mejorar la circulación de aire suave alrededor de las plantas. 2. Pulverizar las hojas con solución de cloruro o nitrato de calcio al 0.2% directamente para absorción foliar inmediata."
        },
        {
            id: "algae-bloom",
            symptom: "Capa verdosa en las paredes del frasco, en la esponja o en el agua",
            visualCue: "Proliferación de Algas Unicelulares",
            cause: "Fisura en el blindaje opaco del contenedor. La luz solar entra en contacto con el nitrógeno y fósforo del agua.",
            immediateCorrection: "1. Las algas no matan a la planta de inmediato, pero consumen oxígeno nocturno y desequilibran el pH. 2. Cambiar la solución y forrar herméticamente el exterior del depósito con material 100% opaco."
        },
        {
            id: "nitrogen-burn",
            symptom: "Hojas verde oscuro intenso, curvadas hacia abajo en forma de 'garra', puntas secas",
            visualCue: "Toxicidad por Exceso de Sales / Nitrógeno",
            cause: "Electroconductividad (EC) demasiado alta. Solución excesivamente concentrada por evaporación de agua.",
            immediateCorrection: "1. Diluir el depósito añadiendo agua pura declorada al 30-50% del volumen restante para reducir la conductividad eléctrica a menos de 1.4 mS/cm."
        }
    ]
};
