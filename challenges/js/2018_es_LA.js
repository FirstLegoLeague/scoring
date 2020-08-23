const challenge = `({
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 Viajes espaciales",
            "description": "*Cada carga, claramente debe iniciar rodando por la rampa de deslizamiento espacial. Por cada lanzamiento el carro debe ✱ llegar de manera independiente a la primera conexión de la pista.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Carga del vehículo rodó pasando la primer conexión",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Carga del suministro rodó pasando la primer conexión",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "Carga de la tripulación rodó pasando la primer conexión",
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
            "title": "M02 Posición del Panel Solar",
            "description": "Los paneles solares deben ser articulados hacia un lado u otro",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Ambos paneles solares están orientados hacia el mismo campo",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "Tu panel solar está inclinado hacia el campo del otro equipo",
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
            "title": "M03 Impresora 3D",
            "description": "Expulsa el ladrillo 2X4 ✱ colocando una muestra de regolito en la impresora 3D.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "Expulsa el ladrillo 2X4 (debido solo a una muestra de regolito)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "El ladrillo 2X4 está completamente en el área del planeta noreste",
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
            "title": "M04 Cruzando el Cráter",
            "description": "El Robot o cualquier estructura que se envíe debe cruzar completamente el modelo, conduciendo directamente sobre él. No cerca del modelo. No alrededor del modelo",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Todo el Robot o la estructura debe cruzar con todo su peso entre las torres",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Todo el Robot o la estructura debe cruzar de este a oeste más allá de la puerta aplanada",
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
            "title": "M05 Extracción",
            "description": "El robot necesita extraer todas las muestras del núcleo del modelo del sitio central, luego tiene opciones para qué hacer con ellas, tal como se describe aquí, y en la misión M03.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Las cuatro muestras principales ya no se tocan con el eje del modelo",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "La muestra de Gas está tocando la pista/tapete y está completamente en el circulo del área de aterrizaje del Lander",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-O- la muestra de Gas está completamente en base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "La muestra de Agua está apoyada en la cámara de cultivo",
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
                    return new Error("Ubicación de la muestra de Gas")
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
                    return new Error("Ubicación de la muestra de Gas")
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
                    return new Error("Ubicación de la muestra de Gas")
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
                    return new Error("Ubicación de la muestra de Gas")
                }
            }]
        },
        {
            "title": "M06 Módulos de estación espacial",
            "description": "El robot necesita eliminar e insertar módulos entre los orificios del puerto de Habitación Hub. Los módulos insertados no deben tocar nada excepto el Habitación Hub.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "El módulo de Cono está completamente en base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "El módulo de Tubo está en el puerto oeste del Habitación Hub",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "Módulo de Base está en el puerto este del Habitación Hub",
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
            "title": "M07 Emergencia en la Caminata Espacial",
            "description": "El Robot debe mover a Gerhard para que su cuerpo se inserte en la cámara de descompresión.",
            "objectives": [{
                "id": "M07",
                "title": "El astronauta Gerhard está en la cámara de descompresión:",
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
            "title": "M08 Ejercicio aeróbico",
            "description": "El Robot necesita mover repetidamente uno o ambos conjuntos de asas de la máquina de ejercicios para hacer que el puntero avance. (Si el puntero cubre parcialmente los bordes finales gris o naranja, seleccione ese color.)",
            "objectives": [{
                "id": "M08",
                "title": "El puntero está apuntando a (debido solo al movimiento de uno o ambas asas de la máquina de ejercicios):",
                "options": [{
                        "value": "none",
                        "title": "None"
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
            "title": "M09 Ejercicio de fuerza",
            "description": "El Robot necesita levantar la barra de fuerza para anotar la altura.",
            "objectives": [{
                "id": "M09",
                "title": "La barra de fuerza se levanta para poder ver el cuarto orificio de la viga con cremallera al menos de forma parcial.",
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
            "title": "M10 Producción de alimentos",
            "description": "Mueva la barra de empuje la distancia correcta a la velocidad correcta para entrar en el rango de puntuación verde.",
            "objectives": [{
                "id": "M10",
                "title": "La carga gris queda después de la carga verde pero antes de la carga marrón (debido solo al movimiento de la barra de empuje.)",
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
            "title": "M11 Escape de velocidad",
            "description": "El Robot debe presionar/golpear la plataforma lo suficientemente fuerte como para evitar que la nave vuelva a caer",
            "objectives": [{
                "id": "M11",
                "title": "La nave espacial permanece arriba (solo debido a presionar/golpear la plataforma)",
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
            "title": "M12 Órbitas de satélite",
            "description": "El Robot necesita mover uno o más satélites a la órbita externa.",
            "objectives": [{
                "id": "M12",
                "title": "Satélites en o sobre el área entre las dos líneas de la órbita exterior:",
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
            "title": "M13 Observatorio",
            "description": "Gire el Observatorio en una dirección precisa. (Si el puntero cubre parcialmente los bordes finales gris o naranja, seleccione ese color.)",
            "objectives": [{
                "id": "M13",
                "title": "El puntero del Observatorio está en:",
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
            "title": "M14 Desviación de Meteoroides",
            "description": "Desde el oeste de la línea libre, envíe uno o ambos meteoroides de forma independiente al receptor de meteoroides.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Meteoroides tocando el tapete y en la sección central:",
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
                    "title": "Meteoroides tocando el tapete y en cualquiera de las secciones laterales:",
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
                    return new Error("Combinación imposible.  Demasiados Meteoroides")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Combinación imposible.  Demasiados Meteoroides")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Combinación imposible.  Demasiados Meteoroides")
                }
            }]
        },
        {
            "title": "M15 Aterrizaje",
            "description": "Lleve el Lander a uno de sus objetivos intactos, o al menos hagalo llegar a base.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "Lander está intacto y tocando el tapete",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "Lander está completamente en:",
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
                            "title": "Área del planeta al noreste"
                        },
                        {
                            "value": "circle",
                            "title": "Círculo del área de aterrizaje"
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
            "title": "Penalidades",
            "description": "Se te permite agarrar el Robot con las manos fuera del área de base pero eso causa esta penalidad",
            "objectives": [{
                "id": "penalties",
                "title": "Número de discos de penalidad en el triángulo sureste:",
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
        "M01-name": "M01 Viajes espaciales",
        "M01-desc": "*Cada carga, claramente debe iniciar rodando por la rampa de deslizamiento espacial. Por cada lanzamiento el carro debe ✱ llegar de manera independiente a la primera conexión de la pista.",
        "M01-scoring1": "Carga del vehículo rodó pasando la primer conexión",
        "M01-scoring2": "Carga del suministro rodó pasando la primer conexión",
        "M01-scoring3": "Carga de la tripulación rodó pasando la primer conexión",
        "M02-name": "M02 Posición del Panel Solar",
        "M02-desc": "Los paneles solares deben ser articulados hacia un lado u otro",
        "M02-scoring1": "Ambos paneles solares están orientados hacia el mismo campo",
        "M02-scoring2": "Tu panel solar está inclinado hacia el campo del otro equipo",
        "M03-name": "M03 Impresora 3D",
        "M03-desc": "Expulsa el ladrillo 2X4 ✱ colocando una muestra de regolito en la impresora 3D.",
        "M03-scoring1": "Expulsa el ladrillo 2X4 (debido solo a una muestra de regolito)",
        "M03-scoring2": "El ladrillo 2X4 está completamente en el área del planeta noreste",
        "M04-name": "M04 Cruzando el Cráter",
        "M04-desc": "El Robot o cualquier estructura que se envíe debe cruzar completamente el modelo, conduciendo directamente sobre él. No cerca del modelo. No alrededor del modelo",
        "M04-scoring1": "Todo el Robot o la estructura debe cruzar con todo su peso entre las torres",
        "M04-scoring2": "Todo el Robot o la estructura debe cruzar de este a oeste más allá de la puerta aplanada",
        "M05-name": "M05 Extracción",
        "M05-desc": "El robot necesita extraer todas las muestras del núcleo del modelo del sitio central, luego tiene opciones para qué hacer con ellas, tal como se describe aquí, y en la misión M03.",
        "M05-scoring1": "Las cuatro muestras principales ya no se tocan con el eje del modelo",
        "M05-scoring2": "La muestra de Gas está tocando la pista/tapete y está completamente en el circulo del área de aterrizaje del Lander",
        "M05-scoring3": "-O- la muestra de Gas está completamente en base",
        "M05-scoring4": "La muestra de Agua está apoyada en la cámara de cultivo",
        "M05-error": "Ubicación de la muestra de Gas",
        "M06-name": "M06 Módulos de estación espacial",
        "M06-desc": "El robot necesita eliminar e insertar módulos entre los orificios del puerto de Habitación Hub. Los módulos insertados no deben tocar nada excepto el Habitación Hub.",
        "M06-scoring1": "El módulo de Cono está completamente en base",
        "M06-scoring2": "El módulo de Tubo está en el puerto oeste del Habitación Hub",
        "M06-scoring3": "Módulo de Base está en el puerto este del Habitación Hub",
        "M07-name": "M07 Emergencia en la Caminata Espacial",
        "M07-desc": "El Robot debe mover a Gerhard para que su cuerpo se inserte en la cámara de descompresión.",
        "M07-scoring": "El astronauta Gerhard está en la cámara de descompresión:",
        "M07-scoring1": "No",
        "M07-scoring2": "Parcialmente",
        "M07-scoring3": "Completamente",
        "M08-name": "M08 Ejercicio aeróbico",
        "M08-desc": "El Robot necesita mover repetidamente uno o ambos conjuntos de asas de la máquina de ejercicios para hacer que el puntero avance. (Si el puntero cubre parcialmente los bordes finales gris o naranja, seleccione ese color.)",
        "M08-scoring": "El puntero está apuntando a (debido solo al movimiento de uno o ambas asas de la máquina de ejercicios):",
        "M08-scoring1": "Ninguno",
        "M08-scoring2": "Gris",
        "M08-scoring3": "Blanco",
        "M08-scoring4": "Naranja",
        "M09-name": "M09 Ejercicio de fuerza",
        "M09-desc": "El Robot necesita levantar la barra de fuerza para anotar la altura.",
        "M09-scoring": "La barra de fuerza se levanta para poder ver el cuarto orificio de la viga con cremallera al menos de forma parcial.",
        "M10-name": "M10 Producción de alimentos",
        "M10-desc": "Mueva la barra de empuje la distancia correcta a la velocidad correcta para entrar en el rango de puntuación verde.",
        "M10-scoring": "La carga gris queda después de la carga verde pero antes de la carga marrón (debido solo al movimiento de la barra de empuje.)",
        "M11-name": "M11 Escape de velocidad",
        "M11-desc": "El Robot debe presionar/golpear la plataforma lo suficientemente fuerte como para evitar que la nave vuelva a caer",
        "M11-scoring": "La nave espacial permanece arriba (solo debido a presionar/golpear la plataforma)",
        "M12-name": "M12 Órbitas de satélite",
        "M12-desc": "El Robot necesita mover uno o más satélites a la órbita externa.",
        "M12-scoring": "Satélites en o sobre el área entre las dos líneas de la órbita exterior:",
        "M13-name": "M13 Observatorio",
        "M13-desc": "Gire el Observatorio en una dirección precisa. (Si el puntero cubre parcialmente los bordes finales gris o naranja, seleccione ese color.)",
        "M13-scoring": "El puntero del Observatorio está en:",
        "M13-scoring1": "Ninguno",
        "M13-scoring2": "Gris",
        "M13-scoring3": "Blanco",
        "M13-scoring4": "Naranja",
        "M14-name": "M14 Desviación de Meteoroides",
        "M14-desc": "Desde el oeste de la línea libre, envíe uno o ambos meteoroides de forma independiente al receptor de meteoroides.",
        "M14-scoring1": "Meteoroides tocando el tapete y en la sección central:",
        "M14-scoring2": "Meteoroides tocando el tapete y en cualquiera de las secciones laterales:",
        "M14-error": "Combinación imposible.  Demasiados Meteoroides",
        "M15-name": "M15 Aterrizaje",
        "M15-desc": "Lleve el Lander a uno de sus objetivos intactos, o al menos hagalo llegar a base.",
        "M15-scoring1": "Lander está intacto y tocando el tapete",
        "M15-scoring2": "Lander está completamente en:",
        "M15-scoring3": "Ninguno",
        "M15-scoring4": "Base",
        "M15-scoring5": "Área del planeta al noreste",
        "M15-scoring6": "Círculo del área de aterrizaje",
        "penalties-name": "Penalidades",
        "penalties-desc": "Se te permite agarrar el Robot con las manos fuera del área de base pero eso causa esta penalidad",
        "penalties-scoring": "Número de discos de penalidad en el triángulo sureste:"
    },
    "rtl": false
})`
export default challenge
