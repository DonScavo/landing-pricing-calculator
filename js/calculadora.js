class CalculatorController{
    constructor(){
        this.rangeBar = document.querySelector('#barraRangoMenciones');
        this.switchs = document.querySelectorAll('.switchInput');
        this.incrementComponents = document.querySelectorAll('.incrementComponents');
        this.totalPrice = document.querySelectorAll('.totalPrice');

        this.total = 0;

        this.init();
    }
    init(){
        this.rangeBar.addEventListener('change', ()=>this.rangeBarController());

        this.switchs.forEach(e=>e.addEventListener('change', ()=>this.switchsController(e)));

        this.incrementComponents.forEach(e=>this.incrementComponentController(e));
    }
    rangeBarController(){
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
        }];
    
        const plan = stepts[this.rangeBar.value - 1];
    
        console.log(plan)
    }
    switchsController(e){
        console.log(e.value)
    }
    incrementComponentController(e){
        const type = e.dataset.component,
              subBtn = e.querySelector('.subBtn'),
              plusBtn = e.querySelector('.plusBtn'),
              ICValue = e.querySelector('.ICValue'),
              price = e.querySelector('.ICPrice'),
              maxValue = Number(ICValue.dataset.max);

        let value = Number(ICValue.dataset.value);

        plusBtn.addEventListener('click', ()=>{
            if(value < maxValue) value++;
            printData();
        }); 
        subBtn.addEventListener('click', ()=>{
            if(value > 0) value--;
            printData();
        });        

        const printData = ()=>{
            const data = this.getICdata(type);
            price.innerText = data[value].price;
            ICValue.innerText = data[value].value;
        };

        printData();
    }
    getICdata(key){
        switch (key) {
            case 'users':
                return [
                    {
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
                return [
                    {
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

            default:
                break;
        }
    }

    printTotalPrice(){
        this.totalPrice.innerText = this.total;
    }
}


const init = new CalculatorController();
