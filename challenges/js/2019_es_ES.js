const challenge = `({
    "title": "CITY SHAPER",
    "missions": [{
            "title": "Beneficio",
            "description": "Si todo vuestro Equipamiento cabe dentro de la Zona de Inspeccción Menor durante la preparación de la partida, recibiréis un Beneficio.",
            "objectives": [{
                "id": "bonus",
                "title": "Vuestro Robot y todo vuestro Equipamiento caben en la Zona de Inspección Menor:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(bonus) {
                bonus = String(bonus);
                if (bonus === 'no') {
                    return 0
                }
                if (bonus === 'yes') {
                    return 0
                }
            }]
        },
        {
            "title": "M01 Pisos Elevados",
            "description": "Solo podéis conseguir puntos por banderas si obtenéis los puntos del Puente. Está permitido y es de esperar que los Robots colisionen mientras intentan ganar los puntos de las Banderas.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "El Robot está Soportado por el Puente:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Número de Banderas que están claramente levantadas  cualquier altura, sólo debido al Robot:",
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
            "score": [function(M01_1, M01_2, bonus) {
                M01_1 = String(M01_1);
                M01_2 = String(M01_2);
                bonus = String(bonus);
                if (M01_1 === 'no' && M01_2 === '0' && bonus === 'no') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === '1' && bonus === 'no') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === '2' && bonus === 'no') {
                    return 0
                }
                if (M01_1 === 'yes' && M01_2 === '0' && bonus === 'no') {
                    return 20
                }
                if (M01_1 === 'yes' && M01_2 === '1' && bonus === 'no') {
                    return 35
                }
                if (M01_1 === 'yes' && M01_2 === '2' && bonus === 'no') {
                    return 50
                }
                if (M01_1 === 'no' && M01_2 === '0' && bonus === 'yes') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === '1' && bonus === 'yes') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === '2' && bonus === 'yes') {
                    return 0
                }
                if (M01_1 === 'yes' && M01_2 === '0' && bonus === 'yes') {
                    return 25
                }
                if (M01_1 === 'yes' && M01_2 === '1' && bonus === 'yes') {
                    return 40
                }
                if (M01_1 === 'yes' && M01_2 === '2' && bonus === 'yes') {
                    return 55
                }
            }]
        },
        {
            "title": "M02 Grúa",
            "description": "Puntuad todo lo que corresponda.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "El Módulo Azul Enganchado está claramente bajado cualquier distancia del Agujero de la Guía:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_2",
                    "title": "El Módulo Azul Enganchado es Independiente y está Soportado por otro Módulo Azul:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_3",
                    "title": "Y el 1er Nivel está Completamente dentro del Círculo Azul:",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M02_1, M02_2, M02_3, bonus, M05_lg, M05_sm, M12_4) {
                M02_1 = String(M02_1);
                M02_2 = String(M02_2);
                M02_3 = String(M02_3);
                bonus = String(bonus);
                if (((M02_1 === 'yes') ? 1 : 0) + ((M02_2 === 'yes') ? 1 : 0) + (M05_lg * 1) + (M05_sm * 1) + (M12_4 * 0.5) > 17) {
                    return new Error('Demasiados Módulos en uso')
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'no') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 20
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'yes' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'no') {
                    return 35
                }
                if (M02_1 === 'yes' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'no') {
                    return 50
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'yes') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'yes') {
                    return 30
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflicto en la posición de los Módulos Azules")
                }
                if (M02_1 === 'yes' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'yes') {
                    return 45
                }
                if (M02_1 === 'yes' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'yes') {
                    return 60
                }
            }]
        },
        {
            "title": "M03 Dron de Inspección",
            "description": "La misión del Dron de Inspección nos ilustra una manera muy barata de verificar puentes y otras estructuras altas. Los Drones pueden volar durante horas y mandar imágenes detalladas o también escaneos 3D.",
            "objectives": [{
                "id": "M03_1",
                "title": "El Dron de Inspección está Soportado por el eje del Puente:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M03_1, bonus) {
                M03_1 = String(M03_1);
                bonus = String(bonus);
                if (M03_1 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M03_1 === 'yes' && bonus === 'no') {
                    return 10
                }
                if (M03_1 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M03_1 === 'yes' && bonus === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M04 Diseño para la Vida Silvestre",
            "description": "El Murciélago debe terminar en la rama marrón",
            "objectives": [{
                "id": "M04_1",
                "title": "El Murciélago está Soportado por la rama del Árbol:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M04_1, bonus) {
                M04_1 = String(M04_1);
                bonus = String(bonus);
                if (M04_1 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M04_1 === 'yes' && bonus === 'no') {
                    return 10
                }
                if (M04_1 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M04_1 === 'yes' && bonus === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M05 Casa en el árbol",
            "description": "Puntuad todo lo que corresponda.",
            "objectives": [{
                    "id": "M05_lg",
                    "title": "Número de Módulos Independientes y Soportados por las Ramas Grandes del Árbol:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 17,
                    "value": null
                },
                {
                    "id": "M05_sm",
                    "title": "Número de Módulos Independientes y Soportados por las Ramas Pequeñas del Árbol:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 17,
                    "value": null
                }
            ],
            "score": [function(M05_lg, M05_sm, bonus, M02_1, M02_2, M12_4) {
                M05_lg = String(M05_lg);
                M05_sm = String(M05_sm);
                bonus = String(bonus);
                if (((M02_1 === 'yes') ? 1 : 0) + ((M02_2 === 'yes') ? 1 : 0) + (M05_lg * 1) + (M05_sm * 1) + (M12_4 * 0.5) > 17) {
                    return new Error('Demasiados Módulos en uso')
                }
                if (M05_lg === '0' && M05_sm === '0' && bonus === 'no') {
                    return 0
                }
                if (M05_lg === '0' && M05_sm === '1' && bonus === 'no') {
                    return 15
                }
                if (M05_lg === '0' && M05_sm === '2' && bonus === 'no') {
                    return 30
                }
                if (M05_lg === '0' && M05_sm === '3' && bonus === 'no') {
                    return 45
                }
                if (M05_lg === '0' && M05_sm === '4' && bonus === 'no') {
                    return 60
                }
                if (M05_lg === '0' && M05_sm === '5' && bonus === 'no') {
                    return 75
                }
                if (M05_lg === '0' && M05_sm === '6' && bonus === 'no') {
                    return 90
                }
                if (M05_lg === '0' && M05_sm === '7' && bonus === 'no') {
                    return 105
                }
                if (M05_lg === '0' && M05_sm === '8' && bonus === 'no') {
                    return 120
                }
                if (M05_lg === '0' && M05_sm === '9' && bonus === 'no') {
                    return 135
                }
                if (M05_lg === '0' && M05_sm === '10' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '0' && M05_sm === '11' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '0' && M05_sm === '12' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '0' && M05_sm === '13' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '0' && M05_sm === '14' && bonus === 'no') {
                    return 210
                }
                if (M05_lg === '0' && M05_sm === '15' && bonus === 'no') {
                    return 225
                }
                if (M05_lg === '0' && M05_sm === '16' && bonus === 'no') {
                    return 240
                }
                if (M05_lg === '0' && M05_sm === '17' && bonus === 'no') {
                    return 255
                }
                if (M05_lg === '1' && M05_sm === '0' && bonus === 'no') {
                    return 10
                }
                if (M05_lg === '1' && M05_sm === '1' && bonus === 'no') {
                    return 25
                }
                if (M05_lg === '1' && M05_sm === '2' && bonus === 'no') {
                    return 40
                }
                if (M05_lg === '1' && M05_sm === '3' && bonus === 'no') {
                    return 55
                }
                if (M05_lg === '1' && M05_sm === '4' && bonus === 'no') {
                    return 70
                }
                if (M05_lg === '1' && M05_sm === '5' && bonus === 'no') {
                    return 85
                }
                if (M05_lg === '1' && M05_sm === '6' && bonus === 'no') {
                    return 100
                }
                if (M05_lg === '1' && M05_sm === '7' && bonus === 'no') {
                    return 115
                }
                if (M05_lg === '1' && M05_sm === '8' && bonus === 'no') {
                    return 130
                }
                if (M05_lg === '1' && M05_sm === '9' && bonus === 'no') {
                    return 145
                }
                if (M05_lg === '1' && M05_sm === '10' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '1' && M05_sm === '11' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '1' && M05_sm === '12' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '1' && M05_sm === '13' && bonus === 'no') {
                    return 205
                }
                if (M05_lg === '1' && M05_sm === '14' && bonus === 'no') {
                    return 220
                }
                if (M05_lg === '1' && M05_sm === '15' && bonus === 'no') {
                    return 235
                }
                if (M05_lg === '1' && M05_sm === '16' && bonus === 'no') {
                    return 250
                }
                if (M05_lg === '1' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '2' && M05_sm === '0' && bonus === 'no') {
                    return 20
                }
                if (M05_lg === '2' && M05_sm === '1' && bonus === 'no') {
                    return 35
                }
                if (M05_lg === '2' && M05_sm === '2' && bonus === 'no') {
                    return 50
                }
                if (M05_lg === '2' && M05_sm === '3' && bonus === 'no') {
                    return 65
                }
                if (M05_lg === '2' && M05_sm === '4' && bonus === 'no') {
                    return 80
                }
                if (M05_lg === '2' && M05_sm === '5' && bonus === 'no') {
                    return 95
                }
                if (M05_lg === '2' && M05_sm === '6' && bonus === 'no') {
                    return 110
                }
                if (M05_lg === '2' && M05_sm === '7' && bonus === 'no') {
                    return 125
                }
                if (M05_lg === '2' && M05_sm === '8' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '2' && M05_sm === '9' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '2' && M05_sm === '10' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '2' && M05_sm === '11' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '2' && M05_sm === '12' && bonus === 'no') {
                    return 200
                }
                if (M05_lg === '2' && M05_sm === '13' && bonus === 'no') {
                    return 215
                }
                if (M05_lg === '2' && M05_sm === '14' && bonus === 'no') {
                    return 230
                }
                if (M05_lg === '2' && M05_sm === '15' && bonus === 'no') {
                    return 245
                }
                if (M05_lg === '2' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '2' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '0' && bonus === 'no') {
                    return 30
                }
                if (M05_lg === '3' && M05_sm === '1' && bonus === 'no') {
                    return 45
                }
                if (M05_lg === '3' && M05_sm === '2' && bonus === 'no') {
                    return 60
                }
                if (M05_lg === '3' && M05_sm === '3' && bonus === 'no') {
                    return 75
                }
                if (M05_lg === '3' && M05_sm === '4' && bonus === 'no') {
                    return 90
                }
                if (M05_lg === '3' && M05_sm === '5' && bonus === 'no') {
                    return 105
                }
                if (M05_lg === '3' && M05_sm === '6' && bonus === 'no') {
                    return 120
                }
                if (M05_lg === '3' && M05_sm === '7' && bonus === 'no') {
                    return 135
                }
                if (M05_lg === '3' && M05_sm === '8' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '3' && M05_sm === '9' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '3' && M05_sm === '10' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '3' && M05_sm === '11' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '3' && M05_sm === '12' && bonus === 'no') {
                    return 210
                }
                if (M05_lg === '3' && M05_sm === '13' && bonus === 'no') {
                    return 225
                }
                if (M05_lg === '3' && M05_sm === '14' && bonus === 'no') {
                    return 240
                }
                if (M05_lg === '3' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '0' && bonus === 'no') {
                    return 40
                }
                if (M05_lg === '4' && M05_sm === '1' && bonus === 'no') {
                    return 55
                }
                if (M05_lg === '4' && M05_sm === '2' && bonus === 'no') {
                    return 70
                }
                if (M05_lg === '4' && M05_sm === '3' && bonus === 'no') {
                    return 85
                }
                if (M05_lg === '4' && M05_sm === '4' && bonus === 'no') {
                    return 100
                }
                if (M05_lg === '4' && M05_sm === '5' && bonus === 'no') {
                    return 115
                }
                if (M05_lg === '4' && M05_sm === '6' && bonus === 'no') {
                    return 130
                }
                if (M05_lg === '4' && M05_sm === '7' && bonus === 'no') {
                    return 145
                }
                if (M05_lg === '4' && M05_sm === '8' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '4' && M05_sm === '9' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '4' && M05_sm === '10' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '4' && M05_sm === '11' && bonus === 'no') {
                    return 205
                }
                if (M05_lg === '4' && M05_sm === '12' && bonus === 'no') {
                    return 220
                }
                if (M05_lg === '4' && M05_sm === '13' && bonus === 'no') {
                    return 235
                }
                if (M05_lg === '4' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '0' && bonus === 'no') {
                    return 50
                }
                if (M05_lg === '5' && M05_sm === '1' && bonus === 'no') {
                    return 65
                }
                if (M05_lg === '5' && M05_sm === '2' && bonus === 'no') {
                    return 80
                }
                if (M05_lg === '5' && M05_sm === '3' && bonus === 'no') {
                    return 95
                }
                if (M05_lg === '5' && M05_sm === '4' && bonus === 'no') {
                    return 110
                }
                if (M05_lg === '5' && M05_sm === '5' && bonus === 'no') {
                    return 125
                }
                if (M05_lg === '5' && M05_sm === '6' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '5' && M05_sm === '7' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '5' && M05_sm === '8' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '5' && M05_sm === '9' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '5' && M05_sm === '10' && bonus === 'no') {
                    return 200
                }
                if (M05_lg === '5' && M05_sm === '11' && bonus === 'no') {
                    return 215
                }
                if (M05_lg === '5' && M05_sm === '12' && bonus === 'no') {
                    return 230
                }
                if (M05_lg === '5' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '0' && bonus === 'no') {
                    return 60
                }
                if (M05_lg === '6' && M05_sm === '1' && bonus === 'no') {
                    return 75
                }
                if (M05_lg === '6' && M05_sm === '2' && bonus === 'no') {
                    return 90
                }
                if (M05_lg === '6' && M05_sm === '3' && bonus === 'no') {
                    return 105
                }
                if (M05_lg === '6' && M05_sm === '4' && bonus === 'no') {
                    return 120
                }
                if (M05_lg === '6' && M05_sm === '5' && bonus === 'no') {
                    return 135
                }
                if (M05_lg === '6' && M05_sm === '6' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '6' && M05_sm === '7' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '6' && M05_sm === '8' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '6' && M05_sm === '9' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '6' && M05_sm === '10' && bonus === 'no') {
                    return 210
                }
                if (M05_lg === '6' && M05_sm === '11' && bonus === 'no') {
                    return 225
                }
                if (M05_lg === '6' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '0' && bonus === 'no') {
                    return 70
                }
                if (M05_lg === '7' && M05_sm === '1' && bonus === 'no') {
                    return 85
                }
                if (M05_lg === '7' && M05_sm === '2' && bonus === 'no') {
                    return 100
                }
                if (M05_lg === '7' && M05_sm === '3' && bonus === 'no') {
                    return 115
                }
                if (M05_lg === '7' && M05_sm === '4' && bonus === 'no') {
                    return 130
                }
                if (M05_lg === '7' && M05_sm === '5' && bonus === 'no') {
                    return 145
                }
                if (M05_lg === '7' && M05_sm === '6' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '7' && M05_sm === '7' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '7' && M05_sm === '8' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '7' && M05_sm === '9' && bonus === 'no') {
                    return 205
                }
                if (M05_lg === '7' && M05_sm === '10' && bonus === 'no') {
                    return 220
                }
                if (M05_lg === '7' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '0' && bonus === 'no') {
                    return 80
                }
                if (M05_lg === '8' && M05_sm === '1' && bonus === 'no') {
                    return 95
                }
                if (M05_lg === '8' && M05_sm === '2' && bonus === 'no') {
                    return 110
                }
                if (M05_lg === '8' && M05_sm === '3' && bonus === 'no') {
                    return 125
                }
                if (M05_lg === '8' && M05_sm === '4' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '8' && M05_sm === '5' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '8' && M05_sm === '6' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '8' && M05_sm === '7' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '8' && M05_sm === '8' && bonus === 'no') {
                    return 200
                }
                if (M05_lg === '8' && M05_sm === '9' && bonus === 'no') {
                    return 215
                }
                if (M05_lg === '8' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '0' && bonus === 'no') {
                    return 90
                }
                if (M05_lg === '9' && M05_sm === '1' && bonus === 'no') {
                    return 105
                }
                if (M05_lg === '9' && M05_sm === '2' && bonus === 'no') {
                    return 120
                }
                if (M05_lg === '9' && M05_sm === '3' && bonus === 'no') {
                    return 135
                }
                if (M05_lg === '9' && M05_sm === '4' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '9' && M05_sm === '5' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '9' && M05_sm === '6' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '9' && M05_sm === '7' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '9' && M05_sm === '8' && bonus === 'no') {
                    return 210
                }
                if (M05_lg === '9' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '0' && bonus === 'no') {
                    return 100
                }
                if (M05_lg === '10' && M05_sm === '1' && bonus === 'no') {
                    return 115
                }
                if (M05_lg === '10' && M05_sm === '2' && bonus === 'no') {
                    return 130
                }
                if (M05_lg === '10' && M05_sm === '3' && bonus === 'no') {
                    return 145
                }
                if (M05_lg === '10' && M05_sm === '4' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '10' && M05_sm === '5' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '10' && M05_sm === '6' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '10' && M05_sm === '7' && bonus === 'no') {
                    return 205
                }
                if (M05_lg === '10' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '0' && bonus === 'no') {
                    return 110
                }
                if (M05_lg === '11' && M05_sm === '1' && bonus === 'no') {
                    return 125
                }
                if (M05_lg === '11' && M05_sm === '2' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '11' && M05_sm === '3' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '11' && M05_sm === '4' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '11' && M05_sm === '5' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '11' && M05_sm === '6' && bonus === 'no') {
                    return 200
                }
                if (M05_lg === '11' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '0' && bonus === 'no') {
                    return 120
                }
                if (M05_lg === '12' && M05_sm === '1' && bonus === 'no') {
                    return 135
                }
                if (M05_lg === '12' && M05_sm === '2' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '12' && M05_sm === '3' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '12' && M05_sm === '4' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '12' && M05_sm === '5' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '12' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '0' && bonus === 'no') {
                    return 130
                }
                if (M05_lg === '13' && M05_sm === '1' && bonus === 'no') {
                    return 145
                }
                if (M05_lg === '13' && M05_sm === '2' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '13' && M05_sm === '3' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '13' && M05_sm === '4' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '13' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '0' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '14' && M05_sm === '1' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '14' && M05_sm === '2' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '14' && M05_sm === '3' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '14' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '0' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '15' && M05_sm === '1' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '15' && M05_sm === '2' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '15' && M05_sm === '3' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '0' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '16' && M05_sm === '1' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '16' && M05_sm === '2' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '3' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '0' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '17' && M05_sm === '1' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '2' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '3' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '0' && M05_sm === '0' && bonus === 'yes') {
                    return 0
                }
                if (M05_lg === '0' && M05_sm === '1' && bonus === 'yes') {
                    return 20
                }
                if (M05_lg === '0' && M05_sm === '2' && bonus === 'yes') {
                    return 35
                }
                if (M05_lg === '0' && M05_sm === '3' && bonus === 'yes') {
                    return 50
                }
                if (M05_lg === '0' && M05_sm === '4' && bonus === 'yes') {
                    return 65
                }
                if (M05_lg === '0' && M05_sm === '5' && bonus === 'yes') {
                    return 80
                }
                if (M05_lg === '0' && M05_sm === '6' && bonus === 'yes') {
                    return 95
                }
                if (M05_lg === '0' && M05_sm === '7' && bonus === 'yes') {
                    return 110
                }
                if (M05_lg === '0' && M05_sm === '8' && bonus === 'yes') {
                    return 125
                }
                if (M05_lg === '0' && M05_sm === '9' && bonus === 'yes') {
                    return 140
                }
                if (M05_lg === '0' && M05_sm === '10' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '0' && M05_sm === '11' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '0' && M05_sm === '12' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '0' && M05_sm === '13' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '0' && M05_sm === '14' && bonus === 'yes') {
                    return 215
                }
                if (M05_lg === '0' && M05_sm === '15' && bonus === 'yes') {
                    return 230
                }
                if (M05_lg === '0' && M05_sm === '16' && bonus === 'yes') {
                    return 245
                }
                if (M05_lg === '0' && M05_sm === '17' && bonus === 'yes') {
                    return 260
                }
                if (M05_lg === '1' && M05_sm === '0' && bonus === 'yes') {
                    return 15
                }
                if (M05_lg === '1' && M05_sm === '1' && bonus === 'yes') {
                    return 30
                }
                if (M05_lg === '1' && M05_sm === '2' && bonus === 'yes') {
                    return 45
                }
                if (M05_lg === '1' && M05_sm === '3' && bonus === 'yes') {
                    return 60
                }
                if (M05_lg === '1' && M05_sm === '4' && bonus === 'yes') {
                    return 75
                }
                if (M05_lg === '1' && M05_sm === '5' && bonus === 'yes') {
                    return 90
                }
                if (M05_lg === '1' && M05_sm === '6' && bonus === 'yes') {
                    return 105
                }
                if (M05_lg === '1' && M05_sm === '7' && bonus === 'yes') {
                    return 120
                }
                if (M05_lg === '1' && M05_sm === '8' && bonus === 'yes') {
                    return 135
                }
                if (M05_lg === '1' && M05_sm === '9' && bonus === 'yes') {
                    return 150
                }
                if (M05_lg === '1' && M05_sm === '10' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '1' && M05_sm === '11' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '1' && M05_sm === '12' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '1' && M05_sm === '13' && bonus === 'yes') {
                    return 210
                }
                if (M05_lg === '1' && M05_sm === '14' && bonus === 'yes') {
                    return 225
                }
                if (M05_lg === '1' && M05_sm === '15' && bonus === 'yes') {
                    return 240
                }
                if (M05_lg === '1' && M05_sm === '16' && bonus === 'yes') {
                    return 255
                }
                if (M05_lg === '1' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '2' && M05_sm === '0' && bonus === 'yes') {
                    return 25
                }
                if (M05_lg === '2' && M05_sm === '1' && bonus === 'yes') {
                    return 40
                }
                if (M05_lg === '2' && M05_sm === '2' && bonus === 'yes') {
                    return 55
                }
                if (M05_lg === '2' && M05_sm === '3' && bonus === 'yes') {
                    return 70
                }
                if (M05_lg === '2' && M05_sm === '4' && bonus === 'yes') {
                    return 85
                }
                if (M05_lg === '2' && M05_sm === '5' && bonus === 'yes') {
                    return 100
                }
                if (M05_lg === '2' && M05_sm === '6' && bonus === 'yes') {
                    return 115
                }
                if (M05_lg === '2' && M05_sm === '7' && bonus === 'yes') {
                    return 130
                }
                if (M05_lg === '2' && M05_sm === '8' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '2' && M05_sm === '9' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '2' && M05_sm === '10' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '2' && M05_sm === '11' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '2' && M05_sm === '12' && bonus === 'yes') {
                    return 205
                }
                if (M05_lg === '2' && M05_sm === '13' && bonus === 'yes') {
                    return 220
                }
                if (M05_lg === '2' && M05_sm === '14' && bonus === 'yes') {
                    return 235
                }
                if (M05_lg === '2' && M05_sm === '15' && bonus === 'yes') {
                    return 250
                }
                if (M05_lg === '2' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '2' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '0' && bonus === 'yes') {
                    return 35
                }
                if (M05_lg === '3' && M05_sm === '1' && bonus === 'yes') {
                    return 50
                }
                if (M05_lg === '3' && M05_sm === '2' && bonus === 'yes') {
                    return 65
                }
                if (M05_lg === '3' && M05_sm === '3' && bonus === 'yes') {
                    return 80
                }
                if (M05_lg === '3' && M05_sm === '4' && bonus === 'yes') {
                    return 95
                }
                if (M05_lg === '3' && M05_sm === '5' && bonus === 'yes') {
                    return 110
                }
                if (M05_lg === '3' && M05_sm === '6' && bonus === 'yes') {
                    return 125
                }
                if (M05_lg === '3' && M05_sm === '7' && bonus === 'yes') {
                    return 140
                }
                if (M05_lg === '3' && M05_sm === '8' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '3' && M05_sm === '9' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '3' && M05_sm === '10' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '3' && M05_sm === '11' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '3' && M05_sm === '12' && bonus === 'yes') {
                    return 215
                }
                if (M05_lg === '3' && M05_sm === '13' && bonus === 'yes') {
                    return 230
                }
                if (M05_lg === '3' && M05_sm === '14' && bonus === 'yes') {
                    return 245
                }
                if (M05_lg === '3' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '0' && bonus === 'yes') {
                    return 45
                }
                if (M05_lg === '4' && M05_sm === '1' && bonus === 'yes') {
                    return 60
                }
                if (M05_lg === '4' && M05_sm === '2' && bonus === 'yes') {
                    return 75
                }
                if (M05_lg === '4' && M05_sm === '3' && bonus === 'yes') {
                    return 90
                }
                if (M05_lg === '4' && M05_sm === '4' && bonus === 'yes') {
                    return 105
                }
                if (M05_lg === '4' && M05_sm === '5' && bonus === 'yes') {
                    return 120
                }
                if (M05_lg === '4' && M05_sm === '6' && bonus === 'yes') {
                    return 135
                }
                if (M05_lg === '4' && M05_sm === '7' && bonus === 'yes') {
                    return 150
                }
                if (M05_lg === '4' && M05_sm === '8' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '4' && M05_sm === '9' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '4' && M05_sm === '10' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '4' && M05_sm === '11' && bonus === 'yes') {
                    return 210
                }
                if (M05_lg === '4' && M05_sm === '12' && bonus === 'yes') {
                    return 225
                }
                if (M05_lg === '4' && M05_sm === '13' && bonus === 'yes') {
                    return 240
                }
                if (M05_lg === '4' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '0' && bonus === 'yes') {
                    return 55
                }
                if (M05_lg === '5' && M05_sm === '1' && bonus === 'yes') {
                    return 70
                }
                if (M05_lg === '5' && M05_sm === '2' && bonus === 'yes') {
                    return 85
                }
                if (M05_lg === '5' && M05_sm === '3' && bonus === 'yes') {
                    return 100
                }
                if (M05_lg === '5' && M05_sm === '4' && bonus === 'yes') {
                    return 115
                }
                if (M05_lg === '5' && M05_sm === '5' && bonus === 'yes') {
                    return 130
                }
                if (M05_lg === '5' && M05_sm === '6' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '5' && M05_sm === '7' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '5' && M05_sm === '8' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '5' && M05_sm === '9' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '5' && M05_sm === '10' && bonus === 'yes') {
                    return 205
                }
                if (M05_lg === '5' && M05_sm === '11' && bonus === 'yes') {
                    return 220
                }
                if (M05_lg === '5' && M05_sm === '12' && bonus === 'yes') {
                    return 235
                }
                if (M05_lg === '5' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '0' && bonus === 'yes') {
                    return 65
                }
                if (M05_lg === '6' && M05_sm === '1' && bonus === 'yes') {
                    return 80
                }
                if (M05_lg === '6' && M05_sm === '2' && bonus === 'yes') {
                    return 95
                }
                if (M05_lg === '6' && M05_sm === '3' && bonus === 'yes') {
                    return 110
                }
                if (M05_lg === '6' && M05_sm === '4' && bonus === 'yes') {
                    return 125
                }
                if (M05_lg === '6' && M05_sm === '5' && bonus === 'yes') {
                    return 140
                }
                if (M05_lg === '6' && M05_sm === '6' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '6' && M05_sm === '7' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '6' && M05_sm === '8' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '6' && M05_sm === '9' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '6' && M05_sm === '10' && bonus === 'yes') {
                    return 215
                }
                if (M05_lg === '6' && M05_sm === '11' && bonus === 'yes') {
                    return 230
                }
                if (M05_lg === '6' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '0' && bonus === 'yes') {
                    return 75
                }
                if (M05_lg === '7' && M05_sm === '1' && bonus === 'yes') {
                    return 90
                }
                if (M05_lg === '7' && M05_sm === '2' && bonus === 'yes') {
                    return 105
                }
                if (M05_lg === '7' && M05_sm === '3' && bonus === 'yes') {
                    return 120
                }
                if (M05_lg === '7' && M05_sm === '4' && bonus === 'yes') {
                    return 135
                }
                if (M05_lg === '7' && M05_sm === '5' && bonus === 'yes') {
                    return 150
                }
                if (M05_lg === '7' && M05_sm === '6' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '7' && M05_sm === '7' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '7' && M05_sm === '8' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '7' && M05_sm === '9' && bonus === 'yes') {
                    return 210
                }
                if (M05_lg === '7' && M05_sm === '10' && bonus === 'yes') {
                    return 225
                }
                if (M05_lg === '7' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '0' && bonus === 'yes') {
                    return 85
                }
                if (M05_lg === '8' && M05_sm === '1' && bonus === 'yes') {
                    return 100
                }
                if (M05_lg === '8' && M05_sm === '2' && bonus === 'yes') {
                    return 115
                }
                if (M05_lg === '8' && M05_sm === '3' && bonus === 'yes') {
                    return 130
                }
                if (M05_lg === '8' && M05_sm === '4' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '8' && M05_sm === '5' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '8' && M05_sm === '6' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '8' && M05_sm === '7' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '8' && M05_sm === '8' && bonus === 'yes') {
                    return 205
                }
                if (M05_lg === '8' && M05_sm === '9' && bonus === 'yes') {
                    return 220
                }
                if (M05_lg === '8' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '0' && bonus === 'yes') {
                    return 95
                }
                if (M05_lg === '9' && M05_sm === '1' && bonus === 'yes') {
                    return 110
                }
                if (M05_lg === '9' && M05_sm === '2' && bonus === 'yes') {
                    return 125
                }
                if (M05_lg === '9' && M05_sm === '3' && bonus === 'yes') {
                    return 140
                }
                if (M05_lg === '9' && M05_sm === '4' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '9' && M05_sm === '5' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '9' && M05_sm === '6' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '9' && M05_sm === '7' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '9' && M05_sm === '8' && bonus === 'yes') {
                    return 215
                }
                if (M05_lg === '9' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '0' && bonus === 'yes') {
                    return 105
                }
                if (M05_lg === '10' && M05_sm === '1' && bonus === 'yes') {
                    return 120
                }
                if (M05_lg === '10' && M05_sm === '2' && bonus === 'yes') {
                    return 135
                }
                if (M05_lg === '10' && M05_sm === '3' && bonus === 'yes') {
                    return 150
                }
                if (M05_lg === '10' && M05_sm === '4' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '10' && M05_sm === '5' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '10' && M05_sm === '6' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '10' && M05_sm === '7' && bonus === 'yes') {
                    return 210
                }
                if (M05_lg === '10' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '0' && bonus === 'yes') {
                    return 115
                }
                if (M05_lg === '11' && M05_sm === '1' && bonus === 'yes') {
                    return 130
                }
                if (M05_lg === '11' && M05_sm === '2' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '11' && M05_sm === '3' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '11' && M05_sm === '4' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '11' && M05_sm === '5' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '11' && M05_sm === '6' && bonus === 'yes') {
                    return 205
                }
                if (M05_lg === '11' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '0' && bonus === 'yes') {
                    return 125
                }
                if (M05_lg === '12' && M05_sm === '1' && bonus === 'yes') {
                    return 140
                }
                if (M05_lg === '12' && M05_sm === '2' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '12' && M05_sm === '3' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '12' && M05_sm === '4' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '12' && M05_sm === '5' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '12' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '0' && bonus === 'yes') {
                    return 135
                }
                if (M05_lg === '13' && M05_sm === '1' && bonus === 'yes') {
                    return 150
                }
                if (M05_lg === '13' && M05_sm === '2' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '13' && M05_sm === '3' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '13' && M05_sm === '4' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '13' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '0' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '14' && M05_sm === '1' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '14' && M05_sm === '2' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '14' && M05_sm === '3' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '14' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '0' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '15' && M05_sm === '1' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '15' && M05_sm === '2' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '15' && M05_sm === '3' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '0' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '16' && M05_sm === '1' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '16' && M05_sm === '2' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '3' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '0' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '17' && M05_sm === '1' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '2' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '3' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
            }]
        },
        {
            "title": "M06 Atasco de Tráfico",
            "description": "Descongestionad la carretera levantando el atasco de tráfico.",
            "objectives": [{
                "id": "M06_1",
                "title": "El Atasco de Tráfico está levantado, su parte móvil es Independiente y está Soportada solo por sus bisagras:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M06_1, bonus) {
                M06_1 = String(M06_1);
                bonus = String(bonus);
                if (M06_1 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M06_1 === 'yes' && bonus === 'no') {
                    return 10
                }
                if (M06_1 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M06_1 === 'yes' && bonus === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M07 Columpio",
            "description": "Liberad el Columpio.",
            "objectives": [{
                "id": "M07_1",
                "title": "El Columpio está liberado:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M07_1, bonus) {
                M07_1 = String(M07_1);
                bonus = String(bonus);
                if (M07_1 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M07_1 === 'yes' && bonus === 'no') {
                    return 20
                }
                if (M07_1 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M07_1 === 'yes' && bonus === 'yes') {
                    return 25
                }
            }]
        },
        {
            "title": "M08 Montacargas",
            "description": "Marcad una u otra puntuación, pero no ambas.",
            "objectives": [{
                "id": "M08_1",
                "title": "Las partes móviles del Montacargas son Independientes y están Soportadas solo por sus bisagras, en la siguiente posición:",
                "options": [{
                        "value": "neither",
                        "title": "Ninguna"
                    },
                    {
                        "value": "car",
                        "title": "Coche Azul abajo"
                    },
                    {
                        "value": "balanced",
                        "title": "Equilibradas"
                    }
                ],
                "type": "enum",
                "default": "neither"
            }],
            "score": [function(M08_1, bonus) {
                M08_1 = String(M08_1);
                bonus = String(bonus);
                if (M08_1 === 'neither' && bonus === 'no') {
                    return 0
                }
                if (M08_1 === 'car' && bonus === 'no') {
                    return 15
                }
                if (M08_1 === 'balanced' && bonus === 'no') {
                    return 20
                }
                if (M08_1 === 'neither' && bonus === 'yes') {
                    return 0
                }
                if (M08_1 === 'car' && bonus === 'yes') {
                    return 20
                }
                if (M08_1 === 'balanced' && bonus === 'yes') {
                    return 25
                }
            }]
        },
        {
            "title": "M09 Factor de Seguridad",
            "description": "¿Puede el Edificio Piloto mantenerse en pie cuando algunas de las barras que lo soportan son movidas?",
            "objectives": [{
                    "id": "M09_1",
                    "title": "El Edificio Piloto es Independiente y está Soportado solo por las vigas azules:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M09_2",
                    "title": "Número de vigas azules que han sido apartadas al menos a medio camino:",
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
                }
            ],
            "score": [function(M09_1, M09_2, bonus) {
                M09_1 = String(M09_1);
                M09_2 = String(M09_2);
                bonus = String(bonus);
                if (M09_1 === 'no' && M09_2 === '0' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '1' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '2' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '3' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '4' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '5' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '6' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'yes' && M09_2 === '0' && bonus === 'no') {
                    return 0
                }
                if (M09_1 === 'yes' && M09_2 === '1' && bonus === 'no') {
                    return 10
                }
                if (M09_1 === 'yes' && M09_2 === '2' && bonus === 'no') {
                    return 20
                }
                if (M09_1 === 'yes' && M09_2 === '3' && bonus === 'no') {
                    return 30
                }
                if (M09_1 === 'yes' && M09_2 === '4' && bonus === 'no') {
                    return 40
                }
                if (M09_1 === 'yes' && M09_2 === '5' && bonus === 'no') {
                    return 50
                }
                if (M09_1 === 'yes' && M09_2 === '6' && bonus === 'no') {
                    return 60
                }
                if (M09_1 === 'no' && M09_2 === '0' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '1' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '2' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '3' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '4' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '5' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'no' && M09_2 === '6' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'yes' && M09_2 === '0' && bonus === 'yes') {
                    return 0
                }
                if (M09_1 === 'yes' && M09_2 === '1' && bonus === 'yes') {
                    return 15
                }
                if (M09_1 === 'yes' && M09_2 === '2' && bonus === 'yes') {
                    return 25
                }
                if (M09_1 === 'yes' && M09_2 === '3' && bonus === 'yes') {
                    return 35
                }
                if (M09_1 === 'yes' && M09_2 === '4' && bonus === 'yes') {
                    return 45
                }
                if (M09_1 === 'yes' && M09_2 === '5' && bonus === 'yes') {
                    return 55
                }
                if (M09_1 === 'yes' && M09_2 === '6' && bonus === 'yes') {
                    return 65
                }
            }]
        },
        {
            "title": "M10 Construcción de Acero",
            "description": "Conseguid que la Estructura de Acero este levantada.",
            "objectives": [{
                "id": "M10",
                "title": "La Estructura de Acero está levantada, es Independiente y está Soportada sólo por sus bisagras:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M10, bonus) {
                M10 = String(M10);
                bonus = String(bonus);
                if (M10 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M10 === 'yes' && bonus === 'no') {
                    return 20
                }
                if (M10 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M10 === 'yes' && bonus === 'yes') {
                    return 25
                }
            }]
        },
        {
            "title": "M11 Arquitectura Innovadora",
            "description": "Diseñad y Construid vuestra propia estructura y transportadla a cualquier círculo.",
            "objectives": [{
                    "id": "M11_1",
                    "title": "La Estructura es mayor que un Módulo Azul y está construida solo con la piezas LEGO blancas del equipo:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M11_2",
                    "title": "La estructura está dentro de cualquier círculo:",
                    "options": [{
                            "value": "no",
                            "title": "No"
                        },
                        {
                            "value": "partly",
                            "title": "Parcialmente"
                        },
                        {
                            "value": "completely",
                            "title": "Completamente"
                        }
                    ],
                    "type": "enum",
                    "default": "no"
                }
            ],
            "score": [function(M11_1, M11_2, bonus) {
                M11_1 = String(M11_1);
                M11_2 = String(M11_2);
                bonus = String(bonus);
                if (M11_1 === 'no' && M11_2 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M11_1 === 'no' && M11_2 === 'partly' && bonus === 'no') {
                    return 0
                }
                if (M11_1 === 'no' && M11_2 === 'completely' && bonus === 'no') {
                    return 0
                }
                if (M11_1 === 'yes' && M11_2 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M11_1 === 'yes' && M11_2 === 'partly' && bonus === 'no') {
                    return 10
                }
                if (M11_1 === 'yes' && M11_2 === 'completely' && bonus === 'no') {
                    return 15
                }
                if (M11_1 === 'no' && M11_2 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M11_1 === 'no' && M11_2 === 'partly' && bonus === 'yes') {
                    return 0
                }
                if (M11_1 === 'no' && M11_2 === 'completely' && bonus === 'yes') {
                    return 0
                }
                if (M11_1 === 'yes' && M11_2 === 'no' && bonus === 'yes') {
                    return 0
                }
                if (M11_1 === 'yes' && M11_2 === 'partly' && bonus === 'yes') {
                    return 15
                }
                if (M11_1 === 'yes' && M11_2 === 'completely' && bonus === 'yes') {
                    return 20
                }
            }]
        },
        {
            "title": "M12 Diseño y Construcción",
            "description": "El círculo Azul no forma parte de la Misión 12.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "Número de Círculos con un Módulo de color coincidente con el Círculo, en contacto plano sobre el Tapete y Completamente dentro:",
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
                    "default": "1"
                },
                {
                    "id": "M12_4",
                    "title": "Suma de las alturas de todas las Pilas Independientes al menos parcialmente dentro de cualquier Círculo:",
                    "type": "number",
                    "default": 1,
                    "min": 0,
                    "max": 29,
                    "value": null
                }
            ],
            "score": [function(M12_1, M12_4, bonus, M02_1, M02_2, M05_lg, M05_sm) {
                M12_1 = String(M12_1);
                M12_4 = String(M12_4);
                bonus = String(bonus);
                if (((M02_1 === 'yes') ? 1 : 0) + ((M02_2 === 'yes') ? 1 : 0) + (M05_lg * 1) + (M05_sm * 1) + (M12_4 * 0.5) > 17) {
                    return new Error('Demasiados Módulos en uso')
                }
                if (M12_1 === '0' && M12_4 === '0' && bonus === 'no') {
                    return 0
                }
                if (M12_1 === '0' && M12_4 === '1' && bonus === 'no') {
                    return 5
                }
                if (M12_1 === '0' && M12_4 === '2' && bonus === 'no') {
                    return 10
                }
                if (M12_1 === '0' && M12_4 === '3' && bonus === 'no') {
                    return 15
                }
                if (M12_1 === '0' && M12_4 === '4' && bonus === 'no') {
                    return 20
                }
                if (M12_1 === '0' && M12_4 === '5' && bonus === 'no') {
                    return 25
                }
                if (M12_1 === '0' && M12_4 === '6' && bonus === 'no') {
                    return 30
                }
                if (M12_1 === '0' && M12_4 === '7' && bonus === 'no') {
                    return 35
                }
                if (M12_1 === '0' && M12_4 === '8' && bonus === 'no') {
                    return 40
                }
                if (M12_1 === '0' && M12_4 === '9' && bonus === 'no') {
                    return 45
                }
                if (M12_1 === '0' && M12_4 === '10' && bonus === 'no') {
                    return 50
                }
                if (M12_1 === '0' && M12_4 === '11' && bonus === 'no') {
                    return 55
                }
                if (M12_1 === '0' && M12_4 === '12' && bonus === 'no') {
                    return 60
                }
                if (M12_1 === '0' && M12_4 === '13' && bonus === 'no') {
                    return 65
                }
                if (M12_1 === '0' && M12_4 === '14' && bonus === 'no') {
                    return 70
                }
                if (M12_1 === '0' && M12_4 === '15' && bonus === 'no') {
                    return 75
                }
                if (M12_1 === '0' && M12_4 === '16' && bonus === 'no') {
                    return 80
                }
                if (M12_1 === '0' && M12_4 === '17' && bonus === 'no') {
                    return 85
                }
                if (M12_1 === '0' && M12_4 === '18' && bonus === 'no') {
                    return 90
                }
                if (M12_1 === '0' && M12_4 === '19' && bonus === 'no') {
                    return 95
                }
                if (M12_1 === '0' && M12_4 === '20' && bonus === 'no') {
                    return 100
                }
                if (M12_1 === '0' && M12_4 === '21' && bonus === 'no') {
                    return 105
                }
                if (M12_1 === '0' && M12_4 === '22' && bonus === 'no') {
                    return 110
                }
                if (M12_1 === '0' && M12_4 === '23' && bonus === 'no') {
                    return 115
                }
                if (M12_1 === '0' && M12_4 === '24' && bonus === 'no') {
                    return 120
                }
                if (M12_1 === '0' && M12_4 === '25' && bonus === 'no') {
                    return 125
                }
                if (M12_1 === '0' && M12_4 === '26' && bonus === 'no') {
                    return 130
                }
                if (M12_1 === '0' && M12_4 === '27' && bonus === 'no') {
                    return 135
                }
                if (M12_1 === '0' && M12_4 === '28' && bonus === 'no') {
                    return 140
                }
                if (M12_1 === '0' && M12_4 === '29' && bonus === 'no') {
                    return 145
                }
                if (M12_1 === '1' && M12_4 === '0' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '1' && M12_4 === '1' && bonus === 'no') {
                    return 15
                }
                if (M12_1 === '1' && M12_4 === '2' && bonus === 'no') {
                    return 20
                }
                if (M12_1 === '1' && M12_4 === '3' && bonus === 'no') {
                    return 25
                }
                if (M12_1 === '1' && M12_4 === '4' && bonus === 'no') {
                    return 30
                }
                if (M12_1 === '1' && M12_4 === '5' && bonus === 'no') {
                    return 35
                }
                if (M12_1 === '1' && M12_4 === '6' && bonus === 'no') {
                    return 40
                }
                if (M12_1 === '1' && M12_4 === '7' && bonus === 'no') {
                    return 45
                }
                if (M12_1 === '1' && M12_4 === '8' && bonus === 'no') {
                    return 50
                }
                if (M12_1 === '1' && M12_4 === '9' && bonus === 'no') {
                    return 55
                }
                if (M12_1 === '1' && M12_4 === '10' && bonus === 'no') {
                    return 60
                }
                if (M12_1 === '1' && M12_4 === '11' && bonus === 'no') {
                    return 65
                }
                if (M12_1 === '1' && M12_4 === '12' && bonus === 'no') {
                    return 70
                }
                if (M12_1 === '1' && M12_4 === '13' && bonus === 'no') {
                    return 75
                }
                if (M12_1 === '1' && M12_4 === '14' && bonus === 'no') {
                    return 80
                }
                if (M12_1 === '1' && M12_4 === '15' && bonus === 'no') {
                    return 85
                }
                if (M12_1 === '1' && M12_4 === '16' && bonus === 'no') {
                    return 90
                }
                if (M12_1 === '1' && M12_4 === '17' && bonus === 'no') {
                    return 95
                }
                if (M12_1 === '1' && M12_4 === '18' && bonus === 'no') {
                    return 100
                }
                if (M12_1 === '1' && M12_4 === '19' && bonus === 'no') {
                    return 105
                }
                if (M12_1 === '1' && M12_4 === '20' && bonus === 'no') {
                    return 110
                }
                if (M12_1 === '1' && M12_4 === '21' && bonus === 'no') {
                    return 115
                }
                if (M12_1 === '1' && M12_4 === '22' && bonus === 'no') {
                    return 120
                }
                if (M12_1 === '1' && M12_4 === '23' && bonus === 'no') {
                    return 125
                }
                if (M12_1 === '1' && M12_4 === '24' && bonus === 'no') {
                    return 130
                }
                if (M12_1 === '1' && M12_4 === '25' && bonus === 'no') {
                    return 135
                }
                if (M12_1 === '1' && M12_4 === '26' && bonus === 'no') {
                    return 140
                }
                if (M12_1 === '1' && M12_4 === '27' && bonus === 'no') {
                    return 145
                }
                if (M12_1 === '1' && M12_4 === '28' && bonus === 'no') {
                    return 150
                }
                if (M12_1 === '1' && M12_4 === '29' && bonus === 'no') {
                    return 155
                }
                if (M12_1 === '2' && M12_4 === '0' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '2' && M12_4 === '3' && bonus === 'no') {
                    return 35
                }
                if (M12_1 === '2' && M12_4 === '4' && bonus === 'no') {
                    return 40
                }
                if (M12_1 === '2' && M12_4 === '5' && bonus === 'no') {
                    return 45
                }
                if (M12_1 === '2' && M12_4 === '6' && bonus === 'no') {
                    return 50
                }
                if (M12_1 === '2' && M12_4 === '7' && bonus === 'no') {
                    return 55
                }
                if (M12_1 === '2' && M12_4 === '8' && bonus === 'no') {
                    return 60
                }
                if (M12_1 === '2' && M12_4 === '9' && bonus === 'no') {
                    return 65
                }
                if (M12_1 === '2' && M12_4 === '10' && bonus === 'no') {
                    return 70
                }
                if (M12_1 === '2' && M12_4 === '11' && bonus === 'no') {
                    return 75
                }
                if (M12_1 === '2' && M12_4 === '12' && bonus === 'no') {
                    return 80
                }
                if (M12_1 === '2' && M12_4 === '13' && bonus === 'no') {
                    return 85
                }
                if (M12_1 === '2' && M12_4 === '14' && bonus === 'no') {
                    return 90
                }
                if (M12_1 === '2' && M12_4 === '15' && bonus === 'no') {
                    return 95
                }
                if (M12_1 === '2' && M12_4 === '16' && bonus === 'no') {
                    return 100
                }
                if (M12_1 === '2' && M12_4 === '17' && bonus === 'no') {
                    return 105
                }
                if (M12_1 === '2' && M12_4 === '18' && bonus === 'no') {
                    return 110
                }
                if (M12_1 === '2' && M12_4 === '19' && bonus === 'no') {
                    return 115
                }
                if (M12_1 === '2' && M12_4 === '20' && bonus === 'no') {
                    return 120
                }
                if (M12_1 === '2' && M12_4 === '21' && bonus === 'no') {
                    return 125
                }
                if (M12_1 === '2' && M12_4 === '22' && bonus === 'no') {
                    return 130
                }
                if (M12_1 === '2' && M12_4 === '23' && bonus === 'no') {
                    return 135
                }
                if (M12_1 === '2' && M12_4 === '24' && bonus === 'no') {
                    return 140
                }
                if (M12_1 === '2' && M12_4 === '25' && bonus === 'no') {
                    return 145
                }
                if (M12_1 === '2' && M12_4 === '26' && bonus === 'no') {
                    return 150
                }
                if (M12_1 === '2' && M12_4 === '27' && bonus === 'no') {
                    return 155
                }
                if (M12_1 === '2' && M12_4 === '28' && bonus === 'no') {
                    return 160
                }
                if (M12_1 === '2' && M12_4 === '29' && bonus === 'no') {
                    return 165
                }
                if (M12_1 === '3' && M12_4 === '0' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'no') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '5' && bonus === 'no') {
                    return 55
                }
                if (M12_1 === '3' && M12_4 === '6' && bonus === 'no') {
                    return 60
                }
                if (M12_1 === '3' && M12_4 === '7' && bonus === 'no') {
                    return 65
                }
                if (M12_1 === '3' && M12_4 === '8' && bonus === 'no') {
                    return 70
                }
                if (M12_1 === '3' && M12_4 === '9' && bonus === 'no') {
                    return 75
                }
                if (M12_1 === '3' && M12_4 === '10' && bonus === 'no') {
                    return 80
                }
                if (M12_1 === '3' && M12_4 === '11' && bonus === 'no') {
                    return 85
                }
                if (M12_1 === '3' && M12_4 === '12' && bonus === 'no') {
                    return 90
                }
                if (M12_1 === '3' && M12_4 === '13' && bonus === 'no') {
                    return 95
                }
                if (M12_1 === '3' && M12_4 === '14' && bonus === 'no') {
                    return 100
                }
                if (M12_1 === '3' && M12_4 === '15' && bonus === 'no') {
                    return 105
                }
                if (M12_1 === '3' && M12_4 === '16' && bonus === 'no') {
                    return 110
                }
                if (M12_1 === '3' && M12_4 === '17' && bonus === 'no') {
                    return 115
                }
                if (M12_1 === '3' && M12_4 === '18' && bonus === 'no') {
                    return 120
                }
                if (M12_1 === '3' && M12_4 === '19' && bonus === 'no') {
                    return 125
                }
                if (M12_1 === '3' && M12_4 === '20' && bonus === 'no') {
                    return 130
                }
                if (M12_1 === '3' && M12_4 === '21' && bonus === 'no') {
                    return 135
                }
                if (M12_1 === '3' && M12_4 === '22' && bonus === 'no') {
                    return 140
                }
                if (M12_1 === '3' && M12_4 === '23' && bonus === 'no') {
                    return 145
                }
                if (M12_1 === '3' && M12_4 === '24' && bonus === 'no') {
                    return 150
                }
                if (M12_1 === '3' && M12_4 === '25' && bonus === 'no') {
                    return 155
                }
                if (M12_1 === '3' && M12_4 === '26' && bonus === 'no') {
                    return 160
                }
                if (M12_1 === '3' && M12_4 === '27' && bonus === 'no') {
                    return 165
                }
                if (M12_1 === '3' && M12_4 === '28' && bonus === 'no') {
                    return 170
                }
                if (M12_1 === '3' && M12_4 === '29' && bonus === 'no') {
                    return 175
                }
                if (M12_1 === '0' && M12_4 === '0' && bonus === 'yes') {
                    return 0
                }
                if (M12_1 === '0' && M12_4 === '1' && bonus === 'yes') {
                    return 10
                }
                if (M12_1 === '0' && M12_4 === '2' && bonus === 'yes') {
                    return 15
                }
                if (M12_1 === '0' && M12_4 === '3' && bonus === 'yes') {
                    return 20
                }
                if (M12_1 === '0' && M12_4 === '4' && bonus === 'yes') {
                    return 25
                }
                if (M12_1 === '0' && M12_4 === '5' && bonus === 'yes') {
                    return 30
                }
                if (M12_1 === '0' && M12_4 === '6' && bonus === 'yes') {
                    return 35
                }
                if (M12_1 === '0' && M12_4 === '7' && bonus === 'yes') {
                    return 40
                }
                if (M12_1 === '0' && M12_4 === '8' && bonus === 'yes') {
                    return 45
                }
                if (M12_1 === '0' && M12_4 === '9' && bonus === 'yes') {
                    return 50
                }
                if (M12_1 === '0' && M12_4 === '10' && bonus === 'yes') {
                    return 55
                }
                if (M12_1 === '0' && M12_4 === '11' && bonus === 'yes') {
                    return 60
                }
                if (M12_1 === '0' && M12_4 === '12' && bonus === 'yes') {
                    return 65
                }
                if (M12_1 === '0' && M12_4 === '13' && bonus === 'yes') {
                    return 70
                }
                if (M12_1 === '0' && M12_4 === '14' && bonus === 'yes') {
                    return 75
                }
                if (M12_1 === '0' && M12_4 === '15' && bonus === 'yes') {
                    return 80
                }
                if (M12_1 === '0' && M12_4 === '16' && bonus === 'yes') {
                    return 85
                }
                if (M12_1 === '0' && M12_4 === '17' && bonus === 'yes') {
                    return 90
                }
                if (M12_1 === '0' && M12_4 === '18' && bonus === 'yes') {
                    return 95
                }
                if (M12_1 === '0' && M12_4 === '19' && bonus === 'yes') {
                    return 100
                }
                if (M12_1 === '0' && M12_4 === '20' && bonus === 'yes') {
                    return 105
                }
                if (M12_1 === '0' && M12_4 === '21' && bonus === 'yes') {
                    return 110
                }
                if (M12_1 === '0' && M12_4 === '22' && bonus === 'yes') {
                    return 115
                }
                if (M12_1 === '0' && M12_4 === '23' && bonus === 'yes') {
                    return 120
                }
                if (M12_1 === '0' && M12_4 === '24' && bonus === 'yes') {
                    return 125
                }
                if (M12_1 === '0' && M12_4 === '25' && bonus === 'yes') {
                    return 130
                }
                if (M12_1 === '0' && M12_4 === '26' && bonus === 'yes') {
                    return 135
                }
                if (M12_1 === '0' && M12_4 === '27' && bonus === 'yes') {
                    return 140
                }
                if (M12_1 === '0' && M12_4 === '28' && bonus === 'yes') {
                    return 145
                }
                if (M12_1 === '0' && M12_4 === '29' && bonus === 'yes') {
                    return 150
                }
                if (M12_1 === '1' && M12_4 === '0' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '1' && M12_4 === '1' && bonus === 'yes') {
                    return 20
                }
                if (M12_1 === '1' && M12_4 === '2' && bonus === 'yes') {
                    return 25
                }
                if (M12_1 === '1' && M12_4 === '3' && bonus === 'yes') {
                    return 30
                }
                if (M12_1 === '1' && M12_4 === '4' && bonus === 'yes') {
                    return 35
                }
                if (M12_1 === '1' && M12_4 === '5' && bonus === 'yes') {
                    return 40
                }
                if (M12_1 === '1' && M12_4 === '6' && bonus === 'yes') {
                    return 45
                }
                if (M12_1 === '1' && M12_4 === '7' && bonus === 'yes') {
                    return 50
                }
                if (M12_1 === '1' && M12_4 === '8' && bonus === 'yes') {
                    return 55
                }
                if (M12_1 === '1' && M12_4 === '9' && bonus === 'yes') {
                    return 60
                }
                if (M12_1 === '1' && M12_4 === '10' && bonus === 'yes') {
                    return 65
                }
                if (M12_1 === '1' && M12_4 === '11' && bonus === 'yes') {
                    return 70
                }
                if (M12_1 === '1' && M12_4 === '12' && bonus === 'yes') {
                    return 75
                }
                if (M12_1 === '1' && M12_4 === '13' && bonus === 'yes') {
                    return 80
                }
                if (M12_1 === '1' && M12_4 === '14' && bonus === 'yes') {
                    return 85
                }
                if (M12_1 === '1' && M12_4 === '15' && bonus === 'yes') {
                    return 90
                }
                if (M12_1 === '1' && M12_4 === '16' && bonus === 'yes') {
                    return 95
                }
                if (M12_1 === '1' && M12_4 === '17' && bonus === 'yes') {
                    return 100
                }
                if (M12_1 === '1' && M12_4 === '18' && bonus === 'yes') {
                    return 105
                }
                if (M12_1 === '1' && M12_4 === '19' && bonus === 'yes') {
                    return 110
                }
                if (M12_1 === '1' && M12_4 === '20' && bonus === 'yes') {
                    return 115
                }
                if (M12_1 === '1' && M12_4 === '21' && bonus === 'yes') {
                    return 120
                }
                if (M12_1 === '1' && M12_4 === '22' && bonus === 'yes') {
                    return 125
                }
                if (M12_1 === '1' && M12_4 === '23' && bonus === 'yes') {
                    return 130
                }
                if (M12_1 === '1' && M12_4 === '24' && bonus === 'yes') {
                    return 135
                }
                if (M12_1 === '1' && M12_4 === '25' && bonus === 'yes') {
                    return 140
                }
                if (M12_1 === '1' && M12_4 === '26' && bonus === 'yes') {
                    return 145
                }
                if (M12_1 === '1' && M12_4 === '27' && bonus === 'yes') {
                    return 150
                }
                if (M12_1 === '1' && M12_4 === '28' && bonus === 'yes') {
                    return 155
                }
                if (M12_1 === '1' && M12_4 === '29' && bonus === 'yes') {
                    return 160
                }
                if (M12_1 === '2' && M12_4 === '0' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '2' && M12_4 === '3' && bonus === 'yes') {
                    return 40
                }
                if (M12_1 === '2' && M12_4 === '4' && bonus === 'yes') {
                    return 45
                }
                if (M12_1 === '2' && M12_4 === '5' && bonus === 'yes') {
                    return 50
                }
                if (M12_1 === '2' && M12_4 === '6' && bonus === 'yes') {
                    return 55
                }
                if (M12_1 === '2' && M12_4 === '7' && bonus === 'yes') {
                    return 60
                }
                if (M12_1 === '2' && M12_4 === '8' && bonus === 'yes') {
                    return 65
                }
                if (M12_1 === '2' && M12_4 === '9' && bonus === 'yes') {
                    return 70
                }
                if (M12_1 === '2' && M12_4 === '10' && bonus === 'yes') {
                    return 75
                }
                if (M12_1 === '2' && M12_4 === '11' && bonus === 'yes') {
                    return 80
                }
                if (M12_1 === '2' && M12_4 === '12' && bonus === 'yes') {
                    return 85
                }
                if (M12_1 === '2' && M12_4 === '13' && bonus === 'yes') {
                    return 90
                }
                if (M12_1 === '2' && M12_4 === '14' && bonus === 'yes') {
                    return 95
                }
                if (M12_1 === '2' && M12_4 === '15' && bonus === 'yes') {
                    return 100
                }
                if (M12_1 === '2' && M12_4 === '16' && bonus === 'yes') {
                    return 105
                }
                if (M12_1 === '2' && M12_4 === '17' && bonus === 'yes') {
                    return 110
                }
                if (M12_1 === '2' && M12_4 === '18' && bonus === 'yes') {
                    return 115
                }
                if (M12_1 === '2' && M12_4 === '19' && bonus === 'yes') {
                    return 120
                }
                if (M12_1 === '2' && M12_4 === '20' && bonus === 'yes') {
                    return 125
                }
                if (M12_1 === '2' && M12_4 === '21' && bonus === 'yes') {
                    return 130
                }
                if (M12_1 === '2' && M12_4 === '22' && bonus === 'yes') {
                    return 135
                }
                if (M12_1 === '2' && M12_4 === '23' && bonus === 'yes') {
                    return 140
                }
                if (M12_1 === '2' && M12_4 === '24' && bonus === 'yes') {
                    return 145
                }
                if (M12_1 === '2' && M12_4 === '25' && bonus === 'yes') {
                    return 150
                }
                if (M12_1 === '2' && M12_4 === '26' && bonus === 'yes') {
                    return 155
                }
                if (M12_1 === '2' && M12_4 === '27' && bonus === 'yes') {
                    return 160
                }
                if (M12_1 === '2' && M12_4 === '28' && bonus === 'yes') {
                    return 165
                }
                if (M12_1 === '2' && M12_4 === '29' && bonus === 'yes') {
                    return 170
                }
                if (M12_1 === '3' && M12_4 === '0' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'yes') {
                    return new Error("Altura demasiado pequeña para el número de Módulos coincidentes en color")
                }
                if (M12_1 === '3' && M12_4 === '5' && bonus === 'yes') {
                    return 60
                }
                if (M12_1 === '3' && M12_4 === '6' && bonus === 'yes') {
                    return 65
                }
                if (M12_1 === '3' && M12_4 === '7' && bonus === 'yes') {
                    return 70
                }
                if (M12_1 === '3' && M12_4 === '8' && bonus === 'yes') {
                    return 75
                }
                if (M12_1 === '3' && M12_4 === '9' && bonus === 'yes') {
                    return 80
                }
                if (M12_1 === '3' && M12_4 === '10' && bonus === 'yes') {
                    return 85
                }
                if (M12_1 === '3' && M12_4 === '11' && bonus === 'yes') {
                    return 90
                }
                if (M12_1 === '3' && M12_4 === '12' && bonus === 'yes') {
                    return 95
                }
                if (M12_1 === '3' && M12_4 === '13' && bonus === 'yes') {
                    return 100
                }
                if (M12_1 === '3' && M12_4 === '14' && bonus === 'yes') {
                    return 105
                }
                if (M12_1 === '3' && M12_4 === '15' && bonus === 'yes') {
                    return 110
                }
                if (M12_1 === '3' && M12_4 === '16' && bonus === 'yes') {
                    return 115
                }
                if (M12_1 === '3' && M12_4 === '17' && bonus === 'yes') {
                    return 120
                }
                if (M12_1 === '3' && M12_4 === '18' && bonus === 'yes') {
                    return 125
                }
                if (M12_1 === '3' && M12_4 === '19' && bonus === 'yes') {
                    return 130
                }
                if (M12_1 === '3' && M12_4 === '20' && bonus === 'yes') {
                    return 135
                }
                if (M12_1 === '3' && M12_4 === '21' && bonus === 'yes') {
                    return 140
                }
                if (M12_1 === '3' && M12_4 === '22' && bonus === 'yes') {
                    return 145
                }
                if (M12_1 === '3' && M12_4 === '23' && bonus === 'yes') {
                    return 150
                }
                if (M12_1 === '3' && M12_4 === '24' && bonus === 'yes') {
                    return 155
                }
                if (M12_1 === '3' && M12_4 === '25' && bonus === 'yes') {
                    return 160
                }
                if (M12_1 === '3' && M12_4 === '26' && bonus === 'yes') {
                    return 165
                }
                if (M12_1 === '3' && M12_4 === '27' && bonus === 'yes') {
                    return 170
                }
                if (M12_1 === '3' && M12_4 === '28' && bonus === 'yes') {
                    return 175
                }
                if (M12_1 === '3' && M12_4 === '29' && bonus === 'yes') {
                    return 180
                }
            }]
        },
        {
            "title": "M13 Mejoras en Sostenibilidad",
            "description": "Solo una mejora (paneles solares, Techo verde, aislamiento) cuenta por Pila.",
            "objectives": [{
                "id": "M13",
                "title": "Número de mejoras Independientes y Soportadas solo por una Pila que está al menos parcialmente dentro de cualquier Círculo:",
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
            "score": [function(M13, bonus) {
                M13 = String(M13);
                bonus = String(bonus);
                if (M13 === '0' && bonus === 'no') {
                    return 0
                }
                if (M13 === '1' && bonus === 'no') {
                    return 10
                }
                if (M13 === '2' && bonus === 'no') {
                    return 20
                }
                if (M13 === '3' && bonus === 'no') {
                    return 30
                }
                if (M13 === '0' && bonus === 'yes') {
                    return 0
                }
                if (M13 === '1' && bonus === 'yes') {
                    return 15
                }
                if (M13 === '2' && bonus === 'yes') {
                    return 25
                }
                if (M13 === '3' && bonus === 'yes') {
                    return 35
                }
            }]
        },
        {
            "title": "M14 Precisión",
            "description": "Podéis interrumpir vuestro Robot y llevarlo a casa para un reinicio, pero las interrupciones os hacen perder Testigos de Precisión.",
            "objectives": [{
                "id": "precision",
                "title": "Número de testigos de precisión que quedan en el Terreno de Juego:",
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
                "default": "6"
            }],
            "score": [function(precision) {
                precision = String(precision);
                if (precision === '0') {
                    return 0
                }
                if (precision === '1') {
                    return 5
                }
                if (precision === '2') {
                    return 10
                }
                if (precision === '3') {
                    return 20
                }
                if (precision === '4') {
                    return 30
                }
                if (precision === '5') {
                    return 45
                }
                if (precision === '6') {
                    return 60
                }
            }]
        }
    ],
    "strings": {
        "yes": "Sí",
        "no": "No",
        "advantage-name": "Beneficio",
        "advantage-desc": "Si todo vuestro Equipamiento cabe dentro de la Zona de Inspeccción Menor durante la preparación de la partida, recibiréis un Beneficio.",
        "advantage-scoring": "Vuestro Robot y todo vuestro Equipamiento caben en la Zona de Inspección Menor:",
        "M01-name": "M01 Pisos Elevados",
        "M01-desc": "Solo podéis conseguir puntos por banderas si obtenéis los puntos del Puente. Está permitido y es de esperar que los Robots colisionen mientras intentan ganar los puntos de las Banderas.",
        "M01-scoring1": "El Robot está Soportado por el Puente:",
        "M01-scoring2": "Número de Banderas que están claramente levantadas  cualquier altura, sólo debido al Robot:",
        "M02-name": "M02 Grúa",
        "M02-desc": "Puntuad todo lo que corresponda.",
        "M02-scoring1": "El Módulo Azul Enganchado está claramente bajado cualquier distancia del Agujero de la Guía:",
        "M02-scoring2": "El Módulo Azul Enganchado es Independiente y está Soportado por otro Módulo Azul:",
        "M02-scoring3": "Y el 1er Nivel está Completamente dentro del Círculo Azul:",
        "M03-name": "M03 Dron de Inspección",
        "M03-desc": "La misión del Dron de Inspección nos ilustra una manera muy barata de verificar puentes y otras estructuras altas. Los Drones pueden volar durante horas y mandar imágenes detalladas o también escaneos 3D.",
        "M03-scoring1": "El Dron de Inspección está Soportado por el eje del Puente:",
        "M04-name": "M04 Diseño para la Vida Silvestre",
        "M04-desc": "El Murciélago debe terminar en la rama marrón",
        "M04-scoring1": "El Murciélago está Soportado por la rama del Árbol:",
        "M05-name": "M05 Casa en el árbol",
        "M05-desc": "Puntuad todo lo que corresponda.",
        "M05-scoring1": "Número de Módulos Independientes y Soportados por las Ramas Grandes del Árbol:",
        "M05-scoring2": "Número de Módulos Independientes y Soportados por las Ramas Pequeñas del Árbol:",
        "M05-error": "Demasiados Módulos",
        "M06-name": "M06 Atasco de Tráfico",
        "M06-desc": "Descongestionad la carretera levantando el atasco de tráfico.",
        "M06-scoring1": "El Atasco de Tráfico está levantado, su parte móvil es Independiente y está Soportada solo por sus bisagras:",
        "M07-name": "M07 Columpio",
        "M07-desc": "Liberad el Columpio.",
        "M07-scoring1": "El Columpio está liberado:",
        "M08-name": "M08 Montacargas",
        "M08-desc": "Marcad una u otra puntuación, pero no ambas.",
        "M08-scoring1": "Las partes móviles del Montacargas son Independientes y están Soportadas solo por sus bisagras, en la siguiente posición:",
        "M08-scoring2": "Ninguna",
        "M08-scoring3": "Coche Azul abajo",
        "M08-scoring4": "Equilibradas",
        "M09-name": "M09 Factor de Seguridad",
        "M09-desc": "¿Puede el Edificio Piloto mantenerse en pie cuando algunas de las barras que lo soportan son movidas?",
        "M09-scoring1": "El Edificio Piloto es Independiente y está Soportado solo por las vigas azules:",
        "M09-scoring2": "Número de vigas azules que han sido apartadas al menos a medio camino:",
        "M10-name": "M10 Construcción de Acero",
        "M10-desc": "Conseguid que la Estructura de Acero este levantada.",
        "M10-scoring": "La Estructura de Acero está levantada, es Independiente y está Soportada sólo por sus bisagras:",
        "M11-name": "M11 Arquitectura Innovadora",
        "M11-desc": "Diseñad y Construid vuestra propia estructura y transportadla a cualquier círculo.",
        "M11-scoring1": "La Estructura es mayor que un Módulo Azul y está construida solo con la piezas LEGO blancas del equipo:",
        "M11-scoring2": "La estructura está dentro de cualquier círculo:",
        "M11-scoring3": "No",
        "M11-scoring4": "Parcialmente",
        "M11-scoring5": "Completamente",
        "M12-name": "M12 Diseño y Construcción",
        "M12-desc": "El círculo Azul no forma parte de la Misión 12.",
        "M12-scoring1": "Número de Círculos con un Módulo de color coincidente con el Círculo, en contacto plano sobre el Tapete y Completamente dentro:",
        "M12-scoring4": "Suma de las alturas de todas las Pilas Independientes al menos parcialmente dentro de cualquier Círculo:",
        "M13-name": "M13 Mejoras en Sostenibilidad",
        "M13-desc": "Solo una mejora (paneles solares, Techo verde, aislamiento) cuenta por Pila.",
        "M13-scoring": "Número de mejoras Independientes y Soportadas solo por una Pila que está al menos parcialmente dentro de cualquier Círculo:",
        "precision-name": "M14 Precisión",
        "precision-desc": "Podéis interrumpir vuestro Robot y llevarlo a casa para un reinicio, pero las interrupciones os hacen perder Testigos de Precisión.",
        "precision-scoring": "Número de testigos de precisión que quedan en el Terreno de Juego:",
        "building-unit-error": "Demasiados Módulos en uso",
        "crane-error": "Conflicto en la posición de los Módulos Azules",
        "M12-error2": "Altura demasiado pequeña para el número de Módulos coincidentes en color"
    },
    "rtl": false
})`
export default challenge
