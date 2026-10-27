/**
 * ============================================================================
 * CUADERNO DEL PLAN FAMILIAR: LAS 40 FICHAS EJECUTABLES (F01 a F40)
 * fichas.js · Esquema de datos, campos interactivos y persistencia local
 * ============================================================================
 * Estructura de 6 Bloques tácticos:
 * - Bloque A: Quiénes somos (F01 a F05)
 * - Bloque B: Dónde nos encontramos (F06 a F10)
 * - Bloque C: Qué tenemos (F11 a F18)
 * - Bloque D: Qué hace cada uno (F19 a F23)
 * - Bloque E: La casa y el refugio (F24 a F28)
 * - Bloque F: Escenarios de Respuesta Rápida (F29 a F40)
 */

export const FAMILY_PLAN_SHEETS = [
    // ------------------------------------------------------------------------
    // BLOQUE A: QUIÉNES SOMOS (F01 a F05)
    // ------------------------------------------------------------------------
    {
        id: "f01",
        code: "F01",
        block: "A",
        blockName: "Quiénes Somos",
        title: "Ficha de Familia y Censo del Hogar",
        subtitle: "Censo de integrantes y cálculo de meta hídrica obligatoria a 14 días.",
        description: "Esta ficha unifica a todos los ocupantes del hogar y fija la meta innegociable de agua potable.",
        fields: [
            { id: "family_name", label: "Apellidos de la Familia", type: "text", placeholder: "Ej. Familia Castro Méndez" },
            { id: "address_home", label: "Dirección Principal de la Vivienda", type: "text", placeholder: "Calle, número, piso y ciudad" },
            { id: "members_count", label: "Número Total de Integrantes", type: "number", min: 1, max: 15, default: 4 },
            { id: "water_goal_litres", label: "Meta Hídrica Mínima (Integrantes × 4L × 14 días)", type: "calculated", formula: "members_count * 4 * 14", unit: "Litros" },
            { id: "assembly_notes", label: "Observaciones Especiales del Hogar", type: "textarea", placeholder: "Ascensor con llave, puerta blindada, rejas en ventanas..." }
        ]
    },
    {
        id: "f02",
        code: "F02",
        block: "A",
        blockName: "Quiénes Somos",
        title: "Ficha Médica y Personal · Adulto 1",
        subtitle: "Identificación, alergias, grupo sanguíneo y medicación continua.",
        fields: [
            { id: "a1_name", label: "Nombre Completo", type: "text" },
            { id: "a1_dni", label: "Documento de Identidad / DNI / Pasaporte", type: "text" },
            { id: "a1_blood", label: "Grupo Sanguíneo y Factor Rh", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Desconocido"] },
            { id: "a1_allergies", label: "Alergias Conocidas (Medicamentos / Alimentos)", type: "text", placeholder: "Penicilina, sulfamidas, frutos secos..." },
            { id: "a1_meds", label: "Medicamentos de Toma Diaria Crónica", type: "textarea", placeholder: "Insulina, antihipertensivos, anticoagulantes (indicar dosis diaria y reserva actual)" }
        ]
    },
    {
        id: "f03",
        code: "F03",
        block: "A",
        blockName: "Quiénes Somos",
        title: "Ficha Médica y Personal · Adulto 2",
        subtitle: "Datos médicos y soporte de contingencia del segundo adulto.",
        fields: [
            { id: "a2_name", label: "Nombre Completo", type: "text" },
            { id: "a2_dni", label: "Documento de Identidad", type: "text" },
            { id: "a2_blood", label: "Grupo Sanguíneo", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Desconocido"] },
            { id: "a2_allergies", label: "Alergias", type: "text" },
            { id: "a2_meds", label: "Medicación Crónica", type: "textarea" }
        ]
    },
    {
        id: "f04",
        code: "F04",
        block: "A",
        blockName: "Quiénes Somos",
        title: "Ficha Pediátrica · Menores / Dependientes",
        subtitle: "Datos infantiles, centro educativo y autorización de recogida.",
        fields: [
            { id: "child_name", label: "Nombre del Menor", type: "text" },
            { id: "child_birthdate", label: "Fecha de Nacimiento / Edad", type: "text" },
            { id: "child_school", label: "Colegio / Guardería y Teléfono", type: "text" },
            { id: "child_authorized_pickup", label: "Personas Autorizadas para Recogerlo en Crisis", type: "text" },
            { id: "child_special_needs", label: "Necesidades Especiales / Alergias", type: "textarea" }
        ]
    },
    {
        id: "f05",
        code: "F05",
        block: "A",
        blockName: "Quiénes Somos",
        title: "Ficha de Mascotas y Animales de Compañía",
        subtitle: "Cartilla, transportín, pienso y alojamiento que admita animales.",
        fields: [
            { id: "pet_name_species", label: "Nombre y Especie / Raza", type: "text", placeholder: "Ej. Max - Perro Pastor Alemán" },
            { id: "pet_chip", label: "Número de Microchip / Cartilla", type: "text" },
            { id: "pet_food_14d", label: "Reserva de Pienso / Comida Húmeda para 14 Días", type: "text", placeholder: "Ej. 1 saco de 10 kg sellado" },
            { id: "pet_safe_shelter", label: "Refugio o Residencia que Admita Animales en tu Zona", type: "text" }
        ]
    },

    // ------------------------------------------------------------------------
    // BLOQUE B: DÓNDE NOS ENCONTRAMOS (F06 a F10)
    // ------------------------------------------------------------------------
    {
        id: "f06",
        code: "F06",
        block: "B",
        blockName: "Dónde Nos Encontramos",
        title: "Punto de Encuentro A (Frente a la Vivienda)",
        subtitle: "Para emergencias de evacuación inmediata (incendio doméstico, fuga de gas).",
        fields: [
            { id: "point_a_location", label: "Ubicación Exacta", type: "text", placeholder: "Ej. Farola frente a la panadería de la esquina" },
            { id: "point_a_distance", label: "Distancia Mínima de Seguridad de la Fachada", type: "text", default: "Mínimo 50 metros lejos de cristales y cables" }
        ]
    },
    {
        id: "f07",
        code: "F07",
        block: "B",
        blockName: "Dónde Nos Encontramos",
        title: "Punto de Encuentro B (En el Barrio / Sector)",
        subtitle: "Si la manzana o calle principal está acordonada por policía o bomberos.",
        fields: [
            { id: "point_b_location", label: "Lugar Público de Fácil Acceso a Pie", type: "text", placeholder: "Ej. Cancha de baloncesto del parque municipal" },
            { id: "point_b_route", label: "Ruta de Llegada a Pie Alternativa", type: "textarea" }
        ]
    },
    {
        id: "f08",
        code: "F08",
        block: "B",
        blockName: "Dónde Nos Encontramos",
        title: "Punto de Encuentro C (Fuera del Municipio)",
        subtitle: "Si la localidad entera es evacuada por catástrofe mayor o nube tóxica.",
        fields: [
            { id: "point_c_town", label: "Población y Dirección Acordada", type: "text", placeholder: "Ej. Casa de los abuelos en el pueblo X" },
            { id: "point_c_phone", label: "Teléfono Fijo del Lugar", type: "text" }
        ]
    },
    {
        id: "f09",
        code: "F09",
        block: "B",
        blockName: "Dónde Nos Encontramos",
        title: "Tarjeta de Bolsillo Familiar",
        subtitle: "Formato recortable que cada integrante debe llevar físicamente consigo.",
        fields: [
            { id: "pocket_card_note", label: "Instrucción Táctica", type: "info", content: "Los niños no memorizan números bajo pánico. Esta tarjeta debe plastificarse y guardarse en el forro de su mochila escolar y en las carteras de los adultos." }
        ]
    },
    {
        id: "f10",
        code: "F10",
        block: "B",
        blockName: "Dónde Nos Encontramos",
        title: "Contacto Fuera de la Zona (Nodo de Comunicaciones)",
        subtitle: "En catástrofes, las llamadas locales colapsan pero las de larga distancia suelen funcionar.",
        fields: [
            { id: "f10_contact_name", label: "Nombre de la Persona de Confianza (Otra Ciudad / Región)", type: "text" },
            { id: "f10_contact_city", label: "Ciudad / Provincia", type: "text" },
            { id: "f10_contact_phone1", label: "Teléfono Principal", type: "text" },
            { id: "f10_contact_phone2", label: "Teléfono Fijo / Alternativo", type: "text" }
        ]
    },

    // ------------------------------------------------------------------------
    // BLOQUE C: QUÉ TENEMOS (INVENTARIOS CRÍTICOS F11 a F18)
    // ------------------------------------------------------------------------
    {
        id: "f11",
        code: "F11",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Auditoría Hídrica del Hogar",
        subtitle: "Registro de garrafas cerradas, fechas de rotación y depósitos.",
        fields: [
            { id: "f11_jugs_count", label: "Garrafas Comerciales Selladas de 5L / 8L", type: "number", placeholder: "Nº de garrafas" },
            { id: "f11_rotation_date", label: "Última Fecha de Rotación / Renovación", type: "date" },
            { id: "f11_purification_method", label: "Método de Potabilización en Casa", type: "select", options: ["Lejía apta para desinfección", "Filtro Sawyer/Katadyn 0.1 micras", "Pastillas de cloro", "Hervido"] }
        ]
    },
    {
        id: "f12",
        code: "F12",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Despensa Calórica Escalonada (30 a 90 Días)",
        subtitle: "Conteo de latas de proteínas, carbohidratos secos y grasas de alta densidad.",
        fields: [
            { id: "f12_rice_pasta_kg", label: "Kilos de Arroz, Legumbres y Pasta", type: "number", unit: "kg" },
            { id: "f12_cans_count", label: "Latas de Atún, Sardinas, Carne y Verdura", type: "number", unit: "latas" },
            { id: "f12_oil_litres", label: "Litros de Aceite de Oliva / Vegetal (Densidad calórica)", type: "number", unit: "L" }
        ]
    },
    {
        id: "f13",
        code: "F13",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Botiquín de Trauma y Medicación de Respaldo",
        subtitle: "Gasas estériles, torniquete homologado, clorhexidina y antibióticos básicos.",
        fields: [
            { id: "f13_tourniquet", label: "¿Tienes torniquete homologado (CAT Gen 7 / SOFTT-W)?", type: "select", options: ["Sí", "No", "En proceso"] },
            { id: "f13_hemostatic", label: "Apósitos hemostáticos / vendas compresivas", type: "select", options: ["Sí", "No"] },
            { id: "f13_chronic_reserves_days", label: "Días de Reserva de Medicación Vital Guardados", type: "number", unit: "días", default: 30 }
        ]
    },
    {
        id: "f14",
        code: "F14",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Comunicaciones, Radio y Luz Anti-EMP",
        subtitle: "Radio AM/FM a pilas, linternas frontales y protección en caja metálica.",
        fields: [
            { id: "f14_radio_model", label: "Modelo de Radio a Pilas / Dinamo", type: "text" },
            { id: "f14_spare_batteries", label: "Pilas de Repuesto (Alcalinas / Litio)", type: "textarea", placeholder: "12x AA, 8x AAA, selladas en su blister original" },
            { id: "f14_faraday_box", label: "¿Equipo de radio secundario guardado en Jaula de Faraday casera?", type: "select", options: ["Sí (Lata metálica aislada)", "No"] }
        ]
    },
    {
        id: "f15",
        code: "F15",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Energía de Respaldo y Cocina Fuera de Red",
        subtitle: "Hornillo de camping, cartuchos de gas y powerbanks solares.",
        fields: [
            { id: "f15_stove_type", label: "Tipo de Hornillo Portátil", type: "select", options: ["Gas butano / camping gaz", "Alcohol de quemar", "Madera / biomasa plegable", "Ninguno"] },
            { id: "f15_gas_canisters", label: "Cartuchos de Gas en Reserva", type: "number" },
            { id: "f15_powerbank_capacity", label: "Capacidad Total de Baterías Portátiles", type: "text", placeholder: "Ej. 2 x 20.000 mAh" }
        ]
    },
    {
        id: "f16",
        code: "F16",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Higiene y Control Biológico en Confinamiento",
        subtitle: "Bolsas de basura reforzadas, desinfectante, cal / arena y papel.",
        fields: [
            { id: "f16_heavy_bags", label: "Bolsas de Residuos de Gran Grosor (Galga 200+)", type: "number", unit: "unidades" },
            { id: "f16_dry_toilet", label: "¿Cubo / inodoro seco preparado si se corta el agua del WC?", type: "select", options: ["Sí", "No"] },
            { id: "f16_bleach_stock", label: "Botellas de Lejía Común Sin Perfume (5%)", type: "number", unit: "botellas" }
        ]
    },
    {
        id: "f17",
        code: "F17",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Documentación Esencial y Carpeta Estanca",
        subtitle: "Escrituras, pólizas, libros de familia y DNI en USB cifrado y bolsa impermeable.",
        fields: [
            { id: "f17_usb_encrypted", label: "¿USB cifrado (BitLocker / VeraCrypt) con copias escaneadas?", type: "select", options: ["Sí", "No"] },
            { id: "f17_paper_folder_location", label: "Ubicación de la Carpeta Física Impermeable", type: "text", placeholder: "En el bolsillo interior de la Mochila 72h" }
        ]
    },
    {
        id: "f18",
        code: "F18",
        block: "C",
        blockName: "Qué Tenemos",
        title: "Reserva de Efectivo Táctico Fraccionado",
        subtitle: "En colapso de red o ciberataque los cajeros no dispensan y no hay pago con tarjeta.",
        fields: [
            { id: "f18_cash_amount", label: "Monto Mínimo Estimado para 15 Días de Combustible y Comida", type: "text", placeholder: "Ej. 300 - 500 €/USD en billetes de 5, 10 y 20" },
            { id: "f18_cash_location", label: "Caja de Seguridad / Escondite en Casa", type: "text" }
        ]
    },

    // ------------------------------------------------------------------------
    // BLOQUE D: QUÉ HACE CADA UNO (F19 a F23)
    // ------------------------------------------------------------------------
    {
        id: "f19",
        code: "F19",
        block: "D",
        blockName: "Qué Hace Cada Uno",
        title: "Asignación de Misiones Familiares en Crisis",
        subtitle: "El pánico paraliza; una tarea asignada de antemano mantiene la mente enfocada.",
        fields: [
            { id: "role_mission_adult1", label: "Misión Adulto 1", type: "text", placeholder: "Cerrar llaves de paso, verificar sellado exterior y bajar persianas" },
            { id: "role_mission_adult2", label: "Misión Adulto 2", type: "text", placeholder: "Reunir mochilas de 72h, encender radio y calmar a los menores" },
            { id: "role_mission_child", label: "Misión Menor / Guardián", type: "text", placeholder: "Guardián de la linterna y responsable de atar la correa a la mascota" }
        ]
    },
    {
        id: "f20",
        code: "F20",
        block: "D",
        blockName: "Qué Hace Cada Uno",
        title: "Protocolo de los Primeros 10 Minutos (Secuencia M0 a M10)",
        subtitle: "Acciones cronometradas paso a paso desde el primer sonido de alarma.",
        fields: [
            { id: "f20_checklist", label: "Checklist de Secuencia", type: "info", content: "1. Agacharse / cubierto. 2. Respirar 3 veces. 3. Reclamar Punto Seguro interior. 4. Llenar agua si hay presión. 5. Sellar rendijas." }
        ]
    },
    {
        id: "f21",
        code: "F21",
        block: "D",
        blockName: "Qué Hace Cada Uno",
        title: "La Decisión Basada en Hechos: ¿Quedarse o Salir?",
        subtitle: "Disparadores objetivos de evacuación frente a confinamiento.",
        fields: [
            { id: "f21_evacuation_triggers", label: "Disparadores Innegociables para Salir de Casa", type: "textarea", default: "Fuego estructural incontrolable, rotura de presa río arriba, orden militar obligatoria de evacuación por convoy." }
        ]
    },
    {
        id: "f22",
        code: "F22",
        block: "D",
        blockName: "Qué Hace Cada Uno",
        title: "Protocolo Escolar y Guarda de Menores",
        subtitle: "Por qué NUNCA debes salir corriendo a la escuela durante alerta radiológica o química.",
        fields: [
            { id: "f22_school_protocol_signed", label: "¿Has revisado el protocolo de confinamiento del colegio de tus hijos?", type: "select", options: ["Sí", "No", "Pendiente de pedir"] }
        ]
    },
    {
        id: "f23",
        code: "F23",
        block: "D",
        blockName: "Qué Hace Cada Uno",
        title: "Protocolo para Familiares Ancianos o No Convivientes",
        subtitle: "Cómo coordinarse con padres o abuelos que viven en otro domicilio.",
        fields: [
            { id: "f23_elderly_address", label: "Dirección de los Familiares Mayores", type: "text" },
            { id: "f23_key_holder", label: "¿Tienes llave de su vivienda?", type: "select", options: ["Sí", "No"] },
            { id: "f23_action_plan", label: "Plan Acordado: ¿Ir a buscarlos o que se confinen?", type: "textarea" }
        ]
    },

    // ------------------------------------------------------------------------
    // BLOQUE E: LA CASA Y EL REFUGIO (F24 a F28)
    // ------------------------------------------------------------------------
    {
        id: "f24",
        code: "F24",
        block: "E",
        blockName: "La Casa y el Refugio",
        title: "Plano de Evacuación y Vías de Escape",
        subtitle: "Dos salidas alternativas desde cada dormitorio hasta la calle.",
        fields: [
            { id: "f24_primary_exit", label: "Salida Primaria", type: "text", default: "Puerta principal de la vivienda hacia la escalera común" },
            { id: "f24_secondary_exit", label: "Salida Secundaria de Emergencia", type: "text", placeholder: "Balcón a patio interior / ventana con escala / salida de servicio" }
        ]
    },
    {
        id: "f25",
        code: "F25",
        block: "E",
        blockName: "La Casa y el Refugio",
        title: "Ubicación de Llaves de Paso de Suministros",
        subtitle: "Cómo y dónde cortar gas, agua y electricidad en menos de 30 segundos.",
        fields: [
            { id: "f25_gas_valve", label: "Ubicación Llave de Gas (Girar 90º transversal)", type: "text", placeholder: "Bajo la caldera en la cocina" },
            { id: "f25_water_valve", label: "Ubicación Llave General de Agua", type: "text", placeholder: "Detrás de la puerta del baño principal" },
            { id: "f25_electric_panel", label: "Ubicación Cuadro Eléctrico Principal", type: "text", placeholder: "Junto a la puerta de entrada" }
        ]
    },
    {
        id: "f26",
        code: "F26",
        block: "E",
        blockName: "La Casa y el Refugio",
        title: "El Punto Seguro / Habitación Refugio",
        subtitle: "La habitación interior con menos paredes exteriores y mayor masa circundante.",
        fields: [
            { id: "f26_safe_room_chosen", label: "Habitación Seleccionada", type: "text", placeholder: "Pasillo central interior / baño sin ventanas / sótano" },
            { id: "f26_materials_to_add", label: "Masa Móvil para Apilar contra Muros", type: "textarea", placeholder: "Colchones pesados, estanterías llenas de libros, garrafas de agua acumuladas" }
        ]
    },
    {
        id: "f27",
        code: "F27",
        block: "E",
        blockName: "La Casa y el Refugio",
        title: "Procedimiento de Sellado Rápido contra Nubes y Polvo",
        subtitle: "Cinta de carrocero/americana y plástico grueso de pintor sobre rendijas.",
        fields: [
            { id: "f27_tape_stock", label: "¿Tienes 3 rollos de cinta americana resistente y plástico guardados?", type: "select", options: ["Sí, en el kit", "No"] },
            { id: "f27_ac_shutoff", label: "¿Sabes cómo apagar la ventilación forzada y sellar los extractores?", type: "select", options: ["Sí", "No"] }
        ]
    },
    {
        id: "f28",
        code: "F28",
        block: "E",
        blockName: "La Casa y el Refugio",
        title: "Ubicación e Inspección de la Mochila de 72 Horas",
        subtitle: "Lugar accesible de salida inmediata y calendario de revisión semestral.",
        fields: [
            { id: "f28_bag_location", label: "Lugar donde están colgadas las mochilas", type: "text", placeholder: "Armario de la entrada, listas para coger y salir" },
            { id: "f28_last_inspection", label: "Última Inspección de Comida y Baterías", type: "date" }
        ]
    }
    // El Bloque F (F29 a F40) se enlaza automáticamente con SCENARIOS de scenarios.js
];
