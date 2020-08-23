const challenge = `({
    "title": "CITY SHAPER",
    "missions": [{
            "title": "혜택",
            "description": "로봇이나 모든 장비가 경기 준비중 소형 점검 구역에 모두 들어가면 혜택이 주어집니다.",
            "objectives": [{
                "id": "bonus",
                "title": "로봇과 장비가 소형 점검 구역에 들어 맞는다:",
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
            "title": "M01 높은 지역",
            "description": "브릿지 점수를 얻은 경우에만 깃발 점수를 얻을 수 있습니다. 깃발 점수를 획득하는 동안 로봇이 충돌할 수 있으며 이는 경기에 영향을 주지 않습니다.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "로봇이 브릿지에 의해 지탱되고 있다:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "오직 로봇에 의해서 일정한 거리를 들어올린 깃발의 갯수::",
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
            "title": "M02 크레인",
            "description": "해당되는 항목 모두 점수 획득",
            "objectives": [{
                    "id": "M02_1",
                    "title": "크레인에 걸려있는 파란색 유닛이 가이드홀로부터 명확하게 기준거리이상 내려졌다:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_2",
                    "title": "크레인에 걸려있는 파란색 유닛이 독립적이고 다른 파란색 유닛에의해 지탱되고 있다:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M02_3",
                    "title": "그리고 1층(레벨1)이 완전히 파란색 원안에 위치하고 있다:",
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
                    return new Error('너무 많은 수의 건물 유닛이 사용되었습니다.')
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 0
                }
                if (M02_1 === 'no' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'no') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'no') {
                    return 20
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'no') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
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
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'no' && bonus === 'yes') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
                }
                if (M02_1 === 'no' && M02_2 === 'yes' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'no' && bonus === 'yes') {
                    return 30
                }
                if (M02_1 === 'yes' && M02_2 === 'no' && M02_3 === 'yes' && bonus === 'yes') {
                    return new Error("파란색 유닛의 위치가 서로 맞지 않습니다..")
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
            "title": "M03 점검 드론",
            "description": "점검 드론 미션은 교량 및 기타 고층 건물을 점검할 수있는 저렴한 방법을 보여줍니다. 드론은 몇 시간 동안 비행 할 수 있으며 상세한 사진과 3D 스캔까지 보낼 수 있습니다.",
            "objectives": [{
                "id": "M03_1",
                "title": "점검 드론이 브릿지에 있는 축에 의해 지탱되고 있다:",
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
            "title": "M04 야생동물을 위한 설계",
            "description": "박쥐가 갈색 나뭇가지에 도착해야 합니다.",
            "objectives": [{
                "id": "M04_1",
                "title": "박쥐가 올바른 나뭇가지에의해 지탱되고 있다:",
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
            "title": "M05 나무집",
            "description": "해당되는 항목 모두 점수 획득",
            "objectives": [{
                    "id": "M05_lg",
                    "title": "독립적이고, 큰 나뭇가지에의해 지탱되고 있는 유닛의 갯수:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 17,
                    "value": null
                },
                {
                    "id": "M05_sm",
                    "title": "독립적이고, 작은 나뭇가지에의해 지탱되고 있는 유닛의 갯수:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 17,
                    "value": null
                }
            ],
            "score": [function(M05_lg, M05_sm, bonus, M02_1, M02_2, M12_4) {
                M05_lg = String(M05_lg);
                M05_sm = String(M05_sm);
                bonus = String(bonus);
                if (((M02_1 === 'yes') ? 1 : 0) + ((M02_2 === 'yes') ? 1 : 0) + (M05_lg * 1) + (M05_sm * 1) + (M12_4 * 0.5) > 17) {
                    return new Error('너무 많은 수의 건물 유닛이 사용되었습니다.')
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
                if (M05_lg === '0' && M05_sm === '11' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '0' && M05_sm === '12' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '0' && M05_sm === '13' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '0' && M05_sm === '14' && bonus === 'no') {
                    return 210
                }
                if (M05_lg === '0' && M05_sm === '15' && bonus === 'no') {
                    return 225
                }
                if (M05_lg === '0' && M05_sm === '16' && bonus === 'no') {
                    return 240
                }
                if (M05_lg === '0' && M05_sm === '17' && bonus === 'no') {
                    return 255
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
                if (M05_lg === '1' && M05_sm === '11' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '1' && M05_sm === '12' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '1' && M05_sm === '13' && bonus === 'no') {
                    return 205
                }
                if (M05_lg === '1' && M05_sm === '14' && bonus === 'no') {
                    return 220
                }
                if (M05_lg === '1' && M05_sm === '15' && bonus === 'no') {
                    return 235
                }
                if (M05_lg === '1' && M05_sm === '16' && bonus === 'no') {
                    return 250
                }
                if (M05_lg === '1' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '2' && M05_sm === '11' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '2' && M05_sm === '12' && bonus === 'no') {
                    return 200
                }
                if (M05_lg === '2' && M05_sm === '13' && bonus === 'no') {
                    return 215
                }
                if (M05_lg === '2' && M05_sm === '14' && bonus === 'no') {
                    return 230
                }
                if (M05_lg === '2' && M05_sm === '15' && bonus === 'no') {
                    return 245
                }
                if (M05_lg === '2' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '2' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '3' && M05_sm === '11' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '3' && M05_sm === '12' && bonus === 'no') {
                    return 210
                }
                if (M05_lg === '3' && M05_sm === '13' && bonus === 'no') {
                    return 225
                }
                if (M05_lg === '3' && M05_sm === '14' && bonus === 'no') {
                    return 240
                }
                if (M05_lg === '3' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '4' && M05_sm === '11' && bonus === 'no') {
                    return 205
                }
                if (M05_lg === '4' && M05_sm === '12' && bonus === 'no') {
                    return 220
                }
                if (M05_lg === '4' && M05_sm === '13' && bonus === 'no') {
                    return 235
                }
                if (M05_lg === '4' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '5' && M05_sm === '11' && bonus === 'no') {
                    return 215
                }
                if (M05_lg === '5' && M05_sm === '12' && bonus === 'no') {
                    return 230
                }
                if (M05_lg === '5' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '6' && M05_sm === '11' && bonus === 'no') {
                    return 225
                }
                if (M05_lg === '6' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '7' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
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
                if (M05_lg === '8' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '17' && bonus === 'no') {
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
                if (M05_lg === '9' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '17' && bonus === 'no') {
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
                if (M05_lg === '10' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '0' && bonus === 'no') {
                    return 110
                }
                if (M05_lg === '11' && M05_sm === '1' && bonus === 'no') {
                    return 125
                }
                if (M05_lg === '11' && M05_sm === '2' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '11' && M05_sm === '3' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '11' && M05_sm === '4' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '11' && M05_sm === '5' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '11' && M05_sm === '6' && bonus === 'no') {
                    return 200
                }
                if (M05_lg === '11' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '0' && bonus === 'no') {
                    return 120
                }
                if (M05_lg === '12' && M05_sm === '1' && bonus === 'no') {
                    return 135
                }
                if (M05_lg === '12' && M05_sm === '2' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '12' && M05_sm === '3' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '12' && M05_sm === '4' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '12' && M05_sm === '5' && bonus === 'no') {
                    return 195
                }
                if (M05_lg === '12' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '0' && bonus === 'no') {
                    return 130
                }
                if (M05_lg === '13' && M05_sm === '1' && bonus === 'no') {
                    return 145
                }
                if (M05_lg === '13' && M05_sm === '2' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '13' && M05_sm === '3' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '13' && M05_sm === '4' && bonus === 'no') {
                    return 190
                }
                if (M05_lg === '13' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '0' && bonus === 'no') {
                    return 140
                }
                if (M05_lg === '14' && M05_sm === '1' && bonus === 'no') {
                    return 155
                }
                if (M05_lg === '14' && M05_sm === '2' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '14' && M05_sm === '3' && bonus === 'no') {
                    return 185
                }
                if (M05_lg === '14' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '0' && bonus === 'no') {
                    return 150
                }
                if (M05_lg === '15' && M05_sm === '1' && bonus === 'no') {
                    return 165
                }
                if (M05_lg === '15' && M05_sm === '2' && bonus === 'no') {
                    return 180
                }
                if (M05_lg === '15' && M05_sm === '3' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '0' && bonus === 'no') {
                    return 160
                }
                if (M05_lg === '16' && M05_sm === '1' && bonus === 'no') {
                    return 175
                }
                if (M05_lg === '16' && M05_sm === '2' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '3' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '17' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '0' && bonus === 'no') {
                    return 170
                }
                if (M05_lg === '17' && M05_sm === '1' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '2' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '3' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '4' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '5' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '6' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '7' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '8' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '9' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '10' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '11' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '12' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '13' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '14' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '15' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '16' && bonus === 'no') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '17' && bonus === 'no') {
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
                if (M05_lg === '0' && M05_sm === '11' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '0' && M05_sm === '12' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '0' && M05_sm === '13' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '0' && M05_sm === '14' && bonus === 'yes') {
                    return 215
                }
                if (M05_lg === '0' && M05_sm === '15' && bonus === 'yes') {
                    return 230
                }
                if (M05_lg === '0' && M05_sm === '16' && bonus === 'yes') {
                    return 245
                }
                if (M05_lg === '0' && M05_sm === '17' && bonus === 'yes') {
                    return 260
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
                if (M05_lg === '1' && M05_sm === '11' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '1' && M05_sm === '12' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '1' && M05_sm === '13' && bonus === 'yes') {
                    return 210
                }
                if (M05_lg === '1' && M05_sm === '14' && bonus === 'yes') {
                    return 225
                }
                if (M05_lg === '1' && M05_sm === '15' && bonus === 'yes') {
                    return 240
                }
                if (M05_lg === '1' && M05_sm === '16' && bonus === 'yes') {
                    return 255
                }
                if (M05_lg === '1' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '2' && M05_sm === '11' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '2' && M05_sm === '12' && bonus === 'yes') {
                    return 205
                }
                if (M05_lg === '2' && M05_sm === '13' && bonus === 'yes') {
                    return 220
                }
                if (M05_lg === '2' && M05_sm === '14' && bonus === 'yes') {
                    return 235
                }
                if (M05_lg === '2' && M05_sm === '15' && bonus === 'yes') {
                    return 250
                }
                if (M05_lg === '2' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '2' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '3' && M05_sm === '11' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '3' && M05_sm === '12' && bonus === 'yes') {
                    return 215
                }
                if (M05_lg === '3' && M05_sm === '13' && bonus === 'yes') {
                    return 230
                }
                if (M05_lg === '3' && M05_sm === '14' && bonus === 'yes') {
                    return 245
                }
                if (M05_lg === '3' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '3' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '4' && M05_sm === '11' && bonus === 'yes') {
                    return 210
                }
                if (M05_lg === '4' && M05_sm === '12' && bonus === 'yes') {
                    return 225
                }
                if (M05_lg === '4' && M05_sm === '13' && bonus === 'yes') {
                    return 240
                }
                if (M05_lg === '4' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '4' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '5' && M05_sm === '11' && bonus === 'yes') {
                    return 220
                }
                if (M05_lg === '5' && M05_sm === '12' && bonus === 'yes') {
                    return 235
                }
                if (M05_lg === '5' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '5' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '6' && M05_sm === '11' && bonus === 'yes') {
                    return 230
                }
                if (M05_lg === '6' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '6' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '7' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '7' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
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
                if (M05_lg === '8' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '8' && M05_sm === '17' && bonus === 'yes') {
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
                if (M05_lg === '9' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '9' && M05_sm === '17' && bonus === 'yes') {
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
                if (M05_lg === '10' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '10' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '0' && bonus === 'yes') {
                    return 115
                }
                if (M05_lg === '11' && M05_sm === '1' && bonus === 'yes') {
                    return 130
                }
                if (M05_lg === '11' && M05_sm === '2' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '11' && M05_sm === '3' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '11' && M05_sm === '4' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '11' && M05_sm === '5' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '11' && M05_sm === '6' && bonus === 'yes') {
                    return 205
                }
                if (M05_lg === '11' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '11' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '0' && bonus === 'yes') {
                    return 125
                }
                if (M05_lg === '12' && M05_sm === '1' && bonus === 'yes') {
                    return 140
                }
                if (M05_lg === '12' && M05_sm === '2' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '12' && M05_sm === '3' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '12' && M05_sm === '4' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '12' && M05_sm === '5' && bonus === 'yes') {
                    return 200
                }
                if (M05_lg === '12' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '12' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '0' && bonus === 'yes') {
                    return 135
                }
                if (M05_lg === '13' && M05_sm === '1' && bonus === 'yes') {
                    return 150
                }
                if (M05_lg === '13' && M05_sm === '2' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '13' && M05_sm === '3' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '13' && M05_sm === '4' && bonus === 'yes') {
                    return 195
                }
                if (M05_lg === '13' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '13' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '0' && bonus === 'yes') {
                    return 145
                }
                if (M05_lg === '14' && M05_sm === '1' && bonus === 'yes') {
                    return 160
                }
                if (M05_lg === '14' && M05_sm === '2' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '14' && M05_sm === '3' && bonus === 'yes') {
                    return 190
                }
                if (M05_lg === '14' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '14' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '0' && bonus === 'yes') {
                    return 155
                }
                if (M05_lg === '15' && M05_sm === '1' && bonus === 'yes') {
                    return 170
                }
                if (M05_lg === '15' && M05_sm === '2' && bonus === 'yes') {
                    return 185
                }
                if (M05_lg === '15' && M05_sm === '3' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '15' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '0' && bonus === 'yes') {
                    return 165
                }
                if (M05_lg === '16' && M05_sm === '1' && bonus === 'yes') {
                    return 180
                }
                if (M05_lg === '16' && M05_sm === '2' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '3' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '16' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '0' && bonus === 'yes') {
                    return 175
                }
                if (M05_lg === '17' && M05_sm === '1' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '2' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '3' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '4' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '5' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '6' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '7' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '8' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '9' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '10' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '11' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '12' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '13' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '14' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '15' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '16' && bonus === 'yes') {
                    return new Error("M12-error")
                }
                if (M05_lg === '17' && M05_sm === '17' && bonus === 'yes') {
                    return new Error("M12-error")
                }
            }]
        },
        {
            "title": "M06 교통 체증",
            "description": "교통 체증을 들어올려서 교통을 원할하게 하십시오.",
            "objectives": [{
                "id": "M06_1",
                "title": "교통 체증이 올려진 상태에서 교통 체증이 독립적이고, 힌지에의해서만 지탱되고 있다:",
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
            "title": "M07 그네",
            "description": "그네를 풀어주십시오.",
            "objectives": [{
                "id": "M07_1",
                "title": "그네가 풀려있다:",
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
            "title": "M08 엘리베이터",
            "description": "둘 중 하나의 점수만 획득할 수 있습니다.",
            "objectives": [{
                "id": "M08_1",
                "title": "엘리베이터의 움직이는 부분이 독립적이고, 오직 힌지에의해서만 지탱되고 있으며,다음 상태에 있다.",
                "options": [{
                        "value": "neither",
                        "title": "어느 상태도 아님"
                    },
                    {
                        "value": "car",
                        "title": "파란색 차가 아래에 있음"
                    },
                    {
                        "value": "balanced",
                        "title": "균형잡힘"
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
            "title": "M09 안전 요건",
            "description": "지지하고 있는 빔들 중 몇개가 움직여도 시험용 건물이 서있을 수 있습니까?",
            "objectives": [{
                    "id": "M09_1",
                    "title": "시험용건물이 독립적이고 오직 파란색 빔에의해서만 지탱되고 있다:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M09_2",
                    "title": "적어도 반이상 누워있는 파란색 빔의 개수:",
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
            "title": "M10철골 구조",
            "description": "누워있는 철골구조물을 세우십시오",
            "objectives": [{
                "id": "M10",
                "title": "철골 구조가 서있으며 독립적이고 힌지에의해서만 지탱되고 있다:",
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
            "title": "M11 혁신적인건축",
            "description": "팀만의 건출물을 디자인해 만들고 아무 원으로 옮기십시오.",
            "objectives": [{
                    "id": "M11_1",
                    "title": "팀이 레고브릭으로 만든 유닛이 파란색 빌딩유닛보다 크다:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M11_2",
                    "title": "그 유닛이 원안에 있다:",
                    "options": [{
                            "value": "no",
                            "title": "아니오"
                        },
                        {
                            "value": "partly",
                            "title": "부분적으로"
                        },
                        {
                            "value": "completely",
                            "title": "완전히"
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
            "title": "M12 설계와 만들기",
            "description": "파란 원은 미션 12에 속하지 않습니다.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "완전히 원안에 위치하고 매트위에 편평하게 닿아있는 유닛과 색이 일치하는 원의 갯수:",
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
                    "default": "1"
                },
                {
                    "id": "M12_4",
                    "title": "적어도 부분적으로 원안에 있는 독립적인 스택들의 층수의 합:",
                    "type": "number",
                    "default": 1,
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
                    return new Error('너무 많은 수의 건물 유닛이 사용되었습니다.')
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
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
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
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'no') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'no') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
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
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'no') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'no') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'no') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'no') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
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
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
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
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '2' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '2' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
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
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '1' && bonus === 'yes') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '2' && bonus === 'yes') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '3' && bonus === 'yes') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
                }
                if (M12_1 === '3' && M12_4 === '4' && bonus === 'yes') {
                    return new Error("원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다.")
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
            "title": "M13 환경 보존 구조 개선물",
            "description": "스택 1개당 오직 한개의 환경 보존 구조 개선물(태양 전지판, 지붕정원, 단열) 만이 유효합니다.",
            "objectives": [{
                "id": "M13",
                "title": "부분적으로 원안에 있고 독립적이고 스택에의해서만 지탱되고 있는 구조 개선물의 갯수::",
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
            "title": "M14 정확성",
            "description": "로봇을 중단하고 다시 시작하도록 할 수 있지만 한번의 중단으로 인해 1개의 정밀 토큰을 잃습니다.",
            "objectives": [{
                "id": "precision",
                "title": "경기장에 남아있는 정밀토큰의 갯수:",
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
        "yes": "예",
        "no": "아니오",
        "advantage-name": "혜택",
        "advantage-desc": "로봇이나 모든 장비가 경기 준비중 소형 점검 구역에 모두 들어가면 혜택이 주어집니다.",
        "advantage-scoring": "로봇과 장비가 소형 점검 구역에 들어 맞는다:",
        "M01-name": "M01 높은 지역",
        "M01-desc": "브릿지 점수를 얻은 경우에만 깃발 점수를 얻을 수 있습니다. 깃발 점수를 획득하는 동안 로봇이 충돌할 수 있으며 이는 경기에 영향을 주지 않습니다.",
        "M01-scoring1": "로봇이 브릿지에 의해 지탱되고 있다:",
        "M01-scoring2": "오직 로봇에 의해서 일정한 거리를 들어올린 깃발의 갯수::",
        "M02-name": "M02 크레인",
        "M02-desc": "해당되는 항목 모두 점수 획득",
        "M02-scoring1": "크레인에 걸려있는 파란색 유닛이 가이드홀로부터 명확하게 기준거리이상 내려졌다:",
        "M02-scoring2": "크레인에 걸려있는 파란색 유닛이 독립적이고 다른 파란색 유닛에의해 지탱되고 있다:",
        "M02-scoring3": "그리고 1층(레벨1)이 완전히 파란색 원안에 위치하고 있다:",
        "M03-name": "M03 점검 드론",
        "M03-desc": "점검 드론 미션은 교량 및 기타 고층 건물을 점검할 수있는 저렴한 방법을 보여줍니다. 드론은 몇 시간 동안 비행 할 수 있으며 상세한 사진과 3D 스캔까지 보낼 수 있습니다.",
        "M03-scoring1": "점검 드론이 브릿지에 있는 축에 의해 지탱되고 있다:",
        "M04-name": "M04 야생동물을 위한 설계",
        "M04-desc": "박쥐가 갈색 나뭇가지에 도착해야 합니다.",
        "M04-scoring1": "박쥐가 올바른 나뭇가지에의해 지탱되고 있다:",
        "M05-name": "M05 나무집",
        "M05-desc": "해당되는 항목 모두 점수 획득",
        "M05-scoring1": "독립적이고, 큰 나뭇가지에의해 지탱되고 있는 유닛의 갯수:",
        "M05-scoring2": "독립적이고, 작은 나뭇가지에의해 지탱되고 있는 유닛의 갯수:",
        "M06-name": "M06 교통 체증",
        "M06-desc": "교통 체증을 들어올려서 교통을 원할하게 하십시오.",
        "M06-scoring1": "교통 체증이 올려진 상태에서 교통 체증이 독립적이고, 힌지에의해서만 지탱되고 있다:",
        "M07-name": "M07 그네",
        "M07-desc": "그네를 풀어주십시오.",
        "M07-scoring1": "그네가 풀려있다:",
        "M08-name": "M08 엘리베이터",
        "M08-desc": "둘 중 하나의 점수만 획득할 수 있습니다.",
        "M08-scoring1": "엘리베이터의 움직이는 부분이 독립적이고, 오직 힌지에의해서만 지탱되고 있으며,다음 상태에 있다.",
        "M08-scoring2": "어느 상태도 아님",
        "M08-scoring3": "파란색 차가 아래에 있음",
        "M08-scoring4": "균형잡힘",
        "M09-name": "M09 안전 요건",
        "M09-desc": "지지하고 있는 빔들 중 몇개가 움직여도 시험용 건물이 서있을 수 있습니까?",
        "M09-scoring1": "시험용건물이 독립적이고 오직 파란색 빔에의해서만 지탱되고 있다:",
        "M09-scoring2": "적어도 반이상 누워있는 파란색 빔의 개수:",
        "M10-name": "M10철골 구조",
        "M10-desc": "누워있는 철골구조물을 세우십시오",
        "M10-scoring": "철골 구조가 서있으며 독립적이고 힌지에의해서만 지탱되고 있다:",
        "M11-name": "M11 혁신적인건축",
        "M11-desc": "팀만의 건출물을 디자인해 만들고 아무 원으로 옮기십시오.",
        "M11-scoring1": "팀이 레고브릭으로 만든 유닛이 파란색 빌딩유닛보다 크다:",
        "M11-scoring2": "그 유닛이 원안에 있다:",
        "M11-scoring3": "아니오",
        "M11-scoring4": "부분적으로",
        "M11-scoring5": "완전히",
        "M12-name": "M12 설계와 만들기",
        "M12-desc": "파란 원은 미션 12에 속하지 않습니다.",
        "M12-scoring1": "완전히 원안에 위치하고 매트위에 편평하게 닿아있는 유닛과 색이 일치하는 원의 갯수:",
        "M12-scoring4": "적어도 부분적으로 원안에 있는 독립적인 스택들의 층수의 합:",
        "M13-name": "M13 환경 보존 구조 개선물",
        "M13-desc": "스택 1개당 오직 한개의 환경 보존 구조 개선물(태양 전지판, 지붕정원, 단열) 만이 유효합니다.",
        "M13-scoring": "부분적으로 원안에 있고 독립적이고 스택에의해서만 지탱되고 있는 구조 개선물의 갯수::",
        "precision-name": "M14 정확성",
        "precision-desc": "로봇을 중단하고 다시 시작하도록 할 수 있지만 한번의 중단으로 인해 1개의 정밀 토큰을 잃습니다.",
        "precision-scoring": "경기장에 남아있는 정밀토큰의 갯수:",
        "building-unit-error": "너무 많은 수의 건물 유닛이 사용되었습니다.",
        "crane-error": "파란색 유닛의 위치가 서로 맞지 않습니다..",
        "M12-error2": "원의 색상과 일치하는 유닛의 수에 비해 높이가 너무 작습니다."
    },
    "rtl": false
})`
export default challenge
