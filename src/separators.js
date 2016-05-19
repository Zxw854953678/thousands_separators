'use strict';

function thousands_separators(num) {
    var strNumber = dealIntegerPart(num);//得到一个数的整数部分的字符串
    var integerExpression = /^-?[1-9]\d*$|^-?[1-9]\d*\.[0]\d*$/;//整数的正则表达式

    if (!integerExpression.test(num)) {//非整数
        var strDecimal = dealDecimalPart(num);//得到一个数的小数部分的字符串
        strNumber = strNumber + strDecimal;
    }

    return strNumber;
}

function dealIntegerPart(number){//处理一个数的整数部分
    var replaceEveryThree = /(.{3})/g;
    var replaceThreeMultiple = /(.{3}.)/g;

    var reverseStrNum = parseInt(number).toString().split("").reverse().join("");
    var strNumber = reverseStrNum.length % 3 != 0 ? reverseStrNum.replace(replaceEveryThree, '$1,') : reverseStrNum.replace(replaceThreeMultiple, '$1,').substr(0);
    strNumber = strNumber.split("").reverse().join("");//数字整数部分的字符串

    return strNumber;
}

function dealDecimalPart(number){//处理一个数的小数部分
    var twoFloatExpression = /^[1-9]\d*\.\d\d$/;//小数点后有两位数字的正则表达式
    var decimalPart = number - parseInt(number);//得到小数部分
    var strDecimal = "";

    if (twoFloatExpression.test(number)) {//小数点后有两位数字的情况
        strDecimal = decimalPart.toFixed(2).toString().substr(1);//提取小数点后的数字字符串
    }
    else {
        strDecimal = decimalPart.toFixed(CalculateNumbersAfterDecimal(number)).toString().substr(1);
    }

    return strDecimal;
}

function CalculateNumbersAfterDecimal(number){//计算小数点位数
    var integerExpression = /^-?[1-9]\d*$|^-?[1-9]\d*\.[0]\d*$/;//整数表达式
    var temp = number;
    var decimals;

    for (decimals = 0; !integerExpression.test(temp); decimals++) {
        temp *= 10;
    }

    return decimals;
}

module.exports = thousands_separators;
