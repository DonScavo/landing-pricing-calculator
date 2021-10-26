class CalculatorController {
    constructor() {
        this.rangeBar = document.querySelector('#barraRangoMenciones');
        this.switchs = document.querySelectorAll('.switchInput');
        this.incrementComponents = document.querySelectorAll('.incrementComponents');
        this.totalPrice = document.querySelectorAll('.totalPrice');
        this.complementCheckBot = document.querySelector('#complementCheckBot');
        this.complementCheckDiff = document.querySelectorAll('.complementCheckDiff');
        this.complementCards = document.querySelectorAll('.complementoEliminable');

        this.prices = {
            default: 690,
        };
        this.total = 0;

        this.init();
    }
    init() {
        this.rangeBarController();
        this.rangeBar.addEventListener('change', () => this.rangeBarController());

        this.switchs.forEach(e => e.addEventListener('change', () => this.switchsController(e)));

        this.incrementComponents.forEach(e => this.incrementComponentController(e));

        this.complementCheckBot.addEventListener('change', () => this.complementCheckBotController());

        this.complementCheckDiff.forEach(e => e.addEventListener('change', () => this.complementCheckDiffController(e)));
    }
    rangeBarController() {
        const stepts = [{
                value: 10000,
                price: 0,
            },
            {
                value: 20000,
                price: 200,
            },
            {
                value: 40000,
                price: 400,
            },
            {
                value: 100000,
                price: 600,
            },
            {
                value: 200000,
                price: 1000,
            }
        ];

        const plan = stepts[this.rangeBar.value];

        const mentionNumber = document.querySelectorAll('.mentionNumber');

        mentionNumber.forEach(e=>e.innerText = numberWithCommas(plan.value));

        this.prices.plan = plan.price;
        this.printTotalPrice();

        const mencionesPriceCard = document.querySelector('.menciones-price');
        mencionesPriceCard.innerText = numberWithCommas(plan.price);
    }
    switchsController(e) {
        const switchSelectorBox = e.closest('.switchSelectorBox');
        const redOff = switchSelectorBox.querySelector('.redOff'),
            redOn = switchSelectorBox.querySelector('.redOn'),
            redFull = switchSelectorBox.querySelector('.redFull');

        redFull.style.display = 'none';
        this.complementCheckBot.checked = false;

        //remove fullRed clases
        const redCard = document.querySelectorAll('.redCard');
        redCard.forEach(r=>r.classList.remove('fullRedPrice'));

        if (e.checked) {
            this.prices['red-' + switchSelectorBox.dataset.ref] = Number(e.value);
            redOff.style.display = 'none';
            redOn.style.display = 'block';
            
            this.printHideCards(switchSelectorBox.dataset.ref, 'display');

        } else {
            this.prices['red-' + switchSelectorBox.dataset.ref] = 0;
            redOff.style.display = 'block';
            redOn.style.display = 'none';
            
            this.printHideCards(switchSelectorBox.dataset.ref, 'hide');

            [...this.switchs].filter(l => l.checked).forEach(k => this.switchsController(k));
        }
        this.printTotalPrice();
        this.validateBotCheckbox();

        return true;
    }
    validateBotCheckbox() {
        if ([...this.switchs].some(e => !e.checked)) {
            this.prices['red-all'] = 0;

            this.printHideCards('fullRedes', 'hide');

            return false;
        } else {
            
        //add fullRed clases
            const redCard = document.querySelectorAll('.redCard');
            redCard.forEach(r=>r.classList.add('fullRedPrice'));

            this.complementCheckBot.checked = true;
            this.printHideCards('fullRedes');


            this.switchs.forEach(e => {
                const switchSelectorBox = e.closest('.switchSelectorBox');
                const redOff = switchSelectorBox.querySelector('.redOff'),
                    redOn = switchSelectorBox.querySelector('.redOn'),
                    redFull = switchSelectorBox.querySelector('.redFull');

                redOff.style.display = 'none';
                redOn.style.display = 'none';
                redFull.style.display = 'block';
                this.prices['red-' + switchSelectorBox.dataset.ref] = 0;
            });
            this.prices['red-all'] = 300;
            this.printTotalPrice();

            //ocultar todas las cajas de redes y mostar la de full red y bot


        }
    }
    complementCheckBotController() {
        if (this.complementCheckBot.checked) {
            this.switchs.forEach(e => {
                e.checked = true;
                this.switchsController(e);
            });
        } else {
            this.switchs.forEach(e => {
                e.checked = false;
                this.switchsController(e);
            });
        }
    }
    incrementComponentController(e) {
        const type = e.dataset.component,
            subBtn = e.querySelector('.subBtn'),
            plusBtn = e.querySelector('.plusBtn'),
            ICValue = e.querySelector('.ICValue'),
            price = e.querySelector('.ICPrice'),
            maxValue = Number(ICValue.dataset.max);


        let value = Number(ICValue.dataset.value);


        plusBtn.addEventListener('click', () => {
            if (value < maxValue) value++;
            printData();
        });
        subBtn.addEventListener('click', () => {
            if (value > 0) value--;
            printData();
        });

        const printData = () => {
            const data = this.getICdata(type);
            price.innerText = data[value].price;
            ICValue.innerText = data[value].value;

            const cardPrice = document.querySelector(`.cardPrice-${type}`);
            cardPrice.innerText = data[value].price;

            //display no selected box
            const otroComplementoPrice = e.querySelector('.otroComplementoPrice');
            const otrosComplementsNoSelected = e.querySelector('.otrosComplementsNoSelected');
            const card = document.querySelector(`#${type}Card .counter`);
            card.innerText = data[value].value;
            if(value > 0){
                otroComplementoPrice.style.display = 'block';
                otrosComplementsNoSelected.style.display = 'none';
                this.printHideCards(type);
            }else{
                otroComplementoPrice.style.display = 'none';
                otrosComplementsNoSelected.style.display = 'block';      
                this.printHideCards(type, 'hide');          
            }

            this.prices['IC-' + type] = data[value].price;
            this.printTotalPrice();
        };

        printData();
    }
    getICdata(key) {
        switch (key) {
            case 'users':
                return [{
                        value: 0,
                        price: 0,
                    },
                    {
                        value: 1,
                        price: 50,
                    },
                    {
                        value: 2,
                        price: 100,
                    },
                    {
                        value: 3,
                        price: 150,
                    },
                    {
                        value: 4,
                        price: 200,
                    },
                    {
                        value: 5,
                        price: 200,
                    },
                    {
                        value: 6,
                        price: 240,
                    },
                    {
                        value: 7,
                        price: 280,
                    },
                    {
                        value: 8,
                        price: 320,
                    },
                    {
                        value: 9,
                        price: 360,
                    },
                    {
                        value: 10,
                        price: 400,
                    },
                ]

            case 'reports':
                return [{
                        value: 0,
                        price: 0,
                    },
                    {
                        value: 1,
                        price: 20,
                    },
                    {
                        value: 2,
                        price: 40,
                    },
                    {
                        value: 3,
                        price: 60,
                    },
                    {
                        value: 4,
                        price: 80,
                    },
                    {
                        value: 5,
                        price: 80,
                    },
                    {
                        value: 6,
                        price: 96,
                    },
                    {
                        value: 7,
                        price: 112,
                    },
                    {
                        value: 8,
                        price: 128,
                    },
                    {
                        value: 9,
                        price: 144,
                    },
                    {
                        value: 10,
                        price: 160,
                    },
                ]
            case 'alerts':
                return [{
                        value: 0,
                        price: 0,
                    },
                    {
                        value: 1,
                        price: 20,
                    },
                    {
                        value: 2,
                        price: 40
                    },
                    {
                        value: 3,
                        price: 60
                    },
                    {
                        value: 4,
                        price: 80
                    },
                    {
                        value: 5,
                        price: 80
                    },
                    {
                        value: 6,
                        price: 96
                    },
                    {
                        value: 7,
                        price: 112
                    },
                    {
                        value: 8,
                        price: 128
                    },
                    {
                        value: 9,
                        price: 144
                    },
                    {
                        value: 10,
                        price: 160
                    }
                ]
            case 'marks':
                return [{
                        value: 0,
                        price: 0,
                    },
                    {
                        value: 10,
                        price: 50,
                    },
                    {
                        value: 20,
                        price: 100
                    },
                    {
                        value: 30,
                        price: 150
                    },
                    {
                        value: 40,
                        price: 200
                    },
                    {
                        value: 50,
                        price: 200
                    },
                    {
                        value: 60,
                        price: 240
                    },
                    {
                        value: 70,
                        price: 280
                    },
                    {
                        value: 80,
                        price: 320
                    },
                    {
                        value: 90,
                        price: 360
                    },
                    {
                        value: 100,
                        price: 400
                    }
                ]
            case 'competitors':
                return [{
                        value: 0,
                        price: 0,
                    },
                    {
                        value: 1,
                        price: 50,
                    },
                    {
                        value: 2,
                        price: 100
                    },
                    {
                        value: 3,
                        price: 150
                    },
                    {
                        value: 4,
                        price: 200
                    },
                    {
                        value: 5,
                        price: 200
                    },
                    {
                        value: 6,
                        price: 240
                    },
                    {
                        value: 7,
                        price: 280
                    },
                    {
                        value: 8,
                        price: 320
                    },
                    {
                        value: 9,
                        price: 360
                    },
                    {
                        value: 10,
                        price: 400
                    }
                ]

            default:
                break;
        }

    }
    complementCheckDiffController(e) {
        if (e.checked) {
            this.prices[e.dataset.name] = Number(e.value);
            this.printHideCards(e.dataset.name);
        } else {
            this.prices[e.dataset.name] = 0;
            this.printHideCards(e.dataset.name, 'hide');
        }
        this.printTotalPrice();
    }
    printHideCards(element, action = 'display'){
        const card = document.querySelector(`#${element}Card`);

        if(action == 'display'){
            card.style.display = 'block';
        }else{
            card.style.display = 'none';
        }
    }

    printTotalPrice() {
        this.total = 0;

        for (const key in this.prices) {
            this.total += this.prices[key];
        }

        this.totalPrice.forEach(e => e.innerText = numberWithCommas(this.total));

        const totalPriceDiscount = document.querySelector('.totalPriceDiscount');
        totalPriceDiscount.innerText = numberWithCommas(this.total * 0.9);
    }

}

