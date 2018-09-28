{
    "title": "INTO ORBIT",
    "missions": [{
            "title": "M01 Viagem Espacial",
            "description": "*Faça com que cada Carga útil comece a rolar claramente pela Rampa da Viagem Espacial. Para cada rolagem, o carrinho deve *estar independente quando atingir a primeira conexão do trilho.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "A Carga de Veículo passou da primeira conexão do trilho",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "A Carga de Suprimentos passou da primeira conexão do trilho",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_3",
                    "title": "A Carga de Tripulação passou da primeira conexão do trilho",
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
            "title": "M02 Matriz de Painel Solar",
            "description": "Os Painéis Solares precisam estar inclinados na sua direção ou na direção oposta.",
            "objectives": [{
                    "id": "M02_1",
                    "title": "Ambos os Painéis Solares estão voltados para a mesma Arena",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M02_2",
                    "title": "O seu Painel Solar está voltado para a Arena da outra equipe",
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
            "title": "M03 Impressão 3D",
            "description": "Ejete o Bloco 2x4 *colocando uma Amostra de Regolito dentro da impressora 3D.",
            "objectives": [{
                    "id": "M03_1",
                    "title": "Bloco 2x4 foi ejetado (devido apenas a uma Amostra da Regolito dentro da Impressora 3D)",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_2",
                    "title": "Bloco 2x4 está completamente dentro da Área do Planeta a Nordeste",
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
            "title": "M04 Travessia da Cratera",
            "description": "O Robô ou qualquer outro veículo enviado por ele precisa atravessar completamente o Modelo de Crateras, passando diretamente por cima dele. Não perto dele. Nem ao redor dele.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "Todas as partes do equipamento fazendo a travessia passaram completamente entre as torres.",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "Todo o equipamento fazendo a travessia passou do leste para o oeste, ultrapassando completamente o Portão derrubado",
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
            "title": "M05 Extração",
            "description": ": O Robô precisa tirar todos as Amostras de Testemunhos de Sondagem do Modelo de Suporte de Amostras, depois disso tem opções com relação ao que fazer com elas, como descrito aqui, e na Missão M03.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "Todas as quatro Amostras não estão mais em contato com o eixo do Modelo de Suporte de Amostras",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_2",
                    "title": "A Amostra de Gás está em contato com o Tapete e completamente no Círculo Alvo do Módulo de Aterrissagem",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_3",
                    "title": "-OU- A Amostra de Gás está completamente dentro da Base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M05_4",
                    "title": "A Amostra de Água está apoiada apenas pela Câmara de Produção de Alimentos",
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
                    return new Error("Localização da Amostra de Gás")
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
                    return new Error("Localização da Amostra de Gás")
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
                    return new Error("Localização da Amostra de Gás")
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
                    return new Error("Localização da Amostra de Gás")
                }
            }]
        },
        {
            "title": "M06 Módulos da Estação Espacial",
            "description": ": O Robô precisa remover e inserir módulos entre os orifícios da abertura do Complexo Habitacional. Os módulos inseridos não podem tocar em nada, exceto no Complexo Habitacional.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "O Módulo Cone está completamente dentro da Base",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "O Módulo Tubo está na abertura oeste do Complexo Habitacional",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_3",
                    "title": "O Módulo de Acoplamento está na abertura leste do Complexo Habitacional",
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
            "title": "M07 Emergência de Caminhada Espacial",
            "description": ": O Robô precisa levar o corpo de Gerhard para dentro da Câmara de Vácuo.",
            "objectives": [{
                "id": "M07",
                "title": "O astronauta “Gerhard” está dentro da Câmara de Vácuo do Complexo Habitacional:",
                "options": [{
                        "value": "none",
                        "title": "Não"
                    },
                    {
                        "value": "partially",
                        "title": "Parcialmente"
                    },
                    {
                        "value": "completely",
                        "title": "Completamente"
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
            "title": "M08 Exercício Aeróbico",
            "description": "O Robô precisa mover repetidamente um ou ambos os Puxadores da Máquina de Exercícios para fazer o Ponteiro avançar. (Se o ponteiro estiver cobrindo parcialmente qualquer uma das bordas que delimitam o cinza ou o laranja, selecione a cor respectiva.)",
            "objectives": [{
                "id": "M08",
                "title": "A ponta do ponteiro da Máquina de Exercício está no (apenas movendo um ou ambos os Puxadores):",
                "options": [{
                        "value": "none",
                        "title": "Nenhum"
                    },
                    {
                        "value": "gray",
                        "title": "Cinza"
                    },
                    {
                        "value": "white",
                        "title": "Branco"
                    },
                    {
                        "value": "orange",
                        "title": "Laranja"
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
            "title": "M09 Exercício de Força",
            "description": "O Robô precisa levantar a Barra de Força até a altura necessária para pontuação.",
            "objectives": [{
                "id": "M09",
                "title": "A Barra de força foi levantada de modo que o 4o orifício da barra dentada está pelo menos parcialmente visível.",
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
            "title": "M10 Produção de Alimentos",
            "description": "Mova a barra de empurrar a distância certa na velocidade certa, para entrar na faixa de pontuação verde.",
            "objectives": [{
                "id": "M10",
                "title": "O peso cinza caiu depois do verde, mas antes do marrom-claro (somente movendo a Barra de Empurrar.)",
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
            "title": "M11 Velocidade de Escape",
            "description": "O Robô precisa causar impacto sobre o Acionador com força suficiente para evitar que a nave caia de volta na Terra.",
            "objectives": [{
                "id": "M11",
                "title": "A nave espacial permanece na parte de cima (somente pressionando/batendo no Acionador)",
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
            "title": "M12 Órbitas de Satélite",
            "description": "O Robô precisa mover um ou mais Satélites para a Órbita Externa.",
            "objectives": [{
                "id": "M12",
                "title": "Os satélites estão sobre ou acima da área entre as duas linhas da Órbita Externa:",
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
            "title": "M13 Observatório",
            "description": "Gire o Observatório para uma direção precisa.( Se o ponteiro estiver cobrindo parcialmente qualquer uma das bordas que delimitam o cinza ou o laranja, selecione a cor respectiva.)",
            "objectives": [{
                "id": "M13",
                "title": "A ponta do ponteiro do Observatório está no:",
                "options": [{
                        "value": "none",
                        "title": "Nenhum"
                    },
                    {
                        "value": "gray",
                        "title": "Cinza"
                    },
                    {
                        "value": "white",
                        "title": "Branco"
                    },
                    {
                        "value": "orange",
                        "title": "Laranja"
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
            "title": "M14 Deflexão do Meteroide",
            "description": "Do oeste da Linha Livre, envie um ou ambos os Meteoroides Independentemente para o Coletor de Meteoroides.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "Os Meteoroides estão em contato com o Tapete na Porção Central:",
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
                    "title": "Os Meteoroides estão em contato com o Tapete em qualquer uma das Porções Laterais:",
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
                    return new Error("Combinação impossível. Meteroides demais")
                }
                if (M14_1 === '2' && M14_2 === '0') {
                    return 24
                }
                if (M14_1 === '2' && M14_2 === '1') {
                    return new Error("Combinação impossível. Meteroides demais")
                }
                if (M14_1 === '2' && M14_2 === '2') {
                    return new Error("Combinação impossível. Meteroides demais")
                }
            }]
        },
        {
            "title": "M15 Módulo de Aterrissagem",
            "description": "Leve o Módulo de Aterrissagem intacto a um de seus alvos, ou pelo menos, leve-o para a Base.",
            "objectives": [{
                    "id": "M15_1",
                    "title": "O Módulo está intacto e tocando o Tapete",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M15_2",
                    "title": "O Módulo está completamente dentro de:",
                    "options": [{
                            "value": "no",
                            "title": "Nenhum"
                        },
                        {
                            "value": "base",
                            "title": "Base"
                        },
                        {
                            "value": "planet",
                            "title": "Área do Planeta a Nordeste"
                        },
                        {
                            "value": "circle",
                            "title": "Círculo Alvo"
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
            "title": "Penalidades",
            "description": "Você tem permissão para resgatar seu Robô manualmente, mas essa ação gera esta Penalidade",
            "objectives": [{
                "id": "penalties",
                "title": "Número de Discos de penalidade no triângulo a sudeste:",
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
        "yes": "Sim",
        "no": "Não",
        "M01-name": "M01 Viagem Espacial",
        "M01-desc": "*Faça com que cada Carga útil comece a rolar claramente pela Rampa da Viagem Espacial. Para cada rolagem, o carrinho deve *estar independente quando atingir a primeira conexão do trilho.",
        "M01-scoring1": "A Carga de Veículo passou da primeira conexão do trilho",
        "M01-scoring2": "A Carga de Suprimentos passou da primeira conexão do trilho",
        "M01-scoring3": "A Carga de Tripulação passou da primeira conexão do trilho",
        "M02-name": "M02 Matriz de Painel Solar",
        "M02-desc": "Os Painéis Solares precisam estar inclinados na sua direção ou na direção oposta.",
        "M02-scoring1": "Ambos os Painéis Solares estão voltados para a mesma Arena",
        "M02-scoring2": "O seu Painel Solar está voltado para a Arena da outra equipe",
        "M03-name": "M03 Impressão 3D",
        "M03-desc": "Ejete o Bloco 2x4 *colocando uma Amostra de Regolito dentro da impressora 3D.",
        "M03-scoring1": "Bloco 2x4 foi ejetado (devido apenas a uma Amostra da Regolito dentro da Impressora 3D)",
        "M03-scoring2": "Bloco 2x4 está completamente dentro da Área do Planeta a Nordeste",
        "M04-name": "M04 Travessia da Cratera",
        "M04-desc": "O Robô ou qualquer outro veículo enviado por ele precisa atravessar completamente o Modelo de Crateras, passando diretamente por cima dele. Não perto dele. Nem ao redor dele.",
        "M04-scoring1": "Todas as partes do equipamento fazendo a travessia passaram completamente entre as torres.",
        "M04-scoring2": "Todo o equipamento fazendo a travessia passou do leste para o oeste, ultrapassando completamente o Portão derrubado",
        "M05-name": "M05 Extração",
        "M05-desc": ": O Robô precisa tirar todos as Amostras de Testemunhos de Sondagem do Modelo de Suporte de Amostras, depois disso tem opções com relação ao que fazer com elas, como descrito aqui, e na Missão M03.",
        "M05-scoring1": "Todas as quatro Amostras não estão mais em contato com o eixo do Modelo de Suporte de Amostras",
        "M05-scoring2": "A Amostra de Gás está em contato com o Tapete e completamente no Círculo Alvo do Módulo de Aterrissagem",
        "M05-scoring3": "-OU- A Amostra de Gás está completamente dentro da Base",
        "M05-scoring4": "A Amostra de Água está apoiada apenas pela Câmara de Produção de Alimentos",
        "M05-error": "Localização da Amostra de Gás",
        "M06-name": "M06 Módulos da Estação Espacial",
        "M06-desc": ": O Robô precisa remover e inserir módulos entre os orifícios da abertura do Complexo Habitacional. Os módulos inseridos não podem tocar em nada, exceto no Complexo Habitacional.",
        "M06-scoring1": "O Módulo Cone está completamente dentro da Base",
        "M06-scoring2": "O Módulo Tubo está na abertura oeste do Complexo Habitacional",
        "M06-scoring3": "O Módulo de Acoplamento está na abertura leste do Complexo Habitacional",
        "M07-name": "M07 Emergência de Caminhada Espacial",
        "M07-desc": ": O Robô precisa levar o corpo de Gerhard para dentro da Câmara de Vácuo.",
        "M07-scoring": "O astronauta “Gerhard” está dentro da Câmara de Vácuo do Complexo Habitacional:",
        "M07-scoring1": "Não",
        "M07-scoring2": "Parcialmente",
        "M07-scoring3": "Completamente",
        "M08-name": "M08 Exercício Aeróbico",
        "M08-desc": "O Robô precisa mover repetidamente um ou ambos os Puxadores da Máquina de Exercícios para fazer o Ponteiro avançar. (Se o ponteiro estiver cobrindo parcialmente qualquer uma das bordas que delimitam o cinza ou o laranja, selecione a cor respectiva.)",
        "M08-scoring": "A ponta do ponteiro da Máquina de Exercício está no (apenas movendo um ou ambos os Puxadores):",
        "M08-scoring1": "Nenhum",
        "M08-scoring2": "Cinza",
        "M08-scoring3": "Branco",
        "M08-scoring4": "Laranja",
        "M09-name": "M09 Exercício de Força",
        "M09-desc": "O Robô precisa levantar a Barra de Força até a altura necessária para pontuação.",
        "M09-scoring": "A Barra de força foi levantada de modo que o 4o orifício da barra dentada está pelo menos parcialmente visível.",
        "M10-name": "M10 Produção de Alimentos",
        "M10-desc": "Mova a barra de empurrar a distância certa na velocidade certa, para entrar na faixa de pontuação verde.",
        "M10-scoring": "O peso cinza caiu depois do verde, mas antes do marrom-claro (somente movendo a Barra de Empurrar.)",
        "M11-name": "M11 Velocidade de Escape",
        "M11-desc": "O Robô precisa causar impacto sobre o Acionador com força suficiente para evitar que a nave caia de volta na Terra.",
        "M11-scoring": "A nave espacial permanece na parte de cima (somente pressionando/batendo no Acionador)",
        "M12-name": "M12 Órbitas de Satélite",
        "M12-desc": "O Robô precisa mover um ou mais Satélites para a Órbita Externa.",
        "M12-scoring": "Os satélites estão sobre ou acima da área entre as duas linhas da Órbita Externa:",
        "M13-name": "M13 Observatório",
        "M13-desc": "Gire o Observatório para uma direção precisa.( Se o ponteiro estiver cobrindo parcialmente qualquer uma das bordas que delimitam o cinza ou o laranja, selecione a cor respectiva.)",
        "M13-scoring": "A ponta do ponteiro do Observatório está no:",
        "M13-scoring1": "Nenhum",
        "M13-scoring2": "Cinza",
        "M13-scoring3": "Branco",
        "M13-scoring4": "Laranja",
        "M14-name": "M14 Deflexão do Meteroide",
        "M14-desc": "Do oeste da Linha Livre, envie um ou ambos os Meteoroides Independentemente para o Coletor de Meteoroides.",
        "M14-scoring1": "Os Meteoroides estão em contato com o Tapete na Porção Central:",
        "M14-scoring2": "Os Meteoroides estão em contato com o Tapete em qualquer uma das Porções Laterais:",
        "M14-error": "Combinação impossível. Meteroides demais",
        "M15-name": "M15 Módulo de Aterrissagem",
        "M15-desc": "Leve o Módulo de Aterrissagem intacto a um de seus alvos, ou pelo menos, leve-o para a Base.",
        "M15-scoring1": "O Módulo está intacto e tocando o Tapete",
        "M15-scoring2": "O Módulo está completamente dentro de:",
        "M15-scoring3": "Nenhum",
        "M15-scoring4": "Base",
        "M15-scoring5": "Área do Planeta a Nordeste",
        "M15-scoring6": "Círculo Alvo",
        "penalties-name": "Penalidades",
        "penalties-desc": "Você tem permissão para resgatar seu Robô manualmente, mas essa ação gera esta Penalidade",
        "penalties-scoring": "Número de Discos de penalidade no triângulo a sudeste:"
    },
    "rtl": false
}
