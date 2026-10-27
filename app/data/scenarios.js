export const SCENARIOS = [
    {
        id: "f29-apagon",
        card: "F29",
        title: "Apagón Prolongado y Corte de Red",
        category: "servicios",
        icon: "⚡",
        description: "Caída masiva del suministro eléctrico por horas o días. Riesgo de pérdida de cadena de frío y bombeo de agua.",
        doNow: [
            "Usa linterna LED o luz de móvil, NUNCA velas antes de verificar que no hay olor a gas.",
            "Desconecta electrodomésticos sensibles para evitar que la sobretensión de retorno los queme.",
            "Llena ollas, jarras y termos de agua mientras la red mantenga la presión remanente de las tuberías.",
            "No abras la nevera ni el congelador. Cada apertura reduce drásticamente las horas de frío seguro.",
            "Pon la radio a pilas o enciende la radio del coche para escuchar boletines oficiales de Protección Civil."
        ],
        doNotDo: [
            "NO uses generadores de combustible ni braseros dentro de casa ni en balcones cerrados (Riesgo mortal de monóxido de carbono).",
            "NO abras la nevera 'para mirar qué hay'. Una nevera cerrada aguanta 4 horas; un congelador lleno, hasta 48 horas.",
            "NO colapses las líneas de emergencia 112/911 solo para preguntar 'a qué hora vuelve la luz'.",
            "NO dejes velas encendidas sin supervisión o cerca de cortinas al ir a dormir."
        ],
        doAfter: [
            "Consume primero los alimentos frescos y perecederos de la nevera en las primeras 4 horas.",
            "Utiliza un hornillo de camping portátil en lugar bien ventilado si necesitas calentar agua o comida.",
            "Establece turnos para recargar baterías esenciales con powerbanks cargados o cargador de coche.",
            "Revisa a vecinos ancianos o personas dependientes de equipos electromédicos en tu edificio."
        ],
        seekHelp: "Si tú o alguien depende de oxígeno o diálisis que se queda sin batería de respaldo, llama de inmediato a emergencias médicas o acude al hospital más cercano."
    },
    {
        id: "f30-corte-agua",
        card: "F30",
        title: "Corte General de Agua / Contaminación",
        category: "servicios",
        icon: "💧",
        description: "Interrupción súbita del suministro hídrico, rotura de matriz o aviso de agua no potable.",
        doNow: [
            "Si el grifo todavía gotea, llena inmediatamente todas las ollas, termos, botellas y la bañera limpia.",
            "Cierra la llave de paso de la vivienda si se anuncia rotura exterior para que el lodo de retorno no ensucie tus tuberías.",
            "Separa de inmediato el agua de beber (4L/persona/día) del agua gris para higiene o inodoro.",
            "Verifica si el aviso es por corte o por contaminación bacteriana/química."
        ],
        doNotDo: [
            "NO uses agua del grifo si hay aviso oficial de contaminación química (hervir NO elimina metales ni químicos).",
            "NO tires de la cisterna del inodoro con agua potable (usa un cubo de agua gris o bolsa higiénica).",
            "NO bebas agua estancada sin tratar (hervir 1 minuto a borbotones o 2 gotas de lejía apta para desinfección por litro)."
        ],
        doAfter: [
            "Aplica la regla de higiene de 2 litros: lavado por esponja y desinfectante en gel.",
            "Cuando se restablezca el servicio, abre los grifos fríos 2-3 minutos hasta que el agua salga completamente clara antes de beber.",
            "Mantén la reserva mínima de 7 días (28 litros por persona) siempre envasada y rotada."
        ],
        seekHelp: "Si presentas síntomas agudos de gastroenteritis, diarrea persistente, deshidratación severa o fiebre tras consumir agua sospechosa."
    },
    {
        id: "f31-sismo",
        card: "F31",
        title: "Sismo / Terremoto",
        category: "geologico",
        icon: "🏚️",
        description: "Movimiento telúrico de alta intensidad. Protocolo de los 60 segundos y evacuación estructural.",
        doNow: [
            "DURANTE EL TEMBLOR: Agáchate, cúbrete bajo una mesa robusta y sujétate firmemente (Drop, Cover, Hold On).",
            "Aléjate de ventanas, cristales, espejos, libreros altos y lámparas colgantes.",
            "Si estás en la calle, aléjate de fachadas, cornisas, cables eléctricos y balcones.",
            "En cuanto cese el temblor principal: cierra llaves de paso de gas y agua, y baja los plomos de la luz si puedes."
        ],
        doNotDo: [
            "NO uses ascensores bajo ninguna circunstancia.",
            "NO salgas corriendo desesperadamente hacia la calle durante el movimiento; la mayoría de víctimas son golpeadas por escombros al salir.",
            "NO enciendas cerillas, mecheros o interruptores de luz (puede haber fugas invisibles de gas).",
            "NO sigas el mito del 'triángulo de la vida' al lado de muebles ligeros que puedan colapsar sobre ti."
        ],
        doAfter: [
            "Evacúa por las escaleras hacia el Punto de Encuentro A/B con tu mochila de 72 horas y calzado resistente.",
            "Prepárate para réplicas sísmicas que pueden terminar de dañar estructuras ya comprometidas.",
            "Inspecciona visualmente la vivienda: grietas en 'X' en muros de carga significan peligro grave."
        ],
        seekHelp: "Si hay atrapados, fuga activa de gas que no se puede cerrar, o incendios secundarios inmediatos."
    },
    {
        id: "f32-inundacion",
        card: "F32",
        title: "Inundación / DANA / Crecida",
        category: "climatico",
        icon: "🌊",
        description: "Subida rápida de nivel de agua por lluvias torrenciales o rotura de presas/ríos.",
        doNow: [
            "Corta la electricidad de la vivienda antes de que el agua alcance el cuadro eléctrico o los enchufes bajos.",
            "Sube a plantas superiores o azoteas con tu kit de emergencia, agua potable y teléfono.",
            "Coloca barreras y sube documentos, ordenadores y medicamentos a zonas altas.",
            "Si estás en coche y el agua supera la altura del neumático: ABANDONA el vehículo y camina a zona elevada."
        ],
        doNotDo: [
            "NUNCA intentes cruzar en coche una balsa de agua o corriente (30 cm de agua arrastran un turismo normal).",
            "NO bajes al garaje ni sótanos a 'salvar el coche' o pertenencias una vez iniciada la crecida (trampa mortal).",
            "NO camines descalzo en agua estancada (cables electrificados, tapas de alcantarilla levantadas, bacterias)."
        ],
        doAfter: [
            "Espera rescate o confirmación oficial de bajada de cauces antes de descender.",
            "Usa guantes resistentes y botas de goma al limpiar lodo (riesgo biológico y tétanos).",
            "Desecha cualquier alimento que haya estado en contacto con el agua de la inundación."
        ],
        seekHelp: "Si el nivel de agua sigue subiendo y amenaza la planta en la que te encuentras, haz señales visibles de socorro y llama al 112/911."
    },
    {
        id: "f33-incendio-domestico",
        card: "F33",
        title: "Incendio Doméstico",
        category: "fuego",
        icon: "🔥",
        description: "Fuego en la vivienda. Tienes entre 2 y 3 minutos para evacuar de forma segura.",
        doNow: [
            "Grita y alerta a todos los ocupantes de inmediato. Salid todos ya.",
            "Agáchate y gatea: el aire limpio y respirable está en los 30 cm más cercanos al suelo.",
            "Cierra todas las puertas a tu paso para retrasar el avance del oxígeno hacia las llamas.",
            "Antes de abrir una puerta cerrada, toca el pomo con el dorso de la mano. Si está caliente, NO la abras."
        ],
        doNotDo: [
            "NO te detengas a recoger ropa, joyas o dinero; el humo tóxico mata por asfixia en menos de 90 segundos.",
            "NO eches agua sobre una sartén con aceite ardiendo (provoca una explosión masiva de fuego; cúbrela con una tapa o trapo húmedo).",
            "NO uses el ascensor jamás.",
            "NUNCA regreses al interior de la casa en llamas bajo ningún concepto."
        ],
        doAfter: [
            "Reúnanse en el Punto de Encuentro A (frente a casa) y pasa lista de todos los integrantes.",
            "Llama a los Bomberos (112 / 911) indicando la dirección exacta y si hay personas atrapadas.",
            "Espera la llegada de los servicios de emergencia sin interferir en su despliegue."
        ],
        seekHelp: "Informa inmediatamente a los bomberos si falta algún menor, persona mayor o mascota dentro."
    },
    {
        id: "f34-incendio-forestal",
        card: "F34",
        title: "Incendio Forestal / Interfaz Urbana",
        category: "fuego",
        icon: "🌲",
        description: "Fuego cercano en masa boscosa con avance rápido por viento y humo denso.",
        doNow: [
            "Cierra todas las ventanas, persianas, rejillas de ventilación y puertas para evitar entrada de pavesas.",
            "Viste ropa de fibras naturales (100% algodón o lana), manga larga, mascarilla húmeda o N95 y gafas protectoras.",
            "Coloca tu coche orientado hacia la salida, con llaves puestas y las mochilas de 72h en el maletero.",
            "Evacúa en cuanto se dé el primer aviso; no esperes a ver las llamas en tu jardín."
        ],
        doNotDo: [
            "NO huyas ladera arriba del fuego (el fuego asciende a mayor velocidad de la que tú puedes correr).",
            "NO intentes combatir un frente forestal con una manguera de jardín; tu vida vale más que un seto.",
            "NO uses ropa sintética (poliéster, nylon) que se funde y quema la piel con el calor radiante."
        ],
        doAfter: [
            "Sigue únicamente las rutas de evacuación designadas por las autoridades de tráfico.",
            "Si quedas atrapado en el vehículo: enciende luces, cierra ventanillas y rejillas de aire, túmbate en el suelo del coche cubierto con ropa.",
            "Notifica tu estado a tu Contacto Fuera de la Zona."
        ],
        seekHelp: "Si tu ruta de salida queda cortada por el fuego o el humo impide totalmente la visibilidad."
    },
    {
        id: "f35-desabasto",
        card: "F35",
        title: "Desabasto y Pánico en Supermercados",
        category: "social",
        icon: "🛒",
        description: "Ruptura de la cadena de suministro 'just in time', huelga de transporte o pánico masivo.",
        doNow: [
            "Evalúa tu inventario actual de despensa (Fichas 12/13) antes de salir a comprar con prisa.",
            "Si compras suministros extra, prioriza los alimentos de alto rendimiento calórico: legumbres secas, arroz, aceite, avena, conservas de atún.",
            "Mantén la calma y evita aglomeraciones conflictivas o peleas en tiendas.",
            "Asegúrate de retirar algo de dinero en efectivo mientras los cajeros automáticos funcionen."
        ],
        doNotDo: [
            "NO compres de forma irracional perecederos que se pudran si hay cortes de luz (leche fresca, carne fresca en exceso).",
            "NO comentes en público ni en redes sociales la cantidad de suministros que tienes guardados en casa.",
            "NO dependas de una sola tarjeta o método de pago bancario."
        ],
        doAfter: [
            "Aplica el sistema FIFO en casa: lo más antiguo delante, lo nuevo detrás.",
            "Raciona porciones planificadas a 2.100 kcal por persona/día sin desperdiciar nada.",
            "Crea alianzas discretas de apoyo con familiares y vecinos cercanos de confianza."
        ],
        seekHelp: "Si en tu hogar hay escasez total de alimentos para bebés o personas con dietas terapéuticas vitales."
    },
    {
        id: "f36-temperatura-extrema",
        card: "F36",
        title: "Ola de Frío / Calor Extremo sin Red",
        category: "climatico",
        icon: "❄️",
        description: "Temperaturas letales con interrupción del aire acondicionado o calefacción central.",
        doNow: [
            "CON FRÍO: Concéntrate en una sola habitación pequeña ('habitación refugio'), sella puertas y ventanas con mantas y reúne a la familia.",
            "Vístete por capas (térmica + aislamiento + exterior), gorro de lana y calcetines gruesos.",
            "CON CALOR: Cierra persianas y cortinas en el lado soleado; abre ventilación cruzada solo de noche.",
            "Bebe agua constante en pequeños sorbos con electrolitos o pizca de sal, incluso sin sed."
        ],
        doNotDo: [
            "NO uses estufas de gas de camping o braseros en dormitorios sin ventilación continua (riesgo de asfixia por CO).",
            "NO consumas alcohol para 'calentarte' (el alcohol dilata vasos y acelera la hipotermia real).",
            "NO hagas esfuerzos físicos en las horas centrales de calor extremo."
        ],
        doAfter: [
            "Usa sacos de dormir térmicos o varias mantas superpuestas en el suelo sobre aislante.",
            "Come alimentos calóricos y calientes para mantener la termorregulación corporal en frío.",
            "Vigila signos de golpe de calor (piel caliente y seca, mareo, confusión) o hipotermia (temblor incontrolado, lenguaje torpe)."
        ],
        seekHelp: "Si una persona entra en estado de letargo, deja de sudar con fiebre alta o pierde el conocimiento."
    },
    {
        id: "f37-fuga-quimica",
        card: "F37",
        title: "Fuga Química / Accidente Industrial",
        category: "industrial",
        icon: "☣️",
        description: "Nube tóxica por vertido o explosión en fábrica, camión cisterna o tren de mercancías.",
        doNow: [
            "Refúgiate de inmediato en el interior del edificio más cercano. No te quedes al aire libre.",
            "Cierra todas las puertas, ventanas y conductos de ventilación. Apaga aires acondicionados y campanas extractoras.",
            "Sella las rendijas de puertas y ventanas con cinta de carrocero o toallas húmedas.",
            "Respira a través de un paño o toalla humedecida si percibes olor picante o químico."
        ],
        doNotDo: [
            "NO salgas a la calle a mirar qué ocurre ni vayas a buscar a los niños al colegio si el colegio ya activó su confinamiento.",
            "NO te refugies en sótanos si el gas tóxico es más pesado que el aire (la mayoría de gases clorados se acumulan abajo; sitúate en plantas intermedias o altas).",
            "NO enciendas llamas ni aparatos que puedan generar chispas."
        ],
        doAfter: [
            "Permanece confinado hasta que las autoridades declaren el fin del peligro por radio o megafonía.",
            "Si has estado expuesto: quítate la ropa exterior sin tocarte la cara, métela en una bolsa cerrada y lávate con abundante agua corriente.",
            "Ventila intensamente la casa una vez levantada la alerta oficial."
        ],
        seekHelp: "Si presentas dificultad respiratoria severa, ardor en ojos o garganta, vómitos o mareo intenso."
    },
    {
        id: "f38-ceniza-volcanica",
        card: "F38",
        title: "Ceniza Volcánica y Erupción",
        category: "geologico",
        icon: "🌋",
        description: "Lluvia de partículas abrasivas de roca pulverizada y gases volcánicos en suspensión.",
        doNow: [
            "Permanece dentro de la vivienda con puertas y ventanas herméticamente cerradas.",
            "Usa mascarilla N95/FFP2 y gafas de protección herméticas (tipo esquí o trabajo) si tienes que salir obligatoriamente.",
            "Cubre depósitos de agua, canalones y tomas de aire para evitar contaminación y colapso.",
            "Protege a tus mascotas manteniéndolas en el interior y limpia sus patas si pisan ceniza."
        ],
        doNotDo: [
            "NO uses lentes de contacto bajo ninguna circunstancia (la ceniza actúa como lija sobre la córnea).",
            "NO conduzcas a menos que sea imprescindible; la ceniza ciega la visibilidad y obstruye los filtros de motor al instante.",
            "NO dejes acumular ceniza seca en tejados planos (el peso puede causar derrumbe; límpiala con cuidado)."
        ],
        doAfter: [
            "Humedece ligeramente la ceniza antes de barrerla para evitar que vuelva a levantarse en el aire.",
            "Desecha la ceniza en bolsas resistentes; NUNCA la eches por el desagüe (forma un cemento que bloquea tuberías).",
            "Revisa filtros de aire de la casa y del vehículo antes de volver a encender motores."
        ],
        seekHelp: "Si personas asmáticas o con problemas pulmonares crónicos sufren crisis respiratorias agudas."
    },
    {
        id: "f39-caida-sistemas",
        card: "F39",
        title: "Caída de Sistemas Bancarios y TPV",
        category: "social",
        icon: "💳",
        description: "Ciberataque o fallo de red en telecomunicaciones: tarjetas, cajeros y apps bancarias no responden.",
        doNow: [
            "Utiliza tu reserva de efectivo en billetes pequeños (Ficha 18) para compras indispensables de comida, agua o combustible.",
            "Conserva todos los comprobantes y recibos físicos de las transacciones realizadas.",
            "Evita realizar transferencias repetidas por pánico desde apps mientras los servidores bancarios estén inestables.",
            "Consulta fuentes oficiales sobre la naturaleza del corte (ataque o mantenimiento)."
        ],
        doNotDo: [
            "NO confíes en que 'todo se paga con el móvil'; en caída de red no hay Bizum, Apple Pay ni datáfono.",
            "NO caigas en estafas por SMS o llamadas de supuestos 'bancos' solicitando claves o números de tarjeta.",
            "NO realices compras innecesarias de lujo mientras dure la incertidumbre transaccional."
        ],
        doAfter: [
            "Registra tus gastos en un cuaderno físico de control del plan familiar.",
            "Repón el efectivo gastado en tu caja de seguridad en cuanto se restablezca la red bancaria.",
            "Ten cuentas en al menos dos entidades bancarias diferentes para diversificar riesgos."
        ],
        seekHelp: "Si eres víctima de fraude o bloqueo indebido total de fondos una vez restablecido el sistema bancario."
    },
    {
        id: "f40-nuclear",
        card: "F40",
        title: "Emergencia Radiológica o Nuclear",
        category: "nuclear",
        icon: "☢️",
        description: "Detonación nuclear, ataque con arma atómica o accidente en reactor. Protocolo de los primeros 10 segundos a 72 horas.",
        doNow: [
            "0-10 SEGUNDOS: NO mires el destello (ceguera permanente). Tírate al suelo de espaldas a la explosión, cúbrete la cabeza y abre la boca para equilibrar la presión en los oídos.",
            "10 MINUTOS: Entra en el edificio más masivo disponible (sótano, hormigón, centro de bloque).",
            "Cierra puertas, ventanas y conductos de ventilación. Cada capa de masa (tierra, hormigón, ladrillo) reduce la radiación gamma.",
            "DESCONTAMINACIÓN: Quítate la ropa exterior (elimina hasta el 90% del material radiactivo), métela en una bolsa doble y lávate suavemente con agua y jabón sin raspar la piel."
        ],
        doNotDo: [
            "NO salgas al exterior durante las primeras 24 a 72 horas; la radiactividad del 'fallout' decae exponencialmente con el tiempo (regla 7/10: decae un 90% a las 7 horas).",
            "NO tomes pastillas de Yoduro de Potasio (KI) a menos que haya una orden explícita y confirmada de las autoridades sanitarias.",
            "NO uses acondicionador de pelo al lavarte (fija los radionucleidos al tallo capilar).",
            "NO bebas agua del grifo ni comas alimentos que no estuvieran herméticamente cerrados antes del evento."
        ],
        doAfter: [
            "Permanece en el refugio al menos 48-72 horas escuchando la radio de emergencia.",
            "Raciona el agua potable limpia y consume alimentos en lata limpiando la tapa antes de abrirla.",
            "Planifica la salida solo cuando los medidores radiológicos oficiales o las autoridades lo indiquen seguro."
        ],
        seekHelp: "Si alguien presenta vómitos inmediatos en la primera hora tras la exposición masiva (signo de síndrome agudo por radiación severo)."
    }
];
