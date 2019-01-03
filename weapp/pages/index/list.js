var allList = {
    "shanghai": {
        "max": 21396,
        "min": 4279,
        "insurance": {
            "personal": [8, 2, 0.5, 0, 0, 7], // 养老 医疗 失业 工伤 生育 公积金
            "corporate": [20, 9.5, 0.5, 0.5, 1, 7]
        }
    }
};

function calc(salary, qzd) {
    console.log(qzd)
    var city = "shanghai";
    var current = allList[city];
    var personalRate = (function() {
        return current.insurance.personal.reduce(function(a, b) { return a + b });
    })();
    var caclSalary = salary;
    var personal = current.insurance.personal;
    var company = current.insurance.corporate;

    if (salary > current.max) {
        salary = current.max;
    }

    if(salary < current.min) {
        salary = current.min;
    }

    var insurance = {
        ylao: wrap(salary * personal[0]), //养老
        yliao: wrap(salary * personal[1]), //医疗
        sye: wrap(salary * personal[2]), //失业
        gs: wrap(salary * personal[3]), //工伤
        syu: wrap(salary * personal[4]), //生育
        gjj: wrap(salary * personal[5]) //公积金
    };

    var insuranceCompany = {
        ylao: wrap(salary * company[0]), //养老
        yliao: wrap(salary * company[1]), //医疗
        sye: wrap(salary * company[2]), //失业
        gs: wrap(salary * company[3]), //工伤
        syu: wrap(salary * company[4]), //生育
        gjj: wrap(salary * company[5]) //公积金
    };

    var personalTotal = parseFloat(insurance.ylao) +
        parseFloat(insurance.yliao) +
        parseFloat(insurance.sye) +
        parseFloat(insurance.gs) +
        parseFloat(insurance.syu) +
        parseFloat(insurance.gjj);
    var companyTotal = parseFloat(insuranceCompany.ylao) +
        parseFloat(insuranceCompany.yliao) +
        parseFloat(insuranceCompany.sye) +
        parseFloat(insuranceCompany.gs) +
        parseFloat(insuranceCompany.syu) +
        parseFloat(insuranceCompany.gjj)

    var toTax = caclSalary - personalTotal - qzd;
    var realTax = 0;

    if (toTax >= 80000) {
        realTax = toTax * 0.45 - 15160;
    } else if (toTax >= 55001 && toTax < 80000) {
        realTax = toTax * 0.35 - 7160;
    } else if (toTax >= 35000 && toTax < 55000) {
        realTax = toTax * 0.3 - 4410;
    } else if (toTax >= 25000 && toTax < 35000) {
        realTax = toTax * 0.25 - 2660;
    } else if (toTax >= 12000 && toTax < 25000) {
        realTax = toTax * 0.20 - 1410;
    } else if (toTax >= 3000 && toTax < 12000) {
        realTax = toTax * 0.1 - 210;
    } else if (toTax >= 0 && toTax < 3000) {
        realTax = toTax * 0.03;
    }

    /*
    * [0, 3000, 0.03, 0]
    * [3000, 12000, 0.1, 210]
    * [12000, 25000, 0.2, 1410]
    * [25000, 35000, 0.25, 2660]
    * [35000, 55000, 0.3, 4410]
    * [55000, 80000, 0.35, 7160]
    * [80000, 80000, 0.45, 15160]
    */

    return {
        real: wrap(salary * (100 - personalRate)),
        insurance: insurance,
        insuranceCompany: insuranceCompany,
        companyTotal: companyTotal,
        personalTotal: personalTotal,
        realTax: realTax,
        got: caclSalary - personalTotal - parseFloat(realTax)
    };
}

function wrap(val) {
    return (val / 100).toFixed(2);
}

module.exports = {
    collection: allList,
    calc: calc
}