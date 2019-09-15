({
    "title": "CITY SHAPER",
    "missions": [{
            "title": "Advantage",
            "description": "If all your Equipment fits in the Small Inspection area during Match preparation, you get an advantage.",
            "objectives": [{
                "id": "bonus",
                "title": "Team's Robot and Equipment fit in the Small Inspection Area:",
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
            "title": "M01 Elevated Places",
            "description": "You can only get Flag points if you get Bridge points. It is okay and expected for Robots to collide while trying to earn Flag points.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "The Robot is Supported by the Bridge:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Number of flags that are clearly raised any distance, only by the Robot:",
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
            "title": "M02 Crane",
            "description": "Score all that apply.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "The Hooked Blue Unit is clearly lowered any distance from the Guide Hole:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_2",
                    "title": "The Hooked Blue Unit is Independent and Supported by another Blue Unit:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_3",
                    "title": "AND Level 1 is Completely in the Blue Circle:",
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
                    return new Error('Too many Building Units in use')
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflict in position of Blue Units")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'no') {
                    return new Error("Conflict in position of Blue Units")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflict in position of Blue Units")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 20
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("Conflict in position of Blue Units")
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
                    return new Error("Conflict in position of Blue Units")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'yes') {
                    return new Error("Conflict in position of Blue Units")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflict in position of Blue Units")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'yes') {
                    return 30
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("Conflict in position of Blue Units")
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
            "title": "M03 Inspection Drone",
            "description": "The Inspection Camera Drone Mission reveals an inexpensive way to check out bridges and other tall structures. Drones can fly for hours and send back detailed pictures and even 3D scans.",
            "objectives": [{
                "id": "M03_1",
                "title": "The Inspection Drone is Supported by the axle on the Bridge:",
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
            "title": "M04 Design for Wildlife",
            "description": "The Bat needs to end up on the brown Branch",
            "objectives": [{
                "id": "M04_1",
                "title": "The Bat is Supported by the Branch on the Tree:",
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
            "title": "M05 Treehouse",
            "description": "Score all that apply.",
            "objectives": [{
                    "id": "M05_lg",
                    "title": "Number of Units Independent and Supported by the Tree's Large Branches:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 10,
                    "value": null
                },
                {
                    "id": "M05_sm",
                    "title": "Number of Units Independent and Supported by the Tree's Small Branches:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 10,
                    "value": null
                }
            ],
            "score": [function(M05_lg, M05_sm, bonus, M02_1, M02_2, M12_4) {
                M05_lg = String(M05_lg);
                M05_sm = String(M05_sm);
                bonus = String(bonus);
                if (((M02_1 === 'yes') ? 1 : 0) + ((M02_2 === 'yes') ? 1 : 0) + (M05_lg * 1) + (M05_sm * 1) + (M12_4 * 0.5) > 17) {
                    return new Error('Too many Building Units in use')
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
            }]
        },
        {
            "title": "M06 Traffic Jam",
            "description": "Clear the road by lifting the Traffic Jam.",
            "objectives": [{
                "id": "M06_1",
                "title": "The Traffic Jam is lifted, its moving part is Independent, and it is Supported only by its hinges:",
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
            "title": "M07 Swing",
            "description": "Release the Swing.",
            "objectives": [{
                "id": "M07_1",
                "title": "The Swing is released:",
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
            "title": "M08 Elevator",
            "description": "Score one or the other, but not both.",
            "objectives": [{
                "id": "M08_1",
                "title": "The Elevator's moving parts are are Independent and Supported only by its hinges in the following position:",
                "options": [{
                        "value": "neither",
                        "title": "Neither"
                    },
                    {
                        "value": "car",
                        "title": "Blue Car Down"
                    },
                    {
                        "value": "balanced",
                        "title": "Balanced"
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
            "title": "M09 Safety Factor",
            "description": "Can the Test Building stand when some of its support beams are moved?",
            "objectives": [{
                    "id": "M09_1",
                    "title": "The Test Building is Independent and Supported only by the blue beams:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M09_2",
                    "title": "Number of blue beams knocked out at least half way:",
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
            "title": "M10 Steel Construction",
            "description": "Make the Steel Structure stand up.",
            "objectives": [{
                "id": "M10",
                "title": "The Steel Structure is standing and is Independent and Supported only by its hinges:",
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
            "title": "M11 Innovative Architecture",
            "description": "Design and build your own Structure and deliver to any Circle.",
            "objectives": [{
                    "id": "M11_1",
                    "title": "The Structure is bigger than a Blue Building Unit and built from Team's white LEGO bricks:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M11_2",
                    "title": "The Structure is in any Circle:",
                    "options": [{
                            "value": "no",
                            "title": "No"
                        },
                        {
                            "value": "partly",
                            "title": "Partly"
                        },
                        {
                            "value": "completely",
                            "title": "Completely"
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
            "title": "M12 Design and Build",
            "description": "The Blue Circle is not part of Mission 12.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "Number of Circles with a color-matching Unit, flat down on the Mat, and Completely in Circle:",
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
                },
                {
                    "id": "M12_4",
                    "title": "Sum of heights of all Independent Stacks at least partly in any Circle:",
                    "type": "number",
                    "default": 0,
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
                    return new Error('Too many Building Units in use')
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
                    return new Error("Height too small for number of color-matching Units")
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
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'no') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'no') {
                    return new Error("Height too small for number of color-matching Units")
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
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'no') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'no') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'no') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'no') {
                    return new Error("Height too small for number of color-matching Units")
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
                    return new Error("Height too small for number of color-matching Units")
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
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("Height too small for number of color-matching Units")
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
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'yes') {
                    return new Error("Height too small for number of color-matching Units")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'yes') {
                    return new Error("Height too small for number of color-matching Units")
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
            "title": "M13 Sustainability Upgrades",
            "description": "Only one Upgrade (solar panels, roof garden, insulation) counts per Stack.",
            "objectives": [{
                "id": "M13",
                "title": "Number of Upgrades that are Independent and Supported only by a Stack which is at least partly in a Circle:",
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
            "title": "M14 Precision",
            "description": "You are allowed to Interrupt your Robot and bring it back to re-Launch, but Interruptions do lose Precision Tokens.",
            "objectives": [{
                "id": "precision",
                "title": "Number of Precision Tokens left on the Field:",
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
        "yes": "Yes",
        "no": "No",
        "advantage-name": "Advantage",
        "advantage-desc": "If all your Equipment fits in the Small Inspection area during Match preparation, you get an advantage.",
        "advantage-scoring": "Team's Robot and Equipment fit in the Small Inspection Area:",
        "M01-name": "M01 Elevated Places",
        "M01-desc": "You can only get Flag points if you get Bridge points. It is okay and expected for Robots to collide while trying to earn Flag points.",
        "M01-scoring1": "The Robot is Supported by the Bridge:",
        "M01-scoring2": "Number of flags that are clearly raised any distance, only by the Robot:",
        "M02-name": "M02 Crane",
        "M02-desc": "Score all that apply.",
        "M02-scoring1": "The Hooked Blue Unit is clearly lowered any distance from the Guide Hole:",
        "M02-scoring2": "The Hooked Blue Unit is Independent and Supported by another Blue Unit:",
        "M02-scoring3": "AND Level 1 is Completely in the Blue Circle:",
        "M03-name": "M03 Inspection Drone",
        "M03-desc": "The Inspection Camera Drone Mission reveals an inexpensive way to check out bridges and other tall structures. Drones can fly for hours and send back detailed pictures and even 3D scans.",
        "M03-scoring1": "The Inspection Drone is Supported by the axle on the Bridge:",
        "M04-name": "M04 Design for Wildlife",
        "M04-desc": "The Bat needs to end up on the brown Branch",
        "M04-scoring1": "The Bat is Supported by the Branch on the Tree:",
        "M05-name": "M05 Treehouse",
        "M05-desc": "Score all that apply.",
        "M05-scoring1": "Number of Units Independent and Supported by the Tree's Large Branches:",
        "M05-scoring2": "Number of Units Independent and Supported by the Tree's Small Branches:",
        "M05-error": "Too Many Units",
        "M06-name": "M06 Traffic Jam",
        "M06-desc": "Clear the road by lifting the Traffic Jam.",
        "M06-scoring1": "The Traffic Jam is lifted, its moving part is Independent, and it is Supported only by its hinges:",
        "M07-name": "M07 Swing",
        "M07-desc": "Release the Swing.",
        "M07-scoring1": "The Swing is released:",
        "M08-name": "M08 Elevator",
        "M08-desc": "Score one or the other, but not both.",
        "M08-scoring1": "The Elevator's moving parts are are Independent and Supported only by its hinges in the following position:",
        "M08-scoring2": "Neither",
        "M08-scoring3": "Blue Car Down",
        "M08-scoring4": "Balanced",
        "M09-name": "M09 Safety Factor",
        "M09-desc": "Can the Test Building stand when some of its support beams are moved?",
        "M09-scoring1": "The Test Building is Independent and Supported only by the blue beams:",
        "M09-scoring2": "Number of blue beams knocked out at least half way:",
        "M10-name": "M10 Steel Construction",
        "M10-desc": "Make the Steel Structure stand up.",
        "M10-scoring": "The Steel Structure is standing and is Independent and Supported only by its hinges:",
        "M11-name": "M11 Innovative Architecture",
        "M11-desc": "Design and build your own Structure and deliver to any Circle.",
        "M11-scoring1": "The Structure is bigger than a Blue Building Unit and built from Team's white LEGO bricks:",
        "M11-scoring2": "The Structure is in any Circle:",
        "M11-scoring3": "No",
        "M11-scoring4": "Partly",
        "M11-scoring5": "Completely",
        "M12-name": "M12 Design and Build",
        "M12-desc": "The Blue Circle is not part of Mission 12.",
        "M12-scoring1": "Number of Circles with a color-matching Unit, flat down on the Mat, and Completely in Circle:",
        "M12-scoring4": "Sum of heights of all Independent Stacks at least partly in any Circle:",
        "M13-name": "M13 Sustainability Upgrades",
        "M13-desc": "Only one Upgrade (solar panels, roof garden, insulation) counts per Stack.",
        "M13-scoring": "Number of Upgrades that are Independent and Supported only by a Stack which is at least partly in a Circle:",
        "precision-name": "M14 Precision",
        "precision-desc": "You are allowed to Interrupt your Robot and bring it back to re-Launch, but Interruptions do lose Precision Tokens.",
        "precision-scoring": "Number of Precision Tokens left on the Field:",
        "building-unit-error": "Too many Building Units in use",
        "crane-error": "Conflict in position of Blue Units",
        "M12-error2": "Height too small for number of color-matching Units"
    },
    "rtl": false
})
