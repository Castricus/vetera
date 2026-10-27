/**
 * ============================================================================
 * BASE DE DATOS DE LA FASE 0: LOS PRIMEROS 90 SEGUNDOS
 * phase0-threats.js · Taxonomía Oficial de Protección Civil Universal
 * 4 Columnas · 16 Escenarios · 3 Ventanas Temporales Críticas
 * ============================================================================
 */

export const THREAT_COLUMNS = [
    {
        id: 'geologicas',
        title: 'Geológicas y Tectónicas',
        shortTitle: 'Geológicas',
        subtitle: 'Corteza y Dinámica Terrestre',
        color: '#f97316', // Naranja tierra / ámbar
        accentBg: 'rgba(249, 115, 22, 0.1)',
        borderColor: 'rgba(249, 115, 22, 0.4)',
        icon: '🌋',
        threatCount: 4
    },
    {
        id: 'climaticas',
        title: 'Climáticas e Hídricas',
        shortTitle: 'Climáticas',
        subtitle: 'Atmósfera y Dinámica del Agua',
        color: '#38bdf8', // Azul celeste agua
        accentBg: 'rgba(56, 189, 248, 0.1)',
        borderColor: 'rgba(56, 189, 248, 0.4)',
        icon: '🌊',
        threatCount: 4
    },
    {
        id: 'tecnologicas',
        title: 'Tecnológicas y de Red',
        shortTitle: 'Tecnológicas',
        subtitle: 'Infraestructura Crítica y Doméstica',
        color: '#facc15', // Amarillo advertencia
        accentBg: 'rgba(250, 204, 21, 0.1)',
        borderColor: 'rgba(250, 204, 21, 0.4)',
        icon: '⚡',
        threatCount: 4
    },
    {
        id: 'radiologicas',
        title: 'Radiológicas y Bélicas',
        shortTitle: 'Radiológicas',
        subtitle: 'Armas de Destrucción y Colapso Civil',
        color: '#ef4444', // Rojo radiológico
        accentBg: 'rgba(239, 68, 68, 0.12)',
        borderColor: 'rgba(239, 68, 68, 0.45)',
        icon: '☢️',
        threatCount: 4
    }
];

