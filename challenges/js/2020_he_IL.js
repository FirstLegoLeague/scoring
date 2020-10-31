({
    "title": "RePLAY",
    "missions": [{
            "title": "M00 בונוס ביקורת ציוד",
            "description": "אם כל הציוד שלכם נכנס באזור הביקורת הקטן כאשר אתם מגיעים למקצה, תקבלו נקודות בונוס.",
            "objectives": [{
                "id": "bonus",
                "title": "כל הציוד שלכם נכנס באיזור הביקורת הקטן:",
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
            "title": "M01 פרויקט החדשנות",
            "description": "פרויקט החדשנות מורכב מלפחות 2 חלקי לגו לבנים ואורכו לפחות 4 בליטות באחד המימדים.",
            "objectives": [{
                    "id": "M01_1",
                    "title": "פרויקט החדשנות גדול מספיק: (2+ חלקי לגו ולפחות באורך 4 בליטות):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M01_2",
                    "title": "חלק מפרויקט החדשנות נוגע ב:",
                    "options": [{
                            "value": "none",
                            "title": "כלום"
                        },
                        {
                            "value": "logo",
                            "title": "RePLAY סמל"
                        },
                        {
                            "value": "gray",
                            "title": "אזור אפור מסביב לספסל"
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
            "title": "M02 מונה צעדים",
            "description": "ככל שהרובוט דוחף את מונה הצעדים יותר רחוק, זה עדיף.",
            "objectives": [{
                "id": "M02_1",
                "title": "חלקו התחתון של המצביע נמצא על:",
                "options": [{
                        "value": "none",
                        "title": "כלום"
                    },
                    {
                        "value": "magenta",
                        "title": "מג'נטה"
                    },
                    {
                        "value": "yellow",
                        "title": "צהוב"
                    },
                    {
                        "value": "blue",
                        "title": "כחול"
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
            "title": "M03 מגלשה",
            "description": "הרובוט מחליק את הדמויות במורד המגלשה ומזיז אותם לאזורים אחרים. \"מחוץ למגלשה\" מנוקד אם המסגרת השחורה של הדמות מתחת לקצה החלק האפור של המגלשה",
            "objectives": [{
                    "id": "M03_1",
                    "title": "מספר דמויות המגלשה מחוץ למגלשה:",
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
                    "title": "דמות מגלשה אחת נמצאת לגמרי בתוך הבית:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M03_3",
                    "title": "דמות מגלשה מוחזקת לגמרי מעל השטיח על ידי הצמיג האפור ולא נוגעת בשום דבר אחר:",
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
                    return new Error("יותר מידי דמויות מגלשה")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'no') {
                    return new Error("יותר מידי דמויות מגלשה")
                }
                if (M03_1 === '0' && M03_2 === 'yes' && M03_3 === 'yes') {
                    return new Error("יותר מידי דמויות מגלשה")
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
                    return new Error("יותר מידי דמויות מגלשה")
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
            "title": "M04 ספסל",
            "description": "הרובוט מסיר את משענת הגב, משטח את הספסל ומביא את הקוביות לתוך אזורי משחק הקלאס.",
            "objectives": [{
                    "id": "M04_1",
                    "title": "אם הספסל שטוח לחלוטין:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_3",
                    "title": "משענת הגב לגמרי מחוץ לשני החורים שלה:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M04_2",
                    "title": "מספר אזורי הקלאס עם קוביות הנוגעות בשטיח בתוכם:",
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
            "title": "M05 כדורסל",
            "description": "הרובוט מגביה את הארגז במעלה העמוד ומכניס קובייה לתוכו.",
            "objectives": [{
                    "id": "M05_1",
                    "title": "יש קובייה בארגז:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M05_2",
                    "title": "הארגז מונח על מעצור הגובה הלבן:",
                    "options": [{
                            "value": "none",
                            "title": "כלום"
                        },
                        {
                            "value": "middle",
                            "title": "האמצעי"
                        },
                        {
                            "value": "top",
                            "title": "העליון"
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
                    return new Error('יותר מידי קוביות')
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
            "title": "M06 מוט מתח",
            "description": "הרובוט עובר לחלוטין מתחת למוט בזמן כלשהו. בנפרד, בסוף המקצה, הוא מוחזק על ידי המוט מבלי לגעת בשטיח.",
            "objectives": [{
                    "id": "M06_1",
                    "title": "הרובוט עובר לחלוטין דרך המסגרת האנכית של מוט המתח בזמן כלשהו:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M06_2",
                    "title": "מוט המתח מחזיק 100% מהרובוט מבלי שייגע בשטיח המשחק בסוף המקצה:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                }
            ],
            "score": [function(M06_1, M06_2, M07_1) {
                M06_1 = String(M06_1);
                M06_2 = String(M06_2);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('מיקום הרובוט לא חוקי - לא יכול להיתלות בM06 וגם לרקור בM07')
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
            "title": "M07 ריקוד הרובוט",
            "description": "הרובוט רוקד על רחבת הריקודים בסוף המקצה. כל תנועה מחזורית, הן משעשעת והן מקצועית, נחשבת לריקוד",
            "objectives": [{
                "id": "M07_1",
                "title": "בקר הרובוט רוקד מעל רחבת הריקודים בסוף המקצה:",
                "type": "yesno",
                "default": "no",
                "value": null
            }],
            "score": [function(M07_1, M06_2) {
                M07_1 = String(M07_1);
                if (((M06_2 === 'yes') ? 1 : 0) + ((M07_1 === 'yes') ? 1 : 0) > 1) {
                    return new Error('מיקום הרובוט לא חוקי - לא יכול להיתלות בM06 וגם לרקור בM07')
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
            "title": "M08 בוצ'יה",
            "description": "רובוטים שולחים קוביות תואמות למגרש הנגדי",
            "objectives": [{
                    "id": "M08_1",
                    "title": "שני דגמי השיתוף שלחו קובייה אחת בלבד לצד השני, והקוביות תואמות בצבען:",
                    "type": "yesno",
                    "default": "no",
                    "value": null
                },
                {
                    "id": "M08_3",
                    "title": "פחות קובייה צהובה אחת לחלוטין בתוך המטרה:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_4",
                    "title": "ציוד כלשהו נמצא בתוך המסגרת (אפילו חלקית):",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M08_2",
                    "title": "מספר הקוביות בתוך המסגרת או המטרה:",
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
                    return new Error('יותר מידי קוביות')
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 0
                }
                if (M08_1 === 'no' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("קוביות במטרות לא חוקיות:")
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'no' && M08_4 === 'no') {
                    return 25
                }
                if (M08_1 === 'yes' && M08_2 === '0' && M08_3 === 'yes' && M08_4 === 'no') {
                    return new Error("קוביות במטרות לא חוקיות:")
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
            "title": "M09 הפיכת צמיגים",
            "description": "הרובוט הופך צמיגים כך שהמרכזים הלבנים שלהם כלפי מעלה ומזיז אותם לתוך מעגל המטרה הגדול שלהם.",
            "objectives": [{
                    "id": "M09_1",
                    "title": "צמיגים עם המרכז הלבן כלפי מעלה הנוגעים בשטיח:",
                    "options": [{
                            "value": "none",
                            "title": "כלום"
                        },
                        {
                            "value": "light",
                            "title": "כחול"
                        },
                        {
                            "value": "heavy",
                            "title": "שחור"
                        },
                        {
                            "value": "both",
                            "title": "שניהם"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_2",
                    "title": "צמיגים לגמרי בתוך עיגול המטרה הגדול:",
                    "options": [{
                            "value": "none",
                            "title": "כלום"
                        },
                        {
                            "value": "light",
                            "title": "כחול"
                        },
                        {
                            "value": "heavy",
                            "title": "שחור"
                        },
                        {
                            "value": "both",
                            "title": "שניהם"
                        }
                    ],
                    "type": "enum",
                    "default": "none"
                },
                {
                    "id": "M09_3",
                    "title": "הצמיג הכבד (בעל המסגרת השחורה) חצה את קו ההיפוך האדום (אפילו חלקית) בזמן כלשהו:",
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
            "title": "M10 טלפון נייד",
            "description": "הרובוט הופך את הטלפון הנייד כך שהצד הלבן שלו כלפי מעלה.",
            "objectives": [{
                "id": "M10",
                "title": "הטלפון הנייד עם הצד הלבן כלפי מעלה ומונח רק על השטיח:",
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
            "title": "M11 הליכון",
            "description": "הרובוט מסובב את הגלגלות כדי להזיז את המצביע הכי רחוק שאפשר, עם כיוון השעון. אם הרובוט מזיז את המצביע על ידי נגיעה במצביע, הניקוד הוא 0.",
            "objectives": [{
                "id": "M11_1",
                "title": "הרובוט סובב את הגלגלות כך שהמצביע מצביע על:",
                "options": [{
                        "value": "none",
                        "title": "כלום"
                    },
                    {
                        "value": "gray",
                        "title": "אפור"
                    },
                    {
                        "value": "red",
                        "title": "אדום"
                    },
                    {
                        "value": "orange",
                        "title": "כתום"
                    },
                    {
                        "value": "yellow",
                        "title": "צהוב"
                    },
                    {
                        "value": "ltGreen",
                        "title": "ירוק בהיר"
                    },
                    {
                        "value": "dkGreen",
                        "title": "ירוק כהה"
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
            "title": "M12 מכונת חתירה",
            "description": "הרובוט מזיז את הגלגל החופשי מחוץ למעגל הגדול ולתוך מעגל המטרה הקטן.",
            "objectives": [{
                    "id": "M12_1",
                    "title": "הגלגל החופשי לגמרי מחוץ למעגל הגדול:",
                    "type": "yesno",
                    "default": "no"
                },
                {
                    "id": "M12_2",
                    "title": "הגלגל החופשי לגמרי בתוך המעגל הקטן:",
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
                    return new Error("מיקום גלגל מכונת החתירה אינו חוקי")
                }
                if (M12_1 === 'yes' && M12_2 === 'yes') {
                    return 30
                }
            }]
        },
        {
            "title": "M13 מכונת משקולות",
            "description": "הרובוט מזיז את הזרוע עד שהמעצור הצהוב הקטן נופל. הקבוצה קובעת ידנית את מצב הזרוע לפני המקצה. מצב הזרוע הוא הצבע מתחת לפאה המזרחית של המוט הירוק המזרחי",
            "objectives": [{
                "id": "M13",
                "title": "המעצור נמצא מתחת לזרוע ומצב הזרוע:",
                "options": [{
                        "value": "none",
                        "title": "כלום"
                    },
                    {
                        "value": "blue",
                        "title": "כחול"
                    },
                    {
                        "value": "magenta",
                        "title": "מג'נטה"
                    },
                    {
                        "value": "yellow",
                        "title": "צהוב"
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
            "title": "M14 יחידות בריאות",
            "description": "הרובוט אוסף יחידות בריאות מרחבי הזירה ומזיז אותם לאזורי מטרה. המספר המירבי של יחידות בריאות המקנות ניקוד ממוט המתח הוא 4.",
            "objectives": [{
                    "id": "M14_1",
                    "title": "מספר היחידות הנוגעות בסמל RePlay או באזור האפור שמסביב לספסל:",
                    "type": "number",
                    "default": 0,
                    "min": 0,
                    "max": 16,
                    "value": null
                },
                {
                    "id": "M14_2",
                    "title": "מספר היחידות מושחלות על העמוד של מוט המתח ולא נוגעות בשום ציוד (מקסימום 4):",
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
                    return new Error('יותר מידי יחידות בריאות')
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
                    return new Error("יותר מידי יחידות בריאות")
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
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '6' && M14_2 === '4') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '7' && M14_2 === '0') {
                    return 35
                }
                if (M14_1 === '7' && M14_2 === '1') {
                    return 45
                }
                if (M14_1 === '7' && M14_2 === '2') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '7' && M14_2 === '3') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '7' && M14_2 === '4') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '8' && M14_2 === '0') {
                    return 40
                }
                if (M14_1 === '8' && M14_2 === '1') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '8' && M14_2 === '2') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '8' && M14_2 === '3') {
                    return new Error("יותר מידי יחידות בריאות")
                }
                if (M14_1 === '8' && M14_2 === '4') {
                    return new Error("יותר מידי יחידות בריאות")
                }
            }]
        },
        {
            "title": "M15 דיוק",
            "description": "ככל שתפריעו לרובוט פחות פעמים מחוץ לבית, יישארו לכם יותר נקודות.",
            "objectives": [{
                "id": "precision",
                "title": "מספר אסימוני הדיוק הנותרו על הזירה:",
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
        "yes": "כן",
        "no": "לא",
        "None": "כלום",
        "Magenta": "מג'נטה",
        "Yellow": "צהוב",
        "Blue": "כחול",
        "Gray": "אפור",
        "Red": "אדום",
        "Orange": "כתום",
        "LtGreen": "ירוק בהיר",
        "DkGreen": "ירוק כהה",
        "M00-name": "M00 בונוס ביקורת ציוד",
        "M00-desc": "אם כל הציוד שלכם נכנס באזור הביקורת הקטן כאשר אתם מגיעים למקצה, תקבלו נקודות בונוס.",
        "M00-scoring1": "כל הציוד שלכם נכנס באיזור הביקורת הקטן:",
        "M01-name": "M01 פרויקט החדשנות",
        "M01-desc": "פרויקט החדשנות מורכב מלפחות 2 חלקי לגו לבנים ואורכו לפחות 4 בליטות באחד המימדים.",
        "M01-scoring1": "פרויקט החדשנות גדול מספיק: (2+ חלקי לגו ולפחות באורך 4 בליטות):",
        "M01-scoring2": "חלק מפרויקט החדשנות נוגע ב:",
        "M01-logo": "RePLAY סמל",
        "M01-gray": "אזור אפור מסביב לספסל",
        "M02-name": "M02 מונה צעדים",
        "M02-desc": "ככל שהרובוט דוחף את מונה הצעדים יותר רחוק, זה עדיף.",
        "M02-scoring1": "חלקו התחתון של המצביע נמצא על:",
        "M03-name": "M03 מגלשה",
        "M03-desc": "הרובוט מחליק את הדמויות במורד המגלשה ומזיז אותם לאזורים אחרים. \"מחוץ למגלשה\" מנוקד אם המסגרת השחורה של הדמות מתחת לקצה החלק האפור של המגלשה",
        "M03-scoring1": "מספר דמויות המגלשה מחוץ למגלשה:",
        "M03-scoring2": "דמות מגלשה אחת נמצאת לגמרי בתוך הבית:",
        "M03-scoring3": "דמות מגלשה מוחזקת לגמרי מעל השטיח על ידי הצמיג האפור ולא נוגעת בשום דבר אחר:",
        "M03-error": "יותר מידי דמויות מגלשה",
        "M04-name": "M04 ספסל",
        "M04-desc": "הרובוט מסיר את משענת הגב, משטח את הספסל ומביא את הקוביות לתוך אזורי משחק הקלאס.",
        "M04-scoring1": "אם הספסל שטוח לחלוטין:",
        "M04-scoring2": "מספר אזורי הקלאס עם קוביות הנוגעות בשטיח בתוכם:",
        "M04-scoring3": "משענת הגב לגמרי מחוץ לשני החורים שלה:",
        "M05-name": "M05 כדורסל",
        "M05-desc": "הרובוט מגביה את הארגז במעלה העמוד ומכניס קובייה לתוכו.",
        "M05-scoring1": "יש קובייה בארגז:",
        "M05-scoring2": "הארגז מונח על מעצור הגובה הלבן:",
        "M05-middle": "האמצעי",
        "M05-top": "העליון",
        "M06-name": "M06 מוט מתח",
        "M06-desc": "הרובוט עובר לחלוטין מתחת למוט בזמן כלשהו. בנפרד, בסוף המקצה, הוא מוחזק על ידי המוט מבלי לגעת בשטיח.",
        "M06-scoring1": "הרובוט עובר לחלוטין דרך המסגרת האנכית של מוט המתח בזמן כלשהו:",
        "M06-scoring2": "מוט המתח מחזיק 100% מהרובוט מבלי שייגע בשטיח המשחק בסוף המקצה:",
        "M07-name": "M07 ריקוד הרובוט",
        "M07-desc": "הרובוט רוקד על רחבת הריקודים בסוף המקצה. כל תנועה מחזורית, הן משעשעת והן מקצועית, נחשבת לריקוד",
        "M07-scoring1": "בקר הרובוט רוקד מעל רחבת הריקודים בסוף המקצה:",
        "M08-name": "M08 בוצ'יה",
        "M08-desc": "רובוטים שולחים קוביות תואמות למגרש הנגדי",
        "M08-scoring1": "שני דגמי השיתוף שלחו קובייה אחת בלבד לצד השני, והקוביות תואמות בצבען:",
        "M08-scoring2": "מספר הקוביות בתוך המסגרת או המטרה:",
        "M08-scoring3": "פחות קובייה צהובה אחת לחלוטין בתוך המטרה:",
        "M08-scoring4": "ציוד כלשהו נמצא בתוך המסגרת (אפילו חלקית):",
        "M08-error": "קוביות במטרות לא חוקיות:",
        "M09-name": "M09 הפיכת צמיגים",
        "M09-desc": "הרובוט הופך צמיגים כך שהמרכזים הלבנים שלהם כלפי מעלה ומזיז אותם לתוך מעגל המטרה הגדול שלהם.",
        "M09-scoring1": "צמיגים עם המרכז הלבן כלפי מעלה הנוגעים בשטיח:",
        "M09-scoring2": "צמיגים לגמרי בתוך עיגול המטרה הגדול:",
        "M09-scoring3": "הצמיג הכבד (בעל המסגרת השחורה) חצה את קו ההיפוך האדום (אפילו חלקית) בזמן כלשהו:",
        "M09-light": "כחול",
        "M09-heavy": "שחור",
        "M09-both": "שניהם",
        "M10-name": "M10 טלפון נייד",
        "M10-desc": "הרובוט הופך את הטלפון הנייד כך שהצד הלבן שלו כלפי מעלה.",
        "M10-scoring1": "הטלפון הנייד עם הצד הלבן כלפי מעלה ומונח רק על השטיח:",
        "M11-name": "M11 הליכון",
        "M11-desc": "הרובוט מסובב את הגלגלות כדי להזיז את המצביע הכי רחוק שאפשר, עם כיוון השעון. אם הרובוט מזיז את המצביע על ידי נגיעה במצביע, הניקוד הוא 0.",
        "M11-scoring1": "הרובוט סובב את הגלגלות כך שהמצביע מצביע על:",
        "M12-name": "M12 מכונת חתירה",
        "M12-desc": "הרובוט מזיז את הגלגל החופשי מחוץ למעגל הגדול ולתוך מעגל המטרה הקטן.",
        "M12-scoring1": "הגלגל החופשי לגמרי מחוץ למעגל הגדול:",
        "M12-scoring2": "הגלגל החופשי לגמרי בתוך המעגל הקטן:",
        "M12-error": "מיקום גלגל מכונת החתירה אינו חוקי",
        "M13-name": "M13 מכונת משקולות",
        "M13-desc": "הרובוט מזיז את הזרוע עד שהמעצור הצהוב הקטן נופל. הקבוצה קובעת ידנית את מצב הזרוע לפני המקצה. מצב הזרוע הוא הצבע מתחת לפאה המזרחית של המוט הירוק המזרחי",
        "M13-scoring1": "המעצור נמצא מתחת לזרוע ומצב הזרוע:",
        "M14-name": "M14 יחידות בריאות",
        "M14-desc": "הרובוט אוסף יחידות בריאות מרחבי הזירה ומזיז אותם לאזורי מטרה. המספר המירבי של יחידות בריאות המקנות ניקוד ממוט המתח הוא 4.",
        "M14-scoring1": "מספר היחידות הנוגעות בסמל RePlay או באזור האפור שמסביב לספסל:",
        "M14-scoring2": "מספר היחידות מושחלות על העמוד של מוט המתח ולא נוגעות בשום ציוד (מקסימום 4):",
        "precision-name": "M15 דיוק",
        "precision-desc": "ככל שתפריעו לרובוט פחות פעמים מחוץ לבית, יישארו לכם יותר נקודות.",
        "precision-scoring": "מספר אסימוני הדיוק הנותרו על הזירה:",
        "robot-ending-error": "מיקום הרובוט לא חוקי - לא יכול להיתלות בM06 וגם לרקור בM07",
        "cube-error": "יותר מידי קוביות",
        "health-unit-error": "יותר מידי יחידות בריאות"
    },
    "rtl": true
})
