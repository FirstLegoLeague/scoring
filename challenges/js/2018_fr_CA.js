const challenge = `({
    "title": "EN Orbite",
    "missions": [{
            "title": "M01 VOYAGE DANS L’ESPACE",
            "description": "*Faites clairement dévaler chaque charge sur la rampe. Pour chaque descente, le chariot doit *être indépendant au moment d’atteindre la première connexion de la rampe.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Charge utile véhicule a dépassé la première connexion de la rampe",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Charge utile nourriture a dépassé la première connexion de la rampe",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "Charge utile équipage a dépassé la première connexion de la rampe",
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
            "title": "M02 PANNEAUX SOLAIRES",
            "description": "Les panneaux solaires doivent être orientés vers ou à l’opposé de vous.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Les deux panneaux solaires sont orientés vers le même terrain",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "Votre panneau solaire est orienté vers le terrain de l’autre équipe",
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
            "title": "M03 IMPRESSION 3D",
            "description": "Éjectez la brique 2x4 *en plaçant le régolithe dans l’imprimante 3D.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "La brique 2x4 est éjectée (par le seul effet de l'échantillon de régolithe dans l’imprimante 3D)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "La brique 2x4 est éjectée et complètement dans la zone nord-est de la planète",
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
            "title": "M04 LA TRAVERSÉE DU CRATÈRE",
            "description": "Le robot doit traverser complètement le modèle du cratère en passant directement par-dessus. Non pas tout près, Non pas autour du modèle.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Tous les éléments qui supportent votre équipement doivent traverser complètement entre les deux tours",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "La traversée doit se faire d’est en ouest et dépasser complètement la partie plate de la barrière",
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
            "title": "M05 L’EXTRACTION",
            "description": "Le robot doit extraire tous les échantillons du modèle de la carrière puis les utiliser selon l’énoncé ci-après, ainsi que celui de la mission M03.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Les quatre échantillons ne sont plus en contact avec l’arbre cruciforme qui les retenait dans le Modèle de la carrière.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "L’échantillon de gaz est en contact du tapis et complètement dans la cible de l’atterrisseur",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-OU- L’échantillon de gaz est complètement dans la base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "L’échantillon d’eau est supporté que par le modèle de la serre",
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
                    return new Error("L’échantillon de gaz ne peut pas être à deux endroits")
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
                    return new Error("L’échantillon de gaz ne peut pas être à deux endroits")
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
                    return new Error("L’échantillon de gaz ne peut pas être à deux endroits")
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
                    return new Error("L’échantillon de gaz ne peut pas être à deux endroits")
                }
            }]
        },
        {
            "title": "M06 LES MODULES DE LA STATION SPATIALE",
            "description": "Le robot doit enlever et insérer des modules dans les ouvertures de la station spatiale. Les modules insérés ne doivent rien toucher excepté le module d’Habitation.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "Le module Conique complètement dans la base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "Le module Tubulaire est dans le module d’Habitation du côté ouest",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "Le module d’Amarrage dans le module d’Habitation du côté est",
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
            "title": "M07 LA SORTIE DANS L’ESPACE",
            "description": "Le robot doit mettre la figurine de Gerhard l’astronaute dans le sas de sécurité.",
            "objectives": [{
                "id": "M07",
                "title": "Astronaut “Gerhard” est dans le sas de sécurité:",
                "options": [{
                        "value": "none",
                        "title": "Non"
                    },
                    {
                        "value": "partially",
                        "title": "Partiellement"
                    },
                    {
                        "value": "completely",
                        "title": "Complètement"
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
            "title": "M08 EXERCICES D’AÉROBIE",
            "description": "Le robot doit déplacer à plusieurs reprises une ou les deux poignées de la machine d’exercice physique pour faire tourner l’aiguille. (Si l'aiguille couvre partiellement les bords gris ou orange, sélectionnez cette couleur.)",
            "objectives": [{
                "id": "M08",
                "title": "L’extrémité de l’aiguille est sur (dû au mouvement d'une ou des deux poignées de la machine d’exercice physique:",
                "options": [{
                        "value": "none",
                        "title": "Aucun"
                    },
                    {
                        "value": "gray",
                        "title": "Gris"
                    },
                    {
                        "value": "white",
                        "title": "Blanc"
                    },
                    {
                        "value": "orange",
                        "title": "Orange"
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
            "title": "M09 EXERCICES DE MUSCULATION",
            "description": "Le robot doit soulever la barre de la machine de musculation à une certaine hauteur.",
            "objectives": [{
                "id": "M09",
                "title": "La barre est soulevée jusqu’à ce que le 4e trou de la bande dentée soit au moins partiellement visible.",
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
            "title": "M10 PRODUCTION ALIMENTAIRE",
            "description": "Pousser la barre à la bonne distance et avec la bonne force pour dévoiler la partie verte.",
            "objectives": [{
                "id": "M10",
                "title": "Le poids gris est tombé après le vert, mais avant le brun (dû uniquement au mouvement de la barre)",
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
            "title": "M11 VITESSE DE LIBÉRATION",
            "description": "Le robot doit taper avec suffisamment de force la plateforme de lancement pour que le vaisseau spatial reste accroché en haut du Modèle.",
            "objectives": [{
                "id": "M11",
                "title": "Le vaisseau spatial monte et reste en haut (en appuyant/tapant la plateforme de lancement)",
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
            "title": "M12 L’ORBITE DES SATELLITES",
            "description": "Le robot doit déplacer un ou plusieurs satellites vers l’orbite extérieure.",
            "objectives": [{
                "id": "M12",
                "title": "Satellites au-dessus de la zone située entre les deux lignes de l’orbite extérieure:",
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
            "title": "M13 L’OBSERVATOIRE",
            "description": "Tourner l’Observatoire vers une direction précise.(Si l’extrémité de l’aiguille recouvre partiellement les bords gris ou orange, sélectionnez cette couleur.)",
            "objectives": [{
                "id": "M13",
                "title": "L’extrémité de l’aiguille est sur:",
                "options": [{
                        "value": "none",
                        "title": "Aucun"
                    },
                    {
                        "value": "gray",
                        "title": "Gris"
                    },
                    {
                        "value": "white",
                        "title": "Blanc"
                    },
                    {
                        "value": "orange",
                        "title": "Orange"
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
            "title": "M14 DÉFLECTEUR DE MÉTÉOROÏDE",
            "description": "À partir de l’ouest de la ligne libre, lancez un ou deux météoroïdes “indépendants” vers le receveur de météoroïdes.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Météoroïdes et en contact du tapis et dans la section Centre:",
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
                    "title": "Météoroïdes et en contact du tapis et dans la section Latérale:",
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
                    return new Error("Combinaison impossible. Il n'y a que deux météoroïdes")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Combinaison impossible. Il n'y a que deux météoroïdes")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Combinaison impossible. Il n'y a que deux météoroïdes")
                }
            }]
        },
        {
            "title": "M15 L’ATTERRISSEUR",
            "description": "Déposez l’atterrisseur intact à l’une de ses cibles ou, le cas échéant, à la base.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "L’atterrisseur est intact et en contact du tapis",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "L’atterrisseur est complètement dans:",
                    "options": [{
                            "value": "no",
                            "title": "None"
                        },
                        {
                            "value": "base",
                            "title": "Base"
                        },
                        {
                            "value": "planet",
                            "title": "Zone nord-est"
                        },
                        {
                            "value": "circle",
                            "title": "Sa cible"
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
            "title": "PÉNALITÉS D’INTERRUPTION",
            "description": "Vous êtes autorisé à récupérer votre robot à la main, mais cela entraîne cette pénalité.",
            "objectives": [{
                "id": "penalties",
                "title": "Nombre de disques de pénalité dans le triangle sud-est:",
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
        "yes": "Oui",
        "no": "Non",
        "M01-name": "M01 VOYAGE DANS L’ESPACE",
        "M01-desc": "*Faites clairement dévaler chaque charge sur la rampe. Pour chaque descente, le chariot doit *être indépendant au moment d’atteindre la première connexion de la rampe.",
        "M01-scoring1": "Charge utile véhicule a dépassé la première connexion de la rampe",
        "M01-scoring2": "Charge utile nourriture a dépassé la première connexion de la rampe",
        "M01-scoring3": "Charge utile équipage a dépassé la première connexion de la rampe",
        "M02-name": "M02 PANNEAUX SOLAIRES",
        "M02-desc": "Les panneaux solaires doivent être orientés vers ou à l’opposé de vous.",
        "M02-scoring1": "Les deux panneaux solaires sont orientés vers le même terrain",
        "M02-scoring2": "Votre panneau solaire est orienté vers le terrain de l’autre équipe",
        "M03-name": "M03 IMPRESSION 3D",
        "M03-desc": "Éjectez la brique 2x4 *en plaçant le régolithe dans l’imprimante 3D.",
        "M03-scoring1": "La brique 2x4 est éjectée (par le seul effet de l'échantillon de régolithe dans l’imprimante 3D)",
        "M03-scoring2": "La brique 2x4 est éjectée et complètement dans la zone nord-est de la planète",
        "M04-name": "M04 LA TRAVERSÉE DU CRATÈRE",
        "M04-desc": "Le robot doit traverser complètement le modèle du cratère en passant directement par-dessus. Non pas tout près, Non pas autour du modèle.",
        "M04-scoring1": "Tous les éléments qui supportent votre équipement doivent traverser complètement entre les deux tours",
        "M04-scoring2": "La traversée doit se faire d’est en ouest et dépasser complètement la partie plate de la barrière",
        "M05-name": "M05 L’EXTRACTION",
        "M05-desc": "Le robot doit extraire tous les échantillons du modèle de la carrière puis les utiliser selon l’énoncé ci-après, ainsi que celui de la mission M03.",
        "M05-scoring1": "Les quatre échantillons ne sont plus en contact avec l’arbre cruciforme qui les retenait dans le Modèle de la carrière.",
        "M05-scoring2": "L’échantillon de gaz est en contact du tapis et complètement dans la cible de l’atterrisseur",
        "M05-scoring3": "-OU- L’échantillon de gaz est complètement dans la base",
        "M05-scoring4": "L’échantillon d’eau est supporté que par le modèle de la serre",
        "M05-error": "L’échantillon de gaz ne peut pas être à deux endroits",
        "M06-name": "M06 LES MODULES DE LA STATION SPATIALE",
        "M06-desc": "Le robot doit enlever et insérer des modules dans les ouvertures de la station spatiale. Les modules insérés ne doivent rien toucher excepté le module d’Habitation.",
        "M06-scoring1": "Le module Conique complètement dans la base",
        "M06-scoring2": "Le module Tubulaire est dans le module d’Habitation du côté ouest",
        "M06-scoring3": "Le module d’Amarrage dans le module d’Habitation du côté est",
        "M07-name": "M07 LA SORTIE DANS L’ESPACE",
        "M07-desc": "Le robot doit mettre la figurine de Gerhard l’astronaute dans le sas de sécurité.",
        "M07-scoring": "Astronaut “Gerhard” est dans le sas de sécurité:",
        "M07-scoring1": "Non",
        "M07-scoring2": "Partiellement",
        "M07-scoring3": "Complètement",
        "M08-name": "M08 EXERCICES D’AÉROBIE",
        "M08-desc": "Le robot doit déplacer à plusieurs reprises une ou les deux poignées de la machine d’exercice physique pour faire tourner l’aiguille. (Si l'aiguille couvre partiellement les bords gris ou orange, sélectionnez cette couleur.)",
        "M08-scoring": "L’extrémité de l’aiguille est dans (due au mouvement d'une ou des deux poignées de la machine d’exercice physique):",
        "M08-scoring1": "Aucun",
        "M08-scoring2": "Gris",
        "M08-scoring3": "Blanc",
        "M08-scoring4": "Orange",
        "M09-name": "M09 EXERCICES DE MUSCULATION",
        "M09-desc": "Le robot doit soulever la barre de la machine de musculation à une certaine hauteur.",
        "M09-scoring": "La barre est soulevée jusqu’à ce que le 4e trou de la bande dentée soit au moins partiellement visible.",
        "M10-name": "M10 PRODUCTION ALIMENTAIRE",
        "M10-desc": "Pousser la barre à la bonne distance et avec la bonne force pour dévoiler la partie verte.",
        "M10-scoring": "Le poids gris est tombé après le vert, mais avant le brun (du uniquement au mouvement de la barre)",
        "M11-name": "M11 VITESSE DE LIBÉRATION",
        "M11-desc": "Le robot doit taper avec suffisamment de force la plateforme de lancement pour que le vaisseau spatial reste accroché en haut du Modèle.",
        "M11-scoring": "Le vaisseau spatial monte et reste en haut (en appuyant/tapant la plateforme de lancement)",
        "M12-name": "M12 L’ORBITE DES SATELLITES",
        "M12-desc": "Le robot doit déplacer un ou plusieurs satellites vers l’orbite extérieure.",
        "M12-scoring": "Satellites au-dessus de la zone située entre les deux lignes de l’orbite extérieure:",
        "M13-name": "M13 L’OBSERVATOIRE",
        "M13-desc": "Tourner l’Observatoire vers une direction précise.(Si l’extrémité de l’aiguille recouvre partiellement les bords gris ou orange, sélectionnez cette couleur.)",
        "M13-scoring": "L’extrémité de l’aiguille est sur:",
        "M13-scoring1": "Aucun",
        "M13-scoring2": "Gris",
        "M13-scoring3": "Blanc",
        "M13-scoring4": "Orange",
        "M14-name": "M14 DÉFLECTEUR DE MÉTÉOROÏDE",
        "M14-desc": "À partir de l’ouest de la ligne libre, lancez un ou deux météoroïdes “indépendants” vers le receveur de météoroïdes.",
        "M14-scoring1": "Météoroïdes et en contact du tapis et dans la section Centre:",
        "M14-scoring2": "Météoroïdes et en contact du tapis et dans la section Latérale:",
        "M14-error": "Combinaison impossible. Il n'y a que deux météoroïdes",
        "M15-name": "M15 L’ATTERRISSEUR",
        "M15-desc": "Gposez l’atterrisseur intact à l’une de ses cibles ou, le cas échéant, à la base.",
        "M15-scoring1": "L’atterrisseur est intact et en contact du tapis",
        "M15-scoring2": "L’atterrisseur est complètement dans:",
        "M15-scoring3": "Aucun",
        "M15-scoring4": "Base",
        "M15-scoring5": "Zone nord-est",
        "M15-scoring6": "Sa cible",
        "penalties-name": "PÉNALITÉS D’INTERRUPTION",
        "penalties-desc": "Vous êtes autorisé à récupérer votre robot à la main, mais cela entraîne cette pénalité.",
        "penalties-scoring": "Nombre de disques de pénalité dans le triangle sud-est:"
    },
    "rtl": false
})`
export default challenge
