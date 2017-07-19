var list = require('./list');
var collection = list.collection;
var selectedCity = 'shanghai';
var currentTax = collection[selectedCity];

if (!currentTax) {
    currentTax = collection['shanghai'];
}

var app = getApp()

Page({
    data: {
        tax: currentTax,
        inputValue: '',
        insurance: {
            ylao: '', //养老
            yliao: '', //医疗
            sye: '', //失业
            gs: '', //工伤
            syu: '', //生育
            gjj: '' //公积金
        },
        insuranceCompany: {
            ylao: '', //养老
            yliao: '', //医疗
            sye: '', //失业
            gs: '', //工伤
            syu: '', //生育
            gjj: '' //公积金
        },
        companyTotal: '',
        personalTotal: '',
        realTax: '',
        got: '',
        personalTotal2: ''
    },

    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function() {
        wx.setNavigationBarTitle({
            'title': '个税计算'
        });
    },

    onReady: function(e) {

    },

    calc: function() {
        var res = list.calc(this.data.inputValue);
        this.setData({
            inputValue: res.real,
            insurance: res.insurance,
            insuranceCompany: res.insuranceCompany,
            companyTotal: res.companyTotal.toFixed(2),
            personalTotal: res.personalTotal.toFixed(2),
            personalTotal2: (res.personalTotal + res.realTax).toFixed(2),
            realTax: res.realTax.toFixed(2),
            got: res.got.toFixed(2)
        });
    },
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
    }
})