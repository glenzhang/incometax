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

    onLoad: function() {
        wx.setNavigationBarTitle({
            'title': '个税计算'
        });
    },

    onReady: function(e) {
    },

    calc: function() {
        var that = this;

        if (isNaN(parseInt(this.data.inputValue))) {
            wx.showModal({
                title: '',
                content: '请输入正确的税前工资',
                showCancel: false,
                success: function() {
                    that.setData({
                        inputValue: ''
                    });
                }
            });
        }
        var res = list.calc(this.data.inputValue);

        this.setData({
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
    },
    onShareAppMessage: function (res) {
        return {
          title: '个税计算',
          path: 'pages/index/index',
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
      }
})