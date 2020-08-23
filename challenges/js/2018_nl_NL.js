const challenge = `({
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 Ruimtereis",
            "description": "*Start elk transport duidelijk rollend naar beneden van de ruimtereishelling. Bij iedere afdaling, moet de kar *onafhankelijk zijn op het moment dat deze de eerste spoorverbinding bereikt. Voertuigtransport : 22 Voorraadtransport: 14 Bemanningstransport: 10",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Voertuigtransport is voorbij de eerste spoorverbinding gerold",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Voorraadtransport is voorbij de eerste spoorverbinding gerold",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "Bemanningstransport is voorbij de eerste spoorverbinding gerold",
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
            "title": "M02 Zonnepaneel wijzer",
            "description": "Beide zonnepanelen staan richting hetzelfde veld: 22 voor beide teams Jouw zonnepaneel staat gericht naar het veld van het andere team: 18",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Beide zonnepanelen staan richting hetzelfde veld",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "Jouw zonnepaneel staat gericht naar het veld van het andere team",
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
            "title": "M03 3D printen",
            "description": "Technisch gezien: Werp de 2x4 steen uit *door een regoliet kernmonster in de 3D printer te plaatsen. De 2x4 steen is uitgeworpen en volledig in het noordoostelijke planeten gebied: 22 OF de 2x4 steen is uitgeworpen en niet volledig in het noordoostelijke planetengebied: 18",
            "objectives": [{
                    "id": "M03_1",
                    "title": "2x4 steen is uitgeworpen (door een regoliet kernmonster in de 3D printer te plaatsen)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "2x4 steen is volledig in het noordoostelijke planeten gebied",
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
            "title": "M04 Krater-oversteek",
            "description": "Alle gewicht dragende toepassingen van de overstekende uitrusting, moeten *volledig tussen de torens door oversteken. De oversteek moet gebeuren *van oost naar west, en *volledig voorbij de afgevlakte poort komen: 20",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Alle gewicht dragende toepassingen van de overstekende uitrusting zijn volledig tussen de torens overgestoken",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Alle overstekende uitrusting stak over van oost naar west en volledig voorbij de afgevlakte poort",
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
            "title": "M05 Extractie",
            "description": "Verplaats alle vier de kernmonsters zodat ze niet langer de as aanraken die hen vasthoudt in het kerngebied model: 16 Plaats het gas kernmonster zodanig dat het de mat raakt en volledig in de landingsdoelcirkel is: 12 OF plaats het gas kernmonster volledig in de basis: 10 Plaats het water kernmonster zodat het alleen wordt ondersteund door de voedsel groeikamer: 8",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Alle vier de kernmonsters raken de as van het kerngebied model niet meer aan",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "Het gas kernmonster raakt de mat en is volledig in landingsdoelcirkel",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-OF- het gas kernmonster is volledig in de basis",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "het water kernmonster wordt alleen ondersteund door de voedsel groeikamer",
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
                    return new Error("gas kernmonster locatie")
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
                    return new Error("gas kernmonster locatie")
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
                    return new Error("gas kernmonster locatie")
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
                    return new Error("gas kernmonster locatie")
                }
            }]
        },
        {
            "title": "M06 Ruimtestation modules",
            "description": "Geplaatste modules mogen niets aanraken behalve de leefgebied hub. Verplaats de kegelmodule volledig in de basis: 16 Plaats de buismodule in de leefgebied hub poort, westelijke zijde: 16 Verplaats/plaats de dock-module in de leefgebied hub poort, oostelijke zijde: 14",
            "objectives": [{
                    "id": "M06_1",
                    "title": "kegelmodule is volledig in de basis",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "buismodule is in de leefgebied hub poort, westelijke zijde",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "dock-module is in de leefgebied hub poort, oostelijk zijde",
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
            "title": "M07 Ruimtewandeling noodgeval",
            "description": "Verplaats Gerhard zodat zijn lichaam ten minste gedeeltelijk in de luchtsluiskamer van de leefgebied hub is geplaatst. Volledig in: 22 OF gedeeltelijk in: 18",
            "objectives": [{
                "id": "M07",
                "title": "Astronaut “Gerhard” is in de luchtsluiskamer van de leefgebied hub:",
                "options": [{
                        "value": "none",
                        "title": "Niet"
                    },
                    {
                        "value": "partially",
                        "title": "Gedeeltelijk"
                    },
                    {
                        "value": "completely",
                        "title": "Volledig"
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
            "title": "M08 Aerobic oefening",
            "description": "Beweeg de wijzer van het trainingsapparaat langs de wijzerplaat * door één of beide hendel constructies te bewegen. Breng de wijzerpunt volledig in oranje, of laat deze gedeeltelijk een van de grenslijnen bedekken: 22 OF breng de wijzerpunt volledig in wit: 20 OF breng de wijzerpunt volledig in grijs, of laat deze gedeeltelijk een van de grenslijnen bedekken: 18",
            "objectives": [{
                "id": "M08",
                "title": "Wijzer van het trainingsapparaat is in (alleen door een of beide hendel constructies te bewegen):",
                "options": [{
                        "value": "none",
                        "title": "Geen"
                    },
                    {
                        "value": "gray",
                        "title": "Grijs"
                    },
                    {
                        "value": "white",
                        "title": "Wit"
                    },
                    {
                        "value": "orange",
                        "title": "Oranje"
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
            "title": "M09 Krachtoefening",
            "description": "Til de krachtstaaf op zodat het 4e gaatje van de tandstrip ten minste gedeeltelijk zichtbaar wordt zoals afgebeeld: 16",
            "objectives": [{
                "id": "M09",
                "title": "Krachtstaaf is opgetild zodat de tandstrip ten minste gedeeltelijk zichtbaar is",
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
            "title": "M10 Voedselproductie",
            "description": "Draai de kleuren van de voedsel groeikamer zodat het grijze gewicht achter groen is GEVALLEN, maar voorr beige *door de duwstaaf te bewegen: 16.",
            "objectives": [{
                "id": "M10",
                "title": "Grijs gewicht is achter groen gevallen, maar voor beige (alleen door de duwstaaf te bewegen.)",
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
            "title": "M11 Ontsnappingssnelheid",
            "description": "Zorg dat het ruimtevaartuig zo snel en hoog gaat dat het omhoog blijft, *door te drukken/slaan op het stootkussen: 24",
            "objectives": [{
                "id": "M11",
                "title": "Ruimtevaartuig blijft omhoog (alleen door te drukken/slaan op het stootkussen)",
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
            "title": "M12 Satellietbanen",
            "description": "De robot moet één of meer satellieten verplaatsen naar de buitenste satellietbaan.",
            "objectives": [{
                "id": "M12",
                "title": "Satellieten op of boven het gebied tussen de twee lijnen van de buitenste baan:",
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
            "title": "M13 Observatorium",
            "description": "Draai de sterrenwacht naar een exacte richting.)",
            "objectives": [{
                "id": "M13",
                "title": "De wijzerpunt is in:",
                "options": [{
                        "value": "none",
                        "title": "Geen"
                    },
                    {
                        "value": "gray",
                        "title": "Grijs"
                    },
                    {
                        "value": "white",
                        "title": "Wit"
                    },
                    {
                        "value": "orange",
                        "title": "Oranje"
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
            "title": "M14 Meteorietafbuiging",
            "description": "Stuur vanuit het westen van de vrije lijn een of beide meteorieten naar de meteorietvanger.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Meteorieten raken de mat en in het middelste gedeelte:",
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
                    "title": "Meteorieten raken de mat en in een van beide zijdelen:",
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
                    return new Error("Combinatie onmogelijk: te veel meteorieten")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Combinatie onmogelijk: te veel meteorieten")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Combinatie onmogelijk: te veel meteorieten")
                }
            }]
        },
        {
            "title": "M15 Landingsmodule",
            "description": "Breng de landingsmodule intact naar een van zijn doelen, of breng hem tenminste naar de basis.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "Landingsmodule is intact en raakt de mat",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "Landingsmodule is volledig in:",
                    "options": [{
                            "value": "no",
                            "title": "Nergens"
                        },
                        {
                            "value": "base",
                            "title": "Basis"
                        },
                        {
                            "value": "planet",
                            "title": "Noordoostelijk planetengebied"
                        },
                        {
                            "value": "circle",
                            "title": "Landingsdoelcirkel"
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
            "title": "Strafpunten",
            "description": "FIRST LEGO League missie-eisen moeten worden bereikt door jullie robot via zijn programma’s en het gebruik van uitrusting. Jullie mogen jullie robot met de hand redden, maar dat levert een penalty op. Zorg ervoor dat je extra aandacht besteedt aan de regels daar waar gesproken wordt over “onderbrekingen”.",
            "objectives": [{
                "id": "penalties",
                "title": "Aantal strafpuntschijven in de zuidoostelijke driehoek:",
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
        "yes": "Ja",
        "no": "Nee",
        "M01-name": "M01 Ruimtereis",
        "M01-desc": "*Start elk transport duidelijk rollend naar beneden van de ruimtereishelling. Bij iedere afdaling, moet de kar *onafhankelijk zijn op het moment dat deze de eerste spoorverbinding bereikt. Voertuigtransport : 22 Voorraadtransport: 14 Bemanningstransport: 10",
        "M01-scoring1": "Voertuigtransport is voorbij de eerste spoorverbinding gerold",
        "M01-scoring2": "Voorraadtransport is voorbij de eerste spoorverbinding gerold",
        "M01-scoring3": "Bemanningstransport is voorbij de eerste spoorverbinding gerold",
        "M02-name": "M02 Zonnepaneel wijzer",
        "M02-desc": "Beide zonnepanelen staan richting hetzelfde veld: 22 voor beide teams Jouw zonnepaneel staat gericht naar het veld van het andere team: 18",
        "M02-scoring1": "Beide zonnepanelen staan richting hetzelfde veld",
        "M02-scoring2": "Jouw zonnepaneel staat gericht naar het veld van het andere team",
        "M03-name": "M03 3D printen",
        "M03-desc": "Technisch gezien: Werp de 2x4 steen uit *door een regoliet kernmonster in de 3D printer te plaatsen. De 2x4 steen is uitgeworpen en volledig in het noordoostelijke planeten gebied: 22 OF de 2x4 steen is uitgeworpen en niet volledig in het noordoostelijke planetengebied: 18",
        "M03-scoring1": "2x4 steen is uitgeworpen (door een regoliet kernmonster in de 3D printer te plaatsen)",
        "M03-scoring2": "2x4 steen is volledig in het noordoostelijke planeten gebied",
        "M04-name": "M04 Krater-oversteek",
        "M04-desc": "Alle gewicht dragende toepassingen van de overstekende uitrusting, moeten *volledig tussen de torens door oversteken. De oversteek moet gebeuren *van oost naar west, en *volledig voorbij de afgevlakte poort komen: 20",
        "M04-scoring1": "Alle gewicht dragende toepassingen van de overstekende uitrusting zijn volledig tussen de torens overgestoken",
        "M04-scoring2": "Alle overstekende uitrusting stak over van oost naar west en volledig voorbij de afgevlakte poort",
        "M05-name": "M05 Extractie",
        "M05-desc": "Verplaats alle vier de kernmonsters zodat ze niet langer de as aanraken die hen vasthoudt in het kerngebied model: 16 Plaats het gas kernmonster zodanig dat het de mat raakt en volledig in de landingsdoelcirkel is: 12 OF plaats het gas kernmonster volledig in de basis: 10 Plaats het water kernmonster zodat het alleen wordt ondersteund door de voedsel groeikamer: 8",
        "M05-scoring1": "Alle vier de kernmonsters raken de as van het kerngebied model niet meer aan",
        "M05-scoring2": "Het gas kernmonster raakt de mat en is volledig in landingsdoelcirkel",
        "M05-scoring3": "-OF- het gas kernmonster is volledig in de basis",
        "M05-scoring4": "het water kernmonster wordt alleen ondersteund door de voedsel groeikamer",
        "M05-error": "gas kernmonster locatie",
        "M06-name": "M06 Ruimtestation modules",
        "M06-desc": "Geplaatste modules mogen niets aanraken behalve de leefgebied hub. Verplaats de kegelmodule volledig in de basis: 16 Plaats de buismodule in de leefgebied hub poort, westelijke zijde: 16 Verplaats/plaats de dock-module in de leefgebied hub poort, oostelijke zijde: 14",
        "M06-scoring1": "kegelmodule is volledig in de basis",
        "M06-scoring2": "buismodule is in de leefgebied hub poort, westelijke zijde",
        "M06-scoring3": "dock-module is in de leefgebied hub poort, oostelijk zijde",
        "M07-name": "M07 Ruimtewandeling noodgeval",
        "M07-desc": "Verplaats Gerhard zodat zijn lichaam ten minste gedeeltelijk in de luchtsluiskamer van de leefgebied hub is geplaatst. Volledig in: 22 OF gedeeltelijk in: 18",
        "M07-scoring": "Astronaut “Gerhard” is in de luchtsluiskamer van de leefgebied hub:",
        "M07-scoring1": "Niet",
        "M07-scoring2": "Gedeeltelijk",
        "M07-scoring3": "Volledig",
        "M08-name": "M08 Aerobic oefening",
        "M08-desc": "Beweeg de wijzer van het trainingsapparaat langs de wijzerplaat * door één of beide hendel constructies te bewegen. Breng de wijzerpunt volledig in oranje, of laat deze gedeeltelijk een van de grenslijnen bedekken: 22 OF breng de wijzerpunt volledig in wit: 20 OF breng de wijzerpunt volledig in grijs, of laat deze gedeeltelijk een van de grenslijnen bedekken: 18",
        "M08-scoring": "Wijzer van het trainingsapparaat is in (alleen door een of beide hendel constructies te bewegen):",
        "M08-scoring1": "Geen",
        "M08-scoring2": "Grijs",
        "M08-scoring3": "Wit",
        "M08-scoring4": "Oranje",
        "M09-name": "M09 Krachtoefening",
        "M09-desc": "Til de krachtstaaf op zodat het 4e gaatje van de tandstrip ten minste gedeeltelijk zichtbaar wordt zoals afgebeeld: 16",
        "M09-scoring": "Krachtstaaf is opgetild zodat de tandstrip ten minste gedeeltelijk zichtbaar is",
        "M10-name": "M10 Voedselproductie",
        "M10-desc": "Draai de kleuren van de voedsel groeikamer zodat het grijze gewicht achter groen is GEVALLEN, maar voorr beige *door de duwstaaf te bewegen: 16.",
        "M10-scoring": "Grijs gewicht is achter groen gevallen, maar voor beige (alleen door de duwstaaf te bewegen.)",
        "M11-name": "M11 Ontsnappingssnelheid",
        "M11-desc": "Zorg dat het ruimtevaartuig zo snel en hoog gaat dat het omhoog blijft, *door te drukken/slaan op het stootkussen: 24",
        "M11-scoring": "Ruimtevaartuig blijft omhoog (alleen door te drukken/slaan op het stootkussen)",
        "M12-name": "M12 Satellietbanen",
        "M12-desc": "De robot moet één of meer satellieten verplaatsen naar de buitenste satellietbaan.",
        "M12-scoring": "Satellieten op of boven het gebied tussen de twee lijnen van de buitenste baan:",
        "M13-name": "M13 Observatorium",
        "M13-desc": "Draai de sterrenwacht naar een exacte richting.)",
        "M13-scoring": "De wijzerpunt is in:",
        "M13-scoring1": "Geen",
        "M13-scoring2": "Grijs",
        "M13-scoring3": "Wit",
        "M13-scoring4": "Oranje",
        "M14-name": "M14 Meteorietafbuiging",
        "M14-desc": "Stuur vanuit het westen van de vrije lijn een of beide meteorieten naar de meteorietvanger.",
        "M14-scoring1": "Meteorieten raken de mat en in het middelste gedeelte:",
        "M14-scoring2": "Meteorieten raken de mat en in een van beide zijdelen:",
        "M14-error": "Combinatie onmogelijk: te veel meteorieten",
        "M15-name": "M15 Landingsmodule",
        "M15-desc": "Breng de landingsmodule intact naar een van zijn doelen, of breng hem tenminste naar de basis.",
        "M15-scoring1": "Landingsmodule is intact en raakt de mat",
        "M15-scoring2": "Landingsmodule is volledig in:",
        "M15-scoring3": "Nergens",
        "M15-scoring4": "Basis",
        "M15-scoring5": "Noordoostelijk planetengebied",
        "M15-scoring6": "Landingsdoelcirkel",
        "penalties-name": "Strafpunten",
        "penalties-desc": "FIRST LEGO League missie-eisen moeten worden bereikt door jullie robot via zijn programma’s en het gebruik van uitrusting. Jullie mogen jullie robot met de hand redden, maar dat levert een penalty op. Zorg ervoor dat je extra aandacht besteedt aan de regels daar waar gesproken wordt over “onderbrekingen”.",
        "penalties-scoring": "Aantal strafpuntschijven in de zuidoostelijke driehoek:"
    },
    "rtl": false
})`
export default challenge
