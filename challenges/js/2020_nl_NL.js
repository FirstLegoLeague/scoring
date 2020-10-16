({
    "title": "RePLAY",
    "missions": [{
            "title": "M00 Inspectiebonus uitrusting",
            "description": "Als al jullie uitrusting volledig in de kleine inspectieruimte past, krijgen jullie een missiepuntenbonus.",
            "objectives": [{
                "id": "bonus",
                "title": "Alle uitrusting van het team past in de kleine inspectieruimte:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(bonus) {
                bonus = String(bonus);
                if (bonus === 'no') {
                    return 0
                }
                if (bonus === 'yes') {
                    return 25
                }
            }]
        },
        {
            "title": "M01 Innovatieproject",
            "description": "Het innovatieproject is gemaakt van ten minste 2 witte LEGO onderdelen en meet minstens 4 LEGO noppen in ten minste 1 richting.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Het innovatieproject is groot genoeg (2+ witte LEGO onderdelen en 4+ LEGO noppen lang):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Een deel van het innovatieproject raakt:",
                    "options": [{
                            "value": "none",
                            "title": "Geen"
                        },
                        {
                            "value": "logo",
                            "title": "RePLAY-logo"
                        },
                        {
                            "value": "gray",
                            "title": "Grijze gebied bank"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                }
            ],
            "score": [function(M01_1, M01_2) {
                M01_1 = String(M01_1);
                M01_2 = String(M01_2);
                if (M01_1 === 'no' && M01_2 === 'none') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === 'logo') {
                    return 0
                }
                if (M01_1 === 'no' && M01_2 === 'gray') {
                    return 0
                }
                if (M01_1 === 'yes' && M01_2 === 'none') {
                    return 0
                }
                if (M01_1 === 'yes' && M01_2 === 'logo') {
                    return 20
                }
                if (M01_1 === 'yes' && M01_2 === 'gray') {
                    return 20
                }
            }]
        },
        {
            "title": "M02 Stappenteller",
            "description": "Hoe verder de robot de stappenteller schuift, hoe beter.",
            "objectives": [{
                "id": "M02_1",
                "title": "De onderkant van de wijzer staat op:",
                "options": [{
                        "value": "none",
                        "title": "Geen"
                    },
                    {
                        "value": "magenta",
                        "title": "Magenta"
                    },
                    {
                        "value": "yellow",
                        "title": "Geel"
                    },
                    {
                        "value": "blue",
                        "title": "Blauw"
                    }
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M02_1) {
                M02_1 = String(M02_1);
                if (M02_1 === 'none') {
                    return 0
                }
                if (M02_1 === 'magenta') {
                    return 10
                }
                if (M02_1 === 'yellow') {
                    return 15
                }
                if (M02_1 === 'blue') {
                    return 20
                }
            }]
        },
        {
            "title": "M03 Glijbaan",
            "description": "De robot schuift de figuren van de glijbaan af en verplaatst ze naar andere gebieden. \"Van de glijbaan af\" scoort als het zwarte kader van een glijbaanfiguur voorbij/onder de punt van het grijze deel van de glijbaan is",
            "objectives": [{
                    "id": "M03_1",
                    "title": "Aantal glijbaanfiguren dat van de glijbaan af is:",
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
                    "id": "M03_2",
                    "title": "Een glijbaanfiguur is volledig in thuis:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_3",
                    "title": "Een glijbaanfiguur wordt volledig van de mat gehouden door de zware band en raakt niets anders aan:",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M03_1, M03_2, M03_3) {
                M03_1 = String(M03_1);
                M03_2 = String(M03_2);
                M03_3 = String(M03_3);
                if (M03_1 === '0' && M03_2 === 'no' && M03_3 === 'no') {
                    return 0
                }
                if (M03_1 === '0' && M03_2 === 'no' && M03_3 === 'yes') {
                    return new Error("Te veel glijbaanfiguren")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'no') {
                    return new Error("Te veel glijbaanfiguren")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'yes') {
                    return new Error("Te veel glijbaanfiguren")
                }
                if (M03_1 === '1' && M03_2 === 'no' && M03_3 === 'no') {
                    return 5
                }
                if (M03_1 === '1' && M03_2 === 'no' && M03_3 === 'yes') {
                    return 25
                }
                if (M03_1 === '1' && M03_2 === 'yes' && M03_3 === 'no') {
                    return 15
                }
                if (M03_1 === '1' && M03_2 === 'yes' && M03_3 === 'yes') {
                    return new Error("Te veel glijbaanfiguren")
                }
                if (M03_1 === '2' && M03_2 === 'no' && M03_3 === 'no') {
                    return 20
                }
                if (M03_1 === '2' && M03_2 === 'no' && M03_3 === 'yes') {
                    return 40
                }
                if (M03_1 === '2' && M03_2 === 'yes' && M03_3 === 'no') {
                    return 30
                }
                if (M03_1 === '2' && M03_2 === 'yes' && M03_3 === 'yes') {
                    return 50
                }
            }]
        },
        {
            "title": "M04 Bank",
            "description": "De robot verwijdert de rugleuning, legt de bank plat en plaatst blokjes in de ruimtes van de hinkelbaan.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "De bank ligt plat:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_3",
                    "title": "De rugleuning is volledig uit beide gaten:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Aantal hinkelbaanruimtes met blokjes erin die de mat raken:",
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
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                }
            ],
            "score": [function(M04_1, M04_2, M04_3) {
                M04_1 = String(M04_1);
                M04_2 = String(M04_2);
                M04_3 = String(M04_3);
                if (M04_1 === 'no' && M04_2 === '0' && M04_3 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === '0' && M04_3 === 'yes') {
                    return 15
                }
                if (M04_1 === 'yes' && M04_2 === '0' && M04_3 === 'no') {
                    return 10
                }
                if (M04_1 === 'yes' && M04_2 === '0' && M04_3 === 'yes') {
                    return 25
                }
                if (M04_1 === 'no' && M04_2 === '1' && M04_3 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === '1' && M04_3 === 'yes') {
                    return 15
                }
                if (M04_1 === 'yes' && M04_2 === '1' && M04_3 === 'no') {
                    return 20
                }
                if (M04_1 === 'yes' && M04_2 === '1' && M04_3 === 'yes') {
                    return 35
                }
                if (M04_1 === 'no' && M04_2 === '2' && M04_3 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === '2' && M04_3 === 'yes') {
                    return 15
                }
                if (M04_1 === 'yes' && M04_2 === '2' && M04_3 === 'no') {
                    return 30
                }
                if (M04_1 === 'yes' && M04_2 === '2' && M04_3 === 'yes') {
                    return 45
                }
                if (M04_1 === 'no' && M04_2 === '3' && M04_3 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === '3' && M04_3 === 'yes') {
                    return 15
                }
                if (M04_1 === 'yes' && M04_2 === '3' && M04_3 === 'no') {
                    return 40
                }
                if (M04_1 === 'yes' && M04_2 === '3' && M04_3 === 'yes') {
                    return 55
                }
                if (M04_1 === 'no' && M04_2 === '4' && M04_3 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === '4' && M04_3 === 'yes') {
                    return 15
                }
                if (M04_1 === 'yes' && M04_2 === '4' && M04_3 === 'no') {
                    return 50
                }
                if (M04_1 === 'yes' && M04_2 === '4' && M04_3 === 'yes') {
                    return 65
                }
            }]
        },
        {
            "title": "M05 Basketbal",
            "description": "De robot brengt de krat op de paal omhoog en plaatst er een blokje in.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Er is een blokje in de krat:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M05_2",
                    "title": "Op welke stop steunt de krat?",
                    "options": [{
                            "value": "none",
                            "title": "Geen"
                        },
                        {
                            "value": "middle",
                            "title": "Middelste"
                        },
                        {
                            "value": "top",
                            "title": "Bovenste"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                }
            ],
            "score": [function(M05_1, M05_2, M08_1, M08_2) {
                M05_1 = String(M05_1);
                M05_2 = String(M05_2);
                if (((M05_1 === 'yes') ? 1 : 0) + ((M08_1 === 'yes') ? 1 : 0) + (M08_2 * 1) > 17) {
                    return new Error('Te veel blokjes')
                }
                if (M05_1 === 'no' && M05_2 === 'none') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'middle') {
                    return 15
                }
                if (M05_1 === 'no' && M05_2 === 'top') {
                    return 25
                }
                if (M05_1 === 'yes' && M05_2 === 'none') {
                    return 15
                }
                if (M05_1 === 'yes' && M05_2 === 'middle') {
                    return 30
                }
                if (M05_1 === 'yes' && M05_2 === 'top') {
                    return 40
                }
            }]
        },
        {
            "title": "M06 Optrekstang",
            "description": "De robot gaat op een willekeurig moment volledig onder de stang door. Afzonderlijk wordt de robot aan het einde van de wedstrijd door de stang van de mat gehouden.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "De robot ging op enig moment volledig door het rechtopstaande frame van de optrekstang:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "De optrekstang houdt de robot aan het einde van de wedstrijd voor 100% van de mat af:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                }
            ],
            "score": [function(M06_1, M06_2, M07_1) {
                M06_1 = String(M06_1);
                M06_2 = String(M06_2);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('Conflict robotlocatie - kan niet omhoog worden gehouden in M06 en dansen in M07')
                }
                if (M06_1 === 'no' && M06_2 === 'no') {
                    return 0
                }
                if (M06_1 === 'yes' && M06_2 === 'no') {
                    return 15
                }
                if (M06_1 === 'no' && M06_2 === 'yes') {
                    return 30
                }
                if (M06_1 === 'yes' && M06_2 === 'yes') {
                    return 45
                }
            }]
        },
        {
            "title": "M07 Robotdans",
            "description": "De robot danst op de dansvloer aan het einde van de wedstrijd. Elke gekke of gedurfde herhalende actie telt als dansen.",
            "objectives": [{
                "id": "M07_1",
                "title": "De controller van de robot danst op het einde van de wedstrijd over de dansvloer:",
                "type": "yesno",
                "default": "no",
                "value": null
            }],
            "score": [function(M07_1, M06_2) {
                M07_1 = String(M07_1);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('Conflict robotlocatie - kan niet omhoog worden gehouden in M06 en dansen in M07')
                }
                if (M07_1 === 'no') {
                    return 0
                }
                if (M07_1 === 'yes') {
                    return 20
                }
            }]
        },
        {
            "title": "M08 Boccia",
            "description": "Robots sturen blokjes van dezelfde kleur naar het tegenoverliggende veld.",
            "objectives": [{
                    "id": "M08_1",
                    "title": "Beide deelmodellen hebben slechts ��n blokje op het tegenoverliggende veld gestuurd en die blokjes hebben dezelfde kleur:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M08_3",
                    "title": "Ten minste 1 geel blokje is volledig in het doel:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_4",
                    "title": "Er is uitrusting in het frame (zelfs gedeeltelijk):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_2",
                    "title": "Aantal blokjes in het frame of doel:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 17,
                    "value": null
                }
            ],
            "score": [function(M08_1, M08_2, M08_3, M08_4, M05_1) {
                M08_1 = String(M08_1);
                M08_2 = String(M08_2);
                M08_3 = String(M08_3);
                M08_4 = String(M08_4);
                if (((M05_1 === 'yes') ? 1 : 0) + ((M08_1 === 'yes') ? 1 : 0) + (M08_2 * 1) > 17) {
                    return new Error('Te veel blokjes')
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 0
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("Conflict  blokjes in doel:")
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 25
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("Conflict  blokjes in doel:")
                }
                if (M08_1 === 'no' && M08_2 === '1' && M08_3 === 'no' && M08_4 === 'no') {
                    return 5
                }
                if (M08_1 === 'no' && M08_2 === '1' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 15
                }
                if (M08_1 === 'yes' && M08_2 === '1' && M08_3 === 'no' && M08_4 === 'no') {
                    return 30
                }
                if (M08_1 === 'yes' && M08_2 === '1' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 40
                }
                if (M08_1 === 'no' && M08_2 === '2' && M08_3 === 'no' && M08_4 === 'no') {
                    return 10
                }
                if (M08_1 === 'no' && M08_2 === '2' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 20
                }
                if (M08_1 === 'yes' && M08_2 === '2' && M08_3 === 'no' && M08_4 === 'no') {
                    return 35
                }
                if (M08_1 === 'yes' && M08_2 === '2' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 45
                }
                if (M08_1 === 'no' && M08_2 === '3' && M08_3 === 'no' && M08_4 === 'no') {
                    return 15
                }
                if (M08_1 === 'no' && M08_2 === '3' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 25
                }
                if (M08_1 === 'yes' && M08_2 === '3' && M08_3 === 'no' && M08_4 === 'no') {
                    return 40
                }
                if (M08_1 === 'yes' && M08_2 === '3' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 50
                }
                if (M08_1 === 'no' && M08_2 === '4' && M08_3 === 'no' && M08_4 === 'no') {
                    return 20
                }
                if (M08_1 === 'no' && M08_2 === '4' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 30
                }
                if (M08_1 === 'yes' && M08_2 === '4' && M08_3 === 'no' && M08_4 === 'no') {
                    return 45
                }
                if (M08_1 === 'yes' && M08_2 === '4' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 55
                }
                if (M08_1 === 'no' && M08_2 === '5' && M08_3 === 'no' && M08_4 === 'no') {
                    return 25
                }
                if (M08_1 === 'no' && M08_2 === '5' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 35
                }
                if (M08_1 === 'yes' && M08_2 === '5' && M08_3 === 'no' && M08_4 === 'no') {
                    return 50
                }
                if (M08_1 === 'yes' && M08_2 === '5' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 60
                }
                if (M08_1 === 'no' && M08_2 === '6' && M08_3 === 'no' && M08_4 === 'no') {
                    return 30
                }
                if (M08_1 === 'no' && M08_2 === '6' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 40
                }
                if (M08_1 === 'yes' && M08_2 === '6' && M08_3 === 'no' && M08_4 === 'no') {
                    return 55
                }
                if (M08_1 === 'yes' && M08_2 === '6' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 65
                }
                if (M08_1 === 'no' && M08_2 === '7' && M08_3 === 'no' && M08_4 === 'no') {
                    return 35
                }
                if (M08_1 === 'no' && M08_2 === '7' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 45
                }
                if (M08_1 === 'yes' && M08_2 === '7' && M08_3 === 'no' && M08_4 === 'no') {
                    return 60
                }
                if (M08_1 === 'yes' && M08_2 === '7' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 70
                }
                if (M08_1 === 'no' && M08_2 === '8' && M08_3 === 'no' && M08_4 === 'no') {
                    return 40
                }
                if (M08_1 === 'no' && M08_2 === '8' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 50
                }
                if (M08_1 === 'yes' && M08_2 === '8' && M08_3 === 'no' && M08_4 === 'no') {
                    return 65
                }
                if (M08_1 === 'yes' && M08_2 === '8' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 75
                }
                if (M08_1 === 'no' && M08_2 === '9' && M08_3 === 'no' && M08_4 === 'no') {
                    return 45
                }
                if (M08_1 === 'no' && M08_2 === '9' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 55
                }
                if (M08_1 === 'yes' && M08_2 === '9' && M08_3 === 'no' && M08_4 === 'no') {
                    return 70
                }
                if (M08_1 === 'yes' && M08_2 === '9' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 80
                }
                if (M08_1 === 'no' && M08_2 === '10' && M08_3 === 'no' && M08_4 === 'no') {
                    return 50
                }
                if (M08_1 === 'no' && M08_2 === '10' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 60
                }
                if (M08_1 === 'yes' && M08_2 === '10' && M08_3 === 'no' && M08_4 === 'no') {
                    return 75
                }
                if (M08_1 === 'yes' && M08_2 === '10' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 85
                }
                if (M08_1 === 'no' && M08_2 === '11' && M08_3 === 'no' && M08_4 === 'no') {
                    return 55
                }
                if (M08_1 === 'no' && M08_2 === '11' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 65
                }
                if (M08_1 === 'yes' && M08_2 === '11' && M08_3 === 'no' && M08_4 === 'no') {
                    return 80
                }
                if (M08_1 === 'yes' && M08_2 === '11' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 90
                }
                if (M08_1 === 'no' && M08_2 === '12' && M08_3 === 'no' && M08_4 === 'no') {
                    return 60
                }
                if (M08_1 === 'no' && M08_2 === '12' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 70
                }
                if (M08_1 === 'yes' && M08_2 === '12' && M08_3 === 'no' && M08_4 === 'no') {
                    return 85
                }
                if (M08_1 === 'yes' && M08_2 === '12' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 95
                }
                if (M08_1 === 'no' && M08_2 === '13' && M08_3 === 'no' && M08_4 === 'no') {
                    return 65
                }
                if (M08_1 === 'no' && M08_2 === '13' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 75
                }
                if (M08_1 === 'yes' && M08_2 === '13' && M08_3 === 'no' && M08_4 === 'no') {
                    return 90
                }
                if (M08_1 === 'yes' && M08_2 === '13' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 100
                }
                if (M08_1 === 'no' && M08_2 === '14' && M08_3 === 'no' && M08_4 === 'no') {
                    return 70
                }
                if (M08_1 === 'no' && M08_2 === '14' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 80
                }
                if (M08_1 === 'yes' && M08_2 === '14' && M08_3 === 'no' && M08_4 === 'no') {
                    return 95
                }
                if (M08_1 === 'yes' && M08_2 === '14' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 105
                }
                if (M08_1 === 'no' && M08_2 === '15' && M08_3 === 'no' && M08_4 === 'no') {
                    return 75
                }
                if (M08_1 === 'no' && M08_2 === '15' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 85
                }
                if (M08_1 === 'yes' && M08_2 === '15' && M08_3 === 'no' && M08_4 === 'no') {
                    return 100
                }
                if (M08_1 === 'yes' && M08_2 === '15' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 110
                }
                if (M08_1 === 'no' && M08_2 === '16' && M08_3 === 'no' && M08_4 === 'no') {
                    return 80
                }
                if (M08_1 === 'no' && M08_2 === '16' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 90
                }
                if (M08_1 === 'yes' && M08_2 === '16' && M08_3 === 'no' && M08_4 === 'no') {
                    return 105
                }
                if (M08_1 === 'yes' && M08_2 === '16' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 115
                }
                if (M08_1 === 'no' && M08_2 === '17' && M08_3 === 'no' && M08_4 === 'no') {
                    return 85
                }
                if (M08_1 === 'no' && M08_2 === '17' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 95
                }
                if (M08_1 === 'yes' && M08_2 === '17' && M08_3 === 'no' && M08_4 === 'no') {
                    return 110
                }
                if (M08_1 === 'yes' && M08_2 === '17' && M08_3 === 'yes' && M08_4 === 'no') {
                    return 120
                }
                if (M08_1 === '*any*' && M08_2 === '*any*' && M08_3 === '*any*' && M08_4 === 'yes') {
                    return 0
                }
            }]
        },
        {
            "title": "M09 Banden omdraaien",
            "description": "De robot draait banden om, zodat de witte velgen naar boven zijn gericht en verplaatst ze naar de grote doelcirkel.",
            "objectives": [{
                    "id": "M09_1",
                    "title": "Banden met de witte kant naar boven en rustend op de mat:",
                    "options": [{
                            "value": "none",
                            "title": "Geen"
                        },
                        {
                            "value": "light",
                            "title": "Blauw"
                        },
                        {
                            "value": "heavy",
                            "title": "Zwart"
                        },
                        {
                            "value": "both",
                            "title": "Beide"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_2",
                    "title": "Banden volledig in de grote cirkel:",
                    "options": [{
                            "value": "none",
                            "title": "Geen"
                        },
                        {
                            "value": "light",
                            "title": "Blauw"
                        },
                        {
                            "value": "heavy",
                            "title": "Zwart"
                        },
                        {
                            "value": "both",
                            "title": "Beide"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_3",
                    "title": "De zware (zwarte) band heeft de markeringslijn (zelfs gedeeltelijk) op enig moment overschreden:",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M09_1, M09_2, M09_3) {
                M09_1 = String(M09_1);
                M09_2 = String(M09_2);
                M09_3 = String(M09_3);
                if (M09_1 === 'none' && M09_2 === 'none' && M09_3 === 'no') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'none' && M09_3 === 'no') {
                    return 10
                }
                if (M09_1 === 'heavy' && M09_2 === 'none' && M09_3 === 'no') {
                    return 15
                }
                if (M09_1 === 'both' && M09_2 === 'none' && M09_3 === 'no') {
                    return 25
                }
                if (M09_1 === 'none' && M09_2 === 'light' && M09_3 === 'no') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'light' && M09_3 === 'no') {
                    return 15
                }
                if (M09_1 === 'heavy' && M09_2 === 'light' && M09_3 === 'no') {
                    return 15
                }
                if (M09_1 === 'both' && M09_2 === 'light' && M09_3 === 'no') {
                    return 30
                }
                if (M09_1 === 'none' && M09_2 === 'heavy' && M09_3 === 'no') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'heavy' && M09_3 === 'no') {
                    return 10
                }
                if (M09_1 === 'heavy' && M09_2 === 'heavy' && M09_3 === 'no') {
                    return 20
                }
                if (M09_1 === 'both' && M09_2 === 'heavy' && M09_3 === 'no') {
                    return 30
                }
                if (M09_1 === 'none' && M09_2 === 'both' && M09_3 === 'no') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'both' && M09_3 === 'no') {
                    return 15
                }
                if (M09_1 === 'heavy' && M09_2 === 'both' && M09_3 === 'no') {
                    return 20
                }
                if (M09_1 === 'both' && M09_2 === 'both' && M09_3 === 'no') {
                    return 35
                }
                if (M09_1 === 'none' && M09_2 === 'none' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'none' && M09_3 === 'yes') {
                    return 10
                }
                if (M09_1 === 'heavy' && M09_2 === 'none' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'both' && M09_2 === 'none' && M09_3 === 'yes') {
                    return 10
                }
                if (M09_1 === 'none' && M09_2 === 'light' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'light' && M09_3 === 'yes') {
                    return 15
                }
                if (M09_1 === 'heavy' && M09_2 === 'light' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'both' && M09_2 === 'light' && M09_3 === 'yes') {
                    return 15
                }
                if (M09_1 === 'none' && M09_2 === 'heavy' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'heavy' && M09_3 === 'yes') {
                    return 10
                }
                if (M09_1 === 'heavy' && M09_2 === 'heavy' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'both' && M09_2 === 'heavy' && M09_3 === 'yes') {
                    return 10
                }
                if (M09_1 === 'none' && M09_2 === 'both' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'light' && M09_2 === 'both' && M09_3 === 'yes') {
                    return 15
                }
                if (M09_1 === 'heavy' && M09_2 === 'both' && M09_3 === 'yes') {
                    return 0
                }
                if (M09_1 === 'both' && M09_2 === 'both' && M09_3 === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M10 Mobieltje",
            "description": "De robot draait het mobieltje om met de witte kant naar boven.",
            "objectives": [{
                "id": "M10",
                "title": "Het mobieltje ligt met de witte kant naar boven en rust alleen op de mat:",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M10) {
                M10 = String(M10);
                if (M10 === 'no') {
                    return 0
                }
                if (M10 === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M11 Loopband",
            "description": "De robot draait de rollen, zodat de wijzer zover mogelijk met de klok mee beweegt. Als de robot de wijzer beweegt door de wijzer aan te raken, is de score nul.",
            "objectives": [{
                "id": "M11_1",
                "title": "De robot heeft de rollen gedraaid zodat de wijzer wijst naar:",
                "options": [{
                        "value": "none",
                        "title": "Geen"
                    },
                    {
                        "value": "gray",
                        "title": "Grijs"
                    },
                    {
                        "value": "red",
                        "title": "Rood"
                    },
                    {
                        "value": "orange",
                        "title": "Oranje"
                    },
                    {
                        "value": "yellow",
                        "title": "Geel"
                    },
                    {
                        "value": "ltGreen",
                        "title": "Lichtgroen"
                    },
                    {
                        "value": "dkGreen",
                        "title": "Donkergroen"
                    }
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M11_1) {
                M11_1 = String(M11_1);
                if (M11_1 === 'none') {
                    return 0
                }
                if (M11_1 === 'gray') {
                    return 5
                }
                if (M11_1 === 'red') {
                    return 10
                }
                if (M11_1 === 'orange') {
                    return 15
                }
                if (M11_1 === 'yellow') {
                    return 20
                }
                if (M11_1 === 'ltGreen') {
                    return 25
                }
                if (M11_1 === 'dkGreen') {
                    return 30
                }
            }]
        },
        {
            "title": "M12 Roeimachine",
            "description": "De robot verplaatst het losse wiel uit de grote cirkel naar de kleine doelcirkel.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "Het losse wiel is volledig buiten de grote cirkel:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M12_2",
                    "title": "Het losse wiel is volledig in de kleine cirkel:",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M12_1, M12_2) {
                M12_1 = String(M12_1);
                M12_2 = String(M12_2);
                if (M12_1 === 'no' && M12_2 === 'no') {
                    return 0
                }
                if (M12_1 === 'yes' && M12_2 === 'no') {
                    return 15
                }
                if (M12_1 === 'no' && M12_2 === 'yes') {
                    return new Error("Conflict  positie wiel roeimachine")
                }
                if (M12_1 === 'yes' && M12_2 === 'yes') {
                    return 30
                }
            }]
        },
        {
            "title": "M13 Gewichtsapparaat",
            "description": "De robot beweegt de hendel tot de gele stop valt. Het team selecteert de instelling van de hendel voordat de wedstrijd begint. De instelling van de hendel is de kleur onder de oostzijde van de oostelijke groene balk.",
            "objectives": [{
                "id": "M13",
                "title": "De stop is onder de hendel en de instelling van de hendel is:",
                "options": [{
                        "value": "none",
                        "title": "Geen"
                    },
                    {
                        "value": "blue",
                        "title": "Blauw"
                    },
                    {
                        "value": "magenta",
                        "title": "Magenta"
                    },
                    {
                        "value": "yellow",
                        "title": "Geel"
                    }
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M13) {
                M13 = String(M13);
                if (M13 === 'none') {
                    return 0
                }
                if (M13 === 'blue') {
                    return 10
                }
                if (M13 === 'magenta') {
                    return 15
                }
                if (M13 === 'yellow') {
                    return 20
                }
            }]
        },
        {
            "title": "M14 Gezondheidsunits",
            "description": "De robot verzamelt gezondheidsunits uit het veld en verplaatst ze naar de doelgebieden. Maximaal 4 units scoren gelust aan de opstrekstang.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Aantal gezondheidsunits dat het RePLAY-logo of het grijze gebied rond de bank aanraakt:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 16,
                    "value": null
                },
                {
                    "id": "M14_2",
                    "title": "Aantal gezondheidsunits dat aan een paal van de opstrekstang is gelust en geen uitrusting aanraakt (max. 4):",
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
                        }
                    ],
                    "type": "enum",
                    "default": "0",
                    "value": null
                }
            ],
            "score": [function(M14_1, M14_2) {
                M14_1 = String(M14_1);
                M14_2 = String(M14_2);
                if ((M14_1 * 1) + ({
                        "0": 0,
                        "1": 1,
                        "2": 2,
                        "3": 3,
                        "4": 4
                    } [M14_2]) > 8) {
                    return new Error('Te veel gezondheidsunits')
                }
                if (M14_1 === '0' && M14_2 === '0') {
                    return 0
                }
                if (M14_1 === '0' && M14_2 === '1') {
                    return 10
                }
                if (M14_1 === '0' && M14_2 === '2') {
                    return 20
                }
                if (M14_1 === '0' && M14_2 === '3') {
                    return 30
                }
                if (M14_1 === '0' && M14_2 === '4') {
                    return 40
                }
                if (M14_1 === '1' && M14_2 === '0') {
                    return 5
                }
                if (M14_1 === '1' && M14_2 === '1') {
                    return 15
                }
                if (M14_1 === '1' && M14_2 === '2') {
                    return 25
                }
                if (M14_1 === '1' && M14_2 === '3') {
                    return 35
                }
                if (M14_1 === '1' && M14_2 === '4') {
                    return 45
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 10
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return 20
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return 30
                }
                if (M14_1 === '2' && M14_2 === '3') {
                    return 40
                }
                if (M14_1 === '2' && M14_2 === '4') {
                    return 50
                }
                if (M14_1 === '3' && M14_2 === '0') {
                    return 15
                }
                if (M14_1 === '3' && M14_2 === '1') {
                    return 25
                }
                if (M14_1 === '3' && M14_2 === '2') {
                    return 35
                }
                if (M14_1 === '3' && M14_2 === '3') {
                    return 45
                }
                if (M14_1 === '3' && M14_2 === '4') {
                    return 55
                }
                if (M14_1 === '4' && M14_2 === '0') {
                    return 20
                }
                if (M14_1 === '4' && M14_2 === '1') {
                    return 30
                }
                if (M14_1 === '4' && M14_2 === '2') {
                    return 40
                }
                if (M14_1 === '4' && M14_2 === '3') {
                    return 50
                }
                if (M14_1 === '4' && M14_2 === '4') {
                    return 60
                }
                if (M14_1 === '5' && M14_2 === '0') {
                    return 25
                }
                if (M14_1 === '5' && M14_2 === '1') {
                    return 35
                }
                if (M14_1 === '5' && M14_2 === '2') {
                    return 45
                }
                if (M14_1 === '5' && M14_2 === '3') {
                    return 55
                }
                if (M14_1 === '5' && M14_2 === '4') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '6' && M14_2 === '0') {
                    return 30
                }
                if (M14_1 === '6' && M14_2 === '1') {
                    return 40
                }
                if (M14_1 === '6' && M14_2 === '2') {
                    return 50
                }
                if (M14_1 === '6' && M14_2 === '3') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '6' && M14_2 === '4') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '7' && M14_2 === '0') {
                    return 35
                }
                if (M14_1 === '7' && M14_2 === '1') {
                    return 45
                }
                if (M14_1 === '7' && M14_2 === '2') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '7' && M14_2 === '3') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '7' && M14_2 === '4') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '8' && M14_2 === '0') {
                    return 40
                }
                if (M14_1 === '8' && M14_2 === '1') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '8' && M14_2 === '2') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '8' && M14_2 === '3') {
                    return new Error("Te veel gezondheidsunits")
                }
                if (M14_1 === '8' && M14_2 === '4') {
                    return new Error("Te veel gezondheidsunits")
                }
            }]
        },
        {
            "title": "M15 Precisie",
            "description": "Hoe minder jullie de robot buiten thuis onderbreken, hoe meer precisietekens jullie overhouden.",
            "objectives": [{
                "id": "precision",
                "title": "Aantal overgehouden precisietekens op de mat:",
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
        "yes": "Ja",
        "no": "Nee",
        "None": "Geen",
        "Magenta": "Magenta",
        "Yellow": "Geel",
        "Blue": "Blauw",
        "Gray": "Grijs",
        "Red": "Rood",
        "Orange": "Oranje",
        "LtGreen": "Lichtgroen",
        "DkGreen": "Donkergroen",
        "M00-name": "M00 Inspectiebonus uitrusting",
        "M00-desc": "Als al jullie uitrusting volledig in de kleine inspectieruimte past, krijgen jullie een missiepuntenbonus.",
        "M00-scoring1": "Alle uitrusting van het team past in de kleine inspectieruimte:",
        "M01-name": "M01 Innovatieproject",
        "M01-desc": "Het innovatieproject is gemaakt van ten minste 2 witte LEGO onderdelen en meet minstens 4 LEGO noppen in ten minste 1 richting.",
        "M01-scoring1": "Het innovatieproject is groot genoeg (2+ witte LEGO onderdelen en 4+ LEGO noppen lang):",
        "M01-scoring2": "Een deel van het innovatieproject raakt:",
        "M01-logo": "RePLAY-logo",
        "M01-gray": "Grijze gebied bank",
        "M02-name": "M02 Stappenteller",
        "M02-desc": "Hoe verder de robot de stappenteller schuift, hoe beter.",
        "M02-scoring1": "De onderkant van de wijzer staat op:",
        "M03-name": "M03 Glijbaan",
        "M03-desc": "De robot schuift de figuren van de glijbaan af en verplaatst ze naar andere gebieden. \"Van de glijbaan af\" scoort als het zwarte kader van een glijbaanfiguur voorbij/onder de punt van het grijze deel van de glijbaan is",
        "M03-scoring1": "Aantal glijbaanfiguren dat van de glijbaan af is:",
        "M03-scoring2": "Een glijbaanfiguur is volledig in thuis:",
        "M03-scoring3": "Een glijbaanfiguur wordt volledig van de mat gehouden door de zware band en raakt niets anders aan:",
        "M03-error": "Te veel glijbaanfiguren",
        "M04-name": "M04 Bank",
        "M04-desc": "De robot verwijdert de rugleuning, legt de bank plat en plaatst blokjes in de ruimtes van de hinkelbaan.",
        "M04-scoring1": "De bank ligt plat:",
        "M04-scoring2": "Aantal hinkelbaanruimtes met blokjes erin die de mat raken:",
        "M04-scoring3": "De rugleuning is volledig uit beide gaten:",
        "M05-name": "M05 Basketbal",
        "M05-desc": "De robot brengt de krat op de paal omhoog en plaatst er een blokje in.",
        "M05-scoring1": "Er is een blokje in de krat:",
        "M05-scoring2": "Op welke stop steunt de krat?",
        "M05-middle": "Middelste",
        "M05-top": "Bovenste",
        "M06-name": "M06 Optrekstang",
        "M06-desc": "De robot gaat op een willekeurig moment volledig onder de stang door. Afzonderlijk wordt de robot aan het einde van de wedstrijd door de stang van de mat gehouden.",
        "M06-scoring1": "De robot ging op enig moment volledig door het rechtopstaande frame van de optrekstang:",
        "M06-scoring2": "De optrekstang houdt de robot aan het einde van de wedstrijd voor 100% van de mat af:",
        "M07-name": "M07 Robotdans",
        "M07-desc": "De robot danst op de dansvloer aan het einde van de wedstrijd. Elke gekke of gedurfde herhalende actie telt als dansen.",
        "M07-scoring1": "De controller van de robot danst op het einde van de wedstrijd over de dansvloer:",
        "M08-name": "M08 Boccia",
        "M08-desc": "Robots sturen blokjes van dezelfde kleur naar het tegenoverliggende veld.",
        "M08-scoring1": "Beide deelmodellen hebben slechts ��n blokje op het tegenoverliggende veld gestuurd en die blokjes hebben dezelfde kleur:",
        "M08-scoring2": "Aantal blokjes in het frame of doel:",
        "M08-scoring3": "Ten minste 1 geel blokje is volledig in het doel:",
        "M08-scoring4": "Er is uitrusting in het frame (zelfs gedeeltelijk):",
        "M08-error": "Conflict  blokjes in doel:",
        "M09-name": "M09 Banden omdraaien",
        "M09-desc": "De robot draait banden om, zodat de witte velgen naar boven zijn gericht en verplaatst ze naar de grote doelcirkel.",
        "M09-scoring1": "Banden met de witte kant naar boven en rustend op de mat:",
        "M09-scoring2": "Banden volledig in de grote cirkel:",
        "M09-scoring3": "De zware (zwarte) band heeft de markeringslijn (zelfs gedeeltelijk) op enig moment overschreden:",
        "M09-light": "Blauw",
        "M09-heavy": "Zwart",
        "M09-both": "Beide",
        "M10-name": "M10 Mobieltje",
        "M10-desc": "De robot draait het mobieltje om met de witte kant naar boven.",
        "M10-scoring1": "Het mobieltje ligt met de witte kant naar boven en rust alleen op de mat:",
        "M11-name": "M11 Loopband",
        "M11-desc": "De robot draait de rollen, zodat de wijzer zover mogelijk met de klok mee beweegt. Als de robot de wijzer beweegt door de wijzer aan te raken, is de score nul.",
        "M11-scoring1": "De robot heeft de rollen gedraaid zodat de wijzer wijst naar:",
        "M12-name": "M12 Roeimachine",
        "M12-desc": "De robot verplaatst het losse wiel uit de grote cirkel naar de kleine doelcirkel.",
        "M12-scoring1": "Het losse wiel is volledig buiten de grote cirkel:",
        "M12-scoring2": "Het losse wiel is volledig in de kleine cirkel:",
        "M12-error": "Conflict  positie wiel roeimachine",
        "M13-name": "M13 Gewichtsapparaat",
        "M13-desc": "De robot beweegt de hendel tot de gele stop valt. Het team selecteert de instelling van de hendel voordat de wedstrijd begint. De instelling van de hendel is de kleur onder de oostzijde van de oostelijke groene balk.",
        "M13-scoring1": "De stop is onder de hendel en de instelling van de hendel is:",
        "M14-name": "M14 Gezondheidsunits",
        "M14-desc": "De robot verzamelt gezondheidsunits uit het veld en verplaatst ze naar de doelgebieden. Maximaal 4 units scoren gelust aan de opstrekstang.",
        "M14-scoring1": "Aantal gezondheidsunits dat het RePLAY-logo of het grijze gebied rond de bank aanraakt:",
        "M14-scoring2": "Aantal gezondheidsunits dat aan een paal van de opstrekstang is gelust en geen uitrusting aanraakt (max. 4):",
        "precision-name": "M15 Precisie",
        "precision-desc": "Hoe minder jullie de robot buiten thuis onderbreken, hoe meer precisietekens jullie overhouden.",
        "precision-scoring": "Aantal overgehouden precisietekens op de mat:",
        "robot-ending-error": "Conflict robotlocatie - kan niet omhoog worden gehouden in M06 en dansen in M07",
        "cube-error": "Te veel blokjes",
        "health-unit-error": "Te veel gezondheidsunits"
    },
    "rtl": false
})
