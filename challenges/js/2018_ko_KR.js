{
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 우주여행",
            "description": "＊\t각각의 페이로드 로켓을 명백히 우주여행 경사로로 굴려 내려 보냅니다. 각각의 출발과 이동을 할 때 * 수레는 첫번째 트렉 연결부위를 지날 때 독립적이어야 합니다.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "탐사차량 페이로드가 첫번째 트랙 연결부위를 지나갔습니다",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "물자 페이로드가 첫번째 트랙 연결부위를 지나갔습니다",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "승무원 페이로드가 첫번째 트랙 연결부위를 지나갔습니다",
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
            "title": "M02 태양전지판 배열",
            "description": "태양전지판이 여러분쪽 또는 여러분과 멀어지는 쪽으로 기울어져야 합니다.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "두개의 태양전지판이 같은 경기장쪽으로 기울어 졌습니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "여러분의 태양전지판이 상대팀쪽으로 기울어 졌습니다.",
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
            "title": "M03 3D 프린팅",
            "description": "* 레골리스 코어 샘플을 3D프린터에 넣어 2x4 브릭을 방출시킵니다.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "2x4 브릭이 방출되었습니다.(3D프린터에 레골리스 코어샘플을 넣는 것에 의해서만)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "2x4 브릭이 북동쪽 행성구역안에 완전히 들어가 있습니다.",
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
            "title": "M04 크레이터 건너기",
            "description": "로봇 또는 로봇으로 부터 내보내진 이동체가 크레이터 모형을 완전히 가로질러 그 위로 달려 넘어갑니다. 근처로 가거나 둘러서 가서는 안됩니다.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "크레이터를 건너는 장비의 무게를 지탱하는 모든 부분이 *완전히 두개의 타워 사이로 지나가야 합니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "모든 크레이터를 건너는 장비는 동쪽에서 서쪽으로, 그리고 평평하게 눕혀진 게이트 위를 완전히 지나가야 합니다.",
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
            "title": "M05 추출",
            "description": "여러분의 로봇은 모든 코어 샘플 모형을 코어 기지 모형으로부터 가져와야 합니다. 그리고 나서 여기에 설명된 것과 임무 M03에서 수행할 옵션들을 선택해 수행할 수 있습니다.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "4개의 모든 코어샘플들이 코어기지 모형에서 축과 완전히 분리되었습니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "가스 코어샘플이 매트에 닿아 있고 착륙 목표 지점 원 안쪽에 완전히 들어가 있습니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-또는- 가스 코어샘플이 완전히 베이스 안쪽에 있습니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "워터 코어 샘플이 식량 증식 챔버 에 의해서만 지지되도록 올려져 있습니다.",
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
                    return new Error("가스 코어 샘플 위치")
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
                    return new Error("가스 코어 샘플 위치")
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
                    return new Error("가스 코어 샘플 위치")
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
                    return new Error("가스 코어 샘플 위치")
                }
            }]
        },
        {
            "title": "M06 우주 스테이션 모듈",
            "description": "로봇은 거주구역 중심부의 포트 구멍에 모듈을 삽입하거나 제거해야 합니다. 삽입된 모듈은 거주구역 중심부 이외의 것에 닿아 있어서는 안됩니다.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "원뿔형 모듈이 완전히 베이스 안에 있습니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "튜브 모듈이 거주구역 중심부 서쪽 포트안에 있습니다.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "도크 모듈이 거주구역 중심부 동쪽 포트안에 있습니다.",
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
            "title": "M07 우주유영",
            "description": "로봇은 \"Gerhard\"의 몸을 가져다가 에어락 챔버에 넣어야 합니다.",
            "objectives": [{
                "id": "M07",
                "title": "우주비행사 \"Gerhard\"가 거주구역 중심부의 에어락 챔버에 있습니다:",
                "options": [{
                        "value": "none",
                        "title": "아니오"
                    },
                    {
                        "value": "partially",
                        "title": "부분적으로"
                    },
                    {
                        "value": "completely",
                        "title": "완전히"
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
            "title": "M08 유산소운동",
            "description": "로봇은 운동 기계의 손잡이 조립체 중 1개 또는 두개 모두를 지속적으로 움직여 포인터가 올라가도록 해야 합니다. (만일 포인터가 회색이나 오렌지색의 경계선에 부분적으로 도달했다면 그 색을 선택하십시오.)",
            "objectives": [{
                "id": "M08",
                "title": "포인터의 끝이 색에 도달했습니다.(손잡이 조립체를 움직이는 것에 의해서만):",
                "options": [{
                        "value": "none",
                        "title": "없음"
                    },
                    {
                        "value": "gray",
                        "title": "회색"
                    },
                    {
                        "value": "white",
                        "title": "흰색"
                    },
                    {
                        "value": "orange",
                        "title": "오렌지색"
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
            "title": "M09 근력운동",
            "description": "로봇은 득점할 수 있는 높이까지 힘막대를 들어올려야 합니다.",
            "objectives": [{
                "id": "M09",
                "title": "톱니가 있는 부분의 4번째 구멍이 일부라도 보이도록 힘막대가 들어올려져 있습니다.",
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
            "title": "M10 식량생산",
            "description": "밀대를 적당한 거리만큼 적당한 속도로 밀어 초록색이 나오도록 합니다.",
            "objectives": [{
                "id": "M10",
                "title": "회색의 무게추가 초록색이 나온 뒤 황갈색이 나오기 전에 내려와 있습니다. (밀대를 미는 것에만 의해)",
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
            "title": "M11 탈출 속도",
            "description": "로봇은 충격판을 충분한 힘으로 때려서 우주선이 돌라간 후 다시 떨어지지 않도록 합니다.",
            "objectives": [{
                "id": "M11",
                "title": "우주선이 위에 머물어 있습니다.(충격판을 치거나 누르는것에만 의해)",
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
            "title": "M12 위성괴도",
            "description": "로봇은 1개 이상의 인공위성을 바깥쪽 괘도 위에 올려놓아야 합니다.",
            "objectives": [{
                "id": "M12",
                "title": "바깥 궤도의 두 선 사이에 올라 있거나 걸쳐 있는 인공위성들",
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
            "title": "M13 관측소",
            "description": "관측소 모형을 정확한 방향으로 회전시킵니다. (만일 포인터가 회색이나 오렌지색의 경계선에 부분적으로 도달했다면 그 색을 선택하십시오.)",
            "objectives": [{
                "id": "M13",
                "title": "관측소 포인터의 끝이 다음색에 있습니다.:",
                "options": [{
                        "value": "none",
                        "title": "없음"
                    },
                    {
                        "value": "gray",
                        "title": "회색"
                    },
                    {
                        "value": "white",
                        "title": "흰색"
                    },
                    {
                        "value": "orange",
                        "title": "오렌지색"
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
            "title": "M14 소행성의 방향 전환",
            "description": "프리라인의 서쪽에서 소행성 모형 한 개 또는 두개 모두를 독립적으로 소행성 포획기로 보냅니다.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "매트에 닿아있고 소행성 포획기의 가운데 들어간 소행성:",
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
                    "title": "매트에 닿아있고 소행성 포획기의 좌우에 들어간 소행성:",
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
                    return new Error("불가능한 조합.  너무 많은 소행성수")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("불가능한 조합.  너무 많은 소행성수")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("불가능한 조합.  너무 많은 소행성수")
                }
            }]
        },
        {
            "title": "M15 착륙선 착륙",
            "description": "착륙선을 착륙 목표지점중 한곳으로 손상없이 옮기거나 베이스로 가져 옵니다.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "착륙선이 손상없이 결합되어 있고 매트에 닿아있습니다:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "착륙선이 완전히 안에 있습니다.:",
                    "options": [{
                            "value": "no",
                            "title": "없음"
                        },
                        {
                            "value": "base",
                            "title": "베이스"
                        },
                        {
                            "value": "planet",
                            "title": "북동쪽 행성 구역"
                        },
                        {
                            "value": "circle",
                            "title": "목표 지점 원"
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
            "title": "페널티",
            "description": "여러분의 로봇을 손으로 구출 할 수 있지만, 그렇게 하면 페널티를 받게됩니다.",
            "objectives": [{
                "id": "penalties",
                "title": "남동쪽 삼각형 안의 페널티 디스크 수:",
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
        "yes": "예",
        "no": "아니오",
        "M01-name": "M01 우주여행",
        "M01-desc": "＊\t각각의 페이로드 로켓을 명백히 우주여행 경사로로 굴려 내려 보냅니다. 각각의 출발과 이동을 할 때 * 수레는 첫번째 트렉 연결부위를 지날 때 독립적이어야 합니다.",
        "M01-scoring1": "탐사차량 페이로드가 첫번째 트랙 연결부위를 지나갔습니다",
        "M01-scoring2": "물자 페이로드가 첫번째 트랙 연결부위를 지나갔습니다",
        "M01-scoring3": "승무원 페이로드가 첫번째 트랙 연결부위를 지나갔습니다",
        "M02-name": "M02 태양전지판 배열",
        "M02-desc": "태양전지판이 여러분쪽 또는 여러분과 멀어지는 쪽으로 기울어져야 합니다.",
        "M02-scoring1": "두개의 태양전지판이 같은 경기장쪽으로 기울어 졌습니다.",
        "M02-scoring2": "여러분의 태양전지판이 상대팀쪽으로 기울어 졌습니다.",
        "M03-name": "M03 3D 프린팅",
        "M03-desc": "* 레골리스 코어 샘플을 3D프린터에 넣어 2x4 브릭을 방출시킵니다.",
        "M03-scoring1": "2x4 브릭이 방출되었습니다.(3D프린터에 레골리스 코어샘플을 넣는 것에 의해서만)",
        "M03-scoring2": "2x4 브릭이 북동쪽 행성구역안에 완전히 들어가 있습니다.",
        "M04-name": "M04 크레이터 건너기",
        "M04-desc": "로봇 또는 로봇으로 부터 내보내진 이동체가 크레이터 모형을 완전히 가로질러 그 위로 달려 넘어갑니다. 근처로 가거나 둘러서 가서는 안됩니다.",
        "M04-scoring1": "크레이터를 건너는 장비의 무게를 지탱하는 모든 부분이 *완전히 두개의 타워 사이로 지나가야 합니다.",
        "M04-scoring2": "모든 크레이터를 건너는 장비는 동쪽에서 서쪽으로, 그리고 평평하게 눕혀진 게이트 위를 완전히 지나가야 합니다.",
        "M05-name": "M05 추출",
        "M05-desc": "여러분의 로봇은 모든 코어 샘플 모형을 코어 기지 모형으로부터 가져와야 합니다. 그리고 나서 여기에 설명된 것과 임무 M03에서 수행할 옵션들을 선택해 수행할 수 있습니다.",
        "M05-scoring1": "4개의 모든 코어샘플들이 코어기지 모형에서 축과 완전히 분리되었습니다.",
        "M05-scoring2": "가스 코어샘플이 매트에 닿아 있고 착륙 목표 지점 원 안쪽에 완전히 들어가 있습니다.",
        "M05-scoring3": "-또는- 가스 코어샘플이 완전히 베이스 안쪽에 있습니다.",
        "M05-scoring4": "워터 코어 샘플이 식량 증식 챔버 에 의해서만 지지되도록 올려져 있습니다.",
        "M05-error": "가스 코어 샘플 위치",
        "M06-name": "M06 우주 스테이션 모듈",
        "M06-desc": "로봇은 거주구역 중심부의 포트 구멍에 모듈을 삽입하거나 제거해야 합니다. 삽입된 모듈은 거주구역 중심부 이외의 것에 닿아 있어서는 안됩니다.",
        "M06-scoring1": "원뿔형 모듈이 완전히 베이스 안에 있습니다.",
        "M06-scoring2": "튜브 모듈이 거주구역 중심부 서쪽 포트안에 있습니다.",
        "M06-scoring3": "도크 모듈이 거주구역 중심부 동쪽 포트안에 있습니다.",
        "M07-name": "M07 우주유영",
        "M07-desc": "로봇은 \"Gerhard\"의 몸을 가져다가 에어락 챔버에 넣어야 합니다.",
        "M07-scoring": "우주비행사 \"Gerhard\"가 거주구역 중심부의 에어락 챔버에 있습니다:",
        "M07-scoring1": "아니오",
        "M07-scoring2": "부분적으로",
        "M07-scoring3": "완전히",
        "M08-name": "M08 유산소운동",
        "M08-desc": "로봇은 운동 기계의 손잡이 조립체 중 1개 또는 두개 모두를 지속적으로 움직여 포인터가 올라가도록 해야 합니다. (만일 포인터가 회색이나 오렌지색의 경계선에 부분적으로 도달했다면 그 색을 선택하십시오.)",
        "M08-scoring": "포인터의 끝이 색에 도달했습니다.(손잡이 조립체를 움직이는 것에 의해서만):",
        "M08-scoring1": "없음",
        "M08-scoring2": "회색",
        "M08-scoring3": "흰색",
        "M08-scoring4": "오렌지색",
        "M09-name": "M09 근력운동",
        "M09-desc": "로봇은 득점할 수 있는 높이까지 힘막대를 들어올려야 합니다.",
        "M09-scoring": "톱니가 있는 부분의 4번째 구멍이 일부라도 보이도록 힘막대가 들어올려져 있습니다.",
        "M10-name": "M10 식량생산",
        "M10-desc": "밀대를 적당한 거리만큼 적당한 속도로 밀어 초록색이 나오도록 합니다.",
        "M10-scoring": "회색의 무게추가 초록색이 나온 뒤 황갈색이 나오기 전에 내려와 있습니다. (밀대를 미는 것에만 의해)",
        "M11-name": "M11 탈출 속도",
        "M11-desc": "로봇은 충격판을 충분한 힘으로 때려서 우주선이 돌라간 후 다시 떨어지지 않도록 합니다.",
        "M11-scoring": "우주선이 위에 머물어 있습니다.(충격판을 치거나 누르는것에만 의해)",
        "M12-name": "M12 위성괴도",
        "M12-desc": "로봇은 1개 이상의 인공위성을 바깥쪽 괘도 위에 올려놓아야 합니다.",
        "M12-scoring": "바깥 궤도의 두 선 사이에 올라 있거나 걸쳐 있는 인공위성들",
        "M13-name": "M13 관측소",
        "M13-desc": "관측소 모형을 정확한 방향으로 회전시킵니다. (만일 포인터가 회색이나 오렌지색의 경계선에 부분적으로 도달했다면 그 색을 선택하십시오.)",
        "M13-scoring": "관측소 포인터의 끝이 다음색에 있습니다.:",
        "M13-scoring1": "없음",
        "M13-scoring2": "회색",
        "M13-scoring3": "흰색",
        "M13-scoring4": "오렌지색",
        "M14-name": "M14 소행성의 방향 전환",
        "M14-desc": "프리라인의 서쪽에서 소행성 모형 한 개 또는 두개 모두를 독립적으로 소행성 포획기로 보냅니다.",
        "M14-scoring1": "매트에 닿아있고 소행성 포획기의 가운데 들어간 소행성:",
        "M14-scoring2": "매트에 닿아있고 소행성 포획기의 좌우에 들어간 소행성:",
        "M14-error": "불가능한 조합.  너무 많은 소행성수",
        "M15-name": "M15 착륙선 착륙",
        "M15-desc": "착륙선을 착륙 목표지점중 한곳으로 손상없이 옮기거나 베이스로 가져 옵니다.",
        "M15-scoring1": "착륙선이 손상없이 결합되어 있고 매트에 닿아있습니다:",
        "M15-scoring2": "착륙선이 완전히 안에 있습니다.:",
        "M15-scoring3": "없음",
        "M15-scoring4": "베이스",
        "M15-scoring5": "북동쪽 행성 구역",
        "M15-scoring6": "목표 지점 원",
        "penalties-name": "페널티",
        "penalties-desc": "여러분의 로봇을 손으로 구출 할 수 있지만, 그렇게 하면 페널티를 받게됩니다.",
        "penalties-scoring": "남동쪽 삼각형 안의 페널티 디스크 수:"
    },
    "rtl": false
}
