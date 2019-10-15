({
    "title": "CITY SHAPER",
    "missions": [{
            "title": "Vantagem",
            "description": "If all your Equipment fits in the Small Inspection area during Match preparation, you get an advantage.",
            "objectives": [{
                "id": "bonus",
                "title": "O Robô e os Equipamentos cabem na Área de Inspeção Pequena:",
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
            "title": "M01 LUGARES ELEVADOS",
            "description": "You can only get Flag points if you get Bridge points. It is okay and expected for Robots to collide while trying to earn Flag points.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "O robô está apoiado sobre a ponte:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Número de bandeiras que estão claramente levantadas a qualquer altura, somente pelo Robô:",
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
            "title": "M02 GUINDASTE",
            "description": "Score all that apply.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "O Módulo Azul preso pelo gancho está claramente em uma posição mais baixa do que a inicial:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_2",
                    "title": "O Módulo Azul preso pelo gancho está Independente e Apoiado sobre outro módulo azul:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_3",
                    "title": "E o módulo de baixo está completamente dentro do círculo azul:",
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
                    return new Error('Muitos Módulos em uso')
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflito na posição dos Módulos Azuis")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'no') {
                    return new Error("Conflito na posição dos Módulos Azuis")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflito na posição dos Módulos Azuis")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 20
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflito na posição dos Módulos Azuis")
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
                    return new Error("Conflito na posição dos Módulos Azuis")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'yes') {
                    return new Error("Conflito na posição dos Módulos Azuis")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflito na posição dos Módulos Azuis")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'yes') {
                    return 30
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflito na posição dos Módulos Azuis")
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
            "title": "M03 DRONE DE INSPEÇÃO",
            "description": "The Inspection Camera Drone Mission reveals an inexpensive way to check out bridges and other tall structures. Drones can fly for hours and send back detailed pictures and even 3D scans.",
            "objectives": [{
                "id": "M03_1",
                "title": "O Drone de Inspeção está apoiado sobre o eixo  na Ponte:",
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
            "title": "M04 DESIGN PARA OS ANIMAIS",
            "description": "The Bat needs to end up on the brown Branch",
            "objectives": [{
                "id": "M04_1",
                "title": "O morcego está apoiado pelo galho da Árvore:",
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
            "title": "M05 CASA NA ÁRVORE",
            "description": "Score all that apply.",
            "objectives": [{
                    "id": "M05_lg",
                    "title": "Número de Módulos Independentes e Apoiados sobre os Galhos Grandes da Árvore:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 17,
                    "value": null
                },
                {
                    "id": "M05_sm",
                    "title": "Número de Módulos Independentes e Apoiados sobre os Galhos Pequenos da Árvore:",
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
                    return new Error('Muitos Módulos em uso')
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
            "title": "M06 ENGARRAFAMENTO",
            "description": "Clear the road by lifting the Traffic Jam.",
            "objectives": [{
                "id": "M06_1",
                "title": "O Engarrafamento está levantado e a parte móvel está independente e apoiada apenas pela própria articulação da estrutura:",
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
            "title": "M07 BALANÇO",
            "description": "Release the Swing.",
            "objectives": [{
                "id": "M07_1",
                "title": "O balanço está solto:",
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
            "title": "M08 ELEVADOR",
            "description": "Score one or the other, but not both.",
            "objectives": [{
                "id": "M08_1",
                "title": "As partes móveis do elevador estão Independentes e Apoiadas apenas pela própria articulação da estrutura, na seguinte posição:",
                "options": [{
                        "value": "neither",
                        "title": "Nenhuma das duas"
                    },
                    {
                        "value": "car",
                        "title": "Carro azul para baixo"
                    },
                    {
                        "value": "balanced",
                        "title": "Em equilíbrio"
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
            "title": "M09 FATOR DE SEGURANÇA",
            "description": "Can the Test Building stand when some of its support beams are moved?",
            "objectives": [{
                    "id": "M09_1",
                    "title": "O Edifício Teste está Independente e Apoiado apenas sobre as vigas azuis:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M09_2",
                    "title": "Número de vigas derrubadas, mais próximas do tapete do que do Modelo:",
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
            "title": "M10 CONSTRUÇÃO EM AÇO",
            "description": "Make the Steel Structure stand up.",
            "objectives": [{
                "id": "M10",
                "title": "A Estrutura de aço está em pé e Independente, apoiada apenas pela própria articulação da estrutura:",
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
            "title": "M11 ARQUITETURA INOVADORA",
            "description": "Design and build your own Structure and deliver to any Circle.",
            "objectives": [{
                    "id": "M11_1",
                    "title": "A estrutura é maior que o Módulo de Construção Azul,construída usando apenas blocos LEGO brancos da equipe:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M11_2",
                    "title": "A Estrutura está dentro de algum Círculo:",
                    "options": [{
                            "value": "no",
                            "title": "Não"
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
            "title": "M12 PLANEJE E CONSTRUA",
            "description": "The Blue Circle is not part of Mission 12.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "Número de Círculos com algum Módulo da mesma cor do círculo, completamente dentro e tocando completamente o Tapete:",
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
                    "title": "Soma de todas as alturas  das Pilhas Independentes que estão, pelo menos parcialmente, dentro de algum Círculo:",
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
                    return new Error('Muitos Módulos em uso')
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
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
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
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'no') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'no') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
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
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'no') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'no') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'no') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'no') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
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
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
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
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
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
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'yes') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'yes') {
                    return new Error("Altura muito pequena para o número de Módulos correspondentes à cor")
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
            "title": "M13 MELHORIAS DE SUSTENTABILIDADE",
            "description": "Only one Upgrade (solar panels, roof garden, insulation) counts per Stack.",
            "objectives": [{
                "id": "M13",
                "title": "Número de Melhorias que estão Independentes e Apoiadas apenas sobre uma Pilha que está, pelo menos parcialmente,  dentro de um Círculo:",
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
            "title": "M14 PRECISÃO",
            "description": "You are allowed to Interrupt your Robot and bring it back to re-Launch, but Interruptions do lose Precision Tokens.",
            "objectives": [{
                "id": "precision",
                "title": "Número de Discos de Precisão deixados na Arena:",
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
        "yes": "Sim",
        "no": "Não",
        "advantage-name": "Vantagem",
        "advantage-desc": "If all your Equipment fits in the Small Inspection area during Match preparation, you get an advantage.",
        "advantage-scoring": "O Robô e os Equipamentos cabem na Área de Inspeção Pequena:",
        "M01-name": "M01 LUGARES ELEVADOS",
        "M01-desc": "You can only get Flag points if you get Bridge points. It is okay and expected for Robots to collide while trying to earn Flag points.",
        "M01-scoring1": "O robô está apoiado sobre a ponte:",
        "M01-scoring2": "Número de bandeiras que estão claramente levantadas a qualquer altura, somente pelo Robô:",
        "M02-name": "M02 GUINDASTE",
        "M02-desc": "Score all that apply.",
        "M02-scoring1": "O Módulo Azul preso pelo gancho está claramente em uma posição mais baixa do que a inicial:",
        "M02-scoring2": "O Módulo Azul preso pelo gancho está Independente e Apoiado sobre outro módulo azul:",
        "M02-scoring3": "E o módulo de baixo está completamente dentro do círculo azul:",
        "M03-name": "M03 DRONE DE INSPEÇÃO",
        "M03-desc": "The Inspection Camera Drone Mission reveals an inexpensive way to check out bridges and other tall structures. Drones can fly for hours and send back detailed pictures and even 3D scans.",
        "M03-scoring1": "O Drone de Inspeção está apoiado sobre o eixo  na Ponte:",
        "M04-name": "M04 DESIGN PARA OS ANIMAIS",
        "M04-desc": "The Bat needs to end up on the brown Branch",
        "M04-scoring1": "O morcego está apoiado pelo galho da Árvore:",
        "M05-name": "M05 CASA NA ÁRVORE",
        "M05-desc": "Score all that apply.",
        "M05-scoring1": "Número de Módulos Independentes e Apoiados sobre os Galhos Grandes da Árvore:",
        "M05-scoring2": "Número de Módulos Independentes e Apoiados sobre os Galhos Pequenos da Árvore:",
        "M05-error": "Número de módulos excede",
        "M06-name": "M06 ENGARRAFAMENTO",
        "M06-desc": "Clear the road by lifting the Traffic Jam.",
        "M06-scoring1": "O Engarrafamento está levantado e a parte móvel está independente e apoiada apenas pela própria articulação da estrutura:",
        "M07-name": "M07 BALANÇO",
        "M07-desc": "Release the Swing.",
        "M07-scoring1": "O balanço está solto:",
        "M08-name": "M08 ELEVADOR",
        "M08-desc": "Score one or the other, but not both.",
        "M08-scoring1": "As partes móveis do elevador estão Independentes e Apoiadas apenas pela própria articulação da estrutura, na seguinte posição:",
        "M08-scoring2": "Nenhuma das duas",
        "M08-scoring3": "Carro azul para baixo",
        "M08-scoring4": "Em equilíbrio",
        "M09-name": "M09 FATOR DE SEGURANÇA",
        "M09-desc": "Can the Test Building stand when some of its support beams are moved?",
        "M09-scoring1": "O Edifício Teste está Independente e Apoiado apenas sobre as vigas azuis:",
        "M09-scoring2": "Número de vigas derrubadas, mais próximas do tapete do que do Modelo:",
        "M10-name": "M10 CONSTRUÇÃO EM AÇO",
        "M10-desc": "Make the Steel Structure stand up.",
        "M10-scoring": "A Estrutura de aço está em pé e Independente, apoiada apenas pela própria articulação da estrutura:",
        "M11-name": "M11 ARQUITETURA INOVADORA",
        "M11-desc": "Design and build your own Structure and deliver to any Circle.",
        "M11-scoring1": "A estrutura é maior que o Módulo de Construção Azul,construída usando apenas blocos LEGO brancos da equipe:",
        "M11-scoring2": "A Estrutura está dentro de algum Círculo:",
        "M11-scoring3": "Não",
        "M11-scoring4": "Parcialmente",
        "M11-scoring5": "Completamente",
        "M12-name": "M12 PLANEJE E CONSTRUA",
        "M12-desc": "The Blue Circle is not part of Mission 12.",
        "M12-scoring1": "Número de Círculos com algum Módulo da mesma cor do círculo, completamente dentro e tocando completamente o Tapete:",
        "M12-scoring4": "Soma de todas as alturas  das Pilhas Independentes que estão, pelo menos parcialmente, dentro de algum Círculo:",
        "M13-name": "M13 MELHORIAS DE SUSTENTABILIDADE",
        "M13-desc": "Only one Upgrade (solar panels, roof garden, insulation) counts per Stack.",
        "M13-scoring": "Número de Melhorias que estão Independentes e Apoiadas apenas sobre uma Pilha que está, pelo menos parcialmente,  dentro de um Círculo:",
        "precision-name": "M14 PRECISÃO",
        "precision-desc": "You are allowed to Interrupt your Robot and bring it back to re-Launch, but Interruptions do lose Precision Tokens.",
        "precision-scoring": "Número de Discos de Precisão deixados na Arena:",
        "building-unit-error": "Muitos Módulos em uso",
        "crane-error": "Conflito na posição dos Módulos Azuis",
        "M12-error2": "Altura muito pequena para o número de Módulos correspondentes à cor"
    },
    "rtl": false
})