export const PHASE_0_THREATS = [
    // ========================================================================
    // COLUMNA 1: GEOLÓGICAS Y TECTÓNICAS
    // ========================================================================
    {
        id: '1.1-sismo',
        columnId: 'geologicas',
        code: 'GEO-01',
        title: 'Sismo / Terremoto Mayor',
        icon: '🏚️',
        vector: 'Ondas sísmicas P y S, cizallamiento y colapso de elementos no estructurales.',
        defaultDecision: 'QUEDARSE (DURANTE EL SISMO)',
        decisionType: 'confinamiento', // 'confinamiento' | 'evacuacion'
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Tirarse al suelo inmediatamente. Agacharse, cubrirse bajo un mueble pesado o mesa sólida y sujetarse firmemente con ambas manos a las patas.',
                posture: 'Espalda a ventanales. Rodillas al pecho, cabeza protegida entre los brazos.',
                byLocation: {
                    casa: 'Bajo mesa de comedor sólida o cama. Lejos de librerías altas, vitrinas y ventanas.',
                    coche: 'Frenar suavemente a la derecha, lejos de puentes, pasos elevados o postes. Permanecer dentro con freno de mano puesto.',
                    trabajo: 'Bajo escritorio firme. Alejarse de muros cortina de cristal y techos técnicos suspendidos.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'MANTENERSE EN EL LUGAR hasta que el movimiento principal cese por completo. No intentar salir.',
                rationale: 'El 80% de las muertes y amputaciones se producen al intentar cruzar umbrales o correr a la calle durante el temblor por caída de mampostería, cristales y cables.',
                byLocation: {
                    casa: 'Permanecer cubierto. Vigilar grietas en muros de carga (las diagonales en X indican daño estructural severo).',
                    coche: 'No descender del vehículo. La carrocería absorbe impactos de cables y cascotes menores.',
                    trabajo: 'Evitar el pánico masivo. No dirigirse a pasillos comunes ni puertas de salida mientras continúe el movimiento.'
                }
            },
            t60_90: {
                title: '60 - 90s: Aseguramiento y Salida Post-Sismo',
                action: 'Al cesar el movimiento: cerrar llave de paso de gas. Si hay olor a gas, NO tocar interruptores eléctricos. Ponerse calzado con suela gruesa antes de dar un solo paso.',
                preparation: 'Tomar la Mochila de 72h ubicada junto a la salida. Evacuar por escaleras (NUNCA ascensor). Alertar a vecinos.',
                bridgePhase1: 'Evacuación a Zona Abierta Segura (Punto de Encuentro). Despliegue de Mochila 72h y evaluación de réplicas.'
            }
        },
        fatalMistakes: [
            'Correr hacia la calle durante el movimiento sísmico.',
            'Refugiarse bajo el marco de una puerta moderna (en construcciones modernas los marcos de pladur o madera no son estructurales).',
            'Utilizar el ascensor o quedar atrapado en escaleras comunitarias saturadas.',
            'Encender cerillas o encendedores inmediatamente después del sismo (riesgo de explosión por tuberías de gas fracturadas).'
        ]
    },
    {
        id: '1.2-tsunami',
        columnId: 'geologicas',
        code: 'GEO-02',
        title: 'Tsunami / Maremoto Costero',
        icon: '🌊',
        vector: 'Serie de ondas oceánicas de gran longitud; masa de agua incompresible con escombros.',
        defaultDecision: 'EVACUACIÓN VERTICAL / COTA ALTA INMEDIATA',
        decisionType: 'evacuacion',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Si sientes un temblor fuerte en la costa o ves que el mar se retira anómalamente: CARRERA INMEDIATA.',
                posture: 'Movimiento a pie rápido perpendicular a la línea de costa hacia terreno elevado.',
                byLocation: {
                    casa: 'No empaquetar nada. Tomar mochila de emergencia si está a 3 metros y salir corriendo.',
                    coche: 'Si hay tráfico, ABANDONAR EL COCHE a pie. Los embotellamientos son trampas mortales.',
                    trabajo: 'Iniciar evacuación vertical inmediata (piso 4 o superior) si no hay colina cercana a menos de 5 minutos.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'EVACUAR HACIA COTA SUPERIOR A 30 METROS sobre el nivel del mar o al menos 2 km tierra adentro.',
                rationale: 'La primera ola puede llegar en menos de 10 minutos tras el sismo submarino; la segunda y tercera ola suelen ser aún más devastadoras y cargadas de restos destructivos.',
                byLocation: {
                    casa: 'Ruta peatonal predeterminada cuesta arriba. No intentar sacar el automóvil del garaje.',
                    coche: 'Correr a pie hacia las cotas topográficas marcadas en el plan familiar.',
                    trabajo: 'Subir a la azotea o plantas más altas de edificios de hormigón armado si no hay tiempo de alcanzar una colina.'
                }
            },
            t60_90: {
                title: '60 - 90s: Aseguramiento y Radio',
                action: 'Alcanzar posición de seguridad en altura y no regresar jamás a la orilla a filmar o rescatar pertenencias.',
                preparation: 'Encender radio de emergencia para sintonizar partes de la armada/protección civil sobre trenes de olas sucesivas.',
                bridgePhase1: 'Establecimiento en Punto Seguro de Cota Alta. Monitoreo de alertas marítimas durante las siguientes 24-48 horas.'
            }
        },
        fatalMistakes: [
            'Bajar a la playa o muelle a observar el lecho marino expuesto por la retirada del mar.',
            'Intentar huir en automóvil por avenidas costeras colapsadas.',
            'Regresar a la zona baja tras el paso de la primera ola (el tren de olas dura horas).',
            'Confiar en estructuras de madera o mampostería simple en primera línea de costa.'
        ]
    },
    {
        id: '1.3-volcan',
        columnId: 'geologicas',
        code: 'GEO-03',
        title: 'Erupción Volcánica y Lluvia de Cenizas',
        icon: '🌋',
        vector: 'Caída piroclástica, ceniza vítrea abrasiva y emisión de gases sulfurosos densos.',
        defaultDecision: 'CONFINAMIENTO Y SELLADO HERMÉTICO',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Cubrir vías respiratorias de inmediato con mascarilla FFP2/FFP3 o pañuelo húmedo doblado en 4 capas.',
                posture: 'Refugio bajo techo rígido. Proteger ojos con gafas estancas o de natación/laboratorio.',
                byLocation: {
                    casa: 'Cerrar puertas y ventanas de golpe. Retirar a niños y mascotas al interior.',
                    coche: 'Detener el vehículo si la nube oscurece la visibilidad. Cerrar ventilación externa.',
                    trabajo: 'Ingresar a zonas interiores lejos de claraboyas o techos de chapa ligera.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'QUEDARSE EN INTERIORES. No intentar conducir a menos que esté en zona de flujo piroclástico directo.',
                rationale: 'La ceniza volcánica está formada por fragmentos microscópicos de vidrio volcánico; destruye los filtros de motor en minutos y causa silicosis pulmonar aguda.',
                byLocation: {
                    casa: 'Sellar rendijas de puertas y ventanas con toallas húmedas o cinta adhesiva.',
                    coche: 'No encender limpiaparabrisas (la ceniza raya y opaca el cristal al instante).',
                    trabajo: 'Apagar sistemas de aire acondicionado central que tomen aire exterior.'
                }
            },
            t60_90: {
                title: '60 - 90s: Aseguramiento de Techos y Agua',
                action: 'Cubrir depósitos de agua potable y canalones para evitar acumulación y contaminación tóxica con flúor/azufre.',
                preparation: 'Reunir linternas (la lluvia de ceniza produce oscuridad total al mediodía).',
                bridgePhase1: 'Activación del protocolo de racionamiento de agua almacenada y monitoreo de peso de ceniza sobre tejados.'
            }
        },
        fatalMistakes: [
            'Respirar sin filtro mecánico en medio de la nube de ceniza.',
            'Frotarse los ojos si entra ceniza (causa abrasión corneal severa).',
            'Conducir a alta velocidad durante la precipitación de ceniza.',
            'Dejar que se acumulen más de 10 cm de ceniza húmeda en techos ligeros sin apuntalar.'
        ]
    },
    {
        id: '1.4-alud',
        columnId: 'geologicas',
        code: 'GEO-04',
        title: 'Deslizamiento de Tierra / Alud',
        icon: '⛰️',
        vector: 'Masa de roca, lodo y tierra en licuefacción con alta energía cinética y empuje hidrostático.',
        defaultDecision: 'EVACUACIÓN LATERAL PERPENDICULAR',
        decisionType: 'evacuacion',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Escuchar el estruendo (similar a un tren de carga). Correr LATERALMENTE fuera del cono de descarga.',
                posture: 'Movimiento perpendicular a la trayectoria. No correr en la misma línea de bajada del flujo.',
                byLocation: {
                    casa: 'Si el flujo golpea la casa: ganar plantas altas o saltar fuera lateralmente si hay ruta despejada.',
                    coche: 'Girar en U o retroceder de inmediato. No intentar atravesar zonas con desprendimientos.',
                    trabajo: 'Evacuar lateralmente hacia zonas con roca firme o vegetación profunda arraigada.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'SALIR DE LA ZONA BAJA DE CUENCA. Ganar terreno en salientes rocosos estables.',
                rationale: 'Las casas de construcción estándar colapsan y son arrastradas por flujos de detritos que superan los 40 km/h.',
                byLocation: {
                    casa: 'Si estás atrapado dentro: colocarse en posición fetal protegiendo la cabeza bajo un mueble macizo.',
                    coche: 'Abandonar el vehículo si queda atrapado en el flujo y subir a pie por la pendiente lateral.',
                    trabajo: 'Guiar al personal hacia el ala del edificio opuesta a la montaña o ladera inestable.'
                }
            },
            t60_90: {
                title: '60 - 90s: Aseguramiento de Líneas Eléctricas',
                action: 'Evitar postes y cables caídos (peligro extremo de electrocución en terreno húmedo o lodoso).',
                preparation: 'Comprobar presencia de todos los familiares en el punto alto.',
                bridgePhase1: 'Reagrupamiento en zona geológicamente estable fuera de zonas de descompresión de laderas.'
            }
        },
        fatalMistakes: [
            'Correr ladera abajo intentando ganar en velocidad al flujo.',
            'Refugiarse en el sótano o planta baja en el lado que da a la montaña.',
            'Cruzar puentes que cruzan quebradas o ríos durante el desprendimiento.',
            'Acercarse al borde de la fractura del terreno para tomar fotos.'
        ]
    },

    // ========================================================================
    // COLUMNA 2: CLIMÁTICAS E HÍDRICAS
    // ========================================================================
    {
        id: '2.1-inundacion',
        columnId: 'climaticas',
        code: 'CLI-01',
        title: 'Inundación Repentina / Riada / DANA',
        icon: '🌊',
        vector: 'Avenida torrencial de agua con arrastre de sedimentos, coches y pérdida de tracción.',
        defaultDecision: 'EVACUACIÓN VERTICAL (GANAR ALTURA)',
        decisionType: 'evacuacion',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Si estás en coche y el agua llega al centro de la rueda: ABANDONAR EL VEHÍCULO DE INMEDIATO.',
                posture: 'Subir al techo del coche o saltar hacia bordes altos con asidero firme.',
                byLocation: {
                    casa: 'No bajar a sótanos o garajes bajo ninguna circunstancia. Subir a primera planta o azotea.',
                    coche: 'Desabrochar cinturón, bajar ventanilla eléctrica ya (antes de que falle la batería) y salir al capó/techo.',
                    trabajo: 'Moverse hacia las plantas superiores. Cortar ascensores en el rellano superior.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'GANAR ALTURA VERTICAL. No intentar cruzar a pie corrientes que superen los 15 cm de profundidad.',
                rationale: 'Quince centímetros de agua corriente con fuerza derriban a un adulto; treinta centímetros arrastran a la mayoría de automóviles familiares.',
                byLocation: {
                    casa: 'Subir botiquín, mochila de emergencia, agua y linternas a la planta más alta.',
                    coche: 'Si el coche empieza a flotar, salir por la ventanilla hacia el techo y gritar por auxilio.',
                    trabajo: 'Evitar que compañeros intenten salir al aparcamiento o sótano.'
                }
            },
            t60_90: {
                title: '60 - 90s: Desconexión Eléctrica y Balizamiento',
                action: 'Cortar el interruptor general de luz si el cuadro no está sumergido. Si el suelo está encharcado cerca del cuadro, NO tocarlo.',
                preparation: 'Hacer señales visibles desde la azotea o ventana alta con linterna o ropa reflectante.',
                bridgePhase1: 'Supervivencia en cota alta/azotea durante 72h con agua embotellada y radio hasta rescate de bomberos.'
            }
        },
        fatalMistakes: [
            'Bajar al garaje subterráneo a sacar el coche cuando empieza a entrar agua.',
            'Intentar vadear carreteras inundadas confiando en la tracción de un todoterreno o 4x4.',
            'Tocar aparatos eléctricos con los pies dentro del agua.',
            'Nadar en corrientes de agua marrón (llenas de tapas de alcantarilla levantadas, clavos y escombros).'
        ]
    },
    {
        id: '2.2-incendio-forestal',
        columnId: 'climaticas',
        code: 'CLI-02',
        title: 'Incendio Forestal de Avance Rápido',
        icon: '🔥',
        vector: 'Radiación infrarroja de alta intensidad, lluvia de pavesas incandescentes y asfixia por humo.',
        defaultDecision: 'EVACUACIÓN RÁPIDA O REFUGIO CERRADO EXTREMO',
        decisionType: 'evacuacion',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Evaluar dirección del viento y frente de llamas. Si hay ruta asfaltada despejada: evacuar YA.',
                posture: 'Ropa 100% algodón o lana (NUNCA fibras sintéticas que se funden con la piel). Calzado de cuero cerrado.',
                byLocation: {
                    casa: 'Cerrar todas las ventanas, persianas metálicas y puertas de la casa para evitar entrada de pavesas.',
                    coche: 'Encender luces de cruce y emergencia. Conducir a velocidad moderada con recirculación de aire interior.',
                    trabajo: 'Reunir personal en zona despejada de hormigón lejos de setos de cipreses o pinos.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'Si la carretera está cortada: REFUGIO INTERIOR ESTRICTO. Una casa de obra resiste el paso del frente de fuego.',
                rationale: 'El frente de llamas pasa en 10-20 minutos. Huir a pie a campo abierto o quedar atrapado en el coche entre el humo es fatal.',
                byLocation: {
                    casa: 'Retirar cortinas inflamables de ventanas. Llenar bañeras y lavabos de agua para apagar pequeñas pavesas.',
                    coche: 'Si queda rodeado por fuego: parar en claro sin vegetación, cerrar ventanillas, motor encendido con A/C en recirculación.',
                    trabajo: 'Asegurar mangueras de incendios en el perímetro interior.'
                }
            },
            t60_90: {
                title: '60 - 90s: Humedecimiento y Punto Seguro',
                action: 'Mojar toallas y colocarlas en las rendijas inferiores de puertas. Colocarse mascarilla FFP2 húmeda.',
                preparation: 'Permanecer agachados en la habitación más alejada del frente de avance del fuego.',
                bridgePhase1: 'Gestión post-frente de fuego: sofocar rescoldos domésticos y monitorear aire tóxico exterior.'
            }
        },
        fatalMistakes: [
            'Intentar huir a pie cuesta arriba (el fuego sube pendientes el triple de rápido que en llano).',
            'Vestir prendas sintéticas como forros polares o nylon (se adhieren a la carne con el calor radiante).',
            'Quedarse en el jardín intentando apagar un frente forestal de 15 metros con una manguera de jardín.',
            'Abrir puertas cuando el frente de fuego está pasando por delante.'
        ]
    },
    {
        id: '2.3-huracan',
        columnId: 'climaticas',
        code: 'CLI-03',
        title: 'Huracán / Tornado / Vendaval Extremo',
        icon: '🌪️',
        vector: 'Vientos de más de 180 km/h, proyectiles balísticos de escombros y despresurización súbita.',
        defaultDecision: 'REFUGIO EN HABITACIÓN CIEGA INTERIOR',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Moverse de inmediato a la habitación más interior de la vivienda sin ventanas exteriores (baño, vestidor, pasillo ciego).',
                posture: 'Cuerpo en el suelo, cubrirse con un colchón pesado, manta ignífuga o almohadas gruesas.',
                byLocation: {
                    casa: 'Meterse dentro de la bañera de porcelana/hierro si el baño es interior y cubrirse con un colchón.',
                    coche: 'ABANDONAR EL COCHE. Buscar zanja baja en el terreno, tenderse boca abajo y cubrir la cabeza con las manos.',
                    trabajo: 'Corredores centrales interiores, sótano o escaleras de hormigón. Lejos de vestíbulos con cristaleras.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'CONFINAMIENTO EN NÚCLEO RÍGIDO. No asomarse a mirar bajo ningún pretexto.',
                rationale: 'El 90% de los impactos fatales en huracanes y tornados provienen de ramas, tejas y láminas metálicas volando como proyectiles a 200 km/h.',
                byLocation: {
                    casa: 'Mantener todas las puertas interiores cerradas para compartimentar la presión del aire.',
                    coche: 'Nunca intentar ganar en carrera a un tornado en coche en zonas urbanas o de tráfico.',
                    trabajo: 'Asegurarse de que nadie use puertas giratorias ni permanezca bajo lucernarios.'
                }
            },
            t60_90: {
                title: '60 - 90s: Casco y Protección Craneal',
                action: 'Ponerse casco de moto, bicicleta o construcción a todos los miembros de la familia.',
                preparation: 'Llevar consigo teléfono móvil con linterna y radio portátil sintonizada.',
                bridgePhase1: 'Mantenimiento del confinamiento en núcleo interior durante el paso del ojo del huracán (no salir en la calma falsa).'
            }
        },
        fatalMistakes: [
            'Abrir ventanas para "igualar la presión" (mito desmentido: solo permite que el viento arranque el techo desde dentro).',
            'Refugiarse bajo puentes o pasos elevados de autopista (hacen efecto túnel de viento acelerando escombros).',
            'Asomarse a balcones o ventanas para grabar vídeos con el móvil.',
            'Salir al exterior durante el paso del "ojo" pensando que la tormenta ya terminó.'
        ]
    },
    {
        id: '2.4-frio-polar',
        columnId: 'climaticas',
        code: 'CLI-04',
        title: 'Tormenta de Nieve / Ola de Frío Polar',
        icon: '❄️',
        vector: 'Temperaturas bajo cero severas, ventisca con visibilidad cero y colapso de calefacción.',
        defaultDecision: 'MICRO-CONFINAMIENTO TÉRMICO',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Ponerse ropa en capas: capa base transpirable, capa térmica intermedia y capa exterior cortavientos.',
                posture: 'Mantener extremidades cubiertas (gorro térmico en la cabeza: se pierde hasta un 30% del calor por el cráneo).',
                byLocation: {
                    casa: 'Reunir a toda la familia en una sola habitación pequeña con menos muros al exterior.',
                    coche: 'Permanecer dentro del vehículo. No aventurarse a pie en medio de la ventisca blanca.',
                    trabajo: 'Cerrar accesos a alas del edificio no utilizadas para conservar temperatura en un punto central.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'CREAR UNA ZONA TÉRMICA COMPACTA (tienda de campaña dentro del salón o fuerte de mantas sobre mesa).',
                rationale: 'Calentar 100 m² sin energía es inviable; mantener 6 m² a 18°C con el propio calor metabólico de 3 personas es perfectamente sostenible.',
                byLocation: {
                    casa: 'Colocar toallas en rendijas de puertas. Cerrar persianas exteriores para crear cámara de aire aislante.',
                    coche: 'Comprobar que el tubo de escape esté libre de nieve antes de encender el motor 10 minutos cada hora.',
                    trabajo: 'Sellar entradas de aire y reunir mantas o ropa de abrigo corporativa.'
                }
            },
            t60_90: {
                title: '60 - 90s: Prevención de Tuberías Congeladas',
                action: 'Abrir grifos en un leve goteo constante para evitar la congelación y rotura de tuberías de agua potable.',
                preparation: 'Llenar termos con agua caliente mientras el termo eléctrico o caldera aún conserve inercia térmica.',
                bridgePhase1: 'Protocolo de preservación térmica de 72 horas y racionamiento de calorías de alta densidad.'
            }
        },
        fatalMistakes: [
            'Encender braseros de carbón vegetal, barbacoas o generadores dentro de la vivienda (muerte silenciosa por CO).',
            'Sudar por exceso de actividad física (el sudor moja la ropa base y acelera la hipotermia mortal).',
            'Salir del vehículo durante una ventisca blanca (se pierde la orientación a menos de 5 metros del coche).',
            'Beber alcohol para "entrar en calor" (provoca vasodilatación periférica y acelera la caída de la temperatura interna).'
        ]
    },

    // ========================================================================
    // COLUMNA 3: TECNOLÓGICAS Y DE RED
    // ========================================================================
    {
        id: '3.1-apagon',
        columnId: 'tecnologicas',
        code: 'TEC-01',
        title: 'Gran Apagón Sistémico / Pulso EMP',
        icon: '⚡',
        vector: 'Caída de red eléctrica de alta tensión, pérdida instantánea de telecomunicaciones y bombeo de agua.',
        defaultDecision: 'CONFINAMIENTO Y ACOPIO HÍDRICO INMEDIATO',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Mantener la calma. No confiar en el teléfono móvil. Encender linterna frontal o de mano guardada en lugar fijo.',
                posture: 'Movimiento seguro en la oscuridad. NO encender fósforos ni mecheros en los primeros segundos.',
                byLocation: {
                    casa: 'Ir directo al baño y cocina. Tomar la linterna táctica del cajón asignado.',
                    coche: 'Si los semáforos se apagan y hay vehículos detenidos: reducir velocidad y esquivar atascos hacia casa.',
                    trabajo: 'Esperar a que se activen las luces de emergencia del edificio. No usar ascensores.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'ABRIR TODOS LOS GRIFOS Y LLENAR OLLAS, BIDONES Y LA BAÑERA mientras dure la presión residual de la red.',
                rationale: 'Las estaciones de bombeo de agua municipales dependen de bombas eléctricas; al caer la red, el agua fluye por gravedad solo de 15 a 45 minutos antes de secarse por completo.',
                byLocation: {
                    casa: 'Llenar cubos, garrafas y la bañera. Tapar el desagüe herméticamente con plástico si el tapón pierde.',
                    coche: 'Llenar el depósito de combustible de inmediato si encuentras una estación con sistema manual o generador.',
                    trabajo: 'Llenar botellas individuales en las fuentes de agua filtrada del edificio.'
                }
            },
            t60_90: {
                title: '60 - 90s: Protección contra Picos y Cierre',
                action: 'Desconectar el interruptor magnetotérmico general o desenchufar ordenadores y electrodomésticos.',
                preparation: 'Encender radio portátil a pilas o manivela en la frecuencia nacional de defensa civil.',
                bridgePhase1: 'Activación del módulo de racionamiento de agua almacenada y plan de comunicación offline familiar.'
            }
        },
        fatalMistakes: [
            'Encender velas inmediatamente (riesgo de explosión si el colapso provocó roturas de gas en la zona).',
            'Abrir innecesariamente la puerta del frigorífico o congelador (cada apertura pierde 3 horas de conservación térmica).',
            'Colapsar las líneas celulares haciendo llamadas de pánico (agota la batería del móvil sin lograr conexión).',
            'Salir a la calle a curiosear en medio del tráfico descontrolado sin semáforos.'
        ]
    },
    {
        id: '3.2-incendio-casa',
        columnId: 'tecnologicas',
        code: 'CLI-02',
        title: 'Incendio Doméstico / Estructural',
        icon: '🚒',
        vector: 'Llamas directas, humo con cianuro de hidrógeno y monóxido de carbono a más de 300°C.',
        defaultDecision: 'EVACUACIÓN INMEDIATA BAJO NIVEL DE HUMO',
        decisionType: 'evacuacion',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'TIRARSE AL SUELO DE INMEDIATO. El aire limpio y respirable se encuentra en los primeros 30 cm sobre el piso.',
                posture: 'Gatear a cuatro patas con la cabeza baja. Cubrir nariz y boca con prenda textil.',
                byLocation: {
                    casa: 'Gatear hacia la salida más próxima. Si una habitación arde, no abrir su puerta.',
                    coche: 'Detener vehículo, quitar contacto, desabrochar cinturón y alejarse al menos 50 metros del coche.',
                    trabajo: 'Pulsar el pulsador manual de alarma de incendios más cercano en la pared mientras se evacua.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'TOCAR PUERTAS CON EL DORSO DE LA MANO. Si la manilla o la madera queman, NO ABRIR.',
                rationale: 'Abrir una puerta detrás de la cual hay un fuego vivo genera un "backdraft" (explosión por aporte súbito de oxígeno) instantáneamente mortal.',
                byLocation: {
                    casa: 'Si la puerta está fría: abrir con cautela escudándose tras la hoja. Salir y cerrar la puerta tras de ti.',
                    coche: 'Alejar a los pasajeros contra el viento de la dirección del humo denso de plásticos quemados.',
                    trabajo: 'Descender exclusivamente por las escaleras de emergencia presurizadas contra incendios.'
                }
            },
            t60_90: {
                title: '60 - 90s: Cierre de Oxígeno y Reunión',
                action: 'Cerrar la puerta principal de la vivienda sin echar llave al salir (ahoga el fuego y da tiempo a los bomberos).',
                preparation: 'Llegar al Punto de Encuentro Exterior (ej. farola de la esquina o banco del parque acordado). Contar miembros.',
                bridgePhase1: 'Verificación del recuento familiar, atención de quemaduras en botiquín de primeros auxilios y llamada al 112/911.'
            }
        },
        fatalMistakes: [
            'Caminar erguido en medio del humo denso (una sola bocanada de humo tóxico caliente desmaya o quema las vías respiratorias).',
            'Regresar a la casa en llamas a rescatar dinero, documentos o una mascota.',
            'Usar el ascensor del edificio en un incendio (actúa como chimenea y puede quedar sin corriente entre pisos).',
            'Lanzarse al vacío desde plantas superiores a un segundo piso sin asistencia de bomberos.'
        ]
    },
    {
        id: '3.3-fuga-quimica',
        columnId: 'tecnologicas',
        code: 'TEC-03',
        title: 'Fuga Química / Nube Tóxica Industrial',
        icon: '☣️',
        vector: 'Gases industriales clorados, amoníaco o vapores orgánicos volátiles más densos que el aire.',
        defaultDecision: 'CONFINAMIENTO VERTICAL Y SELLADO PLÁSTICO',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Colocar paño empapado en agua sobre nariz y boca. No frotarse los ojos si hay escozor.',
                posture: 'Movimiento vertical hacia plantas altas (la inmensa mayoría de gases industriales tóxicos son más pesados que el aire y se acumulan en el suelo).',
                byLocation: {
                    casa: 'Subir a la planta superior o habitación más alta. Cerrar ventanas herméticamente.',
                    coche: 'Cerrar ventanillas, apagar el ventilador/AC. Conducir transversalmente al viento que trae la nube.',
                    trabajo: 'Subir a pisos intermedios o altos lejos de los sótanos y bocas de ventilación del edificio.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'QUEDARSE EN INTERIORES Y SELLAR. No salir a la calle a menos que la nube esté directamente dentro.',
                rationale: 'Huir a pie al aire libre en medio de una nube tóxica de cloro o amoníaco causa edema pulmonar químico letal en segundos.',
                byLocation: {
                    casa: 'Apagar aires acondicionados, campanas extractoras, calderas de tiro forzado y ventiladores.',
                    coche: 'Abandonar el vehículo solo si encuentras un edificio sólido para ingresar de inmediato.',
                    trabajo: 'Cerrar compuertas de climatización central (HVAC) inmediatamente.'
                }
            },
            t60_90: {
                title: '60 - 90s: Sellado con Cinta y Toallas',
                action: 'Colocar cinta de embalar o toallas húmedas en las rendijas de puertas y ventanas del cuarto elegido.',
                preparation: 'Sintonizar la radio local para conocer el compuesto químico exacto y el radio de dispersión de la nube.',
                bridgePhase1: 'Mantenimiento de la habitación estanca durante el paso de la pluma química hasta autorización oficial.'
            }
        },
        fatalMistakes: [
            'Refugiarse en el sótano o planta baja (los gases tóxicos desplazan el oxígeno y saturan las zonas bajas).',
            'Evacuar a pie por la calle a favor de la dirección del viento que empuja la nube.',
            'Encender extractores de cocina o baño pensando que expulsarán el gas exterior.',
            'Retirar la protección facial ante olores picantes o lagrimeo.'
        ]
    },
    {
        id: '3.4-corte-agua',
        columnId: 'tecnologicas',
        code: 'TEC-04',
        title: 'Corte Crítico de Suministro de Agua',
        icon: '🚰',
        vector: 'Contaminación de red, rotura de matriz principal o sabotaje con secado de tuberías.',
        defaultDecision: 'CAPTACIÓN DE RESERVA POR GRAVEDAD',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Detener de inmediato cualquier descarga de inodoro o uso secundario de agua corriente.',
                posture: 'Acudir a los puntos más bajos de la vivienda (grifos de planta baja o bidón de servicio).',
                byLocation: {
                    casa: 'Cerrar la llave de entrada general a la vivienda si el corte se debe a contaminación química/biológica.',
                    coche: 'Comprar garrafas de agua de 5L en la primera gasolinera o supermercado antes del desabasto masivo.',
                    trabajo: 'Llenar termos individuales en dispensadores de agua potable antes del cierre del edificio.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'CAPTURAR EL AGUA REMANENTE EN TUBERÍAS. Abrir grifos y llenar todos los contenedores higiénicos disponibles.',
                rationale: 'Las tuberías de un hogar estándar albergan entre 15 y 30 litros de agua por gravedad; el termo eléctrico alberga entre 50 y 100 litros de agua estéril bebible.',
                byLocation: {
                    casa: 'Llenar ollas de cocina, botellas de vidrio y la bañera. Colocar tapón firme.',
                    coche: 'Verificar el stock de hidratación de emergencia en la cajuela/maletero del vehículo.',
                    trabajo: 'Desconectar fuentes conectadas a red para evitar reflujos de agua sucia.'
                }
            },
            t60_90: {
                title: '60 - 90s: Bloqueo del Termo Eléctrico',
                action: 'Cerrar la válvula de admisión del calentador de agua para impedir que su contenido regrese a la red general vacía.',
                preparation: 'Tener a mano el gotero de lejía apta para desinfección o pastillas purificadoras de cloro.',
                bridgePhase1: 'Activación de la Calculadora de Racionamiento Hídrico para el núcleo familiar según clima y peso.'
            }
        },
        fatalMistakes: [
            'Tirar de la cadena del váter repetidamente (desperdicia 6-9 litros de agua limpia de la cisterna que podría beberse filtrada).',
            'Consumir agua que sale turbia, con color extraño o con olor a petróleo tras la reapertura de la red.',
            'Olvidar aislar el termo eléctrico de agua caliente (su agua puede succionarse hacia la calle por efecto sifón).',
            'Almacenar agua en recipientes químicos o bidones de combustible sin lavar.'
        ]
    },

    // ========================================================================
    // COLUMNA 4: RADIOLÓGICAS Y BÉLICAS
    // ========================================================================
    {
        id: '4.1-nuclear',
        columnId: 'radiologicas',
        code: 'NUC-01',
        title: 'Detonación Nuclear Militar Directa',
        icon: '☢️',
        vector: 'Pulso térmico inicial (luz cegadora), pulso electromagnético (EMP), onda de sobrepresión y radiación gamma inmediata.',
        defaultDecision: 'CUERPO A TIERRA INMEDIATO (REFUGIO TRAS ONDA)',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'AL VER EL DESTELLO BLANCO: TIRARSE AL SUELO BOCA ABAJO DE INMEDIATO. NO MIRAR JAMÁS AL DESTELLO.',
                posture: 'Pies apuntando hacia la explosión. Brazos recogidos bajo el pecho. Boca entreabierta (igualar presión timpánica), ojos apretados fuertemente.',
                byLocation: {
                    casa: 'Tirarse tras muro macizo interior o bajo un mueble pesado. Lejos de cualquier ventana de cristal.',
                    coche: 'Tirarse en el suelo del vehículo bajo el nivel de las ventanillas, o salir y tenderse en la zanja de la carretera.',
                    trabajo: 'Tirarse al suelo bajo el escritorio más pesado. Oídos tapados con los pulgares.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'PERMANECER EN EL SUELO HASTA QUE PASE LA ONDA DE CHOQUE. La onda expansiva viaja a ~340 m/s y puede tardar de 10 a 60 segundos en llegar.',
                rationale: 'La mayoría de mutilaciones y muertes no ocurren por la radiación inicial, sino por personas que van a la ventana a curiosear y son atravesadas por cristales volando a 800 km/h.',
                byLocation: {
                    casa: 'Esperar a que termine el estruendo y los escombros voladores caigan por completo.',
                    coche: 'Esperar el impacto de la onda de viento sobre la carrocería antes de incorporarse.',
                    trabajo: 'Permanecer cubierto ante el colapso inminente de techos falsos y luminarias.'
                }
            },
            t60_90: {
                title: '60 - 90s: Búsqueda del Refugio Masivo',
                action: 'Tienes un margen estricto de 10 a 15 minutos antes de que el Fallout (lluvia radiactiva) empiece a precipitar sobre la zona.',
                preparation: 'Correr de inmediato al sótano más profundo, búnker o núcleo interior de hormigón. Llevar Mochila 72h y radio.',
                bridgePhase1: 'Activación del cálculo de Factor de Protección (PF) de blindaje y monitoreo de la Ley 7/10 de decaimiento radiactivo.'
            }
        },
        fatalMistakes: [
            'Mirar al destello térmico inicial (provoca quemadura de retina irreversible y ceguera permanente a más de 50 km).',
            'Acercarse a las ventanas o balcones a ver la columna en forma de hongo atómico.',
            'Intentar huir en coche por la autopista colapsada por el pánico y vehículos averiados por el EMP.',
            'Subir a la azotea a evaluar daños.'
        ]
    },
    {
        id: '4.2-fallout',
        columnId: 'radiologicas',
        code: 'NUC-02',
        title: 'Lluvia Radiactiva Masiva (Fallout)',
        icon: '☣️',
        vector: 'Polvo y partículas de tierra pulverizada contaminadas con productos de fisión (Cesio-137, Estroncio-90, Yodo-131). Emisores Gamma.',
        defaultDecision: 'CONFINAMIENTO PESADO SUBTERRÁNEO',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Ingresar de inmediato al edificio de mayor masa estructural disponible (hormigón armado, ladrillo macizo, sótanos subterráneos).',
                posture: 'Caminar rápido a cubierto. Proteger cabello y piel con cualquier prenda exterior impermeable o plástica.',
                byLocation: {
                    casa: 'Descender al sótano o mover a la familia a la habitación más céntrica del inmueble (tres muros de blindaje).',
                    coche: 'El coche ofrece un factor de protección casi nulo (PF=1.5). Abandonarlo para entrar en un edificio sólido.',
                    trabajo: 'Descender a los niveles de aparcamiento subterráneo -2 o -3 bajo rasante.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'DESCONTAMINACIÓN EN ENTRADA. Quitarse la ropa exterior y calzado antes de entrar a la zona limpia del refugio.',
                rationale: 'Quitarse la capa externa de ropa y calzado elimina entre el 80% y el 90% de las partículas radiactivas adheridas al cuerpo.',
                byLocation: {
                    casa: 'Dejar zapatos y abrigo en una bolsa de basura en el descansillo exterior. Limpiar piel expuesta con toallitas húmedas.',
                    coche: 'Despojarse de chaqueta y limpiar cabello antes de ingresar al edificio de acogida.',
                    trabajo: 'Establecer una "zona sucia" de transición en la primera puerta de acceso.'
                }
            },
            t60_90: {
                title: '60 - 90s: Sellado de Flujo de Aire',
                action: 'Apagar cualquier extractor, chimenea o climatizador. Bloquear rendijas con cinta americana o toallas húmedas.',
                preparation: 'Encender el radiómetro/contador Geiger o la radio a pilas para monitorear partes de caída radiactiva.',
                bridgePhase1: 'Mantenimiento del confinamiento estricto de 14 días. Aplicación de la regla 7/10 hasta que la dosis exterior sea tolerable.'
            }
        },
        fatalMistakes: [
            'Permanecer en casas de madera, tiendas de campaña o vehículos particulares durante la caída de ceniza radiactiva.',
            'Comer alimentos o beber agua que haya estado expuesta al aire exterior sin empaque hermético.',
            'Fumar o comer con las manos contaminadas de polvo radiactivo (incorporación interna de emisores alfa y beta).',
            'Salir al exterior durante las primeras 24-48 horas críticas a buscar familiares.'
        ]
    },
    {
        id: '4.3-reactor',
        columnId: 'radiologicas',
        code: 'NUC-03',
        title: 'Accidente Severo en Reactor Nuclear Civil',
        icon: '🏭',
        vector: 'Fuga de gases nobles radiactivos y aerosoles de Yodo-131 tras fallo de contención o pérdida de refrigerante.',
        defaultDecision: 'CONFINAMIENTO INTERIOR Y PROFILAXIS',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Al escuchar las sirenas de emergencia nuclear o recibir alerta civil: entrar bajo techo de inmediato.',
                posture: 'Cerrar puertas y ventanas de aluminio/madera. Evitar inhalar aire directo del exterior.',
                byLocation: {
                    casa: 'Entrar a la vivienda y llamar a todos los integrantes al interior.',
                    coche: 'Cerrar todas las ventanillas, apagar el ventilador exterior y conducir en dirección perpendicular a la pluma.',
                    trabajo: 'Permanecer en las oficinas interiores sin contacto directo con el exterior.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'QUEDARSE Y SELLAR. Esperar orden de evacuación oficial o reparto de Yoduro Potásico (KI).',
                rationale: 'A diferencia de una bomba atómica, una fuga de reactor civil libera plumas lentas; huir desordenadamente colapsa las rutas de ambulancias y expone a dosis inhaladas masivas.',
                byLocation: {
                    casa: 'Localizar pastillas de Yoduro Potásico si vives en el radio de 10-30 km (tomar SOLO bajo orden de protección civil).',
                    coche: 'No intentar ingresar al perímetro de exclusión para recoger pertenencias.',
                    trabajo: 'Comprobar stock de agua embotellada para evitar el uso de agua corriente de red.'
                }
            },
            t60_90: {
                title: '60 - 90s: Protección Tiroidea y Sintonía',
                action: 'Sintonizar la emisora pública designada para el Plan de Emergencia Nuclear exterior.',
                preparation: 'Registrar la hora de inicio de la alerta para computar dosis acumuladas según instrucciones.',
                bridgePhase1: 'Protocolo de blindaje ligero, bloqueo tiroideo con KI y preparación de la mochila por si se ordena evacuación guiada.'
            }
        },
        fatalMistakes: [
            'Tomar sobredosis de yodo común de farmacia o antiséptico tópico betadine (extremadamente tóxico para el organismo).',
            'Colapsar las carreteras perimetrales con vehículos sin autorización previa de evacuación de la guardia civil/policía.',
            'Consumir verduras frescas de huertos locales o leche de animales que hayan pastado en la zona.',
            'Bañarse en agua corriente de la red tras la declaración de la alerta.'
        ]
    },
    {
        id: '4.4-caos-civil',
        columnId: 'radiologicas',
        code: 'BEL-01',
        title: 'Disturbios Masivos / Saqueos / Colapso Bélico',
        icon: '🛡️',
        vector: 'Violencia descontrolada, turbas en busca de suministros, cortes de ley y orden público.',
        defaultDecision: 'PERFIL BAJO Y BLINDAJE DE ACCESOS',
        decisionType: 'confinamiento',
        windows: {
            t0_10: {
                title: '0 - 10s: Reflejo Biomecánico',
                action: 'Alejarse de ventanas, balcones y puntos con línea de visión directa desde la calle.',
                posture: 'Cuerpo bajo, bajar persianas por completo y apagar cualquier luz que delate ocupación interior (disciplina de luces).',
                byLocation: {
                    casa: 'Echar todos los cerrojos, cerrojos de seguridad y trancas en puertas principales y traseras.',
                    coche: 'Trabar seguros de todas las puertas del coche; girar en U antes de aproximarse a barricadas en la calzada.',
                    trabajo: 'Bajar las rejas de seguridad metálicas y concentrar al equipo en una sala interior cerrada con llave.'
                }
            },
            t10_60: {
                title: '10 - 60s: Triaje de Decisión',
                action: 'CONFINAMIENTO SIGILOSO. Convertir la vivienda en un objetivo no atractivo ("la casa vacía y apagada").',
                rationale: 'Las turbas y saqueadores atacan objetivos fáciles y visibles. Resistir atrincherado en silencio desvía el flujo hacia locales comerciales desprotegidos.',
                byLocation: {
                    casa: 'Reunir elementos de defensa pasiva y botiquín de traumatología en la habitación de seguridad.',
                    coche: 'No detenerse ante individuos que golpeen el capó; continuar marcha constante a velocidad moderada.',
                    trabajo: 'Evitar confrontaciones verbales desde terrazas o ventanas con manifestantes o saqueadores.'
                }
            },
            t60_90: {
                title: '60 - 90s: Protocolo Familiar de Silencio',
                action: 'Poner teléfonos móviles en modo silencio total (sin vibración). Mantener a niños tranquilos en el centro del cuarto.',
                preparation: 'Tener a mano la radio con auriculares para conocer qué distritos o calles están bajo control de las fuerzas de seguridad.',
                bridgePhase1: 'Plan de defensa doméstica pasiva de 72 horas y protocolo de racionamiento de suministros alimentarios.'
            }
        },
        fatalMistakes: [
            'Asomarse al balcón a increpar, insultar o grabar con el teléfono a grupos violentos armados.',
            'Salir a la calle a defender un vehículo estacionado contra una turba enfurecida.',
            'Tener luces encendidas por la noche con las cortinas abiertas (te convierte en el blanco evidente del vecindario).',
            'Disparar o exhibir armas sin amenaza inminente de brecha física (provoca respuesta armada desmedida).'
        ]
    }
];