const calculatorController = new CalculatorController();




function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const botonesPlusAndLess = document.querySelectorAll('.btnPlusAndLess');
const complementosCards = document.querySelector('.complementosCards');
const otrosComplementosContainer = document.querySelector('.otrosComplementosContainer');

botonesPlusAndLess.forEach((btnPlusAndLess, index) => {
    btnPlusAndLess.addEventListener('click', (e) => {
        e.preventDefault();

        if (index == 0) {
            complementosCards.classList.toggle('complementosCardsActive');
            if (btnPlusAndLess.innerText == '+') {
                btnPlusAndLess.innerText = '-'
            } else {
                btnPlusAndLess.innerText = '+'
            }
        } else {
            otrosComplementosContainer.classList.toggle('complementosExtrasActive');
            if (btnPlusAndLess.innerText == '+') {
                btnPlusAndLess.innerText = '-'
            } else {
                btnPlusAndLess.innerText = '+'
            }
        }

    });
});

const pagoMensual = document.getElementById('pagoMensual');
const pagoAnual = document.getElementById('pagoAnual');
const pricePlan = document.querySelector('.pricePlan');
const pricePlanAnual = document.querySelector('.pricePlanAnual');

pagoAnual.addEventListener('click', () => {
    if (pagoAnual.classList.contains('pagoSelected')) {

    } else {
        pagoAnual.classList.add('pagoSelected');
        pagoMensual.classList.remove('pagoSelected');

        pricePlan.style.display = "none";
        pricePlanAnual.style.display = "block";
    }
});

pagoMensual.addEventListener('click', () => {
    pagoMensual.classList.add('pagoSelected');
    pagoAnual.classList.remove('pagoSelected');

    pricePlan.style.display = "block";
    pricePlanAnual.style.display = "none";

});

