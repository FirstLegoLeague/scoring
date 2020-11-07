({
    "title": "RePLAY",
    "missions": [{
            "title": "G00 Ekipman Denetleme Bonusu",
            "description": "If all your equipment fits completely in the small inspection space when you get to the match, you get a mission point bonus.",
            "objectives": [{
                "id": "bonus",
                "title": "Tüm ekipmanlar küçük denetleme alanına sığıyor:",
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
            "title": "G01 Yenilikçi Proje",
            "description": "The innovation project is made of at least two white LEGO pieces and measures at least as long as 4 LEGO studs in at least one direction.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Yenilikçi Proje yeterince büyük (2+ beyaz LEGO parçası ve 4+ LEGO  bağlantı noktası uzunluğunda):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Yenilikçi Projenin bir kısmının temas ettiği bölge:",
                    "options": [{
                            "value": "none",
                            "title": "Hiçbiri"
                        },
                        {
                            "value": "logo",
                            "title": "RePLAY Logo"
                        },
                        {
                            "value": "gray",
                            "title": "Bankın Gri Alanı"
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
            "title": "G02 Adım Sayar",
            "description": "The farther the robot slides the step counter, the better.",
            "objectives": [{
                "id": "M02_1",
                "title": "Göstergenin alt kısmının gösterdiği renk::",
                "options": [{
                        "value": "none",
                        "title": "Hiçbiri"
                    },
                    {
                        "value": "magenta",
                        "title": "Pembe"
                    },
                    {
                        "value": "yellow",
                        "title": "Sarı"
                    },
                    {
                        "value": "blue",
                        "title": "Mavi"
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
            "title": "G03 Kaydırak",
            "description": "The robot slides the figures down the slide and moves them to other areas. \"Off the slide\" scores if the slide figures\"'\"s black frame is past/below the tip of the slide\"'\"s gray part.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "Kaydıraktan inmiş olan kaydırak figürü sayısı:",
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
                    "title": "Bir kaydırak figürü tamamen ev içinde:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_3",
                    "title": "Bir kaydırak figürü ağır tekerleğin üstünde ve bu kaydırak figürü mata ve başka hiçbir şeye temas etmiyor:",
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
                    return new Error("Kaydırak figürü sayısı fazla")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'no') {
                    return new Error("Kaydırak figürü sayısı fazla")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'yes') {
                    return new Error("Kaydırak figürü sayısı fazla")
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
                    return new Error("Kaydırak figürü sayısı fazla")
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
            "title": "G04 Bank",
            "description": "The robot removes the backrest, flattens the bench, and gets cubs into the hopscotch spaces.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Bank tamamen inmiş ve düz:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_3",
                    "title": "Sırtlık iki deliğinden de tamamen ayrılmış:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "İçinde mata temas eden küpler olan seksek kareleri sayısı:",
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
            "title": "G05 Basketbol",
            "description": "The robot raises the crate up the post and gets a cube into it.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Kasanın içinde küp var:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M05_2",
                    "title": "Kasa hangi beyaz durdurucunun üzerinde duruyor:",
                    "options": [{
                            "value": "none",
                            "title": "Hiçbiri"
                        },
                        {
                            "value": "middle",
                            "title": "Orta"
                        },
                        {
                            "value": "top",
                            "title": "Üst"
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
                    return new Error('Küp sayısı fazla')
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
            "title": "G06 Barfiks Aleti",
            "description": "The robot passes completely under the bar at any time. Separately, the robot is held off the mat by the bar at the end of the match.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "Robot, maçın herhangi bir anında barfiks aletinin içinden tamamen geçti:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "Maç sonunda, barfiks aleti robotun %100’ünü taşıyor ve robot mata temas etmiyor:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                }
            ],
            "score": [function(M06_1, M06_2, M07_1) {
                M06_1 = String(M06_1);
                M06_2 = String(M06_2);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('Robot konumu uyuşmuyor - aynı anda G06\'da asılı kalamaz ve G07\'de dans edemez')
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
            "title": "G07 Robot Dansı",
            "description": "The robot is dancing on the dance floor at the end of the match. Any silly or skilled repetitive action counts as dancing.",
            "objectives": [{
                "id": "M07_1",
                "title": "Maç sonunda, robotun mikrodenetleyicisi dans pisti üzerinde dans ediyor:",
                "type": "yesno",
                "default": "no",
                "value": null
            }],
            "score": [function(M07_1, M06_2) {
                M07_1 = String(M07_1);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('Robot konumu uyuşmuyor - aynı anda G06\'da asılı kalamaz ve G07\'de dans edemez')
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
            "title": "G08 Boccia",
            "description": "Robots send matching colored cubes onto the opposite field.",
            "objectives": [{
                    "id": "M08_1",
                    "title": "Her iki paylaşım modeli de karşı masanın herhangi bir yerine sadece bir küp göndermiş ve bu küplerin renkleri eşleşiyor:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M08_3",
                    "title": "En az bir sarı küp hedef alanının tamamen içinde:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_4",
                    "title": "Herhangi bir ekipman (kısmen dahi olsa) çerçevenin içinde:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_2",
                    "title": "Hedef alanı veya çerçeve içinde bulunan küp sayısı:",
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
                    return new Error('Küp sayısı fazla')
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 0
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("Hedef alanındaki küpler uyuşmuyor:")
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 25
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("Hedef alanındaki küpler uyuşmuyor:")
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
            "title": "G09 Tekerlek Çevirme",
            "description": "The roobt flips tires so their white centers face up and moves them into their large target circle.",
            "objectives": [{
                    "id": "M09_1",
                    "title": "Beyaz yüzü yukarı bakan ve matın üzerinde duran tekerlekler:",
                    "options": [{
                            "value": "none",
                            "title": "Hiçbiri"
                        },
                        {
                            "value": "light",
                            "title": "Mavi"
                        },
                        {
                            "value": "heavy",
                            "title": "Siyah"
                        },
                        {
                            "value": "both",
                            "title": "Her İkisi"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_2",
                    "title": "Büyük hedef dairesinin tamamen içinde bulunan tekerlekler:",
                    "options": [{
                            "value": "none",
                            "title": "Hiçbiri"
                        },
                        {
                            "value": "light",
                            "title": "Mavi"
                        },
                        {
                            "value": "heavy",
                            "title": "Siyah"
                        },
                        {
                            "value": "both",
                            "title": "Her İkisi"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_3",
                    "title": "Ağır (siyah lastikli) tekerlek herhangi bir zamanda çevirme çizgisini (kısmen dahi olsa) geçti:",
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
            "title": "G10 Cep Telefonu",
            "description": "The robot flips the cell phone white side up.",
            "objectives": [{
                "id": "M10",
                "title": "Cep telefonunun beyaz yüzü yukarı bakıyor ve sadece matın üstünde duruyor:",
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
            "title": "G11 Koşu Bandı",
            "description": "The robot spins the rollers to move the pointer as far clockwise as possible. If the robot moves the pointer by touching the pointer, the score is zero.",
            "objectives": [{
                "id": "M11_1",
                "title": "Robotun silindirleri döndürmesiyle göstergenin gösterdiği renk:",
                "options": [{
                        "value": "none",
                        "title": "Hiçbiri"
                    },
                    {
                        "value": "gray",
                        "title": "Gri"
                    },
                    {
                        "value": "red",
                        "title": "Kırmızı"
                    },
                    {
                        "value": "orange",
                        "title": "Turuncu"
                    },
                    {
                        "value": "yellow",
                        "title": "Sarı"
                    },
                    {
                        "value": "ltGreen",
                        "title": "Açık Yeşil"
                    },
                    {
                        "value": "dkGreen",
                        "title": "Koyu Yeşil"
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
            "title": "G12 Kürek Çekme Aleti",
            "description": "The robot moves the free wheel out of the large circle and into the small target circle.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "Serbest tekerlek büyük dairenin tamamen dışında:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M12_2",
                    "title": "Serbest tekerlek küçük dairenin tamamen içinde:",
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
                    return new Error("Kürek çekme aleti tekerlek pozisyonu uyuşmuyur")
                }
                if (M12_1 === 'yes' && M12_2 === 'yes') {
                    return 30
                }
            }]
        },
        {
            "title": "G13 Ağırlık Aleti",
            "description": "The robot moves the lever until the yellow stopper falls. The team selects the machine lever setting before the match. The lever setting is the color under the east face of the east green bar.",
            "objectives": [{
                "id": "M13",
                "title": "Durdurucu kaldıracın altında ve kaldıraç ayarı:",
                "options": [{
                        "value": "none",
                        "title": "Hiçbiri"
                    },
                    {
                        "value": "blue",
                        "title": "Mavi"
                    },
                    {
                        "value": "magenta",
                        "title": "Pembe"
                    },
                    {
                        "value": "yellow",
                        "title": "Sarı"
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
            "title": "G14 Sağlık Üniteleri",
            "description": "The robot collects heath units from around the field and moves them to target areas. A maximum of 4 units can score by being on the pull-up bar.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "RePLAY logosuna veya bank etrafındaki gri alana temas eden sağlık ünitesi sayısı:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 16,
                    "value": null
                },
                {
                    "id": "M14_2",
                    "title": "Barfiks aleti direklerinden birine asılmış ve hiçbir ekipmana temas etmeyen sağlık ünitesi sayısı (en fazla dört tane):",
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
                    return new Error('Sağlık üniteleri sayısı fazla')
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
                    return new Error("Sağlık üniteleri sayısı fazla")
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
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '6' && M14_2 === '4') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '7' && M14_2 === '0') {
                    return 35
                }
                if (M14_1 === '7' && M14_2 === '1') {
                    return 45
                }
                if (M14_1 === '7' && M14_2 === '2') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '7' && M14_2 === '3') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '7' && M14_2 === '4') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '8' && M14_2 === '0') {
                    return 40
                }
                if (M14_1 === '8' && M14_2 === '1') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '8' && M14_2 === '2') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '8' && M14_2 === '3') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
                if (M14_1 === '8' && M14_2 === '4') {
                    return new Error("Sağlık üniteleri sayısı fazla")
                }
            }]
        },
        {
            "title": "G15 Hassasiyet",
            "description": "The less often you interrupt the robot outside home, the more points you keep.",
            "objectives": [{
                "id": "precision",
                "title": "Sahada kalan hassasiyet diski sayısı:",
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
        "yes": "Evet",
        "no": "Hayır",
        "None": "Hiçbiri",
        "Magenta": "Pembe",
        "Yellow": "Sarı",
        "Blue": "Mavi",
        "Gray": "Gri",
        "Red": "Kırmızı",
        "Orange": "Turuncu",
        "LtGreen": "Açık Yeşil",
        "DkGreen": "Koyu Yeşil",
        "M00-name": "G00 Ekipman Denetleme Bonusu",
        "M00-desc": "If all your equipment fits completely in the small inspection space when you get to the match, you get a mission point bonus.",
        "M00-scoring1": "Tüm ekipmanlar küçük denetleme alanına sığıyor:",
        "M01-name": "G01 Yenilikçi Proje",
        "M01-desc": "The innovation project is made of at least two white LEGO pieces and measures at least as long as 4 LEGO studs in at least one direction.",
        "M01-scoring1": "Yenilikçi Proje yeterince büyük (2+ beyaz LEGO parçası ve 4+ LEGO  bağlantı noktası uzunluğunda):",
        "M01-scoring2": "Yenilikçi Projenin bir kısmının temas ettiği bölge:",
        "M01-logo": "RePLAY Logo",
        "M01-gray": "Bankın Gri Alanı",
        "M02-name": "G02 Adım Sayar",
        "M02-desc": "The farther the robot slides the step counter, the better.",
        "M02-scoring1": "Göstergenin alt kısmının gösterdiği renk::",
        "M03-name": "G03 Kaydırak",
        "M03-desc": "The robot slides the figures down the slide and moves them to other areas. \"Off the slide\" scores if the slide figures\"'\"s black frame is past/below the tip of the slide\"'\"s gray part.",
        "M03-scoring1": "Kaydıraktan inmiş olan kaydırak figürü sayısı:",
        "M03-scoring2": "Bir kaydırak figürü tamamen ev içinde:",
        "M03-scoring3": "Bir kaydırak figürü ağır tekerleğin üstünde ve bu kaydırak figürü mata ve başka hiçbir şeye temas etmiyor:",
        "M03-error": "Kaydırak figürü sayısı fazla",
        "M04-name": "G04 Bank",
        "M04-desc": "The robot removes the backrest, flattens the bench, and gets cubs into the hopscotch spaces.",
        "M04-scoring1": "Bank tamamen inmiş ve düz:",
        "M04-scoring2": "İçinde mata temas eden küpler olan seksek kareleri sayısı:",
        "M04-scoring3": "Sırtlık iki deliğinden de tamamen ayrılmış:",
        "M05-name": "G05 Basketbol",
        "M05-desc": "The robot raises the crate up the post and gets a cube into it.",
        "M05-scoring1": "Kasanın içinde küp var:",
        "M05-scoring2": "Kasa hangi beyaz durdurucunun üzerinde duruyor:",
        "M05-middle": "Orta",
        "M05-top": "Üst",
        "M06-name": "G06 Barfiks Aleti",
        "M06-desc": "The robot passes completely under the bar at any time. Separately, the robot is held off the mat by the bar at the end of the match.",
        "M06-scoring1": "Robot, maçın herhangi bir anında barfiks aletinin içinden tamamen geçti:",
        "M06-scoring2": "Maç sonunda, barfiks aleti robotun %100’ünü taşıyor ve robot mata temas etmiyor:",
        "M07-name": "G07 Robot Dansı",
        "M07-desc": "The robot is dancing on the dance floor at the end of the match. Any silly or skilled repetitive action counts as dancing.",
        "M07-scoring1": "Maç sonunda, robotun mikrodenetleyicisi dans pisti üzerinde dans ediyor:",
        "M08-name": "G08 Boccia",
        "M08-desc": "Robots send matching colored cubes onto the opposite field.",
        "M08-scoring1": "Her iki paylaşım modeli de karşı masanın herhangi bir yerine sadece bir küp göndermiş ve bu küplerin renkleri eşleşiyor:",
        "M08-scoring2": "Hedef alanı veya çerçeve içinde bulunan küp sayısı:",
        "M08-scoring3": "En az bir sarı küp hedef alanının tamamen içinde:",
        "M08-scoring4": "Herhangi bir ekipman (kısmen dahi olsa) çerçevenin içinde:",
        "M08-error": "Hedef alanındaki küpler uyuşmuyor:",
        "M09-name": "G09 Tekerlek Çevirme",
        "M09-desc": "The roobt flips tires so their white centers face up and moves them into their large target circle.",
        "M09-scoring1": "Beyaz yüzü yukarı bakan ve matın üzerinde duran tekerlekler:",
        "M09-scoring2": "Büyük hedef dairesinin tamamen içinde bulunan tekerlekler:",
        "M09-scoring3": "Ağır (siyah lastikli) tekerlek herhangi bir zamanda çevirme çizgisini (kısmen dahi olsa) geçti:",
        "M09-light": "Mavi",
        "M09-heavy": "Siyah",
        "M09-both": "Her İkisi",
        "M10-name": "G10 Cep Telefonu",
        "M10-desc": "The robot flips the cell phone white side up.",
        "M10-scoring1": "Cep telefonunun beyaz yüzü yukarı bakıyor ve sadece matın üstünde duruyor:",
        "M11-name": "G11 Koşu Bandı",
        "M11-desc": "The robot spins the rollers to move the pointer as far clockwise as possible. If the robot moves the pointer by touching the pointer, the score is zero.",
        "M11-scoring1": "Robotun silindirleri döndürmesiyle göstergenin gösterdiği renk:",
        "M12-name": "G12 Kürek Çekme Aleti",
        "M12-desc": "The robot moves the free wheel out of the large circle and into the small target circle.",
        "M12-scoring1": "Serbest tekerlek büyük dairenin tamamen dışında:",
        "M12-scoring2": "Serbest tekerlek küçük dairenin tamamen içinde:",
        "M12-error": "Kürek çekme aleti tekerlek pozisyonu uyuşmuyur",
        "M13-name": "G13 Ağırlık Aleti",
        "M13-desc": "The robot moves the lever until the yellow stopper falls. The team selects the machine lever setting before the match. The lever setting is the color under the east face of the east green bar.",
        "M13-scoring1": "Durdurucu kaldıracın altında ve kaldıraç ayarı:",
        "M14-name": "G14 Sağlık Üniteleri",
        "M14-desc": "The robot collects heath units from around the field and moves them to target areas. A maximum of 4 units can score by being on the pull-up bar.",
        "M14-scoring1": "RePLAY logosuna veya bank etrafındaki gri alana temas eden sağlık ünitesi sayısı:",
        "M14-scoring2": "Barfiks aleti direklerinden birine asılmış ve hiçbir ekipmana temas etmeyen sağlık ünitesi sayısı (en fazla dört tane):",
        "precision-name": "G15 Hassasiyet",
        "precision-desc": "The less often you interrupt the robot outside home, the more points you keep.",
        "precision-scoring": "Sahada kalan hassasiyet diski sayısı:",
        "robot-ending-error": "Robot konumu uyuşmuyor - aynı anda G06'da asılı kalamaz ve G07'de dans edemez",
        "cube-error": "Küp sayısı fazla",
        "health-unit-error": "Sağlık üniteleri sayısı fazla"
    },
    "rtl": false
})
