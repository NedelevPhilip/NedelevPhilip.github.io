////////////////////////////////FIREBASE//////////////////////////////
var firebaseConfig = {
    apiKey: "AIzaSyAHJd2jYI8xEEmsjKnv-GyF2hNGwPuz-_A",
    authDomain: "testeng.firebaseapp.com",
    databaseURL: "https://testeng.firebaseio.com",
    projectId: "testeng",
    storageBucket: "testeng.appspot.com",
    messagingSenderId: "802776227090",
    appId: "1:802776227090:web:766a0922b9d3136d"
};
firebase.initializeApp(firebaseConfig);



////////////////////////////////AUTH//////////////////////////////
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', {
//     signInOptions: [
//         {
//             provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         },
//         {
//             provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//         }
//     ]
// });


var db = firebase.firestore();
var min = 1;
var max = 999999;
function setUnicTestId() {
    var ID = getRandomInt(min, max).toString();

    var docRef = db.collection("results").doc(ID);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            setUnicTestId();
        } else {
            data.id = ID;
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}


function sendResultsToDB(paid) {

    data.payment = paid;
    data.date = tegNowTimeStr();

    db.collection("results").doc(data.email).set(data)
        .then(function () {
            console.log("Results successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing results: ", error);
        });
}

function sendToStorage(blob, id) {
    console.log('Upload audio was started...');

    var storageRef = firebase.storage().ref('speaking/' + id + '.mp3');

    storageRef.put(blob).then(function (snapshot) {
        console.log('Uploaded blob or file!');
    });
}


////////////////////////////////LIQPAY//////////////////////////////
var PUBLIC_KEY = "i20970875557";

var prise = 14;
var currency = "UAH";

