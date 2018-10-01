{
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 太空旅行",
            "description": "*運送每個飛船裝備小車，使它明顯地在 太空旅遊斜坡滾下。 每次運送的時候，裝備小車*在觸及第一 個軌道連接位前，必需是「不受干擾」的。",
            "objectives": [{
                    "id": "M01_1",
                    "title": "太空載具滾過了第一個軌道連接位",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "補給品滾過了第一個軌道連接位",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "機組人員太空載具的滾過了第一個軌道連接位",
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
            "title": "M02 太陽能板排序",
            "description": "太陽能板的角度被調至向著你們或對方的場地傾斜。",
            "objectives": [{
                    "id": "M02_1",
                    "title": "兩塊太陽能板向著同一個場框傾斜設置",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "你們的太陽能板向著對方場框傾斜設置",
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
            "title": "M03 3D 打印",
            "description": "*把表岩屑核心樣本放進3D打印機，使2x4 LEGO磚跌出來。",
            "objectives": [{
                    "id": "M03_1",
                    "title": "2x4 LEGO磚跌了出來 (僅透過把表岩屑核心樣本放進3D打印機而完成)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "2x4 LEGO磚跌了出來，並完全進入東北邊的星球位置",
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
            "title": "M04 跨過隕石坑",
            "description": "機械人或由它發出用來完成任務的裝置，需要完全跨過隕石坑模型。它需要直接在上面駕過，不是在模型附近，亦不是環繞這個模型。",
            "objectives": [{
                    "id": "M04_1",
                    "title": "用來越過隕石坑的配件，它所有含重量的部份，必需*完全在塔間跨越。",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "所有用來越過隕石坑的配件從東面「跨越」到西面，並且完全越過放平了的閘。",
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
            "title": "M05 抽取樣本",
            "description": "機械人需要由核心樣本位置模型取得所有核心樣本，然後可以按這裡或按M03的描述，完成不同任務的選項。",
            "objectives": [{
                    "id": "M05_1",
                    "title": "四個星球核心樣本都不再接觸用作固定他們在樣本位置模型的軸心",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "氣體樣本完全進入登陸器目標區域並接觸場地墊",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-或- 氣體樣本完全進入基地",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "水樣本放到食物生產室，並只由食物生產室來支撐",
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
                    return new Error("氣體樣本位置")
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
                    return new Error("氣體樣本位置")
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
                    return new Error("氣體樣本位置")
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
                    return new Error("氣體樣本位置")
                }
            }]
        },
        {
            "title": "M06 組裝太空站",
            "description": "機械人需要於居住艙的端口，移離及插入不同的組件，且插入的組件不能接觸居住艙以外的任何物件。",
            "objectives": [{
                    "id": "M06_1",
                    "title": "動圓錐體組件完全進入基地",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "管道組件在居住艙的西邊端口",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "插座組件在居住艙的東邊端口",
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
            "title": "M07 拯救太空人",
            "description": "機械人需要將太空人格哈德的身體帶到密封艙。",
            "objectives": [{
                "id": "M07",
                "title": "太空人格哈德在居住艙內的密封艙:",
                "options": [{
                        "value": "none",
                        "title": "沒有進入"
                    },
                    {
                        "value": "partially",
                        "title": "部份進入"
                    },
                    {
                        "value": "completely",
                        "title": "完全進入"
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
            "title": "M08 帶氧運動",
            "description": "機械人需要重覆移動一個或兩個的運動機手把，令指針向前移動。(如果指針部份遮蓋灰色或橙色區域的邊界，判斷為進入該顏色區域。)",
            "objectives": [{
                "id": "M08",
                "title": "指針位置(僅限於移動一個或兩個手把，而使指針向前進。):",
                "options": [{
                        "value": "none",
                        "title": "沒有進入"
                    },
                    {
                        "value": "gray",
                        "title": "灰色"
                    },
                    {
                        "value": "white",
                        "title": "白色"
                    },
                    {
                        "value": "orange",
                        "title": "橙色"
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
            "title": "M09 力量訓練",
            "description": "機械人需要將力量杆推高至得分高度。",
            "objectives": [{
                "id": "M09",
                "title": "力量槓升起，齒條上的第四個孔，最少有部份越過標記位置。",
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
            "title": "M10 製作食物",
            "description": "使用一個合適的速度把推杆推至合適距離，以達到綠色的得分位置。",
            "objectives": [{
                "id": "M10",
                "title": "灰色負重物在轉到綠色標記後，但啡色標記前跌下來(僅限於移動推杆來轉動食物生產室的顏色標記。)",
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
            "title": "M11 離開星球",
            "description": "機械人需要有足夠力量，使發射台能把太空船升高而沒有跌回來。",
            "objectives": [{
                "id": "M11",
                "title": "太空船停留在高處(僅限於透過按下/擊打發射台來完成。)",
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
            "title": "M12 衛星軌道",
            "description": "機械人需要移動一個或多個衞星到外圍的軌道。",
            "objectives": [{
                "id": "M12",
                "title": "衞星的任何部份落在/凌空在外圍的兩條軌道線中間的範圍上:",
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
            "title": "M13 天文台",
            "description": "將天文台轉動至一個準確位置。(如果指針部份遮蓋灰色或橙色區域的邊界，判斷為進入該顏色區域。)",
            "objectives": [{
                "id": "M13",
                "title": "天文台指針位置:",
                "options": [{
                        "value": "none",
                        "title": "沒有進入"
                    },
                    {
                        "value": "gray",
                        "title": "灰色"
                    },
                    {
                        "value": "white",
                        "title": "白色"
                    },
                    {
                        "value": "orange",
                        "title": "橙色"
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
            "title": "M14 擋走流星體",
            "description": "由分界線的西邊，沒有干擾的情況下，發送一個或兩個的流星體到流星體收集器。",
            "objectives": [{
                    "id": "M14_1",
                    "title": "流星體接觸場地墊，並在收集器中間部份:",
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
                    "title": "流星體接觸場地墊，並在收集器在側邊部份:",
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
                    return new Error("不可能的組合。 太多的流星體")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("不可能的組合。 太多的流星體")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("不可能的組合。 太多的流星體")
                }
            }]
        },
        {
            "title": "M15 登陸器著陸",
            "description": "使登陸器完整地到達其中一個目標圓圈位置，或至少到達基地。",
            "objectives": [{
                    "id": "M15_1",
                    "title": "登陸器完整並且接觸場地紙",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "登陸器完全進入:",
                    "options": [{
                            "value": "no",
                            "title": "沒有進入"
                        },
                        {
                            "value": "base",
                            "title": "基地"
                        },
                        {
                            "value": "planet",
                            "title": "東北邊星球範圍"
                        },
                        {
                            "value": "circle",
                            "title": "目標圓圈位置"
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
            "title": "拯救懲罰",
            "description": "你們可以用手拯救機械人，但這樣會構成懲罰。",
            "objectives": [{
                "id": "penalties",
                "title": "東南方的三角形區內懲罰圓磚的數量",
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
        "yes": "是",
        "no": "否",
        "M01-name": "M01 太空旅行",
        "M01-desc": "*運送每個飛船裝備小車，使它明顯地在 太空旅遊斜坡滾下。 每次運送的時候，裝備小車*在觸及第一 個軌道連接位前，必需是「不受干擾」的。",
        "M01-scoring1": "太空載具滾過了第一個軌道連接位",
        "M01-scoring2": "補給品滾過了第一個軌道連接位",
        "M01-scoring3": "機組人員太空載具的滾過了第一個軌道連接位",
        "M02-name": "M02 太陽能板排序",
        "M02-desc": "太陽能板的角度被調至向著你們或對方的場地傾斜。",
        "M02-scoring1": "兩塊太陽能板向著同一個場框傾斜設置",
        "M02-scoring2": "你們的太陽能板向著對方場框傾斜設置",
        "M03-name": "M03 3D 打印",
        "M03-desc": "*把表岩屑核心樣本放進3D打印機，使2x4 LEGO磚跌出來。",
        "M03-scoring1": "2x4 LEGO磚跌了出來 (僅透過把表岩屑核心樣本放進3D打印機而完成)",
        "M03-scoring2": "2x4 LEGO磚跌了出來，並完全進入東北邊的星球位置",
        "M04-name": "M04 跨過隕石坑",
        "M04-desc": "機械人或由它發出用來完成任務的裝置，需要完全跨過隕石坑模型。它需要直接在上面駕過，不是在模型附近，亦不是環繞這個模型。",
        "M04-scoring1": "用來越過隕石坑的配件，它所有含重量的部份，必需*完全在塔間跨越。",
        "M04-scoring2": "所有用來越過隕石坑的配件從東面「跨越」到西面，並且完全越過放平了的閘。",
        "M05-name": "M05 抽取樣本",
        "M05-desc": "機械人需要由核心樣本位置模型取得所有核心樣本，然後可以按這裡或按M03的描述，完成不同任務的選項。",
        "M05-scoring1": "四個星球核心樣本都不再接觸用作固定他們在樣本位置模型的軸心",
        "M05-scoring2": "氣體樣本完全進入登陸器目標區域並接觸場地墊",
        "M05-scoring3": "-或- 氣體樣本完全進入基地",
        "M05-scoring4": "水樣本放到食物生產室，並只由食物生產室來支撐",
        "M05-error": "氣體樣本位置",
        "M06-name": "M06 組裝太空站",
        "M06-desc": "機械人需要於居住艙的端口，移離及插入不同的組件，且插入的組件不能接觸居住艙以外的任何物件。",
        "M06-scoring1": "動圓錐體組件完全進入基地",
        "M06-scoring2": "管道組件在居住艙的西邊端口",
        "M06-scoring3": "插座組件在居住艙的東邊端口",
        "M07-name": "M07 拯救太空人",
        "M07-desc": "機械人需要將太空人格哈德的身體帶到密封艙。",
        "M07-scoring": "太空人格哈德在居住艙內的密封艙:",
        "M07-scoring1": "沒有進入",
        "M07-scoring2": "部份進入",
        "M07-scoring3": "完全進入",
        "M08-name": "M08 帶氧運動",
        "M08-desc": "機械人需要重覆移動一個或兩個的運動機手把，令指針向前移動。(如果指針部份遮蓋灰色或橙色區域的邊界，判斷為進入該顏色區域。)",
        "M08-scoring": "指針位置(僅限於移動一個或兩個手把，而使指針向前進。):",
        "M08-scoring1": "沒有進入",
        "M08-scoring2": "灰色",
        "M08-scoring3": "白色",
        "M08-scoring4": "橙色",
        "M09-name": "M09 力量訓練",
        "M09-desc": "機械人需要將力量杆推高至得分高度。",
        "M09-scoring": "力量槓升起，齒條上的第四個孔，最少有部份越過標記位置。",
        "M10-name": "M10 製作食物",
        "M10-desc": "使用一個合適的速度把推杆推至合適距離，以達到綠色的得分位置。",
        "M10-scoring": "灰色負重物在轉到綠色標記後，但啡色標記前跌下來(僅限於移動推杆來轉動食物生產室的顏色標記。)",
        "M11-name": "M11 離開星球",
        "M11-desc": "機械人需要有足夠力量，使發射台能把太空船升高而沒有跌回來。",
        "M11-scoring": "太空船停留在高處(僅限於透過按下/擊打發射台來完成。)",
        "M12-name": "M12 衛星軌道",
        "M12-desc": "機械人需要移動一個或多個衞星到外圍的軌道。",
        "M12-scoring": "衞星的任何部份落在/凌空在外圍的兩條軌道線中間的範圍上:",
        "M13-name": "M13 天文台",
        "M13-desc": "將天文台轉動至一個準確位置。(如果指針部份遮蓋灰色或橙色區域的邊界，判斷為進入該顏色區域。)",
        "M13-scoring": "天文台指針位置:",
        "M13-scoring1": "沒有進入",
        "M13-scoring2": "灰色",
        "M13-scoring3": "白色",
        "M13-scoring4": "橙色",
        "M14-name": "M14 擋走流星體",
        "M14-desc": "由分界線的西邊，沒有干擾的情況下，發送一個或兩個的流星體到流星體收集器。",
        "M14-scoring1": "流星體接觸場地墊，並在收集器中間部份:",
        "M14-scoring2": "流星體接觸場地墊，並在收集器在側邊部份:",
        "M14-error": "不可能的組合。 太多的流星體",
        "M15-name": "M15 登陸器著陸",
        "M15-desc": "使登陸器完整地到達其中一個目標圓圈位置，或至少到達基地。",
        "M15-scoring1": "登陸器完整並且接觸場地紙",
        "M15-scoring2": "登陸器完全進入:",
        "M15-scoring3": "沒有進入",
        "M15-scoring4": "基地",
        "M15-scoring5": "東北邊星球範圍",
        "M15-scoring6": "目標圓圈位置",
        "penalties-name": "拯救懲罰",
        "penalties-desc": "你們可以用手拯救機械人，但這樣會構成懲罰。",
        "penalties-scoring": "東南方的三角形區內懲罰圓磚的數量"
    },
    "rtl": false
}
