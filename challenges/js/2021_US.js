({
    "title": "CARGO CONNECT",
    "missions": [{
            "title": "M00 Equipment Inspection Bonus",
            "description": "Designs using fewer parts can save you time and space, allowing for efficiency and sometimes fewer problems.",
            "objectives": [{
                "id": "bonus",
                "title": "All team equipment fits in the small inspection space:",
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
            "title": "M01 Innovation Project",
            "description": "The innovation project is made of at least two white LEGO pieces and measures at least as long as 4 LEGO studs in at least one direction.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "The innovation project is large enough (2+ white LEGO pieces and 4+ LEGO studs long) and is touching the CARGO CONNECT circle:",
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
            "title": "M02 Unused Capacity",
            "description": "Shipping efficiency increases by filling the empty container with cargo before transporting it.",
            "objectives": [
                {
                    "id": "M02_1",
                    "title": "Is the hinged container completely closed?",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "How many pieces does it contain?",
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
            "score": [function(M02_1, M02_2) {
                M02_1 = String(M02_1);
                M02_2 = String(M02_2);
                if (M02_1 === 'no') {
                    return 0;
                }
                switch (M02_2) {
                    case '0':
                        return 0;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                        return 20;
                    case '6':
                        return 30;
                }
            }]
        },
        {
            "title": "M03 Unload Cargo Plane",
            "description": "Unloading cargo is an important part of the journey. Planes are often just one of multiple forms of transportation used to deliver cargo containers to their destination.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "Is the plane's cargo door completely down, touching its black frame?:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "Has the cargo plane been unloaded so that the container is completely seperate from the plane?",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M03_1, M03_2) {
                M03_1 = String(M03_1);
                M03_2 = String(M03_2);
                if(M03_1 === 'no' && M03_2 === 'no') {
                    return 0;
                }
                if(M03_1 === 'no' && M03_2 === 'yes') {
                    return 10;
                }
                if(M03_1 === 'yes' && M03_2 === 'no') {
                    return 20;
                }
                if(M03_1 === 'yes' && M03_2 === 'yes') {
                    return 30;
                }
            }]
        },
        {
            "title": "M04 Transportation Journey",
            "description": "Transporting cargo is a journey from beginning to end. Cargo often needs more than one form of transportation to complete the journey and reach a final destination.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Has the truck reached its destination, completely past its blue end line?",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Has the airplane reached its destination, completely past its blue end line?",
                    "type": "yesno",
                    "default": "no"
                }
            ],
            "score": [function(M04_1, M04_2) {
                M04_1 = String(M04_1);
                M04_2 = String(M04_2);
                if (M04_1 === 'no' && M04_2 === 'no') {
                    return 0
                }
                if (M04_1 === 'no' && M04_2 === 'yes') {
                    return 10
                }
                if (M04_1 === 'yes' && M04_2 === 'no') {
                    return 10
                }
                if (M04_1 === 'yes' && M04_2 === 'yes') {
                    return 30
                }
            }]
        },
{
            "title": "M05 Switch Engine",
            "description": "Energy efficiency plays an important role in transportation. Switch your engine from diesel to electric. You will save money while being environmentally friendly.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Has the engine been switched from diesel to electric so that the yellow bar rests all the way down/south?",
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
                    return 20;
                }
            }]
        },
{
            "title": "M06 Accident Avoidance",
            "description": "Accidents can cause many problems when transporting cargo. People could be hurt, cargo and machines could be damanged, or your cargo could be late.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "Is the robot parked over the blue accident-avoidance line?",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "Is the yellow panel knocked down?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M06_3",
                    "title": "Is the black frame knocked down?",
                    "type": "yesno",
                    "default": "no",
                }
            ],
            "score": [function(M06_1, M06_2, M06_3) {
                M06_1 = String(M06_1);
                M06_2 = String(M06_2);
                M06_3 = String(M06_3);
                if(M06_1 === 'no' || M06_3 === 'yes') {
                    return 0;
                }
                if(M06_1 === 'no' && M06_2 === 'no' && M06_3 === 'yes') {
                    return 20;
                }
                if(M06_1 === 'no' && M06_2 === 'no' && M06_3 === 'yes') {
                    return 30;
                }
            }]
        },
{
            "title": "M07 Unload Cargo Ship",
            "description": "Unloading cargo is an important part of the journey. Ships are often just one of multiple forms of transportation used to deliver cargo containers to their destination.",
            "objectives": [
                {
                    "id": "M07_1",
                    "title": "Is the container no longer touching the cargo ship's east deck?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M07_2",
                    "title": "Is the container completely east of the cargo ship's east deck?",
                    "type": "yesno",
                    "default": "no",
                },
            ],
            "score": [function(M07_1, M07_2) {
                M07_1 = String(M07_1);
                M07_2 = String(M07_2);
                if (M07_1 === 'no') {
                    return 0;
                }
                if (M07_1 === 'yes' && M07_2 === 'no') {
                    return 20;
                }
                if (M07_1 === 'yes' && M07_2 === 'yes') {
                    return 30;
                }
            }]
        },
        {
            "title": "M08 Air Drop",
            "description": "Helicopters can be used to transport cargo to areas that are difficult to reach. They are used to help others, bringing important packages like food.",
            "objectives": [
                {
                    "id": "M08_1",
                    "title": "Is the food package seperated from your helicopter?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M08_2",
                    "title": "Is the food package seperated from the other field's helicopter and completely in your field's CARGO CONNECT circle?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M08_3",
                    "title": "Have both teams seperated their food packages from their field's helicopters?",
                    "type": "yesno",
                    "default": "no",
                },
            ],
            "score": [function(M08_1, M08_2, M08_3) {
                M08_1 = String(M08_1);
                M08_2 = String(M08_2);
                M08_3 = String(M08_3);
                if(M08_1 === 'no' && M08_2 === 'no' && M08_3 === 'no') {
                    return 0;
                }
                if(M08_1 === 'no' && M08_2 === 'no' && M08_3 === 'yes') {
                    return 10;
                }
                if(M08_1 === 'no' && M08_2 === 'yes' && M08_3 === 'no') {
                    return 10;
                }
                if(M08_1 === 'no' && M08_2 === 'yes' && M08_3 === 'yes') {
                    return 20;
                }
                if(M08_1 === 'yes' && M08_2 === 'no' && M08_3 === 'no') {
                    return 20;
                }
                if(M08_1 === 'yes' && M08_2 === 'no' && M08_3 === 'yes') {
                    return 30;
                }
                if(M08_1 === 'yes' && M08_2 === 'yes' && M08_3 === 'no') {
                    return 30;
                }
                if(M08_1 === 'yes' && M08_2 === 'yes' && M08_3 === 'yes') {
                    return 40;
                }
            }]
        },
{
            "title": "M09 Train Tracks",
            "description": "Trains can transport cargo to many places. Keeping infrastructure like train tracks in good condition is important to ensure trains get to their destinations.",
            "objectives": [
                {
                    "id": "M09_1",
                    "title": "Is the train track repaired, so that it rests completely down/West?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M09_2",
                    "title": "Has the train reached its destination, latched at the end of the tracks?",
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
                if(M09_1 === 'no' && M09_2 === 'yes') {
                    return 0;
                }
                if(M09_1 === 'yes' && M09_2 === 'no') {
                    return 20;
                }
                if(M09_1 === 'yes' && M09_2 === 'yes') {
                    return 40;
                }
            }]
        },
        {
            "title": "M10 Sorting Center",
            "description": "Transportation includes getting the correct cargo to the correct place. Sort your containers and deliver them to their destinations.",
            "objectives": [{
                "id": "M10",
                "title": "Is the light orange container the only container remaining completely in the blue sorting area?",
                "type": "yesno",
                "default": "no"
            }],
            "score": [function(M10) {
                M10 = String(M10);
                if (M10 === 'no') {
                    return 0
                }
                if (M10 === 'yes') {
                    return 20
                }
            }]
        },
        {
            "title": "M11 Home Delivery",
            "description": "Having a package delivered to your doorstep is awesome! Packages can be transported safely, on time, and to your door.",
            "objectives": [{
                "id": "M11_1",
                "title": "Has the package been delivered to its destination on the doorstep (without touching equipment)?",
                "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "partly",
                        "title": "Partly"
                    },
                    {
                        "value": "completely",
                        "title": "Completely"
                    },
                ],
                "type": "enum",
                "default": "none"
            }],
            "score": [function(M11_1) {
                M11_1 = String(M11_1);
                if (M11_1 === 'none') {
                    return 0
                }
                if (M11_1 === 'partly') {
                    return 20
                }
                if (M11_1 === 'completely') {
                    return 30
                }
            }]
        },
{
            "title": "M12 Large Delivery",
            "description": "Transporting large items can lead to unexpected problems, like maneuvering around a chicken statue along the way. It is important to plan ahead so nothing is damaged and your cargo arrives safely.",
            "objectives": [
                {
                    "id": "M12_1",
                    "title": "What is the turbine blade touching?",
                    "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "holder",
                        "title": "Holder"
                    },
                    {
                        "value": "Holder_mat",
                        "title": "Holder & Mat"
                    },
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M12_2",
                    "title": "Is the chicken statue is upright with its base in the circle?",
                    "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "partly",
                        "title": "Partly"
                    },
                    {
                        "value": "completely",
                        "title": "Completely"
                    },
                    ],
                    "type": "enum",
                    "default": "none"
                },
            ],
            "score": [function(M12_1, M12_2) {
                M12_1 = String(M12_1);
                M12_2 = String(M12_2);
                if (M12_1 === 'none' && M12_2 === 'none') {
                    return 0
                }
                if (M12_1 === 'none' && M12_2 === 'partly') {
                    return 5
                }
                if (M12_1 === 'none' && M12_2 === 'completely') {
                    return 10
                }
                if (M12_1 === 'holder' && M12_2 === 'none') {
                    return 30
                }
                if (M12_1 === 'holder' && M12_2 === 'partly') {
                    return 35
                }
                if (M12_1 === 'holder' && M12_2 === 'completely') {
                    return 40
                }
                if (M12_1 === 'Holder_mat' && M12_2 === 'none') {
                    return 20
                }
                if (M12_1 === 'Holder_mat' && M12_2 === 'partly') {
                    return 25
                }
                if (M12_1 === 'Holder_mat' && M12_2 === 'completely') {
                    return 30
                }
            }]
        },
        {
            "title": "M13 Platooning Trucks",
            "description": "Truck platooning is the linking of two or more trucks in transport. This allows trucks to move efficiently, saving time, fuel, and money.",
            "objectives": [
                {
                    "id": "M13_1",
                    "title": "Are both trucks latched together completely outside of home?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M13_2",
                    "title": "Is a truck latched to the bridge?",
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
                    return 10;
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
            "title": "M14 Bridge",
            "description": "The bridge can be raised and lowered to allow transport on both the river and road. Lower the bridge decks to prepare for the trucks to pass.",
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
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
            ],
            "score": [function(M14_1) {
                M14_1 = Number(M14_1);
                return M14_1 * 10;
            }]
        },
        {
            "title": "M15 Load Cargo",
            "description": "Load cargo containers safely and efficiently",
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
                            "title": "2 or more"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
                {
                    "id": "M15_2",
                    "title": "Train",
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
                            "title": "2 or more"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                },
                {
                    "id": "M15_3",
                    "title": "Cargo Ship's West Deck",
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
                            "title": "2 or more"
                        }
                    ],
                    "type": "enum",
                    "default": "0"
                }
            ],
            "score": [function(M15_1, M15_2, M15_3) {
                M15_1 = Number(M15_1);
                M15_2 = Number(M15_2);
                M15_3 = Number(M15_3);
                return M15_1 * 10 + M15_2 * 20 + M15_3 * 30;
            }]
        },
        {
            "title": "M16 CARGO CONNECT",
            "description": "Connect cargo to all forms of transportation. Make as many connections as you can and transport your cargo by land, sea, or air to its destination!",
            "objectives": [
                {
                    "id": "M16_1",
                    "title": "Number of containers PARTLY in a circle?",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 8,
                    "value": null
                },
                {
                    "id": "M16_2",
                    "title": "Number of containers COMPLETELY in a circle?",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 8,
                    "value": null
                },
                {
                    "id": "M16_3",
                    "title": "Number of circles with at least one container COMPLETELY in them?",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 6,
                    "value": null
                },
                {
                    "id": "M16_4",
                    "title": "Is the blue (not hinged) container completely in the blue circle?",
                    "type": "yesno",
                    "default": "no",
                },
                {
                    "id": "M16_5",
                    "title": "Is the lime green container completely in the lime green circle?",
                    "type": "yesno",
                    "default": "no",
                }
            ],
            "score": [function(M16_1, M16_2, M16_3, M16_4, M16_5) {
                M16_1 = Number(M16_1);
                M16_2 = Number(M16_2);
                M16_3 = Number(M16_3);
                M16_4 = String(M16_4);
                M16_5 = String(M16_5);

                return (M16_4 === 'yes' ? 20 : 0) + (M16_5 === 'yes' ? 20 : 0) + M16_1 * 5 + M16_2 * 10 + M16_3 * 10;
            }]
        },
        {
            "title": "M17 Precision",
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