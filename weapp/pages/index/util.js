/**
 * 速算扣除数
 * [0, 3000, 0.03, 0]
 * [3000, 12000, 0.1, 210]
 * [12000, 25000, 0.2, 1410]
 * [25000, 35000, 0.25, 2660]
 * [35000, 55000, 0.3, 4410]
 * [55000, 80000, 0.35, 7160]
 * [80000, 80000, 0.45, 15160]
 */
const RANG_ARRAY = [0, 3000, 12000, 25000, 35000, 55000, 80000];

const RATE_MAP = {
    'level1' : {
        'range': [0, 1500],
        'rate': 0.03,
        'rebate': 0
    },
    'level2' : {
        'range': [1500, 4500],
        'rate': 0.1,
        'rabate': 210
    }
};

let getLevel = (value) => {
    
}

class TaxContext {
    constructor(value) {
        
    }

    getTax () {
        this.strategy.getTax();
    }
}


class Tax {

    constructor(tax) {
        this.tax = tax
    }
}

class LevelOneTax extends RealTax {
    constructor() {
        super();
    }

    getRealTax() {
       return realTax = toTax * 0.03;
    }
}



'use strict';

class Contexttt {
    constructor(type){
        switch(type) {
            case "A":
                this.strategy = new ConcreteStrategyA()
                break
            case "B":
                this.strategy = new ConcreteStrategyB()
                break
            default:
                this.strategy = new ConcreteStrategyA()
        }
    }

    ContextInterface (){
        this.strategy.AlgorithmInterface()
    }
}

class Strategy {
    constructor() {
    }

    AlgorithmInterface (){
    }
}

class ConcreteStrategyA extends Strategy{
    constructor() {
        super()
        facade.log('ConcreteStrategyA created')
    }

    AlgorithmInterface (){
        facade.log('ConcreteStrategyA algorithm')
    }
}

class ConcreteStrategyB extends Strategy{
    constructor() {
        super()
        facade.log('ConcreteStrategyB created')
    }

    AlgorithmInterface (){
        facade.log('ConcreteStrategyB algorithm')
    }
}

function init_Strategy() {
    let contextA = new Contexttt("A")
    contextA.ContextInterface()
    let contextB = new Contexttt("B")
    contextB.ContextInterface()
}