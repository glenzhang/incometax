/*
上海
社保： max 19512 min 3902 
公积金： max 19512 min 2190

个人
养老：8
医疗：2
失业：0.5
工伤：0
生育：0 
公积金：7.0

公司
养老：20
医疗：9.5
失业：0.5
工伤：0.5
生育：1 
公积金：7.0
*/

var allList = {
    "shanghai": {
        "max": 19512,
        "min": 3902,
        "insurance": {
            "personal": [8, 2, 0.5, 0, 0, 7], // 养老 医疗 失业 工伤 生育 公积金
            "corporate": [20, 9.5, 0.5, 0.5, 1, 7]
        }
    }
};

function calc(salary) {
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

    var toTax = caclSalary - personalTotal - 3500;
    var realTax = 0;

    if (toTax >= 80001) {
        realTax = toTax * 0.45 - 13505;
    } else if (toTax >= 55001 && toTax < 80001) {
        realTax = toTax * 0.35 - 5505;
    } else if (toTax >= 35001 && toTax < 55000) {
        realTax = toTax * 0.3 - 2755;
    } else if (toTax >= 9001 && toTax < 35000) {
        realTax = toTax * 0.25 - 1005;
    } else if (toTax >= 4501 && toTax < 9000) {
        realTax = toTax * 0.20 - 555;
    } else if (toTax >= 1501 && toTax < 4500) {
        realTax = toTax * 0.1 - 105;
    } else if (toTax >= 0 && toTax < 1500) {
        realTax = toTax * 0.03;
    }

    /*
    [0, 1500, 0.03, 0]
    [1501, 4500, 0.1, 105]
    [4501, 9000, 0.2, 555]
    [9001, 35000, 0.25, 1005]
    [35001, 55000, 0.3, 2755]
    [55001, 80000, 0.35, 5505]
    [80001, 80000, 0.45, 13505]
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