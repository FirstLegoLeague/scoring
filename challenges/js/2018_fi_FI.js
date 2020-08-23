const challenge = `({
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 Avaruusmatka",
            "description": "*Kukin l�hetetty kuljetusalus on selv�sti rullaannut alas\r\nramppia pitkin. Kuljetusalusten tulee * kulkea itsen�isesti ylitt�ess��n radan ensimm�ist� jatkosta.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Kuuauto- alus rullasi itsen�isesti 1. jatkoksen yli",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Tarvike-alus rullasi itsen�isesti 1. jatkoksen yli",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "Miehist�-alus rullasi itsen�isesti 1. jatkoksen yli",
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
            "title": "M02 Aurinkopanelien suuntaaminen",
            "description": "Paneelit tulee k��nt�� jommankumman joukkueen suuntaan.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Both Aurinkopanelit on k��nnetty samaan suuntaan",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "Your Aurinkopaneli on k��nnetty toisen joukkueen suuntaan",
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
            "title": "M03 3D Tulostus",
            "description": "2x4 palikka tulee saada ulos * asettamalla maaper�n�yte 3D tulostimeen.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "2x4 palikka on saatu ulos asettamalla maaper�n�yte 3D tulostimeen",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "2x4 palikka on kokonaan koillisen planeetan alueella",
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
            "title": "M04 Kraaterin ylitys",
            "description": "Robotti tai sen l�hett�m� tutkimusalus ylitt�� kraateri-mallin kokonaan kulkemalla suoraan sen yli. Ei l�helt�, ei kiert�en.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Kaikki laitteen kantavat rakenteet kulkivat tornien v�list�",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Ylitys suoritettiin kulkien id�st� l�nteen, kokonaan ohi alas painetun portin",
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
            "title": "M05 Luonnonvarojen hy�dynt�minen",
            "description": "Robotin tulee tyhjent�� n�ytteet koepora-mallista. Pisteit� saa my�s n�ytteiden viemisest� oikeille paikoille, Huom. teht�v� M03.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Yksik��n nelj�st� n�ytteest� ei en�� kosketa koepora-mallin akselia",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "Kaasun�yte koskettaa alustaa ja on kokonaan laskeutujan maalialueen sis�ll� (valk)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-TAI- Kaasun�yte on kokonaan kotipes�ss�",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "Vesin�yte koskettaa vain ruoankasvatuskammiota (sin)",
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
                    return new Error("Kaasun�ytteen paikka")
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
                    return new Error("Kaasun�ytteen paikka")
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
                    return new Error("Kaasun�ytteen paikka")
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
                    return new Error("Kaasun�ytteen paikka")
                }
            }]
        },
        {
            "title": "M06 Avaruusaseman moduulit",
            "description": "Robotin tulee irroittaa ja kytke� moduuleja aseman asuinyksik�n portteihin. Kytketyt modulit eiv�t kosketa mit��n muuta kuin asuinyksikk��.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "Kartiomoduuli on kokonaan kotipes�ss�",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "Lieri�moduuli on kytketty asuinyksik�n l�nnen puoleiseen porttiin",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "Telakointimoduuli on siirretty asuinyksik�n id�n puoleiseen porttiin",
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
            "title": "M07 H�t�tapaus avaruusk�velyll�",
            "description": "Robotin tulee auttaa Gerhard avaruusaseman ilmalukon sis�lle.",
            "objectives": [{
                "id": "M07",
                "title": "Astronautti Gerhard on asuinyksik�n ilmalukon kammiossa:",
                "options": [{
                        "value": "none",
                        "title": "Ei"
                    },
                    {
                        "value": "partially",
                        "title": "Osittain"
                    },
                    {
                        "value": "completely",
                        "title": "Kokonaan"
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
            "title": "M08 Aerobinen harjoitus",
            "description": "Robotin tulee yht� tai molempia kuntoilulaitteen oranssia kahvaa liikuttamalla siirt�� kuntomittarin osoitinta. (Osoitin osittain harmaan tai oranssin rajalla tulkitaan joukkueen eduksi.)",
            "objectives": [{
                "id": "M08",
                "title": "Osoittimen k�rki on siirtynyt (vain laitteen kahvoja k�ytt�m�ll�):",
                "options": [{
                        "value": "none",
                        "title": "Ei tulosta"
                    },
                    {
                        "value": "gray",
                        "title": "Harmaalle"
                    },
                    {
                        "value": "white",
                        "title": "Valkoiselle"
                    },
                    {
                        "value": "orange",
                        "title": "Oranssille"
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
            "title": "M09 Voimaharjoittelu",
            "description": "Robotin tulee nostaa painonnostotanko yl�s.",
            "objectives": [{
                "id": "M09",
                "title": "Tanko on nostettu niin yl�s, ett� hammastangon nelj�n rei�n ryhm�n alinkin reik� on v�hint��n osittain n�kyviss�.",
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
            "title": "M10 Ruoan tuottaminen",
            "description": "Robotti py�r�ytt�� laitteen kasvualustat haluttuun asentoon oranssia ty�nnint� liikuttamalla.",
            "objectives": [{
                "id": "M10",
                "title": "Harmaa punnus on kokonaan alhaalla ja vihre� kasvatusalusta on py�r�ytetty p��limm�iseksi (vain ty�nnint� liikuttamalla.)",
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
            "title": "M11 L�ht�kiihdytys",
            "description": "Robotti saattaa raketin matkaan sellaisella voimalla ettei se putoa takaisin alas.",
            "objectives": [{
                "id": "M11",
                "title": "Avaruusalus on saatu yl�s(vain painamalla/iskem�ll� laukaisulevy�)",
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
            "title": "M12 Satelliitit kiertoradalle",
            "description": "Robotin tulee kuljettaa yksi tai useampia satelliitteja uloimmalle kiertoradalle.",
            "objectives": [{
                "id": "M12",
                "title": "Satelliitteja osin tai kokonaan uloimman kiertoradan alueella:",
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
            "description": "Observatorion k��nt�minen oikeaan suuntaan. (Osoitin osittain harmaan tai oranssin rajalla tulkitaan joukkueen eduksi.)",
            "objectives": [{
                "id": "M13",
                "title": "Osoittimen k�rki osoittaa:",
                "options": [{
                        "value": "none",
                        "title": "Ei tulosta"
                    },
                    {
                        "value": "gray",
                        "title": "Harmaa"
                    },
                    {
                        "value": "white",
                        "title": "Valkoinen"
                    },
                    {
                        "value": "orange",
                        "title": "Oranssi"
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
            "title": "M14 Meteoriitin poikkeuttaminen radaltaan",
            "description": "1-2 meteoriittia l�hetet��n Vapaa-linjan l�nsi-puolelta kulkemaan itsen�isesti meteoriitti-pyydykseen.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Meteoriitteja koskettaa alustaa pyydyksen keski-lokerossa:",
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
                    "title": "Meteoriitteja koskettaa alustaa pyydyksen sivu-lokeroissa:",
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
                    return new Error("Mahdoton tulos. Liian monta Meteoriittia")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Mahdoton tulos. Liian monta Meteoriittia")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Mahdoton tulos. Liian monta Meteoriittia")
                }
            }]
        },
        {
            "title": "M15 Turvallinen laskeutuminen",
            "description": "Laskeutuja tulee avustaa maalialueelleen, tai tuoda turvallisesti kotipes��n.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "Laskeutuja on ehj� ja koskettaa alustaa",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "Laskeutuja on kokonaan (sis�ll�):",
                    "options": [{
                            "value": "no",
                            "title": "Ei tulosta"
                        },
                        {
                            "value": "base",
                            "title": "Kotipes�ss�"
                        },
                        {
                            "value": "planet",
                            "title": "Koillisen planeetan alueella"
                        },
                        {
                            "value": "circle",
                            "title": "Maalialueellaan"
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
            "title": "Rangaistukset",
            "description": "Teill� on lupa pelastaa robotti, mutta siit� seuraa rangaistus",
            "objectives": [{
                "id": "penalties",
                "title": "Rangaistuksia kertyi er�n aikana kpl:",
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
        "yes": "Kyll�",
        "no": "Ei",
        "M01-name": "M01 Avaruusmatka",
        "M01-desc": "*Kukin l�hetetty kuljetusalus on selv�sti rullaannut alas\r\nramppia pitkin. Kuljetusalusten tulee * kulkea itsen�isesti ylitt�ess��n radan ensimm�ist� jatkosta.",
        "M01-scoring1": "Kuuauto- alus rullasi itsen�isesti 1. jatkoksen yli",
        "M01-scoring2": "Tarvike-alus rullasi itsen�isesti 1. jatkoksen yli",
        "M01-scoring3": "Miehist�-alus rullasi itsen�isesti 1. jatkoksen yli",
        "M02-name": "M02 Aurinkopanelien suuntaaminen",
        "M02-desc": "Paneelit tulee k��nt�� jommankumman joukkueen suuntaan.",
        "M02-scoring1": "Both Aurinkopanelit on k��nnetty samaan suuntaan",
        "M02-scoring2": "Your Aurinkopaneli on k��nnetty toisen joukkueen suuntaan",
        "M03-name": "M03 3D Tulostus",
        "M03-desc": "2x4 palikka tulee saada ulos * asettamalla maaper�n�yte 3D tulostimeen.",
        "M03-scoring1": "2x4 palikka on saatu ulos asettamalla maaper�n�yte 3D tulostimeen",
        "M03-scoring2": "2x4 palikka on kokonaan koillisen planeetan alueella",
        "M04-name": "M04 Kraaterin ylitys",
        "M04-desc": "Robotti tai sen l�hett�m� tutkimusalus ylitt�� kraateri-mallin kokonaan kulkemalla suoraan sen yli. Ei l�helt�, ei kiert�en.",
        "M04-scoring1": "Kaikki laitteen kantavat rakenteet kulkivat tornien v�list�",
        "M04-scoring2": "Ylitys suoritettiin kulkien id�st� l�nteen, kokonaan ohi alas painetun portin",
        "M05-name": "M05 Luonnonvarojen hy�dynt�minen",
        "M05-desc": "Robotin tulee tyhjent�� n�ytteet koepora-mallista. Pisteit� saa my�s n�ytteiden viemisest� oikeille paikoille, Huom. teht�v� M03.",
        "M05-scoring1": "Yksik��n nelj�st� n�ytteest� ei en�� kosketa koepora-mallin akselia",
        "M05-scoring2": "Kaasun�yte koskettaa alustaa ja on kokonaan laskeutujan maalialueen sis�ll� (valk)",
        "M05-scoring3": "-TAI- Kaasun�yte on kokonaan kotipes�ss�",
        "M05-scoring4": "Vesin�yte koskettaa vain ruoankasvatuskammiota (sin)",
        "M05-error": "Kaasun�ytteen paikka",
        "M06-name": "M06 Avaruusaseman moduulit",
        "M06-desc": "Robotin tulee irroittaa ja kytke� moduuleja aseman asuinyksik�n portteihin. Kytketyt modulit eiv�t kosketa mit��n muuta kuin asuinyksikk��.",
        "M06-scoring1": "Kartiomoduuli on kokonaan kotipes�ss�",
        "M06-scoring2": "Lieri�moduuli on kytketty asuinyksik�n l�nnen puoleiseen porttiin",
        "M06-scoring3": "Telakointimoduuli on siirretty asuinyksik�n id�n puoleiseen porttiin",
        "M07-name": "M07 H�t�tapaus avaruusk�velyll�",
        "M07-desc": "Robotin tulee auttaa Gerhard avaruusaseman ilmalukon sis�lle.",
        "M07-scoring": "Astronautti Gerhard on asuinyksik�n ilmalukon kammiossa:",
        "M07-scoring1": "Ei",
        "M07-scoring2": "Osittain",
        "M07-scoring3": "Kokonaan",
        "M08-name": "M08 Aerobinen harjoitus",
        "M08-desc": "Robotin tulee yht� tai molempia kuntoilulaitteen oranssia kahvaa liikuttamalla siirt�� kuntomittarin osoitinta. (Osoitin osittain harmaan tai oranssin rajalla tulkitaan joukkueen eduksi.)",
        "M08-scoring": "Osoittimen k�rki on siirtynyt (vain laitteen kahvoja k�ytt�m�ll�):",
        "M08-scoring1": "Ei tulosta",
        "M08-scoring2": "Harmaalle",
        "M08-scoring3": "Valkoiselle",
        "M08-scoring4": "Oranssille",
        "M09-name": "M09 Voimaharjoittelu",
        "M09-desc": "Robotin tulee nostaa painonnostotanko yl�s.",
        "M09-scoring": "Tanko on nostettu niin yl�s, ett� hammastangon nelj�n rei�n ryhm�n alinkin reik� on v�hint��n osittain n�kyviss�.",
        "M10-name": "M10 Ruoan tuottaminen",
        "M10-desc": "Robotti py�r�ytt�� laitteen kasvualustat haluttuun asentoon oranssia ty�nnint� liikuttamalla.",
        "M10-scoring": "Harmaa punnus on kokonaan alhaalla ja vihre� kasvatusalusta on py�r�ytetty p��limm�iseksi (vain ty�nnint� liikuttamalla.)",
        "M11-name": "M11 L�ht�kiihdytys",
        "M11-desc": "Robotti saattaa raketin matkaan sellaisella voimalla ettei se putoa takaisin alas.",
        "M11-scoring": "Avaruusalus on saatu yl�s(vain painamalla/iskem�ll� laukaisulevy�)",
        "M12-name": "M12 Satelliitit kiertoradalle",
        "M12-desc": "Robotin tulee kuljettaa yksi tai useampia satelliitteja uloimmalle kiertoradalle.",
        "M12-scoring": "Satelliitteja osin tai kokonaan uloimman kiertoradan alueella:",
        "M13-name": "M13 Observatorio",
        "M13-desc": "Observatorion k��nt�minen oikeaan suuntaan. (Osoitin osittain harmaan tai oranssin rajalla tulkitaan joukkueen eduksi.)",
        "M13-scoring": "Osoittimen k�rki osoittaa:",
        "M13-scoring1": "Ei tulosta",
        "M13-scoring2": "Harmaa",
        "M13-scoring3": "Valkoinen",
        "M13-scoring4": "Oranssi",
        "M14-name": "M14 Meteoriitin poikkeuttaminen radaltaan",
        "M14-desc": "1-2 meteoriittia l�hetet��n Vapaa-linjan l�nsi-puolelta kulkemaan itsen�isesti meteoriitti-pyydykseen.",
        "M14-scoring1": "Meteoriitteja koskettaa alustaa pyydyksen keski-lokerossa:",
        "M14-scoring2": "Meteoriitteja koskettaa alustaa pyydyksen sivu-lokeroissa:",
        "M14-error": "Mahdoton tulos. Liian monta Meteoriittia",
        "M15-name": "M15 Turvallinen laskeutuminen",
        "M15-desc": "Laskeutuja tulee avustaa maalialueelleen, tai tuoda turvallisesti kotipes��n.",
        "M15-scoring1": "Laskeutuja on ehj� ja koskettaa alustaa",
        "M15-scoring2": "Laskeutuja on kokonaan (sis�ll�):",
        "M15-scoring3": "Ei tulosta",
        "M15-scoring4": "Kotipes�ss�",
        "M15-scoring5": "Koillisen planeetan alueella",
        "M15-scoring6": "Maalialueellaan",
        "penalties-name": "Rangaistukset",
        "penalties-desc": "Teill� on lupa pelastaa robotti, mutta siit� seuraa rangaistus",
        "penalties-scoring": "Rangaistuksia kertyi er�n aikana kpl:"
    },
    "rtl": false
})`
export default challenge
