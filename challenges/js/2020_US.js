const challenge = `({
    "title": "RePLAY",
    "missions": [{
            "title": "M00 Equipment Inspection Bonus",
            "description": "If all your equipment fits completely in the small inspection space when you get to the match, you get a mission point bonus.",
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
                    return 25
                }
            }]
        },
        {
            "title": "M01 Innovation Project",
            "description": "The innovation project is made of at least two white LEGO pieces and measures at least as long as 4 LEGO studs in at least one direction.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "The innovation project is large enough (2+ white LEGO pieces and 4+ LEGO studs long):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "Part of the innovation project is touching:",
                    "options": [{
                            "value": "none",
                            "title": "None"
                        },
                        {
                            "value": "logo",
                            "title": "RePLAY Logo"
                        },
                        {
                            "value": "gray",
                            "title": "Bench Gray Area"
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
            "title": "M02 Step Counter",
            "description": "The farther the robot slides the step counter, the better.",
            "objectives": [{
                "id": "M02_1",
                "title": "The bottom of the pointer is on:",
                "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "magenta",
                        "title": "Magenta"
                    },
                    {
                        "value": "yellow",
                        "title": "Yellow"
                    },
                    {
                        "value": "blue",
                        "title": "Blue"
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
            "title": "M03 Slide",
            "description": "The robot slides the figures down the slide and moves them to other areas. \\"Off the slide\\" scores if the slide figures's black frame is past/below the tip of the slide's gray part.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "Number of slide figures off the slide:",
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
                    "title": "A slide figure is completely in home:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_3",
                    "title": "A slide figure is held completely off the mat by the heavy tire and touching nothing else:",
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
                    return new Error("Too many slide figures")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'no') {
                    return new Error("Too many slide figures")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'yes') {
                    return new Error("Too many slide figures")
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
                    return new Error("Too many slide figures")
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
            "title": "M04 Bench",
            "description": "The robot removes the backrest, flattens the bench, and gets cubs into the hopscotch spaces.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "The bench is down flat:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_3",
                    "title": "The backrest is completely out of both of its holes:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Number of hopscotch spaces with cubes touching the mat inside them:",
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
            "title": "M05 Basketball",
            "description": "The robot raises the crate up the post and gets a cube into it.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "A cube is in the crate:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M05_2",
                    "title": "The crate rests on the white stopper at height:",
                    "options": [{
                            "value": "none",
                            "title": "None"
                        },
                        {
                            "value": "middle",
                            "title": "Middle"
                        },
                        {
                            "value": "top",
                            "title": "Top"
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
                    return new Error('Too many cubes')
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
            "title": "M06 Pull-Up Bar",
            "description": "The robot passes completely under the bar at any time. Separately, the robot is held off the mat by the bar at the end of the match.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "The robot passed completely through the pull-up bar's upright frame at any time:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "The pull-up bar holds 100% of the robot up off the mat at the end of the match:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                }
            ],
            "score": [function(M06_1, M06_2, M07_1) {
                M06_1 = String(M06_1);
                M06_2 = String(M06_2);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('Robot location conflict - cannot be held up in M06 and dancing in M07')
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
            "title": "M07 Robot Dance",
            "description": "The robot is dancing on the dance floor at the end of the match. Any silly or skilled repetitive action counts as dancing.",
            "objectives": [{
                "id": "M07_1",
                "title": "The robot's controller is dancing over the dance floor at the end of the match:",
                "type": "yesno",
                "default": "no",
                "value": null
            }],
            "score": [function(M07_1, M06_2) {
                M07_1 = String(M07_1);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('Robot location conflict - cannot be held up in M06 and dancing in M07')
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
            "description": "Robots send matching colored cubes onto the opposite field.",
            "objectives": [{
                    "id": "M08_1",
                    "title": "Both share models have sent only one cube onto the opposing field and those cubes color-match each other :",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M08_3",
                    "title": "At least one yellow cube is completely in the target:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_4",
                    "title": "Any equipment is in the frame (even partly):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_2",
                    "title": "Number of cubes in the frame or target:",
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
                    return new Error('Too many cubes')
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 0
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("Cubes in target conflict:")
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 25
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("Cubes in target conflict:")
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
            "title": "M09 Tire Flip",
            "description": "The roobt flips tires so their white centers face up and moves them into their large target circle.",
            "objectives": [{
                    "id": "M09_1",
                    "title": "Tires white side up and resting on the mat:",
                    "options": [{
                            "value": "none",
                            "title": "None"
                        },
                        {
                            "value": "light",
                            "title": "Blue"
                        },
                        {
                            "value": "heavy",
                            "title": "Black"
                        },
                        {
                            "value": "both",
                            "title": "Both"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_2",
                    "title": "Tires completely in the large target circle:",
                    "options": [{
                            "value": "none",
                            "title": "None"
                        },
                        {
                            "value": "light",
                            "title": "Blue"
                        },
                        {
                            "value": "heavy",
                            "title": "Black"
                        },
                        {
                            "value": "both",
                            "title": "Both"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_3",
                    "title": "The heavy (black tread) tire crossed the red flip line (even partly) at any time:",
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
            "title": "M10 Cell Phone",
            "description": "The robot flips the cell phone white side up.",
            "objectives": [{
                "id": "M10",
                "title": "The cell phone is white side up and resting on only the mat:",
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
            "title": "M11 Treadmill",
            "description": "The robot spins the rollers to move the pointer as far clockwise as possible. If the robot moves the pointer by touching the pointer, the score is zero.",
            "objectives": [{
                "id": "M11_1",
                "title": "The robot spun the rollers so the pointer points to:",
                "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "gray",
                        "title": "Gray"
                    },
                    {
                        "value": "red",
                        "title": "Red"
                    },
                    {
                        "value": "orange",
                        "title": "Orange"
                    },
                    {
                        "value": "yellow",
                        "title": "Yellow"
                    },
                    {
                        "value": "ltGreen",
                        "title": "Light Green"
                    },
                    {
                        "value": "dkGreen",
                        "title": "Dark Green"
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
            "title": "M12 Row Machine",
            "description": "The robot moves the free wheel out of the large circle and into the small target circle.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "The free wheel is completely outside the large circle:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M12_2",
                    "title": "The free wheel is completely in the small circle:",
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
                    return new Error("Row machine wheel position conflict")
                }
                if (M12_1 === 'yes' && M12_2 === 'yes') {
                    return 30
                }
            }]
        },
        {
            "title": "M13 Weight Machine",
            "description": "The robot moves the lever until the yellow stopper falls. The team selects the machine lever setting before the match. The lever setting is the color under the east face of the east green bar.",
            "objectives": [{
                "id": "M13",
                "title": "The stopper is under the lever and the lever setting is:",
                "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "blue",
                        "title": "Blue"
                    },
                    {
                        "value": "magenta",
                        "title": "Magenta"
                    },
                    {
                        "value": "yellow",
                        "title": "Yellow"
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
            "title": "M14 Health Units",
            "description": "The robot collects heath units from around the field and moves them to target areas. A maximum of 4 units can score by being on the pull-up bar.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Number of health units touching either the RePLAY logo or the gray area around the bench:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 16,
                    "value": null
                },
                {
                    "id": "M14_2",
                    "title": "Number of health units looped over a pull-up bar post and touching no equipment (max of 4):",
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
                    return new Error('Too many health units')
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
                    return new Error("Too many health units")
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
                    return new Error("Too many health units")
                }
                if (M14_1 === '6' && M14_2 === '4') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '7' && M14_2 === '0') {
                    return 35
                }
                if (M14_1 === '7' && M14_2 === '1') {
                    return 45
                }
                if (M14_1 === '7' && M14_2 === '2') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '7' && M14_2 === '3') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '7' && M14_2 === '4') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '8' && M14_2 === '0') {
                    return 40
                }
                if (M14_1 === '8' && M14_2 === '1') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '8' && M14_2 === '2') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '8' && M14_2 === '3') {
                    return new Error("Too many health units")
                }
                if (M14_1 === '8' && M14_2 === '4') {
                    return new Error("Too many health units")
                }
            }]
        },
        {
            "title": "M15 Precision",
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
        "None": "None",
        "Magenta": "Magenta",
        "Yellow": "Yellow",
        "Blue": "Blue",
        "Gray": "Gray",
        "Red": "Red",
        "Orange": "Orange",
        "LtGreen": "Light Green",
        "DkGreen": "Dark Green",
        "M00-name": "M00 Equipment Inspection Bonus",
        "M00-desc": "If all your equipment fits completely in the small inspection space when you get to the match, you get a mission point bonus.",
        "M00-scoring1": "All team equipment fits in the small inspection space:",
        "M01-name": "M01 Innovation Project",
        "M01-desc": "The innovation project is made of at least two white LEGO pieces and measures at least as long as 4 LEGO studs in at least one direction.",
        "M01-scoring1": "The innovation project is large enough (2+ white LEGO pieces and 4+ LEGO studs long):",
        "M01-scoring2": "Part of the innovation project is touching:",
        "M01-logo": "RePLAY Logo",
        "M01-gray": "Bench Gray Area",
        "M02-name": "M02 Step Counter",
        "M02-desc": "The farther the robot slides the step counter, the better.",
        "M02-scoring1": "The bottom of the pointer is on:",
        "M03-name": "M03 Slide",
        "M03-desc": "The robot slides the figures down the slide and moves them to other areas. \\"Off the slide\\" scores if the slide figures's black frame is past/below the tip of the slide's gray part.",
        "M03-scoring1": "Number of slide figures off the slide:",
        "M03-scoring2": "A slide figure is completely in home:",
        "M03-scoring3": "A slide figure is held completely off the mat by the heavy tire and touching nothing else:",
        "M03-error": "Too many slide figures",
        "M04-name": "M04 Bench",
        "M04-desc": "The robot removes the backrest, flattens the bench, and gets cubs into the hopscotch spaces.",
        "M04-scoring1": "The bench is down flat:",
        "M04-scoring2": "Number of hopscotch spaces with cubes touching the mat inside them:",
        "M04-scoring3": "The backrest is completely out of both of its holes:",
        "M05-name": "M05 Basketball",
        "M05-desc": "The robot raises the crate up the post and gets a cube into it.",
        "M05-scoring1": "A cube is in the crate:",
        "M05-scoring2": "The crate rests on the white stopper at height:",
        "M05-middle": "Middle",
        "M05-top": "Top",
        "M06-name": "M06 Pull-Up Bar",
        "M06-desc": "The robot passes completely under the bar at any time. Separately, the robot is held off the mat by the bar at the end of the match.",
        "M06-scoring1": "The robot passed completely through the pull-up bar's upright frame at any time:",
        "M06-scoring2": "The pull-up bar holds 100% of the robot up off the mat at the end of the match:",
        "M07-name": "M07 Robot Dance",
        "M07-desc": "The robot is dancing on the dance floor at the end of the match. Any silly or skilled repetitive action counts as dancing.",
        "M07-scoring1": "The robot's controller is dancing over the dance floor at the end of the match:",
        "M08-name": "M08 Boccia",
        "M08-desc": "Robots send matching colored cubes onto the opposite field.",
        "M08-scoring1": "Both share models have sent only one cube onto the opposing field and those cubes color-match each other :",
        "M08-scoring2": "Number of cubes in the frame or target:",
        "M08-scoring3": "At least one yellow cube is completely in the target:",
        "M08-scoring4": "Any equipment is in the frame (even partly):",
        "M08-error": "Cubes in target conflict:",
        "M09-name": "M09 Tire Flip",
        "M09-desc": "The roobt flips tires so their white centers face up and moves them into their large target circle.",
        "M09-scoring1": "Tires white side up and resting on the mat:",
        "M09-scoring2": "Tires completely in the large target circle:",
        "M09-scoring3": "The heavy (black tread) tire crossed the red flip line (even partly) at any time:",
        "M09-light": "Blue",
        "M09-heavy": "Black",
        "M09-both": "Both",
        "M10-name": "M10 Cell Phone",
        "M10-desc": "The robot flips the cell phone white side up.",
        "M10-scoring1": "The cell phone is white side up and resting on only the mat:",
        "M11-name": "M11 Treadmill",
        "M11-desc": "The robot spins the rollers to move the pointer as far clockwise as possible. If the robot moves the pointer by touching the pointer, the score is zero.",
        "M11-scoring1": "The robot spun the rollers so the pointer points to:",
        "M12-name": "M12 Row Machine",
        "M12-desc": "The robot moves the free wheel out of the large circle and into the small target circle.",
        "M12-scoring1": "The free wheel is completely outside the large circle:",
        "M12-scoring2": "The free wheel is completely in the small circle:",
        "M12-error": "Row machine wheel position conflict",
        "M13-name": "M13 Weight Machine",
        "M13-desc": "The robot moves the lever until the yellow stopper falls. The team selects the machine lever setting before the match. The lever setting is the color under the east face of the east green bar.",
        "M13-scoring1": "The stopper is under the lever and the lever setting is:",
        "M14-name": "M14 Health Units",
        "M14-desc": "The robot collects heath units from around the field and moves them to target areas. A maximum of 4 units can score by being on the pull-up bar.",
        "M14-scoring1": "Number of health units touching either the RePLAY logo or the gray area around the bench:",
        "M14-scoring2": "Number of health units looped over a pull-up bar post and touching no equipment (max of 4):",
        "precision-name": "M15 Precision",
        "precision-desc": "The less often you interrupt the robot outside home, the more points you keep.",
        "precision-scoring": "Number of precision tokens left on the field:",
        "robot-ending-error": "Robot location conflict - cannot be held up in M06 and dancing in M07",
        "cube-error": "Too many cubes",
        "health-unit-error": "Too many health units"
    },
    "rtl": false
})`
export default challenge
