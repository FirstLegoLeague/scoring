{
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 VIAJE ESPACIAL",
            "description": "Iniciad cada Carga Útil para que ruede claramente a lo largo de la Rampa de Viaje Espacial. Para cada envío, el carro debe ser independiente en el momento que alcance la primera conexión de pista.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "La Carga de Vehículo rebasó la primera conexión de pista",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "La Carga de Suministros rebasó la primera conexión de pista",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "La Carga de Tripulación rebasó la primera conexión de pista",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M01_1, M01_2, M01_3) {
                if (M01_1 === 'no' && M01_2 === 'no' && M01_3 === 'no') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === 'no' && M01_3 === 'yes') {
                    return 10
                }
                if (M01_1 === 'no' && M01_2 === 'yes' && M01_3 === 'no') {
                    return 14
                }
                if (M01_1 === 'no' && M01_2 === 'yes' && M01_3 === 'yes') {
                    return 24
                }
                if (M01_1 === 'yes' && M01_2 === 'no' && M01_3 === 'no') {
                    return 22
                }
                if (M01_1 === 'yes' && M01_2 === 'no' && M01_3 === 'yes') {
                    return 32
                }
                if (M01_1 === 'yes' && M01_2 === 'yes' && M01_3 === 'no') {
                    return 36
                }
                if (M01_1 === 'yes' && M01_2 === 'yes' && M01_3 === 'yes') {
                    return 46
                }
            }]
        },
        {
            "title": "M02 SISTEMA DE PANELES SOLARES",
            "description": "Los Paneles Solares se tienen que inclinar en un sentido u otro, dependiendo de las condiciones y la estrategia.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Ambos Paneles Solares están inclinados hacia el mismo Terreno de Juego",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "Vuestro Panel Solar está inclinado hacia el Terreno de Juego del otro equipo",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M02_1, M02_2) {
                if (M02_1 === 'no' && M02_2 === 'no') {
                    return 0
                }
                if (M02_1 === 'no' && M02_2 === 'yes') {
                    return 18
                }
                if (M02_1 === 'yes' && M02_2 === 'no') {
                    return 22
                }
                if (M02_1 === 'yes' && M02_2 === 'yes') {
                    return 40
                }
            }]
        },
        {
            "title": "M03 IMPRESIÓN 3D",
            "description": "Expulsad el Ladrillo 2x4 depositando una Muestra Básica de Regolito dentro de la impresora 3D.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "El Ladrillo 2x4 está expulsado",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "El Ladrillo 2x4 está completamente dentro de la Zona del Planeta del Nordeste",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M03_1, M03_2) {
                if (M03_1 === 'no' && M03_2 === 'no') {
                    return 0
                }
                if (M03_1 === 'no' && M03_2 === 'yes') {
                    return 0
                }
                if (M03_1 === 'yes' && M03_2 === 'no') {
                    return 18
                }
                if (M03_1 === 'yes' && M03_2 === 'yes') {
                    return 22
                }
            }]
        },
        {
            "title": "M04 ATRAVESANDO CRÁTERES",
            "description": "El Robot o cualquier nave que este envíe tiene que cruzar completamente el Modelo de Cráteres circulando directamente sobre él. Sin pasar cerca. Sin rodearlo.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Todos los elementos que soportan el peso del equipamiento cruzaron completamente entre las torres",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Todo el equipamiento cruzó de este a oeste rebasando completamente la valla bajada",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M04_1, M04_2) {
                if (M04_1 === 'no' && M04_2 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === 'yes') {
                    return 0
                }
                if (M04_1 === 'yes' && M04_2 === 'no') {
                    return 0
                }
                if (M04_1 === 'yes' && M04_2 === 'yes') {
                    return 20
                }
            }]
        },
        {
            "title": "M05 EXTRACCIÓN",
            "description": "El Robot tiene que expulsar todas las Muestras Básicas del Modelo de Instalación Central.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Las cuatro Muestras Básicas no están tocando el eje del Modelo de Instalación Central",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "La Muestra Básica de Gas está tocando el tapete y completamente dentro del Círculo de Aterrizaje del Módulo",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "La Muestra Básica de Gas está completamente dentro de la Base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "La Muestra Básica de Agua está únicamente aguantada por la Cámara de Crecimiento de Vegetales",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M05_1, M05_2, M05_3, M05_4) {
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'no' && M05_4 === 'no') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'no' && M05_4 === 'no') {
                    return 12
                }
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'yes' && M05_4 === 'no') {
                    return 10
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'yes' && M05_4 === 'no') {
                    return new Error("Verificad posición de la Muestra Básica de Gas")
                }
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'no' && M05_4 === 'yes') {
                    return 8
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'no' && M05_4 === 'yes') {
                    return 20
                }
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'yes' && M05_4 === 'yes') {
                    return 18
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'yes' && M05_4 === 'yes') {
                    return new Error("Verificad posición de la Muestra Básica de Gas")
                }
                if (M05_1 === 'yes' && M05_2 === 'no' && M05_3 === 'no' && M05_4 === 'no') {
                    return 16
                }
                if (M05_1 === 'yes' && M05_2 === 'yes' && M05_3 === 'no' && M05_4 === 'no') {
                    return 28
                }
                if (M05_1 === 'yes' && M05_2 === 'no' && M05_3 === 'yes' && M05_4 === 'no') {
                    return 26
                }
                if (M05_1 === 'yes' && M05_2 === 'yes' && M05_3 === 'yes' && M05_4 === 'no') {
                    return new Error("Verificad posición de la Muestra Básica de Gas")
                }
                if (M05_1 === 'yes' && M05_2 === 'no' && M05_3 === 'no' && M05_4 === 'yes') {
                    return 24
                }
                if (M05_1 === 'yes' && M05_2 === 'yes' && M05_3 === 'no' && M05_4 === 'yes') {
                    return 36
                }
                if (M05_1 === 'yes' && M05_2 === 'no' && M05_3 === 'yes' && M05_4 === 'yes') {
                    return 34
                }
                if (M05_1 === 'yes' && M05_2 === 'yes' && M05_3 === 'yes' && M05_4 === 'yes') {
                    return new Error("Verificad posición de la Muestra Básica de Gas")
                }
            }]
        },
        {
            "title": "M06 MÓDULOS DE LA ESTACIÓN ESPACIAL",
            "description": "El Robot tiene que retirar e insertar Módulos Habitables entre las escotillas del Núcleo de la Estación. Los Módulos insertados NO deben tocar nada excepto el Núcleo de la Estación.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "El Módulo Cónico está completamente dentro de la Base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "El Módulo Tubular está insertado en la escotilla oeste del Núcleo de la Estación",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "El Módulo de Atraque en la escotilla está insertadodel Núcleo de la Estación",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M06_1, M06_2, M06_3) {
                if (M06_1 === 'no' && M06_2 === 'no' && M06_3 === 'no') {
                    return 0
                }
                if (M06_1 === 'no' && M06_2 === 'no' && M06_3 === 'yes') {
                    return 14
                }
                if (M06_1 === 'no' && M06_2 === 'yes' && M06_3 === 'no') {
                    return 16
                }
                if (M06_1 === 'no' && M06_2 === 'yes' && M06_3 === 'yes') {
                    return 30
                }
                if (M06_1 === 'yes' && M06_2 === 'no' && M06_3 === 'no') {
                    return 16
                }
                if (M06_1 === 'yes' && M06_2 === 'no' && M06_3 === 'yes') {
                    return 30
                }
                if (M06_1 === 'yes' && M06_2 === 'yes' && M06_3 === 'no') {
                    return 32
                }
                if (M06_1 === 'yes' && M06_2 === 'yes' && M06_3 === 'yes') {
                    return 46
                }
            }]
        },
        {
            "title": "M07 PASEO ESPACIAL DE EMERGENCIA",
            "description": "El Robot tiene que llevar el cuerpo de Gherard dentro de la Cámara Hermética.",
            "objectives": [{
                "id": "M07",
                "title": "El astrounauta Gherhard está insertado dentro de la Cámara Hermética del Núcleo de la Estación:",
                "options": [{
                        "value": "none",
                        "title": "No"
                    },
                    {
                        "value": "partially",
                        "title": "Parcialmente"
                    },
                    {
                        "value": "completely",
                        "title": "Completamente"
                    }
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M07) {
                if (M07 === 'none') {
                    return 0
                }
                if (M07 === 'partially') {
                    return 18
                }
                if (M07 === 'completely') {
                    return 22
                }
            }]
        },
        {
            "title": "M08 EJERCICIO AERÓBICO",
            "description": "Avanzad el Puntero a lo largo del Dial de la Máquina de Ejercicio moviendo una o ambas empuñaduras. Si el Puntero está cubriendo parcialmente un extremo de color gris o naranja, seleccionad dicho color.",
            "objectives": [{
                "id": "M08",
                "title": "El Puntero de Ejercicio está en:",
                "options": [{
                        "value": "none",
                        "title": "Ninguno"
                    },
                    {
                        "value": "gray",
                        "title": "Gris"
                    },
                    {
                        "value": "white",
                        "title": "Blanco"
                    },
                    {
                        "value": "orange",
                        "title": "Naranja"
                    }
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M08) {
                if (M08 === 'none') {
                    return 0
                }
                if (M08 === 'gray') {
                    return 18
                }
                if (M08 === 'white') {
                    return 20
                }
                if (M08 === 'orange') {
                    return 22
                }
            }]
        },
        {
            "title": "M09 EJERCICIO DE ESFUERZO",
            "description": "El Robot tiene que levantar la Barra de Esfuerzo hasta una altura que puntúe.",
            "objectives": [{
                "id": "M09",
                "title": "La Barra de Esfuerzo está levantada de modo que el cuarto agujero de la barra dentada es parcialmente visible",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M09) {
                if (M09 === 'no') {
                    return 0
                }
                if (M09 === 'yes') {
                    return 16
                }
            }]
        },
        {
            "title": "M10 PRODUCCIÓN DE VEGETALES",
            "description": "Moved la Barra de Empuje la distancia correcta a la velocidad adecuada para situarla en el rango de puntuación verde.",
            "objectives": [{
                "id": "M10",
                "title": "El peso gris está caído después del verde pero antes del beis",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M10) {
                if (M10 === 'no') {
                    return 0
                }
                if (M10 === 'yes') {
                    return 16
                }
            }]
        },
        {
            "title": "M11 - VELOCIDAD DE ESCAPE",
            "description": "Conseguid que la nave alcance la velocidad y la altura necesarias para que se mantenga arriba, presionando/golpeando el Panel de Impacto.",
            "objectives": [{
                "id": "M11",
                "title": "La Nave Espacial se mantiene arriba",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M11) {
                if (M11 === 'no') {
                    return 0
                }
                if (M11 === 'yes') {
                    return 24
                }
            }]
        },
        {
            "title": "M12 ÓRBITAS DE SATÉLITES",
            "description": "Moved cualquier parte de un Satélite sobre o por encima del área que hay entre las dos líneas de la Órbita Externa.",
            "objectives": [{
                "id": "M12",
                "title": "Satélites sobre o por encima del área entre las 2 líneas de la Órbita Externa:",
                "options": [{
                        "value": "0",
                        "title": "0"
                    },
                    {
                        "value": "1",
                        "title": "1"
                    },
                    {
                        "value": "2",
                        "title": "2"
                    },
                    {
                        "value": "3",
                        "title": "3"
                    }
                ],
                "type": "enum",
                "default": "0"
            }],
            "score": [function(M12) {
                if (M12 === '0') {
                    return 0
                }
                if (M12 === '1') {
                    return 8
                }
                if (M12 === '2') {
                    return 16
                }
                if (M12 === '3') {
                    return 24
                }
            }]
        },
        {
            "title": "M13 OBSERVATORIO",
            "description": "Rotad el Observatorio apuntando a una dirección precisa. Si el Puntero está cubriendo parcialmente un extremo de color gris o naranja, seleccionad dicho color.",
            "objectives": [{
                "id": "M13",
                "title": "El Puntero del Observatorio está en:",
                "options": [{
                        "value": "none",
                        "title": "Ninguno"
                    },
                    {
                        "value": "gray",
                        "title": "Gris"
                    },
                    {
                        "value": "white",
                        "title": "Blanco"
                    },
                    {
                        "value": "orange",
                        "title": "Naranja"
                    }
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M13) {
                if (M13 === 'none') {
                    return 0
                }
                if (M13 === 'gray') {
                    return 16
                }
                if (M13 === 'white') {
                    return 18
                }
                if (M13 === 'orange') {
                    return 20
                }
            }]
        },
        {
            "title": "M14 DESVIO DE METEOROIDES",
            "description": "Lanzad Meteoroides por encima de la Línea Libre para que toquen el tapete en el Receptor de Meteoroides.Los Meteoroides deben ser golpeados/liberados mientras\r\nestán clara y completamente al oeste de la Línea Libre. Mientras estén entre el golpeo/lanzamiento y la posición de puntuación, el Meteoroide debe ser claramente Independiente.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Meteoroides tocando el Tapete en la Sección Central:",
                    "options": [{
                            "value": "0",
                            "title": "0"
                        },
                        {
                            "value": "1",
                            "title": "1"
                        },
                        {
                            "value": "2",
                            "title": "2"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
                {
                    "id": "M14_2",
                    "title": "Meteoroides tocando el Tapete en cualquier Sección Lateral:",
                    "options": [{
                            "value": "0",
                            "title": "0"
                        },
                        {
                            "value": "1",
                            "title": "1"
                        },
                        {
                            "value": "2",
                            "title": "2"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                }
            ],
            "score": [function(M14_1, M14_2) {
                if (M14_1 === '0' && M14_2 === '0') {
                    return 0
                }
                if (M14_1 === '0' && M14_2 === '1') {
                    return 8
                }
                if (M14_1 === '0' && M14_2 === '2') {
                    return 16
                }
                if (M14_1 === '1' && M14_2 === '0') {
                    return 12
                }
                if (M14_1 === '1' && M14_2 === '1') {
                    return 20
                }
                if (M14_1 === '1' && M14_2 === '2') {
                    return new Error("Combinación imposible, demasiados Meteoroides")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Combinación imposible, demasiados Meteoroides")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Combinación imposible, demasiados Meteoroides")
                }
            }]
        },
        {
            "title": "M15 ATERRIZAJE DEL MÓDULO",
            "description": "Moved el Módulo de Aterrizaje para que esté intacto, tocando el Tapete y completamente dentro de la Zona Circular del Módulo o, al menos, dentro de la Base.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "El Módulo de Aterrizaje está  intacto y tocando el Tapete",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "El Módulo de Aterrizaje está completamente dentro de:",
                    "options": [{
                            "value": "no",
                            "title": "Ninguno"
                        },
                        {
                            "value": "base",
                            "title": "Base"
                        },
                        {
                            "value": "planet",
                            "title": "Zona del Planeta del Nordeste"
                        },
                        {
                            "value": "circle",
                            "title": "Zona Circular del Módulo"
                        }
                    ],
                    "type": "enum",
                    "default": "no"
                }
            ],
            "score": [function(M15_1, M15_2) {
                if (M15_1 === 'no' && M15_2 === 'no') {
                    return 0
                }
                if (M15_1 === 'no' && M15_2 === 'base') {
                    return 16
                }
                if (M15_1 === 'no' && M15_2 === 'circle') {
                    return 0
                }
                if (M15_1 === 'no' && M15_2 === 'planet') {
                    return 0
                }
                if (M15_1 === 'yes' && M15_2 === 'no') {
                    return 0
                }
                if (M15_1 === 'yes' && M15_2 === 'base') {
                    return 16
                }
                if (M15_1 === 'yes' && M15_2 === 'planet') {
                    return 20
                }
                if (M15_1 === 'yes' && M15_2 === 'circle') {
                    return 22
                }
            }]
        },
        {
            "title": "PENALIZACIONES POR INTERRUPCIÓN",
            "description": "Si interrumpís el Robot, el árbitro pondrá un Disco de Penalización en el triángulo del sudeste como un indicador de Interrupción permanente.",
            "objectives": [{
                "id": "penalties",
                "title": "Discos del Penalización dentro del triángulo del Sudeste:",
                "options": [{
                        "value": "0",
                        "title": "0"
                    },
                    {
                        "value": "1",
                        "title": "1"
                    },
                    {
                        "value": "2",
                        "title": "2"
                    },
                    {
                        "value": "3",
                        "title": "3"
                    },
                    {
                        "value": "4",
                        "title": "4"
                    },
                    {
                        "value": "5",
                        "title": "5"
                    },
                    {
                        "value": "6",
                        "title": "6"
                    }
                ],
                "type": "enum",
                "default": "0"
            }],
            "score": [function(penalties) {
                if (penalties === '0') {
                    return 0
                }
                if (penalties === '1') {
                    return -3
                }
                if (penalties === '2') {
                    return -6
                }
                if (penalties === '3') {
                    return -9
                }
                if (penalties === '4') {
                    return -12
                }
                if (penalties === '5') {
                    return -15
                }
                if (penalties === '6') {
                    return -18
                }
            }]
        }
    ],
    "strings": {
        "yes": "Si",
        "no": "No",
        "M01-name": "M01 VIAJE ESPACIAL",
        "M01-desc": "Iniciad cada Carga Útil para que ruede claramente a lo largo de la Rampa de Viaje Espacial. Para cada envío, el carro debe ser independiente en el momento que alcance la primera conexión de pista.",
        "M01-scoring1": "La Carga de Vehículo rebasó la primera conexión de pista",
        "M01-scoring2": "La Carga de Suministros rebasó la primera conexión de pista",
        "M01-scoring3": "La Carga de Tripulación rebasó la primera conexión de pista",
        "M02-name": "M02 SISTEMA DE PANELES SOLARES",
        "M02-desc": "Los Paneles Solares se tienen que inclinar en un sentido u otro, dependiendo de las condiciones y la estrategia.",
        "M02-scoring1": "Ambos Paneles Solares están inclinados hacia el mismo Terreno de Juego",
        "M02-scoring2": "Vuestro Panel Solar está inclinado hacia el Terreno de Juego del otro equipo",
        "M03-name": "M03 IMPRESIÓN 3D",
        "M03-desc": "Expulsad el Ladrillo 2x4 depositando una Muestra Básica de Regolito dentro de la impresora 3D.",
        "M03-scoring1": "El Ladrillo 2x4 está expulsado",
        "M03-scoring2": "El Ladrillo 2x4 está completamente dentro de la Zona del Planeta del Nordeste",
        "M04-name": "M04 ATRAVESANDO CRÁTERES",
        "M04-desc": "El Robot o cualquier nave que este envíe tiene que cruzar completamente el Modelo de Cráteres circulando directamente sobre él. Sin pasar cerca. Sin rodearlo.",
        "M04-scoring1": "Todos los elementos que soportan el peso del equipamiento cruzaron completamente entre las torres",
        "M04-scoring2": "Todo el equipamiento cruzó de este a oeste rebasando completamente la valla bajada",
        "M05-name": "M05 EXTRACCIÓN",
        "M05-desc": "El Robot tiene que expulsar todas las Muestras Básicas del Modelo de Instalación Central.",
        "M05-scoring1": "Las cuatro Muestras Básicas no están tocando el eje del Modelo de Instalación Central",
        "M05-scoring2": "La Muestra Básica de Gas está tocando el tapete y completamente dentro del Círculo de Aterrizaje del Módulo",
        "M05-scoring3": "La Muestra Básica de Gas está completamente dentro de la Base",
        "M05-scoring4": "La Muestra Básica de Agua está únicamente aguantada por la Cámara de Crecimiento de Vegetales",
        "M05-error": "Verificad posición de la Muestra Básica de Gas",
        "M06-name": "M06 MÓDULOS DE LA ESTACIÓN ESPACIAL",
        "M06-desc": "El Robot tiene que retirar e insertar Módulos Habitables entre las escotillas del Núcleo de la Estación. Los Módulos insertados NO deben tocar nada excepto el Núcleo de la Estación.",
        "M06-scoring1": "El Módulo Cónico está completamente dentro de la Base",
        "M06-scoring2": "El Módulo Tubular está insertado en la escotilla oeste del Núcleo de la Estación",
        "M06-scoring3": "El Módulo de Atraque en la escotilla está insertadodel Núcleo de la Estación",
        "M07-name": "M07 PASEO ESPACIAL DE EMERGENCIA",
        "M07-desc": "El Robot tiene que llevar el cuerpo de Gherard dentro de la Cámara Hermética.",
        "M07-scoring": "El astrounauta Gherhard está insertado dentro de la Cámara Hermética del Núcleo de la Estación:",
        "M07-scoring1": "No",
        "M07-scoring2": "Parcialmente",
        "M07-scoring3": "Completamente",
        "M08-name": "M08 EJERCICIO AERÓBICO",
        "M08-desc": "Avanzad el Puntero a lo largo del Dial de la Máquina de Ejercicio moviendo una o ambas empuñaduras. Si el Puntero está cubriendo parcialmente un extremo de color gris o naranja, seleccionad dicho color.",
        "M08-scoring": "El Puntero de Ejercicio está en:",
        "M08-scoring1": "Ninguno",
        "M08-scoring2": "Gris",
        "M08-scoring3": "Blanco",
        "M08-scoring4": "Naranja",
        "M09-name": "M09 EJERCICIO DE ESFUERZO",
        "M09-desc": "El Robot tiene que levantar la Barra de Esfuerzo hasta una altura que puntúe.",
        "M09-scoring": "La Barra de Esfuerzo está levantada de modo que el cuarto agujero de la barra dentada es parcialmente visible",
        "M10-name": "M10 PRODUCCIÓN DE VEGETALES",
        "M10-desc": "Moved la Barra de Empuje la distancia correcta a la velocidad adecuada para situarla en el rango de puntuación verde.",
        "M10-scoring": "El peso gris está caído después del verde pero antes del beis",
        "M11-name": "M11 - VELOCIDAD DE ESCAPE",
        "M11-desc": "Conseguid que la nave alcance la velocidad y la altura necesarias para que se mantenga arriba, presionando/golpeando el Panel de Impacto.",
        "M11-scoring": "La Nave Espacial se mantiene arriba",
        "M12-name": "M12 ÓRBITAS DE SATÉLITES",
        "M12-desc": "Moved cualquier parte de un Satélite sobre o por encima del área que hay entre las dos líneas de la Órbita Externa.",
        "M12-scoring": "Satélites sobre o por encima del área entre las 2 líneas de la Órbita Externa:",
        "M13-name": "M13 OBSERVATORIO",
        "M13-desc": "Rotad el Observatorio apuntando a una dirección precisa. Si el Puntero está cubriendo parcialmente un extremo de color gris o naranja, seleccionad dicho color.",
        "M13-scoring": "El Puntero del Observatorio está en:",
        "M13-scoring1": "Ninguno",
        "M13-scoring2": "Gris",
        "M13-scoring3": "Blanco",
        "M13-scoring4": "Naranja",
        "M14-name": "M14 DESVIO DE METEOROIDES",
        "M14-desc": "Lanzad Meteoroides por encima de la Línea Libre para que toquen el tapete en el Receptor de Meteoroides.Los Meteoroides deben ser golpeados/liberados mientras\r\nestán clara y completamente al oeste de la Línea Libre. Mientras estén entre el golpeo/lanzamiento y la posición de puntuación, el Meteoroide debe ser claramente Independiente.",
        "M14-scoring1": "Meteoroides tocando el Tapete en la Sección Central:",
        "M14-scoring2": "Meteoroides tocando el Tapete en cualquier Sección Lateral:",
        "M14-error": "Combinación imposible, demasiados Meteoroides",
        "M15-name": "M15 ATERRIZAJE DEL MÓDULO",
        "M15-desc": "Moved el Módulo de Aterrizaje para que esté intacto, tocando el Tapete y completamente dentro de la Zona Circular del Módulo o, al menos, dentro de la Base.",
        "M15-scoring1": "El Módulo de Aterrizaje está  intacto y tocando el Tapete",
        "M15-scoring2": "El Módulo de Aterrizaje está completamente dentro de:",
        "M15-scoring3": "Ninguno",
        "M15-scoring4": "Base",
        "M15-scoring5": "Zona del Planeta del Nordeste",
        "M15-scoring6": "Zona Circular del Módulo",
        "penalties-name": "PENALIZACIONES POR INTERRUPCIÓN",
        "penalties-desc": "Si interrumpís el Robot, el árbitro pondrá un Disco de Penalización en el triángulo del sudeste como un indicador de Interrupción permanente.",
        "penalties-scoring": "Discos del Penalización dentro del triángulo del Sudeste:"
    },
    "rtl": false
}
