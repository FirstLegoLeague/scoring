({
    "title": "MASTER PIECE",
    "missions": [{
            "title": "EIB EQUIPMENT INSPECTION BONUS",
            "description": "Designs using fewer parts can save you time and space, allowing for efficiency and sometimes fewer problems.",
            "objectives": [{
                "id": "bonus",
                "title": "All team equipment fits in one launch area and under 12in.",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(bonus) {
                bonus = String(bonus);
                if (bonus === 'no') {
                    return 0
                }
                if (bonus === 'yes') {
                    return 20
                }
            }]
        },
        {
            "title": "M01 3D CINEMA",
            "description": "N/A",
            "objectives": [{
                    "id": "M01_1",
                    "title": "The 3D cinema's red beam is completely to the right of the black frame",
                    "type": "yesno",
                    "default": "no"
                },
            ],
            "score": [function(M01_1) {
                M01_1 = String(M01_1);
                if (M01_1 === 'no') {
                    return 0
                }
                if (M01_1 === 'yes') {
                    return 20
                }
            }]
        },
        {
            "title": "M02 THEATER SCENE CHANGE",
            "description": "N/A",
            "objectives": [
                {
                    "id": "M02_1",
                    "title": "Your theater's red flag is down and the active scene color is",
                    "options": [
                        {
                            "value": "0",
                            "title": "No"
                        },
                        {
                            "value": "1",
                            "title": "Blue"
                        },
                        {
                            "value": "2",
                            "title": "Pink"
                        },
                        {
                            "value": "3",
                            "title": "Orange"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
                {
                    "id": "M02_2",
                    "title": "Both teams' active scenes match",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M02_2, M02_1) {
                M02_1 = String(M02_1);
                M02_2 = String(M02_2);
                if (M02_2 === 'no') {
                    switch (M02_1) {
                        case '0':
                            return 0;
                        case '1':
                            return 10;
                        case '2':
                            return 20;
                        case '3':
                            return 30;
                    }
                }
                if (M02_2 === 'yes') {
                    switch(M02_1) {
                        case '0':
                            return 0;
                        case '1':
                            return 30;
                        case '2':
                            return 50;
                        case '3':
                            return 40;
                    }
                }
            }]
        },
        {
            "title": "M03 IMMERSIVE EXPERIENCE",
            "description": "N/A",
            "objectives": [{
                    "id": "M03",
                    "title": "The three immersive experience screens are raised",
                    "type": "yesno",
                    "default": "no"
                }],
            "score": [function(M03_1) {
                M03_1 = String(M03_1);
                if (M03_1 === 'no') {
                    return 0;
                }
                if (M03_1 === 'yes') {
                    return 20;
                }
            }]
        },
        {
            "title": "M04 MASTERPIECE",
            "description": "N/A",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Your team's LEGO art piece is at least partly in the museum target area",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "The art piece is completely supported by the pedestal",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M04_1, M04_2) {
                M04_1 = String(M04_1);
                M04_2 = String(M04_2);
                if (M04_1 === 'no') {
                    return 0;
                }
                if (M04_1 === 'yes') {
                    if (M04_2 === 'no') {
                        return 10;
                    }
                    if (M04_2 === 'yes') {
                        return 30;
                    }
                }
            }]
        },
{
            "title": "M05 Switch Engine",
            "description": "N/A",
            "objectives": [{
                    "id": "M05_1",
                    "title": "The augmented reality statue's orange lever is totated completely to the right",
                    "type": "yesno",
                    "default": "no",
                },
            ],
            "score": [function(M05_1) {
                M05_1 = String(M05_1);
                if(M05_1 === 'no') {
                    return 0;
                }
                if(M05_1 === 'yes') {
                    return 30;
                }
            }]
        },
{
            "title": "M06 MUSIC CONCERT LIGHTS AND SOUNDS",
            "description": "N/A",
            "objectives": [{
                    "id": "M06_1",
                    "title": "The lights' orange lever is rotated completely downwards",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "The speakers' orange lever is rotated completely to the left",
                    "type": "yesno",
                    "default": "no",
                }
            ],
            "score": [function(M06_1, M06_2) {
                M06_1 = String(M06_1);
                M06_2 = String(M06_2);
                if (M06_1 === 'no' && M06_2 === 'no') {
                    return 0;
                }
                if (M06_1 === 'yes' && M06_2 === 'no' || M06_1 === 'no' && M06_2 === 'yes' ) {
                    return 10;
                }
                if (M06_1 == 'yes' && M06_2 === 'yes') {
                    return 20;
                }
            }]
        },
{
            "title": "M07 HOLOGRAM PERFORMER",
            "description": "N/A",
            "objectives": [
                {
                    "id": "M07_1",
                    "title": "The hologram performer's orange push activator is completely past the black stage set line",
                    "type": "yesno",
                    "default": "no",
                }
            ],
            "score": [function(M07_1) {
                M07_1 = String(M07_1);
                if (M07_1 === 'no') {
                    return 0;
                } 
                if (M07_1 === 'yes') {
                    return 20;
                }
            }]
        },
        {
            "title": "M08 ROLLING CAMERA",
            "description": "N/A",
            "objectives": [
                {
                    "id": "M08_1",
                    "title": "The rolling camera's white pointer is left of ",
                    "options": [
                        {
                            "value": "0",
                            "title": "None"
                        },
                        {
                            "value": "1",
                            "title": "Dark blue"
                        },
                        {
                            "value": "2",
                            "title": "Dark & medium blue"
                        },
                        {
                            "value": "3",
                            "title": "Dark, medium, & light blue"
                        }
                    ],
                    "type": "enum",
                    "default": "0",
                }
            ],
            "score": [function(M08_1) {
                M08_1 = String(M08_1);
                switch(M08_1) {
                    case '0':
                        return 0;
                    case '1':
                        return 10;
                    case '2':
                        return 20;
                    case '3':
                        return 30;
                }
            }]
        },
{
            "title": "M09 MOVIE SET",
            "description": "N/A",
            "objectives": [
                {
                    "id": "M09_1",
                    "title": "The boat is touching the mat and is coompletely past the black scene",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M09_2",
                    "title": "The camera is touching the mat and is at least partly in the camera target area",
                    "type": "yesno",
                    "default": "no",
                },
            ],
            "score": [function(M09_1, M09_2) {
                M09_1 = String(M09_1);
                M09_2 = String(M09_2);
                if(M09_1 === 'no' && M09_2 === 'no') {
                    return 0;
                }
                if(M09_1 === 'no' && M09_2 === 'yes' || M09_1 === 'yes' && M09_2 === 'no') {
                    return 10;
                }
                if(M09_1 === 'yes' && M09_2 === 'yes') {
                    return 10;
                }
            }]
        },
        {
            "title": "M10 SOUND MIXER",
            "description": "N/A",
            "objectives": [{
                "id": "M10_1",
                "title": "Number of sound mixer sliders that are raised",
                "options": [
                    {
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
            "score": [function(M10_1) {
                M10_1 = String(M10_1);
                switch(M10_1) {
                    case 0:
                        return 0;
                    case 1:
                        return 10;
                    case 2:
                        return 20;
                    case 3:
                        return 30;
                }
            }]
        },
        {
            "title": "M11 LIGHT SHOW",
            "description": "N/A",
            "objectives": [{
                "id": "M11_1",
                "title": "The light show's white pointer is within zone",
                "options": [{
                        "value": "0",
                        "title": "None"
                    },
                    {
                        "value": "1",
                        "title": "Yellow"
                    },
                    {
                        "value": "2",
                        "title": "Green"
                    },
                    {
                        "value": "3",
                        "title": "Blue"
                    }
                ],
                "type": "enum",
                "default": "0"
            }],
            "score": [function(M11_1) {
                M11_1 = String(M11_1);
                switch(M11_1) {
                    case 0:
                        return 0;
                    case 1:
                        return 10;
                    case 2:
                        return 20;
                    case 3:
                        return 30;
                }
            }]
        },
{
            "title": "M12 VIRTUAL REALITY ARIST",
            "description": "N/A",
            "objectives": [
                {
                    "id": "M12_1",
                    "title": "The chicken is intact",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M12_2",
                    "title": "Is the chicken statue is upright with its base in the circle?",
                    "type": "yesno",
                    "default": "none"
                },
            ],
            "score": [function(M12_1, M12_2) {
                M12_1 = String(M12_1);
                M12_2 = String(M12_2);
                if (M12_1 === 'no') {
                    return 0;
                }
                if (M12_1 === 'yes') {
                    if (M12_2 === 'no') {
                        return 10;
                    }
                    if (M12_2 === 'yes') {
                        return 30;
                    }
                }
            }]
        },
        {
            "title": "M13 CRAFT CREATOR",
            "description": "N/A",
            "objectives": [
                {
                    "id": "M13_1",
                    "title": "The craft machine's orange and white lid is completely open",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M13_2",
                    "title": "The craft machine's light pink ",
                    "type": "yesno",
                    "default": "no",
                },
            ],
            "score": [function(M13_1, M13_2) {
                M13_1 = String(M13_1);
                M13_2 = String(M13_2);
                if (M13_1 === 'no' && M13_2 === 'no') {
                    return 0;
                }
                if (M13_1 === 'no' && M13_2 === 'yes') {
                    return 20;
                }
                if (M13_1 === 'yes' && M13_2 === 'no') {
                    return 10;
                }
                if (M13_1 === 'yes' && M13_2 === 'yes') {
                    return 30;
                }
            }]
        },
        {
            "title": "M14 AUDIENCE DELIVERY",
            "description": "N/A",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Number of bridge sections lowered and resting on the center support",
                    "options": [
                        {
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
                        },
                        {
                            "value": "7",
                            "title": "7"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
                {
                    "id": "M14_2",
                    "title": "",
                    "options": [
                        {
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
                        },
                        {
                            "value": "7",
                            "title": "7"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                }
            ],
            "score": [function(M14_1, M14_2) {
                M14_1 = String(M14_1);
                M14_2 = String(M14_2);
                // I don't know if this will work, so if there is a problem, check here
                a = 0;
                b = 0;
                switch (M14_1) {
                    case 0:
                        a = 0;
                    case 1:
                        a = 5;
                    case 2:
                        a = 10;
                    case 3:
                        a = 15;
                    case 4:
                        a = 20;
                    case 5:
                        a = 25;
                    case 6:
                        a = 30;
                    case 7:
                        a = 35;
                }
                switch (M14_2) {
                    case 0:
                        b = 0;
                    case 1:
                        b = 5;
                    case 2:
                        b = 10;
                    case 3:
                        b = 15;
                    case 4:
                        b = 20;
                    case 5:
                        b = 25;
                    case 6:
                        b = 30;
                    case 7:
                        b = 35;
                }
                // This is another spot I don't know if it will work
                return a+b ;
            }]
        },
        {
            "title": "M15 EXPERT DELIVERY",
            "description": "N/A",
            "objectives": [{
                    "id": "M15_1",
                    "title": "Platooning Trucks",
                    "options": [
                        {
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
            "score": [function(M15_1) {
                M15_1 = Number(M15_1);
                return M15_1 * 10;
            }]
        },
        {
            "title": "PT Precision",
            "description": "The less often you interrupt the robot outside home, the more points you keep.",
            "objectives": [{
                "id": "precision",
                "title": "Number of precision tokens left on the field:",
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
                    return 10
                }
                if (precision === '2') {
                    return 15
                }
                if (precision === '3') {
                    return 25
                }
                if (precision === '4') {
                    return 35
                }
                if (precision === '5') {
                    return 50
                }
                if (precision === '6') {
                    return 50
                }
            }]
        },
        {
            "title": "Gracious Professionalism",
            "description": "This category is not counted towards the overall score.",
            "objectives": [{
                    "id": "GP",
                    "title": "Gracious Professionalism displayed at the robot game table:",
                    "options": [
                        {
                            "value": "2",
                            "title": "Developing 2"
                        },
                        {
                            "value": "3",
                            "title": "Accomplished 3"
                        },
                        {
                            "value": "4",
                            "title": "Exceeds 4"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
            ],
            "score": [function(GP) {
                return 0;
            }]
        },
    ],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "None": "None"
    },
    "rtl": false
})