function createPaymentWidget() {
    var dataJson = {
        "version": 3,
        "public_key": PUBLIC_KEY,
        "action": "pay",
        "amount": prise,
        "currency": currency,
        "description": "Оплата проверки теста",
        "order_id": data.id,
        "sender_first_name": data.id + " - " + data.email
    };

    var dataJsonStr = JSON.stringify(dataJson);

    var dataJsonB64 = utoa(dataJsonStr);

    $.ajax({
        url: 'https://testeng.online/api.php',
        method: 'POST',
        timeout: 25000,
        data: {
            "data": dataJsonB64
        },
        success: function (signatureData) {

            window.LiqPayCheckoutCallback = function () {
                LiqPayCheckout.init({
                    data: dataJsonB64,
                    signature: signatureData,
                    embedTo: "#liqpay_checkout",
                    mode: "embed",
                    language: "ru"
                }).on("liqpay.callback", function (data) {
                    if(data.status == 'success'){
                        sendResultsToDB(true);
                        $('.home-button').css('display', 'inline-block');
                        headerProgressBar.find('.progress-bar__item:nth-child(' + (currentPart + 1) + ')').addClass('progress-bar__item_done').removeClass('progress-bar__item_active');
                        $('.payment-text').text('Оплата прошла успешно👌 Ожидайте письмо с результатами на указанный вами имейл. Если у вас возникли какие то вопросы, пожалуйста, напишите нам в поддержку.');

                        // Amplitude
                        // amplitude.getInstance().logEvent('Payment Success');

                        //FB event Покупка
                        // fbq('track', 'Purchase', {
                        //     value: prise,
                        //     currency: currency
                        // });
                    } else {
                        $('.home-button').css('display', 'inline-block');
                        $('.payment-text').text('В процессе оплаты произошла ошибка😯 Попробуйте провести оплату еще раз или напишите в поддержку👍');
                    }
                }).on("liqpay.ready", function (data) {

                }).on("liqpay.close", function (data) {

                });
            };
            var script = document.createElement('script');
            script.src = "//static.liqpay.ua/libjs/checkout.js";
            script.async = true;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

    });
}


var data = {
    payment: null,
    date: null,
    id: null,
    email: null,
    test: {
        id: 1,
        parts: [
            {
                score: 0,
                time: 15,
                type: 'reading',
                title: 'The risks of cigarette smoke',
                text: 'Discovered in the early 1800s and named ‘nicotianine’, the oily essence now called nicotine is the main active ingredient of tobacco. Nicotine, however, is only a small component of cigarette smoke, which contains more than 4,700 chemical compounds, including 43 cancer-causing substances. In recent times, scientific research has been providing evidence that years of cigarette smoking vastly increases the risk of developing fatal medical conditions. In addition to being responsible for more than 85 per cent of lung cancers, smoking is associated with cancers of, amongst others, the mouth, stomach and kidneys, and is thought to cause about 14 per cent of leukemia and cervical cancers. In 1990, smoking caused more than 84,000 deaths, mainly resulting from such problems as pneumonia, bronchitis and influenza. Smoking, it is believed, is responsible for 30 per cent of all deaths from cancer and clearly represents the most important preventable cause of cancer in countries like the United States today. Passive smoking, the breathing in of the side-stream smoke from the burning of tobacco between puffs or of the smoke exhaled by a smoker, also causes a serious health risk. A report published in 1992 by the US Environmental Protection Agency (EPA) emphasized the health dangers, especially from side-stream smoke. This type of smoke contains more smaller particles and is therefore more likely to be deposited deep in the lungs. On the basis of this report, the EPA has classified environmental tobacco smoke in the highest risk category for causing cancer. As an illustration of the health risks, in the case of a married couple where one partner is a smoker and one a non-smoker, the latter is believed to have a 30 per cent higher risk of death from heart disease because of passive smoking. The risk of lung cancer also increases over the years of exposure and the figure jumps to 80 per cent if the spouse has been smoking four packs a day for 20 years. It has been calculated that 17 per cent of cases of lung cancer can be attributed to high levels of exposure to second-hand tobacco smoke during childhood and adolescence. A more recent study by researchers at the University of California at San Francisco (UCSF) has shown that second-hand cigarette smoke does more harm to non-smokers than to smokers. Leaving aside the philosophical question of whether anyone should have to breathe someone else’s cigarette smoke, the report suggests that the smoke experienced by many people in their daily lives is enough to produce substantial adverse effects on a person’s heart and lungs. The report, published in the Journal of the American Medical Association (AMA), was based on the researchers’ own earlier research but also includes a review of studies over the past few years. The American Medical Association represents about half of all US doctors and is a strong opponent of smoking. The study suggests that people who smoke cigarettes are continually damaging their cardiovascular system, which adapts in order to compensate for the effects of smoking. It further states that people who do not smoke do not have the benefit of their system adapting to the smoke inhalation. Consequently, the effects of passive smoking are far greater on non-smokers than on smokers. This report emphasizes that cancer is not caused by a single element in cigarette smoke; harmful effects to health are caused by many components. Carbon monoxide, for example, competes with oxygen in red blood cells and interferes with the blood’s ability to deliver life-giving oxygen to the heart. Nicotine and other toxins in cigarette smoke activate small blood cells called platelets, which increases the likelihood of blood clots, thereby affecting blood circulation throughout the body. The researchers criticize the practice of some scientific consultants who work with the tobacco industry for assuming that cigarette smoke has the same impact on smokers as it does on non-smokers. They argue that those scientists are underestimating the damage done by passive smoking and, in support of their recent findings, cite some previous research which points to passive smoking as the cause for between 30,000 and 60,000 deaths from heart attacks each year in the United States. This means that passive smoking is the third most preventable cause of death after active smoking and alcohol-related diseases. The study argues that the type of action needed against passive smoking should be similar to that being taken against illegal drugs and AIDS (SIDA). The UCSF researchers maintain that the simplest and most cost-effective action is to establish smoke-free work places, schools and public places.',
                questions: [
                    {
                        id: 1,
                        text: 'What are the essential active elements of tobacco?',
                        answers: [
                            {
                                id: 1,
                                text: 'Nicotine, nicotianine',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 2,
                                text: 'Nicotine',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 3,
                                text: 'Nicotine, hydrogen cyanide, arsenic',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 4,
                                text: 'Nicotine, benzene',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'Which diseases does smoking provoke?',
                        answers: [
                            {
                                id: 5,
                                text: 'Lung cancer, mouth cancer, stomach and kidneys cancer',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 6,
                                text: 'Lung cancer, atherosclerosis, heart problems',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 7,
                                text: 'Cancers of lung, mouth, stomach, kidneys; leukemia, cervical cancers',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 8,
                                text: 'Cancers of lung, mouth, stomach, kidneys; leukemia, cervical cancers; pneumonia, bronchitis, influenza',
                                checked: false,
                                correct: true
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: 'How many deaths from cancer is smoking in charge of?',
                        answers: [
                            {
                                id: 9,
                                text: 'A little less than a third',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 10,
                                text: '17 percent',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 11,
                                text: 'One third',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 12,
                                text: 'One half',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 4,
                        text: 'According to the EPA report, why is side-stream smoke so dangerous?',
                        answers: [
                            {
                                id: 13,
                                text: 'It has higher concentrations of cancer-causing agents',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 14,
                                text: 'It has tiny fragments that can be accumulated deeper in the lungs',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 15,
                                text: 'It is more toxic than mainstream smoke',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 16,
                                text: 'It has smaller particles that are deposited in all parts of the lungs',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 5,
                        text: 'What kind of people are exposed to passive smoking and are likely to suffer from lung cancer in about 20% of cases?',
                        answers: [
                            {
                                id: 17,
                                text: 'A married couple where one partner smokes heavily',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 18,
                                text: 'People who have been smoking four packs a day for 20 years',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 19,
                                text: 'Children and teenagers',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 20,
                                text: 'All the above-mentioned',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 6,
                        text: 'Why are the consequences of passive smoking greater on non-smokers than on smokers?',
                        answers: [
                            {
                                id: 21,
                                text: 'Passive smoking damages the cardiovascular system of non-smokers',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 22,
                                text: 'The system of heart and blood vessels of non-smokers adapts much worse than that of smokers',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 23,
                                text: 'There are no reports that prove this fact',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 24,
                                text: 'Non-smokers’ system of heart and blood vessels isn’t able to adapt to the smoke inhalation as it happens with the system of smokers that is constantly damaged',
                                checked: false,
                                correct: true
                            }
                        ]
                    },
                    {
                        id: 7,
                        text: 'Which components cause changes in human blood?',
                        answers: [
                            {
                                id: 25,
                                text: 'Carbon monoxide',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 26,
                                text: 'Nicotine',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 27,
                                text: 'Other toxins',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 28,
                                text: 'All the above-mentioned',
                                checked: false,
                                correct: true
                            }
                        ]
                    },
                    {
                        id: 8,
                        text: 'Is there any disagreement on the topic of the influence of cigarette smoke on smokers and non-smokers among scientists?',
                        answers: [
                            {
                                id: 29,
                                text: 'Their views coincide',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 30,
                                text: 'The researchers blame some consultants from the tobacco industry for declaring that the impact is the same on both categories of people',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 31,
                                text: 'The researchers blame some consultants from the tobacco industry for knowing the consequences but not announcing them',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 32,
                                text: 'The researchers blame some consultants from the tobacco industry for their ignorance',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 9,
                        text: 'Can the death caused by passive smoking be prevented?',
                        answers: [
                            {
                                id: 33,
                                text: 'Yes, as well as the death caused by active smoking and alcohol-related illnesses',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 34,
                                text: 'Yes, it’s the only one that can be prevented',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 35,
                                text: 'Unfortunately, no',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 36,
                                text: 'Yes, like any other death',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 10,
                        text: 'What kind of action plan is needed against passive smoking?',
                        answers: [
                            {
                                id: 37,
                                text: 'It should be as complicated as the action plans against illegal drugs and AIDS',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 38,
                                text: 'It should be identical to action plans against illegal drugs and AIDS',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 39,
                                text: 'It should be as simple and cheap as possible',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 40,
                                text: 'It should be understandable to everyone',
                                checked: false,
                                correct: false
                            }
                        ]
                    }
                ]
            },
            {
                score: 0,
                time: 10,
                type: 'listening',
                questions: [
                    {
                        id: 1,
                        text: 'Why did speaker 1 decide to change her job?',
                        answers: [
                            {
                                id: 1,
                                text: 'Day by day her job was losing its attractiveness',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 2,
                                text: 'Despite the benefits of the job, at some point, it just stroke her',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 3,
                                text: 'She was invited to work as a freelance photographer',
                                checked: false,
                                correct: true
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'What are the advantages of her new job?',
                        answers: [
                            {
                                id: 4,
                                text: 'It’s beneficial and pleasing only emotionally',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 5,
                                text: 'It’s a risky business',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 6,
                                text: 'Not only is it satisfying but also profitable',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: 'What pushed speaker 2 into changing his job?',
                        answers: [
                            {
                                id: 7,
                                text: 'He’d been planning to change his job since the financial problems in business',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 8,
                                text: 'He’d been looking around a lot, started learning rally driving after work and changed his career only after getting into the rally team',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 9,
                                text: 'He left the family business after winning some rallies',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 4,
                        text: 'Does speaker 2 regret leaving the family business?',
                        answers: [
                            {
                                id: 10,
                                text: 'Not at all',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 11,
                                text: 'He regrets being risky all the time',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 12,
                                text: 'No regrets, but he’d been in deep thoughts about his choice',
                                checked: false,
                                correct: true
                            }
                        ]
                    },
                    {
                        id: 5,
                        text: 'Why was speaker 3 feeling uncomfortable in a marketing department?',
                        answers: [
                            {
                                id: 13,
                                text: 'What she always did wrong was her behaviour',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 14,
                                text: 'What really didn’t suit in a marketing department was her appearance',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 15,
                                text: 'She could never realise what the problem was',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 6,
                        text: 'Why does she do that?',
                        answers: [
                            {
                                id: 16,
                                text: 'She’s got the skills and experience in the music industry',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 17,
                                text: 'It’s financially rewarding. She can negotiate a good salary for herself',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 18,
                                text: 'She loves what she does and feels in the right place',
                                checked: false,
                                correct: true
                            }
                        ]
                    },
                    {
                        id: 7,
                        text: 'How did speaker 4 get into his new profession?',
                        answers: [
                            {
                                id: 19,
                                text: 'He bumped into one of the radio executives who begged him to substitute one TV host',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 20,
                                text: 'Thanks to his copywriting skills, he was given a chance to try himself at presenting slots by one of the radio executives',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 21,
                                text: 'He was invited for the position of the intern for free for a while',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 8,
                        text: 'What’s his attitude towards his new career path?',
                        answers: [
                            {
                                id: 22,
                                text: 'He finds it extremely challenging, because he needs to learn a lot and quickly, but worth the risk',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 23,
                                text: 'He’s laughing at his difficulties and supposes he can cope with it easily',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 24,
                                text: 'He doesn’t want to lose this opportunity so he’s doing his best at the position of an intern',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 9,
                        text: 'What were the reasons why speaker 5 quit her job?',
                        answers: [
                            {
                                id: 25,
                                text: 'She was financially and emotionally tired',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 26,
                                text: 'She was tired of long shifts and ran out of patience',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 27,
                                text: 'She was kindly asked to leave',
                                checked: false,
                                correct: false
                            }
                        ]
                    },
                    {
                        id: 10,
                        text: 'Is she completely pleased with her new position now?',
                        answers: [
                            {
                                id: 28,
                                text: 'Absolutely, even though she has to be careful in planning her vacations',
                                checked: false,
                                correct: true
                            },
                            {
                                id: 29,
                                text: 'She enjoys being her own boss, but cannot plan her holidays right',
                                checked: false,
                                correct: false
                            },
                            {
                                id: 30,
                                text: 'She adores the fact that she can take the initiative in deciding what to do but hates that she depends on the manufacturer too',
                                checked: false,
                                correct: false
                            }
                        ]
                    }
                ]
            },
            {
                time: 5,
                type: 'speaking',
                task: "Choose a famous person who you would like to have a conversation with. Explain your choice giving specific reasons and details."
            },
            {
                time: 30,
                type: 'writing',
                task: "In general, people are living longer now. Discuss the causes of this phenomenon. Use specific reasons and details to develop your essay.",
                text: null
            }
        ]

    }
};