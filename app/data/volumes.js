export const VOLUMES = [
    {
        id: "vol-1-nuclear",
        number: "Volumen I",
        title: "Protocolo de Supervivencia Nuclear",
        subtitle: "Guía maestra ejecutable para eventos radiológicos y atómicos.",
        badge: "Fundacional",
        icon: "☢️",
        coverColor: "#ef4444",
        readTime: "25 min de lectura",
        chapters: [
            {
                id: "v1-c1",
                title: "1. Comprender el Riesgo: Física y Efectos de la Detonación",
                summary: "Onda de choque, radiación térmica, pulso electromagnético (EMP) y radiación ionizante.",
                content: `
                    <h2>1.1 Qué ocurre en una explosión nuclear</h2>
                    <p>Una detonación nuclear libera una cantidad colosal de energía en cuatro formas principales:</p>
                    <ul>
                        <li><strong>Onda expansiva y sobrepresión (50% de la energía):</strong> Un frente de viento huracanado supersónico que destruye estructuras y proyecta escombros a cientos de kilómetros por hora.</li>
                        <li><strong>Radiación térmica (35% de la energía):</strong> Un destello térmico instantáneo capaz de provocar ceguera temporal o permanente y quemaduras graves a varios kilómetros del hipocentro.</li>
                        <li><strong>Radiación ionizante inicial y fallout (15% de la energía):</strong> Rayos gamma y neutrones emitidos en el primer minuto, seguidos por la lluvia radiactiva (*fallout*) que cae durante las primeras horas.</li>
                        <li><strong>Pulso Electromagnético (EMP):</strong> Una sobretensión electromagnética invisible que fríe circuitos integrados, redes eléctricas, transformadores y telecomunicaciones sin blindaje.</li>
                    </ul>

                    <div class="callout callout-danger">
                        <strong>⚠️ Regla de los primeros 10 segundos:</strong>
                        <p>NUNCA mires al destello luminoso. Tírate de inmediato al suelo boca abajo, con los pies en dirección a la explosión, las manos bajo el pecho cubriendo la cabeza, los ojos cerrados y la boca entreabierta para ecualizar la presión en los tímpanos.</p>
                    </div>

                    <h2>1.2 Zonas de daño relativo</h2>
                    <p>A menos que estés en el epicentro absoluto (zona de vaporización total), la supervivencia depende directamente de la rapidez con la que encuentres masa protectora entre tú y el exterior.</p>
                `
            },
            {
                id: "v1-c2",
                title: "2. La Regra 7/10 y el Decaimiento del Fallout",
                summary: "Por qué el confinamiento en las primeras 48 a 72 horas salva vidas.",
                content: `
                    <h2>2.1 El decaimiento radiactivo exponencial</h2>
                    <p>El polvo radiactivo o <em>fallout</em> pierde su potencia de forma extremadamente acelerada en los primeros días gracias a la <strong>Regla 7/10 de la física nuclear</strong>:</p>
                    <blockquote>
                        <em>"Por cada incremento de 7 veces en el tiempo transcurrido tras la detonación, la tasa de dosis de radiación decae en un factor de 10 (se reduce un 90%)."</em>
                    </blockquote>

                    <div class="timeline-box">
                        <div class="timeline-step">
                            <span class="step-time">H + 1 hora</span>
                            <span class="step-val">100% de intensidad (Dosis de referencia)</span>
                        </div>
                        <div class="timeline-step">
                            <span class="step-time">H + 7 horas</span>
                            <span class="step-val">10% de intensidad (Reducción del 90%)</span>
                        </div>
                        <div class="timeline-step">
                            <span class="step-time">H + 49 horas (~2 días)</span>
                            <span class="step-val">1% de intensidad (Reducción del 99%)</span>
                        </div>
                        <div class="timeline-step">
                            <span class="step-time">H + 2 semanas</span>
                            <span class="step-val">0.1% de intensidad (Reducción del 99.9%)</span>
                        </div>
                    </div>

                    <p>Esto demuestra que permanecer dentro del refugio durante las primeras <strong>48 a 72 horas</strong> es la diferencia entre una dosis letal y una supervivencia sin secuelas graves.</p>
                `
            },
            {
                id: "v1-c3",
                title: "3. Blindaje y Factores de Reducción por Material",
                summary: "Qué materiales detienen la radiación gamma y cómo improvisar masa en casa.",
                content: `
                    <h2>3.1 Cómo detener la radiación gamma</h2>
                    <p>La radiación gamma no se detiene con papel o ropa; requiere <strong>densidad y masa</strong>. La siguiente tabla indica el espesor de material necesario para reducir la radiación a la mitad (Capa de Hemirreducción):</p>

                    <table class="content-table">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Espesor para reducir 50%</th>
                                <th>Espesor para reducir 99%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plomo</td>
                                <td>1.3 cm</td>
                                <td>9 cm</td>
                            </tr>
                            <tr>
                                <td>Hormigón armado / Concreto</td>
                                <td>6 cm</td>
                                <td>40 cm</td>
                            </tr>
                            <tr>
                                <td>Tierra compactada / Arena</td>
                                <td>9 cm</td>
                                <td>60 cm</td>
                            </tr>
                            <tr>
                                <td>Ladrillo macizo</td>
                                <td>7.5 cm</td>
                                <td>50 cm</td>
                            </tr>
                            <tr>
                                <td>Agua</td>
                                <td>18 cm</td>
                                <td>120 cm</td>
                            </tr>
                            <tr>
                                <td>Madera</td>
                                <td>28 cm</td>
                                <td>180 cm</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="callout callout-info">
                        <strong>💡 Consejo práctico en vivienda:</strong>
                        <p>El punto más seguro en un bloque de pisos es el sótano interior o los pisos intermedios alejados de fachadas y tejados. Apila libros pesados, garrafas de agua, colchones y muebles macizos contra las paredes exteriores de tu habitación refugio.</p>
                    </div>
                `
            },
            {
                id: "v1-c4",
                title: "4. Protocolo de Descontaminación Personal",
                summary: "Cómo quitarse la ropa y lavarse sin transferir partículas al organismo.",
                content: `
                    <h2>4.1 Pasos secuenciales de descontaminación</h2>
                    <p>Si estuviste al aire libre cuando comenzó a caer el polvo radiactivo:</p>
                    <ol>
                        <li><strong>Retirar la ropa exterior antes de entrar al refugio:</strong> Quitarse la chaqueta, zapatos y pantalón elimina hasta el <strong>90%</strong> del material radiactivo depositado.</li>
                        <li><strong>Embolsado hermético:</strong> Mete la ropa en una bolsa plástica resistente, ciérrala con cinta y colócala en una esquina aislada lejos de las personas.</li>
                        <li><strong>Lavado suave:</strong> Dúchate con agua tibia y jabón suave. <em>NUNCA frotes con fuerza</em> (raspar la piel facilita que los radionucleidos penetren en el torrente sanguíneo).</li>
                        <li><strong>ADVERTENCIA sobre el cabello:</strong> Usa champú pero NUNCA acondicionador ni cremas capilares; los aceites fijan las partículas radiactivas al folículo.</li>
                        <li><strong>Limpieza de orificios:</strong> Suénate la nariz suavemente y límpiate párpados, orejas y boca con una toalla húmeda limpia.</li>
                    </ol>
                `
            }
        ]
    },
    {
        id: "vol-2-luz-agua",
        number: "Volumen II",
        title: "Sin Luz y Sin Agua",
        subtitle: "Gestión doméstica de apagones prolongados y cortes urbanos de suministro.",
        badge: "Básicos",
        icon: "⚡",
        coverColor: "#3b82f6",
        readTime: "20 min de lectura",
        chapters: [
            {
                id: "v2-c1",
                title: "1. Las Primeras 2 Horas del Apagón (Secuencia M0 a M60)",
                summary: "Prioridades minuto a minuto cuando la red eléctrica colapsa.",
                content: `
                    <h2>1.1 La anatomía de un apagón sistémico</h2>
                    <p>La red eléctrica funciona en un equilibrio constante y milimétrico entre generación y demanda. Cuando este equilibrio se rompe, las centrales se desconectan por seguridad en cascada (arranque en frío o <em>black start</em>), lo que puede tardar días en sincronizarse de nuevo.</p>

                    <h2>1.2 Cronología de acción inmediata</h2>
                    <ul>
                        <li><strong>Minuto 0 a 5:</strong> Mantén la calma. Usa una linterna LED. No enciendas velas hasta asegurarte de que no hay olor a gas.</li>
                        <li><strong>Minuto 5 a 15:</strong> Abre los grifos y llena todas las ollas, termos y la bañera mientras quede presión por gravedad en las tuberías.</li>
                        <li><strong>Minuto 15 a 30:</strong> Desconecta los aparatos electrónicos costosos del enchufe para protegerlos de la sobretensión cuando la energía regrese.</li>
                        <li><strong>Minuto 30 a 60:</strong> Revisa el estado de la nevera. NO la abras para mirar. Establece el protocolo de comidas familiares.</li>
                    </ul>
                `
            },
            {
                id: "v2-c2",
                title: "2. Gestión del Refrigerador: Regla 4h / 48h",
                summary: "Cómo conservar los alimentos perecederos y evitar intoxicaciones bacterianas.",
                content: `
                    <h2>2.1 Tiempos máximos de frío seguro</h2>
                    <p>Las bacterias peligrosas (Salmonella, Listeria, E. Coli) se multiplican exponencialmente a temperaturas superiores a los 4°C. Ten en cuenta estos límites innegociables:</p>
                    
                    <div class="callout callout-warning">
                        <strong>⏱️ Tiempos críticos:</strong>
                        <ul>
                            <li><strong>Nevera cerrada:</strong> Mantiene la temperatura segura durante <strong>4 horas</strong>.</li>
                            <li><strong>Congelador medio lleno:</strong> Mantiene el frío durante <strong>24 horas</strong>.</li>
                            <li><strong>Congelador lleno:</strong> Mantiene el frío durante <strong>48 horas</strong> si no se abre.</li>
                        </ul>
                    </div>

                    <h2>2.2 Orden estricto de consumo</h2>
                    <p>1° Lácteos abiertos, carnes frescas y sobras de la nevera en las primeras 4 horas.<br>
                    2° Alimentos descongelados del congelador que aún tengan cristales de hielo (cocinar bien).<br>
                    3° Conservas, latas y alimentos secos de la despensa una vez agotado lo perecedero.</p>
                `
            },
            {
                id: "v2-c3",
                title: "3. La Reserva de Agua: 4 Litros / Persona / Día",
                summary: "Cálculo real de reserva, métodos de almacenamiento y potabilización sin mitos.",
                content: `
                    <h2>3.1 Por qué 4 litros por persona al día</h2>
                    <p>El estándar internacional de preparación humanitaria desglosa los 4 litros de la siguiente forma:</p>
                    <ul>
                        <li><strong>2.5 Litros:</strong> Hidratación y consumo directo (aumentar en climas calurosos o esfuerzo).</li>
                        <li><strong>1.0 Litro:</strong> Preparación básica de alimentos (hidratar arroz, pasta, sopas).</li>
                        <li><strong>0.5 Litros:</strong> Higiene mínima indispensable (lavado dental y manos).</li>
                    </ul>

                    <h2>3.2 Métodos de desinfección doméstica</h2>
                    <ol>
                        <li><strong>Hervido vigoroso:</strong> 1 minuto a borbotones continuos mata el 99.9% de bacterias, virus y parásitos.</li>
                        <li><strong>Cloro / Lejía apta para desinfección de agua de bebida:</strong> 2 gotas de lejía (sin perfumes ni detergentes) por litro de agua clara. Esperar 30 minutos antes de consumir.</li>
                        <li><strong>Microfiltración (Sawyer Mini / Katadyn):</strong> Filtra bacterias y protozoos mecánicamente hasta 0.1 micras.</li>
                    </ol>
                `
            }
        ]
    },
    {
        id: "vol-3-evacuacion",
        number: "Volumen III",
        title: "Cuando Hay Que Salir",
        subtitle: "Evacuación táctica, mochila de 72 horas y respuesta ante sismos, fuego e inundaciones.",
        badge: "Movilidad",
        icon: "🎒",
        coverColor: "#10b981",
        readTime: "22 min de lectura",
        chapters: [
            {
                id: "v3-c1",
                title: "1. Quedarse o Salir: La Decisión Basada en Hechos",
                summary: "Disparadores escritos, niveles de alerta y psicología del retraso en la evacuación.",
                content: `
                    <h2>1.1 Por qué la gente evacúa demasiado tarde</h2>
                    <p>El sesgo de normalidad y el apego a los bienes materiales hace que las personas retrasen la salida hasta que la carretera está cortada o el humo rodea la vivienda. Para sobrevivir, la decisión de evacuar debe responder a <strong>disparadores objetivos</strong>, no a emociones.</p>

                    <h2>1.2 Tabla de modo por defecto según evento</h2>
                    <table class="content-table">
                        <thead>
                            <tr>
                                <th>Evento</th>
                                <th>Modo por Defecto</th>
                                <th>Matiz o Disparador de Cambio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nuclear / Fallout</td>
                                <td><strong>Refugio (Confinarse)</strong></td>
                                <td>Solo evacuar tras 48-72h o con orden de convoy militar.</td>
                            </tr>
                            <tr>
                                <td>Incendio Doméstico</td>
                                <td><strong>Evacuación Inmediata</strong></td>
                                <td>Tienes de 2 a 3 minutos; jamás intentes apagar un fuego extendido.</td>
                            </tr>
                            <tr>
                                <td>Incendio Forestal</td>
                                <td><strong>Evacuación Temprana</strong></td>
                                <td>Salir al primer aviso municipal; no esperar a ver el fuego.</td>
                            </tr>
                            <tr>
                                <td>Sismo</td>
                                <td><strong>Cubrirse -> Evacuar</strong></td>
                                <td>Agacharse durante el temblor; evacuar por escaleras al terminar.</td>
                            </tr>
                            <tr>
                                <td>Inundación / DANA</td>
                                <td><strong>Subir / Evacuar</strong></td>
                                <td>Si estás en planta baja o coche, buscar altura inmediata.</td>
                            </tr>
                        </tbody>
                    </table>
                `
            },
            {
                id: "v3-c2",
                title: "2. La Mochila de 72 Horas: El Sistema de 3 Capas",
                summary: "La regla de los 20 minutos caminando y las tres capas de supervivencia.",
                content: `
                    <h2>2.1 La regla de oro del peso</h2>
                    <p>Una mochila de evacuación que no puedas cargar caminando a buen ritmo durante <strong>20 minutos continuos sin ayuda</strong> es una trampa. El peso ideal no debe superar el 15-20% de tu peso corporal.</p>

                    <h2>2.2 Las 3 Capas Fundamentales</h2>
                    <ul>
                        <li><strong>Capa 1 (Protege ahora):</strong> Ropa resistente de repuesto, calzado cómodo, impermeable, linterna frontal, botiquín básico con tus medicamentos, navaja multiusos.</li>
                        <li><strong>Capa 2 (Sostiene 72 horas):</strong> 2-3 litros de agua en envase flexible, barritas energéticas / frutos secos de alto valor calórico, filtro de agua portátil, manta térmica reflectante.</li>
                        <li><strong>Capa 3 (Reconstruye después):</strong> Copia de documentos de identidad, escrituras, pólizas y tarjetas en bolsa estanca o USB cifrado, dinero en efectivo en billetes pequeños, cargador solar/powerbank.</li>
                    </ul>
                `
            }
        ]
    },
    {
        id: "vol-4-despensa",
        number: "Volumen IV",
        title: "La Despensa Inteligente",
        subtitle: "Seguridad alimentaria, despensa por capas (7/30/90 días) y rotación sin desperdicio.",
        badge: "Nutrición",
        icon: "🥫",
        coverColor: "#f59e0b",
        readTime: "18 min de lectura",
        chapters: [
            {
                id: "v4-c1",
                title: "1. La Despensa por Capas y la Regla del Uno Más",
                summary: "Cómo construir una reserva de 30 a 90 días sin compras de pánico.",
                content: `
                    <h2>1.1 Por qué se vacían los supermercados</h2>
                    <p>Las cadenas de distribución modernas operan bajo el modelo *Just-In-Time*, manteniendo solo 2 a 3 días de existencias en tienda. Cualquier alteración climática, huelga o pánico colectivo agota los estantes en menos de 24 horas.</p>

                    <h2>1.2 La regla del 'Uno Más'</h2>
                    <p>No necesitas gastar una fortuna de golpe. Cada vez que hagas tu compra habitual de alimentos no perecederos que tu familia ya consume (arroz, latas de atún, pasta, legumbres), compra <strong>una o dos unidades extra</strong>. En 6 a 8 semanas habrás creado una reserva de 30 días sin esfuerzo financiero.</p>
                `
            },
            {
                id: "v4-c2",
                title: "2. FIFO Doméstico: Rotar sin Tirar Comida",
                summary: "First In, First Out: orden de almacenamiento para evitar caducidades.",
                content: `
                    <h2>2.1 El método de las 3 reglas</h2>
                    <ol>
                        <li><strong>Lo más antiguo al frente:</strong> Al guardar una compra nueva, empuja las latas y paquetes antiguos hacia adelante y coloca lo nuevo detrás.</li>
                        <li><strong>Fechado visible:</strong> Con un rotulador permanente, escribe el mes y año de compra o caducidad en grande sobre la tapa de latas y cajas.</li>
                        <li><strong>Consumo preferente vs. Caducidad:</strong> Aprende a distinguir: la fecha de caducidad aplica a productos frescos y microbiológicos peligrosos; la fecha de consumo preferente indica que el alimento en conserva seca sigue siendo seguro comestiblemente mucho tiempo después.</li>
                    </ol>
                `
            }
        ]
    },
    {
        id: "vol-5-hidroponia",
        number: "Volumen V",
        title: "Soberanía Alimentaria e Hidroponía Pasiva",
        subtitle: "Cultivo continuo sin electricidad (Método Kratky) y clonación por restos de cocina.",
        badge: "Autonomía",
        icon: "🌱",
        coverColor: "#10b981",
        readTime: "25 min de lectura",
        chapters: [
            {
                id: "v5-c1",
                title: "1. Principios Fisiológicos: Totipotencia Celular y Regeneración de Restos de Cocina",
                summary: "Cómo multiplicar cebollín, lechuga romana, apio y aromáticas a partir de descartes sin semillas.",
                content: `
                    <h2>1.1 La ciencia de la totipotencia celular</h2>
                    <p>En un colapso de suministros, las semillas pueden ser escasas. Las plantas conservan células meristemáticas en la base de los tallos y nodos foliares capaces de reprogramarse y emitir raíces adventicias al contacto con agua y luz: es la <strong>clonación vegetal pasiva</strong>.</p>
                    
                    <div class="callout callout-info">
                        <strong>🧅 Protocolo Cebollín / Verdeo (5 a 7 días):</strong>
                        <p>Corta la base blanca conservando entre 2 y 5 cm junto con sus raíces primarias. Colócala vertical en un frasco con exactamente 2.5 cm de agua limpia (solo cubriendo el plato radicular, sin sumergir el tallo). En 5-7 días obtendrás tallos verdes nuevos listos para el consumo.</p>
                    </div>

                    <div class="callout callout-info">
                        <strong>🥬 Protocolo Lechuga Romana y Apio (10 a 14 días):</strong>
                        <p>Corte transversal a 5 cm de la base del corazón. Retira hojas marchitas y coloca verticalmente en 1.5 a 2.5 cm de agua en ventana soleada (8 horas de luz directa). Cambia el agua cada 2 días para oxigenar.</p>
                    </div>

                    <h2>1.2 La Regla de la Raíz (2.5 a 5 cm)</h2>
                    <p>El agua pura carece de macronutrientes. Cuando las raíces adventicias alcancen entre <strong>2.5 y 5.0 cm</strong>, es fisiológicamente obligatorio trasplantar a sustrato nutrido o añadir solución hidropónica al 50%. Retener la planta en agua más allá de este umbral causa inanición celular y clorosis.</p>
                `
            },
            {
                id: "v5-c2",
                title: "2. Arquitectura del Sistema Hidropónico Pasivo Kratky (Cero Electricidad)",
                summary: "El sistema de la Universidad de Hawái para cultivar en botellas PET recicladas sin bombas ni ruidos.",
                content: `
                    <h2>2.1 El principio de la cámara de aire húmedo (Air Gap)</h2>
                    <p>El Método Kratky prescinde por completo de energía eléctrica, bombas sumergibles y temporizadores. A medida que la planta consume la solución nutritiva, el nivel desciende de forma irreversible, creando una cámara de aire húmedo saturada de vapor:</p>
                    <ul>
                        <li><strong>Raíces superiores (aéreas):</strong> Suspendidas en la cámara <em>air gap</em>, absorben oxígeno atmosférico directamente.</li>
                        <li><strong>Raíces inferiores (nutricionales):</strong> Sumergidas en el fluido, captan agua e iones minerales disueltos.</li>
                    </ul>

                    <h2>2.2 Autoconstrucción con botellas PET de 500 ml a 5 Litros</h2>
                    <ol>
                        <li><strong>Corte e inversión anatómica:</strong> Corta el tercio superior de la botella e inviértelo sobre la base a modo de embudo o canastilla de soporte.</li>
                        <li><strong>Control estricto de algas:</strong> La luz solar sobre fertilizante genera algas unicelulares que agotan el oxígeno. Forra obligatoriamente el depósito con pintura, cartón o tela opaca.</li>
                        <li><strong>Ventana vertical de inspección:</strong> Deja una franja vertical estrecha sin pintar para monitorear el nivel del líquido sin destapar las raíces.</li>
                        <li><strong>Método Ultra-simplificado (Lim San):</strong> Sujeta el tallo en el cuello invertido con un trozo de esponja o tapón perforado, eliminando la necesidad de sustratos caros.</li>
                    </ol>
                `
            },
            {
                id: "v5-c3",
                title: "3. Nutrición Mineral, Control de pH (5.5 - 6.5) y Resolución de Problemas",
                summary: "Equilibrio N-P-K, control de acidez y diagnóstico rápido de patógenos.",
                content: `
                    <h2>3.1 Rango óptimo de absorción iónica</h2>
                    <p>El pH de la solución determina si la raíz puede absorber los nutrientes. El rango óptimo fisiológico se sitúa estrictamente entre <strong>5.5 y 6.5</strong>. Por encima de 6.5, el hierro y el fósforo precipitan y la planta sufre carencias.</p>

                    <h2>3.2 Tabla de Diagnóstico Rápido de Emergencia</h2>
                    <table class="content-table">
                        <thead>
                            <tr>
                                <th>Síntoma</th>
                                <th>Causa Probable</th>
                                <th>Acción Inmediata</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Agua turbia / olor fétido</td>
                                <td>Proliferación bacteriana anaeróbica</td>
                                <td>Desechar planta, desinfectar frasco con agua caliente y reiniciar.</td>
                            </tr>
                            <tr>
                                <td>Hojas amarillas (Clorosis)</td>
                                <td>Agotamiento celular o falta de luz</td>
                                <td>Mover a 8h de sol directo; añadir solución nutritiva al 50%.</td>
                            </tr>
                            <tr>
                                <td>Algas verdes en paredes</td>
                                <td>Depósito transparente expuesto a luz</td>
                                <td>Opacificar exterior con cartón o pintura oscura.</td>
                            </tr>
                            <tr>
                                <td>Moho blanco en el corte</td>
                                <td>Exceso de humedad superior</td>
                                <td>Cortar tejido afectado con cuchillo esterilizado y bajar nivel de agua.</td>
                            </tr>
                        </tbody>
                    </table>
                `
            }
        ]
    }
];
