{
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 Space Travel",
            "description": "*Send payload rockets rolling down the Space Travel Ramp and must be *Independent by the time they reach the first track connection.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "Vehicle Payload rolled past first track connection",
                    "type": "yesno"
                },
                {
                    "id": "M01_2",
                    "title": "Supply Payload rolled past first track connection",
                    "type": "yesno"
                },
                {
                    "id": "M01_3",
                    "title": "Crew Payload rolled past first track connection",
                    "type": "yesno"
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
            "title": "M02 Solar Panel Array",
            "description": "Angle Solar Panels toward you or away from you.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Both Solar Panels are angled toward the same Field",
                    "type": "yesno"
                },
                {
                    "id": "M02_2",
                    "title": "Your Solar Panel is angled toward the other team’s Field",
                    "type": "yesno"
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
            "title": "M03 3D Printing",
            "description": "Place a Regolith Core Sample in the 3D printer.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "2x4 Brick is ejected (due only to a Regolith Core Sample in the 3D Printer)",
                    "type": "yesno"
                },
                {
                    "id": "M03_2",
                    "title": "2x4 Brick is completely in Northeast Planet Area",
                    "type": "yesno"
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
            "title": "M04 Crater Crossing",
            "description": "The Robot or an agent-craft that was sent out needs to cross the Craters Model completely, by driving directly over it.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "All weight-bearing features of crossing equipment crossed completely between towers",
                    "type": "yesno"
                },
                {
                    "id": "M04_2",
                    "title": "All crossing equipment crossed from east to west, completely past the flattened Gate",
                    "type": "yesno"
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
            "title": "M05 Extraction",
            "description": "The Robot needs to get all the Core Samples out of the Core Site Model, and deliver them.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "All four Core Samples are no longer touching axle of Core Site Model",
                    "type": "yesno"
                },
                {
                    "id": "M05_2",
                    "title": "Gas Core Sample is touching the Mat and completely in Lander’s Target Circle",
                    "type": "yesno"
                },
                {
                    "id": "M05_3",
                    "title": "-OR- Gas Core Sample is completely in Base",
                    "type": "yesno"
                },
                {
                    "id": "M05_4",
                    "title": "Water Core Sample is supported only by the Food Growth Chamber",
                    "type": "yesno"
                }
            ],
            "score": [function(M05_1, M05_2, M05_3, M05_4) {
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'no' && M05_4 === 'no') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'no' && M05_4 === 'no') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'yes' && M05_4 === 'no') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'yes' && M05_4 === 'no') {
                    return new Error("Error: Gas Core Sample location")
                }
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'no' && M05_4 === 'yes') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'no' && M05_4 === 'yes') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'no' && M05_3 === 'yes' && M05_4 === 'yes') {
                    return 0
                }
                if (M05_1 === 'no' && M05_2 === 'yes' && M05_3 === 'yes' && M05_4 === 'yes') {
                    return new Error("Error: Gas Core Sample location")
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
                    return new Error("Error: Gas Core Sample location")
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
                    return new Error("Error: Gas Core Sample location")
                }
            }]
        },
        {
            "title": "M06 Space Station Modules",
            "description": "Remove and insert Modules among the Habitation Hub’s port holes.  *Inserted Modules must not be touching anything except the Habitation Hub.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "Cone Module is completely in Base",
                    "type": "yesno"
                },
                {
                    "id": "M06_2",
                    "title": "Tube Module is in west port of the Habitation Hub",
                    "type": "yesno"
                },
                {
                    "id": "M06_3",
                    "title": "Dock Module is in east port of the Habitation Hub",
                    "type": "yesno"
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
            "title": "M07 Space Walk Emergency",
            "description": "Get Astronaut Gerhard’s body into the Airlock Chamber.",
            "objectives": [{
                "id": "M07",
                "title": "Astronaut “Gerhard” is in the Habitation Hub’s Airlock Chamber:",
                "options": [{
                        "value": "none",
                        "title": "No"
                    },
                    {
                        "value": "partially",
                        "title": "Partly"
                    },
                    {
                        "value": "completely",
                        "title": "Completely"
                    }
                ],
                "type": "enum"
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
            "title": "M08 Aerobic Exercise",
            "description": "Move one or both of the Exercise Machine’s Handle Assemblies to make the Pointer advance.  (If the Pointer is partly covering either of the gray or orange end borders, select that color.)",
            "objectives": [{
                "id": "M08",
                "title": "Exercise pointer tip is in (due only to moving one or both Handle Assemblies):",
                "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "gray",
                        "title": "Gray"
                    },
                    {
                        "value": "white",
                        "title": "White"
                    },
                    {
                        "value": "orange",
                        "title": "Orange"
                    }
                ],
                "type": "enum"
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
            "title": "M09 Strength Exercise",
            "description": "Lift the Strength Bar to scoring height.",
            "objectives": [{
                "id": "M09",
                "title": "Strength Bar is lifted so that the tooth-strip's 4th hole is at least partly in view.",
                "type": "yesno"
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
            "title": "M10 Food Production",
            "description": "Move the Push Bar at the right distance at the right speed, to get into the green scoring range.",
            "objectives": [{
                "id": "M10",
                "title": "Gray weight is dropped after green, but before tan (due only to moving the Push Bar.)",
                "type": "yesno"
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
            "title": "M11 Escape Velocity",
            "description": "Impact the Strike Pad hard enough to keep the spacecraft from dropping back down.",
            "objectives": [{
                "id": "M11",
                "title": "Spacecraft stays up (due only to pressing/hitting the Strike Pad)",
                "type": "yesno"
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
            "title": "M12 Satellite Orbits",
            "description": "Move one or more Satellites to the Outer Orbit.",
            "objectives": [{
                "id": "M12",
                "title": "Satellites on or above the area between the two lines of Outer Orbit:",
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
                "type": "enum"
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
            "title": "M13 Observatory",
            "description": "Rotate the Observatory to a precise direction.  (If the Pointer is partly covering either of the gray or orange end borders, select that color.)",
            "objectives": [{
                "id": "M13",
                "title": "The Observatory pointer tip is in:",
                "options": [{
                        "value": "none",
                        "title": "None"
                    },
                    {
                        "value": "gray",
                        "title": "Gray"
                    },
                    {
                        "value": "white",
                        "title": "White"
                    },
                    {
                        "value": "orange",
                        "title": "Orange"
                    }
                ],
                "type": "enum"
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
            "title": "M14 Meteroid Deflection",
            "description": "From west of the Free-Line, send one or both Meteoroids Independently to the Meteoroid catcher.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Meteoroids touching the Mat and in the Center Section:",
                    "options": [{
                            "value": "2",
                            "title": "2"
                        },
                        {
                            "value": "1",
                            "title": "1"
                        },
                        {
                            "value": "0",
                            "title": "0"
                        }
                    ],
                    "type": "enum"
                },
                {
                    "id": "M14_2",
                    "title": "Meteoroids touching the Mat and in Either Side Section:",
                    "options": [{
                            "value": "2",
                            "title": "2"
                        },
                        {
                            "value": "1",
                            "title": "1"
                        },
                        {
                            "value": "0",
                            "title": "0"
                        }
                    ],
                    "type": "enum"
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
                    return new Error("Impossible combination.  Too Many Meteroids")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Impossible combination.  Too Many Meteroids")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Impossible combination.  Too Many Meteroids")
                }
            }]
        },
        {
            "title": "M15 Lander Touch-Down",
            "description": "Get the Lander to one of its targets intact, or at least get it to Base.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "Lander is intact and touching the Mat",
                    "type": "yesno"
                },
                {
                    "id": "M15_2",
                    "title": "Lander is completely in:",
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
                            "title": "Northeast Planet Area"
                        },
                        {
                            "value": "circle",
                            "title": "Target Circle"
                        }
                    ],
                    "type": "enum"
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
            "title": "Penalties",
            "description": "Penalties given",
            "objectives": [{
                "id": "penalties",
                "title": "Number of Penalty Discs in the southeast triangle:",
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
                "type": "enum"
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
        "yes": "Yes",
        "no": "No",
        "M01-name": "M01 Space Travel",
        "M01-desc": "*Send payload rockets rolling down the Space Travel Ramp and must be *Independent by the time they reach the first track connection.",
        "M01-scoring1": "Vehicle Payload rolled past first track connection",
        "M01-scoring2": "Supply Payload rolled past first track connection",
        "M01-scoring3": "Crew Payload rolled past first track connection",
        "M02-name": "M02 Solar Panel Array",
        "M02-desc": "Angle Solar Panels toward you or away from you.",
        "M02-scoring1": "Both Solar Panels are angled toward the same Field",
        "M02-scoring2": "Your Solar Panel is angled toward the other team’s Field",
        "M03-name": "M03 3D Printing",
        "M03-desc": "Place a Regolith Core Sample in the 3D printer.",
        "M03-scoring1": "2x4 Brick is ejected (due only to a Regolith Core Sample in the 3D Printer)",
        "M03-scoring2": "2x4 Brick is completely in Northeast Planet Area",
        "M04-name": "M04 Crater Crossing",
        "M04-desc": "The Robot or an agent-craft that was sent out needs to cross the Craters Model completely, by driving directly over it.",
        "M04-scoring1": "All weight-bearing features of crossing equipment crossed completely between towers",
        "M04-scoring2": "All crossing equipment crossed from east to west, completely past the flattened Gate",
        "M05-name": "M05 Extraction",
        "M05-desc": "The Robot needs to get all the Core Samples out of the Core Site Model, and deliver them.",
        "M05-scoring1": "All four Core Samples are no longer touching axle of Core Site Model",
        "M05-scoring2": "Gas Core Sample is touching the Mat and completely in Lander’s Target Circle",
        "M05-scoring3": "-OR- Gas Core Sample is completely in Base",
        "M05-scoring4": "Water Core Sample is supported only by the Food Growth Chamber",
        "M05-error": "Error: Gas Core Sample location",
        "M06-name": "M06 Space Station Modules",
        "M06-desc": "Remove and insert Modules among the Habitation Hub’s port holes.  *Inserted Modules must not be touching anything except the Habitation Hub.",
        "M06-scoring1": "Cone Module is completely in Base",
        "M06-scoring2": "Tube Module is in west port of the Habitation Hub",
        "M06-scoring3": "Dock Module is in east port of the Habitation Hub",
        "M07-name": "M07 Space Walk Emergency",
        "M07-desc": "Get Astronaut Gerhard’s body into the Airlock Chamber.",
        "M07-scoring": "Astronaut “Gerhard” is in the Habitation Hub’s Airlock Chamber:",
        "M07-scoring1": "No",
        "M07-scoring2": "Partly",
        "M07-scoring3": "Completely",
        "M08-name": "M08 Aerobic Exercise",
        "M08-desc": "Move one or both of the Exercise Machine’s Handle Assemblies to make the Pointer advance.  (If the Pointer is partly covering either of the gray or orange end borders, select that color.)",
        "M08-scoring": "Exercise pointer tip is in (due only to moving one or both Handle Assemblies):",
        "M08-scoring1": "None",
        "M08-scoring2": "Gray",
        "M08-scoring3": "White",
        "M08-scoring4": "Orange",
        "M09-name": "M09 Strength Exercise",
        "M09-desc": "Lift the Strength Bar to scoring height.",
        "M09-scoring": "Strength Bar is lifted so that the tooth-strip's 4th hole is at least partly in view.",
        "M10-name": "M10 Food Production",
        "M10-desc": "Move the Push Bar at the right distance at the right speed, to get into the green scoring range.",
        "M10-scoring": "Gray weight is dropped after green, but before tan (due only to moving the Push Bar.)",
        "M11-name": "M11 Escape Velocity",
        "M11-desc": "Impact the Strike Pad hard enough to keep the spacecraft from dropping back down.",
        "M11-scoring": "Spacecraft stays up (due only to pressing/hitting the Strike Pad)",
        "M12-name": "M12 Satellite Orbits",
        "M12-desc": "Move one or more Satellites to the Outer Orbit.",
        "M12-scoring": "Satellites on or above the area between the two lines of Outer Orbit:",
        "M13-name": "M13 Observatory",
        "M13-desc": "Rotate the Observatory to a precise direction.  (If the Pointer is partly covering either of the gray or orange end borders, select that color.)",
        "M13-scoring": "The Observatory pointer tip is in:",
        "M13-scoring1": "None",
        "M13-scoring2": "Gray",
        "M13-scoring3": "White",
        "M13-scoring4": "Orange",
        "M14-name": "M14 Meteroid Deflection",
        "M14-desc": "From west of the Free-Line, send one or both Meteoroids Independently to the Meteoroid catcher.",
        "M14-scoring1": "Meteoroids touching the Mat and in the Center Section:",
        "M14-scoring2": "Meteoroids touching the Mat and in Either Side Section:",
        "M14-error": "Impossible combination.  Too Many Meteroids",
        "M15-name": "M15 Lander Touch-Down",
        "M15-desc": "Get the Lander to one of its targets intact, or at least get it to Base.",
        "M15-scoring1": "Lander is intact and touching the Mat",
        "M15-scoring2": "Lander is completely in:",
        "M15-scoring3": "None",
        "M15-scoring4": "Base",
        "M15-scoring5": "Northeast Planet Area",
        "M15-scoring6": "Target Circle",
        "penalties-name": "Penalties",
        "penalties-desc": "Penalties given",
        "penalties-scoring": "Number of Penalty Discs in the southeast triangle:"
    },
    "rtl": false
}
